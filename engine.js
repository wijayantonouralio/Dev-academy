const Engine = {
    showToast(title, icon) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <h4>Achievement Unlocked!</h4>
                <p>${title}</p>
            </div>
        `;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    },

    checkAchievements() {
        const data = StorageCore.get();
        const proficients = data.completedLessons.length;
        
        if (proficients >= 1 && StorageCore.unlockAchievement('first_blood')) this.showToast('Langkah Pertama', '👶');
        if (proficients >= 5 && StorageCore.unlockAchievement('master_5')) this.showToast('Si Paling Paham', '🧠');
        if (data.streak >= 3 && StorageCore.unlockAchievement('streak_3')) this.showToast('Pemanasan', '🔥');
        if ((data.completedProjects || []).length >= 1 && StorageCore.unlockAchievement('project_done')) this.showToast('Builder', '🚀');
    },

    renderDashboard() {
        this.checkAchievements();
        const userData = StorageCore.get();
        const progressCount = userData.completedLessons.length || 0;
        const isValidLesson = userData.lastLessonId && curriculum.some(l => l.id === userData.lastLessonId);
        const targetLessonId = isValidLesson ? userData.lastLessonId : (curriculum.length > 0 ? curriculum[0].id : null);

        return `
            <h1>Welcome back, Developer! 👋</h1>
            <p>Perjalananmu menuju Full-Stack Expert sedang berlangsung.</p>
            <div class="dashboard-grid">
                <div class="card">
                    <h3>🔥 Learning Streak</h3>
                    <h1 style="font-size: 3rem; margin-top: 10px; color: var(--primary);">${userData.streak} Hari</h1>
                </div>
                <div class="card">
                    <h3>📈 Progress</h3>
                    <p>${progressCount} Materi Dikuasai</p>
                    ${targetLessonId ? 
                        `<button class="btn-primary" onclick="app.loadLesson('${targetLessonId}')">Lanjutkan Materi</button>` : 
                        `<button class="btn-primary" onclick="app.navigate('web-dev')">Mulai Path Web Dev</button>`
                    }
                </div>
            </div>
        `;
    },

    renderPath(pathId, title, subtitle) {
        const pathLessons = curriculum.filter(lesson => lesson.path === pathId);
        return `
            <h1>${title}</h1>
            <p>${subtitle}</p>
            <div class="dashboard-grid">
                ${pathLessons.length > 0 ? pathLessons.map(lesson => `
                    <div class="card">
                        <p style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">
                            Modul: ${lesson.moduleId} | Status: <strong>${StorageCore.getMastery(lesson.id)}</strong>
                        </p>
                        <h3 style="margin: 8px 0;">${lesson.title}</h3>
                        <p>${lesson.description}</p>
                        <button class="btn-primary" style="margin-top: 15px; background: transparent; border: 1px solid var(--primary); color: var(--primary);" onclick="app.loadLesson('${lesson.id}')">Buka Materi</button>
                    </div>
                `).join('') : '<p>Materi sedang disiapkan...</p>'}
            </div>
        `;
    },

    renderRoadmap(activeTab = 'web-dev') {
        const userData = StorageCore.get();
        const completedCount = userData.completedLessons.length || 0;
        const activeRoadmap = activeTab === 'web-dev' ? WebDevRoadmap : AppDevRoadmap;
        
        let currentStepIndex = Math.floor(completedCount / 2); 
        if (currentStepIndex >= activeRoadmap.length) currentStepIndex = activeRoadmap.length - 1;

        let html = `
            <h1>🗺️ Zero to Expert Roadmap</h1>
            <p>Pilih jalur karirmu. Selesaikan materi untuk membuka tahap berikutnya.</p>
            <div style="display: flex; gap: 10px; margin: 30px 0; border-bottom: 1px solid var(--border); padding-bottom: 15px;">
                <button class="btn-primary" style="background: ${activeTab === 'web-dev' ? 'var(--primary)' : 'transparent'}; border: 1px solid var(--primary); color: ${activeTab === 'web-dev' ? '#fff' : 'var(--text-main)'};" onclick="app.contentContainer.innerHTML = Engine.renderRoadmap('web-dev')">🌐 Web Dev Path</button>
                <button class="btn-primary" style="background: ${activeTab === 'app-dev' ? 'var(--primary)' : 'transparent'}; border: 1px solid var(--primary); color: ${activeTab === 'app-dev' ? '#fff' : 'var(--text-main)'};" onclick="app.contentContainer.innerHTML = Engine.renderRoadmap('app-dev')">📱 App Dev Path</button>
            </div>
            <div class="roadmap-container">
        `;

        activeRoadmap.forEach((mod, index) => {
            let statusClass = 'node-locked';
            let icon = '🔒';
            if (index < currentStepIndex) { statusClass = 'node-completed'; icon = '✓'; } 
            else if (index === currentStepIndex) { statusClass = 'node-active'; icon = '🔥'; }
            html += `<div class="roadmap-node ${statusClass}" style="margin-bottom: -5px;">${icon} ${mod.title}</div>`;
            if (index < activeRoadmap.length - 1) {
                let lineStyle = index < currentStepIndex ? 'background: var(--success);' : '';
                html += `<div class="roadmap-line" style="${lineStyle}"></div>`;
            }
        });
        html += `</div>`;
        return html;
    },

    // --- HALAMAN PROJECTS BARU ---
    renderProjects() {
        let html = `
            <h1>💻 Capstone & Real-World Projects</h1>
            <p>Uji kemampuanmu dengan membangun aplikasi nyata dari tingkat pemula hingga expert.</p>
            <div class="dashboard-grid" style="margin-top: 30px;">
        `;

        ProjectsList.forEach(proj => {
            const isDone = StorageCore.isProjectCompleted(proj.id);
            
            html += `
                <div class="card" style="border-top: 4px solid ${isDone ? 'var(--success)' : 'var(--primary)'};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-size: 0.8rem; font-weight: 700; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 6px;">${proj.difficulty}</span>
                        <span style="font-size: 1.2rem;">${isDone ? '✅ Selesai' : '⏳ Belum'}</span>
                    </div>
                    <h3>${proj.title}</h3>
                    <p style="margin: 10px 0 15px 0;">${proj.description}</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px;">
                        ${proj.skills.map(skill => `<span style="font-size: 0.7rem; background: rgba(59,130,246,0.1); color: var(--primary); padding: 3px 8px; border-radius: 4px;">${skill}</span>`).join('')}
                    </div>
                    <button class="btn-primary" style="width: 100%; background: ${isDone ? 'transparent' : 'var(--primary)'}; border: ${isDone ? '1px solid var(--success)' : 'none'}; color: ${isDone ? 'var(--success)' : '#fff'};" onclick="Engine.toggleProject('${proj.id}')">
                        ${isDone ? 'Batalkan Status Selesai' : 'Tandai Selesai 🚀'}
                    </button>
                </div>
            `;
        });

        html += `</div>`;
        return html;
    },

    toggleProject(projectId) {
        const isNowCompleted = StorageCore.toggleProjectComplete(projectId);
        if (isNowCompleted) {
            this.checkAchievements(); // Cek piala builder
        }
        // Refresh halaman projects
        app.contentContainer.innerHTML = this.renderProjects();
    },

    renderLesson(lessonId) {
        const lesson = curriculum.find(l => l.id === lessonId);
        if (!lesson) return `<h1>Materi tidak ditemukan.</h1>`;

        const isBookmarked = StorageCore.isBookmarked(lessonId);
        const savedNote = StorageCore.getNote(lessonId);

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <button onclick="app.navigate('dashboard')" style="background:none; border:none; color:var(--text-muted); cursor:pointer;">← Kembali</button>
                <button onclick="Engine.handleBookmark('${lessonId}')" id="btn-bookmark" style="background:none; border:none; font-size: 1.5rem; cursor:pointer; color: ${isBookmarked ? '#f59e0b' : 'var(--text-muted)'};" title="Bookmark Materi Ini">${isBookmarked ? '★' : '☆'}</button>
            </div>
            <h1>${lesson.title}</h1>
            <p style="color: var(--primary); font-weight: 600;">Level: ${lesson.level.toUpperCase()} | ${lesson.moduleId}</p>
            <div class="lesson-content">${lesson.content}</div>
        `;

        if (lesson.quiz) {
            html += `
                <div class="quiz-container" id="quiz-box">
                    <h3>🧠 Knowledge Check</h3>
                    <p>${lesson.quiz.question}</p>
                    <div class="quiz-options">
                        ${lesson.quiz.options.map((opt, index) => {
                            let safeText = opt.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                            return `<button class="quiz-btn" onclick="Engine.checkQuiz(${index}, '${lessonId}')">${safeText}</button>`;
                        }).join('')}
                    </div>
                    <div id="quiz-feedback" class="quiz-feedback"></div>
                </div>
            `;
        }

        if (lesson.playground) {
            html += `
                <div style="margin-top: 40px;">
                    <h3>💻 Waktunya Praktek!</h3>
                    <p>${lesson.playground.instruction}</p>
                    <div class="playground">
                        <div class="editor-panel"><textarea id="code-editor">${lesson.playground.initialCode}</textarea></div>
                        <div class="preview-panel"><iframe id="code-preview" sandbox="allow-scripts"></iframe></div>
                        <button class="run-btn" onclick="Engine.runCode()">▶ Jalankan Kode</button>
                    </div>
                </div>
            `;
        }

        html += `
            <div style="margin-top: 40px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid var(--border);">
                <h3>📝 Catatan Pribadimu</h3>
                <textarea id="note-${lessonId}" style="width: 100%; height: 100px; margin-top: 10px; padding: 12px; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border); border-radius: 8px; resize: vertical;" placeholder="Tulis catatan di sini...">${savedNote}</textarea>
                <button class="btn-primary" style="margin-top: 10px;" onclick="Engine.handleSaveNote('${lessonId}')">Simpan Catatan</button>
                <span id="note-alert-${lessonId}" style="margin-left: 10px; color: var(--success); display: none;">✓ Tersimpan!</span>
            </div>
            <div style="margin-top: 40px; padding: 24px; background: rgba(59,130,246,0.05); border: 1px solid var(--border); border-radius: 12px;">
                <h3>🎓 Mastery Status: <span style="color: var(--primary); text-transform: uppercase;">${StorageCore.getMastery(lessonId)}</span></h3>
                <div style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
                    <button class="btn-primary" style="background: transparent; border: 1px solid var(--primary); color: var(--text-main);" onclick="Engine.setMastery('${lesson.id}', 'Learning')">Sedang Belajar 📖</button>
                    <button class="btn-primary" style="background: var(--success);" onclick="Engine.setMastery('${lesson.id}', 'Proficient')">Saya Paham (Proficient) ✓</button>
                </div>
            </div>
        `;
        return html;
    },

    renderBookmarks() {
        const data = StorageCore.get();
        const savedLessons = curriculum.filter(l => (data.bookmarks || []).includes(l.id));
        let html = `<h1>⭐ Bookmarks</h1><div class="dashboard-grid">`;
        if (savedLessons.length > 0) {
            html += savedLessons.map(lesson => `<div class="card"><h3>${lesson.title}</h3><button class="btn-primary" style="margin-top: 15px;" onclick="app.loadLesson('${lesson.id}')">Buka</button></div>`).join('');
        } else html += `<p>Belum ada materi di-bookmark.</p>`;
        return html + `</div>`;
    },

    renderNotes() {
        const data = StorageCore.get();
        const lessonIds = Object.keys(data.notes || {}).filter(id => data.notes[id].trim() !== "");
        let html = `<h1>📝 My Notes</h1><div class="dashboard-grid" style="grid-template-columns: 1fr;">`;
        if (lessonIds.length > 0) {
            html += lessonIds.map(id => {
                const title = curriculum.find(l => l.id === id)?.title || "Materi";
                return `<div class="card" style="border-left: 4px solid var(--primary);"><h3>Dari: ${title}</h3><p style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">${data.notes[id]}</p><button class="btn-primary" style="margin-top: 15px; background:transparent; border:1px solid var(--primary); color:var(--primary);" onclick="app.loadLesson('${id}')">Buka</button></div>`;
            }).join('');
        } else html += `<p>Catatan kosong.</p>`;
        return html + `</div>`;
    },

    renderAchievements() {
        let html = `<h1>🏆 Koleksi Pencapaian</h1><p>Selesaikan berbagai misi untuk membuka semua piala!</p><div class="dashboard-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-top: 40px;">`;
        AchievementsList.forEach(ach => {
            const isUnlocked = StorageCore.hasAchievement(ach.id);
            html += `<div class="card achievement-card ${isUnlocked ? 'achievement-unlocked' : 'achievement-locked'}"><div class="achievement-icon">${ach.icon}</div><h3 style="font-size: 1.1rem; margin-bottom: 8px;">${ach.title}</h3><p style="font-size: 0.85rem;">${isUnlocked ? ach.description : '🔒 <i>Rahasia. Teruslah belajar!</i>'}</p></div>`;
        });
        return html + `</div>`;
    },

    handleBookmark(id) { StorageCore.toggleBookmark(id); app.loadLesson(id); },
    handleSaveNote(id) {
        StorageCore.saveNote(id, document.getElementById(`note-${id}`).value);
        document.getElementById(`note-alert-${id}`).style.display = 'inline-block';
        setTimeout(() => document.getElementById(`note-alert-${id}`).style.display = 'none', 2000);
    },
    checkQuiz(idx, id) {
        const option = curriculum.find(l => l.id === id).quiz.options[idx];
        const fb = document.getElementById('quiz-feedback');
        fb.className = 'quiz-feedback ' + (option.isCorrect ? 'feedback-success' : 'feedback-error');
        fb.innerHTML = option.feedback.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        fb.style.transform = 'scale(0.95)'; setTimeout(() => fb.style.transform = 'scale(1)', 50);
    },
    runCode() {
        if (StorageCore.unlockAchievement('coder')) this.showToast('Code Runner', '💻');
        const code = document.getElementById('code-editor').value;
        const iframe = document.getElementById('code-preview');
        iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(`<html><body style="font-family: sans-serif; padding: 10px;"><script>try { ${code} } catch(e) { document.body.innerHTML = '<div style="color:red;">Error: ' + e.message + '</div>'; }</script></body></html>`);
    },
    setMastery(lessonId, level) {
        StorageCore.updateMastery(lessonId, level);
        this.checkAchievements();
        const currentLessonIndex = curriculum.findIndex(l => l.id === lessonId);
        if (level === 'Proficient' || level === 'Mastered') {
            if (currentLessonIndex < curriculum.length - 1) app.loadLesson(curriculum[currentLessonIndex + 1].id);
            else { alert("Semua materi dikuasai!"); app.navigate('dashboard'); }
        } else app.loadLesson(lessonId); 
    }
};