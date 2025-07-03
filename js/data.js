// Data for Nihongo Support System

// Lessons data by level
const lessonsData = {
    beginner: [
        {
            id: 'n5_01',
            number: 1,
            title: 'Chào hỏi cơ bản',
            description: 'Học cách chào hỏi và giới thiệu bản thân',
            topics: ['あいさつ', 'じこしょうかい', 'Hiragana'],
            progress: 0,
            content: {
                vocabulary: [
                    { japanese: 'こんにちは', reading: 'konnichiwa', meaning: 'Xin chào' },
                    { japanese: 'はじめまして', reading: 'hajimemashite', meaning: 'Rất vui được gặp bạn' },
                    { japanese: 'よろしく', reading: 'yoroshiku', meaning: 'Rất mong được giúp đỡ' }
                ],
                grammar: [
                    {
                        pattern: 'わたしは [name] です',
                        meaning: 'Tôi là [tên]',
                        example: 'わたしは田中です (Watashi wa Tanaka desu - Tôi là Tanaka)'
                    }
                ],
                conversations: [
                    {
                        title: 'Gặp gỡ lần đầu',
                        dialogue: [
                            { speaker: 'A', text: 'はじめまして。田中です。', meaning: 'Rất vui được gặp bạn. Tôi là Tanaka.' },
                            { speaker: 'B', text: 'はじめまして。山田です。よろしくお願いします。', meaning: 'Rất vui được gặp bạn. Tôi là Yamada. Rất mong được giúp đỡ.' }
                        ]
                    }
                ]
            }
        },
        {
            id: 'n5_02',
            number: 2,
            title: 'Số đếm và thời gian',
            description: 'Học cách đếm số và nói thời gian',
            topics: ['すうじ', 'じかん', 'Số đếm'],
            progress: 0,
            content: {
                vocabulary: [
                    { japanese: 'いち', reading: 'ichi', meaning: 'một' },
                    { japanese: 'に', reading: 'ni', meaning: 'hai' },
                    { japanese: 'さん', reading: 'san', meaning: 'ba' },
                    { japanese: 'よん', reading: 'yon', meaning: 'bốn' },
                    { japanese: 'ご', reading: 'go', meaning: 'năm' }
                ]
            }
        },
        {
            id: 'n5_03',
            number: 3,
            title: 'Gia đình và mối quan hệ',
            description: 'Từ vựng về gia đình và các mối quan hệ',
            topics: ['かぞく', 'Gia đình', 'Mối quan hệ'],
            progress: 0,
            content: {
                vocabulary: [
                    { japanese: 'おとうさん', reading: 'otousan', meaning: 'bố (lịch sự)' },
                    { japanese: 'おかあさん', reading: 'okaasan', meaning: 'mẹ (lịch sự)' },
                    { japanese: 'あに', reading: 'ani', meaning: 'anh trai (của tôi)' },
                    { japanese: 'あね', reading: 'ane', meaning: 'chị gái (của tôi)' }
                ]
            }
        }
    ],
    intermediate: [
        {
            id: 'n3_01',
            number: 1,
            title: 'Ngữ pháp phức tạp',
            description: 'Học các cấu trúc ngữ pháp nâng cao',
            topics: ['ぶんぽう', 'Ngữ pháp', 'N3'],
            progress: 0
        },
        {
            id: 'n3_02',
            number: 2,
            title: 'Kanji nâng cao',
            description: 'Học và ghi nhớ Kanji phức tạp',
            topics: ['かんじ', 'Kanji', 'Viết'],
            progress: 0
        }
    ],
    advanced: [
        {
            id: 'n1_01',
            number: 1,
            title: 'Tiếng Nhật kinh doanh',
            description: 'Học tiếng Nhật trong môi trường công việc',
            topics: ['ビジネス', 'Kinh doanh', 'Keigo'],
            progress: 0
        }
    ]
};

