// ============================================================
// Oyun 9: Su Doku (Emoji Sudoku) - 4x4 Izgara (3-6 Yaş)
// Sayılar yerine sevimli emojiler kullanılarak 4x4 ızgarayı doldur.
// Her satır, sütun ve 2x2 kutu her emojiden bir tane içermeli.
// ============================================================

class SudokuGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentAge = '3-4';
        this.levelIdx = 0;
        this.selectedCell = null;
    }

    start(ageLevel = '3-4') {
        this.currentAge = ageLevel;
        this.levelIdx = 0;
        this.selectedCell = null;
        this.renderLevel();
    }

    getLevels() {
        // 4x4 emoji sudoku bulmacaları (null = boş, dolu hücreler sabit)
        return {
            '3-4': [
                {
                    emojis: ['🍎','🍌','🍇','🍊'],
                    emojiNames: ['Elma','Muz','Üzüm','Portakal'],
                    grid: [
                        ['🍎', '🍌', null, '🍊'],
                        [null, '🍇', '🍌', '🍎'],
                        ['🍌', null, '🍊', '🍇'],
                        ['🍊', '🍎', '🍇', null],
                    ],
                    solution: [
                        ['🍎','🍌','🍇','🍊'],
                        ['🍊','🍇','🍌','🍎'],
                        ['🍌','🍎','🍊','🍇'],
                        ['🍊','🍎','🍇','🍌'],
                    ],
                    fixed: [
                        [true,true,false,true],
                        [false,true,true,true],
                        [true,false,true,true],
                        [true,true,true,false],
                    ],
                    instruction: 'Her sıra ve sütunda bir tane elma, muz, üzüm ve portakal olmalı! Boş yerleri doldur!',
                },
                {
                    emojis: ['🐱','🐶','🐰','🐸'],
                    emojiNames: ['Kedi','Köpek','Tavşan','Kurbağa'],
                    grid: [
                        ['🐱', null, '🐰', '🐸'],
                        ['🐸', '🐰', null, '🐱'],
                        [null, '🐱', '🐸', '🐰'],
                        ['🐰', '🐸', '🐱', null],
                    ],
                    solution: [
                        ['🐱','🐶','🐰','🐸'],
                        ['🐸','🐰','🐶','🐱'],
                        ['🐶','🐱','🐸','🐰'],
                        ['🐰','🐸','🐱','🐶'],
                    ],
                    fixed: [
                        [true,false,true,true],
                        [true,true,false,true],
                        [false,true,true,true],
                        [true,true,true,false],
                    ],
                    instruction: 'Kedi, köpek, tavşan ve kurbağa her sırada ve sütunda birer kez bulunmalı!',
                },
            ],
            '4-5': [
                {
                    emojis: ['🌞','🌙','⭐','☁️'],
                    emojiNames: ['Güneş','Ay','Yıldız','Bulut'],
                    grid: [
                        [null, '🌙', '⭐', '☁️'],
                        ['⭐', null, '☁️', '🌞'],
                        ['🌙', '☁️', null, '⭐'],
                        ['☁️', '🌞', '🌙', null],
                    ],
                    solution: [
                        ['🌞','🌙','⭐','☁️'],
                        ['⭐','🌞','☁️','🌞'],
                        ['🌙','☁️','🌞','⭐'],
                        ['☁️','🌞','🌙','🌙'],
                    ],
                    fixed: [
                        [false,true,true,true],
                        [true,false,true,true],
                        [true,true,false,true],
                        [true,true,true,false],
                    ],
                    instruction: 'Gökyüzü bulmacası! Güneş, ay, yıldız ve bulut her sıra ve sütunda bir kez olmalı!',
                },
                {
                    emojis: ['🚗','🚕','🚌','🚲'],
                    emojiNames: ['Araba','Taksi','Otobüs','Bisiklet'],
                    grid: [
                        ['🚗', '🚕', null, '🚲'],
                        ['🚌', null, '🚕', '🚗'],
                        [null, '🚗', '🚲', '🚕'],
                        ['🚕', '🚲', '🚗', null],
                    ],
                    solution: [
                        ['🚗','🚕','🚌','🚲'],
                        ['🚌','🚲','🚕','🚗'],
                        ['🚲','🚗','🚲','🚕'],
                        ['🚕','🚌','🚗','🚌'],
                    ],
                    fixed: [
                        [true,true,false,true],
                        [true,false,true,true],
                        [false,true,true,true],
                        [true,true,true,false],
                    ],
                    instruction: 'Araç bulmacası! Araba, taksi, otobüs ve bisiklet her satır ve sütunda birer tane!',
                },
            ],
            '5-6': [
                {
                    emojis: ['🔴','🔵','🟡','🟢'],
                    emojiNames: ['Kırmızı','Mavi','Sarı','Yeşil'],
                    grid: [
                        ['🔴', null, '🟡', '🟢'],
                        ['🟡', '🟢', null, '🔴'],
                        [null, '🔴', '🟢', '🟡'],
                        ['🟢', '🟡', '🔴', null],
                    ],
                    solution: [
                        ['🔴','🔵','🟡','🟢'],
                        ['🟡','🟢','🔵','🔴'],
                        ['🔵','🔴','🟢','🟡'],
                        ['🟢','🟡','🔴','🔵'],
                    ],
                    fixed: [
                        [true,false,true,true],
                        [true,true,false,true],
                        [false,true,true,true],
                        [true,true,true,false],
                    ],
                    instruction: 'Renk bulmacası! Her satır ve sütunda kırmızı, mavi, sarı ve yeşil birer kez olmalı!',
                },
                {
                    emojis: ['🏠','🌲','⛰️','🌊'],
                    emojiNames: ['Ev','Ağaç','Dağ','Dalga'],
                    grid: [
                        ['🏠', '🌲', null, '🌊'],
                        [null, '⛰️', '🌲', '🏠'],
                        ['🌲', null, '🌊', '⛰️'],
                        ['🌊', '🏠', '⛰️', null],
                    ],
                    solution: [
                        ['🏠','🌲','⛰️','🌊'],
                        ['🌊','⛰️','🌲','🏠'],
                        ['🌲','🏠','🌊','⛰️'],
                        ['🌊','🏠','⛰️','🌲'],
                    ],
                    fixed: [
                        [true,true,false,true],
                        [false,true,true,true],
                        [true,false,true,true],
                        [true,true,true,false],
                    ],
                    instruction: 'Çevre bulmacası! Her satır ve sütunda ev, ağaç, dağ ve dalga birer kez bulunmalı!',
                },
            ],
        };
    }

    renderLevel() {
        const levels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];
        if (this.levelIdx >= levels.length) {
            this.finishGame();
            return;
        }

        this.currentLevel = JSON.parse(JSON.stringify(levels[this.levelIdx]));
        this.userGrid = this.currentLevel.grid.map(row => [...row]);
        this.selectedCell = null;
        this.renderBoard();
    }

    renderBoard() {
        const lv = this.currentLevel;
        const levels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];

        const gridHtml = this.userGrid.map((row, r) =>
            row.map((cell, c) => {
                const isFixed = lv.fixed[r][c];
                const isSelected = this.selectedCell && this.selectedCell[0] === r && this.selectedCell[1] === c;
                const isError = !isFixed && cell && cell !== lv.solution[r][c];
                return `
                    <div class="sudoku-cell
                        ${isFixed ? 'cell-fixed' : 'cell-empty'}
                        ${isSelected ? 'cell-selected' : ''}
                        ${isError ? 'cell-error' : ''}
                        ${!isFixed && !cell ? 'cell-blank' : ''}"
                         data-r="${r}" data-c="${c}">
                        ${cell || '?'}
                    </div>
                `;
            }).join('')
        ).join('');

        const emojiPadHtml = lv.emojis.map((em, i) => `
            <button class="sudoku-emoji-btn" data-emoji="${em}" title="${lv.emojiNames[i]}">
                <span>${em}</span>
                <span class="emoji-btn-name">${lv.emojiNames[i]}</span>
            </button>
        `).join('');

        this.container.innerHTML = `
            <div class="game-play-area animate-pop">
                <div class="question-banner">
                    <button class="audio-replay-btn" id="repeatInstruction">🔊</button>
                    <h2 class="question-text">${lv.instruction}</h2>
                </div>

                <div class="sudoku-board">
                    <div class="sudoku-grid-wrapper">
                        <div class="sudoku-grid">
                            ${gridHtml}
                        </div>
                    </div>

                    <div class="sudoku-emoji-pad">
                        <div class="pad-title">👇 Yerleştirmek istediğin emoji:</div>
                        <div class="emoji-pad-row">${emojiPadHtml}</div>
                    </div>

                    ${this.selectedCell
                        ? `<div class="sudoku-hint-text">Satır ${this.selectedCell[0]+1}, Sütun ${this.selectedCell[1]+1} seçildi. Şimdi yukarıdan emoji seç!</div>`
                        : `<div class="sudoku-hint-text">Önce boş (?) bir hücreye tıkla, sonra emoji seç!</div>`
                    }
                </div>

                <div class="game-footer-status">
                    <span class="step-indicator">Bulmaca ${this.levelIdx + 1} / ${levels.length}</span>
                    <button class="step-indicator" id="btnHint" style="cursor:pointer; background:#FFFBEB; border:2px solid #FCD34D; color:#92400E;">
                        💡 İpucu
                    </button>
                </div>
            </div>
        `;

        window.soundManager.speak(lv.instruction);

        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(lv.instruction, true);
        });

        document.getElementById('btnHint').addEventListener('click', () => this.giveHint());

        // Hücre tıklama
        this.container.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const r = parseInt(cell.getAttribute('data-r'), 10);
                const c = parseInt(cell.getAttribute('data-c'), 10);
                if (!lv.fixed[r][c]) {
                    this.selectedCell = [r, c];
                    window.soundManager.playPop();
                    const rowNames = ['birinci', 'ikinci', 'üçüncü', 'dördüncü'];
                    window.soundManager.speak(`${rowNames[r]} satır, ${rowNames[c]} sütun seçildi. Hangi emoji gelmeli?`, true);
                    this.renderBoard();
                }
            });
        });

        // Emoji pad tıklama
        this.container.querySelectorAll('.sudoku-emoji-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const em = btn.getAttribute('data-emoji');
                this.placeEmoji(em);
            });
        });
    }

    placeEmoji(emoji) {
        if (!this.selectedCell) {
            window.soundManager.speak('Önce boş bir hücre seç!', true);
            return;
        }

        const [r, c] = this.selectedCell;
        const lv = this.currentLevel;

        if (lv.fixed[r][c]) return;

        this.userGrid[r][c] = emoji;
        const isCorrect = emoji === lv.solution[r][c];

        if (isCorrect) {
            window.soundManager.playSuccess();
            window.soundManager.speak('Doğru! Harika düşündün!', true);
            if (window.app) {
                window.app.triggerConfetti(12);
                window.app.addStar();
            }
            if (this.onProgress) this.onProgress('sudoku', true);
        } else {
            window.soundManager.playTryAgain();
            window.soundManager.speak('Uymuyor! Tekrar düşün, doğrusu hangisi?', true);
        }

        this.selectedCell = null;

        // Bulmaca tamamlandı mı?
        const allCorrect = this.userGrid.every((row, rr) =>
            row.every((cell, cc) => cell === lv.solution[rr][cc])
        );

        if (allCorrect) {
            setTimeout(() => {
                window.soundManager.playCelebration();
                window.soundManager.speak('Süper! Bu bulmacayı çözdün!', true);
                if (window.app) window.app.triggerConfetti(55);
                setTimeout(() => {
                    this.levelIdx++;
                    this.renderLevel();
                }, 1800);
            }, 700);
        } else {
            this.renderBoard();
        }
    }

    giveHint() {
        // Boş veya yanlış olan ilk hücreyi bul ve doğru cevabı söyle
        const lv = this.currentLevel;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (!lv.fixed[r][c] && this.userGrid[r][c] !== lv.solution[r][c]) {
                    const ans = lv.solution[r][c];
                    const name = lv.emojiNames[lv.emojis.indexOf(ans)];
                    this.selectedCell = [r, c];
                    window.soundManager.speak(`İpucu: Bu boş yere ${name} gelmeli!`, true);
                    this.renderBoard();
                    return;
                }
            }
        }
        window.soundManager.speak('Neredeyse tamam! Devam et!', true);
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🧠🏆</div>
                <h2>Su Doku Dehası!</h2>
                <p>Tüm emoji sudoku bulmacalarını zekânla çözdün!</p>
                <div class="earned-stars">⭐⭐⭐</div>
                <button class="btn-primary-large" id="btnContinue">Ana Ekrana Dön 🏠</button>
            </div>
        `;
        window.soundManager.playCelebration();
        window.soundManager.speak('Tebrikler! Emoji Su Doku bulmacalarını başarıyla tamamladın!');
        if (window.app) window.app.triggerConfetti(60);
        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.SudokuGame = SudokuGame;
