const app = {
    contentContainer: document.getElementById('main-content'),
    
    init() {
        const theme = StorageCore.get().theme;
        document.body.className = theme;
        this.navigate('dashboard');
    },

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar && overlay) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }
    },

    navigate(view) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById('nav-' + view);
        if(activeBtn) activeBtn.classList.add('active');
        
        if (view === 'dashboard') this.contentContainer.innerHTML = Engine.renderDashboard();
        else if (view === 'web-dev') this.contentContainer.innerHTML = Engine.renderPath('web-dev', '🌐 Web Development Path', 'Jalur komprehensif dari HTML dasar hingga Full-stack.');
        else if (view === 'app-dev') this.contentContainer.innerHTML = Engine.renderPath('app-dev', '📱 App Development Path', 'Pelajari cara membangun aplikasi mobile secara tahap demi tahap.');
        else if (view === 'roadmap') this.contentContainer.innerHTML = Engine.renderRoadmap('web-dev');
        // RUTE PROJECTS SEKARANG AKTIF
        else if (view === 'projects') this.contentContainer.innerHTML = Engine.renderProjects();
        else if (view === 'bookmarks') this.contentContainer.innerHTML = Engine.renderBookmarks();
        else if (view === 'notes') this.contentContainer.innerHTML = Engine.renderNotes();
        else if (view === 'achievements') this.contentContainer.innerHTML = Engine.renderAchievements();
    },

    loadLesson(lessonId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        this.contentContainer.scrollTop = 0;
        this.contentContainer.innerHTML = Engine.renderLesson(lessonId);
    },

    toggleTheme() {
        const isDark = document.body.classList.contains('dark-mode');
        const newTheme = isDark ? 'light-mode' : 'dark-mode';
        document.body.className = newTheme;
        StorageCore.update('theme', newTheme);
    }
};

document.addEventListener('DOMContentLoaded', () => { app.init(); });