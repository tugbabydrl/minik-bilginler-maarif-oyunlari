// ============================================================
// Oyun 13: Sevimli Hafıza Kartları (Kart Eşleme Oyunu)
// 3-6 Yaş Görsel Hafıza, Dikkat ve Çalışma Belleği Geliştirme
// ============================================================

class MemoryGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentAge = '3-4';
        this.levelIndex = 0;
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isLockBoard = false;
        this.moves = 0;
    }

    start(ageLevel = '3-4') {
        this.currentAge = ageLevel;
        this.levelIndex = 0;
        this.loadLevel();
    }

    getLevels() {
        return {
            '3-4': [
                {
                    instruction: 'Kartlara dokunarak aynı sevimli hayvanları eşleştir!',
                    pairs: [
                        { id: 'cat', emoji: '🐱', name: 'Kedi' },
                        { id: 'dog', emoji: '🐶', name: 'Köpek' }
                    ]
                },
                {
                    instruction: 'Hafızanı kullan! Aynı meyveleri bulup eşleştir!',
                    pairs: [
                        { id: 'apple', emoji: '🍎', name: 'Elma' },
                        { id: 'banana', emoji: '🍌', name: 'Muz' },
                        { id: 'strawberry', emoji: '🍓', name: 'Çilek' }
                    ]
                }
            ],
            '4-5': [
                {
                    instruction: 'Kartları çevir ve aynı sevimli hayvan çiftlerini bul!',
                    pairs: [
                        { id: 'lion', emoji: '🦁', name: 'Aslan' },
                        { id: 'rabbit', emoji: '🐰', name: 'Tavşan' },
                        { id: 'panda', emoji: '🐼', name: 'Panda' },
                        { id: 'bear', emoji: '🐻', name: 'Ayı' }
                    ]
                },
                {
                    instruction: 'Harika gidiyorsun! Taşıtları aklında tut ve eşlerini bul!',
                    pairs: [
                        { id: 'car', emoji: '🚗', name: 'Araba' },
                        { id: 'plane', emoji: '✈️', name: 'Uçak' },
                        { id: 'rocket', emoji: '🚀', name: 'Roket' },
                        { id: 'train', emoji: '🚂', name: 'Tren' },
                        { id: 'ship', emoji: '🚢', name: 'Gemi' }
                    ]
                }
            ],
            '5-6': [
                {
                    instruction: 'Dikkat ve hafıza testi! 6 çift sevimli canlıyı eşleştir!',
                    pairs: [
                        { id: 'dolphin', emoji: '🐬', name: 'Yunus' },
                        { id: 'elephant', emoji: '🐘', name: 'Fil' },
                        { id: 'giraffe', emoji: '🦒', name: 'Zürafa' },
                        { id: 'owl', emoji: '🦉', name: 'Baykuş' },
                        { id: 'bee', emoji: '🐝', name: 'Arı' },
                        { id: 'frog', emoji: '🐸', name: 'Kurbağa' }
                    ]
                },
                {
                    instruction: 'Süper hafıza görevi! Gökyüzü ve doğa kartlarını eşleştir!',
                    pairs: [
                        { id: 'sun', emoji: '☀️', name: 'Güneş' },
                        { id: 'moon', emoji: '🌙', name: 'Ay' },
                        { id: 'star', emoji: '⭐', name: 'Yıldız' },
                        { id: 'rainbow', emoji: '🌈', name: 'Gökkuşağı' },
                        { id: 'flower', emoji: '🌸', name: 'Çiçek' },
                        { id: 'tree', emoji: '🌲', name: 'Ağaç' }
                    ]
                }
            ]
        };
    }

    loadLevel() {
        const levels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];
        if (this.levelIndex >= levels.length) {
            this.finishGame();
            return;
        }

        this.currentLevel = levels[this.levelIndex];
        this.matchedPairs = 0;
        this.moves = 0;
        this.flippedCards = [];
        this.isLockBoard = false;

        // Kartları çiftleştir ve karıştır
        const rawList = [];
        this.currentLevel.pairs.forEach((pair, pairIdx) => {
            rawList.push({ ...pair, cardUid: `${pair.id}_1` });
            rawList.push({ ...pair, cardUid: `${pair.id}_2` });
        });

        // Fisher-Yates karıştırma algoritması
        for (let i = rawList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rawList[i], rawList[j]] = [rawList[j], rawList[i]];
        }

        this.cards = rawList;
        this.render();
    }

    render() {
        const lv = this.currentLevel;
        const levels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];
        const totalPairs = lv.pairs.length;
        const totalCards = this.cards.length;

        // Izgara sütun sayısı
        let gridCols = 2;
        if (totalCards >= 10) gridCols = 4;
        else if (totalCards >= 6) gridCols = 3;

        const cardsHtml = this.cards.map((card, idx) => `
            <div class="memory-card-wrap" data-idx="${idx}" data-id="${card.id}" data-name="${card.name}">
                <div class="memory-card-inner">
                    <div class="memory-card-front">
                        <span class="memory-card-back-icon">⭐</span>
                    </div>
                    <div class="memory-card-back">
                        <span class="memory-card-emoji">${card.emoji}</span>
                        <span class="memory-card-name">${card.name}</span>
                    </div>
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `
            <div class="game-play-area animate-pop">
                <div class="question-banner">
                    <button class="audio-replay-btn" id="repeatInstruction" title="Yönergeyi Tekrar Dinle">
                        🔊
                    </button>
                    <h2 class="question-text">${lv.instruction}</h2>
                </div>

                <div class="memory-board-container">
                    <div class="memory-header-badges">
                        <span class="memory-badge">🧩 Eşleşen: <strong id="matchedCount">${this.matchedPairs}</strong> / ${totalPairs}</span>
                        <span class="memory-badge">🔄 Hamle: <strong id="movesCount">${this.moves}</strong></span>
                    </div>

                    <div class="memory-grid" style="--mem-cols: ${gridCols};">
                        ${cardsHtml}
                    </div>
                </div>

                <div class="game-footer-status">
                    <span class="step-indicator">Bölüm ${this.levelIndex + 1} / ${levels.length}</span>
                </div>
            </div>
        `;

        window.soundManager.speak(lv.instruction);

        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(lv.instruction, true);
        });

        // Kart tıklama dinleyicileri
        this.container.querySelectorAll('.memory-card-wrap').forEach(cardEl => {
            cardEl.addEventListener('click', () => this.handleCardClick(cardEl));
        });
    }

    handleCardClick(cardEl) {
        if (this.isLockBoard) return;
        if (cardEl.classList.contains('is-flipped') || cardEl.classList.contains('is-matched')) return;

        cardEl.classList.add('is-flipped');
        window.soundManager.playPop();

        this.flippedCards.push(cardEl);

        if (this.flippedCards.length === 2) {
            this.moves++;
            const movesEl = document.getElementById('movesCount');
            if (movesEl) movesEl.textContent = this.moves;

            this.checkMatch();
        }
    }

    checkMatch() {
        this.isLockBoard = true;
        const [card1, card2] = this.flippedCards;
        const id1 = card1.getAttribute('data-id');
        const id2 = card2.getAttribute('data-id');
        const name1 = card1.getAttribute('data-name');

        if (id1 === id2) {
            // EŞLEŞTİ!
            setTimeout(() => {
                card1.classList.add('is-matched');
                card2.classList.add('is-matched');

                window.soundManager.playSuccess();
                window.soundManager.speak(`Harika! İki ${name1} eşleşti!`, true);

                if (window.app) {
                    window.app.addStar();
                    window.app.triggerConfetti(15);
                }

                this.matchedPairs++;
                const matchedEl = document.getElementById('matchedCount');
                if (matchedEl) matchedEl.textContent = this.matchedPairs;

                this.flippedCards = [];
                this.isLockBoard = false;

                // Bölüm tamamlandı mı?
                if (this.matchedPairs === this.currentLevel.pairs.length) {
                    this.handleLevelWin();
                }
            }, 500);
        } else {
            // EŞLEŞMEDİ - Geri çevir
            setTimeout(() => {
                window.soundManager.playTryAgain();
                card1.classList.remove('is-flipped');
                card2.classList.remove('is-flipped');

                this.flippedCards = [];
                this.isLockBoard = false;
            }, 950);
        }
    }

    handleLevelWin() {
        setTimeout(() => {
            window.soundManager.playCelebration();
            window.soundManager.speak('Tebrikler! Tüm hafıza kartlarını başarıyla eşleştirdin!', true);

            if (window.app) {
                window.app.triggerConfetti(50);
                window.app.addStar();
            }

            if (this.onProgress) {
                this.onProgress('memory', true);
            }

            setTimeout(() => {
                this.levelIndex++;
                this.loadLevel();
            }, 1800);
        }, 500);
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🧠✨🏆</div>
                <h2>Süper Hafıza Ustası!</h2>
                <p>Tüm hafıza kartı bulmacalarını başarıyla çözdün ve muhteşem bir hafızan olduğunu gösterdin!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Muhteşemsin! Hafıza kartı oyununu harika bir şekilde tamamladın!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.MemoryGame = MemoryGame;
