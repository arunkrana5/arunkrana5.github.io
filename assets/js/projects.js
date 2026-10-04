/**
 * ARUN KUMAR RANA - ENTERPRISE PROJECTS & CASE STUDY ENGINE
 * High-Density Senior Lead .NET Full Stack Case Studies
 */
const PROJECTS_DATA = [
  {
    id: "project-1",
    title: "Enterprise HRMS & Workflow Engine",
    category: "Multi-Tenant Enterprise Platform",
    image: "assets/images/projects/img-1.jpg",
    metrics: "50K+ Users • 60% Faster Payroll • 99.9% Uptime",
    shortDesc: "Multi-tenant enterprise HR system with dynamic multi-tier approval workflow engine, automated biometric attendance processing, and salary computation.",
    techStack: [".NET 8", "C# 12", "SQL Server", "ASP.NET Core Web API", "MediatR (CQRS)", "Dapper", "Redis", "SignalR"],
    overview: "Architected and delivered a multi-tenant enterprise HR Management System handling complex workforce hierarchy, attendance reconciliation across 20+ regional offices, leave accrual rules, and automated monthly payroll calculation for 50,000+ employees.",
    problem: "Legacy monolith suffered from severe database locks during morning biometric attendance syncs, hardcoded approval hierarchies that required code deployments for business policy changes, and 45-minute payroll processing runs.",
    solution: "Engineered a Clean Architecture solution utilizing CQRS via MediatR for command/query segregation, Dapper for bulk attendance read queries, Redis distributed caching for policy lookups, and a dynamic JSON-driven approval rule engine.",
    architecture: "Clean Architecture (Domain -> Application -> Infrastructure -> Web API). Implemented Repository & Unit of Work pattern, MediatR Pipeline Behaviors for validation and logging, and SQL Server Table-Valued Parameters (TVPs) for batch processing.",
    myContribution: "Designed normalized T-SQL schemas with temporal tables, implemented JWT claim-based multi-tenant isolation middleware, wrote stored procedures using TVPs for 10x faster batch attendance inserts, and built the C# workflow execution pipeline.",
    features: [
      "Dynamic multi-level approval pipeline with configurable escalation timers",
      "Bulk biometric attendance ingestion engine handling 10,000 records/minute",
      "Automated tax computation & salary ledger generation engine",
      "Real-time notifications via SignalR hubs for leave approvals",
      "Granular RBAC with row-level tenant data security"
    ],
    challenges: "Handling concurrent attendance check-ins from thousands of devices without deadlock errors under SQL Server READ COMMITTED isolation."
  },
  {
    id: "project-2",
    title: "High-Throughput E-Commerce & Payment API",
    category: "Distributed Web API Engine",
    image: "assets/images/projects/img-2.jpg",
    metrics: "100K+ Ops/Day • <45ms SLA • Zero Downtime",
    shortDesc: "High-concurrency B2B/B2C order fulfillment engine featuring atomic stock reservation, payment gateway Webhooks, and sub-50ms search APIs.",
    techStack: ["C# 12", "ASP.NET Core Web API", "SQL Server", "Dapper", "Redis Cache", "Polly Resilience", "Docker"],
    overview: "Built a high-availability order processing platform and RESTful Web API supporting thousands of active product listings, instantaneous cart calculations, resilient payment processing, and automated order dispatch workflows.",
    problem: "High traffic during flash sales resulted in database connection pool exhaustion, duplicate payments due to network timeouts, and catalog search latency exceeding 1.5 seconds.",
    solution: "Shifted catalog queries to Dapper with covering SQL indexes, implemented Redis cache-aside strategy for product listings, and integrated Polly resilience policies (Retry with Exponential Backoff + Circuit Breaker) for payment gateways.",
    architecture: "Decoupled Web API architecture using OpenAPI specifications, Rate Limiting middleware, Health Checks, and Docker containerization deployed on IIS/Cloud infrastructure.",
    myContribution: "Engineered database pessimistic row-locking strategies for atomic stock deduction, integrated Stripe & Razorpay Webhooks with idempotent transaction handling, and optimized SQL query execution plans.",
    features: [
      "High-throughput product search with multi-faceted filtering (<45ms API latency)",
      "Atomic inventory reservation with deadlock prevention algorithms",
      "Idempotent Webhook event handler for payment reconciliation",
      "Polly Circuit Breaker & Retry resilience pipeline for external APIs",
      "Structured OpenTelemetry logging and request tracing"
    ],
    challenges: "Eliminating race conditions when hundreds of users simultaneously hit the checkout API for limited-inventory stock."
  },
  {
    id: "project-3",
    title: "Warehouse Stock Control & Audit System",
    category: "Real-Time Inventory Engine",
    image: "assets/images/projects/img-3.jpg",
    metrics: "Sub-Second Scans • Multi-Warehouse • 100% Audit Track",
    shortDesc: "Real-time stock audit, multi-location warehouse dispatch tracking, automated reorder point alerts, and FIFO ledger reconciliation.",
    techStack: ["ASP.NET Core MVC", "C# 12", "SQL Server", "Stored Procedures", "EF Core", "Dapper", "JavaScript ES6"],
    overview: "Engineered a commercial warehouse stock control application managing multi-bin inventory movements, purchase orders, goods receipt notes (GRN), and physical stock reconciliation across multiple fulfillment centers.",
    problem: "Manual stock entry caused inventory discrepancies, delayed purchase order generation, and inability to trace serial batch numbers across warehouse transfers.",
    solution: "Created an event-driven stock ledger database architecture with T-SQL triggers, automated background reorder point workers, and intuitive barcode scan audit interfaces.",
    architecture: "Layered Enterprise ASP.NET Core solution with hybrid data access (EF Core for CRUD operations, Dapper for complex financial inventory reporting).",
    myContribution: "Designed 3NF database schema, authored T-SQL stored procedures for weighted average inventory valuation, and implemented background hosted services for stock alerts.",
    features: [
      "Real-time multi-bin and multi-warehouse stock movement tracking",
      "Automated purchase order generation upon reaching calculated reorder points",
      "Serial number and batch expiry tracking with FIFO dispatch enforcement",
      "Valuation audit reports supporting FIFO, LIFO, and Weighted Average methods"
    ],
    challenges: "Reconciling historical inventory transactions against live physical count audits while active dispatch operations continued."
  },
  {
    id: "project-4",
    title: "Executive Financial Analytics & ETL Engine",
    category: "Enterprise Analytics Dashboard",
    image: "assets/images/projects/img-4.jpg",
    metrics: "5M+ Rows • <100ms Query Time • Instant Export",
    shortDesc: "High-density executive analytics portal aggregating millions of financial transactions, profit ledgers, revenue projections, and audit logs.",
    techStack: [".NET 8", "C# 12", "SQL Server", "REST API", "T-SQL Aggregations", "JavaScript", "Chart.js"],
    overview: "Designed and implemented an executive financial dashboard aggregating millions of transaction rows into sub-second visual charts, KPI widgets, and compliance audit exports.",
    problem: "Executive leadership relied on manual end-of-month Excel reports that took hours to compile and suffered from data inconsistency across departments.",
    solution: "Engineered an automated SQL Server aggregation pipeline with indexed views, stored procedures, and lightweight API endpoints feeding responsive Chart.js visual grids.",
    architecture: "Decoupled Web API serving JSON data streams with server-side pagination, sorting, and dynamic group-by aggregations.",
    myContribution: "Wrote high-performance T-SQL aggregation queries, implemented Excel/PDF export services using EPPlus, and built role-filtered metric visualization components.",
    features: [
      "Interactive analytics dashboard with dynamic date range & department drill-downs",
      "Exportable financial compliance audit trails (PDF and Excel format)",
      "Role-based metric access control for executive and department managers",
      "Automated SQL Agent nightly aggregation jobs for historical metrics"
    ],
    challenges: "Aggregating millions of financial records on demand without blocking live transactional database tables."
  },
  {
    id: "project-5",
    title: "Real Estate SaaS & Spatial Search Portal",
    category: "High-Density Web Platform",
    image: "assets/images/projects/img-5.jpg",
    metrics: "Geospatial SQL • 25K+ Listings • Instant Filtering",
    shortDesc: "Property management SaaS with geospatial SQL location querying, automated lead assignment, client scheduling, and document vault.",
    techStack: ["C# 12", "ASP.NET Core", "SQL Server Spatial", "EF Core", "REST API", "Bootstrap 5", "JavaScript"],
    overview: "Built a SaaS real estate listing and lead management platform enabling property developers and agents to manage listings, route inquiries, and schedule viewings.",
    problem: "Property search queries were sluggish when combining multiple filter parameters (price range, spatial radius, amenities, property type).",
    solution: "Utilized SQL Server Spatial data types (`GEOGRAPHY`) with spatial indexes and dynamic LINQ query expression trees for sub-50ms search responses.",
    architecture: "Clean Architecture solution with Domain-Driven Design (DDD) principles separating Core Entities, Value Objects, and Application Services.",
    myContribution: "Designed spatial database tables, built property listing REST APIs, and implemented automated lead routing algorithms based on geographic proximity.",
    features: [
      "Geospatial radius search filtering properties within specified kilometer distance",
      "Automated agent lead routing based on property region and workload",
      "Document vault with secure cloud storage links for lease agreements",
      "Mobile-responsive UI designed for field agents on mobile devices"
    ],
    challenges: "Combining spatial geography queries with complex multi-attribute property metadata filters without triggering table scans."
  },
  {
    id: "project-6",
    title: "HIPAA-Compliant Telehealth & Records Portal",
    category: "Healthcare Infrastructure",
    image: "assets/images/projects/img-6.jpg",
    metrics: "AES-256 Encrypted • Zero Overlap • Row Security",
    shortDesc: "Secure clinical management system for patient records, electronic prescriptions, appointment scheduling, and doctor consultations.",
    techStack: [".NET 8 API", "C# 12", "SQL Server", "Dapper", "AES-256 Encryption", "SignalR", "JavaScript"],
    overview: "Engineered a secure healthcare management portal providing appointment booking concurrency locks, encrypted electronic medical records (EMR), and doctor consultation workflows.",
    problem: "Clinic double-booking errors created long patient waiting times and medical records lacked field-level encryption at rest.",
    solution: "Implemented atomic appointment slot booking using SQL Server transaction isolation, AES-256 database column encryption, and SignalR real-time queue updates.",
    architecture: "Secure Web API with JWT bearer token authentication, Custom Exception Middleware, Row-Level Security (RLS) policies, and Audit Logging filters.",
    myContribution: "Engineered slot reservation concurrency locks, implemented database column encryption for sensitive patient data, and created consultation notes Web APIs.",
    features: [
      "Atomic appointment scheduling with zero double-booking guarantee",
      "Field-level AES-256 encryption for sensitive medical notes and prescriptions",
      "Doctor consultation dashboard with live patient queue status via SignalR",
      "Comprehensive HIPAA-aligned audit log recording every data access event"
    ],
    challenges: "Guaranteeing strict concurrency locks on appointment slots while maintaining instant calendar availability lookups."
  }
];