// Alphabet data
const alphabetData = {
    hiragana: [
        { character: 'あ', romaji: 'a' },
        { character: 'い', romaji: 'i' },
        { character: 'う', romaji: 'u' },
        { character: 'え', romaji: 'e' },
        { character: 'お', romaji: 'o' },
        { character: 'か', romaji: 'ka' },
        { character: 'き', romaji: 'ki' },
        { character: 'く', romaji: 'ku' },
        { character: 'け', romaji: 'ke' },
        { character: 'こ', romaji: 'ko' },
        { character: 'さ', romaji: 'sa' },
        { character: 'し', romaji: 'shi' },
        { character: 'す', romaji: 'su' },
        { character: 'せ', romaji: 'se' },
        { character: 'そ', romaji: 'so' },
        { character: 'た', romaji: 'ta' },
        { character: 'ち', romaji: 'chi' },
        { character: 'つ', romaji: 'tsu' },
        { character: 'て', romaji: 'te' },
        { character: 'と', romaji: 'to' },
        { character: 'な', romaji: 'na' },
        { character: 'に', romaji: 'ni' },
        { character: 'ぬ', romaji: 'nu' },
        { character: 'ね', romaji: 'ne' },
        { character: 'の', romaji: 'no' },
        { character: 'は', romaji: 'ha' },
        { character: 'ひ', romaji: 'hi' },
        { character: 'ふ', romaji: 'fu' },
        { character: 'へ', romaji: 'he' },
        { character: 'ほ', romaji: 'ho' },
        { character: 'ま', romaji: 'ma' },
        { character: 'み', romaji: 'mi' },
        { character: 'む', romaji: 'mu' },
        { character: 'め', romaji: 'me' },
        { character: 'も', romaji: 'mo' },
        { character: 'や', romaji: 'ya' },
        { character: 'ゆ', romaji: 'yu' },
        { character: 'よ', romaji: 'yo' },
        { character: 'ら', romaji: 'ra' },
        { character: 'り', romaji: 'ri' },
        { character: 'る', romaji: 'ru' },
        { character: 'れ', romaji: 're' },
        { character: 'ろ', romaji: 'ro' },
        { character: 'わ', romaji: 'wa' },
        { character: 'を', romaji: 'wo' },
        { character: 'ん', romaji: 'n' }
    ],
    katakana: [
        { character: 'ア', romaji: 'a' },
        { character: 'イ', romaji: 'i' },
        { character: 'ウ', romaji: 'u' },
        { character: 'エ', romaji: 'e' },
        { character: 'オ', romaji: 'o' },
        { character: 'カ', romaji: 'ka' },
        { character: 'キ', romaji: 'ki' },
        { character: 'ク', romaji: 'ku' },
        { character: 'ケ', romaji: 'ke' },
        { character: 'コ', romaji: 'ko' },
        { character: 'サ', romaji: 'sa' },
        { character: 'シ', romaji: 'shi' },
        { character: 'ス', romaji: 'su' },
        { character: 'セ', romaji: 'se' },
        { character: 'ソ', romaji: 'so' },
        { character: 'タ', romaji: 'ta' },
        { character: 'チ', romaji: 'chi' },
        { character: 'ツ', romaji: 'tsu' },
        { character: 'テ', romaji: 'te' },
        { character: 'ト', romaji: 'to' },
        { character: 'ナ', romaji: 'na' },
        { character: 'ニ', romaji: 'ni' },
        { character: 'ヌ', romaji: 'nu' },
        { character: 'ネ', romaji: 'ne' },
        { character: 'ノ', romaji: 'no' },
        { character: 'ハ', romaji: 'ha' },
        { character: 'ヒ', romaji: 'hi' },
        { character: 'フ', romaji: 'fu' },
        { character: 'ヘ', romaji: 'he' },
        { character: 'ホ', romaji: 'ho' },
        { character: 'マ', romaji: 'ma' },
        { character: 'ミ', romaji: 'mi' },
        { character: 'ム', romaji: 'mu' },
        { character: 'メ', romaji: 'me' },
        { character: 'モ', romaji: 'mo' },
        { character: 'ヤ', romaji: 'ya' },
        { character: 'ユ', romaji: 'yu' },
        { character: 'ヨ', romaji: 'yo' },
        { character: 'ラ', romaji: 'ra' },
        { character: 'リ', romaji: 'ri' },
        { character: 'ル', romaji: 'ru' },
        { character: 'レ', romaji: 're' },
        { character: 'ロ', romaji: 'ro' },
        { character: 'ワ', romaji: 'wa' },
        { character: 'ヲ', romaji: 'wo' },
        { character: 'ン', romaji: 'n' }
    ]
};

