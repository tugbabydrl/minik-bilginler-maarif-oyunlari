// Oyun 4: Doğa, Çevre & Sıfır Atık Kâşifi
class NatureGame {
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
        this.questions = window.MAARIF_DATA.nature.levels[ageLevel] || window.MAARIF_DATA.nature.levels['3-4'];
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

                ${q.wasteEmoji || q.animalEmoji ? `
                    <div class="nature-subject-stage">
                        <div class="nature-subject-badge animate-float">
                            <span class="subject-emoji">${q.wasteEmoji || q.animalEmoji}</span>
                            <span class="subject-name">${q.wasteName || q.animalName}</span>
                        </div>
                    </div>
                ` : ''}

                <div class="options-grid ${q.options.length > 2 ? 'grid-3' : 'grid-2'}">
                    ${q.options.map(opt => `
                        <button class="game-card-option nature-card-option" data-correct="${opt.isCorrect}" style="${opt.binColor ? `border-top: 8px solid ${opt.binColor};` : ''}">
                            <div class="option-visual">
                                <span class="option-emoji">${opt.emoji}</span>
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

        // Sesli Yönerge
        window.soundManager.speak(q.instruction);

        // Tekrar dinle
        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(q.instruction, true);
        });

        const cards = this.container.querySelectorAll('.nature-card-option');
        cards.forEach(card => {
            card.addEventListener('click', () => this.handleAnswer(card, cards));
        });
    }

    handleAnswer(card, allCards) {
        const isCorrect = card.getAttribute('data-correct') === 'true';
        allCards.forEach(c => c.disabled = true);

        if (isCorrect) {
            card.classList.add('correct-answer-card');
            window.soundManager.playSuccess();
            window.soundManager.speak('Aferin doğa dostu kâşif! Çevremizi koruyoruz!', true);

            if (window.app) {
                window.app.triggerConfetti();
                window.app.addStar();
            }

            if (this.onProgress) {
                this.onProgress('nature', true);
            }

            setTimeout(() => {
                this.currentIndex++;
                this.renderQuestion();
            }, 1800);
        } else {
            card.classList.add('wrong-answer-card');
            window.soundManager.playTryAgain();
            window.soundManager.speak('Bir daha düşünelim, doğa için en doğrusu hangisi?', true);

            setTimeout(() => {
                card.classList.remove('wrong-answer-card');
                allCards.forEach(c => c.disabled = false);
            }, 1200);
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🌱</div>
                <h2>Çevre Kahramanı!</h2>
                <p>Doğayı ve canlıları korumayı çok iyi biliyorsun!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Harika! Sen gerçek bir çevre ve doğa dostusun!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.NatureGame = NatureGame;
