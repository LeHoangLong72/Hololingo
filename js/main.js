// Main JavaScript file for Nihongo Support System

// Global variables
let currentSection = 'home';
let isLoading = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
        loadInitialData();
        setupEventListeners();
        setupSmoothScrolling();
        setupMobileMenu();
        console.log('Nihongo Support System loaded successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

// Initialize application
function initializeApp() {
    console.log('Nihongo Support System initialized');
    
    // Hide loading overlay
    hideLoading();
    
    // Set active section based on URL hash
    const hash = window.location.hash.slice(1);
    if (hash) {
        currentSection = hash;
        highlightActiveSection();
    }
}

// Load initial data
function loadInitialData() {
    try {
        loadLessons('beginner');
        loadAlphabet('hiragana');
        loadVocabulary('basic');
        loadGrammar();
        loadKanji();
        initializeFlashcards();
        console.log('Initial data loaded');
    } catch (error) {
        console.error('Error loading initial data:', error);
        showNotification('Lỗi khi tải dữ liệu. Vui lòng refresh trang.', 'error');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });
    
    // Lesson cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.lesson-card')) {
            handleLessonClick(e.target.closest('.lesson-card'));
        }
    });
    
    // Alphabet cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.alphabet-card')) {
            handleAlphabetClick(e.target.closest('.alphabet-card'));
        }
    });
    
    // Flashcard
    document.addEventListener('click', function(e) {
        if (e.target.closest('.flashcard')) {
            flipFlashcard();
        }
    });
    
    // Window scroll
    window.addEventListener('scroll', handleScroll);
    
    // Window resize
    window.addEventListener('resize', handleResize);
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Handle tab clicks
function handleTabClick(e) {
    const tabBtn = e.target;
    const tabGroup = tabBtn.parentElement;
    const tabType = tabBtn.dataset.level || tabBtn.dataset.alphabet;
    
    // Remove active class from all tabs in the group
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked tab
    tabBtn.classList.add('active');
    
    // Load appropriate content
    if (tabBtn.dataset.level) {
        loadLessons(tabBtn.dataset.level);
    } else if (tabBtn.dataset.alphabet) {
        loadAlphabet(tabBtn.dataset.alphabet);
    }
}

// Handle category clicks
function handleCategoryClick(e) {
    const category = e.target.closest('.category-card').dataset.category;
    loadVocabulary(category);
    
    // Highlight selected category
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    e.target.closest('.category-card').classList.add('active');
}

// Handle lesson clicks
function handleLessonClick(lessonCard) {
    const lessonId = lessonCard.dataset.lessonId;
    openLessonModal(lessonId);
}

// Handle alphabet clicks
function handleAlphabetClick(alphabetCard) {
    const char = alphabetCard.dataset.char;
    const reading = alphabetCard.dataset.reading;
    
    // Play pronunciation
    playCharacterSound(char, reading);
    
    // Show character details
    showCharacterModal(char, reading);
}

