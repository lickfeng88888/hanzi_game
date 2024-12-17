// 拼音拖拽填空游戏题库
window.gameQuestions = {
    easy: [
        {
            text: "这是一只小_。",
            pinyin: ["māo"],
            answer: ["猫"],
            hint: "一种常见的宠物，会抓老鼠。",
            explanation: "这是一只小猫。\n猫(māo)：常见的家养宠物，性格独立，喜欢抓老鼠。"
        },
        {
            text: "今天天气很_。",
            pinyin: ["hǎo"],
            answer: ["好"],
            hint: "表示事物处于理想或满意的状态。",
            explanation: "今天天气很好。\n好(hǎo)：表示事物处于理想或令人满意的状态。"
        },
        {
            text: "小明喜欢吃_。",
            pinyin: ["píng guǒ"],
            answer: ["苹", "果"],
            hint: "一种常见的水果，圆形，红色或青色。",
            explanation: "小明喜欢吃苹果。\n苹果(píng guǒ)：一种常见的水果，富含维生素，有助于健康。"
        },
        {
            text: "_在天上飞。",
            pinyin: ["niǎo"],
            answer: ["鸟"],
            hint: "会飞的动物。",
            explanation: "鸟在天上飞。\n鸟(niǎo)：有翅膀会飞的动物。"
        },
        {
            text: "小_在开花。",
            pinyin: ["huā"],
            answer: ["花"],
            hint: "植物美丽的部分。",
            explanation: "小花在开花。\n花(huā)：植物的繁殖器官，常有美丽的颜色。"
        },
        {
            text: "_很大很蓝。",
            pinyin: ["hǎi"],
            answer: ["海"],
            hint: "很大的水域。",
            explanation: "海很大很蓝。\n海(hǎi)：地球表面的大片咸水。"
        },
        {
            text: "我喜欢看_。",
            pinyin: ["shū"],
            answer: ["书"],
            hint: "记录知识的物品。",
            explanation: "我喜欢看书。\n书(shū)：记录文字的册子。"
        },
        {
            text: "_在草地上跑。",
            pinyin: ["yáng"],
            answer: ["羊"],
            hint: "一种吃草的动物。",
            explanation: "羊在草地上跑。\n羊(yáng)：一种常见的家畜。"
        },
        {
            text: "小朋友在_。",
            pinyin: ["wán"],
            answer: ["玩"],
            hint: "进行娱乐活动。",
            explanation: "小朋友在玩。\n玩(wán)：做游戏或娱乐活动。"
        },
        {
            text: "_下雨了。",
            pinyin: ["xiàn zài"],
            answer: ["现", "在"],
            hint: "表示此时此刻。",
            explanation: "现在下雨了。\n现在(xiàn zài)：表示当前的时间。"
        }
    ],
    medium: [
        {
            text: "春天到了，_开了。",
            pinyin: ["huā", "duǒ"],
            answer: ["花", "朵"],
            hint: "植物开放的部分，常有美丽的颜色和香味。",
            explanation: "春天到了，花朵开了。\n花朵(huā duǒ)：植物的繁殖器官，常有鲜艳的颜色和芳香。"
        },
        {
            text: "小鸟在_上唱歌。",
            pinyin: ["shù", "zhī"],
            answer: ["树", "枝"],
            hint: "树木向外伸展的部分。",
            explanation: "小鸟在树枝上唱歌。\n树枝(shù zhī)：树木的分支部分，是鸟类栖息的地方。"
        },
        {
            text: "他是我的好_。",
            pinyin: ["péng", "you"],
            answer: ["朋", "友"],
            hint: "关系亲密的人。",
            explanation: "他是我的好朋友。\n朋友(péng you)：关系亲密的人，互相信任和帮助的伙伴。"
        },
        {
            text: "_在_上生长。",
            pinyin: ["huā", "cǎo", "dì", "shàng"],
            answer: ["花", "草", "地", "上"],
            hint: "描述植物生长的地方。",
            explanation: "花草在地上生长。\n花草(huā cǎo)：泛指各种花和草。"
        },
        {
            text: "我们去_游玩。",
            pinyin: ["gōng", "yuán"],
            answer: ["公", "园"],
            hint: "供人游玩的场所。",
            explanation: "我们去公园游玩。\n公园(gōng yuán)：供人游玩休息的场所。"
        },
        {
            text: "_照亮了大地。",
            pinyin: ["tài", "yáng"],
            answer: ["太", "阳"],
            hint: "发光发热的天体。",
            explanation: "太阳照亮了大地。\n太阳(tài yáng)：太阳系的中心天体。"
        },
        {
            text: "_在天上飘。",
            pinyin: ["báí", "yún"],
            answer: ["白", "云"],
            hint: "天空中白色的云。",
            explanation: "白云在天上飘。\n白云(báí yún)：天空中白色的云彩。"
        },
        {
            text: "小河_流淌。",
            pinyin: ["qīng", "qīng"],
            answer: ["清", "清"],
            hint: "形容水清澈。",
            explanation: "小河清清流淌。\n清清(qīng qīng)：形容水清澈见底。"
        },
        {
            text: "_吹动了树叶。",
            pinyin: ["qīng", "fēng"],
            answer: ["清", "风"],
            hint: "清新的风。",
            explanation: "清风吹动了树叶。\n清风(qīng fēng)：清新的风。"
        },
        {
            text: "_在海里游泳。",
            pinyin: ["yú", "ér"],
            answer: ["鱼", "儿"],
            hint: "生活在水中的动物。",
            explanation: "鱼儿在海里游泳。\n鱼儿(yú ér)：小鱼。"
        }
    ],
    hard: [
        {
            text: "小明_在_上写字。",
            pinyin: ["zuò", "yǐ", "zi"],
            answer: ["坐", "椅", "子"],
            hint: "一个关于使用家具的句子。",
            explanation: "小明坐在椅子上写字。\n坐(zuò)：以臀部着力的姿势。\n椅子(yǐ zi)：供人坐的家具。"
        },
        {
            text: "_从_里流出来。",
            pinyin: ["shuǐ", "shuǐ", "lóng", "tóu"],
            answer: ["水", "水", "龙", "头"],
            hint: "一个关于家用设备的句子。",
            explanation: "水从水龙头里流出来。\n水(shuǐ)：生活中必不可少的液体。\n水龙头(shuǐ lóng tóu)：控制水流的装置。"
        },
        {
            text: "_在_上_。",
            pinyin: ["nǐ", "zhuō", "zi", "shàng", "xué", "xí"],
            answer: ["你", "桌", "子", "上", "学", "习"],
            hint: "一个关于学习的完整句子。",
            explanation: "你在桌子上学习。\n桌子(zhuō zi)：供人进行工作、学习等活动的家具。\n学习(xué xí)：获取知识和技能的过程。"
        },
        {
            text: "_在_里_。",
            pinyin: ["xiǎo", "niǎo", "cháng", "zi", "lǐ", "fēi"],
            answer: ["小", "鸟", "笼", "子", "里", "飞"],
            hint: "描述鸟在笼子里的活动。",
            explanation: "小鸟在笼子里飞。\n笼子(lóng zi)：关鸟或其他小动物的器具。"
        },
        {
            text: "_和_一起_。",
            pinyin: ["bà", "ba", "mā", "ma", "shuì", "jiào"],
            answer: ["爸", "爸", "妈", "妈", "睡", "觉"],
            hint: "描述父母一起休息。",
            explanation: "爸爸妈妈一起睡觉。\n爸爸妈妈(bà ba mā ma)：父母的称呼。"
        },
        {
            text: "_在_上_。",
            pinyin: ["xiǎo", "māo", "shū", "jià", "shàng", "tǎng"],
            answer: ["小", "猫", "书", "架", "上", "躺"],
            hint: "描述猫在书架上的动作。",
            explanation: "小猫在书架上躺。\n书架(shū jià)：放书的架子。"
        },
        {
            text: "_和_在_。",
            pinyin: ["gē", "ge", "mèi", "mei", "huā", "yuán"],
            answer: ["哥", "哥", "妹", "妹", "花", "园"],
            hint: "描述兄妹在花园的场景。",
            explanation: "哥哥妹妹在花园。\n花园(huā yuán)：种植花草的园子。"
        },
        {
            text: "_在_里_。",
            pinyin: ["yú", "ér", "shuǐ", "zhōng", "yóu"],
            answer: ["鱼", "儿", "水", "中", "游"],
            hint: "描述鱼在水中游动。",
            explanation: "鱼儿在水中游。\n水中(shuǐ zhōng)：水里面。"
        },
        {
            text: "_和_一起_。",
            pinyin: ["lǎo", "shī", "tóng", "xué", "xué", "xí"],
            answer: ["老", "师", "同", "学", "学", "习"],
            hint: "描述师生一起学习。",
            explanation: "老师同学一起学习。\n老师(lǎo shī)：教书育人的人。"
        },
        {
            text: "_在_边_。",
            pinyin: ["xiǎo", "háir", "hé", "biān", "wán"],
            answer: ["小", "孩", "河", "边", "玩"],
            hint: "描述孩子在河边玩耍。",
            explanation: "小孩在河边玩。\n河边(hé biān)：河流旁边。"
        }
    ]
};
