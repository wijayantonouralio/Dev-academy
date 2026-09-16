const StorageCore = {
    key: 'code_academy_data',
    
    init() {
        let data = localStorage.getItem(this.key);
        if (!data) {
            const defaultData = {
                onboardingDone: false, currentLevel: 'ZERO', streak: 1, lastLogin: new Date().toDateString(),
                lessonMastery: {}, completedLessons: [], lastLessonId: null, theme: 'dark-mode', bookmarks: [], notes: {},
                achievements: [], completedProjects: [] // Brankas baru Projects
            };
            this.save(defaultData);
        } else {
            let parsedData = JSON.parse(data);
            let updated = false;
            if (!parsedData.lessonMastery) { parsedData.lessonMastery = {}; updated = true; }
            if (!parsedData.bookmarks) { parsedData.bookmarks = []; updated = true; }
            if (!parsedData.notes) { parsedData.notes = {}; updated = true; }
            if (!parsedData.achievements) { parsedData.achievements = []; updated = true; }
            if (!parsedData.completedProjects) { parsedData.completedProjects = []; updated = true; }
            if (updated) this.save(parsedData);
        }
        this.checkStreak();
    },

    get() { return JSON.parse(localStorage.getItem(this.key)); },
    save(data) { localStorage.setItem(this.key, JSON.stringify(data)); },
    update(key, value) { const data = this.get(); data[key] = value; this.save(data); },

    checkStreak() {
        const data = this.get();
        const today = new Date().toDateString();
        if (data.lastLogin !== today) {
            data.streak += 1;
            data.lastLogin = today;
            this.save(data);
        }
    },

    updateMastery(lessonId, level) {
        const data = this.get();
        data.lessonMastery[lessonId] = level;
        data.lastLessonId = lessonId;
        if (level === 'Proficient' || level === 'Mastered') {
            if (!data.completedLessons.includes(lessonId)) data.completedLessons.push(lessonId);
        }
        this.save(data);
    },

    getMastery(lessonId) {
        const data = this.get();
        return data.lessonMastery ? (data.lessonMastery[lessonId] || "Not Started") : "Not Started";
    },

    toggleBookmark(lessonId) {
        const data = this.get();
        const index = data.bookmarks.indexOf(lessonId);
        if (index > -1) data.bookmarks.splice(index, 1);
        else data.bookmarks.push(lessonId);
        this.save(data);
    },
    isBookmarked(lessonId) { return this.get().bookmarks?.includes(lessonId) || false; },
    saveNote(lessonId, text) { const data = this.get(); data.notes[lessonId] = text; this.save(data); },
    getNote(lessonId) { return this.get().notes?.[lessonId] || ""; },

    unlockAchievement(id) {
        const data = this.get();
        if (!data.achievements.includes(id)) {
            data.achievements.push(id);
            this.save(data);
            return true;
        }
        return false;
    },
    hasAchievement(id) { return this.get().achievements?.includes(id) || false; },

    // --- FITUR PROJECT ---
    toggleProjectComplete(projectId) {
        const data = this.get();
        const index = data.completedProjects.indexOf(projectId);
        let isCompleted = false;
        if (index > -1) {
            data.completedProjects.splice(index, 1);
        } else {
            data.completedProjects.push(projectId);
            isCompleted = true;
        }
        this.save(data);
        return isCompleted;
    },
    isProjectCompleted(projectId) {
        return this.get().completedProjects?.includes(projectId) || false;
    }
};

StorageCore.init();