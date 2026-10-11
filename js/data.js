// Maarif Modeli Okul Öncesi Eğitim Veritabanı (3-6 Yaş Kademelerine Göre Yapılandırılmış)

window.MAARIF_DATA = {
    // 1. SEKIL VE RENKLER BAHCESI
    shapesColors: {
        id: 'shapesColors',
        title: 'Sekil ve Renkler Bahcesi',
        icon: '🎨',
        color: '#FF6B6B',
        desc: 'Geometrik sekilleri ve rengarenk dunyayi kesfet!',
        maarifArea: 'Bilissel & Sanatsal Beceriler',
        levels: {
            '3-4': [
                {
                    type: 'shape_find',
                    instruction: 'Mavi Daireyi bulup sepete tikla!',
                    targetShape: 'circle',
                    targetColor: '#4D96FF',
                    targetName: 'Mavi Daire',
                    options: [
                        { id: 1, shape: 'circle', color: '#4D96FF', name: 'Mavi Daire', isCorrect: true, emoji: '🔵' },
                        { id: 2, shape: 'square', color: '#FFD93D', name: 'Sari Kare', isCorrect: false, emoji: '🟨' },
                        { id: 3, shape: 'triangle', color: '#FF6B6B', name: 'Kirmizi Ucgen', isCorrect: false, emoji: '🔺' }
                    ]
                },
                {
                    type: 'color_find',
                    instruction: 'Kirmizi rengi bul ve dokun!',
                    targetColorName: 'Kirmizi',
                    options: [
                        { id: 1, color: '#FF6B6B', name: 'Kirmizi Elma', emoji: '🍎', isCorrect: true },
                        { id: 2, color: '#6BCB77', name: 'Yesil Kurbaga', emoji: '🐸', isCorrect: false },
                        { id: 3, color: '#4D96FF', name: 'Mavi Kelebek', emoji: '🦋', isCorrect: false }
                    ]
                },
                {
                    type: 'shape_find',
                    instruction: 'Sari Kareyi sec!',
                    targetShape: 'square',
                    targetColor: '#FFD93D',
                    targetName: 'Sari Kare',
                    options: [
                        { id: 1, shape: 'square', color: '#FFD93D', name: 'Sari Kare', isCorrect: true, emoji: '🟨' },
                        { id: 2, shape: 'circle', color: '#FF6B6B', name: 'Kirmizi Daire', isCorrect: false, emoji: '🔴' },
                        { id: 3, shape: 'triangle', color: '#6BCB77', name: 'Yesil Ucgen', isCorrect: false, emoji: '🟢' }
                    ]
                }
            ],
            '4-5': [
                {
                    type: 'shape_find',
                    instruction: 'Yesil Ucgeni bul ve sepete koy!',
                    targetShape: 'triangle',
                    targetColor: '#6BCB77',
                    targetName: 'Yesil Ucgen',
                    options: [
                        { id: 1, shape: 'triangle', color: '#6BCB77', name: 'Yesil Ucgen', isCorrect: true, emoji: '🔺' },
                        { id: 2, shape: 'rect', color: '#FF9F45', name: 'Turuncu Dikdortgen', isCorrect: false, emoji: '🟧' },
                        { id: 3, shape: 'circle', color: '#9B51E0', name: 'Mor Daire', isCorrect: false, emoji: '🟣' },
                        { id: 4, shape: 'square', color: '#4D96FF', name: 'Mavi Kare', isCorrect: false, emoji: '🟦' }
                    ]
                },
                {
                    type: 'shape_find',
                    instruction: 'Turuncu Dikdortgeni bul!',
                    targetShape: 'rect',
                    targetColor: '#FF9F45',
                    targetName: 'Turuncu Dikdortgen',
                    options: [
                        { id: 1, shape: 'rect', color: '#FF9F45', name: 'Turuncu Dikdortgen', isCorrect: true, emoji: '🟧' },
                        { id: 2, shape: 'circle', color: '#FF6B6B', name: 'Kirmizi Daire', isCorrect: false, emoji: '🔴' },
                        { id: 3, shape: 'star', color: '#FFD93D', name: 'Sari Yildiz', isCorrect: false, emoji: '⭐' },
                        { id: 4, shape: 'square', color: '#6BCB77', name: 'Yesil Kare', isCorrect: false, emoji: '🟩' }
                    ]
                },
                {
                    type: 'color_mix',
                    instruction: 'Mor rengi bul!',
                    targetColorName: 'Mor',
                    options: [
                        { id: 1, color: '#9B51E0', name: 'Mor Uzum', emoji: '🍇', isCorrect: true },
                        { id: 2, color: '#FFD93D', name: 'Sari Muz', emoji: '🍌', isCorrect: false },
                        { id: 3, color: '#FF9F45', name: 'Turuncu Portakal', emoji: '🍊', isCorrect: false },
                        { id: 4, color: '#FF6B6B', name: 'Kirmizi Cilek', emoji: '🍓', isCorrect: false }
                    ]
                }
            ],
            '5-6': [
                {
                    type: 'shape_find',
                    instruction: 'Parlayan Sari Yildizi bul!',
                    targetShape: 'star',
                    targetColor: '#FFD93D',
                    targetName: 'Sari Yildiz',
                    options: [
                        { id: 1, shape: 'star', color: '#FFD93D', name: 'Sari Yildiz', isCorrect: true, emoji: '⭐' },
                        { id: 2, shape: 'oval', color: '#FF6B6B', name: 'Kirmizi Oval', isCorrect: false, emoji: '🥚' },
                        { id: 3, shape: 'rect', color: '#4D96FF', name: 'Mavi Dikdortgen', isCorrect: false, emoji: '📘' },
                        { id: 4, shape: 'triangle', color: '#6BCB77', name: 'Yesil Ucgen', isCorrect: false, emoji: '🌲' }
                    ]
                },
                {
                    type: 'shape_find',
                    instruction: 'Hangi nesne Daire seklindedir?',
                    targetShape: 'circle',
                    options: [
                        { id: 1, name: 'Saat', emoji: '⏰', shapeType: 'circle', isCorrect: true },
                        { id: 2, name: 'Kapi', emoji: '🚪', shapeType: 'rect', isCorrect: false },
                        { id: 3, name: 'Kitap', emoji: '📖', shapeType: 'rect', isCorrect: false },
                        { id: 4, name: 'Piramit', emoji: '📐', shapeType: 'triangle', isCorrect: false }
                    ]
                },
                {
                    type: 'shape_find',
                    instruction: 'Hangi nesne Ucgen seklindedir?',
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
        title: 'Sayi ve Sayma Ormani',
        icon: '🔢',
        color: '#4D96FF',
        desc: 'Agactaki sevimli meyveleri say ve sayilari oren!',
        maarifArea: 'Matematiksel Dusunme & Sayi Algisi',
        levels: {
            '3-4': [
                { instruction: 'Agacta kac tane elma var? Say ve dogru sayiyi sec!', itemEmoji: '🍎', count: 3, options: [3, 1, 2] },
                { instruction: 'Kac tane sevimli tavsan var?', itemEmoji: '🐰', count: 2, options: [2, 4, 1] },
                { instruction: 'Goldeki ordekleri say!', itemEmoji: '🦆', count: 4, options: [4, 2, 5] }
            ],
            '4-5': [
                { instruction: 'Bahcedeki sevimli cilekleri say!', itemEmoji: '🍓', count: 6, options: [6, 4, 7, 5] },
                { instruction: 'Ucan kelebekleri say!', itemEmoji: '🦋', count: 8, options: [8, 6, 9, 7] },
                { instruction: 'Agactaki sari muzlari say!', itemEmoji: '🍌', count: 5, options: [5, 3, 6, 4] }
            ],
            '5-6': [
                { instruction: 'Gokyuzundeki parlayan yildizlari say!', itemEmoji: '⭐', count: 12, options: [12, 10, 14, 11] },
                { instruction: 'Cicek toplayan arilari say!', itemEmoji: '🐝', count: 9, options: [9, 8, 10, 7] },
                { instruction: 'Renkli balonlari say!', itemEmoji: '🎈', count: 15, options: [15, 12, 16, 13] }
            ]
        }
    },

    // 3. ZIT VE MEKANSAL KAVRAMLAR
    concepts: {
        id: 'concepts',
        title: 'Zit ve Mekan Kavramlari',
        icon: '↔️',
        color: '#6BCB77',
        desc: 'Buyuk-kucuk, sicak-soguk ve nerede oldugunu kesfet!',
        maarifArea: 'Bilissel & Dil Becerileri (Kavramsal Gelisim)',
        levels: {
            '3-4': [
                {
                    instruction: 'BUYUK olan fili sec!',
                    questionType: 'big_small',
                    options: [
                        { id: 1, name: 'Buyuk Fil', emoji: '🐘', size: 'big', isCorrect: true },
                        { id: 2, name: 'Kucuk Karinca', emoji: '🐜', size: 'small', isCorrect: false }
                    ]
                },
                {
                    instruction: 'SICAK olan nesneyi bul!',
                    questionType: 'hot_cold',
                    options: [
                        { id: 1, name: 'Sicak Gunes', emoji: '☀️', trait: 'hot', isCorrect: true },
                        { id: 2, name: 'Soguk Kardan Adam', emoji: '⛄', trait: 'cold', isCorrect: false }
                    ]
                },
                {
                    instruction: 'GUNDUZ gokyuzunu sec!',
                    questionType: 'day_night',
                    options: [
                        { id: 1, name: 'Gunduz (Gunes)', emoji: '🌞', trait: 'day', isCorrect: true },
                        { id: 2, name: 'Gece (Ay ve Yildizlar)', emoji: '🌙', trait: 'night', isCorrect: false }
                    ]
                }
            ],
            '4-5': [
                {
                    instruction: 'Kutunun ICINDE olan kediyi sec!',
                    questionType: 'spatial',
                    options: [
                        { id: 1, name: 'Kutunun Icinde Kedi', emoji: '📦🐱', trait: 'inside', isCorrect: true },
                        { id: 2, name: 'Kutunun Disinda Kedi', emoji: '🐱 📦', trait: 'outside', isCorrect: false }
                    ]
                },
                {
                    instruction: 'AGIR olan nesneyi sec!',
                    questionType: 'heavy_light',
                    options: [
                        { id: 1, name: 'Agir Kamyon', emoji: '🚚', trait: 'heavy', isCorrect: true },
                        { id: 2, name: 'Hafif Tuy', emoji: '🪶', trait: 'light', isCorrect: false }
                    ]
                },
                {
                    instruction: 'UZUN olan zurafayi sec!',
                    questionType: 'long_short',
                    options: [
                        { id: 1, name: 'Uzun Zurafa', emoji: '🦒', trait: 'tall', isCorrect: true },
                        { id: 2, name: 'Kisa Kirpi', emoji: '🦔', trait: 'short', isCorrect: false }
                    ]
                }
            ],
            '5-6': [
                {
                    instruction: 'Masanin USTUNDE olan elmay sec!',
                    questionType: 'spatial_advanced',
                    options: [
                        { id: 1, name: 'Masanin Ustunde', visual: 'top', text: 'Masanin Ustunde', isCorrect: true, emoji: '🍏⬆️' },
                        { id: 2, name: 'Masanin Altinda', visual: 'bottom', text: 'Masanin Altinda', isCorrect: false, emoji: '🍏⬇️' }
                    ]
                },
                {
                    instruction: 'HIZLI olan tasiti sec!',
                    questionType: 'fast_slow',
                    options: [
                        { id: 1, name: 'Hizli Ucak', emoji: '✈️', trait: 'fast', isCorrect: true },
                        { id: 2, name: 'Yavas Kaplumbaga', emoji: '🐢', trait: 'slow', isCorrect: false }
                    ]
                },
                {
                    instruction: 'ACIK olan kapiyi bul!',
                    questionType: 'open_close',
                    options: [
                        { id: 1, name: 'Acik Kapi', emoji: '🚪🔓', trait: 'open', isCorrect: true },
                        { id: 2, name: 'Kapali Kilitli Kapi', emoji: '🔒🚪', trait: 'closed', isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 4. DOGA, CEVRE & SIFIR ATIK KASIFI
    nature: {
        id: 'nature',
        title: 'Doga & Sifir Atik Kasifi',
        icon: '🌿',
        color: '#2EC4B6',
        desc: 'Canlilarin yuvalarini ve cevremizi korumay oren!',
        maarifArea: 'Fen ve Doga Becerileri & Cevre Duyarliligi',
        levels: {
            '3-4': [
                {
                    type: 'habitat',
                    instruction: 'Balik nerede yasar?',
                    animalEmoji: '🐠',
                    animalName: 'Balik',
                    options: [
                        { id: 1, name: 'Deniz / Su', emoji: '🌊', isCorrect: true },
                        { id: 2, name: 'Agac Dali', emoji: '🌳', isCorrect: false }
                    ]
                },
                {
                    type: 'habitat',
                    instruction: 'Kus nerede yasar ve ucar?',
                    animalEmoji: '🐦',
                    animalName: 'Kus',
                    options: [
                        { id: 1, name: 'Agac & Gokyuzu', emoji: '🌲🌤️', isCorrect: true },
                        { id: 2, name: 'Denizin Dibi', emoji: '🌊', isCorrect: false }
                    ]
                },
                {
                    type: 'care',
                    instruction: 'Cicegin buyumesi icin hangisine ihtiyaci vardir?',
                    target: 'Cicek',
                    targetEmoji: '🌱',
                    options: [
                        { id: 1, name: 'Su ve Gunes', emoji: '💧☀️', isCorrect: true },
                        { id: 2, name: 'Dondurma', emoji: '🍦', isCorrect: false }
                    ]
                }
            ],
            '4-5': [
                {
                    type: 'recycle',
                    instruction: 'Plastik siseyi hangi geri donusum kutusuna atmaliyiz?',
                    wasteEmoji: '🧴',
                    wasteName: 'Plastik Sise',
                    options: [
                        { id: 1, name: 'Plastik Kutusu', binColor: '#FFD93D', emoji: '🟡 PLASTiK', isCorrect: true },
                        { id: 2, name: 'Cam Kutusu', binColor: '#6BCB77', emoji: '🟢 CAM', isCorrect: false },
                        { id: 3, name: 'Kagit Kutusu', binColor: '#4D96FF', emoji: '🔵 KAGIT', isCorrect: false }
                    ]
                },
                {
                    type: 'recycle',
                    instruction: 'Eski gazete ve defteri hangi kutuya atmaliyiz?',
                    wasteEmoji: '📰',
                    wasteName: 'Kagit & Gazete',
                    options: [
                        { id: 1, name: 'Kagit Kutusu', binColor: '#4D96FF', emoji: '🔵 KAGIT', isCorrect: true },
                        { id: 2, name: 'Plastik Kutusu', binColor: '#FFD93D', emoji: '🟡 PLASTiK', isCorrect: false },
                        { id: 3, name: 'Cam Kutusu', binColor: '#6BCB77', emoji: '🟢 CAM', isCorrect: false }
                    ]
                },
                {
                    type: 'living_nonliving',
                    instruction: 'Hangisi CANLI bir varliektir?',
                    options: [
                        { id: 1, name: 'Kedi', emoji: '🐱', isCorrect: true },
                        { id: 2, name: 'Oyuncak Araba', emoji: '🚗', isCorrect: false },
                        { id: 3, name: 'Tas', emoji: '🪨', isCorrect: false }
                    ]
                }
            ],
            '5-6': [
                {
                    type: 'recycle',
                    instruction: 'Cam kavanozu hangi geri donusum kutusuna atmaliyiz?',
                    wasteEmoji: '🫙',
                    wasteName: 'Cam Kavanoz',
                    options: [
                        { id: 1, name: 'Yesil Cam Kutusu', binColor: '#6BCB77', emoji: '🟢 CAM', isCorrect: true },
                        { id: 2, name: 'Mavi Kagit Kutusu', binColor: '#4D96FF', emoji: '🔵 KAGIT', isCorrect: false },
                        { id: 3, name: 'Sari Plastik Kutusu', binColor: '#FFD93D', emoji: '🟡 PLASTiK', isCorrect: false }
                    ]
                },
                {
                    type: 'nature_care',
                    instruction: 'Temiz bir cevre icin hangisini yapmaliyiz?',
                    options: [
                        { id: 1, name: 'Copleri Cop Kutusuna Atmak', emoji: '🗑️✨', isCorrect: true },
                        { id: 2, name: 'Copleri Yere Atmak', emoji: '🚮❌', isCorrect: false },
                        { id: 3, name: 'Suyu Bosa Akitmak', emoji: '🚰❌', isCorrect: false }
                    ]
                },
                {
                    type: 'habitat_advanced',
                    instruction: 'Kutup Ayisi nerede yasar?',
                    animalEmoji: '🐻‍❄️',
                    animalName: 'Kutup Ayisi',
                    options: [
                        { id: 1, name: 'Karli Buzlu Kutup', emoji: '❄️🏔️', isCorrect: true },
                        { id: 2, name: 'Sicak Col', emoji: '🏜️☀️', isCorrect: false },
                        { id: 3, name: 'Derin Okyanus Dibi', emoji: '🌊🐠', isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 5. DUYGULAR VE NEZAKET ATOLYESI
    emotions: {
        id: 'emotions',
        title: 'Duygular ve Degerler Kulubu',
        icon: '💖',
        color: '#FF9F45',
        desc: 'Duygularimizi taniyalim, paylasmay ve nezaketi orenelim!',
        maarifArea: 'Sosyo-Duygusal Beceriler & Degerler Egitimi',
        levels: {
            '3-4': [
                {
                    instruction: 'MUTLU olan yuzu bul!',
                    targetEmotion: 'Mutlu',
                    options: [
                        { id: 1, name: 'Mutlu Yuz', emoji: '😄', emotion: 'happy', isCorrect: true },
                        { id: 2, name: 'Uzgun Yuz', emoji: '😢', emotion: 'sad', isCorrect: false }
                    ]
                },
                {
                    instruction: 'UZGUN olan yuzu bul!',
                    targetEmotion: 'Uzgun',
                    options: [
                        { id: 1, name: 'Uzgun Yuz', emoji: '😢', emotion: 'sad', isCorrect: true },
                        { id: 2, name: 'Mutlu Yuz', emoji: '😄', emotion: 'happy', isCorrect: false }
                    ]
                },
                {
                    instruction: 'SASIRMIS olan yuzu sec!',
                    targetEmotion: 'Saskin',
                    options: [
                        { id: 1, name: 'Saskin Yuz', emoji: '😲', emotion: 'surprised', isCorrect: true },
                        { id: 2, name: 'Uykulu Yuz', emoji: '😴', emotion: 'sleepy', isCorrect: false }
                    ]
                }
            ],
            '4-5': [
                {
                    instruction: 'Biri bize hediye verdiginde ne soleriz?',
                    scenario: 'Arkadasin sana guzel bir oyuncak hediye etti 🎁',
                    options: [
                        { id: 1, name: 'Tesekkur Ederim', emoji: '🙏 "Tesekkur Ederim"', isCorrect: true },
                        { id: 2, name: 'Bana Ne', emoji: '🙅 "Bana Ne"', isCorrect: false },
                        { id: 3, name: 'Kizgin Bakmak', emoji: '😠', isCorrect: false }
                    ]
                },
                {
                    instruction: 'Arkadasimizin canini yanlislikla acittigimizda ne soleriz?',
                    scenario: 'Yanlislikla arkadasina carptin...',
                    options: [
                        { id: 1, name: 'Ozur Dilerim', emoji: '🤝 "Ozur Dilerim"', isCorrect: true },
                        { id: 2, name: 'Gulup Kacmak', emoji: '🏃💨', isCorrect: false },
                        { id: 3, name: 'Kizmak', emoji: '😡', isCorrect: false }
                    ]
                },
                {
                    instruction: 'KIZGIN olan yuz ifadesini bul!',
                    targetEmotion: 'Kizgin',
                    options: [
                        { id: 1, name: 'Kizgin Yuz', emoji: '😠', emotion: 'angry', isCorrect: true },
                        { id: 2, name: 'Mutlu Yuz', emoji: '😊', emotion: 'happy', isCorrect: false },
                        { id: 3, name: 'Sakin Yuz', emoji: '😌', emotion: 'calm', isCorrect: false }
                    ]
                }
            ],
            '5-6': [
                {
                    instruction: 'Birinden bir sey isterken hangi nezaket sozcugunu kullaniriz?',
                    scenario: 'Kalemi odunc almak istiyorsun...',
                    options: [
                        { id: 1, name: 'Lutfen verebilir misin?', emoji: '✨ "Lutfen"', isCorrect: true },
                        { id: 2, name: 'Hemen ver bana!', emoji: '⚡ "Ver hemen"', isCorrect: false },
                        { id: 3, name: 'Cekip almak', emoji: '✋❌', isCorrect: false }
                    ]
                },
                {
                    instruction: 'Arkadasin oyuncagini bulamayin uzulmus. Ne yapmalsin?',
                    scenario: 'Uzgun arkadasina yardim etmek...',
                    options: [
                        { id: 1, name: 'Yardim edip birlikte aramak', emoji: '🤗 Birlikte Arayalim', isCorrect: true },
                        { id: 2, name: 'Gormezden gelmek', emoji: '🙈 Umursamamak', isCorrect: false },
                        { id: 3, name: 'Ona gulme', emoji: '😆 Dalga Gecmek', isCorrect: false }
                    ]
                },
                {
                    instruction: 'Oyuncagini arkadasinla PAYLASMAK sence nasil bir davranistir?',
                    scenario: 'Birlikte legolarla kule yapiyorsunuz 🏰',
                    options: [
                        { id: 1, name: 'Harika ve Guzel Bir Davranis', emoji: '🌟 Cok Guzel', isCorrect: true },
                        { id: 2, name: 'Kotu Bir Davranis', emoji: '👎 Kotu', isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 6. SIHIRLI ORUNTU TRENI
    pattern: {
        id: 'pattern',
        title: 'Sihirli Oruntu Treni',
        icon: '🚂',
        color: '#9B51E0',
        desc: 'Vagonlardaki sirayi takip et, eksik sekli veya meyveyi bul!',
        maarifArea: 'Algoritmik & Mantiksal Dusunme Becerileri',
        levels: {
            '3-4': [
                {
                    instruction: 'Siradaki meyveyi bulup vagona yerleistir!',
                    sequence: ['🍎', '🍌', '🍎', '🍌', '🍎'],
                    patternDisplay: ['🍎', '🍌', '🍎', '🍌', '🍎', '❓'],
                    correctItem: '🍌',
                    options: ['🍌', '🍎', '🍇']
                },
                {
                    instruction: 'Sirada hangi renk top var?',
                    sequence: ['🔴', '🔵', '🔴', '🔵'],
                    patternDisplay: ['🔴', '🔵', '🔴', '🔵', '❓'],
                    correctItem: '🔴',
                    options: ['🔴', '🔵', '🟡']
                },
                {
                    instruction: 'Siradaki sevimli hayvani bul!',
                    sequence: ['🐱', '🐶', '🐱', '🐶'],
                    patternDisplay: ['🐱', '🐶', '🐱', '🐶', '❓'],
                    correctItem: '🐱',
                    options: ['🐱', '🐶', '🐰']
                }
            ],
            '4-5': [
                {
                    instruction: 'Sirada hangi sekil gelmeli?',
                    sequence: ['🔺', '🟨', '🔺', '🟨', '🔺'],
                    patternDisplay: ['🔺', '🟨', '🔺', '🟨', '🔺', '❓'],
                    correctItem: '🟨',
                    options: ['🟨', '🔺', '🔵', '⭐']
                },
                {
                    instruction: 'Oruntu tamamla: Elma - Cilek - Elma - Cilek - ?',
                    sequence: ['🍎', '🍓', '🍎', '🍓'],
                    patternDisplay: ['🍎', '🍓', '🍎', '🍓', '❓'],
                    correctItem: '🍎',
                    options: ['🍎', '🍓', '🍍', '🍉']
                },
                {
                    instruction: 'Gunes - Ay - Gunes - Ay - ? Sirada hangisi var?',
                    sequence: ['☀️', '🌙', '☀️', '🌙'],
                    patternDisplay: ['☀️', '🌙', '☀️', '🌙', '❓'],
                    correctItem: '☀️',
                    options: ['☀️', '🌙', '⭐', '☁️']
                }
            ],
            '5-6': [
                {
                    instruction: 'Karmasi orontu: Yildiz - Kalp - Daire - Yildiz - Kalp - ?',
                    sequence: ['⭐', '💖', '🟢', '⭐', '💖'],
                    patternDisplay: ['⭐', '💖', '🟢', '⭐', '💖', '❓'],
                    correctItem: '🟢',
                    options: ['🟢', '⭐', '💖', '🔷']
                },
                {
                    instruction: 'Ikili orontu: 2 Elma, 2 Muz, 2 Elma, 1 Muz...',
                    sequence: ['🍎', '🍎', '🍌', '🍌', '🍎', '🍎', '🍌'],
                    patternDisplay: ['🍎', '🍎', '🍌', '🍌', '🍎', '🍎', '🍌', '❓'],
                    correctItem: '🍌',
                    options: ['🍌', '🍎', '🍇', '🍒']
                },
                {
                    instruction: 'Kare - Ucgen - Daire - Kare - Ucgen - ?',
                    sequence: ['🟦', '🔺', '🟡', '🟦', '🔺'],
                    patternDisplay: ['🟦', '🔺', '🟡', '🟦', '🔺', '❓'],
                    correctItem: '🟡',
                    options: ['🟡', '🟦', '🔺', '🟩']
                }
            ]
        }
    },

    // 7. MANGALA - CUKUR TAS STRATEJI OYUNU
    mangala: {
        id: 'mangala',
        title: 'Mangala - Tas Kale Oyunu',
        icon: '🪨',
        color: '#B45309',
        desc: 'Taslari dogru kalelere gondererek strateji kur!',
        maarifArea: 'Stratejik Dusunme & Siniflandirma Becerileri'
    },

    // 8. TANGRAM - RENKLI PARCA YERLISTIRME
    tangram: {
        id: 'tangram',
        title: 'Tangram - Sekil Ustasi',
        icon: '🧩',
        color: '#2563EB',
        desc: 'Renkli parcalari dogru yere yerlistirerek sekil olustur!',
        maarifArea: 'Uzaysal Dusunme & Geometri Becerileri'
    },

    // 9. EMOJI SU DOKU (SUDOKU)
    sudoku: {
        id: 'sudoku',
        title: 'Emoji Su Doku',
        icon: '🧠',
        color: '#059669',
        desc: 'Her sira ve sutuna dogru emojiyi yerlistir!',
        maarifArea: 'Mantiksal Cikari & Elestirel Dusunme Becerileri'
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
    }
};

// Maarif Modeli Kazanim Alanlari (Ebeveyn ve Ogretmen Paneli icin)
window.MAARIF_OUTCOMES = {
    'Bilissel & Sanatsal Beceriler': {
        icon: '🎨',
        color: '#FF6B6B',
        desc: 'Geometrik sekilleri tanima, adlandirma, ana ve ara renkleri ayirt etme ve estetik farkindalik.'
    },
    'Matematiksel Dusunme & Sayi Algisi': {
        icon: '🔢',
        color: '#4D96FF',
        desc: 'Birebir esleme, 1-20 arasi nesne sayma, nicelik-sayi iliskisi kurma ve temel matematiksel akil yurutme.'
    },
    'Bilissel & Dil Becerileri (Kavramsal Gelisim)': {
        icon: '↔️',
        color: '#6BCB77',
        desc: 'Zit kavramlari (buyuk/kucuk, sicak/soguk) kavrama, mekanda konum belirleme (icinde/disinda, ustunde/altinda).'
    },
    'Fen ve Doga Becerileri & Cevre Duyarliligi': {
        icon: '🌿',
        color: '#2EC4B6',
        desc: 'Canli ve cansiz varliklari ayirt etme, yasam alanlarini tanima, geri dorusum ve cevre bilinci gelistirme.'
    },
    'Sosyo-Duygusal Beceriler & Degerler Egitimi': {
        icon: '💖',
        color: '#FF9F45',
        desc: 'Temel duygulari tanima ve ifade etme, empati kurma, nezaket kurallarina uyma ve paylasma degerini benimseme.'
    },
    'Algoritmik & Mantiksal Dusunme Becerileri': {
        icon: '🚂',
        color: '#9B51E0',
        desc: 'Nesneler arasi duzeni kesfetme, basit ve karmasi orontuler tamamlama ve mantiksal siralama yapma.'
    },
    'Stratejik Dusunme & Siniflandirma Becerileri': {
        icon: '🪨',
        color: '#B45309',
        desc: 'Nesneleri ozelliklerine gore gruplama, basit strateji kurma ve iki adimli cikari yapma.'
    },
    'Uzaysal Dusunme & Geometri Becerileri': {
        icon: '🧩',
        color: '#2563EB',
        desc: 'Sekillerin uzaydaki konumunu ve birbirleriyle iliskisini anlama, parca-butun iliskisi kurma.'
    },
    'Mantiksal Cikari & Elestirel Dusunme Becerileri': {
        icon: '🧠',
        color: '#059669',
        desc: 'Kural tabanli dusunme, eliminasyon stratejisi kullanma ve cok degiskenli iliskileri cozumleme.'
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
    }
};

