// ============================================================
// Oyun 10: Ünlü Harfler Kâşifi (a, e, ı, i, o, ö, u, ü)
// Okul öncesi ses farkındalığı ve ses-harf eşleştirme oyunu
// ============================================================

class VowelsGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentIndex = 0;
        this.questions = [];
        this.currentAge = '3-4';
    }

    start(ageLevel = '3-4') {
        this.currentAge = ageLevel;
        this.currentIndex = 0;
        this.questions = window.MAARIF_DATA.vowels.levels[ageLevel] || window.MAARIF_DATA.vowels.levels['3-4'];
        this.renderQuestion();
    }

    renderQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.finishGame();
            return;
        }

        const q = this.questions[this.currentIndex];

        this.container.innerHTML = `
            <div class="game-play-area animate-pop">
                <div class="question-banner">
                    <button class="audio-replay-btn" id="repeatInstruction" title="Yönergeyi Tekrar Dinle">
                        🔊
                    </button>
                    <h2 class="question-text">${q.instruction}</h2>
                </div>

                <div class="vowel-stage animate-float">
                    <div class="vowel-target-card">
                        <span class="vowel-big-emoji">${q.targetEmoji}</span>
                        <span class="vowel-target-word">${q.word}</span>
                    </div>
                </div>

                <div class="vowel-hint-sound">
                    <button class="vowel-sound-play-btn" id="btnListenSound">
                        📢 Sesini Dinle: <strong>"${q.vowelSound}"</strong>
                    </button>
                </div>

                <div class="vowels-options-grid ${q.options.length > 3 ? 'grid-4' : 'grid-3'}">
                    ${q.options.map(opt => `
                        <button class="vowel-letter-btn" data-letter="${opt.letter}" data-correct="${opt.isCorrect}">
                            <span class="vowel-letter">${opt.letter}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="game-footer-status">
                    <span class="step-indicator">Soru ${this.currentIndex + 1} / ${this.questions.length}</span>
                </div>
            </div>
        `;

        // Sesli Yönerge
        window.soundManager.speak(q.instruction);

        // Dinle butonu
        document.getElementById('btnListenSound').addEventListener('click', () => {
            window.soundManager.speak(q.vowelSound, true);
        });

        // Tekrar dinle
        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(q.instruction, true);
        });

        const letterBtns = this.container.querySelectorAll('.vowel-letter-btn');
        letterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleAnswer(btn, letterBtns));
        });
    }

    handleAnswer(button, allButtons) {
        const isCorrect = button.getAttribute('data-correct') === 'true';
        const letter = button.getAttribute('data-letter');
        allButtons.forEach(b => b.disabled = true);

        // Harfin sesini oku
        window.soundManager.speak(letter, true);

        if (isCorrect) {
            button.classList.add('correct-answer-card');
            window.soundManager.playSuccess();
            
            setTimeout(() => {
                window.soundManager.speak(`Harikasın! "${letter}" sesi doğru!`, true);
            }, 500);

            if (window.app) {
                window.app.triggerConfetti();
                window.app.addStar();
            }

            if (this.onProgress) {
                this.onProgress('vowels', true);
            }

            setTimeout(() => {
                this.currentIndex++;
                this.renderQuestion();
            }, 1900);
        } else {
            button.classList.add('wrong-answer-card');
            window.soundManager.playTryAgain();
            setTimeout(() => {
                window.soundManager.speak('Tekrar dene, sesini bir daha dinleyelim!', true);
            }, 500);

            setTimeout(() => {
                button.classList.remove('wrong-answer-card');
                allButtons.forEach(b => b.disabled = false);
            }, 1400);
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🔤🌟</div>
                <h2>Harf Kâşifi!</h2>
                <p>Tüm ünlü harfleri (A, E, I, İ, O, Ö, U, Ü) başarıyla öğrendin!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler! Ünlü harfler oyununu harika bir şekilde tamamladın!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.VowelsGame = VowelsGame;
