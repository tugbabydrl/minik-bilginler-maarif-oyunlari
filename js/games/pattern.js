// Oyun 6: Sihirli Örüntü Treni
class PatternGame {
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
        this.questions = window.MAARIF_DATA.pattern.levels[ageLevel] || window.MAARIF_DATA.pattern.levels['3-4'];
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

                <div class="train-track-container">
                    <div class="magic-train">
                        <div class="train-engine">
                            🚂
                            <span class="chimney-smoke">💨</span>
                        </div>
                        <div class="train-wagons">
                            ${q.patternDisplay.map((item, idx) => `
                                <div class="wagon ${item === '❓' ? 'wagon-target-pulsate' : ''}" id="${item === '❓' ? 'targetWagon' : ''}">
                                    <div class="wagon-cargo">${item}</div>
                                    <div class="wagon-wheels">
                                        <span class="wheel">⚙️</span>
                                        <span class="wheel">⚙️</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="pattern-options-area">
                    <div class="pattern-options-title">Sıradaki vagon için doğru olanı seç:</div>
                    <div class="pattern-options-row">
                        ${q.options.map(opt => `
                            <button class="pattern-choice-btn" data-item="${opt}">
                                <span class="choice-emoji">${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="game-footer-status">
                    <span class="step-indicator">Soru ${this.currentIndex + 1} / ${this.questions.length}</span>
                </div>
            </div>
        `;

        // Sesli Yönerge
        window.soundManager.speak(q.instruction);

        // Tekrar dinle
        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(q.instruction, true);
        });

        const optionButtons = this.container.querySelectorAll('.pattern-choice-btn');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleAnswer(btn, q.correctItem, optionButtons));
        });
    }

    handleAnswer(button, correctItem, allButtons) {
        const chosen = button.getAttribute('data-item');
        allButtons.forEach(b => b.disabled = true);

        if (chosen === correctItem) {
            button.classList.add('correct-answer-card');
            const targetWagon = document.getElementById('targetWagon');
            if (targetWagon) {
                targetWagon.querySelector('.wagon-cargo').textContent = correctItem;
                targetWagon.classList.remove('wagon-target-pulsate');
                targetWagon.classList.add('wagon-filled');
            }

            window.soundManager.playSuccess();
            window.soundManager.speak('Çuf çuf! Örüntü treni tamamlandı!', true);

            if (window.app) {
                window.app.triggerConfetti();
                window.app.addStar();
            }

            if (this.onProgress) {
                this.onProgress('pattern', true);
            }

            setTimeout(() => {
                this.currentIndex++;
                this.renderQuestion();
            }, 1800);
        } else {
            button.classList.add('wrong-answer-card');
            window.soundManager.playTryAgain();
            window.soundManager.speak('Örüntünün sırasına dikkatlice bak, hangisi gelmeliydi?', true);

            setTimeout(() => {
                button.classList.remove('wrong-answer-card');
                allButtons.forEach(b => b.disabled = false);
            }, 1200);
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🚂✨</div>
                <h2>Makinist Usta!</h2>
                <p>Sihirli örüntü treninin tüm vagonlarını başarıyla doldurdun!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler! Sihirli örüntü trenini başarıyla yola çıkardın!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.PatternGame = PatternGame;
