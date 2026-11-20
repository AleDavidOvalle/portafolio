export type Lang = 'es' | 'en';

export interface Fact { label: string; value: string }
export interface Metric { value: string; label: string }
export interface Shot { src: string; caption: string }
export interface LinkRef { label: string; href: string }
export interface SkillGroup { name: string; items: string[] }
export interface Module { name: string; detail: string }

export interface OtherProject {
  title: string;
  kind: string;
  year: string;
  description: string;
  tech: string[];
  links: LinkRef[];
}

export interface Content {
  meta: { title: string; description: string };
  nav: { about: string; experience: string; projects: string; stack: string; credentials: string; contact: string; search: string };
  hero: { greet: string; role: string; chips: string[]; ctaProjects: string; ctaCv: string; stampRing: string; photoAlt: string };
  about: { title: string; script: string; paragraphs: string[]; traitsTitle: string; traits: Fact[]; facts: Fact[] };
  experience: {
    title: string; script: string;
    role: string; org: string; place: string; period: string; status: string;
    stack: string[]; bullets: string[];
  };
  projects: {
    title: string; script: string; intro: string;
    featured: {
      tag: string; title: string; status: string; client: string; role: string; year: string;
      metrics: Metric[];
      labels: { problem: string; solution: string; decision: string; result: string; architecture: string; modules: string; gallery: string; stack: string; role: string; client: string; year: string; galleryNote: string };
      problem: string; solution: string; decision: string; result: string;
      modules: Module[];
      tech: string[];
      shots: Shot[];
    };
    othersTitle: string;
    others: OtherProject[];
  };
  arch: { browser: string; server: string; proxy: string; front: string; api: string; db: string; backup: string; backupVia: string };
  stack: { title: string; script: string; groups: SkillGroup[]; basic: string };
  credentials: {
    title: string; script: string;
    eduLabel: string; degree: string; school: string; eduPeriod: string; eduNote: string;
    certLabel: string; cert: string; issuer: string; certCta: string;
    langLabel: string; langs: Fact[];
  };
  contact: {
    title: string; script: string; text: string;
    emailLabel: string; copy: string; copied: string; cvLabel: string; cvEs: string; cvEn: string; to: string;
  };
  palette: { placeholder: string; empty: string; sections: string; actions: string; copyEmail: string; downloadCv: string; switchLang: string; hint: string };
  lightbox: { close: string; prev: string; next: string; of: string };
  footer: { built: string };
}

export const EMAIL = 'alejandrodovalle@gmail.com';
export const LINKS = {
  github: 'https://github.com/AleDavidOvalle',
  linkedin: 'https://www.linkedin.com/in/aledavidovalle/',
  credly: 'https://www.credly.com/badges/d1a2ce79-4006-4d20-a123-87ca42f3ea4d/linked_in_profile',
  cvEs: '/cv/CV_Alejandro_Ovalle_ES.pdf',
  cvEn: '/cv/CV_Alejandro_Ovalle_EN.pdf',
};

export const MARQUEE = ['Angular', 'NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Node.js', 'Playwright', 'Nginx', 'Linux', 'Google Cloud', 'JWT', 'OpenAPI'];

/** Galería del caso, por módulo: [archivo, español, inglés]. */
const SHOTS: [string, string, string][] = [
  ['01', 'Matrícula · Panel de secretaría con las carpetas de cada grado', "Enrollment · Registrar's dashboard with a folder for each grade"],
  ['03', 'Matrícula · Formulario por pasos que llena la familia', 'Enrollment · Step-by-step form filled in by the family'],
  ['05', 'Matrícula · Portal de la familia con el estado de cada hijo', "Enrollment · Family portal with each child's status"],
  ['06', 'Matrícula · Checklist de documentos según el grado', 'Enrollment · Document checklist based on grade'],
  ['09', 'Matrícula · La secretaría revisa y aprueba la solicitud', 'Enrollment · The registrar reviews and approves the application'],
  ['08', 'Matrícula · Ficha del estudiante con acudientes y documentos', 'Enrollment · Student record with guardians and documents'],
  ['10', 'Notas · Plan de estudios por grado, con áreas, pesos e intensidad horaria', 'Grades · Curriculum per grade, with areas, weights and weekly hours'],
  ['11', 'Notas · Archivo de cada año cerrado, por grado y curso', 'Grades · Archive of every closed year, by grade and course'],
  ['12', 'Notas · Boletín en PDF con el formato oficial del colegio', "Grades · PDF report card in the school's official format"],
  ['13', 'Inventario · El recorrido en el celular del personal de aseo', 'Inventory · The mobile flow used by the cleaning staff'],
  ['14', 'Inventario · Informe por tipo y estado, exportable a PDF', 'Inventory · Report by type and condition, exportable to PDF'],
  ['15', 'Inventario · Historial: quién agregó, movió o dio de baja cada cosa', 'Inventory · History: who added, moved or retired each item'],
  ['16', 'Administrativo · Nómina mensual con el paquete del año para el contador', 'Administration · Monthly payroll with the yearly package for the accountant'],
  ['17', 'Administrativo · Detalle de la nómina con devengados, deducciones y pagos', 'Administration · Payroll detail with earnings, deductions and payments'],
];
const shots = (lang: 0 | 1): Shot[] =>
  SHOTS.map(([file, es, en]) => ({ src: `/projects/uziel/${file}.jpg`, caption: lang === 0 ? es : en }));

