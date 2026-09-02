// Oyun 3: Zıt ve Mekânsal Kavramlar
class ConceptsGame {
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
        this.questions = window.MAARIF_DATA.concepts.levels[ageLevel] || window.MAARIF_DATA.concepts.levels['3-4'];
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

                <div class="concepts-comparison-grid">
                    ${q.options.map(opt => `
                        <button class="concept-card ${opt.size === 'big' ? 'concept-card-big' : ''} ${opt.size === 'small' ? 'concept-card-small' : ''}" data-correct="${opt.isCorrect}">
                            <div class="concept-emoji-box">
                                <span class="concept-emoji">${opt.emoji}</span>
                            </div>
                            <span class="concept-title">${opt.name || opt.text}</span>
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

        const cards = this.container.querySelectorAll('.concept-card');
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
            window.soundManager.speak('Süpersin! Doğru kavramı buldun!', true);

            if (window.app) {
                window.app.triggerConfetti();
                window.app.addStar();
            }

            if (this.onProgress) {
                this.onProgress('concepts', true);
            }

            setTimeout(() => {
                this.currentIndex++;
                this.renderQuestion();
            }, 1800);
        } else {
            card.classList.add('wrong-answer-card');
            window.soundManager.playTryAgain();
            window.soundManager.speak('Diğer seçeneğe bir daha bak bakalım!', true);

            setTimeout(() => {
                card.classList.remove('wrong-answer-card');
                allCards.forEach(c => c.disabled = false);
            }, 1200);
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🏆</div>
                <h2>Kavram Ustası!</h2>
                <p>Zıt ve mekânsal kavramları harika öğrendin!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler! Zıt ve mekân kavramları oyununu başarıyla bitirdin!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.ConceptsGame = ConceptsGame;
