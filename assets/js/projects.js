/**
 * ARUN KUMAR RANA - PROJECTS & CASE STUDY MODAL MANAGER
 * Contains real project data and interactive case study modal functionality
 */
const PROJECTS_DATA = [
  {
    id: "project-1",
    title: "Enterprise HRMS & Workflow Engine",
    category: "Enterprise Web App",
    image: "assets/images/projects/img-1.jpg",
    shortDesc: "Configurable employee management, attendance tracking, and multi-level approval workflow platform for enterprise operations.",
    techStack: [".NET Core", "C#", "SQL Server", "ASP.NET MVC", "JavaScript", "Entity Framework"],
    overview: "Designed and engineered an enterprise-grade HR Management System handling workforce administration, attendance tracking, leaves processing, and automated payroll computations for enterprise teams.",
    problem: "The legacy system suffered from slow database queries on employee attendance ledgers, rigid hard-coded approval chains, and fragmented manual record validation.",
    solution: "Built a modular .NET Core solution with dynamic RBAC, optimized T-SQL stored procedures, and a configurable approval workflow engine supporting multi-tier business logic.",
    architecture: "Layered Enterprise Architecture (Presentation Layer -> REST API Controllers -> Business Service Layer -> Repository Pattern -> SQL Server). Integrated Redis caching for frequent policy lookups.",
    myContribution: "Architected the backend REST APIs, designed normalized SQL database schemas, implemented role-based authorization filters, and optimized salary calculation queries reducing processing time by 60%.",
    features: [
      "Dynamic Multi-Level Approval Workflow Engine",
      "Automated Biometric Attendance Integration & Processing",
      "Role-Based Access Control (RBAC) with granular permissions",
      "Comprehensive Employee Performance & Audit Reports"
    ],
    challenges: "Handling concurrent attendance uploads from multiple locations without locking database tables during peak morning check-in hours."
  },
  {
    id: "project-2",
    title: "E-Commerce & Order Management Platform",
    category: "Web Platform",
    image: "assets/images/projects/img-2.jpg",
    shortDesc: "Scalable B2B/B2C online commerce system featuring real-time inventory synchronization, order pipelines, and payment integration.",
    techStack: ["C#", ".NET Web API", "SQL Server", "Dapper", "JavaScript", "REST APIs"],
    overview: "Developed a robust full-stack e-commerce web application with catalog browsing, shopping cart state management, checkout workflow, and automated order fulfillment tracking.",
    problem: "Outdated monolithic catalog search was failing under heavy search filters, resulting in page timeouts and lost shopping carts.",
    solution: "Refactored data access layer from EF reflection to light-weight Dapper ORM queries with indexed SQL views, reducing API response times to under 120ms.",
    architecture: "Microservices-inspired modular API design separating Catalog Service, Order Processing Engine, and Gateway Integration layer.",
    myContribution: "Implemented Web API endpoints, designed transaction management for stock locking during checkout, integrated payment gateway APIs, and built a responsive customer portal.",
    features: [
      "High-performance product catalog with server-side pagination & filtering",
      "Atomic transactional order placement and inventory reservation",
      "Secure payment processing & webhook handling",
      "Customer portal for order tracking & invoice generation"
    ],
    challenges: "Ensuring race-condition free inventory reservation when multiple customers attempt to purchase low-stock items simultaneously."
  },
  {
    id: "project-3",
    title: "Inventory & Stock Control System",
    category: "Business Software",
    image: "assets/images/projects/img-3.jpg",
    shortDesc: "Real-time stock audit, multi-warehouse tracking, supplier management, and automated reorder point alerting system.",
    techStack: ["ASP.NET MVC", "C#", "SQL Server", "Stored Procedures", "jQuery/JS"],
    overview: "Built an end-to-end inventory management system for commercial distribution warehouses, streamlining stock movement auditing and purchase order lifecycle.",
    problem: "Manual stock reconciliations caused high inventory variance and stockout delays due to lack of real-time alerts.",
    solution: "Engineered a centralized database schema with automated SQL triggers, stored procedure batch jobs, and intuitive UI dashboards for stock health visibility.",
    architecture: "ASP.NET MVC architecture with Repository Pattern, dependency injection, and server-side DataTables integration.",
    myContribution: "Designed database ER diagrams, wrote complex stored procedures for stock valuation, and built the stock adjustment workflow.",
    features: [
      "Multi-location warehouse stock movement tracking",
      "Automated reorder point notification system",
      "Supplier PO generation & receipt validation",
      "Valuation reporting using FIFO and Weighted Average methods"
    ],
    challenges: "Reconciling historical inventory ledgers with live physical audit counts without stopping ongoing dispatch operations."
  },
  {
    id: "project-4",
    title: "Corporate Financial & Analytics Dashboard",
    category: "Analytics Platform",
    image: "assets/images/projects/img-4.jpg",
    shortDesc: "Interactive reporting dashboard visualizing key business metrics, financial ledgers, revenue forecasts, and audit logs.",
    techStack: [".NET Core", "C#", "SQL Server", "REST API", "JavaScript", "Chart.js"],
    overview: "Created a high-density executive analytics portal aggregating financial records, cost metrics, and operational performance KPIs.",
    problem: "Leadership teams had to wait for monthly manual Excel reports, delaying strategic decision-making.",
    solution: "Engineered an automated aggregation pipeline in SQL Server providing near real-time visualization widgets and exportable PDF/Excel summaries.",
    architecture: "Decoupled API architecture serving JSON payloads consumed by lightweight custom charting components.",
    myContribution: "Developed aggregated SQL views, RESTful data service endpoints, and configured secure export utilities.",
    features: [
      "Interactive data visualizations with drill-down filters",
      "Exportable financial ledger audits (PDF / Excel format)",
      "Role-based metric visibility for department heads",
      "Automated scheduled data aggregation jobs"
    ],
    challenges: "Aggregating millions of financial transactions efficiently without compromising live database operational performance."
  },
  {
    id: "project-5",
    title: "Real Estate Listing & Client Portal",
    category: "Web Platform",
    image: "assets/images/projects/img-5.jpg",
    shortDesc: "Property management solution with dynamic property search, agent assignment, client inquiries, and document storage.",
    techStack: ["C#", "ASP.NET Core", "SQL Server", "Entity Framework", "Bootstrap/JS"],
    overview: "Built a property management application allowing agents to list properties, schedule client viewings, and manage buyer inquiries.",
    problem: "Inquiries were dropped due to unorganized lead routing and lack of centralized buyer interaction history.",
    solution: "Designed an automated lead routing system that assigns incoming web leads to available agents based on property domain and location.",
    architecture: "Clean Architecture pattern with domain-driven design principles separating Core, Infrastructure, and Application layers.",
    myContribution: "Built the listing management REST APIs, implemented spatial location filtering, and integrated lead notification triggers.",
    features: [
      "Advanced multi-criteria property search & filter engine",
      "Agent-Client inquiry routing & activity timeline",
      "Document upload and lease agreement storage",
      "Mobile-responsive UI for on-field real estate agents"
    ],
    challenges: "Optimizing multi-tag search combinations across dynamic property attributes."
  },
  {
    id: "project-6",
    title: "Healthcare Management & Patient Portal",
    category: "Healthcare System",
    image: "assets/images/projects/img-6.jpg",
    shortDesc: "Secure portal for patient record management, doctor appointment scheduling, prescription tracking, and billing.",
    techStack: [".NET Core", "C#", "SQL Server", "Dapper", "REST API", "JavaScript"],
    overview: "Developed a medical records and appointment scheduling system for outpatient clinics ensuring HIPAA-aligned data privacy.",
    problem: "Manual appointment scheduling led to double bookings and patient wait times.",
    solution: "Implemented an atomic calendar slot booking system with concurrency locks and automated SMS/Email reminders.",
    architecture: "Secure RESTful Web API with JWT bearer token authentication and row-level database security policies.",
    myContribution: "Engineered appointment booking logic, encrypted sensitive medical records at rest, and created doctor schedule management APIs.",
    features: [
      "Real-time appointment slot booking & schedule conflict prevention",
      "Encrypted patient medical records & prescription history",
      "Doctor dashboard for consultation notes & diagnostic requests",
      "Automated appointment reminder service"
    ],
    challenges: "Guaranteeing zero appointment overlap under simultaneous booking requests for popular consultation slots."
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
      </div>
      <div class="project-body">
        <h3 class="project-name">${project.title}</h3>
        <p class="project-desc">${project.shortDesc}</p>
        <div class="project-tech-stack">
          ${project.techStack.map(tech => `<span class="badge">${tech}</span>`).join('')}
        </div>
        <div class="project-footer">
          <button type="button" class="btn btn-secondary btn-sm" onclick="openCaseStudyModal('${project.id}')">
            View Case Study <i class="icon-arrow-right" aria-hidden="true">→</i>
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

  // Populate Modal Data
  document.querySelector('#modalProjectTitle').textContent = project.title;
  document.querySelector('#modalProjectCategory').textContent = project.category;
  
  const contentContainer = document.querySelector('#modalProjectContent');
  contentContainer.innerHTML = `
    <div class="modal-tabs">
      <button class="modal-tab-btn active" onclick="switchModalTab(event, 'tab-overview')">Overview</button>
      <button class="modal-tab-btn" onclick="switchModalTab(event, 'tab-architecture')">Architecture</button>
      <button class="modal-tab-btn" onclick="switchModalTab(event, 'tab-features')">Key Features</button>
      <button class="modal-tab-btn" onclick="switchModalTab(event, 'tab-contribution')">My Contribution</button>
    </div>

    <div id="tab-overview" class="tab-pane active">
      <h4 style="margin-bottom:8px; color:var(--text-primary);">System Summary</h4>
      <p>${project.overview}</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:14px;">
        <div style="background:var(--bg-subtle); padding:12px; border-radius:8px; border:1px solid var(--border-color);">
          <strong style="color:var(--text-primary); font-size:0.84rem;">The Challenge:</strong>
          <p style="font-size:0.8rem; margin-top:4px; margin-bottom:0;">${project.problem}</p>
        </div>
        <div style="background:var(--bg-subtle); padding:12px; border-radius:8px; border:1px solid var(--border-color);">
          <strong style="color:var(--text-primary); font-size:0.84rem;">The Solution:</strong>
          <p style="font-size:0.8rem; margin-top:4px; margin-bottom:0;">${project.solution}</p>
        </div>
      </div>
    </div>

    <div id="tab-architecture" class="tab-pane">
      <h4 style="margin-bottom:8px; color:var(--text-primary);">Architecture & Design Pattern</h4>
      <p>${project.architecture}</p>
      <h5 style="margin-top:12px; margin-bottom:6px; color:var(--text-primary);">Key Technical Challenge Solved:</h5>
      <p style="font-size:0.84rem; background:var(--bg-subtle); padding:10px; border-radius:6px;">${project.challenges}</p>
      <div style="margin-top:12px;">
        <strong style="color:var(--text-primary); font-size:0.84rem;">Technology Stack:</strong>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:6px;">
          ${project.techStack.map(t => `<span class="badge">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <div id="tab-features" class="tab-pane">
      <h4 style="margin-bottom:10px; color:var(--text-primary);">Core Platform Capabilities</h4>
      <ul style="padding-left:18px; font-size:0.875rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
        ${project.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>

    <div id="tab-contribution" class="tab-pane">
      <h4 style="margin-bottom:8px; color:var(--text-primary);">My Direct Role & Impact</h4>
      <p>${project.myContribution}</p>
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

// Close modal on escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeCaseStudyModal();
  }
});

document.addEventListener('DOMContentLoaded', renderProjectsGrid);
