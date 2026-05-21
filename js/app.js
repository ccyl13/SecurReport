const state = {
    lang: 'es',
    showSplash: false,
    activeTab: 'editor',
    isLoading: false,
    currentReportId: null,
    reportTheme: 'light',
    savedReports: [],
    showReportSelector: false,
    auditData: {
        documentTitle: 'Reporte Técnico de Vulnerabilidades',
        clientCompany: 'Empresa Cliente S.A.',
        clientLogo: ['', ''],
        targetAsset: 'Aplicación Principal',
        auditorCompany: 'Empresa Auditora LLC',
        auditorName: 'Juan Pérez',
        classification: '2',
        version: '1.0',
        date: new Date().toISOString().split('T')[0],
        lang: 'es',
        auditType: 'pentesting_web',
        hasIncidents: false,
        incidentsText: '',
        auditSummary: '',
        testsPerformed: '',
        recommendedSolutions: ''  // kept for legacy load compatibility
    },
    findings: [],
    editingFindingIndex: null,
    currentFinding: {
        templateKey: 'custom',
        title: '',
        severity: 'med',
        description: '',
        cvss: '',
        poc: '',
        impact: '',
        remediation: '',
        reference: '',
        cve: '',
        images: []
    },
    isDirty: false
};

const UI = {
    es: {
        appTitle: 'Pentestify',
        appSubtitle: 'Security Report Generator',
        welcome: 'Bienvenido a',
        tagline: 'Generador de Reportes de Pentesting',
        description: 'Crea reportes profesionales de vulnerabilidades con plantillas predefinidas y exportación PDF.',
        enterApp: 'Entrar a la Aplicación',
        newFinding: 'Registrar Nuevo Hallazgo',
        newFindingDesc: 'Completa los detalles de la vulnerabilidad descubierta.',
        quickTemplate: 'Plantilla Rápida (Auto-completar)',
        customOther: 'Personalizado / Otro',
        vulnTitle: 'Título de la Vulnerabilidad',
        severity: 'Nivel de Severidad',
        description: 'Descripción de la Vulnerabilidad',
        cvss: 'Puntuación CVSS (0-10)',
        poc: 'Pasos para Reproducir (PoC)',
        impact: 'Impacto en el Negocio',
        remediation: 'Solución y Remediación',
        reference: 'Referencias (URLs)',
        cve: 'Identificador CVE',
        images: 'Evidencias (Imágenes)',
        addImages: 'Agregar Imágenes',
        addFinding: 'Agregar Hallazgo',
        updateFinding: 'Actualizar Hallazgo',
        cancel: 'Cancelar',
        preview: 'Vista Previa',
        generatePdf: 'Generar PDF',
        saveReport: 'Guardar Reporte',
        myReports: 'Mis Reportes',
        backToEditor: 'Volver al Editor',
        createNewReport: 'Crear Nuevo Reporte',
        noReports: 'No hay reportes guardados',
        noReportsDesc: 'Crea tu primer reporte usando el botón de arriba',
        editor: 'Edición',
        severityLevels: {
            crit: 'Crítico',
            high: 'Alto',
            med: 'Medio',
            low: 'Bajo',
            info: 'Informativo'
        },
        targetAsset: 'Activo a Auditar',
        clientCompany: 'Empresa Cliente',
        clientLogo1: 'Logotipo 1 (opcional)',
        clientLogo2: 'Logotipo 2 (opcional)',
        auditorCompany: 'Empresa Auditora',
        auditorName: 'Nombre del Auditor',
        documentTitle: 'Título del Documento',
        date: 'Fecha del Reporte',
        classification: 'Clasificación',
        version: 'Versión',
        classifications: {
            '1': 'Público',
            '2': 'Interno',
            '3': 'Confidencial',
            '4': 'Restringido'
        },
        auditType: 'Tipo de Auditoría',
        auditTypes: {
            'pentesting_web': 'Pentesting Web',
            'caja_negra': 'Caja Negra (Black Box)',
            'caja_gris': 'Caja Gris (Grey Box)',
            'caja_blanca': 'Caja Blanca (White Box)',
            'intrusion_interna': 'Intrusión Interna',
            'phishing': 'Campaña de Phishing',
            'analisis_automatico': 'Análisis Automático de Vulnerabilidades'
        },
        incidents: 'Incidencias durante la Auditoría',
        incidentsYes: 'Sí, hubo incidencias',
        incidentsNo: 'No hubo incidencias',
        incidentsDesc: 'Descripción de las incidencias',
        incidentsNoneText: 'No se registraron incidencias durante el proceso de auditoría.',
        incidentsSectionTitle: 'Incidencias',
        autoSectionsTitle: 'Resumen de la Auditoría (auto-generado)',
        autoSectionsHint: 'Estas secciones se generan automáticamente a partir de las vulnerabilidades del informe.',
        auditSummarySection: 'Resumen de la Auditoría',
        positiveAspectsSection: 'Aspectos Positivos',
        auditDevelopmentSection: 'Desarrollo de la Auditoría',
        conclusionsSection: 'Conclusiones',
        // Preview/PDF translations
        index: 'Índice',
        auditorDataSection: 'Auditor y Datos de la Auditoría',
        scopeAndObject: 'Objeto y Alcance',
        methodologiesApplied: 'Metodologías Aplicadas',
        auditExecution: 'Ejecución de la Auditoría',
        executiveSummary: 'Resumen Ejecutivo',
        executiveSummaryWithCVSS: 'Resumen Ejecutivo (CVSS)',
        technicalFindings: 'Hallazgos Técnicos',
        incidentsRecorded: 'Se registraron incidencias durante la auditoría',
        cvssScore: 'CVSS Score',
        cveId: 'CVE',
        referenceUrl: 'URL de Referencia',
        pocSteps: 'Pasos para Reproducir (PoC)',
        evidence: 'Evidencias',
        businessImpact: 'Impacto en el Negocio',
        solutionRemediation: 'Solución y Remediación',
        na: 'N/A',
        auditConclusions: 'Conclusiones y Resumen de la Auditoría',
        logoClient: 'Logo Cliente',
        logoClientAlt: 'Logo Cliente',
        cvssSummaryTitle: 'Resumen de Vulnerabilidades (CVSS)',
        noFindings: 'No hay hallazgos registrados'
    },
    en: {
        appTitle: 'Pentestify',
        appSubtitle: 'Security Report Generator',
        welcome: 'Welcome to',
        tagline: 'Pentesting Report Generator',
        description: 'Create professional vulnerability reports with predefined templates and PDF export.',
        enterApp: 'Enter Application',
        newFinding: 'Register New Finding',
        newFindingDesc: 'Complete the details of the discovered vulnerability.',
        quickTemplate: 'Quick Template (Auto-fill)',
        customOther: 'Custom / Other',
        vulnTitle: 'Vulnerability Title',
        severity: 'Severity Level',
        description: 'Vulnerability Description',
        cvss: 'CVSS Score (0-10)',
        poc: 'Steps to Reproduce (PoC)',
        impact: 'Business Impact',
        remediation: 'Solution and Remediation',
        reference: 'References (URLs)',
        cve: 'CVE Identifier',
        images: 'Evidence (Images)',
        addImages: 'Add Images',
        addFinding: 'Add Finding',
        updateFinding: 'Update Finding',
        cancel: 'Cancel',
        preview: 'Preview',
        generatePdf: 'Generate PDF',
        saveReport: 'Save Report',
        myReports: 'My Reports',
        backToEditor: 'Back to Editor',
        createNewReport: 'Create New Report',
        noReports: 'No saved reports',
        noReportsDesc: 'Create your first report using the button above',
        editor: 'Editor',
        severityLevels: {
            crit: 'Critical',
            high: 'High',
            med: 'Medium',
            low: 'Low',
            info: 'Informational'
        },
        targetAsset: 'Target Asset',
        clientCompany: 'Client Company',
        clientLogo1: 'Client Logo 1 (optional)',
        clientLogo2: 'Client Logo 2 (optional)',
        auditorCompany: 'Auditor Company',
        auditorName: 'Auditor Name',
        documentTitle: 'Document Title',
        date: 'Report Date',
        classification: 'Classification',
        version: 'Version',
        classifications: {
            '1': 'Public',
            '2': 'Internal',
            '3': 'Confidential',
            '4': 'Restricted'
        },
        auditType: 'Audit Type',
        auditTypes: {
            'pentesting_web': 'Web Pentesting',
            'caja_negra': 'Black Box',
            'caja_gris': 'Grey Box',
            'caja_blanca': 'White Box',
            'intrusion_interna': 'Internal Intrusion',
            'phishing': 'Phishing Campaign',
            'analisis_automatico': 'Automatic Vulnerability Analysis'
        },
        incidents: 'Incidents during the Audit',
        incidentsYes: 'Yes, there were incidents',
        incidentsNo: 'No incidents',
        incidentsDesc: 'Incident description',
        incidentsNoneText: 'No incidents were recorded during the audit process.',
        incidentsSectionTitle: 'Incidents',
        autoSectionsTitle: 'Audit Summary (auto-generated)',
        autoSectionsHint: 'These sections are automatically generated from the report vulnerabilities.',
        auditSummarySection: 'Audit Summary',
        positiveAspectsSection: 'Positive Aspects',
        auditDevelopmentSection: 'Audit Development',
        conclusionsSection: 'Conclusions',
        // Preview/PDF translations
        index: 'Index',
        auditorDataSection: 'Auditor and Audit Data',
        scopeAndObject: 'Scope and Objectives',
        methodologiesApplied: 'Applied Methodologies',
        auditExecution: 'Audit Execution',
        executiveSummary: 'Executive Summary',
        executiveSummaryWithCVSS: 'Executive Summary (CVSS)',
        technicalFindings: 'Technical Findings',
        incidentsRecorded: 'Incidents were recorded during the audit',
        cvssScore: 'CVSS Score',
        cveId: 'CVE',
        referenceUrl: 'Reference URL',
        pocSteps: 'Steps to Reproduce (PoC)',
        evidence: 'Evidence',
        businessImpact: 'Business Impact',
        solutionRemediation: 'Solution and Remediation',
        na: 'N/A',
        auditConclusions: 'Audit Conclusions and Summary',
        logoClient: 'Client Logo',
        logoClientAlt: 'Client Logo',
        cvssSummaryTitle: 'Vulnerabilities Summary (CVSS)',
        noFindings: 'No findings registered'
    }
};

let templates = {};

async function loadTemplates() {
    try {
        const response = await fetch('js/plantillas.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        templates = await response.json();
    } catch (error) {
        console.error('Error loading templates:', error);
        // Fallback: templates remain empty, app will still work but without auto-fill
    }
}

// Load templates on startup
document.addEventListener('DOMContentLoaded', loadTemplates);

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const escapeHTML = (str) => {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

const formatMultiline = (str) => escapeHTML(str).replace(/\n/g, '<br>');

const severityWeights = { crit: 5, high: 4, med: 3, low: 2, info: 1 };

function sortFindingsBySeverity(findings) {
    return findings.sort((a, b) => {
        const weightDiff = severityWeights[b.severity] - severityWeights[a.severity];
        if (weightDiff !== 0) return weightDiff;
        const cvssA = parseFloat(a.cvss) || 0;
        const cvssB = parseFloat(b.cvss) || 0;
        return cvssB - cvssA;
    });
}

// Helper: Leer archivo como Data URL
const readFileAsDataURL = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
});

// Helper: Calcular severidad desde CVSS
const calculateSeverityFromCvss = (cvss) => {
    const score = parseFloat(cvss);
    if (isNaN(score)) return null;
    if (score >= 9.0) return 'crit';
    if (score >= 7.0) return 'high';
    if (score >= 4.0) return 'med';
    if (score > 0.0) return 'low';
    return 'info';
};

