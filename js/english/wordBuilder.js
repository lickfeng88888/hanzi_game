class WordBuilder {
    constructor() {
        this.currentLevel = 1;
        this.currentScore = 0;
        this.currentWord = null;
        this.currentFragments = [];
        this.gameData = null;
        this.wordIndex = 0;

        // DOM elements
        this.buildingArea = document.getElementById('buildingArea');
        this.fragmentsArea = document.getElementById('fragmentsArea');
        this.hintButton = document.getElementById('hintButton');
        this.checkButton = document.getElementById('checkButton');
        this.nextButton = document.getElementById('nextButton');
        this.feedbackElement = document.getElementById('feedback');
        this.wordHintElement = document.getElementById('wordHint');
        this.wordDefinitionElement = document.getElementById('wordDefinition');
        this.levelElement = document.getElementById('currentLevel');
        this.scoreElement = document.getElementById('currentScore');

        // 初始化游戏数据
        this.gameData = {
            words: [
                {
                    word: "apple",
                    fragments: ["ap", "ple"],
                    hint: "一种能让医生远离的水果...",
                    definition: "一种红色或绿色皮的圆形水果，果肉为白色"
                },
                {
                    word: "happy",
                    fragments: ["hap", "py"],
                    hint: "当你感觉很好并且经常微笑时...",
                    definition: "感到或表现出愉快和满足"
                },
                {
                    word: "table",
                    fragments: ["ta", "ble"],
                    hint: "一件带有平面的家具...",
                    definition: "一件带有平面和腿的家具"
                }
            ],
            levelInfo: {
                level: 1,
                difficulty: "easy",
                requiredScore: 30,
                timeLimit: 300
            }
        };

        // 绑定事件监听器
        this.hintButton.addEventListener('click', () => this.showHint());
        this.checkButton.addEventListener('click', () => this.checkAnswer());
        this.nextButton.addEventListener('click', () => this.nextWord());

        // 初始化游戏
        this.initGame();
    }

    initGame() {
        this.updateScoreDisplay();
        this.updateLevelDisplay();
        this.loadWord();
    }

    loadWord() {
        if (!this.gameData || !this.gameData.words) return;
        
        // 获取当前单词数据
        const wordData = this.gameData.words[this.wordIndex];
        if (!wordData) {
            this.completedLevel();
            return;
        }

        this.currentWord = wordData.word;
        this.currentFragments = [...wordData.fragments];
        
        // 更新UI
        this.wordHintElement.textContent = wordData.hint;
        this.wordDefinitionElement.textContent = wordData.definition;
        this.wordDefinitionElement.style.display = 'none';
        
        // 清空区域
        this.buildingArea.innerHTML = '';
        this.fragmentsArea.innerHTML = '';
        
        // 打乱并显示片段
        this.shuffleArray(this.currentFragments);
        this.displayFragments();
        
        // 重置按钮
        this.checkButton.style.display = 'block';
        this.nextButton.style.display = 'none';
    }

    displayFragments() {
        this.currentFragments.forEach(fragment => {
            const fragmentElement = document.createElement('div');
            fragmentElement.className = 'word-fragment';
            fragmentElement.textContent = fragment;
            fragmentElement.draggable = true;
            
            // 添加拖拽事件
            fragmentElement.addEventListener('dragstart', (e) => this.handleDragStart(e));
            fragmentElement.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            this.fragmentsArea.appendChild(fragmentElement);
        });

        // 添加放置区域的事件
        this.buildingArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.buildingArea.addEventListener('drop', (e) => this.handleDrop(e));
    }

    handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.textContent);
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDrop(e) {
        e.preventDefault();
        const fragment = document.querySelector('.dragging');
        if (fragment) {
            this.buildingArea.appendChild(fragment);
            fragment.classList.add('placed');
        }
    }

    checkAnswer() {
        const placedFragments = Array.from(this.buildingArea.children)
            .map(fragment => fragment.textContent)
            .join('');
        
        if (placedFragments === this.currentWord) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
    }

    handleCorrectAnswer() {
        // 更新分数
        this.currentScore += 10;
        this.updateScoreDisplay();
        
        // 显示反馈
        this.showFeedback('正确！做得很好！', 'success');
        
        // 显示下一个按钮
        this.checkButton.style.display = 'none';
        this.nextButton.style.display = 'block';
        
        // 添加动画
        const fragments = this.buildingArea.children;
        Array.from(fragments).forEach(fragment => {
            fragment.classList.add('correct');
        });
    }

    handleIncorrectAnswer() {
        // 显示反馈
        this.showFeedback('再试一次！', 'error');
        
        // 添加动画
        const fragments = this.buildingArea.children;
        Array.from(fragments).forEach(fragment => {
            fragment.classList.add('incorrect');
            setTimeout(() => fragment.classList.remove('incorrect'), 500);
        });
    }

    showHint() {
        this.wordDefinitionElement.style.display = 'block';
        this.hintButton.disabled = true;
        setTimeout(() => {
            this.wordDefinitionElement.style.display = 'none';
            this.hintButton.disabled = false;
        }, 3000);
    }

    nextWord() {
        this.wordIndex++;
        if (this.wordIndex >= this.gameData.words.length) {
            this.completedLevel();
        } else {
            this.loadWord();
        }
    }

    completedLevel() {
        const requiredScore = this.gameData.levelInfo.requiredScore;
        if (this.currentScore >= requiredScore) {
            this.currentLevel++;
            this.showFeedback('恭喜！关卡完成！', 'success');
            setTimeout(() => {
                this.wordIndex = 0;
                this.initGame();
            }, 2000);
        } else {
            this.showFeedback('继续努力以达到目标分数！', 'error');
            setTimeout(() => {
                this.wordIndex = 0;
                this.loadWord();
            }, 2000);
        }
    }

    showFeedback(message, type) {
        this.feedbackElement.textContent = message;
        this.feedbackElement.className = `feedback ${type} show`;
        setTimeout(() => {
            this.feedbackElement.classList.remove('show');
        }, 2000);
    }

    updateScoreDisplay() {
        this.scoreElement.textContent = this.currentScore;
    }

    updateLevelDisplay() {
        this.levelElement.textContent = this.currentLevel;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// 当DOM加载完成时初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new WordBuilder();
});