// Modal Controller Functions
function renderProjectsGrid() {
  const container = document.querySelector('#projectsGrid');
  if (!container) return;

  container.innerHTML = PROJECTS_DATA.map(project => `
    <article class="project-card">
      <div class="project-thumb-container">
        <img src="${project.image}" alt="${project.title}" class="project-thumb-img" loading="lazy">
        <span class="project-category-badge">${project.category}</span>
        <div class="project-metric-banner">⚡ ${project.metrics}</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">${project.title}</h3>
        <p class="project-desc">${project.shortDesc}</p>
        <div class="project-tech-stack">
          ${project.techStack.slice(0, 5).map(tech => `<span class="badge">${tech}</span>`).join('')}
          ${project.techStack.length > 5 ? `<span class="badge badge-purple">+${project.techStack.length - 5} more</span>` : ''}
        </div>
        <div class="project-footer">
          <button type="button" class="btn btn-secondary btn-sm" onclick="openCaseStudyModal('${project.id}')">
            Architecture Case Study <i class="icon-arrow-right" aria-hidden="true">→</i>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function openCaseStudyModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modalOverlay = document.querySelector('#caseStudyModal');
  if (!modalOverlay) return;

  document.querySelector('#modalProjectTitle').textContent = project.title;
  document.querySelector('#modalProjectCategory').textContent = project.category;
  
  const contentContainer = document.querySelector('#modalProjectContent');
  contentContainer.innerHTML = `
    <div class="modal-metrics-bar">
      <span>🚀 <strong>Key Impact Metric:</strong> ${project.metrics}</span>
    </div>

    <div class="modal-tabs">
      <button class="modal-tab-btn active" onclick="switchModalTab(event, 'tab-overview')">System Overview</button>
      <button class="modal-tab-btn" onclick="switchModalTab(event, 'tab-architecture')">Architecture & Stack</button>
      <button class="modal-tab-btn" onclick="switchModalTab(event, 'tab-features')">Core Capabilities</button>
      <button class="modal-tab-btn" onclick="switchModalTab(event, 'tab-contribution')">Senior Leadership Role</button>
    </div>

    <div id="tab-overview" class="tab-pane active">
      <h4 style="margin-bottom:8px; color:var(--text-primary);">Executive System Summary</h4>
      <p style="font-size:0.9rem; line-height:1.6;">${project.overview}</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px;">
        <div style="background:var(--bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--border-color);">
          <strong style="color:var(--text-accent); font-size:0.85rem; display:block; margin-bottom:4px;">🚨 The Problem & Bottleneck:</strong>
          <p style="font-size:0.825rem; margin:0; line-height:1.5;">${project.problem}</p>
        </div>
        <div style="background:var(--bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--border-color);">
          <strong style="color:var(--accent-emerald); font-size:0.85rem; display:block; margin-bottom:4px;">💡 The Technical Solution:</strong>
          <p style="font-size:0.825rem; margin:0; line-height:1.5;">${project.solution}</p>
        </div>
      </div>
    </div>

    <div id="tab-architecture" class="tab-pane">
      <h4 style="margin-bottom:8px; color:var(--text-primary);">Architectural Pattern & Data Flow</h4>
      <p style="font-size:0.875rem; line-height:1.6;">${project.architecture}</p>
      
      <div style="background:var(--bg-subtle); padding:12px; border-radius:8px; border-left:3px solid var(--accent-amber); margin-top:12px;">
        <strong style="color:var(--text-primary); font-size:0.85rem;">⚡ Engineering Challenge Solved:</strong>
        <p style="font-size:0.825rem; margin-top:4px; margin-bottom:0; color:var(--text-secondary);">${project.challenges}</p>
      </div>

      <div style="margin-top:16px;">
        <strong style="color:var(--text-primary); font-size:0.85rem; display:block; margin-bottom:6px;">Complete Technology Stack:</strong>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          ${project.techStack.map(t => `<span class="badge">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <div id="tab-features" class="tab-pane">
      <h4 style="margin-bottom:12px; color:var(--text-primary);">Core Enterprise Features Delivered</h4>
      <ul style="padding-left:18px; font-size:0.875rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:8px;">
        ${project.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>

    <div id="tab-contribution" class="tab-pane">
      <h4 style="margin-bottom:8px; color:var(--text-primary);">My Direct Engineering Contribution</h4>
      <p style="font-size:0.9rem; line-height:1.6; color:var(--text-secondary);">${project.myContribution}</p>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseStudyModal() {
  const modalOverlay = document.querySelector('#caseStudyModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchModalTab(event, tabId) {
  const tabBtns = document.querySelectorAll('.modal-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => btn.classList.remove('active'));
  tabPanes.forEach(pane => pane.classList.remove('active'));

  event.currentTarget.classList.add('active');
  const activePane = document.getElementById(tabId);
  if (activePane) {
    activePane.classList.add('active');
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeCaseStudyModal();
  }
});

document.addEventListener('DOMContentLoaded', renderProjectsGrid);
