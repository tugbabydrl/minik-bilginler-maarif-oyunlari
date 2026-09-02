// ============================================================
// Oyun 8: Tangram - Renkli Parça Yerleştirme (3-6 Yaş)
// Büyük renkli şekilleri hedef siluete tıklayarak yerleştir.
// Sürükle-bırak yerine tıkla-seç-yerleştir (dokunmatik uyumlu).
// ============================================================

class TangramGame {
    constructor(container, onComplete, onProgress) {
        this.container = container;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.currentAge = '3-4';
        this.levelIdx = 0;
        this.selectedPiece = null;
    }

    start(ageLevel = '3-4') {
        this.currentAge = ageLevel;
        this.levelIdx = 0;
        this.selectedPiece = null;
        this.renderLevel();
    }

    getLevels() {
        return {
            '3-4': [
                {
                    name: 'Ev 🏠',
                    targetEmoji: '🏠',
                    slots: [
                        { id: 'roof',  label: 'Çatı',    shape: '🔺', color: '#FF6B6B', hint: 'Üçgen çatı' },
                        { id: 'wall',  label: 'Duvar',   shape: '🟥', color: '#FF9F45', hint: 'Kare duvar' },
                        { id: 'door',  label: 'Kapı',    shape: '🚪', color: '#6BCB77', hint: 'Dikdörtgen kapı' },
                    ],
                    pieces: [
                        { id: 'p1', shape: '🔺', color: '#FF6B6B', name: 'Kırmızı Üçgen', matchSlot: 'roof' },
                        { id: 'p2', shape: '🟧', color: '#FF9F45', name: 'Turuncu Kare', matchSlot: 'wall' },
                        { id: 'p3', shape: '🟩', color: '#6BCB77', name: 'Yeşil Dikdörtgen', matchSlot: 'door' },
                    ],
                    instruction: 'Ev yapalım! Kırmızı üçgeni çatıya, turuncu kareyi duvara, yeşil dikdörtgeni kapıya yerleştir!',
                },
                {
                    name: 'Balık 🐟',
                    targetEmoji: '🐟',
                    slots: [
                        { id: 'body',  label: 'Gövde',  shape: '🔵', color: '#4D96FF', hint: 'Büyük mavi daire' },
                        { id: 'tail',  label: 'Kuyruk', shape: '🔺', color: '#2EC4B6', hint: 'Küçük üçgen' },
                    ],
                    pieces: [
                        { id: 'p1', shape: '🔵', color: '#4D96FF', name: 'Mavi Daire', matchSlot: 'body' },
                        { id: 'p2', shape: '🔺', color: '#2EC4B6', name: 'Turkuaz Üçgen', matchSlot: 'tail' },
                        { id: 'p3', shape: '🟨', color: '#FFD93D', name: 'Sarı Kare (Yanlış)', matchSlot: null },
                    ],
                    instruction: 'Balık yapalım! Mavi daireyi gövdeye, turkuaz üçgeni kuyruğa koy!',
                },
            ],
            '4-5': [
                {
                    name: 'Köpek 🐕',
                    targetEmoji: '🐕',
                    slots: [
                        { id: 'head',  label: 'Baş',   shape: '⬛', color: '#FF9F45', hint: 'Kare baş' },
                        { id: 'body',  label: 'Gövde', shape: '🔶', color: '#FF6B6B', hint: 'Büyük vücut' },
                        { id: 'ear',   label: 'Kulak', shape: '🔺', color: '#6BCB77', hint: 'Üçgen kulak' },
                        { id: 'tail',  label: 'Kuyruk',shape: '▬',  color: '#4D96FF', hint: 'Çubuk kuyruk' },
                    ],
                    pieces: [
                        { id: 'p1', shape: '🟧', color: '#FF9F45', name: 'Turuncu Kare', matchSlot: 'head' },
                        { id: 'p2', shape: '🔶', color: '#FF6B6B', name: 'Kırmızı Elmas', matchSlot: 'body' },
                        { id: 'p3', shape: '🔺', color: '#6BCB77', name: 'Yeşil Üçgen', matchSlot: 'ear' },
                        { id: 'p4', shape: '🟦', color: '#4D96FF', name: 'Mavi Çubuk', matchSlot: 'tail' },
                    ],
                    instruction: 'Sevimli köpek yapalım! Her parçayı doğru yerine yerleştir!',
                },
                {
                    name: 'Gemi ⛵',
                    targetEmoji: '⛵',
                    slots: [
                        { id: 'sail',  label: 'Yelken', shape: '🔺', color: '#FFFFFF', hint: 'Beyaz üçgen yelken' },
                        { id: 'hull',  label: 'Tekne',  shape: '🟥', color: '#FF6B6B', hint: 'Kırmızı gemi gövdesi' },
                        { id: 'flag',  label: 'Bayrak', shape: '🔶', color: '#FFD93D', hint: 'Sarı bayrak' },
                    ],
                    pieces: [
                        { id: 'p1', shape: '🔺', color: '#E2E8F0', name: 'Beyaz Üçgen', matchSlot: 'sail' },
                        { id: 'p2', shape: '🟥', color: '#FF6B6B', name: 'Kırmızı Dikdörtgen', matchSlot: 'hull' },
                        { id: 'p3', shape: '🟨', color: '#FFD93D', name: 'Sarı Elmas', matchSlot: 'flag' },
                    ],
                    instruction: 'Gemi yapalım! Yelken, gövde ve bayrağı doğru yere yerleştir!',
                },
            ],
            '5-6': [
                {
                    name: 'Roket 🚀',
                    targetEmoji: '🚀',
                    slots: [
                        { id: 'nose',  label: 'Burun', shape: '🔺', color: '#FF6B6B', hint: 'Sivri burun' },
                        { id: 'body',  label: 'Gövde', shape: '🟥', color: '#C7D2FE', hint: 'Silindir gövde' },
                        { id: 'wing1', label: 'Sol Kanat', shape: '◁', color: '#6BCB77', hint: 'Sol kanat' },
                        { id: 'wing2', label: 'Sağ Kanat', shape: '▷', color: '#FF9F45', hint: 'Sağ kanat' },
                        { id: 'flame', label: 'Alev',   shape: '🔻', color: '#FFD93D', hint: 'Sarı alev' },
                    ],
                    pieces: [
                        { id: 'p1', shape: '🔺', color: '#FF6B6B', name: 'Kırmızı Burun', matchSlot: 'nose' },
                        { id: 'p2', shape: '🟦', color: '#C7D2FE', name: 'Mavi Gövde', matchSlot: 'body' },
                        { id: 'p3', shape: '🟩', color: '#6BCB77', name: 'Yeşil Sol Kanat', matchSlot: 'wing1' },
                        { id: 'p4', shape: '🟧', color: '#FF9F45', name: 'Turuncu Sağ Kanat', matchSlot: 'wing2' },
                        { id: 'p5', shape: '🔻', color: '#FFD93D', name: 'Sarı Alev', matchSlot: 'flame' },
                    ],
                    instruction: 'Uzay roketi yapalım! Burun, gövde, kanatlar ve alevi doğru yerlerine yerleştir!',
                },
                {
                    name: 'Çiçek 🌸',
                    targetEmoji: '🌸',
                    slots: [
                        { id: 'center', label: 'Merkez', shape: '🔵', color: '#FFD93D', hint: 'Sarı merkez' },
                        { id: 'petal1', label: 'Üst Yaprak', shape: '◯', color: '#FF70A6', hint: 'Pembe yaprak' },
                        { id: 'petal2', label: 'Sağ Yaprak', shape: '◯', color: '#FF70A6', hint: 'Pembe yaprak' },
                        { id: 'petal3', label: 'Alt Yaprak', shape: '◯', color: '#9B51E0', hint: 'Mor yaprak' },
                        { id: 'stem',   label: 'Sap',    shape: '|',  color: '#6BCB77', hint: 'Yeşil sap' },
                    ],
                    pieces: [
                        { id: 'p1', shape: '🟡', color: '#FFD93D', name: 'Sarı Merkez', matchSlot: 'center' },
                        { id: 'p2', shape: '🩷', color: '#FF70A6', name: 'Pembe Yaprak 1', matchSlot: 'petal1' },
                        { id: 'p3', shape: '🩷', color: '#FF70A6', name: 'Pembe Yaprak 2', matchSlot: 'petal2' },
                        { id: 'p4', shape: '🟣', color: '#9B51E0', name: 'Mor Yaprak', matchSlot: 'petal3' },
                        { id: 'p5', shape: '🟩', color: '#6BCB77', name: 'Yeşil Sap', matchSlot: 'stem' },
                    ],
                    instruction: 'Güzel bir çiçek yapalım! Sarı merkezi, renkli yaprakları ve yeşil sapı yerleştir!',
                },
            ],
        };
    }