const featuredTech = ['Angular 20', 'NestJS 11', 'TypeORM', 'PostgreSQL', 'JWT + 8 roles', 'Swagger / OpenAPI', 'Jest', 'Playwright', 'pdfmake', 'docxtemplater', 'Nodemailer', 'Nginx', "Let's Encrypt"];

const patternLinks: LinkRef[] = [
  { label: 'Mediator', href: 'https://github.com/AleDavidOvalle/Patron-Mediador' },
  { label: 'Factory', href: 'https://github.com/AleDavidOvalle/Proyecto-Pagos-Factory' },
  { label: 'Builder', href: 'https://github.com/AleDavidOvalle/Actividad-Builder' },
];

export const CONTENT: Record<Lang, Content> = {
  es: {
    meta: {
      title: 'Alejandro Ovalle · Desarrollador Fullstack',
      description: 'Desarrollador fullstack con enfoque en backend: Angular, NestJS y PostgreSQL. Bogotá, Colombia · presencial o remoto.',
    },
    nav: { about: 'Sobre mí', experience: 'Experiencia', projects: 'Proyectos', stack: 'Stack', credentials: 'Formación', contact: 'Contacto', search: 'Buscar' },
    hero: {
      greet: 'Hola, soy',
      role: 'Desarrollador Fullstack · Angular + NestJS / Node.js',
      chips: ['Bogotá, Colombia', 'Presencial o remoto', 'Español · English B1'],
      ctaProjects: 'Ver proyectos',
      ctaCv: 'Descargar CV',
      stampRing: 'FULLSTACK · ANGULAR · NESTJS ·',
      photoAlt: 'Foto de Alejandro Ovalle',
    },
    about: {
      title: 'Sobre mí',
      script: 'backend primero',
      paragraphs: [
        'Soy desarrollador fullstack con enfoque en backend. Me gusta tomar un problema real, entenderlo con las personas que lo viven y convertirlo en software que se use todos los días.',
        'Así nació mi proyecto más grande: la plataforma de gestión escolar del Colegio Uziel Querit, que desarrollé solo, de principio a fin. Empezó como un prototipo de matrícula y, cuando el colegio lo aprobó, creció a cuatro módulos con ocho roles. Levanté los requerimientos con la rectoría y la secretaría, diseñé la base de datos en PostgreSQL, construí la API en NestJS y el frontend en Angular, y lo puse en producción con sus copias de seguridad.',
        'Estoy terminando Ingeniería de Sistemas en la Universidad Popular del Cesar. Busco mi primer rol de tiempo completo, en Bogotá o en remoto, en un equipo donde pueda aportar desde el primer día y seguir creciendo junto a gente con más experiencia.',
      ],
      traitsTitle: 'Cómo trabajo',
      traits: [
        { label: 'Entiendo antes de programar', value: 'Cada pedido del colegio se registró y se evaluó antes de escribir código: más de 80 solicitudes y 148 decisiones documentadas.' },
        { label: 'Pruebo lo que construyo', value: 'Más de 2.200 pruebas automatizadas y dos auditorías de seguridad, con cada hallazgo corregido y con su prueba.' },
        { label: 'Aprendo rápido', value: 'De un prototipo de un módulo a una plataforma de cuatro en dos meses, aprendiendo en el camino lo que el proyecto pedía.' },
        { label: 'Pienso en quien lo usa', value: 'Cada pantalla está pensada para su rol: desde la secretaría hasta el personal de aseo, que lleva el inventario desde el celular.' },
      ],
      facts: [
        { label: 'Base', value: 'Bogotá, Colombia' },
        { label: 'Modalidad', value: 'Presencial o remoto' },
        { label: 'Enfoque', value: 'Backend · APIs REST' },
        { label: 'Idiomas', value: 'Español nativo · Inglés B1' },
        { label: 'Estado', value: 'Disponible' },
      ],
    },
    experience: {
      title: 'Experiencia',
      script: 'de prototipo a plataforma',
      role: 'Desarrollador Fullstack · Práctica profesional',
      org: 'Colegio Uziel Querit',
      place: 'Valledupar, Colombia · práctica y proyecto de grado',
      period: '2026 – Actualidad',
      status: 'En producción',
      stack: ['Angular 20', 'NestJS 11', 'TypeORM', 'PostgreSQL', 'Playwright', 'Nginx', 'Linux'],
      bullets: [
        'Desarrollo, como único desarrollador, la plataforma de gestión escolar de un colegio privado de preescolar a once. Empezó como un prototipo del módulo de matrícula; el colegio lo aprobó y creció a cuatro módulos: matrícula y secretaría, notas, inventario y administrativo.',
        'Levanto los requerimientos directamente con el colegio. Cada pedido se registra y se evalúa antes de programarse: más de 80 solicitudes de cambio y 148 decisiones de arquitectura documentadas.',
        'Backend en NestJS 11 y TypeORM como monolito modular: un núcleo compartido y un esquema de PostgreSQL por módulo. 255 endpoints REST documentados con Swagger y un contrato OpenAPI que vigilan las pruebas.',
        'Seguridad: JWT con ocho roles y un guard que obliga a cada endpoint a declarar quién lo usa, límite de intentos de ingreso por IP y Helmet. Dos auditorías de seguridad, con 29 hallazgos corregidos, cada uno con su prueba.',
        'Más de 2.200 pruebas automatizadas (e2e y unitarias en backend y frontend) y 30 recorridos de punta a punta por rol con Playwright.',
        'Boletines, fichas y planillas en PDF, certificados y contratos en Word desde las plantillas del colegio, y correos automáticos. En producción en un VPS de Hostinger con Nginx, systemd y HTTPS, con copias nocturnas cifradas y restauración probada.',
      ],
    },
    projects: {
      title: 'Proyectos',
      script: 'hechos para usarse',
      intro: 'Un caso en detalle y otros trabajos. Abre la galería para ver el sistema por dentro.',
      featured: {
        tag: 'Plataforma escolar · 4 módulos',
        title: 'Plataforma de gestión escolar',
        status: 'En producción',
        client: 'Colegio Uziel Querit',
        role: 'Único desarrollador',
        year: '2026',
        metrics: [
          { value: '4', label: 'módulos sobre un núcleo común' },
          { value: '8', label: 'roles, cada uno con su vista' },
          { value: '255', label: 'endpoints REST documentados' },
          { value: '77', label: 'tablas en 5 esquemas' },
          { value: '2.200+', label: 'pruebas automatizadas' },
          { value: '333', label: 'commits en 2 meses' },
        ],
        labels: {
          problem: 'El problema', solution: 'La solución', decision: 'Decisiones técnicas', result: 'Resultado',
          architecture: 'Arquitectura y despliegue', modules: 'Módulos', gallery: 'Ver galería', stack: 'Stack',
          role: 'Rol', client: 'Cliente', year: 'Año', galleryNote: 'Capturas de los cuatro módulos con datos de prueba.',
        },
        problem: 'El colegio, de preescolar a once, llevaba la matrícula, las notas, el inventario y la nómina en hojas de Excel, formatos de Word y carpetas físicas. Habilitar un boletín, por ejemplo, dependía de confirmar a mano que el estudiante estuviera a paz y salvo.',
        solution: 'Una plataforma web con cuatro módulos sobre un núcleo común, con ocho roles: la secretaría, las familias, los profesores, la secretaría académica, el personal de inventario y el administrador. Cada persona ve solo lo que le toca, y los salarios solo los ve el administrador.',
        decision: 'Monolito modular: los módulos usan el núcleo, el núcleo no depende de ningún módulo y una prueba lo vigila. Un esquema de PostgreSQL por módulo. Un contrato OpenAPI y snapshots e2e detectan cualquier cambio accidental en la API. Nada se borra: los registros quedan inactivos y con su historial.',
        result: 'Los cuatro módulos están terminados, con las pruebas en verde y dos auditorías de seguridad corregidas. El colegio validó la plataforma, ya está en producción y el personal de aseo ya probó el inventario desde el celular. Es mi proyecto de grado en la Universidad Popular del Cesar.',
        modules: [
          { name: 'Matrícula y secretaría', detail: 'Cuentas de familias, solicitudes por pasos, documentos con checklist, carpetas por grado, cursos, fichas en PDF y certificados.' },
          { name: 'Notas', detail: 'Plan de estudios, planilla del profesor, preescolar, recuperaciones, asistencia, cierres de periodo, boletines y cuadro de honor.' },
          { name: 'Inventario', detail: 'Bienes por lugar con fotos e historial, pensado para el celular del personal de aseo, e informe para la administración.' },
          { name: 'Administrativo', detail: 'Trabajadores y sus documentos, contratos desde la plantilla del colegio, nómina con desprendibles y pagos.' },
        ],
        tech: featuredTech,
        shots: shots(0),
      },
      othersTitle: 'Otros trabajos',
      others: [
        {
          title: 'Autenticación y roles con JWT', kind: 'Proyecto de portafolio', year: '2024 – 2025',
          description: 'Registro e inicio de sesión con JWT, control de acceso por roles (Admin / User) y rutas protegidas. Proyecto en capas (rutas, controladores, servicios, modelos) con PostgreSQL y entorno en Docker.',
          tech: ['Angular', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
          links: [{ label: 'Código', href: 'https://github.com/AleDavidOvalle/Portafolio-auth-roles' }],
        },
        {
          title: 'Dashboard de Fórmula 1', kind: 'Proyecto universitario', year: '2024',
          description: 'Pipeline ETL en Talend Open Studio para limpiar y unificar varias fuentes CSV, y un dashboard en Power BI con filtros, KPIs y comparativas por piloto, temporada y escudería.',
          tech: ['Talend', 'Power BI', 'Excel'],
          links: [],
        },
        {
          title: 'Portafolio web en AWS', kind: 'Proyecto personal', year: '2024 – 2025',
          description: 'Versión anterior de mi portafolio: frontend en Angular y API REST en Express con patrones Builder y Factory, desplegado en AWS EC2 con administración de servidor Linux.',
          tech: ['Angular', 'Express', 'AWS EC2', 'Linux'],
          links: [],
        },
        {
          title: 'Patrones de diseño', kind: 'Práctica', year: '2025',
          description: 'Implementaciones de Mediator, Factory, Abstract Factory y Builder en TypeScript y JavaScript, con ejemplos de uso real como un módulo de pagos.',
          tech: ['TypeScript', 'JavaScript'],
          links: patternLinks,
        },
      ],
    },
    arch: {
      browser: 'Navegador', server: 'VPS Hostinger · systemd', proxy: 'Nginx · HTTPS', front: 'Angular 20 (build)',
      api: 'API NestJS 11', db: 'PostgreSQL · 5 esquemas', backup: 'Copias cifradas en la nube', backupVia: 'pg_dump + age',
    },
    stack: {
      title: 'Stack', script: 'lo que uso a diario', basic: 'básico',
      groups: [
        { name: 'Lenguajes', items: ['TypeScript', 'JavaScript', 'C#', 'SQL'] },
        { name: 'Frontend', items: ['Angular', 'Signals', 'HTML5', 'CSS3'] },
        { name: 'Backend', items: ['NestJS', 'Node.js / Express', 'TypeORM', '.NET', 'APIs REST', 'Swagger / OpenAPI'] },
        { name: 'Bases de datos', items: ['PostgreSQL', 'SQL Server', 'MySQL', 'Supabase', 'MongoDB'] },
        { name: 'Infraestructura', items: ['Linux (Ubuntu)', 'Nginx', 'systemd', "Let's Encrypt", 'AWS EC2', 'Google Cloud', 'Hostinger', 'Docker*'] },
        { name: 'Pruebas y prácticas', items: ['Jest', 'Playwright', 'Jasmine / Karma', 'Monolito modular', 'Mediator · Builder · Factory', 'JWT y roles', 'Git / GitHub'] },
        { name: 'Datos y BI', items: ['Power BI*', 'Talend Open Studio*'] },
      ],
    },
    credentials: {
      title: 'Formación', script: 'y credenciales',
      eduLabel: 'Universidad', degree: 'Ingeniería de Sistemas', school: 'Universidad Popular del Cesar', eduPeriod: '2019 – 2026', eduNote: 'Último semestre',
      certLabel: 'Certificación', cert: 'Google Cloud Computing Foundations', issuer: 'Google Cloud · verificable en Credly', certCta: 'Ver credencial',
      langLabel: 'Idiomas', langs: [{ label: 'Español', value: 'Nativo' }, { label: 'Inglés', value: 'B1' }],
    },
    contact: {
      title: '¿Hablamos?', script: 'escríbeme',
      text: 'Busco mi primer rol fullstack o backend, en Bogotá o remoto. Si tienes una vacante o un proyecto, escríbeme y te respondo pronto.',
      emailLabel: 'Correo', copy: 'Copiar', copied: 'Copiado', cvLabel: 'Hoja de vida', cvEs: 'CV en español', cvEn: 'CV in English', to: 'Para',
    },
    palette: { placeholder: 'Ir a una sección o acción…', empty: 'Sin resultados', sections: 'Secciones', actions: 'Acciones', copyEmail: 'Copiar correo', downloadCv: 'Descargar CV', switchLang: 'Switch to English', hint: 'Ctrl K' },
    lightbox: { close: 'Cerrar', prev: 'Anterior', next: 'Siguiente', of: 'de' },
    footer: { built: 'Hecho con Angular · desplegado en Vercel' },
  },

  en: {
    meta: {
      title: 'Alejandro Ovalle · Fullstack Developer',
      description: 'Backend-leaning fullstack developer: Angular, NestJS and PostgreSQL. Based in Bogotá, Colombia · on-site or remote.',
    },
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', stack: 'Stack', credentials: 'Education', contact: 'Contact', search: 'Search' },
    hero: {
      greet: "Hi, I'm",
      role: 'Fullstack Developer · Angular + NestJS / Node.js',
      chips: ['Bogotá, Colombia', 'On-site or remote', 'Spanish · English B1'],
      ctaProjects: 'See projects',
      ctaCv: 'Download CV',
      stampRing: 'FULLSTACK · ANGULAR · NESTJS ·',
      photoAlt: 'Photo of Alejandro Ovalle',
    },
    about: {
      title: 'About me',
      script: 'backend first',
      paragraphs: [
        'I am a backend-leaning fullstack developer. I like taking a real problem, understanding it with the people who live it, and turning it into software they use every day.',
        'That is how my biggest project started: the school management platform for Colegio Uziel Querit, which I built on my own from start to finish. It began as an enrollment prototype and, once the school approved it, grew into four modules with eight roles. I gathered requirements with the principal and the registrar, designed the PostgreSQL database, built the NestJS API and the Angular frontend, and put it into production with its backups.',
        'I am finishing my Systems Engineering degree at Universidad Popular del Cesar. I am looking for my first full-time role, in Bogotá or remote, on a team where I can contribute from day one and keep growing alongside more experienced people.',
      ],
      traitsTitle: 'How I work',
      traits: [
        { label: 'I understand before I code', value: "Every request from the school was logged and assessed before any code was written: more than 80 change requests and 148 documented decisions." },
        { label: 'I test what I build', value: 'More than 2,200 automated tests and two security audits, with every finding fixed and covered by a test.' },
        { label: 'I learn fast', value: 'From a one-module prototype to a four-module platform in two months, learning whatever the project needed along the way.' },
        { label: 'I think about the user', value: 'Every screen is designed for its role: from the registrar to the cleaning staff, who track inventory on their phones.' },
      ],
      facts: [
        { label: 'Based in', value: 'Bogotá, Colombia' },
        { label: 'Work mode', value: 'On-site or remote' },
        { label: 'Focus', value: 'Backend · REST APIs' },
        { label: 'Languages', value: 'Spanish (native) · English B1' },
        { label: 'Status', value: 'Available' },
      ],
    },
    experience: {
      title: 'Experience',
      script: 'from prototype to platform',
      role: 'Fullstack Developer · Professional practicum',
      org: 'Colegio Uziel Querit',
      place: 'Valledupar, Colombia · practicum and degree project',
      period: '2026 – Present',
      status: 'In production',
      stack: ['Angular 20', 'NestJS 11', 'TypeORM', 'PostgreSQL', 'Playwright', 'Nginx', 'Linux'],
      bullets: [
        'Building, as the sole developer, the school management platform of a private K–12 school. It started as a prototype of the enrollment module; the school approved it and it grew to four modules: enrollment and registrar, grades, inventory and administration.',
        'I gather requirements directly with the school. Every request is logged and assessed before it is built: more than 80 change requests and 148 architecture decisions on record.',
        'Backend in NestJS 11 and TypeORM as a modular monolith: a shared core and one PostgreSQL schema per module. 255 REST endpoints documented with Swagger, plus an OpenAPI contract guarded by the tests.',
        'Security: JWT with eight roles and a guard that forces every endpoint to declare who can use it, per-IP login rate limiting and Helmet. Two security audits, with 29 findings fixed, each one with its own test.',
        'More than 2,200 automated tests (e2e and unit, backend and frontend) and 30 end-to-end walkthroughs per role with Playwright.',
        "Report cards, records and grade sheets as PDF, certificates and contracts as Word files from the school's templates, and automatic emails. Running in production on a Hostinger VPS with Nginx, systemd and HTTPS, with encrypted nightly backups and a tested restore.",
      ],
    },
    projects: {
      title: 'Projects',
      script: 'built to be used',
      intro: 'One case in depth plus other work. Open the gallery to see the system from the inside.',
      featured: {
        tag: 'School platform · 4 modules',
        title: 'School management platform',
        status: 'In production',
        client: 'Colegio Uziel Querit',
        role: 'Sole developer',
        year: '2026',
        metrics: [
          { value: '4', label: 'modules on a shared core' },
          { value: '8', label: 'roles, each with its own view' },
          { value: '255', label: 'documented REST endpoints' },
          { value: '77', label: 'tables in 5 schemas' },
          { value: '2,200+', label: 'automated tests' },
          { value: '333', label: 'commits in 2 months' },
        ],
        labels: {
          problem: 'The problem', solution: 'The solution', decision: 'Technical decisions', result: 'Result',
          architecture: 'Architecture and deployment', modules: 'Modules', gallery: 'Open gallery', stack: 'Stack',
          role: 'Role', client: 'Client', year: 'Year', galleryNote: 'Screenshots of all four modules with test data.',
        },
        problem: 'The school, from preschool to 11th grade, ran enrollment, grades, inventory and payroll on spreadsheets, Word forms and paper folders. Releasing a report card, for example, meant checking by hand that the student was up to date with payments.',
        solution: 'A web platform with four modules on a shared core and eight roles: the registrar, families, teachers, the academic office, the inventory staff and the administrator. Each person only sees what belongs to them, and salaries are visible to the administrator alone.',
        decision: 'Modular monolith: modules use the core, the core depends on no module, and a test enforces it. One PostgreSQL schema per module. An OpenAPI contract and e2e snapshots catch any accidental change to the API. Nothing is hard-deleted: records are deactivated and keep their history.',
        result: 'All four modules are done, with the test suite green and two security audits addressed. The school approved the platform, it is now in production, and the cleaning staff have already tried the inventory flow on their phones. It is my degree project at Universidad Popular del Cesar.',
        modules: [
          { name: 'Enrollment and registrar', detail: 'Family accounts, step-by-step applications, document checklists, folders by grade, courses, PDF records and certificates.' },
          { name: 'Grades', detail: 'Curriculum, teacher grade sheets, preschool, make-up exams, attendance, term closing, report cards and honor roll.' },
          { name: 'Inventory', detail: 'Assets by location with photos and history, designed for the cleaning staff on their phones, plus a report for management.' },
          { name: 'Administration', detail: "Staff and their documents, contracts from the school's template, payroll with pay slips and payments." },
        ],
        tech: featuredTech,
        shots: shots(1),
      },
      othersTitle: 'Other work',
      others: [
        {
          title: 'JWT authentication and roles', kind: 'Portfolio project', year: '2024 – 2025',
          description: 'Sign-up and login with JWT, role-based access control (Admin / User) and protected routes. Layered structure (routes, controllers, services, models) with PostgreSQL and a Docker setup.',
          tech: ['Angular', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
          links: [{ label: 'Code', href: 'https://github.com/AleDavidOvalle/Portafolio-auth-roles' }],
        },
        {
          title: 'Formula 1 dashboard', kind: 'University project', year: '2024',
          description: 'ETL pipeline in Talend Open Studio to clean and merge several CSV sources, and a Power BI dashboard with filters, KPIs and comparisons by driver, season and team.',
          tech: ['Talend', 'Power BI', 'Excel'],
          links: [],
        },
        {
          title: 'Web portfolio on AWS', kind: 'Personal project', year: '2024 – 2025',
          description: 'Previous version of my portfolio: Angular frontend and an Express REST API using Builder and Factory patterns, deployed on AWS EC2 with Linux server administration.',
          tech: ['Angular', 'Express', 'AWS EC2', 'Linux'],
          links: [],
        },
        {
          title: 'Design patterns', kind: 'Practice', year: '2025',
          description: 'Implementations of Mediator, Factory, Abstract Factory and Builder in TypeScript and JavaScript, with real use cases such as a payments module.',
          tech: ['TypeScript', 'JavaScript'],
          links: patternLinks,
        },
      ],
    },
    arch: {
      browser: 'Browser', server: 'Hostinger VPS · systemd', proxy: 'Nginx · HTTPS', front: 'Angular 20 (build)',
      api: 'NestJS 11 API', db: 'PostgreSQL · 5 schemas', backup: 'Encrypted cloud backups', backupVia: 'pg_dump + age',
    },
    stack: {
      title: 'Stack', script: 'what I use daily', basic: 'basic',
      groups: [
        { name: 'Languages', items: ['TypeScript', 'JavaScript', 'C#', 'SQL'] },
        { name: 'Frontend', items: ['Angular', 'Signals', 'HTML5', 'CSS3'] },
        { name: 'Backend', items: ['NestJS', 'Node.js / Express', 'TypeORM', '.NET', 'REST APIs', 'Swagger / OpenAPI'] },
        { name: 'Databases', items: ['PostgreSQL', 'SQL Server', 'MySQL', 'Supabase', 'MongoDB'] },
        { name: 'Infrastructure', items: ['Linux (Ubuntu)', 'Nginx', 'systemd', "Let's Encrypt", 'AWS EC2', 'Google Cloud', 'Hostinger', 'Docker*'] },
        { name: 'Testing and practices', items: ['Jest', 'Playwright', 'Jasmine / Karma', 'Modular monolith', 'Mediator · Builder · Factory', 'JWT and roles', 'Git / GitHub'] },
        { name: 'Data & BI', items: ['Power BI*', 'Talend Open Studio*'] },
      ],
    },
    credentials: {
      title: 'Education', script: 'and credentials',
      eduLabel: 'University', degree: 'B.S. in Systems Engineering', school: 'Universidad Popular del Cesar', eduPeriod: '2019 – 2026', eduNote: 'Final semester',
      certLabel: 'Certification', cert: 'Google Cloud Computing Foundations', issuer: 'Google Cloud · verifiable on Credly', certCta: 'View credential',
      langLabel: 'Languages', langs: [{ label: 'Spanish', value: 'Native' }, { label: 'English', value: 'B1' }],
    },
    contact: {
      title: "Let's talk", script: 'write to me',
      text: 'I am looking for my first fullstack or backend role, in Bogotá or remote. If you have an opening or a project, send me a message and I will get back to you soon.',
      emailLabel: 'Email', copy: 'Copy', copied: 'Copied', cvLabel: 'Résumé', cvEs: 'CV en español', cvEn: 'CV in English', to: 'To',
    },
    palette: { placeholder: 'Jump to a section or action…', empty: 'No results', sections: 'Sections', actions: 'Actions', copyEmail: 'Copy email', downloadCv: 'Download CV', switchLang: 'Cambiar a español', hint: 'Ctrl K' },
    lightbox: { close: 'Close', prev: 'Previous', next: 'Next', of: 'of' },
    footer: { built: 'Built with Angular · deployed on Vercel' },
  },
};
