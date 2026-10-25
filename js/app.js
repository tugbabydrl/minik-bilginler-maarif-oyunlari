// Ana Uygulama Yöneticisi: Maarif Dünyası
class MaarifApp {
    constructor() {
        this.currentAge = localStorage.getItem('maarif_age') || '3-4';
        this.stars = parseInt(localStorage.getItem('maarif_stars') || '0', 10);
        this.activeGame = null;
        this.timerId = null;

        this.initDOM();
        this.initEventListeners();
        this.initConfetti();
        this.updateStarCount();
        this.setupTimer(parseInt(localStorage.getItem('maarif_time_limit') || '15', 10));

        // İlk açılışta sevimli karşılama
        setTimeout(() => {
            if (!this.activeGame) {
                window.soundManager.speak('Merhaba minik kâşif! Maarif macera dünyasına hoş geldin! Oynamak istediğin eğlenceli oyunu seç!');
            }
        }, 800);
    }

    initDOM() {
        this.hubView = document.getElementById('hubView');
        this.gameView = document.getElementById('gameView');
        this.gameContainer = document.getElementById('gameContainer');
        this.modalContainer = document.getElementById('modalContainer');
        this.starCounterEl = document.getElementById('starCounter');
        this.btnMute = document.getElementById('btnMute');
        this.btnParent = document.getElementById('btnParent');
        this.btnHome = document.getElementById('btnHome');
        this.ageButtons = document.querySelectorAll('.age-pill-btn');
        this.gameCards = document.querySelectorAll('.game-hub-card');

        // Aktif yaş butonunu işaretle
        this.syncAgeUI();
    }