    renderLevel() {
        const allLevels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];
        if (this.levelIdx >= allLevels.length) {
            this.finishGame();
            return;
        }

        this.currentLevel = JSON.parse(JSON.stringify(allLevels[this.levelIdx]));
        // Hangi slotlar dolu?
        this.filledSlots = {};
        this.currentLevel.slots.forEach(s => { this.filledSlots[s.id] = false; });
        this.selectedPiece = null;

        this.renderBoard();
    }

    renderBoard() {
        const lv = this.currentLevel;
        const allLevels = this.getLevels()[this.currentAge] || this.getLevels()['3-4'];

        const slotsHtml = lv.slots.map(slot => `
            <div class="tangram-slot ${this.filledSlots[slot.id] ? 'slot-filled' : ''}"
                 data-slot="${slot.id}"
                 style="border-color:${slot.color}; background:${this.filledSlots[slot.id] ? slot.color + '30' : 'transparent'};">
                <div class="slot-shape-preview">${this.filledSlots[slot.id] ? '✅' : slot.shape}</div>
                <div class="slot-label" style="color:${slot.color};">${slot.label}</div>
                <div class="slot-hint">${slot.hint}</div>
            </div>
        `).join('');

        const piecesHtml = lv.pieces
            .filter(p => !Object.entries(this.filledSlots).some(([k,v]) => v === p.id))
            .map(p => `
                <button class="tangram-piece ${this.selectedPiece === p.id ? 'piece-selected' : ''}"
                        data-piece="${p.id}"
                        style="background:${p.color}20; border-color:${p.color};">
                    <span class="piece-emoji">${p.shape}</span>
                    <span class="piece-name" style="color:${p.color};">${p.name}</span>
                </button>
            `).join('');

        const allFilled = Object.values(this.filledSlots).every(v => v !== false);

        this.container.innerHTML = `
            <div class="game-play-area animate-pop">
                <div class="question-banner">
                    <button class="audio-replay-btn" id="repeatInstruction">🔊</button>
                    <h2 class="question-text">${lv.instruction}</h2>
                </div>

                <div class="tangram-board">
                    <div class="tangram-target-label">
                        <span>${lv.targetEmoji}</span>
                        <strong>${lv.name} Yapıyoruz!</strong>
                    </div>

                    <div class="tangram-slots-area">
                        ${slotsHtml}
                    </div>

                    <div class="tangram-instruction-text">
                        👆 Önce bir <strong>parça</strong> seç, sonra yerleştirmek istediğin <strong>yeri</strong> tıkla!
                    </div>

                    <div class="tangram-pieces-area">
                        <div class="pieces-title">🎨 Parçalar:</div>
                        <div class="tangram-pieces-row">${piecesHtml}</div>
                    </div>
                </div>

                <div class="game-footer-status">
                    <span class="step-indicator">Şekil ${this.levelIdx + 1} / ${allLevels.length}</span>
                </div>
            </div>
        `;

        window.soundManager.speak(lv.instruction);

        document.getElementById('repeatInstruction').addEventListener('click', () => {
            window.soundManager.speak(lv.instruction, true);
        });

        // Parça seçimi
        this.container.querySelectorAll('.tangram-piece').forEach(btn => {
            btn.addEventListener('click', () => {
                const pid = btn.getAttribute('data-piece');
                this.selectPiece(pid);
            });
        });

        // Slot tıklama
        this.container.querySelectorAll('.tangram-slot').forEach(sl => {
            sl.addEventListener('click', () => {
                const sid = sl.getAttribute('data-slot');
                this.tryPlace(sid);
            });
        });
    }

    selectPiece(pieceId) {
        this.selectedPiece = pieceId;
        window.soundManager.playPop();
        const piece = this.currentLevel.pieces.find(p => p.id === pieceId);
        if (piece) {
            window.soundManager.speak(`${piece.name} seçildi. Şimdi doğru yeri tıkla!`, true);
        }
        this.renderBoard();
    }

    tryPlace(slotId) {
        if (!this.selectedPiece) {
            window.soundManager.speak('Önce bir parça seç!', true);
            return;
        }
        if (this.filledSlots[slotId]) {
            window.soundManager.speak('Bu yer dolu, başka bir yer seç!', true);
            return;
        }

        const piece = this.currentLevel.pieces.find(p => p.id === this.selectedPiece);
        if (!piece) return;

        if (piece.matchSlot === slotId) {
            // Doğru!
            this.filledSlots[slotId] = piece.id;
            this.selectedPiece = null;
            window.soundManager.playSuccess();
            window.soundManager.speak('Harika! Tam yerine oturdu!', true);
            if (window.app) {
                window.app.addStar();
                window.app.triggerConfetti(20);
            }
            if (this.onProgress) this.onProgress('tangram', true);

            const allFilled = Object.values(this.filledSlots).every(v => v !== false);
            if (allFilled) {
                setTimeout(() => {
                    window.soundManager.playCelebration();
                    window.soundManager.speak(`${this.currentLevel.name} tamamlandı! Bravo!`, true);
                    if (window.app) window.app.triggerConfetti(50);
                    setTimeout(() => {
                        this.levelIdx++;
                        this.renderLevel();
                    }, 1800);
                }, 600);
            } else {
                this.renderBoard();
            }
        } else if (piece.matchSlot === null) {
            // Bu parça hiçbir yere ait değil
            window.soundManager.playTryAgain();
            window.soundManager.speak('Bu parça bu şekle ait değil, başka bir parça seç!', true);
            this.selectedPiece = null;
            this.renderBoard();
        } else {
            // Yanlış slot
            window.soundManager.playTryAgain();
            window.soundManager.speak('Bu parça buraya gitmiyor! Doğru yeri bul!', true);
        }
    }

    finishGame() {
        this.container.innerHTML = `
            <div class="game-complete-card animate-pop">
                <div class="trophy-icon">🧩✨</div>
                <h2>Tangram Ustası!</h2>
                <p>Tüm şekilleri mükemmel şekilde tamamladın!</p>
                <div class="earned-stars">⭐⭐⭐</div>
                <button class="btn-primary-large" id="btnContinue">Ana Ekrana Dön 🏠</button>
            </div>
        `;
        window.soundManager.playCelebration();
        window.soundManager.speak('Harika! Tüm tangram şekillerini tamamladın!');
        if (window.app) window.app.triggerConfetti(60);
        document.getElementById('btnContinue').addEventListener('click', () => {
            if (this.onComplete) this.onComplete();
        });
    }
}

window.TangramGame = TangramGame;
