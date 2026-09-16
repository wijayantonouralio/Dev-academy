// --- DAFTAR ACHIEVEMENT / PIALA ---
const AchievementsList = [
    { id: "first_blood", icon: "👶", title: "Langkah Pertama", description: "Menyelesaikan materi pertama dengan status Proficient." },
    { id: "streak_3", icon: "🔥", title: "Pemanasan", description: "Mencapai 3 hari streak belajar beruntun." },
    { id: "master_5", icon: "🧠", title: "Si Paling Paham", description: "Mencapai status Proficient di 5 materi berbeda." },
    { id: "coder", icon: "💻", title: "Code Runner", description: "Mengeksekusi kode di playground untuk pertama kalinya." },
    { id: "project_done", icon: "🚀", title: "Builder", description: "Menyelesaikan project nyata pertamamu." }
];

// --- DAFTAR PROJECT NYATA (Dari Pemula ke Capstone) ---
const ProjectsList = [
    { 
        id: "proj-profile", 
        difficulty: "🟢 Easy", 
        title: "Personal Profile", 
        description: "Buat halaman profil diri sendiri menggunakan struktur dasar HTML semantik.",
        skills: ["HTML5", "Semantic Elements", "Basic Text Formatting"] 
    },
    { 
        id: "proj-landing", 
        difficulty: "🟢 Easy", 
        title: "Responsive Landing Page", 
        description: "Rancang halaman depan produk yang indah dan menyesuaikan berbagai ukuran layar pakai Flexbox/Grid.",
        skills: ["CSS3", "Flexbox", "Media Queries"] 
    },
    { 
        id: "proj-todo", 
        difficulty: "🟡 Medium", 
        title: "Interactive Todo Application", 
        description: "Bikin aplikasi pencatat tugas harian dengan fitur tambah, hapus, dan simpan data pakai LocalStorage.",
        skills: ["JavaScript ES6+", "DOM Manipulation", "LocalStorage"] 
    },
    { 
        id: "proj-weather", 
        difficulty: "🟡 Medium", 
        title: "Weather Application", 
        description: "Aplikasi pengecek cuaca real-time yang mengambil data dari publik API menggunakan Fetch API.",
        skills: ["Async/Await", "Fetch API", "JSON Parsing"] 
    },
    { 
        id: "proj-ecommerce", 
        difficulty: "🔴 Hard", 
        title: "E-Commerce Frontend", 
        description: "Platform toko online lengkap dengan keranjang belanja, filter produk, dan simulasi pembayaran.",
        skills: ["Advanced JavaScript", "State Management", "Modular Architecture"] 
    },
    { 
        id: "proj-capstone", 
        difficulty: "👑 Expert Capstone", 
        title: "Full-Stack Learning Platform", 
        description: "Membangun platform tiruan dari aplikasi ini dari nol: Frontend, Backend API, Database, Auth, hingga Deployment.",
        skills: ["Full-Stack Architecture", "Database Design", "Security", "DevOps & Deployment"] 
    }
];

// 1. WEB DEV ROADMAP
const WebDevRoadmap = [
    { id: "mod-01", title: "1. Computer Fundamentals" },
    { id: "mod-02", title: "2. Developer Environment" },
    { id: "mod-03", title: "3. Internet Fundamentals" },
    { id: "mod-04", title: "4. Web Architecture" },
    { id: "mod-05", title: "5. HTML Fundamentals" },
    { id: "mod-81", title: "81. EXPERT CAPSTONE: Full-Stack Platform" }
];

// 2. APP DEV ROADMAP
const AppDevRoadmap = [
    { id: "app-mod-01", title: "1. Computer Fundamentals" },
    { id: "app-mod-02", title: "2. Developer Environment" },
    { id: "app-mod-03", title: "3. Programming Fundamentals" },
    { id: "app-mod-04", title: "4. Programming Logic" },
    { id: "app-mod-05", title: "5. Object-Oriented Programming" },
    { id: "app-mod-06", title: "6. Data Structures" },
    { id: "app-mod-07", title: "7. Mobile Application Fundamentals" },
    { id: "app-mod-08", title: "8. Android Fundamentals" },
    { id: "app-mod-09", title: "9. Android Development Environment" },
    { id: "app-mod-10", title: "10. Mobile Programming Language (Kotlin)" },
    { id: "app-mod-11", title: "11. Android UI Fundamentals" },
    { id: "app-mod-60", title: "60. App Distribution" },
    { id: "app-mod-61", title: "61. DevOps for App Development" },
    { id: "app-mod-62", title: "62. Observability" }
];

// 3. KONTEN PEMBELAJARAN
const curriculum = [
    {
        id: "html-01",
        path: "web-dev",
        moduleId: "mod-05",
        level: "beginner",
        title: "HTML Fundamentals",
        description: "Kerangka dasar sebuah website.",
        content: `<h2>Struktur HTML</h2><p>Semua konten visual ada di dalam tag <code>&lt;body&gt;</code>.</p>`,
        quiz: {
            question: "Tag mana untuk menampung konten visual?",
            options: [
                { text: "<head>", isCorrect: false, feedback: "Salah." },
                { text: "<body>", isCorrect: true, feedback: "Benar 🔥!" }
            ]
        },
        playground: { instruction: "Tulis tag h1", initialCode: `<h1>Halo</h1>` }
    },
    {
        id: "app-fund-01",
        path: "app-dev",
        moduleId: "app-mod-07",
        level: "beginner",
        title: "Mobile App Fundamentals",
        description: "Native vs Cross-Platform vs Hybrid.",
        content: `
            <h2>Apa Beda Native dan Cross-Platform?</h2>
            <p><strong>Native App:</strong> Dibangun spesifik pakai bahasa asli HP-nya (Kotlin buat Android, Swift buat iOS). Performanya kencang dan akses *hardware* sangat mudah.</p>
            <p><strong>Cross-Platform:</strong> Lu ngoding sekali, aplikasinya bisa diexport ke Android dan iOS sekaligus. Hemat waktu!</p>
        `,
        quiz: {
            question: "Jika kamu ingin membuat game 3D berat, pendekatan mana yang terbaik?",
            options: [
                { text: "Native Application", isCorrect: true, feedback: "Benar 🔥! Native memberi performa maksimal." },
                { text: "Hybrid Web App", isCorrect: false, feedback: "Salah, Hybrid akan lag untuk game 3D." }
            ]
        },
        playground: null
    }
];