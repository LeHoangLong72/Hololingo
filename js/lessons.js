// Lessons system for Nihongo Support System

class LessonSystem {
    constructor() {
        this.currentLesson = null;
        this.lessonProgress = {};
        this.userPreferences = {};
        
        this.initializeLessons();
    }
    
    initializeLessons() {
        this.loadProgress();
        this.loadUserPreferences();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Lesson card clicks will be handled by main.js
        // This sets up lesson-specific functionality
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.lesson-card')) {
                const lessonCard = e.target.closest('.lesson-card');
                const lessonId = lessonCard.dataset.lessonId;
                this.openLesson(lessonId);
            }
        });
    }
    
    openLesson(lessonId) {
        const lessonData = this.getLessonById(lessonId);
        if (!lessonData) {
            console.error('Lesson not found:', lessonId);
            return;
        }
        
        this.currentLesson = lessonData;
        this.createLessonModal(lessonData);
    }
    
    getLessonById(lessonId) {
        // Search through all levels for the lesson
        try {
            if (typeof lessonsData !== 'undefined') {
                for (const level in lessonsData) {
                    const lesson = lessonsData[level].find(l => l.id === lessonId);
                    if (lesson) return lesson;
                }
            } else if (typeof getLessonsData === 'function') {
                // Try to get data from data.js functions
                const levels = ['beginner', 'intermediate', 'advanced'];
                for (const level of levels) {
                    const levelLessons = getLessonsData(level);
                    const lesson = levelLessons.find(l => l.id === lessonId);
                    if (lesson) return lesson;
                }
            }
        } catch (error) {
            console.error('Error getting lesson data:', error);
        }
        return null;
    }
    
    createLessonModal(lesson) {
        // Remove existing modal if any
        const existingModal = document.getElementById('lesson-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal structure
        const modal = document.createElement('div');
        modal.id = 'lesson-modal';
        modal.className = 'lesson-modal';
        
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Bài ${lesson.number}: ${lesson.title}</h2>
                        <button class="modal-close" onclick="closeLessonModal()">&times;</button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="lesson-navigation">
                            <button class="nav-btn active" data-section="overview">Tổng quan</button>
                            <button class="nav-btn" data-section="vocabulary">Từ vựng</button>
                            <button class="nav-btn" data-section="grammar">Ngữ pháp</button>
                            <button class="nav-btn" data-section="conversation">Hội thoại</button>
                            <button class="nav-btn" data-section="practice">Luyện tập</button>
                        </div>
                        
                        <div class="lesson-content">
                            <div class="lesson-section active" id="overview-section">
                                ${this.createOverviewSection(lesson)}
                            </div>
                            
                            <div class="lesson-section" id="vocabulary-section">
                                ${this.createVocabularySection(lesson)}
                            </div>
                            
                            <div class="lesson-section" id="grammar-section">
                                ${this.createGrammarSection(lesson)}
                            </div>
                            
                            <div class="lesson-section" id="conversation-section">
                                ${this.createConversationSection(lesson)}
                            </div>
                            
                            <div class="lesson-section" id="practice-section">
                                ${this.createPracticeSection(lesson)}
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <div class="lesson-progress-container">
                            <span>Tiến độ: </span>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${lesson.progress}%"></div>
                            </div>
                            <span>${lesson.progress}%</span>
                        </div>
                        <div class="lesson-actions">
                            <button class="btn-secondary" onclick="previousLesson()">Bài trước</button>
                            <button class="btn-primary" onclick="markLessonComplete()">Hoàn thành</button>
                            <button class="btn-primary" onclick="nextLesson()">Bài tiếp theo</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Setup modal navigation
        this.setupModalNavigation();
        
        // Setup modal interactions
        this.setupModalInteractions();
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    createOverviewSection(lesson) {
        return `
            <div class="overview-content">
                <h3>Mô tả bài học</h3>
                <p>${lesson.description}</p>
                
                <h4>Chủ đề sẽ học:</h4>
                <div class="topic-list">
                    ${lesson.topics.map(topic => `<span class="topic-item">${topic}</span>`).join('')}
                </div>
                
                <h4>Mục tiêu:</h4>
                <ul class="objectives-list">
                    <li>Học và ghi nhớ từ vựng cơ bản</li>
                    <li>Hiểu và áp dụng ngữ pháp</li>
                    <li>Thực hành hội thoại thực tế</li>
                    <li>Cải thiện khả năng phát âm</li>
                </ul>
                
                <div class="lesson-stats">
                    <div class="stat-item">
                        <span class="stat-number">${lesson.content?.vocabulary?.length || 0}</span>
                        <span class="stat-label">Từ vựng</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${lesson.content?.grammar?.length || 0}</span>
                        <span class="stat-label">Ngữ pháp</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${lesson.content?.conversations?.length || 0}</span>
                        <span class="stat-label">Hội thoại</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    createVocabularySection(lesson) {
        if (!lesson.content?.vocabulary) {
            return '<p>Chưa có dữ liệu từ vựng cho bài học này.</p>';
        }
        
        return `
            <div class="vocabulary-content">
                <h3>Từ vựng bài học</h3>
                <div class="vocabulary-list">
                    ${lesson.content.vocabulary.map((vocab, index) => `
                        <div class="vocab-card" data-vocab-index="${index}">
                            <div class="vocab-japanese">${vocab.japanese}</div>
                            <div class="vocab-reading">${vocab.reading}</div>
                            <div class="vocab-meaning">${vocab.meaning}</div>
                            <div class="vocab-actions">
                                <button class="action-btn" onclick="playVocabAudio('${vocab.japanese}')">
                                    <i class="fas fa-volume-up"></i>
                                </button>
                                <button class="action-btn" onclick="addToFlashcards('${vocab.japanese}')">
                                    <i class="fas fa-bookmark"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="vocabulary-practice">
                    <h4>Luyện tập từ vựng</h4>
                    <button class="practice-btn" onclick="startVocabQuiz()">
                        <i class="fas fa-play"></i> Quiz từ vựng
                    </button>
                    <button class="practice-btn" onclick="startVocabGame()">
                        <i class="fas fa-gamepad"></i> Trò chơi từ vựng
                    </button>
                </div>
            </div>
        `;
    }
    
    createGrammarSection(lesson) {
        if (!lesson.content?.grammar) {
            return '<p>Chưa có dữ liệu ngữ pháp cho bài học này.</p>';
        }
        
        return `
            <div class="grammar-content">
                <h3>Ngữ pháp bài học</h3>
                <div class="grammar-list">
                    ${lesson.content.grammar.map((grammar, index) => `
                        <div class="grammar-card" data-grammar-index="${index}">
                            <div class="grammar-pattern">${grammar.pattern}</div>
                            <div class="grammar-meaning">${grammar.meaning}</div>
                            <div class="grammar-example">
                                <strong>Ví dụ:</strong> ${grammar.example}
                            </div>
                            <div class="grammar-actions">
                                <button class="action-btn" onclick="showGrammarDetails(${index})">
                                    <i class="fas fa-info-circle"></i> Chi tiết
                                </button>
                                <button class="action-btn" onclick="practiceGrammar(${index})">
                                    <i class="fas fa-pen"></i> Luyện tập
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    createConversationSection(lesson) {
        if (!lesson.content?.conversations) {
            return '<p>Chưa có dữ liệu hội thoại cho bài học này.</p>';
        }
        
        return `
            <div class="conversation-content">
                <h3>Hội thoại mẫu</h3>
                ${lesson.content.conversations.map((conv, index) => `
                    <div class="conversation-card" data-conv-index="${index}">
                        <h4>${conv.title}</h4>
                        <div class="dialogue">
                            ${conv.dialogue.map((line, lineIndex) => `
                                <div class="dialogue-line">
                                    <div class="speaker">${line.speaker}:</div>
                                    <div class="text-container">
                                        <div class="japanese-text">${line.text}</div>
                                        <div class="meaning-text">${line.meaning}</div>
                                        <button class="play-btn" onclick="playDialogueLine('${line.text}')">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="conversation-actions">
                            <button class="practice-btn" onclick="practiceConversation(${index})">
                                <i class="fas fa-microphone"></i> Luyện nói
                            </button>
                            <button class="practice-btn" onclick="rolePlay(${index})">
                                <i class="fas fa-users"></i> Nhập vai
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    createPracticeSection(lesson) {
        return `
            <div class="practice-content">
                <h3>Luyện tập tổng hợp</h3>
                
                <div class="practice-categories">
                    <div class="practice-category">
                        <h4><i class="fas fa-book"></i> Kiểm tra từ vựng</h4>
                        <p>Kiểm tra khả năng ghi nhớ từ vựng đã học</p>
                        <button class="practice-start-btn" onclick="startVocabularyTest()">
                            Bắt đầu
                        </button>
                    </div>
                    
                    <div class="practice-category">
                        <h4><i class="fas fa-language"></i> Bài tập ngữ pháp</h4>
                        <p>Luyện tập áp dụng ngữ pháp vào câu</p>
                        <button class="practice-start-btn" onclick="startGrammarExercise()">
                            Bắt đầu
                        </button>
                    </div>
                    
                    <div class="practice-category">
                        <h4><i class="fas fa-comments"></i> Thực hành hội thoại</h4>
                        <p>Luyện tập giao tiếp trong tình huống thực tế</p>
                        <button class="practice-start-btn" onclick="startConversationPractice()">
                            Bắt đầu
                        </button>
                    </div>
                    
                    <div class="practice-category">
                        <h4><i class="fas fa-microphone"></i> Luyện phát âm</h4>
                        <p>Cải thiện phát âm với hỗ trợ AI</p>
                        <button class="practice-start-btn" onclick="startPronunciationPractice()">
                            Bắt đầu
                        </button>
                    </div>
                </div>
                
                <div class="comprehensive-test">
                    <h4>Bài kiểm tra tổng hợp</h4>
                    <p>Kiểm tra toàn bộ kiến thức đã học trong bài</p>
                    <button class="comprehensive-test-btn" onclick="startComprehensiveTest()">
                        <i class="fas fa-clipboard-check"></i> Làm bài kiểm tra
                    </button>
                </div>
            </div>
        `;
    }
    
    setupModalNavigation() {
        const navButtons = document.querySelectorAll('.lesson-navigation .nav-btn');
        const sections = document.querySelectorAll('.lesson-section');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetSection = btn.dataset.section;
                
                // Update active button
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active section
                sections.forEach(s => s.classList.remove('active'));
                document.getElementById(`${targetSection}-section`).classList.add('active');
                
                // Track section visit
                this.trackSectionVisit(targetSection);
            });
        });
    }
    
    setupModalInteractions() {
        // Close modal when clicking overlay
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeLessonModal();
                }
            });
        }
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('lesson-modal')) {
                this.closeLessonModal();
            }
        });
    }
    
    closeLessonModal() {
        const modal = document.getElementById('lesson-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
    
    markLessonComplete() {
        if (!this.currentLesson) return;
        
        const lessonId = this.currentLesson.id;
        
        // Update progress
        this.lessonProgress[lessonId] = {
            completed: true,
            completedAt: new Date().toISOString(),
            score: 100
        };
        
        // Update lesson progress in data
        this.currentLesson.progress = 100;
        
        // Save progress
        this.saveProgress();
        
        // Show completion notification
        this.showCompletionAnimation();
        
        // Track completion
        if (window.NihongoApp) {
            window.NihongoApp.trackLessonCompletion(lessonId);
        }
    }
    
    showCompletionAnimation() {
        // Create completion overlay
        const completion = document.createElement('div');
        completion.className = 'completion-animation';
        completion.innerHTML = `
            <div class="completion-content">
                <div class="completion-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <h3>Chúc mừng!</h3>
                <p>Bạn đã hoàn thành bài học</p>
                <div class="completion-stats">
                    <div class="stat">
                        <span class="number">+10</span>
                        <span class="label">Điểm kinh nghiệm</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(completion);
        
        // Show animation
        setTimeout(() => {
            completion.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            completion.classList.remove('show');
            setTimeout(() => {
                completion.remove();
            }, 500);
        }, 3000);
    }
    
    previousLesson() {
        // Implementation to go to previous lesson
        console.log('Previous lesson');
    }
    
    nextLesson() {
        // Implementation to go to next lesson
        console.log('Next lesson');
    }
    
    trackSectionVisit(section) {
        if (!this.currentLesson) return;
        
        const lessonId = this.currentLesson.id;
        if (!this.lessonProgress[lessonId]) {
            this.lessonProgress[lessonId] = {
                sectionsVisited: [],
                timeSpent: 0,
                startedAt: new Date().toISOString()
            };
        }
        
        if (!this.lessonProgress[lessonId].sectionsVisited.includes(section)) {
            this.lessonProgress[lessonId].sectionsVisited.push(section);
            this.saveProgress();
        }
    }
    
    saveProgress() {
        localStorage.setItem('lesson_progress', JSON.stringify(this.lessonProgress));
    }
    
    loadProgress() {
        try {
            const data = localStorage.getItem('lesson_progress');
            this.lessonProgress = data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error loading lesson progress:', error);
            this.lessonProgress = {};
        }
    }
    
    loadUserPreferences() {
        try {
            const data = localStorage.getItem('lesson_preferences');
            this.userPreferences = data ? JSON.parse(data) : {
                autoPlay: true,
                showRomaji: true,
                difficultyLevel: 'beginner'
            };
        } catch (error) {
            console.error('Error loading user preferences:', error);
            this.userPreferences = {
                autoPlay: true,
                showRomaji: true,
                difficultyLevel: 'beginner'
            };
        }
    }
    
    saveUserPreferences() {
        localStorage.setItem('lesson_preferences', JSON.stringify(this.userPreferences));
    }
    
    // Public API methods
    getLessonProgress(lessonId) {
        return this.lessonProgress[lessonId] || null;
    }
    
    getAllProgress() {
        return this.lessonProgress;
    }
    
    resetProgress() {
        this.lessonProgress = {};
        this.saveProgress();
        
        // Reset progress in lesson data
        try {
            if (typeof lessonsData !== 'undefined') {
                Object.values(lessonsData).forEach(levelLessons => {
                    levelLessons.forEach(lesson => {
                        lesson.progress = 0;
                    });
                });
            }
        } catch (error) {
            console.error('Error resetting lesson progress:', error);
        }
    }
    
    exportProgress() {
        return JSON.stringify({
            progress: this.lessonProgress,
            preferences: this.userPreferences,
            exportDate: new Date().toISOString()
        }, null, 2);
    }
    
    importProgress(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.progress) {
                this.lessonProgress = data.progress;
                this.saveProgress();
            }
            
            if (data.preferences) {
                this.userPreferences = data.preferences;
                this.saveUserPreferences();
            }
            
            return true;
        } catch (error) {
            console.error('Error importing lesson progress:', error);
            return false;
        }
    }
}

// Global functions for lesson modal controls
function closeLessonModal() {
    if (window.lessonSystem) {
        window.lessonSystem.closeLessonModal();
    }
}

function markLessonComplete() {
    if (window.lessonSystem) {
        window.lessonSystem.markLessonComplete();
    }
}

function previousLesson() {
    if (window.lessonSystem) {
        window.lessonSystem.previousLesson();
    }
}

function nextLesson() {
    if (window.lessonSystem) {
        window.lessonSystem.nextLesson();
    }
}

// Audio functions
function playVocabAudio(text) {
    if (window.pronunciationAI) {
        window.pronunciationAI.setPronunciationText(text);
        window.pronunciationAI.playPronunciation();
    }
}

function playDialogueLine(text) {
    playVocabAudio(text);
}

// Practice functions
function startVocabularyTest() {
    console.log('Starting vocabulary test');
    // Implementation for vocabulary test
}

function startGrammarExercise() {
    console.log('Starting grammar exercise');
    // Implementation for grammar exercise
}

function startConversationPractice() {
    console.log('Starting conversation practice');
    // Implementation for conversation practice
}

function startPronunciationPractice() {
    console.log('Starting pronunciation practice');
    // Implementation for pronunciation practice
}

function startComprehensiveTest() {
    console.log('Starting comprehensive test');
    // Implementation for comprehensive test
}

function addToFlashcards(vocab) {
    console.log('Adding to flashcards:', vocab);
    // Implementation to add vocabulary to flashcards
}

// Initialize lesson system
function initializeLessons() {
    window.lessonSystem = new LessonSystem();
    return window.lessonSystem;
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeLessons();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LessonSystem,
        initializeLessons,
        closeLessonModal,
        markLessonComplete,
        previousLesson,
        nextLesson,
        playVocabAudio,
        playDialogueLine
    };
}
