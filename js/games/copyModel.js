// ============================================================
// Oyun 14: Aynısını Yap (Model Kopyalama & Görsel Algı)
// 3-6 Yaş Okul Öncesi Görsel-Uzamsal Algı ve Model Eşleme
// ============================================================

class CopyModelGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentAge = '3-4';
        this.levelIndex = 0;
        this.selectedTool = null; // Seçili renk veya emoji
        this.playerGrid = [];
        this.modelGrid = [];
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
                    title: 'Renkli Kareler (2x2)',
                    instruction: 'Soldaki renkli modelin aynısını sağdaki kutulara bakarak yap!',
                    size: 2,
                    palette: [
                        { id: 'red', label: 'Kırmızı', icon: '🔴', color: '#EF4444' },
                        { id: 'blue', label: 'Mavi', icon: '🔵', color: '#3B82F6' },
                        { id: 'yellow', label: 'Sarı', icon: '🟡', color: '#FBBF24' },
                        { id: 'green', label: 'Yeşil', icon: '🟢', color: '#10B981' }
                    ],
                    model: [
                        ['🔴', '🔵'],
                        ['🟡', '🟢']
                    ]
                },
                {
                    title: 'Sevimli Meyveler (2x2)',
                    instruction: 'Meyveleri örnek modele bakarak aynı yerlerine yerleştir!',
                    size: 2,
                    palette: [
                        { id: 'apple', label: 'Elma', icon: '🍎' },
                        { id: 'banana', label: 'Muz', icon: '🍌' },
                        { id: 'strawberry', label: 'Çilek', icon: '🍓' },
                        { id: 'grape', label: 'Üzüm', icon: '🍇' }
                    ],
                    model: [
                        ['🍎', '🍌'],
                        ['🍓', '🍇']
                    ]
                }
            ],
            '4-5': [
                {
                    title: 'Çiçek Bahçesi (3x3)',
                    instruction: 'Örnek bahçedeki çiçekleri incele ve aynısını sağdaki bahçene yap!',
                    size: 3,
                    palette: [
                        { id: 'flower', label: 'Çiçek', icon: '🌸' },
                        { id: 'sun', label: 'Güneş', icon: '☀️' },
                        { id: 'leaf', label: 'Yaprak', icon: '🍃' }
                    ],
                    model: [
                        ['🌸', '🍃', '🌸'],
                        ['🍃', '☀️', '🍃'],
                        ['🌸', '🍃', '🌸']
                    ]
                },
                {
                    title: 'Renkli Bayraklar (3x3)',
                    instruction: 'Renklerin sırasına dikkat et ve sağdaki tabloya aynısını oluştur!',
                    size: 3,
                    palette: [
                        { id: 'red', label: 'Kırmızı', icon: '🟥', color: '#EF4444' },
                        { id: 'yellow', label: 'Sarı', icon: '🟨', color: '#FBBF24' },
                        { id: 'blue', label: 'Mavi', icon: '🟦', color: '#3B82F6' }
                    ],
                    model: [
                        ['🟥', '🟨', '🟥'],
                        ['🟦', '🟦', '🟦'],
                        ['🟨', '🟥', '🟨']
                    ]
                }
            ],
            '5-6': [
                {
                    title: 'Sihirli Mozaik (3x3)',
                    instruction: 'Modeldeki geometrik şekil desenini incele ve aynısını kutulara yerleştir!',
                    size: 3,
                    palette: [
                        { id: 'heart', label: 'Kalp', icon: '💖' },
                        { id: 'star', label: 'Yıldız', icon: '⭐' },
                        { id: 'diamond', label: 'Elmas', icon: '🔷' },
                        { id: 'circle', label: 'Daire', icon: '🟢' }
                    ],
                    model: [
                        ['⭐', '💖', '⭐'],
                        ['🔷', '🟢', '🔷'],
                        ['⭐', '💖', '⭐']
                    ]
                },
                {
                    title: 'Minik Ev Deseni (4x4)',
                    instruction: 'Büyük kâşif görevi! 4x4 tablodaki modelin aynısını tamamla!',
                    size: 4,
                    palette: [
                        { id: 'red', label: 'Kırmızı Çatı', icon: '🔺' },
                        { id: 'yellow', label: 'Sarı Işık', icon: '🟨' },
                        { id: 'brown', label: 'Kahve Duvar', icon: '🟫' },
                        { id: 'blue', label: 'Mavi Gökyüzü', icon: '🟦' }
                    ],
                    model: [
                        ['🟦', '🔺', '🔺', '🟦'],
                        ['🔺', '🟨', '🟨', '🔺'],
                        ['🟫', '🟫', '🟫', '🟫'],
                        ['🟫', '🟨', '🟨', '🟫']
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
        const size = this.currentLevel.size;

        // Modeli kopyala
        this.modelGrid = this.currentLevel.model;

        // Oyuncu ızgarasını boş olarak başlat
        this.playerGrid = Array.from({ length: size }, () => Array(size).fill(null));

        // Varsayılan olarak paletin ilk elemanını seç
        this.selectedTool = this.currentLevel.palette[0].icon;

        this.render();
    }

    render() {
        const lv = this.currentLevel;
        const levels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];
        const size = lv.size;

        // Model ızgarası HTML'i (Sol taraf - sadece gösterim)
        let modelCellsHtml = '';
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const val = this.modelGrid[r][c];
                modelCellsHtml += `
                    <div class="copy-cell copy-cell-model">
                        <span class="cell-content-icon">${val}</span>
                    </div>
                `;
            }
        }

        // Oyuncu ızgarası HTML'i (Sağ taraf - tıklanabilir)
        let playerCellsHtml = '';
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const val = this.playerGrid[r][c];
                playerCellsHtml += `
                    <button class="copy-cell copy-cell-player ${val ? 'cell-filled' : 'cell-empty'}" data-r="${r}" data-c="${c}">
                        <span class="cell-content-icon">${val || '➕'}</span>
                    </button>
                `;
            }
        }

        // Palet HTML'i (Seçilebilir renkler/emojiler + Silgi)
        const paletteHtml = lv.palette.map(item => `
            <button class="copy-palette-btn ${this.selectedTool === item.icon ? 'palette-active' : ''}" data-tool="${item.icon}">
                <span class="palette-icon">${item.icon}</span>
                <span class="palette-name">${item.label}</span>
            </button>
        `).join('') + `
            <button class="copy-palette-btn copy-eraser-btn ${this.selectedTool === 'ERASER' ? 'palette-active' : ''}" data-tool="ERASER" title="Kutuyu Boşalt">
                <span class="palette-icon">🧹</span>
                <span class="palette-name">Silgi</span>
            </button>
        `;

        this.container.innerHTML = `
            <div class="game-play-area animate-pop">
                <div class="question-banner">
                    <button class="audio-replay-btn" id="repeatInstruction" title="Yönergeyi Tekrar Dinle">
                        🔊
                    </button>
                    <h2 class="question-text">${lv.instruction}</h2>
                </div>

                <div class="copy-model-container">
                    
                    <!-- Çift Panel: Sol = Model, Sağ = Senin Tablon -->
                    <div class="copy-boards-wrapper">
                        <!-- Sol: Örnek Model -->
                        <div class="copy-board-box model-box">
                            <div class="board-badge model-badge">
                                <span>🎯 Örnek Model</span>
                            </div>
                            <div class="copy-grid" style="--copy-cols: ${size};">
                                ${modelCellsHtml}
                            </div>
                        </div>

                        <!-- Ortadaki Ok Göstergesi -->
                        <div class="copy-indicator-arrow">
                            <span>👉</span>
                            <small>Aynısını Yap</small>
                        </div>

                        <!-- Sağ: Senin Tablon -->
                        <div class="copy-board-box player-box">
                            <div class="board-badge player-badge">
                                <span>✨ Senin Tablon</span>
                            </div>
                            <div class="copy-grid player-grid-interactive" style="--copy-cols: ${size};">
                                ${playerCellsHtml}
                            </div>
                        </div>
                    </div>

                    <!-- İpucu ve Yönerge -->
                    <div class="copy-hint-text">
                        👆 <em>Aşağıdan bir renk seç, ardından sağdaki kutulara dokunarak modelin aynısını yap!</em>
                    </div>

                    <!-- Seçim Paleti -->
                    <div class="copy-palette-area">
                        <div class="palette-title">🎨 Yerleştirmek İçin Seç:</div>
                        <div class="copy-palette-row">
                            ${paletteHtml}
                        </div>
                    </div>

                    <!-- Kontrol Et Butonu -->
                    <div class="copy-action-row">
                        <button class="btn-primary-large btn-check-model" id="btnCheckModel">
                            Kontrol Et & Tamamla 🚀
                        </button>
                    </div>

                </div>

                <div class="game-footer-status">
                    <span class="step-indicator">Bölüm ${this.levelIndex + 1} / ${levels.length}</span>
                </div>
            </div>
        `;

        // Sesli Yönerge
        window.soundManager.speak(lv.instruction);

        // Tekrar dinleme
        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(lv.instruction, true);
        });

        // Palet butonu seçimi
        this.container.querySelectorAll('.copy-palette-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tool = btn.getAttribute('data-tool');
                this.selectedTool = tool;
                window.soundManager.playPop();

                // Aktif butonu görsel olarak güncelle
                this.container.querySelectorAll('.copy-palette-btn').forEach(b => b.classList.remove('palette-active'));
                btn.classList.add('palette-active');
            });
        });

        // Sağdaki oyuncu ızgarası hücre tıklamaları
        this.container.querySelectorAll('.copy-cell-player').forEach(cell => {
            cell.addEventListener('click', () => {
                const r = parseInt(cell.getAttribute('data-r'), 10);
                const c = parseInt(cell.getAttribute('data-c'), 10);

                if (this.selectedTool === 'ERASER') {
                    this.playerGrid[r][c] = null;
                } else if (this.selectedTool) {
                    this.playerGrid[r][c] = this.selectedTool;
                }

                window.soundManager.playPop();
                this.render();

                // Eğer tüm kutular dolduysa otomatik kontrol yap
                if (this.isGridFull()) {
                    this.verifyModel(false);
                }
            });
        });

        // Kontrol Et butonu
        document.getElementById('btnCheckModel').addEventListener('click', () => {
            this.verifyModel(true);
        });
    }

    isGridFull() {
        const size = this.currentLevel.size;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (!this.playerGrid[r][c]) return false;
            }
        }
        return true;
    }

    verifyModel(isManual = true) {
        const size = this.currentLevel.size;
        let isAllMatch = true;
        let emptyCount = 0;

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (!this.playerGrid[r][c]) {
                    emptyCount++;
                    isAllMatch = false;
                } else if (this.playerGrid[r][c] !== this.modelGrid[r][c]) {
                    isAllMatch = false;
                }
            }
        }

        if (isAllMatch) {
            // BAŞARILI! Birebir aynı yapıldı!
            window.soundManager.playSuccess();
            window.soundManager.speak('Harikasın! Modelin aynısını birebir yaptın!', true);

            if (window.app) {
                window.app.triggerConfetti(50);
                window.app.addStar();
            }

            if (this.onProgress) {
                this.onProgress('copyModel', true);
            }

            // Sağ tabloya başarı animasyonu uygula
            const playerBox = this.container.querySelector('.player-box');
            if (playerBox) playerBox.classList.add('board-success-glow');

            setTimeout(() => {
                this.levelIndex++;
                this.loadLevel();
            }, 1900);
        } else {
            // Henüz uyuşmuyor veya boşluklar var
            if (isManual) {
                window.soundManager.playTryAgain();
                if (emptyCount > 0) {
                    window.soundManager.speak('Henüz tüm kutuları doldurmadın. Örnek modele bakarak devam et!', true);
                } else {
                    window.soundManager.speak('Bazı kutular örnek modelden farklı. Tekrar kontrol edelim!', true);
                }

                const playerBox = this.container.querySelector('.player-box');
                if (playerBox) {
                    playerBox.classList.add('store-shake');
                    setTimeout(() => playerBox.classList.remove('store-shake'), 600);
                }
            }
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🪞🎨🏆</div>
                <h2>Model Ustası!</h2>
                <p>Tüm modellerin aynısını kusursuz bir şekilde oluşturdun!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler minik sanatçı! Görsel model kopyalama görevlerini başarıyla tamamladın!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.CopyModelGame = CopyModelGame;
