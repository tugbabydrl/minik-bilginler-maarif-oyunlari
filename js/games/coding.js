// ============================================================
// Oyun 12: Robot Roli ile Erken Kodlama (Algoritmik Düşünme)
// 3-6 Yaş Okul Öncesi Blok Kodlama ve Sıralı Düşünme Oyunu
// ============================================================

class CodingGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentAge = '3-4';
        this.levelIndex = 0;
        this.commandQueue = []; // ['up', 'right', ...]
        this.isRunning = false;
        this.robotPos = { r: 0, c: 0 };
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
                    instruction: 'Robot Roli pilini şarj etmek istiyor! 2 adım İLERİ komutunu ekle ve Çalıştır butonuna bas!',
                    story: 'Roli 🤖 ➔ Pil 🔋',
                    gridSize: 4,
                    start: { r: 3, c: 1 },
                    target: { r: 1, c: 1 },
                    targetIcon: '🔋',
                    targetName: 'Şarj Pili',
                    obstacles: [],
                    maxCommands: 4
                },
                {
                    instruction: 'Robot Roli tamir anahtarına ulaşmak istiyor! Sağa doğru komutları ekle ve çalıştır!',
                    story: 'Roli 🤖 ➔ Anahtar 🔧',
                    gridSize: 4,
                    start: { r: 2, c: 0 },
                    target: { r: 2, c: 2 },
                    targetIcon: '🔧',
                    targetName: 'Tamir Anahtarı',
                    obstacles: [],
                    maxCommands: 4
                }
            ],
            '4-5': [
                {
                    instruction: 'Roli önce İLERİ, sonra SAĞA giderek parlak kristale ulaşsın!',
                    story: 'Roli 🤖 ➔ Kristal 💎',
                    gridSize: 4,
                    start: { r: 3, c: 0 },
                    target: { r: 1, c: 2 },
                    targetIcon: '💎',
                    targetName: 'Kristal',
                    obstacles: [{ r: 2, c: 0 }],
                    maxCommands: 6
                },
                {
                    instruction: 'Roli enerji küpüne ulaşmalı! Engellere çarpmadan kodları sırayla diz!',
                    story: 'Roli 🤖 ➔ Enerji Küpü ⚡',
                    gridSize: 4,
                    start: { r: 3, c: 3 },
                    target: { r: 1, c: 1 },
                    targetIcon: '⚡',
                    targetName: 'Enerji Küpü',
                    obstacles: [{ r: 2, c: 2 }],
                    maxCommands: 6
                }
            ],
            '5-6': [
                {
                    instruction: 'Geleceğin programcısı! Engellerin etrafından dolanarak roket parçasına ulaşacak bir algoritma kur!',
                    story: 'Roli 🤖 ➔ Roket Parçası 🚀',
                    gridSize: 5,
                    start: { r: 4, c: 0 },
                    target: { r: 0, c: 4 },
                    targetIcon: '🚀',
                    targetName: 'Roket Parçası',
                    obstacles: [{ r: 3, c: 0 }, { r: 2, c: 2 }, { r: 1, c: 3 }],
                    maxCommands: 8
                },
                {
                    instruction: 'Karmaşık görev! Roli altın çipi bulmalı. Adım adım düşün ve algoritmanı test et!',
                    story: 'Roli 🤖 ➔ Altın Çip 💽',
                    gridSize: 5,
                    start: { r: 0, c: 0 },
                    target: { r: 4, c: 4 },
                    targetIcon: '💽',
                    targetName: 'Altın Çip',
                    obstacles: [{ r: 1, c: 1 }, { r: 2, c: 2 }, { r: 3, c: 3 }],
                    maxCommands: 10
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
        this.commandQueue = [];
        this.isRunning = false;
        this.robotPos = { ...this.currentLevel.start };

        this.render();
    }

    render() {
        const lv = this.currentLevel;
        const levels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];
        const size = lv.gridSize;

        let cellsHtml = '';
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const isObstacle = lv.obstacles.some(ob => ob.r === r && ob.c === c);
                const isTarget = r === lv.target.r && c === lv.target.c;
                const isRobot = r === this.robotPos.r && c === this.robotPos.c;

                let cellContent = '';
                let cellClass = 'code-cell';

                if (isObstacle) {
                    cellClass += ' code-cell-obstacle';
                    cellContent = '🪨';
                } else if (isRobot) {
                    cellClass += ' code-cell-robot';
                    cellContent = '<span class="robot-avatar animate-pop">🤖</span>';
                } else if (isTarget) {
                    cellClass += ' code-cell-target';
                    cellContent = `<span class="target-item animate-float">${lv.targetIcon}</span>`;
                }

                cellsHtml += `
                    <div class="${cellClass}" data-r="${r}" data-c="${c}">
                        ${cellContent}
                    </div>
                `;
            }
        }

        const queueHtml = this.commandQueue.length === 0
            ? '<span class="queue-empty-text">Henüz komut eklenmedi. Aşağıdaki oklara dokun! 👇</span>'
            : this.commandQueue.map((cmd, idx) => `
                <div class="queue-item animate-pop" data-idx="${idx}" title="Silmek için dokun">
                    <span class="cmd-icon">${this.getCommandIcon(cmd)}</span>
                    <span class="cmd-delete-hint">✕</span>
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

                <div class="coding-main-layout">
                    <!-- Kodlama Izgarası -->
                    <div class="code-grid-wrapper" style="--code-cols: ${size};">
                        <div class="code-grid">
                            ${cellsHtml}
                        </div>
                    </div>

                    <!-- Algoritma Komut Dizisi (Kod Sırası) -->
                    <div class="code-queue-panel">
                        <div class="queue-header">
                            <span class="queue-title">📝 Algoritma Dizilimim (${this.commandQueue.length}/${lv.maxCommands}):</span>
                            ${this.commandQueue.length > 0 ? `
                                <button class="btn-clear-queue" id="btnClearQueue" title="Tüm komutları temizle">🗑️ Temizle</button>
                            ` : ''}
                        </div>
                        <div class="queue-items-container" id="queueItemsList">
                            ${queueHtml}
                        </div>
                    </div>

                    <!-- Komut Ekleme Butonları ve Çalıştır -->
                    <div class="code-control-panel">
                        <div class="code-add-buttons">
                            <button class="btn-cmd btn-cmd-up" data-cmd="up">
                                <span>⬆️</span>
                                <small>İleri</small>
                            </button>
                            <button class="btn-cmd btn-cmd-down" data-cmd="down">
                                <span>⬇️</span>
                                <small>Geri</small>
                            </button>
                            <button class="btn-cmd btn-cmd-left" data-cmd="left">
                                <span>⬅️</span>
                                <small>Sola</small>
                            </button>
                            <button class="btn-cmd btn-cmd-right" data-cmd="right">
                                <span>➡️</span>
                                <small>Sağa</small>
                            </button>
                        </div>

                        <div class="code-action-buttons">
                            <button class="btn-run-code ${this.commandQueue.length === 0 || this.isRunning ? 'btn-disabled' : ''}" id="btnRunCode">
                                🚀 Algoritmayı Çalıştır!
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

        // Dinleme
        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(lv.instruction, true);
        });

        // Komut Ekleme
        this.container.querySelectorAll('.btn-cmd').forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.isRunning) return;
                const cmd = btn.getAttribute('data-cmd');
                this.addCommand(cmd);
            });
        });

        // Komut Dizisinden Tek Tek Silme
        this.container.querySelectorAll('.queue-item').forEach(item => {
            item.addEventListener('click', () => {
                if (this.isRunning) return;
                const idx = parseInt(item.getAttribute('data-idx'), 10);
                this.removeCommand(idx);
            });
        });

        // Tümünü Temizle
        const btnClear = document.getElementById('btnClearQueue');
        if (btnClear) {
            btnClear.addEventListener('click', () => {
                if (this.isRunning) return;
                this.commandQueue = [];
                window.soundManager.playPop();
                this.render();
            });
        }

        // Çalıştır
        const btnRun = document.getElementById('btnRunCode');
        if (btnRun) {
            btnRun.addEventListener('click', () => {
                if (this.isRunning || this.commandQueue.length === 0) return;
                this.executeAlgorithm();
            });
        }
    }

    getCommandIcon(cmd) {
        switch (cmd) {
            case 'up': return '⬆️';
            case 'down': return '⬇️';
            case 'left': return '⬅️';
            case 'right': return '➡️';
            default: return '❓';
        }
    }

    addCommand(cmd) {
        const lv = this.currentLevel;
        if (this.commandQueue.length >= lv.maxCommands) {
            window.soundManager.playTryAgain();
            window.soundManager.speak('Komut kutusu doldu! Hadi çalıştıralım!', true);
            return;
        }

        this.commandQueue.push(cmd);
        window.soundManager.playPop();
        this.render();
    }

    removeCommand(idx) {
        this.commandQueue.splice(idx, 1);
        window.soundManager.playPop();
        this.render();
    }

    async executeAlgorithm() {
        this.isRunning = true;
        this.robotPos = { ...this.currentLevel.start };
        this.render();

        window.soundManager.speak('Bip bop! Algoritma çalışıyor!', true);

        const lv = this.currentLevel;
        const size = lv.gridSize;
        const queueEls = this.container.querySelectorAll('.queue-item');

        for (let i = 0; i < this.commandQueue.length; i++) {
            const cmd = this.commandQueue[i];

            // Aktif çalışan komutu vurgula
            if (queueEls[i]) {
                queueEls[i].classList.add('queue-active');
            }

            await this.sleep(700);

            let nr = this.robotPos.r;
            let nc = this.robotPos.c;

            if (cmd === 'up') nr--;
            else if (cmd === 'down') nr++;
            else if (cmd === 'left') nc--;
            else if (cmd === 'right') nc++;

            // Sınır kontrolü veya engel kontrolü
            const isOutOfBounds = nr < 0 || nr >= size || nc < 0 || nc >= size;
            const hitObstacle = !isOutOfBounds && lv.obstacles.some(ob => ob.r === nr && ob.c === nc);

            if (isOutOfBounds || hitObstacle) {
                window.soundManager.playTryAgain();
                if (queueEls[i]) queueEls[i].classList.add('queue-error');
                
                window.soundManager.speak('Bip bip! Bir engele çarptım! Hadi algoritmayı düzeltelim!', true);
                this.isRunning = false;
                await this.sleep(1400);
                this.robotPos = { ...this.currentLevel.start };
                this.render();
                return;
            }

            this.robotPos = { r: nr, c: nc };
            window.soundManager.playPop();
            this.updateGridVisual();

            if (queueEls[i]) {
                queueEls[i].classList.remove('queue-active');
                queueEls[i].classList.add('queue-done');
            }
        }

        // Tüm komutlar bittiğinde hedefe ulaşıldı mı?
        if (this.robotPos.r === lv.target.r && this.robotPos.c === lv.target.c) {
            window.soundManager.playCelebration();
            window.soundManager.speak(`Harikasın minik programcı! Algoritman çalıştı ve ${lv.targetName} hedefine ulaştın!`, true);

            if (window.app) {
                window.app.triggerConfetti(55);
                window.app.addStar();
            }

            if (this.onProgress) {
                this.onProgress('coding', true);
            }

            await this.sleep(2000);
            this.levelIndex++;
            this.loadLevel();
        } else {
            // Hedefe varamadı ama çarpmadı
            window.soundManager.playTryAgain();
            window.soundManager.speak('Bip bop! Hedefe henüz ulaşamadım. Birkaç komut daha ekleyelim!', true);
            this.isRunning = false;
            await this.sleep(1200);
            this.robotPos = { ...this.currentLevel.start };
            this.render();
        }
    }

    updateGridVisual() {
        const size = this.currentLevel.gridSize;
        const lv = this.currentLevel;

        this.container.querySelectorAll('.code-cell').forEach(cell => {
            const r = parseInt(cell.getAttribute('data-r'), 10);
            const c = parseInt(cell.getAttribute('data-c'), 10);

            const isObstacle = lv.obstacles.some(ob => ob.r === r && ob.c === c);
            const isTarget = r === lv.target.r && c === lv.target.c;
            const isRobot = r === this.robotPos.r && c === this.robotPos.c;

            cell.className = 'code-cell';
            if (isObstacle) {
                cell.classList.add('code-cell-obstacle');
                cell.innerHTML = '🪨';
            } else if (isRobot) {
                cell.classList.add('code-cell-robot');
                cell.innerHTML = '<span class="robot-avatar animate-pop">🤖</span>';
            } else if (isTarget) {
                cell.classList.add('code-cell-target');
                cell.innerHTML = `<span class="target-item animate-float">${lv.targetIcon}</span>`;
            } else {
                cell.innerHTML = '';
            }
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🤖💻🏆</div>
                <h2>Geleceğin Yazılımcısı!</h2>
                <p>Robot Roli için harika algoritmalar kurdun ve tüm görevleri kodladın!</p>
                <div class="earned-stars">
                    ⭐⭐⭐
                </div>
                <button class="btn-primary-large" id="btnContinue">
                    Ana Ekrana Dön 🏠
                </button>
            </div>
        `;

        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler minik mühendis! Algoritmik düşünme görevlerini başarıyla tamamladın!');

        if (window.app) {
            window.app.triggerConfetti(60);
        }

        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.CodingGame = CodingGame;
