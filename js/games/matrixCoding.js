// ============================================================
// Oyun 15: Kodlama Öğreniyorum (Matris & Şekil Kodlama)
// 3-6 Yaş Okul Öncesi Matris, Koordinat ve Uzamsal Kodlama Becerisi
// ============================================================

class MatrixCodingGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentAge = '3-4';
        this.levelIndex = 0;
        this.playerGrid = [];
        this.selectedShape = null; // Çoklu şekil modunda aktif şekil
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
                    title: 'Siyah Nokta Kodlama (Klasik Model)',
                    instruction: 'Soldaki kodlama tablosuna bak! Noktaları sağdaki tablonun aynı kutucuklarına dokunarak yerleştir!',
                    size: 3,
                    shapeName: 'Nokta',
                    activeShape: '⚫',
                    shapes: ['⚫'],
                    isMultiShape: false,
                    // Görseldeki 1. Matris
                    targetGrid: [
                        [null, null, '⚫'],
                        [null, '⚫', null],
                        [null, null, '⚫']
                    ]
                },
                {
                    title: 'Gökyüzü Yıldızları',
                    instruction: 'Yıldızların yerini incele! Sağdaki tabloda aynı kutucuklara dokunarak yıldızları kodla!',
                    size: 3,
                    shapeName: 'Yıldız',
                    activeShape: '⭐',
                    shapes: ['⭐'],
                    isMultiShape: false,
                    // Görseldeki 2. Matris varyantı
                    targetGrid: [
                        ['⭐', null, null],
                        [null, null, '⭐'],
                        [null, '⭐', null]
                    ]
                },
                {
                    title: 'Sevimli Kalpler',
                    instruction: 'Pembe kalplerin tablodaki yerlerini bul ve aynısını sağdaki kutulara yerleştir!',
                    size: 3,
                    shapeName: 'Kalp',
                    activeShape: '💖',
                    shapes: ['💖'],
                    isMultiShape: false,
                    // Görseldeki 3. Çapraz Matris varyantı
                    targetGrid: [
                        ['💖', null, null],
                        [null, '💖', null],
                        [null, null, '💖']
                    ]
                }
            ],
            '4-5': [
                {
                    title: 'Çapraz Nokta Algoritması',
                    instruction: 'Sol taraftaki çapraz noktaları incele! Sağdaki tablonun aynı kutularına yerleştir!',
                    size: 3,
                    shapeName: 'Nokta',
                    activeShape: '⚫',
                    shapes: ['⚫'],
                    isMultiShape: false,
                    targetGrid: [
                        ['⚫', null, null],
                        [null, '⚫', null],
                        [null, null, '⚫']
                    ]
                },
                {
                    title: 'Renkli Geometrik Şekiller',
                    instruction: 'Mavi kareler ve kırmızı daireler! Aşağıdan şekli seç ve doğru kutucuğa kodla!',
                    size: 3,
                    isMultiShape: true,
                    shapes: [
                        { icon: '🟦', label: 'Mavi Kare' },
                        { icon: '🔴', label: 'Kırmızı Daire' }
                    ],
                    targetGrid: [
                        ['🟦', null, '🔴'],
                        [null, '🟦', null],
                        ['🔴', null, '🟦']
                    ]
                },
                {
                    title: 'Doğa ve Çiçek Matrisi',
                    instruction: 'Dört yapraklı yoncaları ve renkli çiçekleri örnek modele göre kodla!',
                    size: 3,
                    isMultiShape: true,
                    shapes: [
                        { icon: '🍀', label: 'Yonca' },
                        { icon: '🌸', label: 'Çiçek' }
                    ],
                    targetGrid: [
                        [null, '🌸', null],
                        ['🍀', null, '🍀'],
                        [null, '🌸', null]
                    ]
                }
            ],
            '5-6': [
                {
                    title: 'İkili Şekil Koordinat Kodlama',
                    instruction: 'Sarı yıldız ve mavi üçgenlerin koordinatlarına dikkat et! Aynısını sağdaki tabloda oluştur!',
                    size: 3,
                    isMultiShape: true,
                    shapes: [
                        { icon: '⭐', label: 'Yıldız' },
                        { icon: '🔺', label: 'Üçgen' }
                    ],
                    targetGrid: [
                        ['⭐', null, '🔺'],
                        ['🔺', '⭐', null],
                        [null, '🔺', '⭐']
                    ]
                },
                {
                    title: 'Geniş Matris Elmas Kodlama (4x4)',
                    instruction: 'Büyük 4x4 kod tablosundaki parlak elmasların yerini bul ve sağdaki tablonu tamamla!',
                    size: 4,
                    shapeName: 'Elmas',
                    activeShape: '💎',
                    shapes: ['💎'],
                    isMultiShape: false,
                    targetGrid: [
                        ['💎', null, null, '💎'],
                        [null, '💎', '💎', null],
                        [null, '💎', '💎', null],
                        ['💎', null, null, '💎']
                    ]
                },
                {
                    title: 'Üçlü Geometri Matrisi (3x3)',
                    instruction: 'Kare, daire ve baklava dilimlerini doğru kutucuklara yerleştirerek algoritmayı tamamla!',
                    size: 3,
                    isMultiShape: true,
                    shapes: [
                        { icon: '🟩', label: 'Kare' },
                        { icon: '🟡', label: 'Daire' },
                        { icon: '🔷', label: 'Baklava' }
                    ],
                    targetGrid: [
                        ['🟩', '🟡', null],
                        [null, '🔷', '🟡'],
                        ['🟡', null, '🟩']
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

        // Oyuncu ızgarasını boş olarak başlat
        this.playerGrid = Array(size).fill(null).map(() => Array(size).fill(null));

        // Şekil seçimi
        if (this.currentLevel.isMultiShape) {
            this.selectedShape = this.currentLevel.shapes[0].icon;
        } else {
            this.selectedShape = this.currentLevel.activeShape;
        }

        this.render();
    }

    render() {
        const lv = this.currentLevel;
        const levels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];
        const size = lv.size;

        // Sol Matris (Örnek Kodlama Tablosu - Çalışma Kağıdındaki gibi)
        let sourceCellsHtml = '';
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const shape = lv.targetGrid[r][c];
                sourceCellsHtml += `
                    <div class="matrix-cell matrix-cell-source ${shape ? 'has-shape' : 'is-empty'}">
                        ${shape ? `<span class="matrix-shape-icon">${shape}</span>` : ''}
                    </div>
                `;
            }
        }

        // Sağ Matris (Oyuncunun Dolduracağı Tablo)
        let targetCellsHtml = '';
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const shape = this.playerGrid[r][c];
                targetCellsHtml += `
                    <button class="matrix-cell matrix-cell-target ${shape ? 'has-shape filled' : 'is-empty'}" data-r="${r}" data-c="${c}">
                        ${shape ? `<span class="matrix-shape-icon">${shape}</span>` : '<span class="cell-tap-plus">➕</span>'}
                    </button>
                `;
            }
        }

        // Çoklu şekil varsa seçim paleti göster
        let paletteHtml = '';
        if (lv.isMultiShape) {
            const shapeBtns = lv.shapes.map(item => `
                <button class="matrix-palette-btn ${this.selectedShape === item.icon ? 'active-shape' : ''}" data-shape="${item.icon}">
                    <span class="palette-shape-icon">${item.icon}</span>
                    <span class="palette-shape-label">${item.label}</span>
                </button>
            `).join('');

            paletteHtml = `
                <div class="matrix-palette-wrapper">
                    <span class="palette-info-label">🎨 Şekil Seç:</span>
                    <div class="matrix-palette-buttons">
                        ${shapeBtns}
                        <button class="matrix-palette-btn eraser-btn ${this.selectedShape === 'ERASER' ? 'active-shape' : ''}" data-shape="ERASER" title="Kutuyu Temizle">
                            <span class="palette-shape-icon">🧹</span>
                            <span class="palette-shape-label">Silgi</span>
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Tek şekil modu: Doğrudan dokunarak ekle / kaldır
            paletteHtml = `
                <div class="matrix-single-tool-hint">
                    <span class="active-single-badge">Şekil: <strong class="shape-badge-icon">${lv.activeShape}</strong> ${lv.shapeName}</span>
                    <small>Kutuya dokunarak ${lv.shapeName.toLowerCase()} koyabilir, tekrar dokunarak silebilirsin!</small>
                </div>
            `;
        }

        this.container.innerHTML = `
            <div class="game-play-area animate-pop">
                <!-- Yönerge & Sesli Tekrar -->
                <div class="question-banner">
                    <button class="audio-replay-btn" id="repeatInstruction" title="Yönergeyi Tekrar Dinle">
                        🔊
                    </button>
                    <h2 class="question-text">${lv.instruction}</h2>
                </div>

                <div class="matrix-coding-main">
                    
                    <!-- Başlık Banner (Çalışma Kağıdındaki Stil) -->
                    <div class="worksheet-title-banner">
                        <span class="worksheet-icon">📋</span>
                        <span class="worksheet-text">KODLAMA ÖĞRENİYORUM</span>
                        <span class="worksheet-level-badge">${lv.title}</span>
                    </div>

                    <!-- Çift Matris Alanı: Sol Kod -> Ok -> Sağ Kodlama -->
                    <div class="matrix-boards-row">
                        <!-- Sol: Kod Tablosu (Kaynak) -->
                        <div class="matrix-board-card source-card">
                            <div class="board-header">
                                <span class="badge-title">🎯 Örnek Kod</span>
                            </div>
                            <div class="matrix-grid-box" style="--grid-dim: ${size};">
                                ${sourceCellsHtml}
                            </div>
                        </div>

                        <!-- Ortadaki Kodlama Oku (Görseldeki Ok) -->
                        <div class="matrix-flow-arrow">
                            <span class="arrow-symbol">➔</span>
                            <span class="arrow-caption">Kodla</span>
                        </div>

                        <!-- Sağ: Oyuncunun Tablosu (Hedef) -->
                        <div class="matrix-board-card target-card">
                            <div class="board-header">
                                <span class="badge-title">✨ Senin Kodun</span>
                            </div>
                            <div class="matrix-grid-box interactive-grid" style="--grid-dim: ${size};">
                                ${targetCellsHtml}
                            </div>
                        </div>
                    </div>

                    <!-- Şekil Seçim Paleti / Tekil İpucu -->
                    ${paletteHtml}

                    <!-- Kontrol ve Temizleme Butonları -->
                    <div class="matrix-control-actions">
                        <button class="btn-clear-matrix" id="btnClearMatrix" title="Tablomu Sıfırla">
                            🔄 Temizle
                        </button>
                        <button class="btn-primary-large btn-verify-matrix" id="btnVerifyMatrix">
                            Kontrol Et & Gönder 🚀
                        </button>
                    </div>

                </div>

                <!-- Alt Durum / İlerleme -->
                <div class="game-footer-status">
                    <span class="step-indicator">Bölüm ${this.levelIndex + 1} / ${levels.length}</span>
                </div>
            </div>
        `;

        // Sesli okuma
        window.soundManager.speak(lv.instruction);

        // Olay Dinleyicileri
        this.bindEvents();
    }

    bindEvents() {
        const lv = this.currentLevel;

        // Tekrar dinle butonu
        const repeatBtn = document.getElementById('repeatInstruction');
        if (repeatBtn) {
            repeatBtn.addEventListener('click', () => {
                window.soundManager.speak(lv.instruction, true);
            });
        }

        // Çoklu şekil paleti tıklamaları
        if (lv.isMultiShape) {
            this.container.querySelectorAll('.matrix-palette-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const shape = btn.getAttribute('data-shape');
                    this.selectedShape = shape;
                    window.soundManager.playPop();

                    this.container.querySelectorAll('.matrix-palette-btn').forEach(b => b.classList.remove('active-shape'));
                    btn.classList.add('active-shape');
                });
            });
        }

        // Sağ tablodaki hücre tıklamaları
        this.container.querySelectorAll('.matrix-cell-target').forEach(cell => {
            cell.addEventListener('click', () => {
                const r = parseInt(cell.getAttribute('data-r'), 10);
                const c = parseInt(cell.getAttribute('data-c'), 10);

                if (lv.isMultiShape) {
                    if (this.selectedShape === 'ERASER') {
                        this.playerGrid[r][c] = null;
                    } else if (this.selectedShape) {
                        // Eğer zaten aynı şekil varsa dokununca kaldır (toggle), yoksa yeni şekli koy
                        if (this.playerGrid[r][c] === this.selectedShape) {
                            this.playerGrid[r][c] = null;
                        } else {
                            this.playerGrid[r][c] = this.selectedShape;
                        }
                    }
                } else {
                    // Tek şekil modu: Doğrudan toggle (var ise sil, yok ise koy)
                    if (this.playerGrid[r][c] === lv.activeShape) {
                        this.playerGrid[r][c] = null;
                    } else {
                        this.playerGrid[r][c] = lv.activeShape;
                    }
                }

                window.soundManager.playPop();
                this.render();

                // Eğer hedeflenen şekil sayısına ulaşıldıysa otomatik doğrulama yap
                if (this.isPatternComplete()) {
                    this.verifyMatrix(false);
                }
            });
        });

        // Temizle Butonu
        const clearBtn = document.getElementById('btnClearMatrix');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const size = lv.size;
                this.playerGrid = Array(size).fill(null).map(() => Array(size).fill(null));
                window.soundManager.playPop();
                this.render();
            });
        }

        // Kontrol Et Butonu
        const verifyBtn = document.getElementById('btnVerifyMatrix');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => {
                this.verifyMatrix(true);
            });
        }
    }

    // Tablonun hedef şekil sayısına ulaşıp ulaşmadığı
    isPatternComplete() {
        const size = this.currentLevel.size;
        let targetCount = 0;
        let playerCount = 0;

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (this.currentLevel.targetGrid[r][c]) targetCount++;
                if (this.playerGrid[r][c]) playerCount++;
            }
        }

        return targetCount > 0 && playerCount >= targetCount;
    }

    verifyMatrix(isManual = true) {
        const size = this.currentLevel.size;
        let isCorrect = true;
        let missingCount = 0;
        let wrongCount = 0;

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const targetVal = this.currentLevel.targetGrid[r][c];
                const playerVal = this.playerGrid[r][c];

                if (targetVal && !playerVal) {
                    missingCount++;
                    isCorrect = false;
                } else if (!targetVal && playerVal) {
                    wrongCount++;
                    isCorrect = false;
                } else if (targetVal && playerVal && targetVal !== playerVal) {
                    wrongCount++;
                    isCorrect = false;
                }
            }
        }

        if (isCorrect) {
            // BAŞARILI! Kodlama tablosu birebir doğru!
            window.soundManager.playSuccess();
            window.soundManager.speak('Tebrikler! Kodlama tablosunu kusursuz tamamladın!', true);

            if (window.app) {
                window.app.triggerConfetti(60);
                window.app.addStar();
            }

            if (this.onProgress) {
                this.onProgress('matrixCoding', true);
            }

            // Başarı ışıldaması
            const targetCard = this.container.querySelector('.target-card');
            if (targetCard) targetCard.classList.add('matrix-success-glow');

            setTimeout(() => {
                this.levelIndex++;
                this.loadLevel();
            }, 1900);

        } else if (isManual) {
            // Hata veya eksik bildirimi
            window.soundManager.playTryAgain();
            if (missingCount > 0 && wrongCount === 0) {
                window.soundManager.speak('Harika gidiyorsun! Ancak tablonda henüz eksik şekiller var, devam et!', true);
            } else {
                window.soundManager.speak('Bazı kutucuklar örnek koddan farklı görünüyor. Tekrar kontrol edelim!', true);
            }

            const targetCard = this.container.querySelector('.target-card');
            if (targetCard) {
                targetCard.classList.add('store-shake');
                setTimeout(() => targetCard.classList.remove('store-shake'), 600);
            }
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="complete-star-burst">🎉 🌟 🤖</div>
                <h2 class="complete-title">KODLAMA USTASI!</h2>
                <p class="complete-desc">
                    Tüm matris kodlama tablolarını başarıyla çözdün! Uzamsal zekan ve odaklanma becerin harika!
                </p>
                <div class="complete-actions">
                    <button class="btn-primary-large" id="btnReplayMatrix">
                        Tekrar Oyna 🔄
                    </button>
                    <button class="btn-secondary-large" id="btnBackToHub">
                        Ana Menüye Dön 🏠
                    </button>
                </div>
            </div>
        `;

        window.soundManager.playSuccess();
        window.soundManager.speak('Tebrikler! Kodlama ustası oldun! Tüm matris tablolarını başarıyla tamamladın!');

        if (window.app) {
            window.app.triggerConfetti(100);
        }

        document.getElementById('btnReplayMatrix').addEventListener('click', () => {
            this.start(this.currentAge);
        });

        document.getElementById('btnBackToHub').addEventListener('click', () => {
            if (this.onComplete) {
                this.onComplete();
            }
        });
    }
}
