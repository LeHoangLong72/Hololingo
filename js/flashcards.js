// Flashcards system for Nihongo Support System

class FlashcardSystem {
    constructor() {
        this.currentDeck = [];
        this.currentCardIndex = 0;
        this.studyStats = {
            cardsStudied: 0,
            correctAnswers: 0,
            streak: 0,
            maxStreak: 0
        };
        this.isFlipped = false;
        this.studySession = null;
        
        this.initializeFlashcards();
    }
    
    initializeFlashcards() {
        this.loadStudyStats();
        this.setupEventListeners();
        this.loadDefaultDeck();
    }
    
    setupEventListeners() {
        // Option buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectDeckType(e.target.dataset.type);
            });
        });
        
        // Flashcard click
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.addEventListener('click', () => {
                this.flipCard();
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }
    
    selectDeckType(type) {
        // Update active button
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
        
        // Load deck
        this.loadDeck(type);
    }
    
    loadDeck(type) {
        this.currentDeck = this.getDeckData(type);
        this.currentCardIndex = 0;
        this.isFlipped = false;
        
        if (this.currentDeck.length > 0) {
            this.showCard(0);
        } else {
            this.showEmptyDeck();
        }
    }
    
    loadDefaultDeck() {
        this.loadDeck('vocabulary');
    }
    
    getDeckData(type) {
        switch (type) {
            case 'vocabulary':
                return this.createVocabularyCards();
            case 'kanji':
                return this.createKanjiCards();
            case 'grammar':
                return this.createGrammarCards();
            case 'mixed':
                return this.createMixedCards();
            default:
                return [];
        }
    }
    
    createVocabularyCards() {
        const cards = [];
        Object.values(vocabularyData).forEach(category => {
            category.forEach(vocab => {
                cards.push({
                    id: `vocab_${vocab.japanese}`,
                    type: 'vocabulary',
                    front: vocab.japanese,
                    back: vocab.meaning,
                    explanation: `Đọc: ${vocab.reading}\nVí dụ: ${vocab.example.japanese} - ${vocab.example.meaning}`,
                    difficulty: this.getCardDifficulty(`vocab_${vocab.japanese}`)
                });
            });
        });
        return this.shuffleArray(cards);
    }
    
    createKanjiCards() {
        const cards = [];
        Object.values(kanjiData).forEach(level => {
            level.forEach(kanji => {
                cards.push({
                    id: `kanji_${kanji.character}`,
                    type: 'kanji',
                    front: kanji.character,
                    back: kanji.meaning,
                    explanation: `Âm on: ${kanji.readings.onyomi.join(', ')}\nÂm kun: ${kanji.readings.kunyomi.join(', ')}\nSố nét: ${kanji.strokeCount}`,
                    difficulty: this.getCardDifficulty(`kanji_${kanji.character}`)
                });
            });
        });
        return this.shuffleArray(cards);
    }
    
    createGrammarCards() {
        const cards = [];
        grammarData.forEach((grammar, index) => {
            cards.push({
                id: `grammar_${index}`,
                type: 'grammar',
                front: grammar.pattern,
                back: grammar.title,
                explanation: `${grammar.explanation}\nVí dụ: ${grammar.examples[0].japanese} - ${grammar.examples[0].meaning}`,
                difficulty: this.getCardDifficulty(`grammar_${index}`)
            });
        });
        return this.shuffleArray(cards);
    }
    
    createMixedCards() {
        const vocabCards = this.createVocabularyCards().slice(0, 10);
        const kanjiCards = this.createKanjiCards().slice(0, 5);
        const grammarCards = this.createGrammarCards().slice(0, 5);
        
        return this.shuffleArray([...vocabCards, ...kanjiCards, ...grammarCards]);
    }
    
    showCard(index) {
        if (index >= this.currentDeck.length) {
            this.endStudySession();
            return;
        }
        
        const card = this.currentDeck[index];
        const flashcard = document.getElementById('flashcard');
        const frontElement = document.getElementById('card-question');
        const backElement = document.getElementById('card-answer');
        const explanationElement = document.getElementById('card-explanation');
        
        if (frontElement) frontElement.textContent = card.front;
        if (backElement) backElement.textContent = card.back;
        if (explanationElement) explanationElement.textContent = card.explanation;
        
        // Reset flip state
        if (flashcard) {
            flashcard.classList.remove('flipped');
        }
        this.isFlipped = false;
        
        // Update progress
        this.updateProgress();
    }
    
    flipCard() {
        const flashcard = document.getElementById('flashcard');
        if (flashcard && !this.isFlipped) {
            flashcard.classList.add('flipped');
            this.isFlipped = true;
        }
    }
    
    markCard(difficulty) {
        if (!this.isFlipped) {
            this.flipCard();
            return;
        }
        
        const currentCard = this.currentDeck[this.currentCardIndex];
        
        // Update stats
        this.studyStats.cardsStudied++;
        
        if (difficulty === 'correct' || difficulty === 'easy') {
            this.studyStats.correctAnswers++;
            this.studyStats.streak++;
            if (this.studyStats.streak > this.studyStats.maxStreak) {
                this.studyStats.maxStreak = this.studyStats.streak;
            }
        } else {
            this.studyStats.streak = 0;
        }
        
        // Save card performance
        this.saveCardPerformance(currentCard.id, difficulty);
        
        // Schedule card for review based on difficulty
        this.scheduleCard(currentCard, difficulty);
        
        // Move to next card
        this.nextCard();
        
        // Update display
        this.updateStats();
        this.saveStudyStats();
    }
    
    nextCard() {
        this.currentCardIndex++;
        
        if (this.currentCardIndex >= this.currentDeck.length) {
            this.endStudySession();
        } else {
            this.showCard(this.currentCardIndex);
        }
    }
    
    endStudySession() {
        const accuracy = this.studyStats.cardsStudied > 0 
            ? Math.round((this.studyStats.correctAnswers / this.studyStats.cardsStudied) * 100)
            : 0;
        
        this.showSessionSummary(accuracy);
        
        // Reset for new session
        this.currentCardIndex = 0;
        this.loadDeck(document.querySelector('.option-btn.active')?.dataset.type || 'vocabulary');
    }
    
    showSessionSummary(accuracy) {
        const message = `
            Phiên học hoàn thành!
            Số thẻ đã học: ${this.studyStats.cardsStudied}
            Độ chính xác: ${accuracy}%
            Chuỗi đúng tối đa: ${this.studyStats.maxStreak}
        `;
        
        if (window.NihongoApp) {
            window.NihongoApp.showNotification(message, 'success', 5000);
        } else {
            alert(message);
        }
    }
    
    updateStats() {
        const cardsStudiedElement = document.getElementById('cards-studied');
        const accuracyElement = document.getElementById('accuracy');
        const streakElement = document.getElementById('streak');
        
        if (cardsStudiedElement) {
            cardsStudiedElement.textContent = this.studyStats.cardsStudied;
        }
        
        if (accuracyElement) {
            const accuracy = this.studyStats.cardsStudied > 0 
                ? Math.round((this.studyStats.correctAnswers / this.studyStats.cardsStudied) * 100)
                : 0;
            accuracyElement.textContent = `${accuracy}%`;
        }
        
        if (streakElement) {
            streakElement.textContent = this.studyStats.streak;
        }
    }
    
    updateProgress() {
        const totalCards = this.currentDeck.length;
        const currentCard = this.currentCardIndex + 1;
        const progressPercent = totalCards > 0 ? (currentCard / totalCards) * 100 : 0;
        
        // Update progress indicator if exists
        const progressBar = document.querySelector('.flashcard-progress');
        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }
        
        // Update card counter
        const cardCounter = document.querySelector('.card-counter');
        if (cardCounter) {
            cardCounter.textContent = `${currentCard} / ${totalCards}`;
        }
    }
    
    handleKeyboard(e) {
        // Only handle if flashcards section is visible
        const flashcardsSection = document.getElementById('flashcards');
        if (!flashcardsSection || !this.isElementInViewport(flashcardsSection)) {
            return;
        }
        
        switch (e.key) {
            case ' ':
            case 'Enter':
                e.preventDefault();
                this.flipCard();
                break;
            case '1':
                e.preventDefault();
                this.markCard('wrong');
                break;
            case '2':
                e.preventDefault();
                this.markCard('again');
                break;
            case '3':
                e.preventDefault();
                this.markCard('correct');
                break;
            case '4':
                e.preventDefault();
                this.markCard('easy');
                break;
        }
    }
    
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    scheduleCard(card, difficulty) {
        const now = new Date();
        let nextReview;
        
        switch (difficulty) {
            case 'wrong':
                nextReview = new Date(now.getTime() + 1 * 60 * 1000); // 1 minute
                break;
            case 'again':
                nextReview = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes
                break;
            case 'correct':
                nextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day
                break;
            case 'easy':
                nextReview = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days
                break;
            default:
                nextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day
        }
        
        this.saveCardSchedule(card.id, nextReview);
    }
    
    saveCardPerformance(cardId, difficulty) {
        let performance = this.loadCardPerformance(cardId);
        
        if (!performance) {
            performance = {
                cardId: cardId,
                attempts: 0,
                correct: 0,
                lastReviewed: new Date().toISOString(),
                difficulty: 1.0
            };
        }
        
        performance.attempts++;
        performance.lastReviewed = new Date().toISOString();
        
        if (difficulty === 'correct' || difficulty === 'easy') {
            performance.correct++;
        }
        
        // Adjust difficulty based on performance
        const successRate = performance.correct / performance.attempts;
        if (successRate > 0.8) {
            performance.difficulty = Math.max(0.5, performance.difficulty - 0.1);
        } else if (successRate < 0.5) {
            performance.difficulty = Math.min(2.0, performance.difficulty + 0.1);
        }
        
        localStorage.setItem(`flashcard_performance_${cardId}`, JSON.stringify(performance));
    }
    
    loadCardPerformance(cardId) {
        try {
            const data = localStorage.getItem(`flashcard_performance_${cardId}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading card performance:', error);
            return null;
        }
    }
    
    saveCardSchedule(cardId, nextReview) {
        const schedule = {
            cardId: cardId,
            nextReview: nextReview.toISOString()
        };
        localStorage.setItem(`flashcard_schedule_${cardId}`, JSON.stringify(schedule));
    }
    
    loadCardSchedule(cardId) {
        try {
            const data = localStorage.getItem(`flashcard_schedule_${cardId}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading card schedule:', error);
            return null;
        }
    }
    
    getCardDifficulty(cardId) {
        const performance = this.loadCardPerformance(cardId);
        return performance ? performance.difficulty : 1.0;
    }
    
    saveStudyStats() {
        localStorage.setItem('flashcard_study_stats', JSON.stringify(this.studyStats));
    }
    
    loadStudyStats() {
        try {
            const data = localStorage.getItem('flashcard_study_stats');
            if (data) {
                this.studyStats = { ...this.studyStats, ...JSON.parse(data) };
            }
        } catch (error) {
            console.error('Error loading study stats:', error);
        }
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    showEmptyDeck() {
        const frontElement = document.getElementById('card-question');
        const backElement = document.getElementById('card-answer');
        const explanationElement = document.getElementById('card-explanation');
        
        if (frontElement) frontElement.textContent = 'Không có thẻ nào để học';
        if (backElement) backElement.textContent = 'Hãy chọn loại thẻ khác';
        if (explanationElement) explanationElement.textContent = 'Dữ liệu đang được cập nhật';
    }
    
    // Public API
    reset() {
        this.studyStats = {
            cardsStudied: 0,
            correctAnswers: 0,
            streak: 0,
            maxStreak: 0
        };
        this.saveStudyStats();
        this.updateStats();
    }
    
    getDueCards() {
        const now = new Date();
        const dueCards = [];
        
        this.currentDeck.forEach(card => {
            const schedule = this.loadCardSchedule(card.id);
            if (!schedule || new Date(schedule.nextReview) <= now) {
                dueCards.push(card);
            }
        });
        
        return dueCards;
    }
    
    exportProgress() {
        const data = {
            stats: this.studyStats,
            performance: {},
            schedules: {}
        };
        
        // Collect all performance and schedule data
        this.currentDeck.forEach(card => {
            const performance = this.loadCardPerformance(card.id);
            const schedule = this.loadCardSchedule(card.id);
            
            if (performance) data.performance[card.id] = performance;
            if (schedule) data.schedules[card.id] = schedule;
        });
        
        return JSON.stringify(data, null, 2);
    }
    
    importProgress(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.stats) {
                this.studyStats = data.stats;
                this.saveStudyStats();
            }
            
            if (data.performance) {
                Object.entries(data.performance).forEach(([cardId, performance]) => {
                    localStorage.setItem(`flashcard_performance_${cardId}`, JSON.stringify(performance));
                });
            }
            
            if (data.schedules) {
                Object.entries(data.schedules).forEach(([cardId, schedule]) => {
                    localStorage.setItem(`flashcard_schedule_${cardId}`, JSON.stringify(schedule));
                });
            }
            
            this.updateStats();
            return true;
        } catch (error) {
            console.error('Error importing progress:', error);
            return false;
        }
    }
}

// Global functions for flashcard controls
function markCard(difficulty) {
    if (window.flashcardSystem) {
        window.flashcardSystem.markCard(difficulty);
    }
}

function flipFlashcard() {
    if (window.flashcardSystem) {
        window.flashcardSystem.flipCard();
    }
}

// Initialize flashcard system
function initializeFlashcards() {
    window.flashcardSystem = new FlashcardSystem();
    return window.flashcardSystem;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FlashcardSystem,
        initializeFlashcards,
        markCard,
        flipFlashcard
    };
}
