// ============================================================
// Oyun 7: Mangala - Çukur Taş Oyunu (Okul Öncesi 3-6 Yaş)
// Kural: Çukurlardaki taşları topluca mevsimlere/renklere
// göre sınıflayarak öğrencinin strateji düşüncesini geliştir.
// ============================================================

class MangalaGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentAge = '3-4';
        this.level = 1;
        this.moves = 0;
        this.score = 0;
    }

    start(ageLevel = '3-4') {
        this.currentAge = ageLevel;
        this.level = 1;
        this.moves = 0;
        this.score = 0;
        this.loadLevel();
    }

    getLevels() {
        // Her seviye için: çukurlar ve içlerindeki taş renkleri
        const configs = {
            '3-4': [
                {
                    instruction: 'Kırmızı taşları kırmızı kaleye, mavi taşları mavi kaleye taşı!',
                    pits: [
                        ['🔴','🔴','🔵'],
                        ['🔵','🔴','🔵'],
                        ['🔴','🔵','🔴'],
                    ],
                    stores: { red: { label: '🏰 Kırmızı Kale', color: '#FF6B6B', count: 0, target: 5 },
                               blue: { label: '🏯 Mavi Kale', color: '#4D96FF', count: 0, target: 4 } },
                    colorMap: { '🔴': 'red', '🔵': 'blue' },
                },
                {
                    instruction: 'Sarı güneşleri sarı kaleye, yeşil yaprakları yeşil kaleye at!',
                    pits: [
                        ['🌞','🍃','🌞'],
                        ['🍃','🌞','🍃'],
                        ['🌞','🍃','🌞'],
                    ],
                    stores: { sun: { label: '🌟 Güneş Kalesi', color: '#FFD93D', count: 0, target: 5 },
                               leaf: { label: '🌲 Yaprak Kalesi', color: '#6BCB77', count: 0, target: 4 } },
                    colorMap: { '🌞': 'sun', '🍃': 'leaf' },
                },
            ],
            '4-5': [
                {
                    instruction: 'Meyveleri doğru sepetle eşleştir: Elmalar bir sepete, muzlar bir sepete!',
                    pits: [
                        ['🍎','🍌','🍎','🍌'],
                        ['🍌','🍎','🍌','🍎'],
                        ['🍎','🍌','🍎','🍌'],
                    ],
                    stores: { apple: { label: '🧺 Elma Sepeti', color: '#FF6B6B', count: 0, target: 6 },
                               banana: { label: '🧺 Muz Sepeti', color: '#FFD93D', count: 0, target: 6 } },
                    colorMap: { '🍎': 'apple', '🍌': 'banana' },
                },
                {
                    instruction: 'Deniz hayvanlarını denize, orman hayvanlarını ormana gönder!',
                    pits: [
                        ['🐠','🦁','🐠'],
                        ['🦁','🐠','🦁'],
                        ['🐠','🦁','🐠'],
                    ],
                    stores: { sea: { label: '🌊 Deniz', color: '#4D96FF', count: 0, target: 5 },
                               forest: { label: '🌲 Orman', color: '#6BCB77', count: 0, target: 4 } },
                    colorMap: { '🐠': 'sea', '🦁': 'forest' },
                },
            ],
            '5-6': [
                {
                    instruction: 'Uzay nesneleri uzaya, okyanus nesneleri okyanusa! Dikkatli düşün!',
                    pits: [
                        ['🚀','🐋','🌙','🐬'],
                        ['🌟','🦈','🛸','🐳'],
                        ['🪐','🐙','🚀','🌊'],
                    ],
                    stores: { space: { label: '🌌 Uzay', color: '#9B51E0', count: 0, target: 6 },
                               ocean: { label: '🌊 Okyanus', color: '#4D96FF', count: 0, target: 6 } },
                    colorMap: { '🚀': 'space','🌙': 'space','🌟': 'space','🛸': 'space','🪐': 'space',
                                '🐋': 'ocean','🐬': 'ocean','🦈': 'ocean','🐳': 'ocean','🐙': 'ocean','🌊': 'ocean' },
                },
                {
                    instruction: 'Gündüz öğeleri güneşe, gece öğeleri aya yolla!',
                    pits: [
                        ['☀️','🌙','🌸','⭐'],
                        ['🌤️','🦇','🌺','🌃'],
                        ['🌈','🔮','☀️','🌙'],
                    ],
                    stores: { day: { label: '☀️ Gündüz Kutusu', color: '#FFD93D', count: 0, target: 6 },
                               night: { label: '🌙 Gece Kutusu', color: '#312E81', count: 0, target: 6 } },
                    colorMap: { '☀️': 'day','🌸': 'day','🌤️': 'day','🌺': 'day','🌈': 'day',
                                '🌙': 'night','⭐': 'night','🦇': 'night','🌃': 'night','🔮': 'night' },
                },
            ],
        };
        return configs[this.currentAge] || configs['3-4'];
    }

    loadLevel() {
        const levels = this.getLevels();
        if (this.level > levels.length) {
            this.finishGame();
            return;
        }

        this.currentConfig = JSON.parse(JSON.stringify(levels[this.level - 1]));
        this.pits = this.currentConfig.pits;
        this.stores = this.currentConfig.stores;
        this.colorMap = this.currentConfig.colorMap;
        this.selectedPit = null;
        this.selectedStone = null;
        this.render();
    }

    render() {
        const cfg = this.currentConfig;
        const storeKeys = Object.keys(this.stores);

        const pitsHtml = this.pits.map((pit, pitIdx) => `
            <div class="mangala-pit ${pit.length === 0 ? 'pit-empty' : ''}" data-pit="${pitIdx}">
                <div class="pit-bowl">
                    ${pit.map((stone, sIdx) => `
                        <span class="mangala-stone" data-pit="${pitIdx}" data-stone="${sIdx}">${stone}</span>
                    `).join('')}
                </div>
                <div class="pit-count">${pit.length} taş</div>
            </div>
        `).join('');

        const storesHtml = storeKeys.map(key => {
            const st = this.stores[key];
            const pct = Math.min(100, Math.round((st.count / st.target) * 100));
            return `
                <div class="mangala-store" data-store="${key}" style="border-color: ${st.color};">
                    <div class="store-label" style="color: ${st.color};">${st.label}</div>
                    <div class="store-count" style="color: ${st.color};">${st.count} / ${st.target}</div>
                    <div class="store-progress-bg">
                        <div class="store-progress-fill" style="width:${pct}%; background:${st.color};"></div>
                    </div>
                    <div class="store-stones">
                        ${Array.from({length: st.count}).map(() => `<span class="deposited-stone">✨</span>`).join('')}
                    </div>
                </div>
            `;
        }).join('');

        this.container.innerHTML = `
            <div class="game-play-area animate-pop">
                <div class="question-banner">
                    <button class="audio-replay-btn" id="repeatInstruction">🔊</button>
                    <h2 class="question-text">${cfg.instruction}</h2>
                </div>

                <div class="mangala-board">
                    <div class="mangala-section-title">🪨 Taş Çukurları — Bir çukura tıkla, sonra doğru kaleye taşı!</div>
                    <div class="mangala-pits-row">${pitsHtml}</div>
                    <div class="mangala-stores-row">${storesHtml}</div>
                </div>

                <div class="game-footer-status">
                    <span class="step-indicator">Bölüm ${this.level} / ${this.getLevels().length}</span>
                    <span class="step-indicator">Hamle: ${this.moves}</span>
                </div>
            </div>
        `;

        window.soundManager.speak(cfg.instruction);

        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(cfg.instruction, true);
        });

        // Çukur tıklama
        this.container.querySelectorAll('.mangala-pit').forEach(pitEl => {
            pitEl.addEventListener('click', () => {
                const pitIdx = parseInt(pitEl.getAttribute('data-pit'), 10);
                this.selectPit(pitIdx, pitEl);
            });
        });

        // Kale tıklama
        this.container.querySelectorAll('.mangala-store').forEach(storeEl => {
            storeEl.addEventListener('click', () => {
                const storeKey = storeEl.getAttribute('data-store');
                this.moveToStore(storeKey, storeEl);
            });
        });
    }

    selectPit(pitIdx, pitEl) {
        if (this.pits[pitIdx].length === 0) {
            window.soundManager.playTryAgain();
            window.soundManager.speak('Bu çukur boş, başka bir çukur seç!', true);
            return;
        }

        // Önceki seçimi temizle
        this.container.querySelectorAll('.mangala-pit').forEach(p => p.classList.remove('pit-selected'));

        this.selectedPit = pitIdx;
        pitEl.classList.add('pit-selected');
        window.soundManager.playPop();

        const firstStone = this.pits[pitIdx][0];
        const storeKey = this.colorMap[firstStone];
        if (storeKey) {
            window.soundManager.speak(`Seçildi! Şimdi ${this.stores[storeKey].label} kalesine dokun!`, true);
        }
    }

    moveToStore(storeKey, storeEl) {
        if (this.selectedPit === null) {
            window.soundManager.speak('Önce bir çukur seçmelisin!', true);
            return;
        }

        const pit = this.pits[this.selectedPit];
        if (pit.length === 0) {
            window.soundManager.speak('Bu çukur boş!', true);
            return;
        }

        // Her taşın doğru kaleye gittiğini kontrol et
        const wrongStones = pit.filter(stone => this.colorMap[stone] !== storeKey);
        const correctStones = pit.filter(stone => this.colorMap[stone] === storeKey);

        if (wrongStones.length > 0 && correctStones.length === 0) {
            // Tamamen yanlış kale
            const correctKey = this.colorMap[pit[0]];
            const correctLabel = this.stores[correctKey]?.label || '';
            window.soundManager.playTryAgain();
            window.soundManager.speak(`Hayır! Bu taşlar ${correctLabel} kalesine gitmeli!`, true);
            storeEl.classList.add('store-shake');
            setTimeout(() => storeEl.classList.remove('store-shake'), 700);
            return;
        }

        // Doğru taşları kaleye taşı
        this.moves++;
        const moved = correctStones.length;
        this.stores[storeKey].count += moved;
        this.pits[this.selectedPit] = wrongStones; // Yanlış olanları bırak
        this.selectedPit = null;

        if (window.app) window.app.addStar();
        window.soundManager.playSuccess();
        window.soundManager.speak(`Aferin! ${moved} taş kaleye gitti!`, true);
        if (window.app) window.app.triggerConfetti(18);

        if (this.onProgress) this.onProgress('mangala', true);

        // Bölüm tamamlandı mı?
        const allDone = Object.keys(this.stores).every(k => this.stores[k].count >= this.stores[k].target);
        const allPitsEmpty = this.pits.every(p => p.length === 0);

        if (allDone || allPitsEmpty) {
            setTimeout(() => {
                this.level++;
                this.loadLevel();
            }, 1500);
        } else {
            this.render();
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🪨🏆</div>
                <h2>Mangala Ustası!</h2>
                <p>Tüm taşları doğru kalelere göndererek stratejik düşünceni kanıtladın!</p>
                <div class="earned-stars">⭐⭐⭐</div>
                <button class="btn-primary-large" id="btnContinue">Ana Ekrana Dön 🏠</button>
            </div>
        `;
        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler! Mangala oyununu başarıyla tamamladın!');
        if (window.app) window.app.triggerConfetti(60);
        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.MangalaGame = MangalaGame;