    initEventListeners() {
        // Yaş Grubu Değişimi
        this.ageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const age = btn.getAttribute('data-age');
                this.setAge(age);
                window.soundManager.playPop();
                window.soundManager.speak(`${age} yaş seviyesi seçildi!`, true);
            });
        });

        // Oyun Kartları Tıklama
        this.gameCards.forEach(card => {
            card.addEventListener('click', () => {
                const gameKey = card.getAttribute('data-game');
                this.launchGame(gameKey);
            });
        });

        // Ana Sayfa Butonu
        this.btnHome.addEventListener('click', () => {
            window.soundManager.playPop();
            this.returnToHub();
        });

        // Ses Aç/Kapat Butonu
        this.btnMute.addEventListener('click', () => {
            const isMuted = window.soundManager.toggleMute();
            this.btnMute.innerHTML = isMuted ? '🔇 <span class="nav-label">Ses Kapalı</span>' : '🔊 <span class="nav-label">Ses Açık</span>';
        });

        // Ebeveyn & Öğretmen Paneli Butonu (Güvenlik Korumalı)
        this.btnParent.addEventListener('click', () => {
            this.openParentGate();
        });

        // Maskota dokunulduğunda neşeli tepki
        const mascot = document.getElementById('mascotPati');
        if (mascot) {
            mascot.addEventListener('click', () => {
                window.soundManager.playPop();
                const phrases = [
                    'Miyav! Sen çok akıllı bir çocuksun!',
                    'Harika gidiyorsun! Yıldızları toplamaya devam et!',
                    'Birlikte öğrenmek çok eğlenceli!',
                    'Hangi oyunu oynamak istersin?'
                ];
                const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                window.soundManager.speak(randomPhrase, true);
            });
        }
    }

    setAge(age) {
        this.currentAge = age;
        localStorage.setItem('maarif_age', age);
        this.syncAgeUI();

        // Eğer bir oyun açıksa o yaş grubuna göre yeniden başlat
        if (this.activeGame && this.activeGameKey) {
            this.launchGame(this.activeGameKey);
        }
    }

    syncAgeUI() {
        this.ageButtons.forEach(btn => {
            if (btn.getAttribute('data-age') === this.currentAge) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    launchGame(gameKey) {
        this.activeGameKey = gameKey;
        this.hubView.classList.add('hidden');
        this.gameView.classList.remove('hidden');
        this.btnHome.classList.remove('hidden');

        window.soundManager.playPop();

        const onGameComplete = () => {
            this.returnToHub();
        };

        const onProgress = (id) => {
            ParentDashboard.recordProgress(id);
        };

        switch (gameKey) {
            case 'shapesColors':
                this.activeGame = new ShapesColorsGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'counting':
                this.activeGame = new CountingGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'concepts':
                this.activeGame = new ConceptsGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'nature':
                this.activeGame = new NatureGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'emotions':
                this.activeGame = new EmotionsGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'pattern':
                this.activeGame = new PatternGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'mangala':
                this.activeGame = new MangalaGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'tangram':
                this.activeGame = new TangramGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'sudoku':
                this.activeGame = new SudokuGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'vowels':
                this.activeGame = new VowelsGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'maze':
                this.activeGame = new MazeGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'coding':
                this.activeGame = new CodingGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'memory':
                this.activeGame = new MemoryGame(this.gameContainer, onGameComplete, onProgress);
                break;
            case 'copyModel':
                this.activeGame = new CopyModelGame(this.gameContainer, onGameComplete, onProgress);
                break;
            default:
                console.error('Bilinmeyen oyun:', gameKey);
                return;
        }

        this.activeGame.start(this.currentAge);
    }

    returnToHub() {
        window.soundManager.stopSpeech();
        this.activeGame = null;
        this.activeGameKey = null;
        this.gameContainer.innerHTML = '';
        this.gameView.classList.add('hidden');
        this.btnHome.classList.add('hidden');
        this.hubView.classList.remove('hidden');
    }

    addStar() {
        this.stars += 1;
        localStorage.setItem('maarif_stars', this.stars.toString());
        this.updateStarCount();
        window.soundManager.playStarEarned();
    }

    updateStarCount() {
        this.stars = parseInt(localStorage.getItem('maarif_stars') || '0', 10);
        if (this.starCounterEl) {
            this.starCounterEl.textContent = this.stars;
        }
    }

    openParentGate() {
        // Çocukların yanlışlıkla ayarlara girmesini önleyen basit ebeveyn doğrulama sorusu
        const num1 = Math.floor(Math.random() * 5) + 3;
        const num2 = Math.floor(Math.random() * 5) + 2;
        const correctAnswer = num1 + num2;

        this.modalContainer.innerHTML = `
            <div class="parent-modal-overlay">
                <div class="parent-gate-card animate-pop">
                    <h3>👨‍👩‍👧 Ebeveyn / Öğretmen Doğrulaması</h3>
                    <p>Paneli açmak için lütfen matematiksel soruyu cevaplayınız:</p>
                    <div class="gate-math-problem">${num1} + ${num2} = ?</div>
                    <div class="gate-input-row">
                        <input type="number" id="gateInput" class="gate-input" placeholder="Sonuç" autofocus />
                        <button class="btn-primary" id="btnCheckGate">Giriş Yap</button>
                    </div>
                    <button class="btn-cancel" id="btnCancelGate">İptal</button>
                </div>
            </div>
        `;

        const checkAnswer = () => {
            const input = document.getElementById('gateInput');
            if (parseInt(input.value, 10) === correctAnswer) {
                this.modalContainer.innerHTML = '';
                const dashboard = new ParentDashboard(this.modalContainer, () => {});
                dashboard.render();
            } else {
                input.value = '';
                input.placeholder = 'Yanlış, tekrar deneyin';
                input.classList.add('gate-input-error');
            }
        };

        document.getElementById('btnCheckGate').addEventListener('click', checkAnswer);
        document.getElementById('gateInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') checkAnswer();
        });
        document.getElementById('btnCancelGate').addEventListener('click', () => {
            this.modalContainer.innerHTML = '';
        });
    }

    // Göz sağlığı / Mola zamanlayıcısı
    setupTimer(minutes) {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }

        if (minutes <= 0) return;

        this.timerId = setTimeout(() => {
            this.showBreakModal();
        }, minutes * 60 * 1000);
    }

    showBreakModal() {
        window.soundManager.speak('Harika oynadın! Şimdi biraz gözlerimizi dinlendirme ve su içme vakti!', true);

        this.modalContainer.innerHTML = `
            <div class="parent-modal-overlay">
                <div class="break-time-card animate-pop">
                    <div class="break-icon">🌿🧃</div>
                    <h2>Mola ve Dinlenme Vakti!</h2>
                    <p>Gözlerimizi dinlendirmek, biraz su içmek ve hareket etmek için harika bir zaman!</p>
                    <button class="btn-primary-large" id="btnEndBreak">Dinlendim, Hazırım! 🌈</button>
                </div>
            </div>
        `;

        document.getElementById('btnEndBreak').addEventListener('click', () => {
            this.modalContainer.innerHTML = '';
            const limit = parseInt(localStorage.getItem('maarif_time_limit') || '15', 10);
            this.setupTimer(limit);
        });
    }

    // Konfeti Parçacık Animasyonu (Canvas)
    initConfetti() {
        this.confettiCanvas = document.getElementById('confettiCanvas');
        if (!this.confettiCanvas) return;
        this.confettiCtx = this.confettiCanvas.getContext('2d');
        this.particles = [];

        window.addEventListener('resize', () => {
            this.confettiCanvas.width = window.innerWidth;
            this.confettiCanvas.height = window.innerHeight;
        });
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
    }

    triggerConfetti(count = 35) {
        if (!this.confettiCtx) return;

        const colors = ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#FF9F45', '#9B51E0', '#FF70A6'];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: window.innerWidth / 2 + (Math.random() * 200 - 100),
                y: window.innerHeight / 2 - 50,
                r: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 12,
                vy: Math.random() * -12 - 5,
                gravity: 0.35,
                opacity: 1,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10
            });
        }

        if (!this.isAnimatingConfetti) {
            this.animateConfetti();
        }
    }

    animateConfetti() {
        this.isAnimatingConfetti = true;
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.opacity -= 0.012;
            p.rotation += p.rotSpeed;

            if (p.opacity <= 0 || p.y > this.confettiCanvas.height) {
                this.particles.splice(i, 1);
                continue;
            }

            this.confettiCtx.save();
            this.confettiCtx.globalAlpha = p.opacity;
            this.confettiCtx.fillStyle = p.color;
            this.confettiCtx.translate(p.x, p.y);
            this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
            this.confettiCtx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.5);
            this.confettiCtx.restore();
        }

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animateConfetti());
        } else {
            this.isAnimatingConfetti = false;
        }
    }
}

// Uygulamayı Başlat
window.addEventListener('DOMContentLoaded', () => {
    window.app = new MaarifApp();
});
