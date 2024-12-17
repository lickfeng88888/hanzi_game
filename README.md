# 汉字游戏乐园 (Chinese Characters Game Paradise)

一个专门为儿童设计的汉字学习互动游戏平台，包含多种有趣的游戏模式，帮助孩子们快乐地学习汉字。

## 项目特点

- 🎮 五种趣味游戏模式，循序渐进的学习体验
- 🎯 适合5-10岁儿童的认知水平和学习需求
- 📱 响应式设计，完美支持PC和平板设备
- 🔊 丰富的音效反馈，提升游戏体验
- 💾 本地题库存储，无需联网即可使用
- ⭐ 完整的游戏进度和分数记录系统
- 🎨 精美的界面设计和流畅的动画效果

## 游戏模式

1. **词语拖拽拼搭**
   - 通过拖拽方式组合汉字形成词语
   - 三个难度等级：初级（双字词）、进阶（三字词）、高级（四字词）
   - 实时音效反馈和动画效果
   - 每个词语配有拼音和释义说明
   - 支持提示功能和重置操作

2. **文字连线找朋友**
   - 通过连线方式匹配相关的汉字、拼音或词义
   - 支持多种匹配模式：字-字、字-音、字-义
   - 连线过程中有实时视觉反馈
   - 错误提示和自动重置功能
   - 关卡进度保存功能

3. **词语消消乐**
   - 点击正确的汉字组成完整词语
   - 难度分级：双字词、三字词、四字成语
   - 精美的消除动画和音效
   - 连击奖励机制
   - 计时挑战模式

4. **拼音拖拽填空**
   - 根据拼音提示拖拽正确的汉字填空
   - 支持单字、词语和句子三种模式
   - 每个汉字都配有标准读音
   - 智能提示系统
   - 进度保存和成就系统

5. **组词接龙闯关**
   - 创新的词语接龙玩法
   - 三个难度等级：常用词、成语、诗词
   - 实时单词提示功能
   - 计时挑战模式
   - 详细的词语解释和用法说明

## 技术实现

### 前端架构
- **HTML5**
  - 语义化标签结构
  - Canvas 绘图
  - Drag & Drop API
  - Web Audio API
  - LocalStorage 数据存储

- **CSS3**
  - Flexbox 和 Grid 布局
  - 响应式设计
  - CSS 动画和过渡效果
  - 自定义字体和图标
  - 主题切换支持

- **JavaScript**
  - 原生 JS，无框架依赖
  - 模块化代码组织
  - 事件委托优化
  - 防抖和节流处理
  - 异步加载资源

### 游戏引擎
- 自定义的游戏状态管理
- 统一的音效控制系统
- 可配置的难度系统
- 本地存储进度管理
- 实时分数计算系统

## 项目结构

```
hanzi_game/
├── index.html                 # 主页面
├── css/                       # 样式文件
│   ├── style.css             # 主样式
│   ├── common.css            # 公共样式
│   ├── dragWord.css          # 拖拽游戏样式
│   ├── connectLine.css       # 连线游戏样式
│   ├── wordEliminate.css     # 消消乐样式
│   ├── pinyinDrag.css        # 拼音游戏样式
│   └── wordChain.css         # 接龙游戏样式
├── js/                       # JavaScript文件
│   ├── main.js              # 主逻辑
│   └── games/               # 游戏逻辑
│       ├── dragWord.js      # 拖拽游戏逻辑
│       ├── connectLine.js   # 连线游戏逻辑
│       ├── wordEliminate.js # 消消乐逻辑
│       ├── pinyinDrag.js    # 拼音游戏逻辑
│       └── wordChain.js     # 接龙游戏逻辑
├── pages/                   # 游戏页面
│   ├── dragWord.html       # 拖拽游戏页面
│   ├── connectLine.html    # 连线游戏页面
│   ├── wordEliminate.html  # 消消乐页面
│   ├── pinyinDrag.html     # 拼音游戏页面
│   └── wordChain.html      # 接龙游戏页面
├── data/                    # 游戏数据
│   ├── dragWord/           # 拖拽游戏题库
│   ├── connectLine/        # 连线游戏题库
│   ├── wordEliminate/      # 消消乐题库
│   ├── pinyinDrag/         # 拼音题库
│   └── wordChain/          # 接龙题库
└── assets/                 # 静态资源
    ├── images/            # 图片资源
    ├── audio/            # 音效资源
    └── fonts/           # 字体文件

## 运行说明

1. **环境要求**
   - 现代浏览器（Chrome、Firefox、Safari、Edge等）
   - JavaScript启用
   - 建议开启声音以获得最佳体验

2. **本地运行**
   ```bash
   # 克隆项目
   git clone https://github.com/yourusername/hanzi_game.git
   
   # 进入项目目录
   cd hanzi_game
   
   # 使用任意HTTP服务器运行
   # 例如使用Python的SimpleHTTPServer
   python -m http.server 8000
   ```

3. **访问地址**
   - 打开浏览器访问 `http://localhost:8000`
   - 点击任意游戏开始体验

## 游戏玩法说明

### 词语拖拽拼搭
1. 从右侧词库中拖拽汉字
2. 放置到左侧空格中组成词语
3. 点击提交按钮检查答案
4. 正确后自动进入下一题

### 文字连线找朋友
1. 点击左侧文字开始连线
2. 拖动到右侧相匹配的选项
3. 连线正确显示绿色，错误显示红色
4. 全部匹配完成后进入下一关

### 词语消消乐
1. 观察页面上的汉字
2. 按顺序点击构成正确词语的汉字
3. 正确词语会消除并得分
4. 在规定时间内获得目标分数过关

### 拼音拖拽填空
1. 查看拼音提示
2. 从下方汉字库拖拽正确的汉字
3. 放入对应的拼音空格中
4. 完成所有填空进入下一题

### 组词接龙闯关
1. 观察给出的词语
2. 输入以上一个词语最后一个字开头的新词
3. 可使用提示或跳过功能
4. 在时间限制内完成目标分数过关

## 开发计划

### 已完成功能
- [x] 五个核心游戏模块
- [x] 响应式界面设计
- [x] 音效系统
- [x] 本地存储功能
- [x] 题库系统
- [x] 分数记录
- [x] 动画效果

### 待开发功能
- [ ] 用户登录系统
- [ ] 排行榜功能
- [ ] 更多游戏模式
- [ ] 自定义题库
- [ ] 多人对战模式
- [ ] 移动端适配优化
- [ ] 更多语音功能

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 版本历史

- v1.0.0 (2024-12-17)
  - 完成五个核心游戏模块
  - 实现基础游戏功能
  - 添加音效和动画
  - 本地存储功能

## 致谢

感谢所有为项目提供反馈和建议的用户。
