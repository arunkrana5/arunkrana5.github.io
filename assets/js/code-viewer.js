/**
 * ARUN  KUMAR RANA - LIVE C# .NET 8 CODE ARCHITECTURE VIEWER
 * Demonstrates Senior .NET Developer C# code quality, CQRS/MediatR, Dapper, Resilience, and SQL optimization.
 */ 

const CODE_SNIPPETS = {
  cqrs: {
    filename: "ProcessPayrollCommand.cs",
    language: "csharp",
    title: "CQRS Command Handler with MediatR & C# 12 Primary Constructors",
    code: `using MediatR;
using Microsoft.Extensions.Logging;
using Thrivera.Domain.Exceptions;
using Thrivera.Infrastructure.Data;

namespace Thrivera.Application.Payroll.Commands;

public record ProcessPayrollCommand(
    Guid BatchId, 
    int Month, 
    int Year, 
    string ProcessedBy
) : IRequest<PayrollProcessResult>;

public class ProcessPayrollCommandHandler(
    IPayrollRepository payrollRepository,
    ITransactionManager transactionManager,
    ILogger<ProcessPayrollCommandHandler> logger
) : IRequestHandler<ProcessPayrollCommand, PayrollProcessResult>
{
    public async Task<PayrollProcessResult> Handle(
        ProcessPayrollCommand request, 
        CancellationToken cancellationToken)
    {
        logger.LogInformation("Starting payroll processing for Batch {BatchId}", request.BatchId);

        // Execute inside explicit database transaction
        using var tx = await transactionManager.BeginTransactionAsync(cancellationToken);
        try
        {
            var exists = await payrollRepository.CheckPayrollProcessedAsync(request.Month, request.Year);
            if (exists)
            {
                throw new DomainRuleException("Payroll for specified period already processed and locked.");
            }

            var result = await payrollRepository.ExecutePayrollCalculationProcedureAsync(
                request.BatchId, request.Month, request.Year, request.ProcessedBy, cancellationToken);

            await tx.CommitAsync(cancellationToken);
            logger.LogInformation("Payroll Batch {BatchId} completed successfully. Processed {Count} employees.", 
                request.BatchId, result.ProcessedCount);

            return result;
        }
        catch (Exception ex)
        {
            await tx.RollbackAsync(cancellationToken);
            logger.LogError(ex, "Failed to process payroll batch {BatchId}", request.BatchId);
            throw;
        }
    }
}`
  },

  dapper: {
    filename: "EmployeeDapperRepository.cs",
    language: "csharp",
    title: "High-Performance Dapper Querying with Index-Optimized T-SQL",
    code: `using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Thrivera.Infrastructure.Repositories;

public class EmployeeDapperRepository(string connectionString)
{
    public async Task<PagedResult<EmployeeSummaryDto>> GetFilteredEmployeesAsync(
        EmployeeGridFilter filter, CancellationToken ct = default)
    {
        using var db = new SqlConnection(connectionString);

        const string sql = """
            SELECT 
                e.EmployeeId, e.EmpCode, e.FullName, e.DepartmentId,
                d.DepartmentName, e.Designation, e.IsActive, e.JoiningDate,
                COUNT(1) OVER() AS TotalRecords
            FROM dbo.Employees e WITH (NOLOCK)
            INNER JOIN dbo.Departments d WITH (NOLOCK) ON e.DepartmentId = d.DepartmentId
            WHERE e.IsDeleted = 0
              AND (@DeptId IS NULL OR e.DepartmentId = @DeptId)
              AND (@Search IS NULL OR e.FullName LIKE '%' + @Search + '%' OR e.EmpCode LIKE '%' + @Search + '%')
            ORDER BY e.EmployeeId DESC
            OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;
            """;

        var param = new
        {
            DeptId = filter.DepartmentId,
            Search = filter.SearchTerm,
            Offset = (filter.PageIndex - 1) * filter.PageSize,
            PageSize = filter.PageSize
        };

        var items = await db.QueryAsync<EmployeeSummaryDto>(
            new CommandDefinition(sql, param, cancellationToken: ct));

        var list = items.ToList();
        int total = list.FirstOrDefault()?.TotalRecords ?? 0;

        return new PagedResult<EmployeeSummaryDto>(list, total, filter.PageIndex, filter.PageSize);
    }
}`
  },

  polly: {
    filename: "ResiliencePipelineExtensions.cs",
    language: "csharp",
    title: "Polly Resilience & Retry Pipeline for External Payment APIs",
    code: `using Polly;
using Polly.CircuitBreaker;
using Polly.Retry;

namespace Thrivera.Infrastructure.Resilience;

public static class ResiliencePipelineExtensions
{
    public static ResiliencePipeline<HttpResponseMessage> CreatePaymentApiPipeline()
    {
        return new ResiliencePipelineBuilder<HttpResponseMessage>()
            .AddRetry(new RetryStrategyOptions<HttpResponseMessage>
            {
                ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
                    .Handle<HttpRequestException>()
                    .HandleResult(r => (int)r.StatusCode >= 500),
                MaxRetryAttempts = 3,
                Delay = TimeSpan.FromSeconds(2),
                BackoffType = DelayBackoffType.Exponential,
                UseJitter = true
            })
            .AddCircuitBreaker(new HttpCircuitBreakerStrategyOptions
            {
                FailureRatio = 0.5,
                SamplingDuration = TimeSpan.FromSeconds(30),
                MinimumThroughput = 10,
                BreakDuration = TimeSpan.FromSeconds(30)
            })
            .AddTimeout(TimeSpan.FromSeconds(10))
            .Build();
    }
}`
  },

  sql: {
    filename: "OptimizeLedgerQuery.sql",
    language: "sql",
    title: "SQL Server Query & Index Tuning (4.2s -> 85ms Reduction)",
    code: `-- Drop redundant full table scan index
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Ledgers_Unoptimized')
    DROP INDEX IX_Ledgers_Unoptimized ON dbo.FinancialLedgers;

-- Create Covering Non-Clustered Index with Included Columns
CREATE NONCLUSTERED INDEX IX_FinancialLedgers_Account_Date
ON dbo.FinancialLedgers (AccountId, TransactionDate DESC)
INCLUDE (Amount, TransactionType, ReferenceNo, Status)
WHERE IsDeleted = 0
WITH (FILLFACTOR = 90, DATA_COMPRESSION = PAGE);

-- High Performance Aggregation Stored Procedure
CREATE OR ALTER PROCEDURE dbo.usp_GetAccountSummary
    @AccountId INT,
    @StartDate DATETIME2,
    @EndDate DATETIME2
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    SELECT 
        l.AccountId,
        SUM(CASE WHEN l.TransactionType = 'CR' THEN l.Amount ELSE 0 END) AS TotalCredit,
        SUM(CASE WHEN l.TransactionType = 'DR' THEN l.Amount ELSE 0 END) AS TotalDebit,
        COUNT(l.LedgerId) AS TransactionCount
    FROM dbo.FinancialLedgers l WITH (NOLOCK)
    WHERE l.AccountId = @AccountId
      AND l.TransactionDate >= @StartDate
      AND l.TransactionDate <= @EndDate
      AND l.Status = 'APPROVED'
      AND l.IsDeleted = 0
    GROUP BY l.AccountId;
END;`
  }
};

function renderCodeViewerSnippet(key) {
  const snippet = CODE_SNIPPETS[key];
  if (!snippet) return;

  const titleEl = document.querySelector('#codeViewerTitle');
  const filenameEl = document.querySelector('#codeViewerFilename');
  const codeEl = document.querySelector('#codeViewerText');

  if (titleEl) titleEl.textContent = snippet.title;
  if (filenameEl) filenameEl.textContent = snippet.filename;
  if (codeEl) {
    codeEl.textContent = snippet.code;
  }

  // Update Active Tab Button
  document.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-code-key') === key) {
      btn.classList.add('active');
    }
  });
}

function copyCodeToClipboard() {
  const codeEl = document.querySelector('#codeViewerText');
  if (!codeEl) return;

  navigator.clipboard.writeText(codeEl.textContent).then(() => {
    const copyBtn = document.querySelector('#copyCodeBtn');
    if (copyBtn) {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span>✓ Copied!</span>';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  renderCodeViewerSnippet('cqrs');
});
