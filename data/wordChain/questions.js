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
            },
            {
                word: "间隔",
                pinyin: "jiān gé",
                meaning: "时间或空间的距离",
                examples: ["间隔时间", "间隔距离", "间隔布局"],
                relatedWords: ["间断", "空间", "时间"]
            },
            {
                word: "格外",
                pinyin: "gé wài",
                meaning: "特别，非常",
                examples: ["格外开心", "格外注意", "格外关心"],
                relatedWords: ["特别", "尤其", "分外"]
            },
            {
                word: "外出",
                pinyin: "wài chū",
                meaning: "到外面去",
                examples: ["外出办事", "外出游玩", "外出就餐"],
                relatedWords: ["出门", "出行", "外面"]
            },
            {
                word: "出发",
                pinyin: "chū fā",
                meaning: "动身前往某地",
                examples: ["出发时间", "准备出发", "即将出发"],
                relatedWords: ["启程", "动身", "起程"]
            },
            {
                word: "发现",
                pinyin: "fā xiàn",
                meaning: "找到或看到以前不知道的事物",
                examples: ["发现问题", "新发现", "重大发现"],
                relatedWords: ["发觉", "发掘", "发明"]
            },
            {
                word: "现代",
                pinyin: "xiàn dài",
                meaning: "当前的时代",
                examples: ["现代化", "现代生活", "现代社会"],
                relatedWords: ["当代", "如今", "现在"]
            },
            {
                word: "代表",
                pinyin: "dài biǎo",
                meaning: "替别人或团体行使权力",
                examples: ["代表作", "代表团", "代表人物"],
                relatedWords: ["表示", "代替", "表达"]
            },
            {
                word: "表现",
                pinyin: "biǎo xiàn",
                meaning: "显示出来的情况或态度",
                examples: ["表现良好", "表现自己", "突出表现"],
                relatedWords: ["表达", "表示", "显示"]
            },
            {
                word: "现实",
                pinyin: "xiàn shí",
                meaning: "客观存在的事实",
                examples: ["现实生活", "现实问题", "面对现实"],
                relatedWords: ["实际", "真实", "实在"]
            },
            {
                word: "实践",
                pinyin: "shí jiàn",
                meaning: "把想法付诸行动",
                examples: ["实践经验", "实践活动", "理论实践"],
                relatedWords: ["实行", "实施", "实现"]
            },
            {
                word: "见面",
                pinyin: "jiàn miàn",
                meaning: "相遇，会面",
                examples: ["见面会", "初次见面", "见面礼"],
                relatedWords: ["相见", "会面", "见到"]
            },
            {
                word: "面对",
                pinyin: "miàn duì",
                meaning: "对着，面向",
                examples: ["面对困难", "面对现实", "面对挑战"],
                relatedWords: ["对待", "面向", "应对"]
            },
            {
                word: "对话",
                pinyin: "duì huà",
                meaning: "交谈，对方交谈",
                examples: ["对话框", "对话集", "展开对话"],
                relatedWords: ["交谈", "谈话", "对白"]
            },
            {
                word: "话题",
                pinyin: "huà tí",
                meaning: "谈话的内容",
                examples: ["话题性", "热门话题", "共同话题"],
                relatedWords: ["主题", "议题", "话语"]
            },
            {
                word: "语重心长",
                pinyin: "yǔ zhòng xīn cháng",
                meaning: "言语中流露出深长的感情",
                examples: ["他语重心长地劝说我们"],
                relatedWords: ["语重心长", "言重心长", "语重情长"]
            },
            {
                word: "长风破浪",
                pinyin: "cháng fēng pò làng",
                meaning: "形容勇往直前，战胜困难",
                examples: ["长风破浪会有时"],
                relatedWords: ["破浪前进", "乘风破浪", "长风破浪"]
            },
            {
                word: "浪花飞溅",
                pinyin: "làng huā fēi jiān",
                meaning: "形容波浪翻腾，水花四溅",
                examples: ["浪花飞溅，海鸥翔舞"],
                relatedWords: ["浪花朵朵", "浪花飞舞", "浪花飞溅"]
            },
            {
                word: "溅起浪花",
                pinyin: "jiān qǐ làng huā",
                meaning: "形容水花四溅",
                examples: ["溅起浪花，飞溅水花"],
                relatedWords: ["浪花朵朵", "浪花飞舞", "浪花飞溅"]
            },
            {
                word: "花开富贵",
                pinyin: "huā kāi fù guì",
                meaning: "比喻事业兴旺",
                examples: ["花开富贵，事业兴旺"],
                relatedWords: ["花开富贵", "花开吉祥", "花开富贵"]
            }
        ],
        hints: [
            "这是一个与教育学习相关的词语，日常生活中经常用到",
            "这个词描述一个人养成的行为方式，与日常生活密切相关",
            "这个词形容一个人心情愉悦的状态",
            "这个词指一个供人游玩的地方",
            "这个词与自然景观和建筑设计有关",
            "这个词描述树林中的场景",
            "这个词描述时间或空间的距离",
            "这个词形容特别或非常",
            "这个词指到外面去",
            "这个词指动身前往某地",
            "这个词指找到或看到以前不知道的事物",
            "这个词指当前的时代",
            "这个词指替别人或团体行使权力",
            "这个词形容显示出来的情况或态度",
            "这个词指客观存在的事实",
            "这个词指把想法付诸行动",
            "这个词指相遇，会面",
            "这个词指对着，面向",
            "这个词指交谈，对方交谈",
            "这个词指谈话的内容",
            "这个词形容言语中流露出深长的感情",
            "这个词形容勇往直前，战胜困难",
            "这个词形容波浪翻腾，水花四溅",
            "这个词形容水花四溅",
            "这个词比喻事业兴旺"
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
            },
            {
                word: "敌众我寡",
                pinyin: "dí zhòng wǒ guǎ",
                meaning: "敌人数量多，我方人数少",
                examples: ["虽然敌众我寡，但我们仍然获胜"],
                relatedWords: ["以寡敌众", "寡不敌众", "以少胜多"]
            },
            {
                word: "寡不敌众",
                pinyin: "guǎ bù dí zhòng",
                meaning: "人少的一方不能抵抗人多的一方",
                examples: ["最终寡不敌众，他们被迫撤退"],
                relatedWords: ["以寡敌众", "敌众我寡", "单枪匹马"]
            },
            {
                word: "众志成城",
                pinyin: "zhòng zhì chéng chéng",
                meaning: "大家团结一心，力量大如城墙",
                examples: ["全村众志成城抗击洪水"],
                relatedWords: ["同心协力", "齐心协力", "万众一心"]
            },
            {
                word: "城门失火",
                pinyin: "chéng mén shī huǒ",
                meaning: "城门着火，殃及池鱼",
                examples: ["城门失火，殃及池鱼"],
                relatedWords: ["祸及池鱼", "株连九族", "牵连无辜"]
            },
            {
                word: "火眼金睛",
                pinyin: "huǒ yǎn jīn jīng",
                meaning: "锐利的眼光",
                examples: ["他火眼金睛，一眼看出问题所在"],
                relatedWords: ["慧眼识珠", "火眼晶晶", "明察秋毫"]
            },
            {
                word: "睛天霹雳",
                pinyin: "jīng tiān pī lì",
                meaning: "形容突如其来的变故",
                examples: ["这个消息如同睛天霹雳"],
                relatedWords: ["晴天霹雳", "青天霹雳", "霹雳一声"]
            },
            {
                word: "雷厉风行",
                pinyin: "léi lì fēng xíng",
                meaning: "形容行事严厉迅速",
                examples: ["他做事雷厉风行，说到做到"],
                relatedWords: ["迅雷风烈", "雷霆万钧", "疾风劲草"]
            },
            {
                word: "行云流水",
                pinyin: "xíng yún liú shuǐ",
                meaning: "形容文章流畅自然",
                examples: ["他的书法行云流水，一气呵成"],
                relatedWords: ["云流水散", "行云若水", "云蒸霞蔚"]
            },
            {
                word: "水到渠成",
                pinyin: "shuǐ dào qú chéng",
                meaning: "水来到自然成渠，比喻条件成熟，事情自然成功",
                examples: ["只要努力，一切都会水到渠成"],
                relatedWords: ["水到渠成", "水到鱼行", "水到自然成"]
            },
            {
                word: "成竹在胸",
                pinyin: "chéng zhú zài xiōng",
                meaning: "比喻做事已有准备和把握",
                examples: ["他成竹在胸，胸有成竹"],
                relatedWords: ["胸有成竹", "成竹在心", "胸有定见"]
            },
            {
                word: "胸有成竹",
                pinyin: "xiōng yǒu chéng zhú",
                meaning: "比喻做事已有准备和把握",
                examples: ["他胸有成竹，胸有成竹"],
                relatedWords: ["成竹在胸", "成竹在心", "胸有定见"]
            },
            {
                word: "成竹在心",
                pinyin: "chéng zhú zài xīn",
                meaning: "比喻做事已有准备和把握",
                examples: ["他成竹在心，胸有成竹"],
                relatedWords: ["成竹在胸", "胸有成竹", "胸有定见"]
            }
        ],
        hints: [
            "这个成语出自《论语》，形容学习的态度",
            "这个成语描述人们对新旧事物的态度",
            "这个成语描述事物更替的规律",
            "这个成语形容待人接物的真诚态度",
            "这个成语描述处境困难的状态",
            "这个成语形容敌人数量多，我方人数少",
            "这个成语形容人少的一方不能抵抗人多的一方",
            "这个成语形容大家团结一心，力量大如城墙",
            "这个成语形容城门着火，殃及池鱼",
            "这个成语形容锐利的眼光",
            "这个成语形容突如其来的变故",
            "这个成语形容行事严厉迅速",
            "这个成语形容文章流畅自然",
            "这个成语形容条件成熟，事情自然成功",
            "这个成语形容做事已有准备和把握",
            "这个成语形容做事已有准备和把握",
            "这个成语形容做事已有准备和把握"
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
                meaning: "春天的花，秋天的月亮，形容美好的景物",
                examples: ["春花秋月何时了，往事知多少"],
                relatedWords: ["春花烂漫", "秋月寒江", "花好月圆"]
            },
            {
                word: "月明风清",
                pinyin: "yuè míng fēng qīng",
                meaning: "月光明朗，微风清爽",
                examples: ["但愿人长久，千里共婵娟"],
                relatedWords: ["明月清风", "风清月朗", "清风明月"]
            },
            {
                word: "清风徐来",
                pinyin: "qīng fēng xú lái",
                meaning: "清爽的风徐徐吹来",
                examples: ["清风徐来，水波不兴"],
                relatedWords: ["和风徐来", "清风拂面", "清风习习"]
            },
            {
                word: "来日方长",
                pinyin: "lái rì fāng cháng",
                meaning: "将来的日子还长，比喻有充裕的时间",
                examples: ["来日方长，我们慢慢探讨"],
                relatedWords: ["日长月久", "岁月绵长", "未来可期"]
            },
            {
                word: "长亭外",
                pinyin: "cháng tíng wài",
                meaning: "指送别的地方",
                examples: ["长亭外，古道边，芳草碧连天"],
                relatedWords: ["长亭古道", "长亭短亭", "长亭远望"]
            },
            {
                word: "外柔内刚",
                pinyin: "wài róu nèi gāng",
                meaning: "外表柔和，内心坚强",
                examples: ["她外柔内刚，处事得当"],
                relatedWords: ["刚柔相济", "柔中带刚", "内刚外柔"]
            },
            {
                word: "刚柔并济",
                pinyin: "gāng róu bìng jì",
                meaning: "刚强和柔和并存",
                examples: ["为人处世要刚柔并济"],
                relatedWords: ["刚柔相济", "刚柔相合", "刚柔得当"]
            },
            {
                word: "济济一堂",
                pinyin: "jì jì yī táng",
                meaning: "许多人聚集在一起",
                examples: ["贤才济济一堂，共商大事"],
                relatedWords: ["济济多士", "济济彬彬", "济济一室"]
            },
            {
                word: "堂堂正正",
                pinyin: "táng táng zhèng zhèng",
                meaning: "光明磊落，正大光明",
                examples: ["做人要堂堂正正"],
                relatedWords: ["正正当当", "堂皇正大", "正大光明"]
            },
            {
                word: "正气浩然",
                pinyin: "zhèng qì hào rán",
                meaning: "正直的气节浩大无边",
                examples: ["正气浩然，浩然正气"],
                relatedWords: ["浩然之气", "正气凛然", "浩然正气"]
            },
            {
                word: "然后知之",
                pinyin: "rán hòu zhī zhī",
                meaning: "经过思考后才明白",
                examples: ["学而后知不足"],
                relatedWords: ["后知后觉", "知之为知之", "学而知之"]
            },
            {
                word: "之乎者也",
                pinyin: "zhī hū zhě yě",
                meaning: "文言文中常用的虚词",
                examples: ["不懂之乎者也，难解文言文"],
                relatedWords: ["之一", "乎也", "者也"]
            },
            {
                word: "也无风雨",
                pinyin: "yě wú fēng yǔ",
                meaning: "形容平静安详的景象",
                examples: ["也无风雨也无晴"],
                relatedWords: ["无风无雨", "风雨无阻", "风雨同舟"]
            },
            {
                word: "雨打风吹",
                pinyin: "yǔ dǎ fēng chuī",
                meaning: "经受风雨的打击",
                examples: ["雨打风吹去，任它东西南北"],
                relatedWords: ["风吹雨打", "风雨交加", "风吹雨落"]
            },
            {
                word: "吹箫人去",
                pinyin: "chuī xiāo rén qù",
                meaning: "形容孤寂的意境",
                examples: ["吹箫人去玉楼空"],
                relatedWords: ["箫声咽", "吹箫弄琴", "箫鼓喧"]
            },
            {
                word: "人去楼空",
                pinyin: "rén qù lóu kōng",
                meaning: "形容人去楼空，十分寂静",
                examples: ["人去楼空，空空荡荡"],
                relatedWords: ["楼空人去", "人去楼空", "空空荡荡"]
            },
            {
                word: "楼空人去",
                pinyin: "lóu kōng rén qù",
                meaning: "形容人去楼空，十分寂静",
                examples: ["楼空人去，空空荡荡"],
                relatedWords: ["人去楼空", "楼空人去", "空空荡荡"]
            },
            {
                word: "空空荡荡",
                pinyin: "kōng kōng dàng dàng",
                meaning: "形容十分空旷",
                examples: ["空空荡荡，十分寂静"],
                relatedWords: ["空荡荡", "空空如也", "空空洞洞"]
            },
            {
                word: "荡荡如也",
                pinyin: "dàng dàng rú yě",
                meaning: "形容十分空旷",
                examples: ["荡荡如也，十分寂静"],
                relatedWords: ["空荡荡", "空空如也", "空空洞洞"]
            },
            {
                word: "如在眼前",
                pinyin: "rú zài yǎn qián",
                meaning: "形容十分真切",
                examples: ["如在眼前，十分真切"],
                relatedWords: ["眼前", "眼前一亮", "眼前一亮"]
            }
        ],
        hints: [
            "这个词语描写春秋两季的自然美景",
            "这个词语形容月夜的美好景色",
            "这个词语描写风的动态美",
            "这个词语表达对未来的期望",
            "这个词语指送别的地方",
            "这个词语形容外表柔和，内心坚强",
            "这个词语形容刚强和柔和并存",
            "这个词语形容许多人聚集在一起",
            "这个词语形容光明磊落，正大光明",
            "这个词语形容正直的气节浩大无边",
            "这个词语形容经过思考后才明白",
            "这个词语形容文言文中常用的虚词",
            "这个词语形容平静安详的景象",
            "这个词语形容经受风雨的打击",
            "这个词语形容孤寂的意境",
            "这个词语形容人去楼空，十分寂静",
            "这个词语形容人去楼空，十分寂静",
            "这个词语形容十分空旷",
            "这个词语形容十分空旷",
            "这个词语形容十分真切"
        ],
        rules: [
            "每个词语都出自古诗词或与古典文学相关",
            "需要用上一个词语的最后一个字作为下一个词语的第一个字",
            "词语多与自然景色、人文情怀有关"
        ]
    }
};
