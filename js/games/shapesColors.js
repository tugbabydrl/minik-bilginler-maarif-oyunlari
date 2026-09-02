// Oyun 1: Şekil ve Renkler Bahçesi
class ShapesColorsGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentIndex = 0;
        this.score = 0;
        this.questions = [];
        this.currentAge = '3-4';
    }

    start(ageLevel = '3-4') {
        this.currentAge = ageLevel;
        this.currentIndex = 0;
        this.score = 0;
        this.questions = window.MAARIF_DATA.shapesColors.levels[ageLevel] || window.MAARIF_DATA.shapesColors.levels['3-4'];
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

                <div class="target-display">
                    ${q.targetShape ? `
                        <div class="target-basket">
                            <span class="basket-icon">🧺</span>
                            <span class="basket-label">Aranan: <strong>${q.targetName || 'Doğru Şekil'}</strong></span>
                        </div>
                    ` : `
                        <div class="target-basket">
                            <span class="basket-icon">🎯</span>
                            <span class="basket-label">Aranan Renk: <strong>${q.targetColorName || 'Doğru Renk'}</strong></span>
                        </div>
                    `}
                </div>

                <div class="options-grid ${q.options.length > 3 ? 'grid-4' : 'grid-3'}">
                    ${q.options.map((opt, idx) => `
                        <button class="game-card-option" data-idx="${idx}" data-correct="${opt.isCorrect}">
                            <div class="option-visual" style="${opt.shape ? '' : (opt.color ? `background-color: ${opt.color}15; border-color: ${opt.color}` : '')}">
                                <span class="option-emoji">${opt.emoji || '✨'}</span>
                            </div>
                            <span class="option-name">${opt.name}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="game-footer-status">
                    <span class="step-indicator">Soru ${this.currentIndex + 1} / ${this.questions.length}</span>
                </div>
            </div>
        `;

        // Sesli Yönergeyi Oynat
        window.soundManager.speak(q.instruction);

        // Olay Dinleyicileri
        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(q.instruction, true);
        });

        const optionButtons = this.container.querySelectorAll('.game-card-option');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAnswer(btn, optionButtons));
        });
    }

    handleAnswer(button, allButtons) {
        const isCorrect = button.getAttribute('data-correct') === 'true';

        // Butonları geçici olarak devre dışı bırak
        allButtons.forEach(b => b.disabled = true);

        if (isCorrect) {
            button.classList.add('correct-answer-card');
            window.soundManager.playSuccess();
            window.soundManager.speak('Harikasın! Doğru bildin!', true);

            if (window.app) {
                window.app.triggerConfetti();
                window.app.addStar();
            }

            this.score++;
            if (this.onProgress) {
                this.onProgress('shapesColors', true);
            }

            setTimeout(() => {
                this.currentIndex++;
                this.renderQuestion();
            }, 1800);
        } else {
            button.classList.add('wrong-answer-card');
            window.soundManager.playTryAgain();
            window.soundManager.speak('Tekrar dene, başarabilirsin!', true);

            setTimeout(() => {
                button.classList.remove('wrong-answer-card');
                allButtons.forEach(b => b.disabled = false);
            }, 1200);
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🏆</div>
                <h2>Tebrikler Minik Bilgin!</h2>
                <p>Şekil ve Renkler Bahçesi'ndeki tüm görevleri başarıyla tamamladın!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler! Şekil ve renkler bahçesini tamamladın. Harika bir iş çıkardın!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.ShapesColorsGame = ShapesColorsGame;