const API = {
    baseUrl: '',

    async request(method, endpoint, data = null) {
        const url = `${this.baseUrl}${endpoint}`;
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (data) options.body = JSON.stringify(data);

        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    reports: {
        getAll: () => API.request('GET', '/api/reports'),
        getById: (id) => API.request('GET', `/api/reports/${id}`),
        create: (data) => API.request('POST', '/api/reports', data),
        update: (id, data) => API.request('PUT', `/api/reports/${id}`, data),
        delete: (id) => API.request('DELETE', `/api/reports/${id}`)
    },

    findings: {
        create: (reportId, data) => API.request('POST', `/api/reports/${reportId}/findings`, data),
        update: (findingId, data) => API.request('PUT', `/api/findings/${findingId}`, data),
        delete: (findingId) => API.request('DELETE', `/api/findings/${findingId}`)
    }
};

function renderSplashScreen() {
    if (!state.showSplash) return '';

    const t = UI[state.lang];

    return `
        <div class="splash-screen">
            <div class="splash-content">
                <div class="splash-logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M12 8v4"/><path d="M12 16h.01"/>
                    </svg>
                </div>
                <h1 class="splash-title">${t.appTitle}</h1>
                <p class="splash-tagline">${t.tagline}</p>
                <p class="splash-desc">${t.description}</p>
                
                <div class="splash-actions">
                    <button class="btn-enter" onclick="enterApp()">${t.enterApp}</button>
                    <div class="lang-toggle">
                        <button class="${state.lang === 'es' ? 'active' : ''}" onclick="setLang('es')">ES</button>
                        <button class="${state.lang === 'en' ? 'active' : ''}" onclick="setLang('en')">EN</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderNavbar() {
    if (state.showSplash) return '';

    const t = UI[state.lang];

    return `
        <header class="navbar">
            <div class="navbar-brand">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="height: 32px; width: 32px; color: #6366f1; flex-shrink: 0;">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M12 8v4"/><path d="M12 16h.01"/>
                </svg>
                ${state.isDirty ? '<span class="dirty-indicator">•</span>' : ''}
            </div>
            
            <div class="navbar-actions">
                <button class="${state.showReportSelector ? 'active' : ''}" onclick="showReports()">${t.myReports}</button>
                <button onclick="createNewReport()" style="display:flex;align-items:center;gap:0.4rem;background:#16a34a;color:white;border:none;padding:0.45rem 0.9rem;border-radius:6px;font-weight:700;cursor:pointer;font-size:0.85rem;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    ${t.createNewReport}
                </button>
                <button class="${state.activeTab === 'editor' && !state.showReportSelector ? 'active' : ''}" onclick="hideReports(); setTab('editor')">${t.editor}</button>
                <button class="${state.activeTab === 'preview' && !state.showReportSelector ? 'active' : ''}" onclick="hideReports(); setTab('preview')">${t.preview}</button>
                ${state.activeTab === 'preview' && !state.showReportSelector ? `
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <button onclick="setReportTheme('light')" title="Tema claro" style="padding:0.4rem 0.75rem;border-radius:6px;border:2px solid ${state.reportTheme === 'light' ? '#3b82f6' : '#e2e8f0'};background:${state.reportTheme === 'light' ? '#eff6ff' : 'white'};cursor:pointer;font-size:0.8rem;font-weight:600;">Claro</button>
                    <button onclick="setReportTheme('dark')" title="Tema oscuro" style="padding:0.4rem 0.75rem;border-radius:6px;border:2px solid ${state.reportTheme === 'dark' ? '#3b82f6' : '#e2e8f0'};background:${state.reportTheme === 'dark' ? '#1e293b' : 'white'};color:${state.reportTheme === 'dark' ? '#f1f5f9' : '#374151'};cursor:pointer;font-size:0.8rem;font-weight:600;">Oscuro</button>
                    <button class="btn-primary" onclick="generatePdfFromBackend()">${t.generatePdf}</button>
                </div>` : ''}
                <div class="lang-toggle-editor">
                    <button class="${state.lang === 'es' ? 'active' : ''}" onclick="setLang('es')" title="Español">ES</button>
                    <button class="${state.lang === 'en' ? 'active' : ''}" onclick="setLang('en')" title="English">EN</button>
                </div>
            </div>
        </header>
    `;
}

function renderEditor() {
    if (state.activeTab !== 'editor' || state.showSplash || state.showReportSelector) return '';
    if (state.showReportSelector) return '';

    const t = UI[state.lang];

    return `
        <div class="editor-container">
            <div class="editor-left">
                <div class="card">
                    <h2>${t.newFinding}</h2>
                    <p class="text-muted">${t.newFindingDesc}</p>
                    
                    <form id="findingForm" onsubmit="handleFindingSubmit(event)">
                        <div class="form-group template-search-container">
                            <label>${t.quickTemplate}</label>
                            <input type="text"
                                   id="templateSearch"
                                   class="template-search-input"
                                   placeholder="${state.lang === 'es' ? 'Buscar plantilla...' : 'Search template...'}"
                                   oninput="filterTemplates(this.value)"
                                   onfocus="showTemplateDropdown()"
                                   autocomplete="off">
                            <select id="templateSelect" onchange="applyTemplate(this.value); hideTemplateDropdown();" size="8" class="template-filtered-select" style="display:none;">
                                <option value="custom" ${state.currentFinding.templateKey === 'custom' ? 'selected' : ''}>${t.customOther}</option>
                                <option value="sqli" ${state.currentFinding.templateKey === 'sqli' ? 'selected' : ''}>SQL Injection</option>
                                <option value="xss" ${state.currentFinding.templateKey === 'xss' ? 'selected' : ''}>XSS</option>
                                <option value="idor" ${state.currentFinding.templateKey === 'idor' ? 'selected' : ''}>IDOR</option>
                                <option value="ssrf" ${state.currentFinding.templateKey === 'ssrf' ? 'selected' : ''}>SSRF</option>
                                <option value="csrf" ${state.currentFinding.templateKey === 'csrf' ? 'selected' : ''}>CSRF</option>
                                <option value="xxe" ${state.currentFinding.templateKey === 'xxe' ? 'selected' : ''}>XXE</option>
                                <option value="rce" ${state.currentFinding.templateKey === 'rce' ? 'selected' : ''}>RCE</option>
                                <option value="lfi" ${state.currentFinding.templateKey === 'lfi' ? 'selected' : ''}>LFI</option>
                                <option value="cors" ${state.currentFinding.templateKey === 'cors' ? 'selected' : ''}>CORS Misconfig</option>
                                <option value="path_traversal" ${state.currentFinding.templateKey === 'path_traversal' ? 'selected' : ''}>Path Traversal</option>
                                <option value="command_injection" ${state.currentFinding.templateKey === 'command_injection' ? 'selected' : ''}>Command Injection</option>
                                <option value="insecure_deserialization" ${state.currentFinding.templateKey === 'insecure_deserialization' ? 'selected' : ''}>Insecure Deserialization</option>
                                <option value="jwt_bypass" ${state.currentFinding.templateKey === 'jwt_bypass' ? 'selected' : ''}>JWT Bypass</option>
                                <option value="file_upload" ${state.currentFinding.templateKey === 'file_upload' ? 'selected' : ''}>File Upload</option>
                                <option value="security_misconfig" ${state.currentFinding.templateKey === 'security_misconfig' ? 'selected' : ''}>Security Misconfig</option>
                                <option value="missing_csp" ${state.currentFinding.templateKey === 'missing_csp' ? 'selected' : ''}>Missing CSP Header</option>
                                <option value="missing_x_frame" ${state.currentFinding.templateKey === 'missing_x_frame' ? 'selected' : ''}>Missing X-Frame-Options</option>
                                <option value="missing_x_content_type" ${state.currentFinding.templateKey === 'missing_x_content_type' ? 'selected' : ''}>Missing X-Content-Type-Options</option>
                                <option value="missing_referrer" ${state.currentFinding.templateKey === 'missing_referrer' ? 'selected' : ''}>Missing Referrer-Policy</option>
                                <option value="missing_permissions" ${state.currentFinding.templateKey === 'missing_permissions' ? 'selected' : ''}>Missing Permissions-Policy</option>
                                <optgroup label="WordPress">
                                    <option value="wordpress_xmlrpc" ${state.currentFinding.templateKey === 'wordpress_xmlrpc' ? 'selected' : ''}>WP XML-RPC Enabled</option>
                                    <option value="wordpress_rest_enum" ${state.currentFinding.templateKey === 'wordpress_rest_enum' ? 'selected' : ''}>WP User Enum via REST API</option>
                                    <option value="wordpress_error_enum" ${state.currentFinding.templateKey === 'wordpress_error_enum' ? 'selected' : ''}>WP User Enum via Errors</option>
                                    <option value="wordpress_login_brute" ${state.currentFinding.templateKey === 'wordpress_login_brute' ? 'selected' : ''}>WP Brute Force Login</option>
                                    <option value="wordpress_plugin_enum" ${state.currentFinding.templateKey === 'wordpress_plugin_enum' ? 'selected' : ''}>WP Plugin Enumeration</option>
                                    <option value="wordpress_theme_enum" ${state.currentFinding.templateKey === 'wordpress_theme_enum' ? 'selected' : ''}>WP Theme Enumeration</option>
                                    <option value="wordpress_config_exposure" ${state.currentFinding.templateKey === 'wordpress_config_exposure' ? 'selected' : ''}>WP wp-config.php Exposed</option>
                                    <option value="wordpress_uploads_directory" ${state.currentFinding.templateKey === 'wordpress_uploads_directory' ? 'selected' : ''}>WP Uploads Dir Listing</option>
                                    <option value="wordpress_version_leak" ${state.currentFinding.templateKey === 'wordpress_version_leak' ? 'selected' : ''}>WP Version Leak</option>
                                    <option value="wordpress_db_backup" ${state.currentFinding.templateKey === 'wordpress_db_backup' ? 'selected' : ''}>WP Database Backup Exposed</option>
                                </optgroup>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>${t.vulnTitle}</label>
                            <input type="text" id="findingTitle" value="${escapeHTML(state.currentFinding.title)}" required oninput="updateCurrentFinding('title', this.value)">
                        </div>
                        
                        <div class="form-group">
                            <label>${t.severity}</label>
                            <select id="findingSeverity" onchange="updateCurrentFinding('severity', this.value)">
                                ${Object.entries(t.severityLevels).map(([key, label]) =>
        `<option value="${key}" ${state.currentFinding.severity === key ? 'selected' : ''}>${label}</option>`
    ).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>${t.description}</label>
                            <textarea id="findingDescription" rows="4" oninput="updateCurrentFinding('description', this.value)">${escapeHTML(state.currentFinding.description)}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>${t.cvss}</label>
                            <input type="text" id="findingCvss" value="${escapeHTML(state.currentFinding.cvss)}" oninput="updateCurrentFinding('cvss', this.value)">
                        </div>
                        
                        <div class="form-group">
                            <label>${t.poc}</label>
                            <textarea id="findingPoc" rows="4" oninput="updateCurrentFinding('poc', this.value)">${escapeHTML(state.currentFinding.poc)}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>${t.impact}</label>
                            <textarea id="findingImpact" rows="3" oninput="updateCurrentFinding('impact', this.value)">${escapeHTML(state.currentFinding.impact)}</textarea>
                        </div>

                        <div class="form-group image-upload-section" onpaste="handleImagePaste(event)">
                            <label>${t.images} <small style="font-weight:normal;color:#666;">(también puedes pegar imagen con Ctrl+V aquí)</small></label>
                            <input type="file" id="findingImages" accept="image/*" multiple onchange="handleImageUpload(event)">
                            <small class="text-muted">${state.currentFinding.images.length} imagen(es) seleccionada(s)</small>
                        </div>

                        ${state.currentFinding.images.length > 0 ? `
                        <div class="image-preview-container">
                            ${state.currentFinding.images.map((img, idx) => `
                                <div class="image-preview-item">
                                    <img src="${img}" alt="Evidencia ${idx + 1}">
                                    <button type="button" class="image-remove-btn" onclick="removeImage(${idx})">×</button>
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}

                        <div class="form-group">
                            <label>${t.remediation}</label>
                            <textarea id="findingRemediation" rows="3" oninput="updateCurrentFinding('remediation', this.value)">${escapeHTML(state.currentFinding.remediation)}</textarea>
                        </div>

                        <div class="form-group">
                            <label>${t.reference}</label>
                            <input type="text" id="findingReference" value="${escapeHTML(state.currentFinding.reference)}" oninput="updateCurrentFinding('reference', this.value)">
                        </div>

                        <div class="form-group">
                            <label>${t.cve}</label>
                            <input type="text" id="findingCve" value="${escapeHTML(state.currentFinding.cve)}" oninput="updateCurrentFinding('cve', this.value)">
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn-primary">${state.editingFindingIndex !== null ? t.updateFinding : t.addFinding}</button>
                            <button type="button" onclick="resetFindingForm()">${t.cancel}</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div class="editor-right">
                ${renderAuditData()}
                ${renderFindingsList()}
            </div>
        </div>
    `;
}

function getMethodologyText(auditData, lang) {
    const isEs = lang !== 'en';
    const map = {
        pentesting_web: isEs
            ? `En primer lugar, se llevó a cabo una fase de reconocimiento pasivo orientada a identificar los activos expuestos públicamente, las tecnologías en uso y posibles vectores de entrada. A continuación, se realizó un análisis activo de la aplicación web mediante técnicas manuales y herramientas especializadas de análisis de seguridad.`
            : `First, a passive reconnaissance phase was conducted to identify publicly exposed assets, technologies in use and potential entry vectors. An active analysis of the web application was then performed using manual techniques and specialised security analysis tools.`,
        caja_negra: isEs
            ? `La auditoría se abordó bajo metodología de caja negra, sin conocimiento previo del entorno. En una primera fase se desarrollaron tareas de reconocimiento OSINT para identificar activos expuestos, servicios accesibles y posibles filtraciones de información en fuentes públicas. Con la información recopilada, se procedió a evaluar los vectores de ataque más relevantes.`
            : `The audit was approached using a black box methodology, without prior knowledge of the environment. In a first phase, OSINT reconnaissance tasks were carried out to identify exposed assets, accessible services and possible information leaks in public sources. With the gathered information, the most relevant attack vectors were evaluated.`,
        caja_gris: isEs
            ? `Bajo metodología de caja gris, y con un conocimiento parcial del entorno proporcionado por el cliente, se procedió a analizar los vectores de ataque más relevantes. La fase de reconocimiento fue complementada con la información facilitada, lo que permitió optimizar el alcance de las pruebas realizadas.`
            : `Under a grey box methodology, with partial knowledge of the environment provided by the client, the most relevant attack vectors were analysed. The reconnaissance phase was supplemented with the information provided, which allowed the scope of the tests to be optimised.`,
        caja_blanca: isEs
            ? `Bajo metodología de caja blanca, con acceso completo al código fuente, documentación y arquitectura del sistema, se realizó una revisión exhaustiva de los flujos de autenticación, autorización, gestión de sesiones y tratamiento de datos. El análisis incluyó tanto revisión estática del código como pruebas dinámicas sobre el entorno habilitado.`
            : `Under a white box methodology, with full access to source code, documentation and system architecture, an exhaustive review of authentication, authorisation, session management and data handling flows was carried out. The analysis included both static code review and dynamic testing on the enabled environment.`,
        intrusion_interna: isEs
            ? `La prueba de intrusión interna se desarrolló simulando el comportamiento de un atacante con acceso físico o lógico a la red corporativa. En una primera fase se llevaron a cabo tareas de enumeración de servicios, identificación de activos internos y análisis de vectores de movimiento lateral.`
            : `The internal intrusion test was carried out simulating the behaviour of an attacker with physical or logical access to the corporate network. In a first phase, service enumeration, internal asset identification and lateral movement vector analysis tasks were performed.`,
        phishing: isEs
            ? `La campaña de phishing se diseñó para evaluar el grado de concienciación del personal ante correos electrónicos maliciosos y técnicas de ingeniería social. Se simularon distintos escenarios de ataque, variando el pretexto, el nivel de personalización y los mecanismos de captura empleados.`
            : `The phishing campaign was designed to assess staff awareness against malicious emails and social engineering techniques. Different attack scenarios were simulated, varying the pretext, level of personalisation and capture mechanisms used.`,
        analisis_automatico: isEs
            ? `Se llevó a cabo un análisis automático de vulnerabilidades mediante herramientas especializadas de escaneo activo. Los resultados obtenidos fueron revisados y validados manualmente con el fin de descartar falsos positivos y determinar la explotabilidad real de cada hallazgo.`
            : `An automatic vulnerability analysis was carried out using specialised active scanning tools. The results obtained were manually reviewed and validated in order to rule out false positives and determine the real exploitability of each finding.`
    };
    return map[auditData.auditType] || (isEs
        ? `Se llevó a cabo una auditoría de seguridad sobre ${auditData.targetAsset || 'el sistema objetivo'} siguiendo una metodología estructurada que combina técnicas de análisis manual y automatizado.`
        : `A security audit was conducted on ${auditData.targetAsset || 'the target system'} following a structured methodology combining manual and automated analysis techniques.`);
}

function generateAuditSections(findings, auditData, lang) {
    const isEs = lang !== 'en';
    const counts = {
        crit: findings.filter(f => f.severity === 'crit').length,
        high: findings.filter(f => f.severity === 'high').length,
        med:  findings.filter(f => f.severity === 'med').length,
        low:  findings.filter(f => f.severity === 'low').length,
        info: findings.filter(f => f.severity === 'info').length
    };
    const total = findings.length;
    const target = auditData.targetAsset || (isEs ? 'el sistema objetivo' : 'the target system');
    const riskLabel = counts.crit > 0 ? (isEs ? 'crítico' : 'critical')
        : counts.high > 0 ? (isEs ? 'alto' : 'high')
        : counts.med  > 0 ? (isEs ? 'medio' : 'medium')
        : counts.low  > 0 ? (isEs ? 'bajo' : 'low')
        : (isEs ? 'informativo' : 'informational');

    // --- ASPECTOS POSITIVOS ---
    const positives = [];
    if (counts.crit === 0 && counts.high === 0) {
        positives.push(isEs
            ? `La infraestructura auditada no presenta vulnerabilidades de carácter crítico ni alto, lo que indica que los controles de seguridad perimetrales se encuentran correctamente implementados.`
            : `The audited infrastructure does not present critical or high severity vulnerabilities, indicating that perimeter security controls are correctly implemented.`);
    } else if (counts.crit === 0) {
        positives.push(isEs
            ? `No se han identificado vulnerabilidades de criticidad crítica en el sistema, lo que refleja que los controles de seguridad de mayor impacto están adecuadamente aplicados.`
            : `No critical severity vulnerabilities have been identified in the system, reflecting that the highest-impact security controls are adequately applied.`);
    }
    if (['pentesting_web','caja_negra','caja_gris'].includes(auditData.auditType)) {
        positives.push(isEs
            ? `Las comunicaciones del sistema se realizan mediante protocolo HTTPS, lo que garantiza la confidencialidad e integridad de los datos en tránsito.`
            : `System communications are carried out using the HTTPS protocol, ensuring the confidentiality and integrity of data in transit.`);
    }
    if (counts.crit === 0 && counts.high === 0 && counts.med === 0) {
        positives.push(isEs
            ? `El sistema no presenta vulnerabilidades de impacto operativo significativo. Los hallazgos identificados son de carácter menor y no comprometen la integridad global de la plataforma.`
            : `The system does not present vulnerabilities with significant operational impact. The identified findings are minor in nature and do not compromise the overall integrity of the platform.`);
    } else {
        positives.push(isEs
            ? `A pesar de los hallazgos detectados, el sistema dispone de controles que han limitado la superficie de exposición y dificultado la explotación encadenada de vulnerabilidades.`
            : `Despite the detected findings, the system has controls that have limited the exposure surface and made chained exploitation of vulnerabilities more difficult.`);
    }
    const positiveAspects = positives.join('\n\n');

    // --- DESARROLLO DE LA AUDITORÍA ---
    let auditDevelopment = '';
    if (total === 0) {
        auditDevelopment = isEs
            ? `A lo largo del proceso de evaluación no se identificaron vulnerabilidades explotables en el sistema. La superficie analizada no presentó vectores de ataque aprovechables dentro del alcance definido.`
            : `Throughout the evaluation process, no exploitable vulnerabilities were identified in the system. The analysed surface did not present exploitable attack vectors within the defined scope.`;
    } else {
        const countParts = [];
        if (counts.crit > 0) countParts.push(isEs ? `${counts.crit} de criticidad crítica` : `${counts.crit} critical`);
        if (counts.high > 0) countParts.push(isEs ? `${counts.high} de criticidad alta` : `${counts.high} high`);
        if (counts.med  > 0) countParts.push(isEs ? `${counts.med} de criticidad media` : `${counts.med} medium`);
        if (counts.low  > 0) countParts.push(isEs ? `${counts.low} de criticidad baja` : `${counts.low} low`);
        if (counts.info > 0) countParts.push(isEs ? `${counts.info} de carácter informativo` : `${counts.info} informational`);

        auditDevelopment = isEs
            ? `Durante la ejecución de la auditoría sobre ${target} se identificaron un total de ${total} vulnerabilidad${total !== 1 ? 'es' : ''}, distribuidas de la siguiente forma: ${countParts.join(', ')}.`
            : `During the execution of the audit on ${target}, a total of ${total} vulnerabilit${total !== 1 ? 'ies were' : 'y was'} identified, distributed as follows: ${countParts.join(', ')}.`;

        const critHighFindings = findings.filter(f => f.severity === 'crit' || f.severity === 'high');
        if (critHighFindings.length > 0) {
            const sevLabel = { crit: isEs ? 'Crítica' : 'Critical', high: isEs ? 'Alta' : 'High' };
            critHighFindings.forEach(f => {
                const descSnippet = f.description ? f.description.replace(/<[^>]+>/g, '').substring(0, 180).trimEnd() : '';
                const impactSnippet = f.impact ? f.impact.replace(/<[^>]+>/g, '').split('.')[0].substring(0, 150).trimEnd() : '';
                let para = isEs
                    ? `\n\nSe detectó la vulnerabilidad "${f.title}" con una severidad ${sevLabel[f.severity]}.`
                    : `\n\nThe vulnerability "${f.title}" was detected with ${sevLabel[f.severity]} severity.`;
                if (descSnippet) {
                    para += isEs
                        ? ` ${descSnippet}${descSnippet.length === 180 ? '...' : ''}`
                        : ` ${descSnippet}${descSnippet.length === 180 ? '...' : ''}`;
                }
                if (impactSnippet) {
                    para += isEs
                        ? ` El impacto asociado a esta vulnerabilidad recae sobre ${impactSnippet}.`
                        : ` The impact associated with this vulnerability falls on ${impactSnippet}.`;
                }
                auditDevelopment += para;
            });
        }

        const medFindings = findings.filter(f => f.severity === 'med');
        if (medFindings.length > 0) {
            const items = medFindings.map(f => {
                const descSnippet = f.description ? f.description.replace(/<[^>]+>/g, '').substring(0, 100).trimEnd() : '';
                return descSnippet
                    ? (isEs ? `"${f.title}": ${descSnippet}${descSnippet.length === 100 ? '...' : ''}` : `"${f.title}": ${descSnippet}${descSnippet.length === 100 ? '...' : ''}`)
                    : `"${f.title}"`;
            }).join(isEs ? '; ' : '; ');
            auditDevelopment += isEs
                ? `\n\nEn el rango de severidad media se identificaron ${medFindings.length} vulnerabilidad${medFindings.length !== 1 ? 'es' : ''}: ${items}.`
                : `\n\nIn the medium severity range, ${medFindings.length} vulnerabilit${medFindings.length !== 1 ? 'ies were' : 'y was'} identified: ${items}.`;
        }

        const lowInfoFindings = findings.filter(f => f.severity === 'low' || f.severity === 'info');
        if (lowInfoFindings.length > 0) {
            const list = lowInfoFindings.map(f => `"${f.title}"`).join(', ');
            auditDevelopment += isEs
                ? `\n\nPor último, se registraron ${lowInfoFindings.length} hallazgo${lowInfoFindings.length !== 1 ? 's' : ''} de baja criticidad o carácter informativo: ${list}. Estos hallazgos no representan un riesgo operativo inmediato, si bien su corrección contribuye a la mejora del nivel de seguridad global del sistema.`
                : `\n\nFinally, ${lowInfoFindings.length} low severity or informational finding${lowInfoFindings.length !== 1 ? 's were' : ' was'} recorded: ${list}. These findings do not represent an immediate operational risk, although addressing them contributes to improving the overall security level of the system.`;
        }
    }

    // --- CONCLUSIONES ---
    let conclusions = '';
    if (total === 0) {
        conclusions = isEs
            ? `La auditoría realizada sobre ${target} no ha revelado vulnerabilidades explotables dentro del alcance evaluado. El sistema mantiene un nivel de seguridad adecuado para el contexto en el que opera. Se recomienda mantener los controles actuales y establecer un ciclo de auditorías periódicas que permita detectar posibles regresiones ante cambios futuros en la infraestructura.`
            : `The audit carried out on ${target} has not revealed exploitable vulnerabilities within the evaluated scope. The system maintains an adequate security level for the context in which it operates. It is recommended to maintain current controls and establish a periodic audit cycle to detect possible regressions in the face of future infrastructure changes.`;
    } else {
        const urgency = counts.crit > 0 || counts.high > 0
            ? (isEs
                ? ` Las vulnerabilidades de criticidad crítica y alta requieren atención inmediata, dado el riesgo que representan para la confidencialidad, integridad y disponibilidad del sistema.`
                : ` Critical and high severity vulnerabilities require immediate attention, given the risk they represent to the confidentiality, integrity and availability of the system.`)
            : (isEs
                ? ` Se recomienda abordar los hallazgos de forma planificada, integrando su corrección en el ciclo de desarrollo o mantenimiento habitual.`
                : ` It is recommended to address the findings in a planned manner, integrating their correction into the usual development or maintenance cycle.`);

        const findingsWithRem = findings
            .filter(f => f.remediation && f.remediation.trim().length > 0)
            .sort((a,b) => ['crit','high','med','low','info'].indexOf(a.severity) - ['crit','high','med','low','info'].indexOf(b.severity));
        const sevLabelMap = isEs
            ? { crit: 'Crítica', high: 'Alta', med: 'Media', low: 'Baja', info: 'Informativa' }
            : { crit: 'Critical', high: 'High', med: 'Medium', low: 'Low', info: 'Informational' };

        let remBlock = '';
        if (findingsWithRem.length > 0) {
            const items = findingsWithRem.map(f => `• ${f.title} [${sevLabelMap[f.severity]}]: ${f.remediation.trim()}`).join('\n\n');
            remBlock = isEs
                ? `\n\nA continuación se detallan las medidas de remediación recomendadas:\n\n${items}`
                : `\n\nBelow are the recommended remediation measures:\n\n${items}`;
        } else {
            remBlock = isEs
                ? `\n\nSe recomienda revisar cada hallazgo identificado y aplicar las correcciones pertinentes priorizando los de mayor criticidad.`
                : `\n\nIt is recommended to review each identified finding and apply the relevant corrections, prioritising those with the highest criticality.`;
        }

        const closing = isEs
            ? `\n\nUna vez aplicadas las correcciones, se aconseja llevar a cabo una auditoría de verificación que confirme la resolución efectiva de las vulnerabilidades reportadas.`
            : `\n\nOnce the corrections have been applied, it is advisable to carry out a verification audit confirming the effective resolution of the reported vulnerabilities.`;

        conclusions = (isEs
            ? `El nivel de riesgo global de ${target} se considera ${riskLabel} en base a los hallazgos identificados durante la presente auditoría.`
            : `The overall risk level of ${target} is considered ${riskLabel} based on the findings identified during this audit.`)
            + urgency + remBlock + closing;
    }

    return { positiveAspects, auditDevelopment, conclusions };
}

function renderMethodologiesContent(auditData, lang) {
    const isEs = lang !== 'en';
    const auditTypeText = getMethodologyText(auditData, lang);

    const cvssTable = `
        <table style="width:100%; border-collapse:collapse; margin:0.75rem 0 1rem; font-size:0.85rem;">
            <thead>
                <tr style="background:#7c3aed; color:white;">
                    <th style="padding:0.4rem 0.75rem; text-align:left; border-radius:4px 0 0 0;">${isEs ? 'Clasificación' : 'Classification'}</th>
                    <th style="padding:0.4rem 0.75rem; text-align:left;">CVSS</th>
                    <th style="padding:0.4rem 0.75rem; text-align:left; border-radius:0 4px 0 0;">${isEs ? 'Descripción' : 'Description'}</th>
                </tr>
            </thead>
            <tbody>
                <tr style="background:#fff1f2;">
                    <td style="padding:0.35rem 0.75rem; font-weight:700; color:#dc2626;">${isEs ? 'CRÍTICA' : 'CRITICAL'}</td>
                    <td style="padding:0.35rem 0.75rem; color:#dc2626; font-weight:600;">9.0 – 10.0</td>
                    <td style="padding:0.35rem 0.75rem; color:#374151;">${isEs ? 'Requieren atención urgente. Su explotación puede dar al atacante control total sobre el sistema.' : 'Require urgent attention. Exploitation may give the attacker full control over the system.'}</td>
                </tr>
                <tr style="background:#fff7ed;">
                    <td style="padding:0.35rem 0.75rem; font-weight:700; color:#ea580c;">${isEs ? 'ALTA' : 'HIGH'}</td>
                    <td style="padding:0.35rem 0.75rem; color:#ea580c; font-weight:600;">7.0 – 8.9</td>
                    <td style="padding:0.35rem 0.75rem; color:#374151;">${isEs ? 'Deben corregirse prioritariamente. Pueden comprometer información confidencial o facilitar el acceso no autorizado.' : 'Should be fixed with priority. They can compromise confidential information or facilitate unauthorised access.'}</td>
                </tr>
                <tr style="background:#fefce8;">
                    <td style="padding:0.35rem 0.75rem; font-weight:700; color:#ca8a04;">${isEs ? 'MEDIA' : 'MEDIUM'}</td>
                    <td style="padding:0.35rem 0.75rem; color:#ca8a04; font-weight:600;">4.0 – 6.9</td>
                    <td style="padding:0.35rem 0.75rem; color:#374151;">${isEs ? 'Riesgo moderado. Pueden actuar como vectores de acceso secundarios si no se subsanan.' : 'Moderate risk. May act as secondary access vectors if not remediated.'}</td>
                </tr>
                <tr style="background:#f0fdf4;">
                    <td style="padding:0.35rem 0.75rem; font-weight:700; color:#16a34a;">${isEs ? 'BAJA' : 'LOW'}</td>
                    <td style="padding:0.35rem 0.75rem; color:#16a34a; font-weight:600;">0.1 – 3.9</td>
                    <td style="padding:0.35rem 0.75rem; color:#374151;">${isEs ? 'Bajo impacto directo. Útiles para recolección de información por el atacante. Deben contemplarse en la hoja de ruta de mejora.' : 'Low direct impact. Useful for attacker information gathering. Should be addressed in the improvement roadmap.'}</td>
                </tr>
            </tbody>
        </table>`;

    const frameworks = [
        {
            name: 'OWASP',
            subtitle: isEs ? '(Open Web Application Security Project)' : '(Open Web Application Security Project)',
            body: isEs
                ? `Proyecto de código abierto centrado en la identificación y mitigación de vulnerabilidades en aplicaciones software. Como referencia principal se emplea el <strong>OWASP Top 10 (2021)</strong>, que recoge los diez riesgos más críticos en aplicaciones web: A1-Pérdida de control de acceso, A2-Fallos criptográficos, A3-Inyección, A4-Diseño inseguro, A5-Configuración de seguridad incorrecta, A6-Componentes desactualizados o vulnerables, A7-Fallos de identificación y autenticación, A8-Fallos de integridad del software, A9-Fallos de monitorización y logs, A10-SSRF.`
                : `Open-source project focused on identifying and mitigating vulnerabilities in software applications. The main reference used is the <strong>OWASP Top 10 (2021)</strong>, which covers the ten most critical risks in web applications: A1-Broken Access Control, A2-Cryptographic Failures, A3-Injection, A4-Insecure Design, A5-Security Misconfiguration, A6-Vulnerable and Outdated Components, A7-Identification and Authentication Failures, A8-Software and Data Integrity Failures, A9-Security Logging and Monitoring Failures, A10-SSRF.`
        },
        {
            name: 'OSSTMM',
            subtitle: isEs ? '(Open Source Security Testing Methodology Manual)' : '(Open Source Security Testing Methodology Manual)',
            body: isEs
                ? `Uno de los estándares profesionales más completos para auditorías de seguridad. Establece un marco de trabajo estructurado en seis secciones que abarca la seguridad de la información, de los procesos, de las tecnologías de internet, de las comunicaciones, de las redes inalámbricas y de la seguridad física. Su aplicación garantiza una cobertura sistemática y exhaustiva del alcance evaluado.`
                : `One of the most comprehensive professional standards for security audits. It establishes a structured framework covering six sections: information security, process security, internet technology security, communications security, wireless security and physical security. Its application ensures systematic and thorough coverage of the evaluated scope.`
        },
        {
            name: 'CVSS',
            subtitle: isEs ? '(Common Vulnerability Scoring System)' : '(Common Vulnerability Scoring System)',
            body: isEs
                ? `Framework abierto y universalmente adoptado para comunicar las características, el impacto y la severidad de las vulnerabilidades detectadas. El sistema de puntuación se compone de tres grupos de métricas —Base, Temporal y de Entorno— y permite establecer una priorización objetiva de la remediación. La siguiente tabla refleja la escala de equivalencias empleada en este informe:`
                : `Open and universally adopted framework for communicating the characteristics, impact and severity of detected vulnerabilities. The scoring system is composed of three metric groups —Base, Temporal and Environmental— and enables objective prioritisation of remediation. The following table reflects the equivalence scale used in this report:`,
            extra: cvssTable
        },
        {
            name: 'MITRE ATT&CK',
            subtitle: isEs ? '(Adversarial Tactics, Techniques and Common Knowledge)' : '(Adversarial Tactics, Techniques and Common Knowledge)',
            body: isEs
                ? `Base de conocimientos globalmente reconocida que describe las tácticas, técnicas y procedimientos (TTP) empleados por actores maliciosos en ataques reales. En el contexto de esta auditoría, la Matriz MITRE ATT&CK sirve como marco de referencia para evaluar la robustez de la infraestructura frente a las técnicas de ataque documentadas y para contextualizar los hallazgos dentro del ciclo de ataque completo.`
                : `Globally recognised knowledge base describing the tactics, techniques and procedures (TTPs) used by threat actors in real-world attacks. In the context of this audit, the MITRE ATT&CK Matrix serves as a reference framework to assess the robustness of the infrastructure against documented attack techniques and to contextualise findings within the full attack lifecycle.`
        }
    ];

    const frameworksHTML = frameworks.map(fw => `
        <div style="margin-top:1.25rem;">
            <p style="margin:0 0 0.35rem;"><strong style="color:#4c1d95;">${fw.name}</strong> <span style="color:#6b7280; font-size:0.9em;">${fw.subtitle}</span></p>
            <p style="margin:0; text-align:justify;">${fw.body}</p>
            ${fw.extra || ''}
        </div>`).join('');

    return `
        <p style="margin:0 0 1.25rem; text-align:justify;">${auditTypeText}</p>
        <hr style="border:none; border-top:1px solid #e9d5ff; margin:1.25rem 0;">
        <p style="margin:0 0 0.75rem; font-weight:700; color:#4c1d95; font-size:0.95rem; text-transform:uppercase; letter-spacing:0.05em;">
            ${isEs ? 'Marcos de referencia aplicados' : 'Applied reference frameworks'}
        </p>
        ${frameworksHTML}`;
}

function renderAuditData() {
    const t = UI[state.lang];
    const d = state.auditData;

    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="margin: 0;">Datos de la Auditoría</h3>
                <button class="btn-primary" onclick="saveCurrentReport()" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem;" title="${t.saveReport}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    <span>${t.saveReport}</span>
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>${t.documentTitle}</label>
                    <input type="text" value="${escapeHTML(d.documentTitle)}" onchange="updateAuditData('documentTitle', this.value)">
                </div>
                <div class="form-group">
                    <label>${t.clientCompany}</label>
                    <input type="text" value="${escapeHTML(d.clientCompany)}" onchange="updateAuditData('clientCompany', this.value)">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group" style="flex: 1;">
                    <label>${t.clientLogo1 || 'Logotipo 1'}</label>
                    <input type="file" accept="image/*" onchange="handleClientLogoUpload(event, 0)">
                    ${d.clientLogo[0] ? `
                        <div style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                            <img src="${d.clientLogo[0]}" alt="Logo 1" style="height: 40px; border-radius: 4px; border: 1px solid #e5e7eb;">
                            <button type="button" class="btn-sm btn-secondary" onclick="removeClientLogo(0)">×</button>
                        </div>
                    ` : ''}
                </div>
                <div class="form-group" style="flex: 1;">
                    <label>${t.clientLogo2 || 'Logotipo 2'}</label>
                    <input type="file" accept="image/*" onchange="handleClientLogoUpload(event, 1)">
                    ${d.clientLogo[1] ? `
                        <div style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                            <img src="${d.clientLogo[1]}" alt="Logo 2" style="height: 40px; border-radius: 4px; border: 1px solid #e5e7eb;">
                            <button type="button" class="btn-sm btn-secondary" onclick="removeClientLogo(1)">×</button>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>${t.targetAsset}</label>
                    <input type="text" value="${escapeHTML(d.targetAsset)}" onchange="updateAuditData('targetAsset', this.value)">
                </div>
                <div class="form-group">
                    <label>${t.auditorCompany}</label>
                    <input type="text" value="${escapeHTML(d.auditorCompany)}" onchange="updateAuditData('auditorCompany', this.value)">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>${t.auditorName}</label>
                    <input type="text" value="${escapeHTML(d.auditorName)}" onchange="updateAuditData('auditorName', this.value)">
                </div>
                <div class="form-group">
                    <label>${t.classification}</label>
                    <select onchange="updateAuditData('classification', this.value)">
                        ${Object.entries(t.classifications).map(([key, label]) =>
        `<option value="${key}" ${d.classification === key ? 'selected' : ''}>${label}</option>`
    ).join('')}
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>${t.version}</label>
                    <input type="text" value="${escapeHTML(d.version)}" onchange="updateAuditData('version', this.value)">
                </div>
                <div class="form-group">
                    <label>${t.date}</label>
                    <input type="date" value="${escapeHTML(d.date)}" onchange="updateAuditData('date', this.value)">
                </div>
            </div>

            <div class="form-group">
                <label>${t.auditType}</label>
                <select onchange="updateAuditData('auditType', this.value)">
                    ${Object.entries(t.auditTypes).map(([key, label]) =>
        `<option value="${key}" ${d.auditType === key ? 'selected' : ''}>${label}</option>`
    ).join('')}
                </select>
            </div>

            <div class="form-group">
                <label>${t.incidents}</label>
                <div class="incidents-toggle" style="display:flex; gap:0.75rem; margin-bottom:0.5rem;">
                    <label style="display:flex; align-items:center; gap:0.4rem; font-weight:500; text-transform:none; letter-spacing:normal; cursor:pointer;">
                        <input type="radio" name="hasIncidents" value="no" ${!d.hasIncidents ? 'checked' : ''} onchange="updateAuditData('hasIncidents', false); document.getElementById('incidentsTextContainer').style.display='none';" style="width:auto; padding:0; margin:0;">
                        ${t.incidentsNo}
                    </label>
                    <label style="display:flex; align-items:center; gap:0.4rem; font-weight:500; text-transform:none; letter-spacing:normal; cursor:pointer;">
                        <input type="radio" name="hasIncidents" value="yes" ${d.hasIncidents ? 'checked' : ''} onchange="updateAuditData('hasIncidents', true); document.getElementById('incidentsTextContainer').style.display='block';" style="width:auto; padding:0; margin:0;">
                        ${t.incidentsYes}
                    </label>
                </div>
                <div id="incidentsTextContainer" style="display: ${d.hasIncidents ? 'block' : 'none'}; margin-top: 0.5rem;">
                    <textarea rows="3" placeholder="${t.incidentsDesc}..." oninput="updateAuditData('incidentsText', this.value)">${escapeHTML(d.incidentsText)}</textarea>
                </div>
            </div>

            <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #e5e7eb;">

            <div class="form-group">
                <label>${t.autoSectionsTitle}</label>
                <small style="display:block; color:#666; margin-bottom:1rem; font-weight:normal;">${t.autoSectionsHint}</small>
                ${(() => {
                    const sections = generateAuditSections(state.findings, d, state.lang);
                    const items = [
                        { key: 'positiveAspectsSection', icon: '✅', text: sections.positiveAspects },
                        { key: 'auditDevelopmentSection', icon: '🔍', text: sections.auditDevelopment },
                        { key: 'conclusionsSection', icon: '📌', text: sections.conclusions }
                    ];
                    return items.map(item => `
                        <div style="margin-bottom:1rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1rem;">
                            <div style="font-weight:700; color:#1e40af; margin-bottom:0.4rem;">${item.icon} ${t[item.key]}</div>
                            <div style="color:#374151; font-size:0.875rem; white-space:pre-wrap; line-height:1.6;">${escapeHTML(item.text)}</div>
                        </div>
                    `).join('');
                })()}
            </div>
        </div>
    `;
}

function renderFindingsList() {
    const t = UI[state.lang];

    if (state.findings.length === 0) {
        return `<div class="card"><p class="text-muted">${t.noFindings}</p></div>`;
    }

    return `
        <div class="findings-list">
            ${state.findings.map((f, idx) => `
                <div class="finding-item severity-${f.severity}">
                    <div class="finding-header">
                        <span class="finding-number">#${idx + 1}</span>
                        <span class="finding-title">${escapeHTML(f.title)}</span>
                        <span class="finding-severity">${t.severityLevels[f.severity]}</span>
                        <div class="finding-actions">
                            <button class="btn-edit" onclick="editFinding(${idx})" title="${state.lang === 'es' ? 'Editar' : 'Edit'}">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                            </button>
                            <button class="btn-delete" onclick="deleteFinding(${idx})" title="${state.lang === 'es' ? 'Eliminar' : 'Delete'}">×</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderCvssSummary() {
    const total = state.findings.length;
    if (total === 0) return '';

    const t = UI[state.lang];
    const counts = {
        crit: state.findings.filter(f => f.severity === 'crit').length,
        high: state.findings.filter(f => f.severity === 'high').length,
        med: state.findings.filter(f => f.severity === 'med').length,
        low: state.findings.filter(f => f.severity === 'low').length,
        info: state.findings.filter(f => f.severity === 'info').length
    };

    const colors = {
        crit: 'var(--severity-crit, #dc2626)',
        high: 'var(--severity-high, #f97316)',
        med: 'var(--severity-med, #eab308)',
        low: 'var(--severity-low, #22c55e)',
        info: 'var(--severity-info, #6b7280)'
    };

    const order = ['crit', 'high', 'med', 'low', 'info'];
    let barSegments = '';
    let legendItems = '';

    for (const sev of order) {
        if (counts[sev] > 0) {
            const pct = (counts[sev] / total) * 100;
            barSegments += `<div style="width: ${pct}%; background-color: ${colors[sev]}; height: 100%; transition: width 0.3s;" title="${t.severityLevels[sev]}: ${counts[sev]}"></div>`;
        }

        legendItems += `
            <div style="display: flex; align-items: center; gap: 0.5rem; background: #f9fafb; padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #e5e7eb;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${colors[sev]};"></div>
                <span style="font-weight: 500; color: #374151;">${t.severityLevels[sev]}</span>
                <span style="font-weight: 800; color: #111827; margin-left: 0.25rem;">${counts[sev]}</span>
            </div>
        `;
    }

    return `
        <div class="cvss-summary card" style="margin: 2rem 0; padding: 1.5rem; page-break-inside: avoid;">
            <h3 style="margin-bottom: 1.5rem; border-bottom: 1px solid #f3f4f6; padding-bottom: 0.75rem; color: #111827;">${t.cvssSummaryTitle}</h3>
            
            <div style="display: flex; height: 28px; width: 100%; border-radius: 6px; overflow: hidden; margin-bottom: 1.5rem; box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06);">
                ${barSegments}
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
                ${legendItems}
            </div>
        </div>
    `;
}

function renderSectionHeader(title, id = '') {
    return `<h2 id="${id}" style="font-size:2rem; color:#111827; margin-bottom:2rem; border-bottom:3px solid #2563eb; padding-bottom:0.75rem; font-weight:800;">${title}</h2>`;
}

function renderSubsectionHeader(title, id = '', iconStroke = '#2563eb', iconPath = '') {
    const icon = iconPath ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${iconStroke}" stroke-width="2">${iconPath}</svg>` : '';
    return `<h3 id="${id}" style="font-size:1.35rem; color:#1f2937; margin-bottom:1rem; font-weight:700; display:flex; align-items:center; gap:0.5rem;">${icon}${title}</h3>`;
}

function renderPreview() {
    if (state.activeTab !== 'preview' || state.showSplash || state.showReportSelector) return '';

    const t = UI[state.lang];
    const d = state.auditData;
    const auditTypeLabel = (t.auditTypes && t.auditTypes[d.auditType]) || d.auditType || '';
    const classLabel = (t.classifications && t.classifications[d.classification]) || d.classification || '';

    return `
        <div class="preview-container">
            <!-- ==================== PORTADA ==================== -->
            <div class="cover-page" style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 100vh;
                page-break-after: always;
                page-break-inside: avoid;
                background: #ffffff;
                color: #111827;
                padding: 0 3rem 0.25rem 3rem;
            ">
                
                <!-- PARTE SUPERIOR Y MEDIA CENTRALIZADA -->
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex: 1;">
                    
                    <div style="margin-bottom: 1rem; width: 100%; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        ${d.clientLogo[0] || d.clientLogo[1] ? `
                            ${d.clientLogo[0] ? `
                                <img src="${d.clientLogo[0]}" alt="${t.logoClient} 1" style="max-height: 200px; width: auto; max-width: 45%; object-fit: contain; display: block; filter: drop-shadow(0 10px 25px rgba(0,0,0,0.08));">
                            ` : ''}
                            ${d.clientLogo[1] ? `
                                <img src="${d.clientLogo[1]}" alt="${t.logoClient} 2" style="max-height: 200px; width: auto; max-width: 45%; object-fit: contain; display: block; filter: drop-shadow(0 10px 25px rgba(0,0,0,0.08));">
                            ` : ''}
                        ` : `
                            <div style="width:160px; height:160px; background:linear-gradient(135deg,#2563eb,#1e40af); border-radius:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 15px 40px rgba(37,99,235,0.3);">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                            </div>
                        `}
                    </div>

                    <!-- TÍTULO + RED TEAM INFO -->
                    <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
                        <h1 style="font-size: 3.5rem; font-weight: 900; letter-spacing: -0.04em; margin: 0 0 1.25rem; color: #0f172a; line-height:1.1; max-width: 800px;">
                            ${escapeHTML(d.documentTitle)}
                        </h1>

                        <div style="width: 80px; height: 5px; background: linear-gradient(90deg, #2563eb, #6366f1); border-radius: 6px; margin-bottom: 1.5rem; box-shadow: 0 4px 10px rgba(37,99,235,0.3);"></div>

                        <p style="font-size: 1.35rem; color: #475569; font-weight: 600; margin:0; letter-spacing: -0.01em;">
                            ${escapeHTML(d.targetAsset)}
                        </p>
                    </div>
                </div>

                <div style="margin-top: 2rem; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <div style="display: flex; gap: 0;">
                        <div style="flex: 1; padding: 0 1rem; border-right: 1px solid #cbd5e1;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
                                <span style="font-size:0.6rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.1em;">${t.clientCompany}</span>
                            </div>
                            <p style="font-size:0.95rem; font-weight:700; color:#0f172a; margin:0; line-height:1.4;">${escapeHTML(d.clientCompany)}</p>
                        </div>
                        <div style="flex: 1; padding: 0 1rem; border-right: 1px solid #cbd5e1;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <span style="font-size:0.6rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.1em;">${t.auditorCompany}</span>
                            </div>
                            <p style="font-size:0.95rem; font-weight:700; color:#0f172a; margin:0; line-height:1.4;">${escapeHTML(d.auditorCompany)}</p>
                            <p style="font-size:0.8rem; font-weight:500; color:#64748b; margin:0.25rem 0 0 0;">${escapeHTML(d.auditorName)}</p>
                        </div>
                        <div style="flex: 1; padding: 0 1rem; border-right: 1px solid #cbd5e1;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                <span style="font-size:0.6rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.1em;">${t.date}</span>
                            </div>
                            <p style="font-size:0.95rem; font-weight:700; color:#0f172a; margin:0;">${escapeHTML(d.date)}</p>
                        </div>
                        <div style="flex: 0.7; padding: 0 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                                <span style="font-size:0.6rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.1em;">${t.version}</span>
                            </div>
                            <p style="font-size:1.1rem; font-weight:800; color:#2563eb; margin:0;">${escapeHTML(d.version)}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- ==================== ÍNDICE ==================== -->
            <div class="index-page" style="padding: 4rem 2rem; min-height: 100vh; page-break-after: always; max-width: 900px; margin: 0 auto;">
                <h2 style="font-size:2.25rem; color:#111827; margin-bottom:2.5rem; border-bottom:2px solid #e5e7eb; padding-bottom:1rem; font-weight:800;">${t.index}</h2>
                <div style="display:flex; flex-direction:column; gap:0.5rem;">

                    <!-- Sección 1: Auditor y datos -->
                    <a href="#auditor-data" style="display:flex; text-decoration:none; color:#111827; font-weight:700; padding:0.75rem 0; border-bottom:1px dotted #d1d5db; font-size:1.125rem;">
                        1. ${t.auditorDataSection}
                    </a>
                    <a href="#scope" style="display:flex; text-decoration:none; color:#374151; font-weight:500; padding:0.5rem 0 0.5rem 1.5rem; border-bottom:1px dotted #e5e7eb; font-size:0.95rem;">
                        1.1 ${t.scopeAndObject}
                    </a>
                    <a href="#incidents" style="display:flex; text-decoration:none; color:#374151; font-weight:500; padding:0.5rem 0 0.5rem 1.5rem; border-bottom:1px dotted #e5e7eb; font-size:0.95rem;">
                        1.2 ${t.incidentsSectionTitle}
                    </a>
                    <a href="#methodologies" style="display:flex; text-decoration:none; color:#374151; font-weight:500; padding:0.5rem 0 0.5rem 1.5rem; border-bottom:1px dotted #e5e7eb; font-size:0.95rem;">
                        1.3 ${t.methodologiesApplied}
                    </a>

                    <!-- Sección 2: Ejecución -->
                    <a href="#execution" style="display:flex; text-decoration:none; color:#111827; font-weight:700; padding:0.75rem 0; border-bottom:1px dotted #d1d5db; font-size:1.125rem; margin-top:0.5rem;">
                        2. ${t.auditExecution}
                    </a>
                    ${state.findings.map((f, idx) => `
                        <a href="#finding-${idx}" style="display:flex; justify-content:space-between; text-decoration:none; color:#374151; padding:0.5rem 0 0.5rem 1.5rem; border-bottom:1px dotted #e5e7eb; align-items:center; font-size:0.95rem;">
                            <span><span style="font-weight:700; color:#6b7280; margin-right:0.5rem;">2.${idx+1}</span>${escapeHTML(f.title)}</span>
                            <span style="font-size:0.7rem; font-weight:700; text-transform:uppercase; padding:0.2rem 0.5rem; border-radius:5px; background-color:var(--severity-${f.severity}); color:white; white-space:nowrap; margin-left:1rem;">${t.severityLevels[f.severity]}</span>
                        </a>
                    `).join('')}

                    <!-- Sección 3: Resumen -->
                    <a href="#audit-summary" style="display:flex; text-decoration:none; color:#111827; font-weight:700; padding:0.75rem 0; border-bottom:1px dotted #d1d5db; font-size:1.125rem; margin-top:0.5rem;">
                        3. ${t.auditSummarySection}
                    </a>
                    <a href="#positive-aspects" style="display:flex; text-decoration:none; color:#374151; font-weight:500; padding:0.5rem 0 0.5rem 1.5rem; border-bottom:1px dotted #e5e7eb; font-size:0.95rem;">
                        3.1 ${t.positiveAspectsSection}
                    </a>
                    <a href="#audit-development" style="display:flex; text-decoration:none; color:#374151; font-weight:500; padding:0.5rem 0 0.5rem 1.5rem; border-bottom:1px dotted #e5e7eb; font-size:0.95rem;">
                        3.2 ${t.auditDevelopmentSection}
                    </a>
                    <a href="#conclusions" style="display:flex; text-decoration:none; color:#374151; font-weight:500; padding:0.5rem 0 0.5rem 1.5rem; border-bottom:1px dotted #e5e7eb; font-size:0.95rem;">
                        3.3 ${t.conclusionsSection}
                    </a>
                </div>
            </div>

            <!-- ==================== SECCIÓN 1: AUDITOR Y DATOS ==================== -->
            <div id="auditor-data" style="padding:2rem 0; page-break-before:always;">
                ${renderSectionHeader(t.auditorDataSection, '')}

                <!-- 1.1 Objeto y Alcance -->
                ${renderSubsectionHeader(t.scopeAndObject, 'scope', '#2563eb', '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>')}
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; margin-bottom:2.5rem;">
                    ${[
                        [t.documentTitle,    escapeHTML(d.documentTitle)],
                        [t.targetAsset,      escapeHTML(d.targetAsset)],
                        [t.clientCompany,    escapeHTML(d.clientCompany)],
                        [t.auditorCompany,   escapeHTML(d.auditorCompany)],
                        [t.auditorName,      escapeHTML(d.auditorName)],
                        [t.auditType,        escapeHTML(auditTypeLabel)],
                        [t.classification,   escapeHTML(classLabel)],
                        [t.date,             escapeHTML(d.date)],
                        [t.version,          escapeHTML(d.version)]
                    ].map(([label, val], i) => `
                        <div style="display:flex; padding:0.85rem 1.5rem; ${i % 2 === 0 ? 'background:#f8fafc;' : 'background:#fff;'} border-bottom:1px solid #e2e8f0;">
                            <span style="font-size:0.78rem; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:0.05em; min-width:200px;">${label}</span>
                            <span style="font-size:0.95rem; font-weight:600; color:#111827;">${val}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- 1.2 Incidencias -->
                ${renderSubsectionHeader(t.incidentsSectionTitle, 'incidents', '#f97316', '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>')}
                <div style="margin-bottom:2.5rem;">
                    ${d.hasIncidents ? `
                        <div style="background:#fff7ed; border:1px solid #fed7aa; border-left:6px solid #f97316; border-radius:10px; padding:1.5rem 2rem;">
                            <p style="font-weight:700; color:#c2410c; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                ${t.incidentsRecorded}
                            </p>
                            <p style="color:#9a3412; line-height:1.7; white-space:pre-wrap; text-align:justify;">${formatMultiline(d.incidentsText || '')}</p>
                        </div>
                    ` : `
                        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-left:6px solid #22c55e; border-radius:10px; padding:1.5rem 2rem; display:flex; align-items:center; gap:1rem;">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <p style="color:#166534; font-weight:600; font-size:1rem; margin:0;">${t.incidentsNoneText}</p>
                        </div>
                    `}
                </div>

                <!-- 1.3 Metodologías aplicadas -->
                ${renderSubsectionHeader(t.methodologiesApplied, 'methodologies', '#7c3aed', '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>')}
                <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:10px; padding:1.5rem 2rem; line-height:1.8; color:#374151; text-align:justify; margin-bottom:2rem;">
                    ${renderMethodologiesContent(d, state.lang)}
                </div>
            </div>

            <!-- ==================== SECCIÓN 2: EJECUCIÓN ==================== -->
            <div id="execution" style="padding:2rem 0; page-break-before:always;">
                ${renderSectionHeader(t.auditExecution, '')}
                ${renderCvssSummary()}
                <div class="findings-preview" style="margin-top:2rem;">
                    ${state.findings.length === 0 ? `<p style="color:#6b7280; font-style:italic;">${t.noFindings}</p>` : ''}
                    ${state.findings.map((f, idx) => `
                        <div id="finding-${idx}" class="finding-preview severity-${f.severity}" style="margin-bottom:3rem; background:white; padding:2rem; border-radius:12px; border-left:6px solid var(--severity-${f.severity}); box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
                            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; border-bottom:1px solid #e5e7eb; padding-bottom:1rem;">
                                <h3 style="font-size:1.5rem; font-weight:800; color:#111827; margin:0;">2.${idx+1}. ${escapeHTML(f.title)}</h3>
                                <div style="background-color:var(--severity-${f.severity}); color:white; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.875rem; text-transform:uppercase; white-space:nowrap; margin-left:1rem;">
                                    ${t.severityLevels[f.severity]}
                                </div>
                            </div>
                            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
                                <div style="background:#f9fafb; padding:1rem 1.5rem; border-radius:8px; border:1px solid #e5e7eb;">
                                    <p style="font-size:0.75rem; font-weight:700; color:#6b7280; text-transform:uppercase; margin-bottom:0.25rem;">${t.cvssScore}</p>
                                    <p style="font-size:1.25rem; font-weight:800; color:#111827; margin:0;">${escapeHTML(f.cvss || t.na)}</p>
                                </div>
                                <div style="background:#f9fafb; padding:1rem 1.5rem; border-radius:8px; border:1px solid #e5e7eb;">
                                    <p style="font-size:0.75rem; font-weight:700; color:#6b7280; text-transform:uppercase; margin-bottom:0.25rem;">${t.cveId}</p>
                                    <p style="font-size:1.25rem; font-weight:800; color:#111827; margin:0;">${escapeHTML(f.cve || t.na)}</p>
                                </div>
                                <div style="background:#f9fafb; padding:1rem 1.5rem; border-radius:8px; border:1px solid #e5e7eb;">
                                    <p style="font-size:0.75rem; font-weight:700; color:#6b7280; text-transform:uppercase; margin-bottom:0.25rem;">${t.referenceUrl}</p>
                                    <p style="font-size:0.875rem; font-weight:500; color:#3b82f6; margin:0; word-break:break-all;">${f.reference ? `<a href="${escapeHTML(f.reference)}" target="_blank" style="color:#3b82f6; text-decoration:none;">${escapeHTML(f.reference)}</a>` : t.na}</p>
                                </div>
                            </div>
                            ${f.description ? `
                                <div style="margin-bottom:1.5rem;">
                                    <h4 style="font-size:1.125rem; font-weight:700; color:#374151; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                        ${t.description}
                                    </h4>
                                    <p style="color:#4b5563; line-height:1.6; text-align:justify;"><span style="white-space:pre-wrap;">${formatMultiline(f.description)}</span></p>
                                </div>
                            ` : ''}
                            ${f.poc ? `
                                <div style="margin-bottom:1.5rem; background:#1e293b; padding:1.5rem; border-radius:8px; border:1px solid #0f172a;">
                                    <h4 style="font-size:1.125rem; font-weight:700; color:#f8fafc; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                        ${t.pocSteps}
                                    </h4>
                                    <p style="font-family:monospace; line-height:1.75; font-size:0.875rem; color:#e2e8f0; margin:0; text-align:justify;"><span style="white-space:pre-wrap;">${formatMultiline(f.poc)}</span></p>
                                </div>
                            ` : ''}
                            ${f.images && f.images.length > 0 ? `
                                <div style="margin-bottom:1.5rem;">
                                    <h4 style="font-size:1.125rem; font-weight:700; color:#374151; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                        ${t.evidence}
                                    </h4>
                                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
                                        ${f.images.map((img, imgIdx) => `
                                            <div style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; break-inside:avoid; background:#fff; padding:0.5rem;">
                                                <img src="${img}" alt="${t.evidence} ${imgIdx+1}" style="width:100%; height:auto; border-radius:4px; display:block;">
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${f.impact ? `
                                <div style="margin-bottom:1.5rem;">
                                    <h4 style="font-size:1.125rem; font-weight:700; color:#dc2626; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                        ${t.businessImpact}
                                    </h4>
                                    <p style="color:#4b5563; line-height:1.6; text-align:justify;"><span style="white-space:pre-wrap;">${formatMultiline(f.impact)}</span></p>
                                </div>
                            ` : ''}
                            ${f.remediation ? `
                                <div style="background:#f0fdf4; padding:1.5rem; border-radius:8px; border:1px solid #bbf7d0;">
                                    <h4 style="font-size:1.125rem; font-weight:700; color:#166534; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        ${t.solutionRemediation}
                                    </h4>
                                    <p style="color:#15803d; line-height:1.6; text-align:justify;"><span style="white-space:pre-wrap;">${formatMultiline(f.remediation)}</span></p>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- ==================== SECCIÓN 3: RESUMEN DE LA AUDITORÍA ==================== -->
            ${(() => {
                const sections = generateAuditSections(state.findings, d, state.lang);
                const subsections = [
                    { id:'positive-aspects',  label:t.positiveAspectsSection,  text:sections.positiveAspects,  bg:'#f0fdf4', border:'#bbf7d0', iconStroke:'#059669', iconPath:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' },
                    { id:'audit-development', label:t.auditDevelopmentSection, text:sections.auditDevelopment, bg:'#eff6ff', border:'#bfdbfe', iconStroke:'#3b82f6', iconPath:'<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>' },
                    { id:'conclusions',       label:t.conclusionsSection,      text:sections.conclusions,      bg:'#faf5ff', border:'#e9d5ff', iconStroke:'#7c3aed', iconPath:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path>' }
                ];
                return `
                <div id="audit-summary" style="padding:2rem 0; page-break-before:always;">
                    ${renderSectionHeader(t.auditSummarySection, '')}
                    ${subsections.map(s => `
                        <div style="margin-bottom:2.5rem;">
                            ${renderSubsectionHeader(s.label, s.id, s.iconStroke, s.iconPath)}
                            <div style="background:${s.bg}; border:1px solid ${s.border}; border-radius:10px; padding:1.5rem 2rem; line-height:1.8; color:#374151; text-align:justify;">
                                <span style="white-space:pre-wrap;">${formatMultiline(escapeHTML(s.text))}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>`;
            })()}
        </div>
    `;
}


function renderReportsPage() {
    if (!state.showReportSelector || state.showSplash) return '';

    const t = UI[state.lang];
    const tImpExp = state.lang === 'es' ? {
        exportDb: 'Exportar BD',
        importDb: 'Importar BD',
        importConfirm: '¿Estás seguro? Esto reemplazará todos los reportes actuales.',
        importSuccess: 'Base de datos importada correctamente. Recargando...',
        importError: 'Error al importar: '
    } : {
        exportDb: 'Export DB',
        importDb: 'Import DB',
        importConfirm: 'Are you sure? This will replace all current reports.',
        importSuccess: 'Database imported successfully. Reloading...',
        importError: 'Error importing: '
    };

    return `
        <div class="reports-page">
            <div class="reports-header">
                <h1>${t.myReports}</h1>
                <div class="reports-actions">
                    <button class="btn-primary" onclick="createNewReport()" style="display:flex;align-items:center;gap:0.4rem;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        ${t.createNewReport}
                    </button>
                    <button class="btn-secondary" onclick="exportDatabase()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        ${tImpExp.exportDb}
                    </button>
                    <button class="btn-secondary" onclick="document.getElementById('db-import-input').click()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        ${tImpExp.importDb}
                    </button>
                    <input type="file" id="db-import-input" accept=".db" style="display:none" onchange="importDatabase(this)">
                </div>
            </div>

            <div class="reports-list">
                ${state.savedReports.length === 0 ? `
                    <div class="empty-state">
                        <p>${t.noReports}</p>
                        <p class="text-muted">${t.noReportsDesc}</p>
                    </div>
                ` : state.savedReports.map(r => `
                    <div class="report-card" onclick="loadReport(${r.id})">
                        <h3>${escapeHTML(r.document_title)}</h3>
                        <p>${escapeHTML(r.client_company)}</p>
                        <span>${r.findings_count || 0} hallazgos</span>
                        <button onclick="event.stopPropagation(); deleteReport(${r.id})">Eliminar</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderApp() {
    const app = $('#app');

    app.innerHTML = `
        ${renderSplashScreen()}
        ${renderNavbar()}
        <main class="main-content">
            ${renderReportsPage()}
            ${renderEditor()}
            ${renderPreview()}
        </main>
    `;
}

function enterApp() {
    state.showSplash = false;
    renderApp();
}

function setLang(lang) {
    state.lang = lang;
    state.auditData.lang = lang;

    // Si hay una plantilla seleccionada (no custom), recargarla en el nuevo idioma
    if (state.currentFinding.templateKey && state.currentFinding.templateKey !== 'custom') {
        applyTemplate(state.currentFinding.templateKey);
        return; // applyTemplate ya llama a renderApp()
    }

    renderApp();
}

function setTab(tab) {
    state.activeTab = tab;
    renderApp();
}

// Helpers para impresión
const preloadImages = (container) => {
    const images = container.querySelectorAll('img');
    const promises = Array.from(images).map(img => new Promise((resolve) => {
        if (img.complete && img.naturalWidth > 0) {
            resolve();
        } else {
            const tempImg = new Image();
            tempImg.onload = resolve;
            tempImg.onerror = resolve;
            tempImg.src = img.src;
            setTimeout(resolve, 2000);
        }
    }));
    return Promise.all(promises);
};

const createPrintIframe = (content) => {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${state.auditData.documentTitle}</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="${window.location.origin}/css/styles.css">
            <style>
                @page { margin: 10mm 20mm 25mm 20mm; size: A4; @bottom-center { content: counter(page); font-family: 'Inter', sans-serif; font-size: 10pt; color: #6b7280; } }
                @media print { body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .navbar, .no-print { display: none !important; } }
                img { max-width: 100% !important; page-break-inside: avoid !important; }
            </style>
        </head>
        <body style="margin:0;padding:0;background:${state.reportTheme === 'dark' ? '#0f172a' : 'white'};">${content}</body>
        </html>
    `);
    doc.close();
    return iframe;
};

const waitForImagesInIframe = (doc, timeout = 3000) => new Promise((resolve) => {
    const images = doc.querySelectorAll('img');
    if (images.length === 0) { resolve(); return; }

    let loadedCount = 0;
    const total = images.length;
    const checkComplete = () => { if (++loadedCount >= total) resolve(); };

    images.forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            checkComplete();
        } else {
            img.onload = checkComplete;
            img.onerror = checkComplete;
            const src = img.src;
            img.src = '';
            img.src = src;
        }
    });

    setTimeout(resolve, timeout);
});

function setReportTheme(theme) {
    state.reportTheme = theme;
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    render();
}

async function generatePdfFromBackend() {
    if (!state.currentReportId) {
        alert(state.lang === 'es' ? 'Guarda el reporte primero' : 'Save the report first');
        return;
    }
    try {
        const response = await fetch(`/api/reports/${state.currentReportId}/pdf?theme=${state.reportTheme}`);
        if (!response.ok) {
            // Intentar obtener detalles del error
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = null;
            }
            
            // Si es el error de Playwright no instalado, mostrar opciones al usuario
            if (response.status === 503 && errorData?.detail?.error === "Playwright browsers not installed") {
                const useFallback = confirm(
                    (state.lang === 'es' 
                        ? `⚠️ ${errorData.detail.message}\n\n${errorData.detail.solution}\n${errorData.detail.command}\n\n¿Quieres usar el método alternativo (impresión del navegador) para generar el PDF?`
                        : `⚠️ ${errorData.detail.message}\n\n${errorData.detail.solution}\n${errorData.detail.command}\n\nDo you want to use the alternative method (browser print) to generate the PDF?`
                    )
                );
                if (useFallback) {
                    printReport();
                }
                return;
            }
            
            throw new Error(errorData?.detail?.message || errorData?.detail || `Error ${response.status}`);
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Report_${state.currentReportId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (e) {
        alert(state.lang === 'es' ? 'Error: ' + e.message : 'Error: ' + e.message);
    }
}

async function printReport() {
    const printContent = document.querySelector('.preview-container');
    if (!printContent) {
        alert(state.lang === 'es' ? 'Primero ve a la vista previa' : 'Go to preview first');
        return;
    }

    await preloadImages(printContent);
    const iframe = createPrintIframe(printContent.innerHTML);

    setTimeout(async () => {
        await waitForImagesInIframe(iframe.contentWindow.document);
        triggerPrint(iframe);
    }, 500);
}

function triggerPrint(iframe) {
    if (iframe._printed) return;
    iframe._printed = true;
    iframe.contentWindow.print();
    setTimeout(() => {
        if (iframe.parentNode) {
            document.body.removeChild(iframe);
        }
    }, 1000);
}

async function showReports() {
    await loadSavedReports();
    state.showReportSelector = true;
    renderApp();
}

function hideReports() {
    state.showReportSelector = false;
    renderApp();
}

function updateAuditData(field, value) {
    state.auditData[field] = value;
    state.isDirty = true;
}

function updateCurrentFinding(field, value) {
    state.currentFinding[field] = value;
    if (field === 'cvss') {
        const sev = calculateSeverityFromCvss(value);
        if (sev) {
            state.currentFinding.severity = sev;
            const severitySelect = document.getElementById('findingSeverity');
            if (severitySelect) {
                severitySelect.value = sev;
            }
        }
    }
}

function applyTemplate(key) {
    if (key === 'custom') return;

    const template = templates[key];
    if (!template) return;

    const t = template[state.lang] || template.es;

    const calculatedSeverity = t.cvss ? (calculateSeverityFromCvss(t.cvss) || 'info') : (state.currentFinding.severity || 'med');

    state.currentFinding = {
        ...state.currentFinding,
        templateKey: key,
        title: t.title,
        severity: calculatedSeverity,
        description: t.description,
        poc: t.poc || '',
        impact: t.impact,
        remediation: t.remediation,
        cvss: t.cvss,
        reference: t.reference
    };

    renderApp();
}

function filterTemplates(query) {
    const select = document.getElementById('templateSelect');
    const filter = query.toLowerCase();

    if (!select) return;

    // Show dropdown when filtering
    select.style.display = 'block';

    // Get all options and optgroups
    const options = select.querySelectorAll('option');
    const optgroups = select.querySelectorAll('optgroup');

    // Filter options
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        const value = option.value.toLowerCase();
        if (text.includes(filter) || value.includes(filter) || filter === '') {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });

    // Show/hide optgroups based on visible children
    optgroups.forEach(group => {
        const visibleOptions = group.querySelectorAll('option:not([style*="display: none"])');
        group.style.display = visibleOptions.length > 0 ? '' : 'none';
    });
}

function showTemplateDropdown() {
    const select = document.getElementById('templateSelect');
    const searchInput = document.getElementById('templateSearch');
    if (select) {
        select.style.display = 'block';
        // Reset filter when showing
        const options = select.querySelectorAll('option');
        const optgroups = select.querySelectorAll('optgroup');
        options.forEach(option => option.style.display = '');
        optgroups.forEach(group => group.style.display = '');
    }
    // Clear search input
    if (searchInput) searchInput.value = '';
}

function hideTemplateDropdown() {
    const select = document.getElementById('templateSelect');
    if (select) {
        select.style.display = 'none';
    }
}

// Hide dropdown when clicking outside
document.addEventListener('click', function(e) {
    const container = document.querySelector('.template-search-container');
    const select = document.getElementById('templateSelect');
    if (container && !container.contains(e.target) && select) {
        select.style.display = 'none';
    }
});

function handleFindingSubmit(e) {
    e.preventDefault();

    const finding = {
        id: state.editingFindingIndex !== null ? state.findings[state.editingFindingIndex].id : Date.now(),
        templateKey: state.currentFinding.templateKey,
        title: $('#findingTitle').value,
        severity: $('#findingSeverity').value,
        description: $('#findingDescription').value,
        cvss: $('#findingCvss').value,
        poc: $('#findingPoc').value,
        impact: $('#findingImpact').value,
        remediation: $('#findingRemediation').value,
        reference: $('#findingReference').value,
        cve: $('#findingCve').value,
        images: state.currentFinding.images
    };

    if (state.editingFindingIndex !== null) {
        // Update existing finding
        state.findings[state.editingFindingIndex] = finding;
        state.editingFindingIndex = null;
    } else {
        // Add new finding
        state.findings.push(finding);
    }

    sortFindingsBySeverity(state.findings);

    state.isDirty = true;

    if (state.currentReportId) {
        localStorage.removeItem('report_' + state.currentReportId + '_draft');
    }

    resetFindingForm();
    renderApp();
}

function resetFindingForm() {
    state.editingFindingIndex = null;
    state.currentFinding = {
        templateKey: 'custom',
        title: '',
        severity: 'med',
        description: '',
        cvss: '',
        poc: '',
        impact: '',
        remediation: '',
        reference: '',
        cve: '',
        images: []
    };
}

function deleteFinding(index) {
    state.findings.splice(index, 1);
    state.isDirty = true;
    renderApp();
}

function editFinding(index) {
    const finding = state.findings[index];
    if (!finding) return;

    // Load finding data into currentFinding
    state.currentFinding = {
        templateKey: finding.templateKey || 'custom',
        title: finding.title || '',
        severity: finding.severity || 'med',
        description: finding.description || '',
        cvss: finding.cvss || '',
        poc: finding.poc || '',
        impact: finding.impact || '',
        remediation: finding.remediation || '',
        reference: finding.reference || '',
        cve: finding.cve || '',
        images: finding.images ? [...finding.images] : []
    };

    // Store the index we're editing
    state.editingFindingIndex = index;

    // Scroll to the form
    const form = document.getElementById('findingForm');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    renderApp();
}

async function handleImageUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const dataUrls = await Promise.all(imageFiles.map(readFileAsDataURL));

    dataUrls.forEach(url => {
        if (url) state.currentFinding.images.push(url);
    });

    if (dataUrls.length > 0) renderApp();
    event.target.value = '';
}

function removeImage(index) {
    state.currentFinding.images.splice(index, 1);
    renderApp();
}

async function handleImagePaste(event) {
    event.preventDefault();
    const items = event.clipboardData?.items;
    if (!items) return;

    const imageItems = Array.from(items).filter(item => item.type.startsWith('image/'));
    const blobs = imageItems.map(item => item.getAsFile()).filter(Boolean);
    const dataUrls = await Promise.all(blobs.map(readFileAsDataURL));

    dataUrls.forEach(url => {
        if (url) state.currentFinding.images.push(url);
    });

    if (dataUrls.length > 0) {
        renderApp();
        event.stopPropagation();
    }
}

async function handleClientLogoUpload(event, index) {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const dataUrl = await readFileAsDataURL(file);
    if (dataUrl) {
        const newLogos = [...state.auditData.clientLogo];
        newLogos[index] = dataUrl;
        updateAuditData('clientLogo', newLogos);
        renderApp();
    }
}

function removeClientLogo(index) {
    const newLogos = [...state.auditData.clientLogo];
    newLogos[index] = '';
    updateAuditData('clientLogo', newLogos);
    renderApp();
}

async function loadSavedReports() {
    try {
        state.savedReports = await API.reports.getAll();
    } catch (err) {
        console.error('Error loading reports:', err);
    }
}

async function createNewReport() {
    try {
        if (state.currentReportId) {
            await saveCurrentReport();
        }
        const report = await API.reports.create({
            document_title: 'Nuevo Reporte',
            client_company: 'Empresa',
            client_logo: ['', ''],
            target_asset: 'Sistema',
            auditor_company: 'Auditor',
            auditor_name: 'Auditor',
            classification: 2,
            version: '1.0',
            date: new Date().toISOString().split('T')[0],
            lang: state.lang
        });

        state.currentReportId = report.id;
        state.findings = [];
        state.isDirty = false;
        state.auditData = {
            documentTitle: 'Nuevo Reporte',
            clientCompany: 'Empresa Cliente',
            clientLogo: ['', ''],
            targetAsset: 'Sistema',
            auditorCompany: 'Empresa Auditora',
            auditorName: '',
            classification: '2',
            version: '1.0',
            date: new Date().toISOString().split('T')[0],
            lang: state.lang,
            auditType: 'pentesting_web',
            hasIncidents: false,
            incidentsText: '',
            auditSummary: '',
            testsPerformed: '',
            recommendedSolutions: ''
        };
        state.activeTab = 'editor';
        hideReports();
    } catch (err) {
        alert('Error creating report: ' + err.message);
    }
}

async function loadReport(id) {
    try {
        if (state.currentReportId && state.currentReportId !== id) {
            await saveCurrentReport();
        }
        const report = await API.reports.getById(id);
        state.currentReportId = report.id;
        state.auditData = {
            documentTitle: report.document_title,
            clientCompany: report.client_company,
            clientLogo: report.client_logo && Array.isArray(report.client_logo) ? report.client_logo : ['', ''],
            targetAsset: report.target_asset,
            auditorCompany: report.auditor_company,
            auditorName: report.auditor_name,
            classification: report.classification.toString(),
            version: report.version,
            date: report.date,
            lang: report.lang,
            hasIncidents: report.has_incidents === true || report.has_incidents === 'true' || report.has_incidents === 1,
            incidentsText: report.incidents_text || '',
            auditSummary: report.audit_summary || '',
            testsPerformed: report.tests_performed || '',
            recommendedSolutions: report.recommended_solutions || ''
        };
        state.lang = report.lang;
        state.findings = sortFindingsBySeverity(report.findings || []);

        const draft = localStorage.getItem('report_' + report.id + '_draft');
        if (draft) {
            try {
                state.currentFinding = JSON.parse(draft);
            } catch(e) {
                resetFindingForm();
            }
        } else {
            resetFindingForm();
        }
        
        state.isDirty = false;
        state.activeTab = 'editor';
        hideReports();
    } catch (err) {
        alert('Error loading report: ' + err.message);
    }
}

async function deleteReport(id) {
    if (!confirm('¿Eliminar este reporte?')) return;

    try {
        await API.reports.delete(id);
        if (state.currentReportId === id) {
            state.currentReportId = null;
        }
        loadSavedReports();
        renderApp();
    } catch (err) {
        alert('Error deleting report: ' + err.message);
    }
}

async function exportDatabase() {
    try {
        const response = await fetch('/api/database/export');
        if (!response.ok) throw new Error('Error al exportar');
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = response.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'pentestify_backup.db';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (err) {
        alert(state.lang === 'es' ? 'Error al exportar: ' + err.message : 'Error exporting: ' + err.message);
    }
}

async function importDatabase(input) {
    const file = input.files[0];
    if (!file) return;
    
    const tImpExp = state.lang === 'es' ? {
        importConfirm: '¿Estás seguro? Esto reemplazará todos los reportes actuales.',
        importSuccess: 'Base de datos importada correctamente. Recargando...',
        importError: 'Error al importar: '
    } : {
        importConfirm: 'Are you sure? This will replace all current reports.',
        importSuccess: 'Database imported successfully. Reloading...',
        importError: 'Error importing: '
    };
    
    if (!confirm(tImpExp.importConfirm)) {
        input.value = '';
        return;
    }
    
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/database/import', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Error desconocido');
        }
        
        alert(tImpExp.importSuccess);
        window.location.reload();
    } catch (err) {
        alert(tImpExp.importError + err.message);
    }
    
    input.value = '';
}

async function saveCurrentReport() {
    try {
        const payload = {
            document_title: state.auditData.documentTitle,
            client_company: state.auditData.clientCompany,
            client_logo: state.auditData.clientLogo || ['', ''],
            target_asset: state.auditData.targetAsset,
            auditor_company: state.auditData.auditorCompany,
            auditor_name: state.auditData.auditorName,
            classification: parseInt(state.auditData.classification) || 2,
            version: state.auditData.version,
            date: state.auditData.date,
            lang: state.auditData.lang || state.lang,
            has_incidents: state.auditData.hasIncidents || false,
            incidents_text: state.auditData.incidentsText || '',
            audit_summary: '',
            tests_performed: '',
            recommended_solutions: ''
        };

        if (!state.currentReportId) {
            const report = await API.reports.create(payload);
            state.currentReportId = report.id;
        } else {
            await API.reports.update(state.currentReportId, payload);
        }
        const remoteReport = await API.reports.getById(state.currentReportId);
        const existingFindings = remoteReport.findings || [];
        const existingIds = existingFindings.map(f => f.id);
        const currentIds = state.findings.filter(f => f.id && typeof f.id !== 'string' && f.id < 1000000000000).map(f => f.id);

        for (const id of existingIds) {
            if (!currentIds.includes(id)) {
                await API.findings.delete(id);
            }
        }

        for (let i = 0; i < state.findings.length; i++) {
            const finding = state.findings[i];
            const payload = {
                template_key: finding.templateKey || finding.template_key || 'custom',
                title: finding.title,
                severity: finding.severity,
                description: finding.description || '',
                cvss: finding.cvss || '',
                poc: finding.poc || '',
                impact: finding.impact || '',
                remediation: finding.remediation || '',
                reference: finding.reference || '',
                cve: finding.cve || '',
                images: finding.images || [],
                order_index: i
            };

            if (!finding.id || finding.id > 1000000000000) {
                const created = await API.findings.create(state.currentReportId, payload);
                finding.id = created.id;
            } else {
                await API.findings.update(finding.id, payload);
            }
        }

        if (state.currentReportId) {
            localStorage.setItem('report_' + state.currentReportId + '_draft', JSON.stringify(state.currentFinding));
        }

        state.isDirty = false;
        renderApp();
        alert(state.lang === 'es' ? 'Reporte guardado correctamente' : 'Report saved successfully');
    } catch (err) {
        console.error(err);
        alert('Error: ' + err.message);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const printMode = params.get('print_mode');
    const reportId = params.get('report_id');

    const themeParam = params.get('theme');
    if (printMode === 'true' && reportId) {
        state.showSplash = false;
        state.activeTab = 'preview';
        state.currentReportId = parseInt(reportId);
        if (themeParam === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        try {
            const remoteReport = await API.reports.getById(state.currentReportId);
            Object.keys(remoteReport).forEach(key => {
                const camelKey = key.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
                if (state.auditData.hasOwnProperty(camelKey)) {
                    state.auditData[camelKey] = remoteReport[key];
                }
            });

            // Ensure incidents fields are properly set (handle both snake_case and direct assignment)
            if (remoteReport.has_incidents !== undefined) {
                state.auditData.hasIncidents = remoteReport.has_incidents === true || remoteReport.has_incidents === 'true' || remoteReport.has_incidents === 1;
            }
            if (remoteReport.incidents_text !== undefined) {
                state.auditData.incidentsText = remoteReport.incidents_text;
            }

            state.findings = remoteReport.findings ? sortFindingsBySeverity(remoteReport.findings) : [];
        } catch (e) {
            console.error("Error cargando reporte para imprimir", e);
        }
        renderApp();
    } else {
        renderApp();
    }
});