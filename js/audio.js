// Ses Motoru: Web Speech API (Türkçe Konuşma) ve Web Audio API (Synthesizer Ses Efektleri)
class SoundManager {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.speechAvailable = 'speechSynthesis' in window;
        this.currentUtterance = null;
        this.turkishVoice = null;

        // Sayfa etkileşimiyle AudioContext başlatma
        this.initAudioContext();
        if (this.speechAvailable) {
            this.initSpeech();
        }
    }

    initAudioContext() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
            this.ctx = new AudioCtx();
        }

        // Mobil cihazlarda (iOS Safari / Android) ilk dokunuşta ses motorunun kilidini açma
        const unlockMobileAudio = () => {
            this.resumeAudio();
            // iOS için sessiz buffer çalma
            if (this.ctx && this.ctx.state === 'running') {
                const buffer = this.ctx.createBuffer(1, 1, 22050);
                const source = this.ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(this.ctx.destination);
                source.start(0);
            }
            document.removeEventListener('touchstart', unlockMobileAudio);
            document.removeEventListener('touchend', unlockMobileAudio);
            document.removeEventListener('click', unlockMobileAudio);
        };

        document.addEventListener('touchstart', unlockMobileAudio, { passive: true });
        document.addEventListener('touchend', unlockMobileAudio, { passive: true });
        document.addEventListener('click', unlockMobileAudio);
    }

    resumeAudio() {
        if (this.ctx && (this.ctx.state === 'suspended' || this.ctx.state === 'interrupted')) {
            this.ctx.resume();
        }
    }

    initSpeech() {
        const setVoice = () => {
            if (!this.speechAvailable) return;
            const voices = window.speechSynthesis.getVoices();
            if (voices && voices.length > 0) {
                // Türkçe sesleri bul (tr-TR veya tr ile başlayanlar)
                const trVoices = voices.filter(v => v.lang && (v.lang.toLowerCase() === 'tr-tr' || v.lang.toLowerCase().startsWith('tr')));
                // Kaliteli veya doğal Türkçe sesi seç
                this.turkishVoice = trVoices.find(v => /yelda|tolga|emel|cem|google|natural/i.test(v.name)) || trVoices[0] || null;
            }
        };

        setVoice();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = setVoice;
        }
    }

    // Metni Türkçe seslendirme için temizle (emojileri ve sembolleri Türkçe harflere dokunmadan arındırır)
    cleanTextForSpeech(text) {
        if (!text) return '';
        // Emojileri ve özel sembolleri temizle (Türkçe ç, ğ, ı, ö, ş, ü harflerini korur)
        let clean = text.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F300}-\u{1F9FF}\u{FE00}-\u{FE0F}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/gu, '');
        // Oyun içi oklar ve işaretleri temizle
        clean = clean.replace(/[➔➡️⬅️⬆️⬇️👉👈👆👇✓✗✕✖⭐✨💡🔊📢🎯🔄🗑️❓]/gu, '');
        // Fazla boşlukları düzelt
        clean = clean.replace(/\s+/g, ' ').trim();
        return clean;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopSpeech();
        }
        return this.isMuted;
    }

    // Çocuklar için sıcak, tane tane ve doğru Türkçe sesli yönerge
    speak(text, priority = false) {
        if (this.isMuted || !this.speechAvailable || !text) return;

        // Türkçe ses henüz yüklenmediyse tekrar kontrol et
        if (!this.turkishVoice) {
            const voices = window.speechSynthesis.getVoices();
            if (voices && voices.length > 0) {
                const trVoices = voices.filter(v => v.lang && (v.lang.toLowerCase() === 'tr-tr' || v.lang.toLowerCase().startsWith('tr')));
                this.turkishVoice = trVoices.find(v => /yelda|tolga|emel|cem|google|natural/i.test(v.name)) || trVoices[0] || null;
            }
        }

        const cleanText = this.cleanTextForSpeech(text);
        if (!cleanText) return;

        if (priority) {
            window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'tr-TR';
        utterance.rate = 0.90; // Okul öncesi çocukların tane tane ve net anlaması için uygun hız
        utterance.pitch = 1.15; // Sıcak ve neşeli ton

        if (this.turkishVoice) {
            utterance.voice = this.turkishVoice;
        }

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    }

    stopSpeech() {
        if (this.speechAvailable) {
            window.speechSynthesis.cancel();
        }
    }

    // Synthesizer ile neşeli ses efektleri (Harici MP3 yükleme derdi olmadan anında çalar)
    playPop() {
        if (this.isMuted) return;
        this.resumeAudio();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }

    playSuccess() {
        if (this.isMuted) return;
        this.resumeAudio();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // Do - Mi - Sol - İnce Do akoru
        notes.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.09);

            gain.gain.setValueAtTime(0.25, this.ctx.currentTime + index * 0.09);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.09 + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + index * 0.09);
            osc.stop(this.ctx.currentTime + index * 0.09 + 0.25);
        });
    }

    playCelebration() {
        if (this.isMuted) return;
        this.resumeAudio();
        if (!this.ctx) return;

        // Zafer melodisi (Fanfare)
        const fanfareNotes = [
            { f: 523.25, d: 0.12, t: 0 },
            { f: 659.25, d: 0.12, t: 0.12 },
            { f: 783.99, d: 0.12, t: 0.24 },
            { f: 1046.50, d: 0.35, t: 0.36 },
            { f: 880.00, d: 0.15, t: 0.75 },
            { f: 1046.50, d: 0.50, t: 0.90 }
        ];

        fanfareNotes.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.f, this.ctx.currentTime + note.t);

            gain.gain.setValueAtTime(0.3, this.ctx.currentTime + note.t);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.t + note.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + note.t);
            osc.stop(this.ctx.currentTime + note.t + note.d);
        });
    }

    playTryAgain() {
        if (this.isMuted) return;
        this.resumeAudio();
        if (!this.ctx) return;

        // Yumuşak, cesaret verici iki nota (Bilişsel olarak cezalandırıcı olmayan ton)
        const notes = [440, 392];
        notes.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.15);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + index * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.15 + 0.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + index * 0.15);
            osc.stop(this.ctx.currentTime + index * 0.15 + 0.2);
        });
    }

    playStarEarned() {
        if (this.isMuted) return;
        this.resumeAudio();
        if (!this.ctx) return;

        const starNotes = [783.99, 1046.50, 1318.51];
        starNotes.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + index * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.08 + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + index * 0.08);
            osc.stop(this.ctx.currentTime + index * 0.08 + 0.3);
        });
    }
}

// Global Sound Instance
window.soundManager = new SoundManager();