// Handle scroll
function handleScroll() {
    const scrollTop = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    // Add shadow to navbar when scrolling
    if (scrollTop > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active section
    updateActiveSection();
}

// Handle resize
function handleResize() {
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
}

// Update active section based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSectionId = section.id;
        }
    });
    
    if (currentSectionId && currentSectionId !== currentSection) {
        currentSection = currentSectionId;
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Highlight active section
function highlightActiveSection() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Load lessons based on level
function loadLessons(level) {
    try {
        showLoading();
        
        const lessonsData = getLessonsData(level);
        const lessonsGrid = document.getElementById('lessons-grid');
        
        if (lessonsGrid) {
            lessonsGrid.innerHTML = '';
            
            if (lessonsData && lessonsData.length > 0) {
                lessonsData.forEach(lesson => {
                    const lessonCard = createLessonCard(lesson);
                    lessonsGrid.appendChild(lessonCard);
                });
            } else {
                lessonsGrid.innerHTML = '<p>Chưa có bài học cho cấp độ này.</p>';
            }
        }
        
        hideLoading();
    } catch (error) {
        console.error('Error loading lessons:', error);
        hideLoading();
        if (document.getElementById('lessons-grid')) {
            document.getElementById('lessons-grid').innerHTML = '<p>Lỗi khi tải bài học. Vui lòng thử lại.</p>';
        }
    }
}

// Create lesson card element
function createLessonCard(lesson) {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.dataset.lessonId = lesson.id;
    
    card.innerHTML = `
        <div class="lesson-number">Bài ${lesson.number}</div>
        <h3>${lesson.title}</h3>
        <p>${lesson.description}</p>
        <div class="lesson-topics">
            ${lesson.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
        </div>
        <div class="lesson-progress">
            <div class="progress-bar">
                <div class="progress" style="width: ${lesson.progress}%"></div>
            </div>
            <span>${lesson.progress}%</span>
        </div>
    `;
    
    return card;
}

// Load alphabet
function loadAlphabet(type) {
    try {
        const alphabetData = getAlphabetData(type);
        const alphabetGrid = document.getElementById('alphabet-grid');
        
        if (alphabetGrid && alphabetData) {
            alphabetGrid.innerHTML = '';
            
            alphabetData.forEach(char => {
                const charCard = createAlphabetCard(char);
                alphabetGrid.appendChild(charCard);
            });
        }
    } catch (error) {
        console.error('Error loading alphabet:', error);
    }
}

// Create alphabet card element
function createAlphabetCard(char) {
    const card = document.createElement('div');
    card.className = 'alphabet-card';
    card.dataset.char = char.character;
    card.dataset.reading = char.romaji;
    
    card.innerHTML = `
        <div class="alphabet-char">${char.character}</div>
        <div class="alphabet-romaji">${char.romaji}</div>
    `;
    
    return card;
}

// Load vocabulary
function loadVocabulary(category) {
    try {
        const vocabularyData = getVocabularyData(category);
        const vocabularyList = document.getElementById('vocabulary-list');
        
        if (vocabularyList && vocabularyData) {
            vocabularyList.innerHTML = '';
            
            vocabularyData.forEach(vocab => {
                const vocabItem = createVocabularyItem(vocab);
                vocabularyList.appendChild(vocabItem);
            });
        }
    } catch (error) {
        console.error('Error loading vocabulary:', error);
    }
}

// Create vocabulary item element
function createVocabularyItem(vocab) {
    const item = document.createElement('div');
    item.className = 'vocab-item';
    
    item.innerHTML = `
        <div class="vocab-japanese">${vocab.japanese}</div>
        <div class="vocab-reading">${vocab.reading}</div>
        <div class="vocab-meaning">${vocab.meaning}</div>
        <div class="vocab-example">
            <strong>Ví dụ:</strong> ${vocab.example.japanese}<br>
            <em>${vocab.example.meaning}</em>
        </div>
    `;
    
    return item;
}

// Load grammar
function loadGrammar() {
    try {
        const grammarData = getGrammarData();
        const grammarTopics = document.querySelector('.grammar-topics');
        
        if (grammarTopics && grammarData) {
            grammarTopics.innerHTML = '';
            
            grammarData.forEach(grammar => {
                const grammarTopic = createGrammarTopic(grammar);
                grammarTopics.appendChild(grammarTopic);
            });
        }
    } catch (error) {
        console.error('Error loading grammar:', error);
    }
}

// Create grammar topic element
function createGrammarTopic(grammar) {
    const topic = document.createElement('div');
    topic.className = 'grammar-topic';
    
    topic.innerHTML = `
        <div class="grammar-title">${grammar.title}</div>
        <div class="grammar-pattern">${grammar.pattern}</div>
        <div class="grammar-explanation">${grammar.explanation}</div>
        <div class="grammar-examples">
            ${grammar.examples.map(example => `
                <div class="grammar-example">
                    <strong>${example.japanese}</strong><br>
                    ${example.meaning}
                </div>
            `).join('')}
        </div>
    `;
    
    return topic;
}

// Load kanji
function loadKanji() {
    const kanjiLevels = document.querySelectorAll('.kanji-level');
    
    kanjiLevels.forEach(level => {
        level.addEventListener('click', function() {
            const levelType = this.dataset.level;
            openKanjiStudy(levelType);
        });
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
        isLoading = true;
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
        isLoading = false;
    }
}

// Modal functions
function openLessonModal(lessonId) {
    // This would open a detailed lesson modal
    console.log('Opening lesson:', lessonId);
    // Implementation would include creating and showing a modal with lesson content
}

function showCharacterModal(char, reading) {
    // This would show detailed information about the character
    console.log('Showing character details:', char, reading);
    // Implementation would include pronunciation guide, stroke order, etc.
}

function openKanjiStudy(level) {
    // This would open the kanji study interface
    console.log('Opening kanji study for level:', level);
    // Implementation would include kanji cards, stroke order practice, etc.
}

// Audio functions
function playCharacterSound(char, reading) {
    // This would use Text-to-Speech or audio files to play pronunciation
    console.log('Playing sound for:', char, reading);
    
    // Using Web Speech API for basic TTS
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(char);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Speech recognition setup (for pronunciation practice)
function setupSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'ja-JP';
        recognition.continuous = false;
        recognition.interimResults = false;
        
        return recognition;
    }
    return null;
}

// Local storage functions
function saveProgress(key, data) {
    try {
        localStorage.setItem(`nihongo_${key}`, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

function loadProgress(key) {
    try {
        const data = localStorage.getItem(`nihongo_${key}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading progress:', error);
        return null;
    }
}

// Analytics and progress tracking
function trackLessonCompletion(lessonId) {
    const progress = loadProgress('lessons') || {};
    progress[lessonId] = {
        completed: true,
        completedAt: new Date().toISOString()
    };
    saveProgress('lessons', progress);
}

function trackVocabularyLearned(vocabId) {
    const progress = loadProgress('vocabulary') || {};
    progress[vocabId] = {
        learned: true,
        learnedAt: new Date().toISOString()
    };
    saveProgress('vocabulary', progress);
}

function trackKanjiProgress(kanjiId, level) {
    const progress = loadProgress('kanji') || {};
    if (!progress[kanjiId]) {
        progress[kanjiId] = { attempts: 0, correct: 0 };
    }
    progress[kanjiId].attempts++;
    if (level === 'correct' || level === 'easy') {
        progress[kanjiId].correct++;
    }
    saveProgress('kanji', progress);
}

// Error handling
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    
    // Show user-friendly error message
    showNotification('Đã xảy ra lỗi. Vui lòng thử lại.', 'error');
}

// Notification system
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Export functions for use in other files
window.NihongoApp = {
    scrollToSection,
    showLoading,
    hideLoading,
    playCharacterSound,
    saveProgress,
    loadProgress,
    trackLessonCompletion,
    trackVocabularyLearned,
    trackKanjiProgress,
    showNotification,
    handleError
};

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}