// Vocabulary data by category
const vocabularyData = {
    basic: [
        {
            japanese: 'こんにちは',
            reading: 'konnichiwa',
            meaning: 'Xin chào',
            example: {
                japanese: 'こんにちは、田中さん。',
                meaning: 'Xin chào anh Tanaka.'
            }
        },
        {
            japanese: 'ありがとう',
            reading: 'arigatou',
            meaning: 'Cảm ơn',
            example: {
                japanese: 'ありがとうございます。',
                meaning: 'Cảm ơn rất nhiều.'
            }
        },
        {
            japanese: 'すみません',
            reading: 'sumimasen',
            meaning: 'Xin lỗi / Xin phép',
            example: {
                japanese: 'すみません、駅はどこですか。',
                meaning: 'Xin lỗi, ga tàu ở đâu ạ?'
            }
        },
        {
            japanese: 'はい',
            reading: 'hai',
            meaning: 'Vâng / Có',
            example: {
                japanese: 'はい、わかりました。',
                meaning: 'Vâng, tôi hiểu rồi.'
            }
        },
        {
            japanese: 'いいえ',
            reading: 'iie',
            meaning: 'Không',
            example: {
                japanese: 'いいえ、違います。',
                meaning: 'Không, không phải.'
            }
        }
    ],
    family: [
        {
            japanese: 'かぞく',
            reading: 'kazoku',
            meaning: 'Gia đình',
            example: {
                japanese: 'わたしの家族は四人です。',
                meaning: 'Gia đình tôi có bốn người.'
            }
        },
        {
            japanese: 'おとうさん',
            reading: 'otousan',
            meaning: 'Bố (kính ngữ)',
            example: {
                japanese: 'お父さんは会社員です。',
                meaning: 'Bố tôi là nhân viên công ty.'
            }
        },
        {
            japanese: 'おかあさん',
            reading: 'okaasan',
            meaning: 'Mẹ (kính ngữ)',
            example: {
                japanese: 'お母さんは料理が上手です。',
                meaning: 'Mẹ tôi nấu ăn rất giỏi.'
            }
        },
        {
            japanese: 'あに',
            reading: 'ani',
            meaning: 'Anh trai',
            example: {
                japanese: '兄は大学生です。',
                meaning: 'Anh trai tôi là sinh viên đại học.'
            }
        },
        {
            japanese: 'あね',
            reading: 'ane',
            meaning: 'Chị gái',
            example: {
                japanese: '姉は看護師です。',
                meaning: 'Chị gái tôi là y tá.'
            }
        }
    ],
    food: [
        {
            japanese: 'たべもの',
            reading: 'tabemono',
            meaning: 'Thức ăn',
            example: {
                japanese: '日本の食べ物は美味しいです。',
                meaning: 'Thức ăn Nhật Bản rất ngon.'
            }
        },
        {
            japanese: 'すし',
            reading: 'sushi',
            meaning: 'Sushi',
            example: {
                japanese: 'すしを食べました。',
                meaning: 'Tôi đã ăn sushi.'
            }
        },
        {
            japanese: 'らーめん',
            reading: 'raamen',
            meaning: 'Ramen',
            example: {
                japanese: 'ラーメンが大好きです。',
                meaning: 'Tôi rất thích ramen.'
            }
        },
        {
            japanese: 'みず',
            reading: 'mizu',
            meaning: 'Nước',
            example: {
                japanese: '水を飲みます。',
                meaning: 'Tôi uống nước.'
            }
        },
        {
            japanese: 'おちゃ',
            reading: 'ocha',
            meaning: 'Trà',
            example: {
                japanese: 'お茶をください。',
                meaning: 'Cho tôi xin trà.'
            }
        }
    ],
    travel: [
        {
            japanese: 'りょこう',
            reading: 'ryokou',
            meaning: 'Du lịch',
            example: {
                japanese: '来月旅行します。',
                meaning: 'Tháng sau tôi sẽ đi du lịch.'
            }
        },
        {
            japanese: 'えき',
            reading: 'eki',
            meaning: 'Ga tàu',
            example: {
                japanese: '駅で待っています。',
                meaning: 'Tôi đang đợi ở ga tàu.'
            }
        },
        {
            japanese: 'ひこうき',
            reading: 'hikouki',
            meaning: 'Máy bay',
            example: {
                japanese: '飛行機で行きます。',
                meaning: 'Tôi sẽ đi bằng máy bay.'
            }
        },
        {
            japanese: 'ホテル',
            reading: 'hoteru',
            meaning: 'Khách sạn',
            example: {
                japanese: 'ホテルに泊まります。',
                meaning: 'Tôi sẽ ở khách sạn.'
            }
        },
        {
            japanese: 'みち',
            reading: 'michi',
            meaning: 'Đường',
            example: {
                japanese: 'この道を行ってください。',
                meaning: 'Xin hãy đi theo con đường này.'
            }
        }
    ]
};

