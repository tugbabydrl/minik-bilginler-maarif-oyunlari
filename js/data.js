// Maarif Modeli Okul Öncesi Eğitim Veritabanı (3-6 Yaş Kademelerine Göre Yapılandırılmış)

window.MAARIF_DATA = {
    // 1. ŞEKİL VE RENKLER BAHÇESİ
    shapesColors: {
        id: 'shapesColors',
        title: 'Şekil ve Renkler Bahçesi',
        icon: '🎨',
        color: '#FF6B6B',
        desc: 'Geometrik şekilleri ve rengârenk dünyayı keşfet!',
        maarifArea: 'Bilişsel & Sanatsal Beceriler',
        levels: {
            '3-4': [
                {
                    type: 'shape_find',
                    instruction: 'Mavi daireyi bulup sepete dokun!',
                    targetShape: 'circle',
                    targetColor: '#4D96FF',
                    targetName: 'Mavi Daire',
                    options: [
                        { id: 1, shape: 'circle', color: '#4D96FF', name: 'Mavi Daire', isCorrect: true, emoji: '🔵' },
                        { id: 2, shape: 'square', color: '#FFD93D', name: 'Sarı Kare', isCorrect: false, emoji: '🟨' },
                        { id: 3, shape: 'triangle', color: '#FF6B6B', name: 'Kırmızı Üçgen', isCorrect: false, emoji: '🔺' }
                    ]
                },
                {
                    type: 'color_find',
                    instruction: 'Kırmızı rengi bul ve dokun!',
                    targetColorName: 'Kırmızı',
                    options: [
                        { id: 1, color: '#FF6B6B', name: 'Kırmızı Elma', emoji: '🍎', isCorrect: true },
                        { id: 2, color: '#6BCB77', name: 'Yeşil Kurbağa', emoji: '🐸', isCorrect: false },
                        { id: 3, color: '#4D96FF', name: 'Mavi Kelebek', emoji: '🦋', isCorrect: false }
                    ]
                },
                {
                    type: 'shape_find',
                    instruction: 'Sarı kareyi seç!',
                    targetShape: 'square',
                    targetColor: '#FFD93D',
                    targetName: 'Sarı Kare',
                    options: [
                        { id: 1, shape: 'square', color: '#FFD93D', name: 'Sarı Kare', isCorrect: true, emoji: '🟨' },
                        { id: 2, shape: 'circle', color: '#FF6B6B', name: 'Kırmızı Daire', isCorrect: false, emoji: '🔴' },
                        { id: 3, shape: 'triangle', color: '#6BCB77', name: 'Yeşil Üçgen', isCorrect: false, emoji: '🟢' }
                    ]
                }
            ],
            '4-5': [
                {
                    type: 'shape_find',
                    instruction: 'Yeşil üçgeni bul ve sepete koy!',
                    targetShape: 'triangle',
                    targetColor: '#6BCB77',
                    targetName: 'Yeşil Üçgen',
                    options: [
                        { id: 1, shape: 'triangle', color: '#6BCB77', name: 'Yeşil Üçgen', isCorrect: true, emoji: '🔺' },
                        { id: 2, shape: 'rect', color: '#FF9F45', name: 'Turuncu Dikdörtgen', isCorrect: false, emoji: '🟧' },
                        { id: 3, shape: 'circle', color: '#9B51E0', name: 'Mor Daire', isCorrect: false, emoji: '🟣' },
                        { id: 4, shape: 'square', color: '#4D96FF', name: 'Mavi Kare', isCorrect: false, emoji: '🟦' }
                    ]
                },
                {
                    type: 'shape_find',
                    instruction: 'Turuncu dikdörtgeni bul!',
                    targetShape: 'rect',
                    targetColor: '#FF9F45',
                    targetName: 'Turuncu Dikdörtgen',
                    options: [
                        { id: 1, shape: 'rect', color: '#FF9F45', name: 'Turuncu Dikdörtgen', isCorrect: true, emoji: '🟧' },
                        { id: 2, shape: 'circle', color: '#FF6B6B', name: 'Kırmızı Daire', isCorrect: false, emoji: '🔴' },
                        { id: 3, shape: 'star', color: '#FFD93D', name: 'Sarı Yıldız', isCorrect: false, emoji: '⭐' },
                        { id: 4, shape: 'square', color: '#6BCB77', name: 'Yeşil Kare', isCorrect: false, emoji: '🟩' }
                    ]
                },
                {
                    type: 'color_mix',
                    instruction: 'Mor rengi bul!',
                    targetColorName: 'Mor',
                    options: [
                        { id: 1, color: '#9B51E0', name: 'Mor Üzüm', emoji: '🍇', isCorrect: true },
                        { id: 2, color: '#FFD93D', name: 'Sarı Muz', emoji: '🍌', isCorrect: false },
                        { id: 3, color: '#FF9F45', name: 'Turuncu Portakal', emoji: '🍊', isCorrect: false },
                        { id: 4, color: '#FF6B6B', name: 'Kırmızı Çilek', emoji: '🍓', isCorrect: false }
                    ]
                }
            ],
            '5-6': [
                {
                    type: 'shape_find',
                    instruction: 'Parlayan sarı yıldızı bul!',
                    targetShape: 'star',
                    targetColor: '#FFD93D',
                    targetName: 'Sarı Yıldız',
                    options: [
                        { id: 1, shape: 'star', color: '#FFD93D', name: 'Sarı Yıldız', isCorrect: true, emoji: '⭐' },
                        { id: 2, shape: 'oval', color: '#FF6B6B', name: 'Kırmızı Oval', isCorrect: false, emoji: '🥚' },
                        { id: 3, shape: 'rect', color: '#4D96FF', name: 'Mavi Dikdörtgen', isCorrect: false, emoji: '📘' },
                        { id: 4, shape: 'triangle', color: '#6BCB77', name: 'Yeşil Üçgen', isCorrect: false, emoji: '🌲' }
                    ]
                },
                {
                    type: 'shape_find',
                    instruction: 'Hangi nesne daire şeklindedir?',
                    targetShape: 'circle',
                    options: [
                        { id: 1, name: 'Saat', emoji: '⏰', shapeType: 'circle', isCorrect: true },
                        { id: 2, name: 'Kapı', emoji: '🚪', shapeType: 'rect', isCorrect: false },
                        { id: 3, name: 'Kitap', emoji: '📖', shapeType: 'rect', isCorrect: false },
                        { id: 4, name: 'Piramit', emoji: '📐', shapeType: 'triangle', isCorrect: false }
                    ]
                },
                {
                    type: 'shape_find',
                    instruction: 'Hangi nesne üçgen şeklindedir?',
                    targetShape: 'triangle',
                    options: [
                        { id: 1, name: 'Pizza Dilimi', emoji: '🍕', shapeType: 'triangle', isCorrect: true },
                        { id: 2, name: 'Top', emoji: '⚽', shapeType: 'circle', isCorrect: false },
                        { id: 3, name: 'Hediye Kutusu', emoji: '🎁', shapeType: 'square', isCorrect: false },
                        { id: 4, name: 'Televizyon', emoji: '📺', shapeType: 'rect', isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 2. SAYI VE SAYMA ORMANI
    counting: {
        id: 'counting',
        title: 'Sayı ve Sayma Ormanı',
        icon: '🔢',
        color: '#4D96FF',
        desc: 'Ağaçtaki sevimli meyveleri say ve sayıları öğren!',
        maarifArea: 'Matematiksel Düşünme & Sayı Algısı',
        levels: {
            '3-4': [
                { instruction: 'Ağaçta kaç tane elma var? Say ve doğru sayıyı seç!', itemEmoji: '🍎', count: 3, options: [3, 1, 2] },
                { instruction: 'Kaç tane sevimli tavşan var?', itemEmoji: '🐰', count: 2, options: [2, 4, 1] },
                { instruction: 'Göldeki ördekleri say!', itemEmoji: '🦆', count: 4, options: [4, 2, 5] }
            ],
            '4-5': [
                { instruction: 'Bahçedeki sevimli çilekleri say!', itemEmoji: '🍓', count: 6, options: [6, 4, 7, 5] },
                { instruction: 'Uçan kelebekleri say!', itemEmoji: '🦋', count: 8, options: [8, 6, 9, 7] },
                { instruction: 'Ağaçtaki sarı muzları say!', itemEmoji: '🍌', count: 5, options: [5, 3, 6, 4] }
            ],
            '5-6': [
                { instruction: 'Gökyüzündeki parlayan yıldızları say!', itemEmoji: '⭐', count: 12, options: [12, 10, 14, 11] },
                { instruction: 'Çiçek toplayan arıları say!', itemEmoji: '🐝', count: 9, options: [9, 8, 10, 7] },
                { instruction: 'Renkli balonları say!', itemEmoji: '🎈', count: 15, options: [15, 12, 16, 13] }
            ]
        }
    },

    // 3. ZIT VE MEKÂNSAL KAVRAMLAR
    concepts: {
        id: 'concepts',
        title: 'Zıt ve Mekân Kavramları',
        icon: '↔️',
        color: '#6BCB77',
        desc: 'Büyük-küçük, sıcak-soğuk ve nerede olduğunu keşfet!',
        maarifArea: 'Bilişsel & Dil Becerileri (Kavramsal Gelişim)',
        levels: {
            '3-4': [
                {
                    instruction: 'BÜYÜK olan fili seç!',
                    questionType: 'big_small',
                    options: [
                        { id: 1, name: 'Büyük Fil', emoji: '🐘', size: 'big', isCorrect: true },
                        { id: 2, name: 'Küçük Karınca', emoji: '🐜', size: 'small', isCorrect: false }
                    ]
                },
                {
                    instruction: 'SICAK olan nesneyi bul!',
                    questionType: 'hot_cold',
                    options: [
                        { id: 1, name: 'Sıcak Güneş', emoji: '☀️', trait: 'hot', isCorrect: true },
                        { id: 2, name: 'Soğuk Kardan Adam', emoji: '⛄', trait: 'cold', isCorrect: false }
                    ]
                },
                {
                    instruction: 'GÜNDÜZ gökyüzünü seç!',
                    questionType: 'day_night',
                    options: [
                        { id: 1, name: 'Gündüz (Güneş)', emoji: '🌞', trait: 'day', isCorrect: true },
                        { id: 2, name: 'Gece (Ay ve Yıldızlar)', emoji: '🌙', trait: 'night', isCorrect: false }
                    ]
                }
            ],
            '4-5': [
                {
                    instruction: 'Kutunun İÇİNDE olan kediyi seç!',
                    questionType: 'spatial',
                    options: [
                        { id: 1, name: 'Kutunun İçinde Kedi', emoji: '📦🐱', trait: 'inside', isCorrect: true },
                        { id: 2, name: 'Kutunun Dışında Kedi', emoji: '🐱 📦', trait: 'outside', isCorrect: false }
                    ]
                },
                {
                    instruction: 'AĞIR olan nesneyi seç!',
                    questionType: 'heavy_light',
                    options: [
                        { id: 1, name: 'Ağır Kamyon', emoji: '🚚', trait: 'heavy', isCorrect: true },
                        { id: 2, name: 'Hafif Tüy', emoji: '🪶', trait: 'light', isCorrect: false }
                    ]
                },
                {
                    instruction: 'UZUN olan zürafayı seç!',
                    questionType: 'long_short',
                    options: [
                        { id: 1, name: 'Uzun Zürafa', emoji: '🦒', trait: 'tall', isCorrect: true },
                        { id: 2, name: 'Kısa Kirpi', emoji: '🦔', trait: 'short', isCorrect: false }
                    ]
                }
            ],
            '5-6': [
                {
                    instruction: 'Masanın ÜSTÜNDE olan elmayı seç!',
                    questionType: 'spatial_advanced',
                    options: [
                        { id: 1, name: 'Masanın Üstünde', visual: 'top', text: 'Masanın Üstünde', isCorrect: true, emoji: '🍏⬆️' },
                        { id: 2, name: 'Masanın Altında', visual: 'bottom', text: 'Masanın Altında', isCorrect: false, emoji: '🍏⬇️' }
                    ]
                },
                {
                    instruction: 'HIZLI olan taşıtı seç!',
                    questionType: 'fast_slow',
                    options: [
                        { id: 1, name: 'Hızlı Uçak', emoji: '✈️', trait: 'fast', isCorrect: true },
                        { id: 2, name: 'Yavaş Kaplumbağa', emoji: '🐢', trait: 'slow', isCorrect: false }
                    ]
                },
                {
                    instruction: 'AÇIK olan kapıyı bul!',
                    questionType: 'open_close',
                    options: [
                        { id: 1, name: 'Açık Kapı', emoji: '🚪🔓', trait: 'open', isCorrect: true },
                        { id: 2, name: 'Kapalı Kilitli Kapı', emoji: '🔒🚪', trait: 'closed', isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 4. DOĞA, ÇEVRE & SIFIR ATIK KÂŞİFİ
    nature: {
        id: 'nature',
        title: 'Doğa & Sıfır Atık Kâşifi',
        icon: '🌿',
        color: '#2EC4B6',
        desc: 'Canlıların yuvalarını ve çevremizi korumayı öğren!',
        maarifArea: 'Fen ve Doğa Becerileri & Çevre Duyarlılığı',
        levels: {
            '3-4': [
                {
                    type: 'habitat',
                    instruction: 'Balık nerede yaşar?',
                    animalEmoji: '🐠',
                    animalName: 'Balık',
                    options: [
                        { id: 1, name: 'Deniz / Su', emoji: '🌊', isCorrect: true },
                        { id: 2, name: 'Ağaç Dalı', emoji: '🌳', isCorrect: false }
                    ]
                },
                {
                    type: 'habitat',
                    instruction: 'Kuş nerede yaşar ve uçar?',
                    animalEmoji: '🐦',
                    animalName: 'Kuş',
                    options: [
                        { id: 1, name: 'Ağaç & Gökyüzü', emoji: '🌲🌤️', isCorrect: true },
                        { id: 2, name: 'Denizin Dibi', emoji: '🌊', isCorrect: false }
                    ]
                },
                {
                    type: 'care',
                    instruction: 'Çiçeğin büyümesi için hangisine ihtiyacı vardır?',
                    target: 'Çiçek',
                    targetEmoji: '🌱',
                    options: [
                        { id: 1, name: 'Su ve Güneş', emoji: '💧☀️', isCorrect: true },
                        { id: 2, name: 'Dondurma', emoji: '🍦', isCorrect: false }
                    ]
                }
            ],
            '4-5': [
                {
                    type: 'recycle',
                    instruction: 'Plastik şişeyi hangi geri dönüşüm kutusuna atmalıyız?',
                    wasteEmoji: '🧴',
                    wasteName: 'Plastik Şişe',
                    options: [
                        { id: 1, name: 'Plastik Kutusu', binColor: '#FFD93D', emoji: '🟡 PLASTİK', isCorrect: true },
                        { id: 2, name: 'Cam Kutusu', binColor: '#6BCB77', emoji: '🟢 CAM', isCorrect: false },
                        { id: 3, name: 'Kâğıt Kutusu', binColor: '#4D96FF', emoji: '🔵 KÂĞIT', isCorrect: false }
                    ]
                },
                {
                    type: 'recycle',
                    instruction: 'Eski gazete ve defteri hangi kutuya atmalıyız?',
                    wasteEmoji: '📰',
                    wasteName: 'Kâğıt & Gazete',
                    options: [
                        { id: 1, name: 'Kâğıt Kutusu', binColor: '#4D96FF', emoji: '🔵 KÂĞIT', isCorrect: true },
                        { id: 2, name: 'Plastik Kutusu', binColor: '#FFD93D', emoji: '🟡 PLASTİK', isCorrect: false },
                        { id: 3, name: 'Cam Kutusu', binColor: '#6BCB77', emoji: '🟢 CAM', isCorrect: false }
                    ]
                },
                {
                    type: 'living_nonliving',
                    instruction: 'Hangisi CANLI bir varlıktır?',
                    options: [
                        { id: 1, name: 'Kedi', emoji: '🐱', isCorrect: true },
                        { id: 2, name: 'Oyuncak Araba', emoji: '🚗', isCorrect: false },
                        { id: 3, name: 'Taş', emoji: '🪨', isCorrect: false }
                    ]
                }
            ],
            '5-6': [
                {
                    type: 'recycle',
                    instruction: 'Cam kavanozu hangi geri dönüşüm kutusuna atmalıyız?',
                    wasteEmoji: '🫙',
                    wasteName: 'Cam Kavanoz',
                    options: [
                        { id: 1, name: 'Yeşil Cam Kutusu', binColor: '#6BCB77', emoji: '🟢 CAM', isCorrect: true },
                        { id: 2, name: 'Mavi Kâğıt Kutusu', binColor: '#4D96FF', emoji: '🔵 KÂĞIT', isCorrect: false },
                        { id: 3, name: 'Sarı Plastik Kutusu', binColor: '#FFD93D', emoji: '🟡 PLASTİK', isCorrect: false }
                    ]
                },
                {
                    type: 'nature_care',
                    instruction: 'Temiz bir çevre için hangisini yapmalıyız?',
                    options: [
                        { id: 1, name: 'Çöpleri Çöp Kutusuna Atmak', emoji: '🗑️✨', isCorrect: true },
                        { id: 2, name: 'Çöpleri Yere Atmak', emoji: '🚮❌', isCorrect: false },
                        { id: 3, name: 'Suyu Boşa Akıtmak', emoji: '🚰❌', isCorrect: false }
                    ]
                },
                {
                    type: 'habitat_advanced',
                    instruction: 'Kutup Ayısı nerede yaşar?',
                    animalEmoji: '🐻‍❄️',
                    animalName: 'Kutup Ayısı',
                    options: [
                        { id: 1, name: 'Karlı Buzlu Kutup', emoji: '❄️🏔️', isCorrect: true },
                        { id: 2, name: 'Sıcak Çöl', emoji: '🏜️☀️', isCorrect: false },
                        { id: 3, name: 'Derin Okyanus Dibi', emoji: '🌊🐠', isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 5. DUYGULAR VE NEZAKET ATÖLYESİ
    emotions: {
        id: 'emotions',
        title: 'Duygular ve Değerler Kulübü',
        icon: '💖',
        color: '#FF9F45',
        desc: 'Duygularımızı tanıyalım, paylaşmayı ve nezaketi öğrenelim!',
        maarifArea: 'Sosyo-Duygusal Beceriler & Değerler Eğitimi',
        levels: {
            '3-4': [
                {
                    instruction: 'MUTLU olan yüzü bul!',
                    targetEmotion: 'Mutlu',
                    options: [
                        { id: 1, name: 'Mutlu Yüz', emoji: '😄', emotion: 'happy', isCorrect: true },
                        { id: 2, name: 'Üzgün Yüz', emoji: '😢', emotion: 'sad', isCorrect: false }
                    ]
                },
                {
                    instruction: 'ÜZGÜN olan yüzü bul!',
                    targetEmotion: 'Üzgün',
                    options: [
                        { id: 1, name: 'Üzgün Yüz', emoji: '😢', emotion: 'sad', isCorrect: true },
                        { id: 2, name: 'Mutlu Yüz', emoji: '😄', emotion: 'happy', isCorrect: false }
                    ]
                },
                {
                    instruction: 'ŞAŞIRMIŞ olan yüzü seç!',
                    targetEmotion: 'Şaşkın',
                    options: [
                        { id: 1, name: 'Şaşkın Yüz', emoji: '😲', emotion: 'surprised', isCorrect: true },
                        { id: 2, name: 'Uykulu Yüz', emoji: '😴', emotion: 'sleepy', isCorrect: false }
                    ]
                }
            ],
            '4-5': [
                {
                    instruction: 'Biri bize hediye verdiğinde ne söyleriz?',
                    scenario: 'Arkadaşın sana güzel bir oyuncak hediye etti 🎁',
                    options: [
                        { id: 1, name: 'Teşekkür Ederim', emoji: '🙏 "Teşekkür Ederim"', isCorrect: true },
                        { id: 2, name: 'Bana Ne', emoji: '🙅 "Bana Ne"', isCorrect: false },
                        { id: 3, name: 'Kızgın Bakmak', emoji: '😠', isCorrect: false }
                    ]
                },
                {
                    instruction: 'Arkadaşımızın canını yanlışlıkla acıttığımızda ne söyleriz?',
                    scenario: 'Yanlışlıkla arkadaşına çarptın...',
                    options: [
                        { id: 1, name: 'Özür Dilerim', emoji: '🤝 "Özür Dilerim"', isCorrect: true },
                        { id: 2, name: 'Gülüp Kaçmak', emoji: '🏃💨', isCorrect: false },
                        { id: 3, name: 'Kızmak', emoji: '😡', isCorrect: false }
                    ]
                },
                {
                    instruction: 'KIZGIN olan yüz ifadesini bul!',
                    targetEmotion: 'Kızgın',
                    options: [
                        { id: 1, name: 'Kızgın Yüz', emoji: '😠', emotion: 'angry', isCorrect: true },
                        { id: 2, name: 'Mutlu Yüz', emoji: '😊', emotion: 'happy', isCorrect: false },
                        { id: 3, name: 'Sakin Yüz', emoji: '😌', emotion: 'calm', isCorrect: false }
                    ]
                }
            ],
            '5-6': [
                {
                    instruction: 'Birinden bir şey isterken hangi nezaket sözcüğünü kullanırız?',
                    scenario: 'Kalemi ödünç almak istiyorsun...',
                    options: [
                        { id: 1, name: 'Lütfen verebilir misin?', emoji: '✨ "Lütfen"', isCorrect: true },
                        { id: 2, name: 'Hemen ver bana!', emoji: '⚡ "Ver hemen"', isCorrect: false },
                        { id: 3, name: 'Çekip almak', emoji: '✋❌', isCorrect: false }
                    ]
                },
                {
                    instruction: 'Arkadaşın oyuncağını bulamayıp üzülmüş. Ne yapmalısın?',
                    scenario: 'Üzgün arkadaşına yardım etmek...',
                    options: [
                        { id: 1, name: 'Yardım edip birlikte aramak', emoji: '🤗 Birlikte Arayalım', isCorrect: true },
                        { id: 2, name: 'Görmezden gelmek', emoji: '🙈 Umursamamak', isCorrect: false },
                        { id: 3, name: 'Ona gülmek', emoji: '😆 Dalga Geçmek', isCorrect: false }
                    ]
                },
                {
                    instruction: 'Oyuncağını arkadaşınla PAYLAŞMAK sence nasıl bir davranıştır?',
                    scenario: 'Birlikte legolarla kule yapıyorsunuz 🏰',
                    options: [
                        { id: 1, name: 'Harika ve Güzel Bir Davranış', emoji: '🌟 Çok Güzel', isCorrect: true },
                        { id: 2, name: 'Kötü Bir Davranış', emoji: '👎 Kötü', isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 6. SİHİRLİ ÖRÜNTÜ TRENİ
    pattern: {
        id: 'pattern',
        title: 'Sihirli Örüntü Treni',
        icon: '🚂',
        color: '#9B51E0',
        desc: 'Vagonlardaki sırayı takip et, eksik şekli veya meyveyi bul!',
        maarifArea: 'Algoritmik & Mantıksal Düşünme Becerileri',
        levels: {
            '3-4': [
                {
                    instruction: 'Sıradaki meyveyi bulup vagona yerleştir!',
                    sequence: ['🍎', '🍌', '🍎', '🍌', '🍎'],
                    patternDisplay: ['🍎', '🍌', '🍎', '🍌', '🍎', '❓'],
                    correctItem: '🍌',
                    options: ['🍌', '🍎', '🍇']
                },
                {
                    instruction: 'Sırada hangi renk top var?',
                    sequence: ['🔴', '🔵', '🔴', '🔵'],
                    patternDisplay: ['🔴', '🔵', '🔴', '🔵', '❓'],
                    correctItem: '🔴',
                    options: ['🔴', '🔵', '🟡']
                },
                {
                    instruction: 'Sıradaki sevimli hayvanı bul!',
                    sequence: ['🐱', '🐶', '🐱', '🐶'],
                    patternDisplay: ['🐱', '🐶', '🐱', '🐶', '❓'],
                    correctItem: '🐱',
                    options: ['🐱', '🐶', '🐰']
                }
            ],
            '4-5': [
                {
                    instruction: 'Sırada hangi şekil gelmeli?',
                    sequence: ['🔺', '🟨', '🔺', '🟨', '🔺'],
                    patternDisplay: ['🔺', '🟨', '🔺', '🟨', '🔺', '❓'],
                    correctItem: '🟨',
                    options: ['🟨', '🔺', '🔵', '⭐']
                },
                {
                    instruction: 'Örüntüyü tamamla: Elma - Çilek - Elma - Çilek - ?',
                    sequence: ['🍎', '🍓', '🍎', '🍓'],
                    patternDisplay: ['🍎', '🍓', '🍎', '🍓', '❓'],
                    correctItem: '🍎',
                    options: ['🍎', '🍓', '🍍', '🍉']
                },
                {
                    instruction: 'Güneş - Ay - Güneş - Ay - ? Sırada hangisi var?',
                    sequence: ['☀️', '🌙', '☀️', '🌙'],
                    patternDisplay: ['☀️', '🌙', '☀️', '🌙', '❓'],
                    correctItem: '☀️',
                    options: ['☀️', '🌙', '⭐', '☁️']
                }
            ],
            '5-6': [
                {
                    instruction: 'Karmaşık örüntüyü tamamla: Yıldız - Kalp - Daire - Yıldız - Kalp - ?',
                    sequence: ['⭐', '💖', '🟢', '⭐', '💖'],
                    patternDisplay: ['⭐', '💖', '🟢', '⭐', '💖', '❓'],
                    correctItem: '🟢',
                    options: ['🟢', '⭐', '💖', '🔷']
                },
                {
                    instruction: 'İkili örüntü: 2 Elma, 2 Muz, 2 Elma, 1 Muz...',
                    sequence: ['🍎', '🍎', '🍌', '🍌', '🍎', '🍎', '🍌'],
                    patternDisplay: ['🍎', '🍎', '🍌', '🍌', '🍎', '🍎', '🍌', '❓'],
                    correctItem: '🍌',
                    options: ['🍌', '🍎', '🍇', '🍒']
                },
                {
                    instruction: 'Kare - Üçgen - Daire - Kare - Üçgen - ?',
                    sequence: ['🟦', '🔺', '🟡', '🟦', '🔺'],
                    patternDisplay: ['🟦', '🔺', '🟡', '🟦', '🔺', '❓'],
                    correctItem: '🟡',
                    options: ['🟡', '🟦', '🔺', '🟩']
                }
            ]
        }
    },

    // 7. MANGALA - ÇUKUR TAŞ STRATEJİ OYUNU
    mangala: {
        id: 'mangala',
        title: 'Mangala - Taş Kale Oyunu',
        icon: '🪨',
        color: '#B45309',
        desc: 'Taşları doğru kalelere göndererek strateji kur!',
        maarifArea: 'Stratejik Düşünme & Sınıflandırma Becerileri'
    },

    // 8. TANGRAM - RENKLİ PARÇA YERLEŞTİRME
    tangram: {
        id: 'tangram',
        title: 'Tangram - Şekil Ustası',
        icon: '🧩',
        color: '#2563EB',
        desc: 'Renkli parçaları doğru yere yerleştirerek şekil oluştur!',
        maarifArea: 'Uzaysal Düşünme & Geometri Becerileri'
    },

    // 9. EMOJI SU DOKU (SUDOKU)
    sudoku: {
        id: 'sudoku',
        title: 'Emoji Su Doku',
        icon: '🧠',
        color: '#059669',
        desc: 'Her sıra ve sütuna doğru emojiyi yerleştir!',
        maarifArea: 'Mantıksal Çıkarım & Eleştirel Düşünme Becerileri'
    },

    // 10. ÜNLÜ HARFLER KÂŞİFİ (a, e, ı, i, o, ö, u, ü)
    vowels: {
        id: 'vowels',
        title: 'Ünlü Harfler Kâşifi',
        icon: '🔤',
        color: '#EC4899',
        desc: 'A, E, I, İ, O, Ö, U, Ü seslerini keşfet ve harfleri öğren!',
        maarifArea: 'Dil ve Erken Okuryazarlık Becerileri (Ses Farkındalığı)',
        levels: {
            '3-4': [
                {
                    instruction: '"Arı" hangi ünlü sesle başlar? Sesini dinle ve harfi seç!',
                    targetEmoji: '🐝',
                    word: 'Arı',
                    vowelSound: 'Aaaaa',
                    options: [
                        { letter: 'A', isCorrect: true },
                        { letter: 'E', isCorrect: false },
                        { letter: 'O', isCorrect: false }
                    ]
                },
                {
                    instruction: '"Elma" hangi ünlü harfle başlar?',
                    targetEmoji: '🍎',
                    word: 'Elma',
                    vowelSound: 'Eeee',
                    options: [
                        { letter: 'E', isCorrect: true },
                        { letter: 'A', isCorrect: false },
                        { letter: 'İ', isCorrect: false }
                    ]
                },
                {
                    instruction: '"İncir" hangi ünlü harfle başlar?',
                    targetEmoji: '🫐',
                    word: 'İncir',
                    vowelSound: 'İiii',
                    options: [
                        { letter: 'İ', isCorrect: true },
                        { letter: 'I', isCorrect: false },
                        { letter: 'Ö', isCorrect: false }
                    ]
                }
            ],
            '4-5': [
                {
                    instruction: '"Otobüs" sözcüğü hangi ünlü harfle başlar?',
                    targetEmoji: '🚌',
                    word: 'Otobüs',
                    vowelSound: 'Oooo',
                    options: [
                        { letter: 'O', isCorrect: true },
                        { letter: 'Ö', isCorrect: false },
                        { letter: 'U', isCorrect: false },
                        { letter: 'A', isCorrect: false }
                    ]
                },
                {
                    instruction: '"Ördek" hangi ünlü sesle başlar?',
                    targetEmoji: '🦆',
                    word: 'Ördek',
                    vowelSound: 'Öooo',
                    options: [
                        { letter: 'Ö', isCorrect: true },
                        { letter: 'O', isCorrect: false },
                        { letter: 'Ü', isCorrect: false },
                        { letter: 'E', isCorrect: false }
                    ]
                },
                {
                    instruction: '"Uçak" hangi ünlü sesle başlar?',
                    targetEmoji: '✈️',
                    word: 'Uçak',
                    vowelSound: 'Uuuu',
                    options: [
                        { letter: 'U', isCorrect: true },
                        { letter: 'Ü', isCorrect: false },
                        { letter: 'O', isCorrect: false },
                        { letter: 'A', isCorrect: false }
                    ]
                }
            ],
            '5-6': [
                {
                    instruction: '"Üzüm" hangi ünlü harfle başlar?',
                    targetEmoji: '🍇',
                    word: 'Üzüm',
                    vowelSound: 'Üuuu',
                    options: [
                        { letter: 'Ü', isCorrect: true },
                        { letter: 'U', isCorrect: false },
                        { letter: 'Ö', isCorrect: false },
                        { letter: 'İ', isCorrect: false }
                    ]
                },
                {
                    instruction: '"Ispanak" hangi ünlü harfle başlar?',
                    targetEmoji: '🥬',
                    word: 'Ispanak',
                    vowelSound: 'Iııı',
                    options: [
                        { letter: 'I', isCorrect: true },
                        { letter: 'İ', isCorrect: false },
                        { letter: 'A', isCorrect: false },
                        { letter: 'E', isCorrect: false }
                    ]
                },
                {
                    instruction: '"Işık" ve "Araba" seslerini düşün! Hangisi "A" harfiyle başlar?',
                    targetEmoji: '🚗',
                    word: 'Araba',
                    vowelSound: 'Aaaaa',
                    options: [
                        { letter: 'A', isCorrect: true },
                        { letter: 'I', isCorrect: false },
                        { letter: 'U', isCorrect: false },
                        { letter: 'Ü', isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 11. LABİRENT KÂŞİFİ
    maze: {
        id: 'maze',
        title: 'Labirent Kâşifi',
        icon: '🌀',
        color: '#10B981',
        desc: 'Engelleri aş, yıldızları topla ve hedefine doğru yön bul!',
        maarifArea: 'Uzamsal Düşünme & Yön Kavramları'
    },

    // 12. ROBOT ROLİ ERKEN KODLAMA (ALGORİTMA)
    coding: {
        id: 'coding',
        title: 'Robot Roli - Erken Kodlama',
        icon: '🤖',
        color: '#6366F1',
        desc: 'Komutları sırayla diz, algoritmanı kur ve Roli\'yi hedefe ulaştır!',
        maarifArea: 'Erken Kodlama & Algoritmik Düşünme'
    },

    // 13. SEVİMLİ HAFIZA KARTLARI (KART EŞLEME)
    memory: {
        id: 'memory',
        title: 'Sevimli Hafıza Kartları',
        icon: '🃏',
        color: '#F59E0B',
        desc: 'Kartları çevir, aynı sevimli çiftleri aklında tut ve eşleştir!',
        maarifArea: 'Görsel Hafıza & Odaklanma Becerileri'
    },

    // 14. AYNISINI YAP (MODEL KOPYALAMA)
    copyModel: {
        id: 'copyModel',
        title: 'Aynısını Yap',
        icon: '🪞',
        color: '#EC4899',
        desc: 'Örnek modeldeki renk ve şekillerin aynısını kendi tablona oluştur!',
        maarifArea: 'Görsel-Uzamsal Algı & Model Kopyalama'
    },

    // 15. KODLAMA ÖĞRENİYORUM (MATRİS & ŞEKİL KODLAMA)
    matrixCoding: {
        id: 'matrixCoding',
        title: 'Kodlama Öğreniyorum',
        icon: '📋',
        color: '#0284C7',
        desc: 'Örnek kod tablosundaki noktaları ve şekilleri kendi tablona kodla!',
        maarifArea: 'Matris & Koordinat Kodlama'
    }
};

// Maarif Modeli Kazanım Alanları (Ebeveyn ve Öğretmen Paneli için)
window.MAARIF_OUTCOMES = {
    'Bilişsel & Sanatsal Beceriler': {
        icon: '🎨',
        color: '#FF6B6B',
        desc: 'Geometrik şekilleri tanıma, adlandırma, ana ve ara renkleri ayırt etme ve estetik farkındalık.'
    },
    'Matematiksel Düşünme & Sayı Algısı': {
        icon: '🔢',
        color: '#4D96FF',
        desc: 'Birebir eşleme, 1-20 arası nesne sayma, nicelik-sayı ilişkisi kurma ve temel matematiksel akıl yürütme.'
    },
    'Bilişsel & Dil Becerileri (Kavramsal Gelişim)': {
        icon: '↔️',
        color: '#6BCB77',
        desc: 'Zıt kavramları (büyük/küçük, sıcak/soğuk) kavrama, mekânda konum belirleme (içinde/dışında, üstünde/altında).'
    },
    'Fen ve Doğa Becerileri & Çevre Duyarlılığı': {
        icon: '🌿',
        color: '#2EC4B6',
        desc: 'Canlı ve cansız varlıkları ayırt etme, yaşam alanlarını tanıma, geri dönüşüm ve çevre bilinci geliştirme.'
    },
    'Sosyo-Duygusal Beceriler & Değerler Eğitimi': {
        icon: '💖',
        color: '#FF9F45',
        desc: 'Temel duyguları tanıma ve ifade etme, empati kurma, nezaket kurallarına uyma ve paylaşma değerini benimseme.'
    },
    'Algoritmik & Mantıksal Düşünme Becerileri': {
        icon: '🚂',
        color: '#9B51E0',
        desc: 'Nesneler arası düzeni keşfetme, basit ve karmaşık örüntüleri tamamlama ve mantıksal sıralama yapma.'
    },
    'Stratejik Düşünme & Sınıflandırma Becerileri': {
        icon: '🪨',
        color: '#B45309',
        desc: 'Nesneleri özelliklerine göre gruplama, basit strateji kurma ve iki adımlı çıkarım yapma.'
    },
    'Uzaysal Düşünme & Geometri Becerileri': {
        icon: '🧩',
        color: '#2563EB',
        desc: 'Şekillerin uzaydaki konumunu ve birbirleriyle ilişkisini anlama, parça-bütün ilişkisi kurma.'
    },
    'Mantıksal Çıkarım & Eleştirel Düşünme Becerileri': {
        icon: '🧠',
        color: '#059669',
        desc: 'Kural tabanlı düşünme, eleme stratejisi kullanma ve çok değişkenli ilişkileri çözümleme.'
    },
    'Dil ve Erken Okuryazarlık Becerileri (Ses Farkındalığı)': {
        icon: '🔤',
        color: '#EC4899',
        desc: 'Ünlü sesleri (a, e, ı, i, o, ö, u, ü) işitsel ve görsel olarak ayırt etme, ses-harf farkındalığı kazanma.'
    },
    'Uzamsal Düşünme & Yön Kavramları': {
        icon: '🌀',
        color: '#10B981',
        desc: 'Yönleri tanıma (yukarı, aşağı, sağa, sola), engelleri aşarak hedefe ulaşma ve mekânsal problem çözme.'
    },
    'Erken Kodlama & Algoritmik Düşünme': {
        icon: '🤖',
        color: '#6366F1',
        desc: 'Adım adım komut dizilimi oluşturma, mantıksal sıralama, algoritmik yürütme ve hata ayıklama (debugging).'
    },
    'Görsel Hafıza & Odaklanma Becerileri': {
        icon: '🃏',
        color: '#F59E0B',
        desc: 'Görsel çalışma belleğini güçlendirme, nesnelerin konumunu hatırlama, dikkat yoğunlaştırma ve eşleştirme.'
    },
    'Görsel-Uzamsal Algı & Model Kopyalama': {
        icon: '🪞',
        color: '#EC4899',
        desc: 'Görsel modelleri inceleme, uzamsal konum ilişkilerini kavrama, desen kopyalama ve el-göz koordinasyonu.'
    },
    'Matris & Koordinat Kodlama': {
        icon: '📋',
        color: '#0284C7',
        desc: 'Tablo ve matris üzerinde satır-sütun koordinatlarını kavrama, simgesel şekilleri doğru hücrelere kodlama ve uzamsal dikkat geliştirme.'
    }
};
