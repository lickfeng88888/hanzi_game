// 游戏状态
let currentDifficulty = 'easy';
let currentQuestion = null;
let score = 0;
let level = 1;
let selectedBlocks = [];
let soundEnabled = true;

// DOM 元素
const difficultySelect = document.getElementById('difficulty');
const soundToggle = document.getElementById('soundToggle');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const targetWordDisplay = document.getElementById('targetWord');
const pinyinHintDisplay = document.getElementById('pinyinHint');
const characterGrid = document.getElementById('characterGrid');
const selectedCharsDisplay = document.getElementById('selectedChars');
const checkWordButton = document.getElementById('checkWord');
const clearSelectionButton = document.getElementById('clearSelection');
const hintButton = document.getElementById('hint');
const nextLevelButton = document.getElementById('nextLevel');
const modal = document.getElementById('resultModal');
const modalTitle = document.getElementById('resultTitle');
const modalMessage = document.getElementById('resultMessage');
const wordExplanation = document.getElementById('wordExplanation');
const closeModal = document.getElementById('closeModal');

// 音效
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!soundEnabled) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'select':
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            break;
        case 'correct':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            break;
        case 'wrong':
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            break;
    }
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// 初始化游戏
function initGame() {
    difficultySelect.addEventListener('change', handleDifficultyChange);
    soundToggle.addEventListener('click', toggleSound);
    checkWordButton.addEventListener('click', checkWord);
    clearSelectionButton.addEventListener('click', clearSelection);
    hintButton.addEventListener('click', showHint);
    nextLevelButton.addEventListener('click', nextLevel);
    closeModal.addEventListener('click', () => modal.style.display = 'none');

    startLevel();
}

// 开始新关卡
function startLevel() {
    // 清理选择
    clearSelection();
    selectedBlocks = [];

    // 获取当前难度的题目
    const questions = gameQuestions[currentDifficulty];
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];

    // 显示目标词语和拼音
    targetWordDisplay.textContent = currentQuestion.word;
    pinyinHintDisplay.textContent = currentQuestion.pinyin;
    pinyinHintDisplay.style.visibility = 'hidden';

    // 创建字符网格
    createCharacterGrid();

    // 更新界面
    levelDisplay.textContent = level;
    checkWordButton.disabled = false;
    nextLevelButton.disabled = true;
}

// 创建字符网格
function createCharacterGrid() {
    characterGrid.innerHTML = '';
    
    // 准备所有字符
    const targetChars = currentQuestion.word.split('');
    const extraChars = getExtraCharacters(targetChars.length);
    const allChars = shuffleArray([...targetChars, ...extraChars]);

    // 创建方块
    allChars.forEach((char, index) => {
        const block = document.createElement('div');
        block.className = 'character-block';
        block.textContent = char;
        block.dataset.char = char;
        block.dataset.index = index;
        block.addEventListener('click', handleBlockClick);
        
        // 添加延迟出现的动画
        block.style.animationDelay = `${index * 0.1}s`;
        
        characterGrid.appendChild(block);
    });
}

// 获取额外的字符
function getExtraCharacters(targetLength) {
    const commonChars = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞';
    const extraChars = [];
    while (extraChars.length < targetLength * 2) {
        const randomChar = commonChars[Math.floor(Math.random() * commonChars.length)];
        if (!extraChars.includes(randomChar)) {
            extraChars.push(randomChar);
        }
    }
    return extraChars;
}

// 处理方块点击
function handleBlockClick(e) {
    const block = e.target;
    
    if (block.classList.contains('selected')) {
        // 取消选择
        block.classList.remove('selected');
        const index = selectedBlocks.indexOf(block);
        if (index > -1) {
            selectedBlocks.splice(index, 1);
        }
    } else {
        // 添加选择
        if (selectedBlocks.length < currentQuestion.word.length) {
            block.classList.add('selected');
            selectedBlocks.push(block);
            playSound('select');
        }
    }
    
    // 更新显示
    updateSelectedDisplay();
}

// 更新已选择的显示
function updateSelectedDisplay() {
    selectedCharsDisplay.textContent = selectedBlocks.map(block => block.dataset.char).join('');
}

// 检查答案
function checkWord() {
    if (selectedBlocks.length !== currentQuestion.word.length) {
        showResult(false, '请选择正确数量的汉字！');
        return;
    }

    const selectedWord = selectedBlocks.map(block => block.dataset.char).join('');
    const correct = selectedWord === currentQuestion.word;

    if (correct) {
        // 播放正确动画
        selectedBlocks.forEach((block, index) => {
            setTimeout(() => {
                block.classList.add('correct');
            }, index * 100);
        });

        // 更新分数
        score += 10;
        scoreDisplay.textContent = score;

        // 显示结果
        showResult(true);
    } else {
        // 播放错误动画
        selectedBlocks.forEach(block => {
            block.classList.add('wrong');
            setTimeout(() => {
                block.classList.remove('wrong');
            }, 500);
        });

        showResult(false, '组成的词语不正确，请重试！');
    }
}

// 显示结果
function showResult(isCorrect, message = '') {
    if (isCorrect) {
        playSound('correct');
        modalTitle.textContent = '太棒了！';
        modalMessage.textContent = `你已经掌握了"${currentQuestion.word}"这个词语！`;
        wordExplanation.innerHTML = `
            <strong>拼音：</strong>${currentQuestion.pinyin}<br>
            <strong>释义：</strong>${currentQuestion.explanation}<br>
            <strong>例句：</strong>${currentQuestion.example}
        `;
        
        checkWordButton.disabled = true;
        nextLevelButton.disabled = false;

        // 升级检查
        if (score >= level * 50) {
            level++;
            levelDisplay.textContent = level;
            if (currentDifficulty === 'easy' && level >= 5) {
                currentDifficulty = 'medium';
                difficultySelect.value = 'medium';
            } else if (currentDifficulty === 'medium' && level >= 10) {
                currentDifficulty = 'hard';
                difficultySelect.value = 'hard';
            }
        }
    } else {
        playSound('wrong');
        modalTitle.textContent = '继续加油！';
        modalMessage.textContent = message;
        wordExplanation.textContent = '';
    }

    modal.style.display = 'flex';
}

// 清除选择
function clearSelection() {
    selectedBlocks.forEach(block => {
        block.classList.remove('selected', 'correct', 'wrong');
    });
    selectedBlocks = [];
    updateSelectedDisplay();
}

// 显示提示
function showHint() {
    pinyinHintDisplay.style.visibility = 'visible';
    setTimeout(() => {
        pinyinHintDisplay.style.visibility = 'hidden';
    }, 2000);
}

// 下一关
function nextLevel() {
    startLevel();
}

// 切换难度
function handleDifficultyChange(e) {
    currentDifficulty = e.target.value;
    level = 1;
    score = 0;
    scoreDisplay.textContent = score;
    startLevel();
}

// 切换声音
function toggleSound() {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
}

// 辅助函数：打乱数组
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