// Grammar data
const grammarData = [
    {
        title: 'です/である - Động từ "là"',
        pattern: '[Danh từ] + です',
        explanation: 'Dùng để khẳng định hoặc miêu tả. です lịch sự hơn である.',
        examples: [
            {
                japanese: 'わたしは学生です。',
                meaning: 'Tôi là học sinh.'
            },
            {
                japanese: 'これは本です。',
                meaning: 'Đây là quyển sách.'
            }
        ]
    },
    {
        title: 'は (wa) - Trợ từ chỉ chủ đề',
        pattern: '[Chủ đề] + は + [Vị ngữ]',
        explanation: 'Đánh dấu chủ đề của câu. Đọc là "wa" chứ không phải "ha".',
        examples: [
            {
                japanese: 'わたしは田中です。',
                meaning: 'Tôi là Tanaka.'
            },
            {
                japanese: '今日は暑いです。',
                meaning: 'Hôm nay trời nóng.'
            }
        ]
    },
    {
        title: 'を (wo) - Trợ từ chỉ tân ngữ',
        pattern: '[Tân ngữ] + を + [Động từ]',
        explanation: 'Đánh dấu tân ngữ trực tiếp của động từ.',
        examples: [
            {
                japanese: 'りんごを食べます。',
                meaning: 'Tôi ăn táo.'
            },
            {
                japanese: '本を読みます。',
                meaning: 'Tôi đọc sách.'
            }
        ]
    },
    {
        title: 'に - Trợ từ chỉ thời gian và địa điểm',
        pattern: '[Thời gian/Địa điểm] + に',
        explanation: 'Chỉ thời gian cụ thể hoặc điểm đến của hành động.',
        examples: [
            {
                japanese: '七時に起きます。',
                meaning: 'Tôi thức dậy lúc 7 giờ.'
            },
            {
                japanese: '学校に行きます。',
                meaning: 'Tôi đi đến trường.'
            }
        ]
    }
];

// Kanji data by level
const kanjiData = {
    n5: [
        {
            character: '人',
            readings: {
                onyomi: ['ジン', 'ニン'],
                kunyomi: ['ひと']
            },
            meaning: 'người',
            strokeCount: 2,
            examples: [
                { word: '人', reading: 'ひと', meaning: 'người' },
                { word: '日本人', reading: 'にほんじん', meaning: 'người Nhật' }
            ]
        },
        {
            character: '日',
            readings: {
                onyomi: ['ニチ', 'ジツ'],
                kunyomi: ['ひ', 'か']
            },
            meaning: 'ngày, mặt trời',
            strokeCount: 4,
            examples: [
                { word: '今日', reading: 'きょう', meaning: 'hôm nay' },
                { word: '日本', reading: 'にほん', meaning: 'Nhật Bản' }
            ]
        },
        {
            character: '本',
            readings: {
                onyomi: ['ホン'],
                kunyomi: ['もと']
            },
            meaning: 'sách, gốc',
            strokeCount: 5,
            examples: [
                { word: '本', reading: 'ほん', meaning: 'sách' },
                { word: '日本', reading: 'にほん', meaning: 'Nhật Bản' }
            ]
        }
    ],
    n4: [
        {
            character: '勉',
            readings: {
                onyomi: ['ベン'],
                kunyomi: []
            },
            meaning: 'cố gắng',
            strokeCount: 10,
            examples: [
                { word: '勉強', reading: 'べんきょう', meaning: 'học tập' }
            ]
        }
    ]
};

// Flashcard data
const flashcardData = {
    vocabulary: [
        {
            id: 'vocab_1',
            front: 'こんにちは',
            back: 'Xin chào',
            explanation: 'Lời chào cơ bản, dùng từ 10h sáng đến 6h chiều'
        },
        {
            id: 'vocab_2',
            front: 'ありがとう',
            back: 'Cảm ơn',
            explanation: 'Cách cảm ơn thông thường, thêm ございます để lịch sự hơn'
        }
    ],
    kanji: [
        {
            id: 'kanji_1',
            front: '人',
            back: 'ひと (người)',
            explanation: 'Kanji cơ bản, 2 nét vẽ, hình dáng như một người đang đi'
        }
    ],
    grammar: [
        {
            id: 'grammar_1',
            front: 'わたしは田中です',
            back: 'Tôi là Tanaka',
            explanation: 'Cấu trúc cơ bản: [Chủ ngữ] は [Danh từ] です'
        }
    ]
};

// Functions to get data
function getLessonsData(level) {
    return lessonsData[level] || [];
}

function getAlphabetData(type) {
    return alphabetData[type] || [];
}

function getVocabularyData(category) {
    return vocabularyData[category] || [];
}

function getGrammarData() {
    return grammarData;
}

function getKanjiData(level) {
    return kanjiData[level] || [];
}

function getFlashcardData(type) {
    return flashcardData[type] || [];
}

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getLessonsData,
        getAlphabetData,
        getVocabularyData,
        getGrammarData,
        getKanjiData,
        getFlashcardData,
        lessonsData,
        alphabetData,
        vocabularyData,
        grammarData,
        kanjiData,
        flashcardData
    };
}
