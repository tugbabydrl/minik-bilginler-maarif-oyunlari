// Oyun 2: Sayı ve Sayma Ormanı
class CountingGame {
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
        this.questions = window.MAARIF_DATA.counting.levels[ageLevel] || window.MAARIF_DATA.counting.levels['3-4'];
        this.renderQuestion();
    }

    renderQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.finishGame();
            return;
        }

        const q = this.questions[this.currentIndex];
        
        // Ekranda sayılacak nesneleri üret
        const itemsHtml = Array.from({ length: q.count }).map((_, i) => `
            <div class="countable-item bounce-in" style="animation-delay: ${i * 0.1}s;" data-counted="false">
                <span class="count-emoji">${q.itemEmoji}</span>
                <span class="count-badge">${i + 1}</span>
            </div>
        `).join('');

        this.container.innerHTML = `
            <div class="game-play-area animate-pop">
                <div class="question-banner">
                    <button class="audio-replay-btn" id="repeatInstruction" title="Yönergeyi Tekrar Dinle">
                        🔊
                    </button>
                    <h2 class="question-text">${q.instruction}</h2>
                </div>

                <div class="counting-stage">
                    <div class="nature-tree-scene">
                        <div class="countable-items-container">
                            ${itemsHtml}
                        </div>
                    </div>
                    <div class="tap-hint-text">
                        💡 <em>İpucu: Meyvelere dokunarak tek tek sayabilirsin!</em>
                    </div>
                </div>

                <div class="number-options-row">
                    ${q.options.map(num => `
                        <button class="number-btn" data-number="${num}">
                            ${num}
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

        // Tekrar dinleme
        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(q.instruction, true);
        });

        // Nesnelere dokunulduğunda sayma sesi ve efekti
        const items = this.container.querySelectorAll('.countable-item');
        items.forEach((item, idx) => {
            item.addEventListener('click', () => {
                item.classList.add('item-tapped');
                window.soundManager.playPop();
                window.soundManager.speak(`${idx + 1}`);
            });
        });

        // Sayı butonları
        const numberButtons = this.container.querySelectorAll('.number-btn');
        numberButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleAnswer(btn, q.count, numberButtons));
        });
    }

    handleAnswer(button, correctCount, allButtons) {
        const selectedNumber = parseInt(button.getAttribute('data-number'), 10);
        allButtons.forEach(b => b.disabled = true);

        if (selectedNumber === correctCount) {
            button.classList.add('correct-answer-card');
            window.soundManager.playSuccess();
            window.soundManager.speak(`Aferin! Tam ${correctCount} tane var!`, true);

            if (window.app) {
                window.app.triggerConfetti();
                window.app.addStar();
            }

            if (this.onProgress) {
                this.onProgress('counting', true);
            }

            setTimeout(() => {
                this.currentIndex++;
                this.renderQuestion();
            }, 1800);
        } else {
            button.classList.add('wrong-answer-card');
            window.soundManager.playTryAgain();
            window.soundManager.speak('Tekrar sayalım mı? Hadi bir daha dene!', true);

            setTimeout(() => {
                button.classList.remove('wrong-answer-card');
                allButtons.forEach(b => b.disabled = false);
            }, 1200);
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🌟</div>
                <h2>Harika Saydın!</h2>
                <p>Sayı ve Sayma Ormanı'ndaki tüm sayıları doğru buldun!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler! Sayı ormanını başarıyla tamamladın!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.CountingGame = CountingGame;
