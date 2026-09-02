// Ebeveyn ve Öğretmen Gelişim & Takip Paneli
class ParentDashboard {
    constructor(container, onClose) {
        this.container = container;
        this.onClose = onClose;
    }

    render() {
        const stats = this.getStats();
        const totalStars = parseInt(localStorage.getItem('maarif_stars') || '0', 10);
        const screenTimeLimit = localStorage.getItem('maarif_time_limit') || '15';

        this.container.innerHTML = `
            <div class="parent-modal-overlay">
                <div class="parent-dashboard-card animate-pop">
                    <div class="dashboard-header">
                        <div class="header-left">
                            <span class="dashboard-icon">📊</span>
                            <div>
                                <h2>Öğretmen & Ebeveyn Gelişim Paneli</h2>
                                <p class="sub-desc">Türkiye Yüzyılı Maarif Modeli Okul Öncesi Kazanım Takibi</p>
                            </div>
                        </div>
                        <button class="btn-close-dashboard" id="btnCloseDashboard" title="Kapat">✖</button>
                    </div>

                    <div class="dashboard-summary-row">
                        <div class="summary-pill bg-star">
                            <span class="pill-icon">⭐</span>
                            <div>
                                <strong>${totalStars}</strong>
                                <span>Kazanılan Yıldız</span>
                            </div>
                        </div>
                        <div class="summary-pill bg-activities">
                            <span class="pill-icon">🎯</span>
                            <div>
                                <strong>${stats.totalCompleted}</strong>
                                <span>Tamamlanan Etkinlik</span>
                            </div>
                        </div>
                        <div class="summary-pill bg-time">
                            <span class="pill-icon">⏳</span>
                            <div>
                                <strong>${screenTimeLimit} Dk</strong>
                                <span>Ekran Süresi Sınırı</span>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-section-title">
                        🎯 Maarif Modeli Gelişim Alanları ve Kazanım Durumu
                    </div>

                    <div class="outcomes-list">
                        ${Object.entries(window.MAARIF_OUTCOMES).map(([areaName, meta]) => {
                            const completedCount = stats.byArea[areaName] || 0;
                            const percentage = Math.min(100, completedCount * 25);
                            return `
                                <div class="outcome-card">
                                    <div class="outcome-header">
                                        <div class="outcome-title-wrap">
                                            <span class="area-icon">${meta.icon}</span>
                                            <div>
                                                <strong>${areaName}</strong>
                                                <div class="outcome-desc">${meta.desc}</div>
                                            </div>
                                        </div>
                                        <span class="outcome-badge">${completedCount} Başarı</span>
                                    </div>
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill" style="width: ${percentage}%; background-color: ${meta.color};"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div class="settings-section">
                        <div class="settings-title">⚙️ Güvenli Ekran & Mola Ayarları</div>
                        <div class="timer-setting-row">
                            <label for="timeLimitSelect">Göz Dinlendirme Mola Süresi:</label>
                            <select id="timeLimitSelect" class="styled-select">
                                <option value="0" ${screenTimeLimit === '0' ? 'selected' : ''}>Sınırsız (Molayı Kapat)</option>
                                <option value="10" ${screenTimeLimit === '10' ? 'selected' : ''}>10 Dakika</option>
                                <option value="15" ${screenTimeLimit === '15' ? 'selected' : ''}>15 Dakika (Önerilen)</option>
                                <option value="20" ${screenTimeLimit === '20' ? 'selected' : ''}>20 Dakika</option>
                                <option value="30" ${screenTimeLimit === '30' ? 'selected' : ''}>30 Dakika</option>
                            </select>
                        </div>
                    </div>

                    <div class="dashboard-actions">
                        <button class="btn-reset-stats" id="btnResetStats">İlerlemeyi Sıfırla 🔄</button>
                        <button class="btn-primary-large" id="btnReturnToGame">Oyuna Geri Dön 🚀</button>
                    </div>
                </div>
            </div>
        `;

        // Olay Dinleyicileri
        document.getElementById('btnCloseDashboard').addEventListener('click', () => this.close());
        document.getElementById('btnReturnToGame').addEventListener('click', () => this.close());

        document.getElementById('timeLimitSelect').addEventListener('change', (e) => {
            const val = e.target.value;
            localStorage.setItem('maarif_time_limit', val);
            if (window.app) {
                window.app.setupTimer(parseInt(val, 10));
            }
        });

        document.getElementById('btnResetStats').addEventListener('click', () => {
            if (confirm('Tüm yıldızları ve kazanım verilerini sıfırlamak istediğinize emin misiniz?')) {
                localStorage.removeItem('maarif_stars');
                localStorage.removeItem('maarif_stats');
                this.render();
                if (window.app) {
                    window.app.updateStarCount();
                }
            }
        });
    }

    close() {
        this.container.innerHTML = '';
        if (this.onClose) this.onClose();
    }

    getStats() {
        try {
            const raw = localStorage.getItem('maarif_stats');
            if (raw) {
                return JSON.parse(raw);
            }
        } catch (e) {
            console.error(e);
        }
        return {
            totalCompleted: 0,
            byArea: {}
        };
    }

    static recordProgress(gameId) {
        const gameMeta = window.MAARIF_DATA[gameId];
        if (!gameMeta) return;

        const areaName = gameMeta.maarifArea;
        let stats = { totalCompleted: 0, byArea: {} };

        try {
            const raw = localStorage.getItem('maarif_stats');
            if (raw) stats = JSON.parse(raw);
        } catch (e) {
            console.error(e);
        }

        stats.totalCompleted = (stats.totalCompleted || 0) + 1;
        stats.byArea[areaName] = (stats.byArea[areaName] || 0) + 1;

        localStorage.setItem('maarif_stats', JSON.stringify(stats));
    }
}

window.ParentDashboard = ParentDashboard;
