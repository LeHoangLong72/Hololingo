// Pronunciation AI system for Nihongo Support System

class PronunciationAI {
    constructor() {
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.currentText = '';
        this.speechRecognition = null;
        this.speechSynthesis = window.speechSynthesis;
        this.japaneseSynthesizer = null;
        
        this.initializePronunciationAI();
    }
    
    initializePronunciationAI() {
        this.setupSpeechRecognition();
        this.setupSpeechSynthesis();
        this.loadSavedSettings();
    }
    
    setupSpeechRecognition() {
        // Setup speech recognition for pronunciation analysis
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.speechRecognition = new SpeechRecognition();
            
            this.speechRecognition.lang = 'ja-JP';
            this.speechRecognition.continuous = false;
            this.speechRecognition.interimResults = false;
            this.speechRecognition.maxAlternatives = 5;
            
            this.speechRecognition.onresult = (event) => {
                this.handleSpeechResult(event);
            };
            
            this.speechRecognition.onerror = (event) => {
                this.handleSpeechError(event);
            };
            
            this.speechRecognition.onend = () => {
                this.stopRecording();
            };
        }
    }
    
    setupSpeechSynthesis() {
        // Setup speech synthesis for pronunciation examples
        if (this.speechSynthesis) {
            this.speechSynthesis.onvoiceschanged = () => {
                this.loadJapaneseVoices();
            };
            this.loadJapaneseVoices();
        }
    }
    
    loadJapaneseVoices() {
        const voices = this.speechSynthesis.getVoices();
        
        // Find Japanese voices
        const japaneseVoices = voices.filter(voice => 
            voice.lang.startsWith('ja') || 
            voice.name.toLowerCase().includes('japanese') ||
            voice.name.toLowerCase().includes('japan')
        );
        
        if (japaneseVoices.length > 0) {
            // Prefer native Japanese voices
            this.japaneseSynthesizer = japaneseVoices.find(voice => 
                voice.lang === 'ja-JP' && voice.localService
            ) || japaneseVoices[0];
        }
    }
    
    setPronunciationText(text) {
        this.currentText = text;
        const textArea = document.getElementById('pronunciation-text');
        if (textArea) {
            textArea.value = text;
        }
    }
    
    playPronunciation() {
        const text = this.getCurrentText();
        if (!text) {
            this.showError('Vui lòng nhập văn bản để phát âm');
            return;
        }
        
        if (this.speechSynthesis && this.japaneseSynthesizer) {
            // Stop any ongoing speech
            this.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = this.japaneseSynthesizer;
            utterance.rate = 0.8;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
            utterance.onstart = () => {
                this.updatePlayButton(true);
            };
            
            utterance.onend = () => {
                this.updatePlayButton(false);
            };
            
            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                this.showError('Không thể phát âm văn bản này');
                this.updatePlayButton(false);
            };
            
            this.speechSynthesis.speak(utterance);
        } else {
            this.showError('Trình duyệt không hỗ trợ phát âm tiếng Nhật');
        }
    }
    
    async startRecording() {
        if (this.isRecording) {
            this.stopRecording();
            return;
        }
        
        const text = this.getCurrentText();
        if (!text) {
            this.showError('Vui lòng nhập văn bản trước khi ghi âm');
            return;
        }
        
        try {
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    sampleRate: 44100,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
            
            this.audioChunks = [];
            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });
            
            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };
            
            this.mediaRecorder.onstop = () => {
                this.processRecording();
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            this.updateRecordButton(true);
            
            // Start speech recognition
            if (this.speechRecognition) {
                this.speechRecognition.start();
            }
            
            // Auto-stop after 10 seconds
            setTimeout(() => {
                if (this.isRecording) {
                    this.stopRecording();
                }
            }, 10000);
            
        } catch (error) {
            console.error('Error accessing microphone:', error);
            this.showError('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
        }
    }
    
    stopRecording() {
        if (!this.isRecording) return;
        
        this.isRecording = false;
        this.updateRecordButton(false);
        
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
        }
        
        if (this.speechRecognition) {
            this.speechRecognition.stop();
        }
        
        // Stop microphone stream
        if (this.mediaRecorder && this.mediaRecorder.stream) {
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
    }
    
    processRecording() {
        if (this.audioChunks.length === 0) return;
        
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        
        // Create audio URL for playback
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Store for analysis
        this.lastRecording = {
            blob: audioBlob,
            url: audioUrl,
            timestamp: new Date().toISOString()
        };
        
        // Show that recording is ready for analysis
        this.enableAnalysis();
    }
    
    handleSpeechResult(event) {
        const results = Array.from(event.results);
        const recognizedText = results.map(result => result[0].transcript).join('');
        const confidence = results.length > 0 ? results[0][0].confidence : 0;
        
        this.lastSpeechResult = {
            recognized: recognizedText,
            confidence: confidence,
            alternatives: results.map(result => ({
                text: result[0].transcript,
                confidence: result[0].confidence
            }))
        };
    }
    
    handleSpeechError(event) {
        console.error('Speech recognition error:', event.error);
        let errorMessage = 'Lỗi nhận diện giọng nói';
        
        switch (event.error) {
            case 'no-speech':
                errorMessage = 'Không phát hiện được tiếng nói';
                break;
            case 'audio-capture':
                errorMessage = 'Không thể ghi âm';
                break;
            case 'not-allowed':
                errorMessage = 'Quyền truy cập microphone bị từ chối';
                break;
            case 'network':
                errorMessage = 'Lỗi kết nối mạng';
                break;
        }
        
        this.showError(errorMessage);
    }
    
    analyzePronunciation() {
        const originalText = this.getCurrentText();
        
        if (!originalText) {
            this.showError('Vui lòng nhập văn bản để phân tích');
            return;
        }
        
        if (!this.lastSpeechResult) {
            this.showError('Vui lòng ghi âm trước khi phân tích');
            return;
        }
        
        // Analyze pronunciation
        const analysis = this.performPronunciationAnalysis(
            originalText,
            this.lastSpeechResult.recognized,
            this.lastSpeechResult.confidence
        );
        
        // Display results
        this.displayAnalysisResults(analysis);
        
        // Save progress
        this.savePronunciationProgress(originalText, analysis);
    }
    
    performPronunciationAnalysis(original, recognized, confidence) {
        // Normalize texts for comparison
        const normalizedOriginal = this.normalizeJapaneseText(original);
        const normalizedRecognized = this.normalizeJapaneseText(recognized);
        
        // Calculate similarity
        const accuracy = this.calculateTextSimilarity(normalizedOriginal, normalizedRecognized);
        
        // Analyze pronunciation aspects
        const analysis = {
            overallScore: Math.round((accuracy * 0.7 + confidence * 0.3) * 100),
            accuracy: Math.round(accuracy * 100),
            confidence: Math.round(confidence * 100),
            intonation: this.analyzeIntonation(original, recognized),
            speed: this.analyzeSpeed(original, recognized),
            feedback: this.generateFeedback(accuracy, confidence, original, recognized),
            improvements: this.generateImprovements(accuracy, confidence, original, recognized)
        };
        
        return analysis;
    }
    
    normalizeJapaneseText(text) {
        // Remove punctuation and normalize whitespace
        return text
            .replace(/[。、！？\s\n\r]/g, '')
            .toLowerCase()
            .trim();
    }
    
    calculateTextSimilarity(text1, text2) {
        if (text1 === text2) return 1.0;
        
        const len1 = text1.length;
        const len2 = text2.length;
        
        if (len1 === 0 || len2 === 0) return 0.0;
        
        // Use Levenshtein distance for similarity
        const matrix = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));
        
        for (let i = 0; i <= len1; i++) matrix[i][0] = i;
        for (let j = 0; j <= len2; j++) matrix[0][j] = j;
        
        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = text1[i - 1] === text2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }
        
        const distance = matrix[len1][len2];
        const maxLen = Math.max(len1, len2);
        
        return 1 - (distance / maxLen);
    }
    
    analyzeIntonation(original, recognized) {
        // Simple intonation analysis based on text match
        // In a real implementation, this would analyze audio features
        return Math.floor(Math.random() * 30) + 70; // Placeholder: 70-100%
    }
    
    analyzeSpeed(original, recognized) {
        // Simple speed analysis
        // In a real implementation, this would analyze recording duration vs expected duration
        return Math.floor(Math.random() * 20) + 80; // Placeholder: 80-100%
    }
    
    generateFeedback(accuracy, confidence, original, recognized) {
        const feedback = [];
        
        if (accuracy < 0.5) {
            feedback.push('Cần luyện tập thêm về phát âm cơ bản');
        } else if (accuracy < 0.8) {
            feedback.push('Phát âm khá tốt, cần chú ý một số âm');
        } else {
            feedback.push('Phát âm rất tốt!');
        }
        
        if (confidence < 0.6) {
            feedback.push('Hãy nói rõ ràng và chậm hơn');
        }
        
        // Analyze specific character differences
        if (original !== recognized) {
            feedback.push('Chú ý phát âm các âm: ' + this.findDifficultSounds(original, recognized));
        }
        
        return feedback;
    }
    
    generateImprovements(accuracy, confidence, original, recognized) {
        const improvements = [];
        
        if (accuracy < 0.7) {
            improvements.push('Luyện tập phát âm từng âm tiết riêng biệt');
            improvements.push('Nghe và lặp lại theo mẫu nhiều lần');
        }
        
        if (confidence < 0.7) {
            improvements.push('Nói chậm và rõ ràng hơn');
            improvements.push('Tập trung vào việc phát âm đúng từng âm');
        }
        
        improvements.push('Luyện tập thường xuyên với các từ tương tự');
        improvements.push('Ghi âm và so sánh với mẫu chuẩn');
        
        return improvements;
    }
    
    findDifficultSounds(original, recognized) {
        // Find characters that are different between original and recognized
        const difficult = new Set();
        const minLen = Math.min(original.length, recognized.length);
        
        for (let i = 0; i < minLen; i++) {
            if (original[i] !== recognized[i]) {
                difficult.add(original[i]);
            }
        }
        
        return Array.from(difficult).join(', ') || 'các âm cơ bản';
    }
    
    displayAnalysisResults(analysis) {
        // Update score
        const scoreElement = document.getElementById('score-number');
        if (scoreElement) {
            scoreElement.textContent = analysis.overallScore;
        }
        
        // Update feedback bars
        this.updateFeedbackBar('accuracy', analysis.accuracy);
        this.updateFeedbackBar('intonation', analysis.intonation);
        this.updateFeedbackBar('speed', analysis.speed);
        
        // Update tips
        const tipsList = document.getElementById('tips-list');
        if (tipsList) {
            tipsList.innerHTML = '';
            analysis.improvements.forEach(tip => {
                const li = document.createElement('li');
                li.textContent = tip;
                tipsList.appendChild(li);
            });
        }
        
        // Show color-coded score
        this.updateScoreColor(analysis.overallScore);
    }
    
    updateFeedbackBar(type, value) {
        const feedbackItems = document.querySelectorAll('.feedback-item');
        feedbackItems.forEach(item => {
            const label = item.querySelector('.feedback-label').textContent.toLowerCase();
            if (label.includes(type === 'accuracy' ? 'chính xác' : type === 'intonation' ? 'ngữ điệu' : 'tốc độ')) {
                const progress = item.querySelector('.feedback-progress');
                const valueElement = item.querySelector('.feedback-value');
                
                if (progress) progress.style.width = `${value}%`;
                if (valueElement) valueElement.textContent = `${value}%`;
                
                // Color coding
                if (value >= 80) {
                    progress.style.backgroundColor = '#27ae60';
                } else if (value >= 60) {
                    progress.style.backgroundColor = '#f39c12';
                } else {
                    progress.style.backgroundColor = '#e74c3c';
                }
            }
        });
    }
    
    updateScoreColor(score) {
        const scoreElement = document.getElementById('score-number');
        if (!scoreElement) return;
        
        if (score >= 80) {
            scoreElement.style.color = '#27ae60';
        } else if (score >= 60) {
            scoreElement.style.color = '#f39c12';
        } else {
            scoreElement.style.color = '#e74c3c';
        }
    }
    
    updatePlayButton(isPlaying) {
        const playBtn = document.querySelector('.pronunciation-btn.listen');
        if (playBtn) {
            const icon = playBtn.querySelector('i');
            if (isPlaying) {
                icon.className = 'fas fa-stop';
                playBtn.disabled = true;
            } else {
                icon.className = 'fas fa-volume-up';
                playBtn.disabled = false;
            }
        }
    }
    
    updateRecordButton(isRecording) {
        const recordBtn = document.getElementById('record-btn');
        if (recordBtn) {
            const icon = recordBtn.querySelector('i');
            if (isRecording) {
                icon.className = 'fas fa-stop';
                recordBtn.classList.add('recording');
                recordBtn.innerHTML = '<i class="fas fa-stop"></i> Dừng ghi';
            } else {
                icon.className = 'fas fa-microphone';
                recordBtn.classList.remove('recording');
                recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Ghi âm';
            }
        }
    }
    
    enableAnalysis() {
        const analyzeBtn = document.querySelector('.pronunciation-btn.analyze');
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.style.opacity = '1';
        }
    }
    
    getCurrentText() {
        const textArea = document.getElementById('pronunciation-text');
        return textArea ? textArea.value.trim() : this.currentText;
    }
    
    showError(message) {
        if (window.NihongoApp && window.NihongoApp.showNotification) {
            window.NihongoApp.showNotification(message, 'error');
        } else {
            alert(message);
        }
    }
    
    savePronunciationProgress(text, analysis) {
        const progress = this.loadPronunciationProgress();
        const entry = {
            text: text,
            score: analysis.overallScore,
            timestamp: new Date().toISOString(),
            analysis: analysis
        };
        
        progress.push(entry);
        
        // Keep only last 100 entries
        if (progress.length > 100) {
            progress.splice(0, progress.length - 100);
        }
        
        localStorage.setItem('pronunciation_progress', JSON.stringify(progress));
    }
    
    loadPronunciationProgress() {
        try {
            const data = localStorage.getItem('pronunciation_progress');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading pronunciation progress:', error);
            return [];
        }
    }
    
    loadSavedSettings() {
        // Load user preferences for speech rate, pitch, etc.
        try {
            const settings = localStorage.getItem('pronunciation_settings');
            if (settings) {
                this.settings = JSON.parse(settings);
            }
        } catch (error) {
            console.error('Error loading pronunciation settings:', error);
        }
    }
    
    saveSettings() {
        localStorage.setItem('pronunciation_settings', JSON.stringify(this.settings));
    }
    
    // Public API methods
    getProgressStats() {
        const progress = this.loadPronunciationProgress();
        if (progress.length === 0) return null;
        
        const scores = progress.map(p => p.score);
        const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        const lastScore = scores[scores.length - 1];
        const improvement = progress.length > 1 ? lastScore - scores[0] : 0;
        
        return {
            totalSessions: progress.length,
            averageScore: Math.round(averageScore),
            lastScore: lastScore,
            improvement: Math.round(improvement),
            bestScore: Math.max(...scores)
        };
    }
    
    exportProgress() {
        const progress = this.loadPronunciationProgress();
        return JSON.stringify(progress, null, 2);
    }
    
    importProgress(jsonData) {
        try {
            const progress = JSON.parse(jsonData);
            localStorage.setItem('pronunciation_progress', JSON.stringify(progress));
            return true;
        } catch (error) {
            console.error('Error importing pronunciation progress:', error);
            return false;
        }
    }
}

// Global functions for pronunciation controls
function setPronunciationText(text) {
    if (window.pronunciationAI) {
        window.pronunciationAI.setPronunciationText(text);
    }
}

function playPronunciation() {
    if (window.pronunciationAI) {
        window.pronunciationAI.playPronunciation();
    }
}

function startRecording() {
    if (window.pronunciationAI) {
        window.pronunciationAI.startRecording();
    }
}

function analyzePronunciation() {
    if (window.pronunciationAI) {
        window.pronunciationAI.analyzePronunciation();
    }
}

// Initialize pronunciation AI
function initializePronunciationAI() {
    window.pronunciationAI = new PronunciationAI();
    return window.pronunciationAI;
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializePronunciationAI();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PronunciationAI,
        initializePronunciationAI,
        setPronunciationText,
        playPronunciation,
        startRecording,
        analyzePronunciation
    };
}
