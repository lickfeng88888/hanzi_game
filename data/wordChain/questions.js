// 组词接龙题库
window.gameData = {
    // 常用词库（初级）
    easy: {
        words: [
            {
                word: "学习",
                pinyin: "xué xí",
                meaning: "学习，获取知识和技能的过程"
            },
            {
                word: "习惯",
                pinyin: "xí guàn",
                meaning: "习惯，经常做的事形成的行为方式"
            },
            {
                word: "惯例",
                pinyin: "guàn lì",
                meaning: "惯例，约定俗成的规矩"
            },
            {
                word: "快乐",
                pinyin: "kuài lè",
                meaning: "快乐，心情愉快"
            },
            {
                word: "乐园",
                pinyin: "lè yuán",
                meaning: "乐园，游玩娱乐的场所"
            }
        ],
        hints: [
            "这个词与教育有关",
            "这个词描述日常行为",
            "这个词表示规矩",
            "这个词形容心情",
            "这个词是个地方名词"
        ]
    },
    
    // 成语词库（中级）
    medium: {
        words: [
            {
                word: "学而不厌",
                pinyin: "xué ér bù yàn",
                meaning: "形容学习时永不满足、永不厌倦的态度"
            },
            {
                word: "厌故喜新",
                pinyin: "yàn gù xǐ xīn",
                meaning: "讨厌旧的，喜欢新的"
            },
            {
                word: "新故相推",
                pinyin: "xīn gù xiāng tuī",
                meaning: "新事物和旧事物互相更替"
            },
            {
                word: "推陈出新",
                pinyin: "tuī chén chū xīn",
                meaning: "去掉旧的，创造新的"
            }
        ],
        hints: [
            "这个成语与学习态度有关",
            "这个成语描述对新旧事物的态度",
            "这个成语讲述事物的更替规律",
            "这个成语强调创新"
        ]
    },
    
    // 诗词词库（高级）
    hard: {
        words: [
            {
                word: "春花秋月",
                pinyin: "chūn huā qiū yuè",
                meaning: "春天的花，秋天的月亮，形容自然美景"
            },
            {
                word: "月明风清",
                pinyin: "yuè míng fēng qīng",
                meaning: "明亮的月光，清爽的风，形容夜晚美好的景色"
            },
            {
                word: "清风明月",
                pinyin: "qīng fēng míng yuè",
                meaning: "清爽的风，明亮的月亮，形容优美的夜景"
            },
            {
                word: "月上柳梢",
                pinyin: "yuè shàng liǔ shāo",
                meaning: "月亮升到柳树梢头，形容优美的夜景"
            }
        ],
        hints: [
            "这个词语描写春秋两季的景色",
            "这个词语描写月夜的景色",
            "这个词语也是描写月夜的景色",
            "这个词语特别描写月亮和柳树的关系"
        ]
    }
};

// 词语接龙规则检查函数
window.checkWordChain = function(prevWord, nextWord) {
    if (!prevWord || !nextWord) return false;
    
    // 获取前一个词的最后一个字
    const lastChar = prevWord.charAt(prevWord.length - 1);
    // 获取下一个词的第一个字
    const firstChar = nextWord.charAt(0);
    
    // 检查是否符合接龙规则
    return lastChar === firstChar;
};

// 获取词语解释
window.getWordExplanation = function(word, difficulty) {
    const wordList = gameData[difficulty].words;
    const foundWord = wordList.find(w => w.word === word);
    if (foundWord) {
        return {
            pinyin: foundWord.pinyin,
            meaning: foundWord.meaning
        };
    }
    return null;
};

// 获取提示
window.getHint = function(word, difficulty) {
    const wordList = gameData[difficulty].words;
    const index = wordList.findIndex(w => w.word === word);
    if (index !== -1) {
        return gameData[difficulty].hints[index];
    }
    return "没有找到相关提示";
};
