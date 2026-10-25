// ============================================================
// Oyun 11: Labirent Kâşifi (3-6 Yaş Okul Öncesi)
// Uzamsal algı, yön kavramları ve hedef odaklı problem çözme
// ============================================================

class MazeGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentAge = '3-4';
        this.levelIndex = 0;
        this.playerPos = { r: 0, c: 0 };
        this.collectedStars = 0;
        this.boundKeyHandler = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
    }

    start(ageLevel = '3-4') {
        this.currentAge = ageLevel;
        this.levelIndex = 0;
        this.collectedStars = 0;
        this.loadLevel();
    }

    getLevels() {
        // 0: Yol, 1: Duvar, 2: Yıldız
        return {
            '3-4': [
                {
                    instruction: 'Tavşanı havuçlarına ulaştır! Yön oklarına basarak yolu takip et!',
                    character: '🐰',
                    target: '🥕',
                    targetName: 'Havuç',
                    grid: [
                        [0, 0, 1, 1, 1],
                        [1, 0, 0, 0, 1],
                        [1, 1, 1, 0, 1],
                        [1, 0, 0, 0, 1],
                        [1, 0, 1, 0, 0]
                    ],
                    start: { r: 0, c: 0 },
                    goal: { r: 4, c: 4 }
                },
                {
                    instruction: 'Yavru kediyi süt kasesine ulaştır!',
                    character: '🐱',
                    target: '🥛',
                    targetName: 'Süt Kasesi',
                    grid: [
                        [0, 0, 0, 1, 1],
                        [1, 1, 0, 1, 1],
                        [1, 0, 0, 0, 1],
                        [1, 0, 1, 0, 0],
                        [1, 0, 0, 1, 0]
                    ],
                    start: { r: 0, c: 0 },
                    goal: { r: 4, c: 4 }
                }
            ],
            '4-5': [
                {
                    instruction: 'Sevimli maymunu lezzetli muza götür! Yoldaki yıldızı da topla!',
                    character: '🐵',
                    target: '🍌',
                    targetName: 'Muz',
                    grid: [
                        [0, 0, 1, 1, 1, 1],
                        [1, 0, 0, 2, 0, 1],
                        [1, 1, 1, 1, 0, 1],
                        [1, 0, 0, 0, 0, 1],
                        [1, 0, 1, 1, 0, 1],
                        [1, 0, 0, 1, 0, 0]
                    ],
                    start: { r: 0, c: 0 },
                    goal: { r: 5, c: 5 }
                },
                {
                    instruction: 'Ayıcığı tatlı bala ulaştır! Yıldızı almayı unutma!',
                    character: '🐻',
                    target: '🍯',
                    targetName: 'Bal',
                    grid: [
                        [0, 0, 0, 1, 1, 1],
                        [1, 1, 0, 0, 0, 1],
                        [1, 0, 0, 1, 2, 1],
                        [1, 0, 1, 1, 0, 1],
                        [1, 0, 0, 0, 0, 1],
                        [1, 1, 1, 1, 0, 0]
                    ],
                    start: { r: 0, c: 0 },
                    goal: { r: 5, c: 5 }
                }
            ],
            '5-6': [
                {
                    instruction: 'Astronotu uzay roketine götür! Yıldızları toplayarak ilerle!',
                    character: '🧑‍🚀',
                    target: '🚀',
                    targetName: 'Uzay Roketi',
                    grid: [
                        [0, 0, 1, 1, 1, 1, 1],
                        [1, 0, 0, 2, 0, 0, 1],
                        [1, 1, 1, 1, 1, 0, 1],
                        [1, 0, 0, 0, 0, 0, 1],
                        [1, 0, 1, 1, 1, 1, 1],
                        [1, 2, 0, 0, 0, 0, 1],
                        [1, 1, 1, 1, 1, 0, 0]
                    ],
                    start: { r: 0, c: 0 },
                    goal: { r: 6, c: 6 }
                },
                {
                    instruction: 'Çalışkan arıyı renkli çiçeğe ulaştır!',
                    character: '🐝',
                    target: '🌸',
                    targetName: 'Çiçek',
                    grid: [
                        [0, 0, 0, 1, 1, 1, 1],
                        [1, 1, 0, 0, 0, 2, 1],
                        [1, 0, 0, 1, 1, 0, 1],
                        [1, 0, 1, 1, 0, 0, 1],
                        [1, 0, 0, 2, 0, 1, 1],
                        [1, 1, 1, 1, 0, 0, 1],
                        [1, 1, 1, 1, 1, 0, 0]
                    ],
                    start: { r: 0, c: 0 },
                    goal: { r: 6, c: 6 }
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

        this.currentLevel = JSON.parse(JSON.stringify(levels[this.levelIndex]));
        this.grid = this.currentLevel.grid;
        this.playerPos = { ...this.currentLevel.start };
        this.totalLevelStars = 0;
        
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                if (this.grid[r][c] === 2) this.totalLevelStars++;
            }
        }

        this.render();
        this.attachControls();
    }

    render() {
        const lv = this.currentLevel;
        const levels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];
        const rows = this.grid.length;
        const cols = this.grid[0].length;

        let cellsHtml = '';
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const isWall = this.grid[r][c] === 1;
                const isStar = this.grid[r][c] === 2;
                const isGoal = r === lv.goal.r && c === lv.goal.c;
                const isPlayer = r === this.playerPos.r && c === this.playerPos.c;

                let content = '';
                let cellClass = 'maze-cell';

                if (isWall) {
                    cellClass += ' maze-wall';
                    content = '<span class="maze-wall-icon">🌳</span>';
                } else {
                    cellClass += ' maze-path';
                    if (isPlayer) {
                        cellClass += ' maze-player-cell';
                        content = `<span class="maze-player animate-pop">${lv.character}</span>`;
                    } else if (isGoal) {
                        cellClass += ' maze-goal-cell';
                        content = `<span class="maze-goal animate-float">${lv.target}</span>`;
                    } else if (isStar) {
                        cellClass += ' maze-star-cell';
                        content = '<span class="maze-item-star">⭐</span>';
                    }
                }

                cellsHtml += `
                    <div class="${cellClass}" data-r="${r}" data-c="${c}">
                        ${content}
                    </div>
                `;
            }
        }

        this.container.innerHTML = `
            <div class="game-play-area animate-pop">
                <div class="question-banner">
                    <button class="audio-replay-btn" id="repeatInstruction" title="Yönergeyi Tekrar Dinle">
                        🔊
                    </button>
                    <h2 class="question-text">${lv.instruction}</h2>
                </div>

                <div class="maze-board-container">
                    <div class="maze-header-badges">
                        <span class="maze-badge">🎯 Hedef: <strong>${lv.targetName}</strong> ${lv.target}</span>
                        ${this.totalLevelStars > 0 ? `
                            <span class="maze-badge star-badge-mini">⭐ Toplanan: ${this.collectedStars} / ${this.totalLevelStars}</span>
                        ` : ''}
                    </div>

                    <div class="maze-grid-wrapper" id="mazeTouchArea" style="--maze-cols: ${cols};">
                        <div class="maze-grid">
                            ${cellsHtml}
                        </div>
                    </div>

                    <div class="maze-hint-text">
                        💡 <em>Ok butonlarına basarak veya gitmek istediğin komşu yola dokunarak ilerle!</em>
                    </div>

                    <!-- Yön Kontrol Butonları -->
                    <div class="maze-dpad">
                        <div class="dpad-row dpad-row-top">
                            <button class="dpad-btn btn-up" id="btnMoveUp" title="Yukarı">
                                ⬆️
                            </button>
                        </div>
                        <div class="dpad-row dpad-row-mid">
                            <button class="dpad-btn btn-left" id="btnMoveLeft" title="Sola">
                                ⬅️
                            </button>
                            <div class="dpad-center">🧭</div>
                            <button class="dpad-btn btn-right" id="btnMoveRight" title="Sağa">
                                ➡️
                            </button>
                        </div>
                        <div class="dpad-row dpad-row-bottom">
                            <button class="dpad-btn btn-down" id="btnMoveDown" title="Aşağı">
                                ⬇️
                            </button>
                        </div>
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

        // Buton dinleyicileri
        document.getElementById('btnMoveUp').addEventListener('click', () => this.tryMove(-1, 0, 'Yukarı'));
        document.getElementById('btnMoveDown').addEventListener('click', () => this.tryMove(1, 0, 'Aşağı'));
        document.getElementById('btnMoveLeft').addEventListener('click', () => this.tryMove(0, -1, 'Sola'));
        document.getElementById('btnMoveRight').addEventListener('click', () => this.tryMove(0, 1, 'Sağa'));

        // Komşu yola doğrudan tıklayarak adım atma
        this.container.querySelectorAll('.maze-path').forEach(cell => {
            cell.addEventListener('click', () => {
                const r = parseInt(cell.getAttribute('data-r'), 10);
                const c = parseInt(cell.getAttribute('data-c'), 10);
                const dr = r - this.playerPos.r;
                const dc = c - this.playerPos.c;

                // Sadece komşu ise git
                if ((Math.abs(dr) === 1 && dc === 0) || (Math.abs(dc) === 1 && dr === 0)) {
                    this.tryMove(dr, dc);
                }
            });
        });
    }

    attachControls() {
        if (this.boundKeyHandler) {
            window.removeEventListener('keydown', this.boundKeyHandler);
        }

        this.boundKeyHandler = (e) => {
            if (['ArrowUp', 'KeyW'].includes(e.code)) {
                e.preventDefault();
                this.tryMove(-1, 0, 'Yukarı');
            } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
                e.preventDefault();
                this.tryMove(1, 0, 'Aşağı');
            } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
                e.preventDefault();
                this.tryMove(0, -1, 'Sola');
            } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
                e.preventDefault();
                this.tryMove(0, 1, 'Sağa');
            }
        };

        window.addEventListener('keydown', this.boundKeyHandler);

        // Dokunmatik kaydırma (swipe)
        const touchArea = document.getElementById('mazeTouchArea');
        if (touchArea) {
            touchArea.addEventListener('touchstart', (e) => {
                const t = e.changedTouches[0];
                this.touchStartX = t.clientX;
                this.touchStartY = t.clientY;
            }, { passive: true });

            touchArea.addEventListener('touchend', (e) => {
                const t = e.changedTouches[0];
                const dx = t.clientX - this.touchStartX;
                const dy = t.clientY - this.touchStartY;
                const minSwipe = 30;

                if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > minSwipe) this.tryMove(0, 1, 'Sağa');
                    else if (dx < -minSwipe) this.tryMove(0, -1, 'Sola');
                } else {
                    if (dy > minSwipe) this.tryMove(1, 0, 'Aşağı');
                    else if (dy < -minSwipe) this.tryMove(-1, 0, 'Yukarı');
                }
            }, { passive: true });
        }
    }

    tryMove(dr, dc, dirName = '') {
        const nr = this.playerPos.r + dr;
        const nc = this.playerPos.c + dc;
        const rows = this.grid.length;
        const cols = this.grid[0].length;

        // Sınır kontrolü
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
            return;
        }

        // Duvar kontrolü
        if (this.grid[nr][nc] === 1) {
            window.soundManager.playTryAgain();
            return;
        }

        // Geçerli hareket
        this.playerPos = { r: nr, c: nc };
        window.soundManager.playPop();

        // Yıldız toplandı mı?
        if (this.grid[nr][nc] === 2) {
            this.grid[nr][nc] = 0;
            this.collectedStars++;
            window.soundManager.playStarEarned();
            if (window.app) {
                window.app.addStar();
                window.app.triggerConfetti(12);
            }
        }

        // Hedefe ulaşıldı mı?
        const lv = this.currentLevel;
        if (nr === lv.goal.r && nc === lv.goal.c) {
            this.render();
            this.handleLevelWin();
            return;
        }

        this.render();
    }

    handleLevelWin() {
        if (this.boundKeyHandler) {
            window.removeEventListener('keydown', this.boundKeyHandler);
            this.boundKeyHandler = null;
        }

        window.soundManager.playCelebration();
        window.soundManager.speak(`Harikasın! ${this.currentLevel.targetName} hedefine başarıyla ulaştın!`, true);

        if (window.app) {
            window.app.triggerConfetti(50);
            window.app.addStar();
        }

        if (this.onProgress) {
            this.onProgress('maze', true);
        }

        setTimeout(() => {
            this.levelIndex++;
            this.loadLevel();
        }, 1800);
    }

    finishGame() {
        if (this.boundKeyHandler) {
            window.removeEventListener('keydown', this.boundKeyHandler);
            this.boundKeyHandler = null;
        }

        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🗺️🏆</div>
                <h2>Labirent Şampiyonu!</h2>
                <p>Tüm labirentleri başarıyla tamamladın ve hedeflere ulaştın!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler minik kâşif! Labirentin tüm yollarını başarıyla keşfettin!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.MazeGame = MazeGame;
