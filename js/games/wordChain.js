// 游戏状态
let currentDifficulty = 'easy';
let score = 0;
let level = 1;
let timeLeft = 60;
let timer = null;
let currentWord = '';
let usedWords = new Set();
let soundEnabled = true;

// DOM 元素
const difficultySelect = document.getElementById('difficulty');
const soundToggle = document.getElementById('soundToggle');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const wordInput = document.getElementById('wordInput');
const submitButton = document.getElementById('submitWord');
const showHintButton = document.getElementById('showHint');
const skipWordButton = document.getElementById('skipWord');
const nextLevelButton = document.getElementById('nextLevel');
const timeLeftDisplay = document.getElementById('timeLeft');
const wordChainDisplay = document.querySelector('.word-chain');
const lastCharDisplay = document.querySelector('.last-char');
const wordSuggestions = document.getElementById('wordSuggestions');
const usedWordsDisplay = document.getElementById('usedWords');
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
        case 'hint':
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
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
    wordInput.addEventListener('input', handleInput);
    submitButton.addEventListener('click', submitWord);
    showHintButton.addEventListener('click', showHint);
    skipWordButton.addEventListener('click', skipWord);
    nextLevelButton.addEventListener('click', nextLevel);
    closeModal.addEventListener('click', () => modal.style.display = 'none');

    startLevel();
}

// 开始新关卡
function startLevel() {
    // 重置状态
    timeLeft = 60;
    usedWords.clear();
    updateUsedWordsDisplay();
    
    // 选择初始词
    const words = gameData[currentDifficulty].words;
    currentWord = words[Math.floor(Math.random() * words.length)].word;
    usedWords.add(currentWord);
    
    // 更新显示
    updateWordChain();
    updateLastChar();
    updateUI();
    
    // 开始计时
    startTimer();
}

// 更新词语链显示
function updateWordChain() {
    wordChainDisplay.innerHTML = '';
    Array.from(usedWords).forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.className = 'chain-word';
        wordElement.textContent = word;
        wordChainDisplay.appendChild(wordElement);
    });
}

// 更新最后一个字显示
function updateLastChar() {
    const lastChar = currentWord.charAt(currentWord.length - 1);
    lastCharDisplay.textContent = lastChar;
}

// 更新已用词显示
function updateUsedWordsDisplay() {
    usedWordsDisplay.innerHTML = '';
    Array.from(usedWords).forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.className = 'used-word';
        wordElement.textContent = word;
        usedWordsDisplay.appendChild(wordElement);
    });
}

// 处理输入
function handleInput(e) {
    const input = e.target.value;
    updateSuggestions(input);
}

// 更新建议词
function updateSuggestions(input) {
    if (!input) {
        wordSuggestions.innerHTML = '';
        return;
    }

    const words = gameData[currentDifficulty].words;
    const lastChar = currentWord.charAt(currentWord.length - 1);
    
    const suggestions = words
        .filter(w => {
            const word = w.word;
            return word.startsWith(lastChar) && 
                   word.includes(input) && 
                   !usedWords.has(word);
        })
        .slice(0, 5);

    wordSuggestions.innerHTML = '';
    suggestions.forEach(w => {
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion';
        suggestion.textContent = w.word;
        suggestion.addEventListener('click', () => {
            wordInput.value = w.word;
        });
        wordSuggestions.appendChild(suggestion);
    });
}

// 提交词语
function submitWord() {
    const word = wordInput.value.trim();
    
    if (!word) {
        showMessage('请输入词语');
        return;
    }

    if (usedWords.has(word)) {
        showMessage('这个词已经用过了');
        playSound('wrong');
        return;
    }

    const words = gameData[currentDifficulty].words;
    const wordExists = words.some(w => w.word === word);
    
    if (!wordExists) {
        showMessage('这个词不在词库中');
        playSound('wrong');
        return;
    }

    if (!checkWordChain(currentWord, word)) {
        showMessage('接龙不符合规则');
        playSound('wrong');
        return;
    }

    // 成功提交
    playSound('correct');
    usedWords.add(word);
    currentWord = word;
    score += 10;
    wordInput.value = '';
    
    updateWordChain();
    updateLastChar();
    updateUsedWordsDisplay();
    updateUI();

    // 检查是否可以进入下一关
    if (score >= level * 50) {
        showSuccess();
    }
}

// 显示提示
function showHint() {
    const hint = getHint(currentWord, currentDifficulty);
    showMessage(hint, '提示');
    playSound('hint');
}

// 跳过当前词
function skipWord() {
    const words = gameData[currentDifficulty].words;
    const lastChar = currentWord.charAt(currentWord.length - 1);
    
    const availableWords = words.filter(w => 
        w.word.startsWith(lastChar) && !usedWords.has(w.word)
    );

    if (availableWords.length === 0) {
        showMessage('没有可用的词语了');
        showSuccess();
        return;
    }

    score -= 5;
    currentWord = availableWords[Math.floor(Math.random() * availableWords.length)].word;
    usedWords.add(currentWord);
    
    updateWordChain();
    updateLastChar();
    updateUsedWordsDisplay();
    updateUI();
}

// 下一关
function nextLevel() {
    level++;
    if (currentDifficulty === 'easy' && level >= 5) {
        currentDifficulty = 'medium';
        difficultySelect.value = 'medium';
    } else if (currentDifficulty === 'medium' && level >= 10) {
        currentDifficulty = 'hard';
        difficultySelect.value = 'hard';
    }
    
    startLevel();
}

// 开始计时器
function startTimer() {
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showTimeUp();
        }
    }, 1000);
}

// 显示时间到
function showTimeUp() {
    modalTitle.textContent = '时间到！';
    modalMessage.textContent = `本关得分：${score}分`;
    wordExplanation.textContent = '';
    modal.style.display = 'flex';
    
    nextLevelButton.disabled = false;
}

// 显示成功
function showSuccess() {
    clearInterval(timer);
    
    modalTitle.textContent = '恭喜过关！';
    modalMessage.textContent = `你已经成功完成本关，得分：${score}分`;
    wordExplanation.textContent = '';
    modal.style.display = 'flex';
    
    nextLevelButton.disabled = false;
}

// 显示消息
function showMessage(message, title = '提示') {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    wordExplanation.textContent = '';
    modal.style.display = 'flex';
}

// 切换难度
function handleDifficultyChange(e) {
    currentDifficulty = e.target.value;
    level = 1;
    score = 0;
    startLevel();
}

// 切换声音
function toggleSound() {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
}

// 更新界面
function updateUI() {
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
