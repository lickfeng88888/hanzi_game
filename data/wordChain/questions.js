// 组词接龙题库
window.gameData = {
    // 常用词库（初级）
    easy: {
        words: [
            {
                word: "学习",
                pinyin: "xué xí",
                meaning: "学习，获取知识和技能的过程",
                examples: ["学习态度", "学习方法", "学习成绩"],
                relatedWords: ["学生", "学校", "学问"]
            },
            {
                word: "习惯",
                pinyin: "xí guàn",
                meaning: "经常做的事形成的行为方式",
                examples: ["生活习惯", "习惯性", "养成习惯"],
                relatedWords: ["习性", "习俗", "习题"]
            },
            {
                word: "快乐",
                pinyin: "kuài lè",
                meaning: "心情愉快，感到高兴",
                examples: ["快乐生活", "快乐学习", "快乐工作"],
                relatedWords: ["快活", "快速", "欢乐"]
            },
            {
                word: "乐园",
                pinyin: "lè yuán",
                meaning: "供人游玩娱乐的场所",
                examples: ["游乐园", "乐园生活", "欢乐乐园"],
                relatedWords: ["乐土", "乐趣", "乐观"]
            },
            {
                word: "园林",
                pinyin: "yuán lín",
                meaning: "经过园艺设计的花园或公园",
                examples: ["园林设计", "园林景观", "园林工程"],
                relatedWords: ["园艺", "园丁", "花园"]
            },
            {
                word: "林间",
                pinyin: "lín jiān",
                meaning: "树林中间",
                examples: ["林间小道", "林间漫步", "林间空地"],
                relatedWords: ["林地", "林木", "森林"]
            }
        ],
        hints: [
            "这是一个与教育学习相关的词语，日常生活中经常用到",
            "这个词描述一个人养成的行为方式，与日常生活密切相关",
            "这个词形容一个人心情愉悦的状态",
            "这个词指一个供人游玩的地方",
            "这个词与自然景观和建筑设计有关",
            "这个词描述树林中的场景"
        ],
        rules: [
            "每个词语都是由两个汉字组成",
            "需要用上一个词语的最后一个字作为下一个词语的第一个字",
            "所有词语都是日常生活中常用的词汇"
        ]
    },
    
    // 成语词库（中级）
    medium: {
        words: [
            {
                word: "学而不厌",
                pinyin: "xué ér bù yàn",
                meaning: "形容学习时永不满足、永不厌倦的态度",
                examples: ["他学而不厌的精神值得我们学习"],
                relatedWords: ["学无止境", "学以致用", "好学不倦"]
            },
            {
                word: "厌故喜新",
                pinyin: "yàn gù xǐ xīn",
                meaning: "讨厌旧的，喜欢新的",
                examples: ["人们常有厌故喜新的心理"],
                relatedWords: ["喜新厌旧", "推陈出新", "标新立异"]
            },
            {
                word: "新故相推",
                pinyin: "xīn gù xiāng tuī",
                meaning: "新事物和旧事物互相更替",
                examples: ["岁月更迭，新故相推"],
                relatedWords: ["推陈出新", "故旧新知", "新陈代谢"]
            },
            {
                word: "推心置腹",
                pinyin: "tuī xīn zhì fù",
                meaning: "比喻真心诚意，毫无隐瞒",
                examples: ["两人推心置腹地长谈"],
                relatedWords: ["推诚相见", "推己及人", "推心合力"]
            },
            {
                word: "腹背受敌",
                pinyin: "fù bèi shòu dí",
                meaning: "前后受敌，形容处境困难",
                examples: ["这个决定让公司陷入腹背受敌的境地"],
                relatedWords: ["前后受敌", "四面楚歌", "腹背之毛"]
            }
        ],
        hints: [
            "这个成语出自《论语》，形容学习的态度",
            "这个成语描述人们对新旧事物的态度",
            "这个成语描述事物更替的规律",
            "这个成语形容待人接物的真诚态度",
            "这个成语描述处境困难的状态"
        ],
        rules: [
            "每个词语都是四字成语",
            "需要用上一个成语的最后一个字作为下一个成语的第一个字",
            "所有成语都有典故和深刻的寓意"
        ]
    },
    
    // 诗词词库（高级）
    hard: {
        words: [
            {
                word: "春花秋月",
                pinyin: "chūn huā qiū yuè",
                meaning: "春天的花，秋天的月亮，形容自然美景",
                examples: ["春花秋月何时了，往事知多少"],
                relatedWords: ["春花烂漫", "秋月寒江", "花好月圆"]
            },
            {
                word: "月明风清",
                pinyin: "yuè míng fēng qīng",
                meaning: "明亮的月光，清爽的风，形容夜晚美好的景色",
                examples: ["但愿人长久，月明风清时"],
                relatedWords: ["月朗风清", "风月无边", "清风明月"]
            },
            {
                word: "清风徐来",
                pinyin: "qīng fēng xú lái",
                meaning: "清爽的风徐徐吹来，形容美好的自然景象",
                examples: ["清风徐来，水波不兴"],
                relatedWords: ["清风拂面", "清风明月", "和风徐来"]
            },
            {
                word: "来日方长",
                pinyin: "lái rì fāng cháng",
                meaning: "将来的日子还长，表示有充裕的时间",
                examples: ["来日方长，我们慢慢探讨"],
                relatedWords: ["来日可期", "来日绵长", "日长月久"]
            }
        ],
        hints: [
            "这个词语描写春秋两季的自然美景",
            "这个词语形容月夜的美好景色",
            "这个词语描写风的动态美",
            "这个词语表达对未来的期望"
        ],
        rules: [
            "每个词语都出自古诗词或与古典文学相关",
            "需要用上一个词语的最后一个字作为下一个词语的第一个字",
            "词语多与自然景色、人文情怀有关"
        ]
    }
};

// 游戏规则说明
window.gameRules = {
    general: [
        "游戏分为三个难度等级：初级（常用词）、中级（成语）、高级（诗词）",
        "每个难度都有其特定的词语类型和规则",
        "玩家需要在规定时间内完成接龙",
        "可以使用提示功能查看词语含义和相关用法",
        "跳过功能会扣除一定分数"
    ],
    scoring: [
        "成功接龙一次得10分",
        "使用提示不扣分",
        "跳过当前词语扣5分",
        "达到目标分数即可进入下一关"
    ],
    examples: {
        easy: "学习 → 习惯 → 惯例 → 例子",
        medium: "学而不厌 → 厌故喜新 → 新故相推",
        hard: "春花秋月 → 月明风清 → 清风徐来"
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
            meaning: foundWord.meaning,
            examples: foundWord.examples,
            relatedWords: foundWord.relatedWords
        };
    }
    return null;
};

// 获取提示
window.getHint = function(word, difficulty) {
    const wordList = gameData[difficulty].words;
    const index = wordList.findIndex(w => w.word === word);
    if (index !== -1) {
        const wordInfo = wordList[index];
        return `
提示：${gameData[difficulty].hints[index]}
拼音：${wordInfo.pinyin}
含义：${wordInfo.meaning}
例句：${wordInfo.examples.join('、')}
相关词：${wordInfo.relatedWords.join('、')}
        `.trim();
    }
    return "没有找到相关提示";
};
