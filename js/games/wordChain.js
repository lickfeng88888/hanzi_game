// 游戏状态
let currentDifficulty = 'easy';
let score = 0;
let level = 1;
let timeLeft = 60;
let timer = null;
let currentWord = '';
let usedWords = new Set();
let soundEnabled = true;
let audioContext = null;

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
const closeModal = document.getElementById('closeModal');

// 初始化音频上下文
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }
}

// 音效
function playSound(type) {
    if (!soundEnabled || !audioContext) return;

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
    // 初始化音频（需要用户交互）
    document.addEventListener('click', initAudio, { once: true });
    
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

// 开始计时器
function startTimer() {
    if (timer) {
        clearInterval(timer);
    }
    
    updateTimeDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimeDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showTimeUp();
        }
    }, 1000);
}

// 更新时间显示
function updateTimeDisplay() {
    if (timeLeftDisplay) {
        timeLeftDisplay.textContent = timeLeft;
    }
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
    const input = e.target.value.trim();
    updateSuggestions(input);
    
    // 验证输入并更新提交按钮状态
    if (input) {
        const lastChar = currentWord.charAt(currentWord.length - 1);
        const isValidStart = input.charAt(0) === lastChar;
        const words = gameData[currentDifficulty].words;
        const wordExists = words.some(w => w.word === input);
        const notUsed = !usedWords.has(input);
        
        // 启用或禁用提交按钮
        if (isValidStart && wordExists && notUsed) {
            submitButton.removeAttribute('disabled');
            submitButton.classList.remove('disabled');
        } else {
            submitButton.setAttribute('disabled', 'true');
            submitButton.classList.add('disabled');
        }
    } else {
        submitButton.setAttribute('disabled', 'true');
        submitButton.classList.add('disabled');
    }
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
    const input = wordInput.value.trim();
    if (!input) return;

    const lastChar = currentWord.charAt(currentWord.length - 1);
    if (input.charAt(0) !== lastChar) {
        showMessage('第一个字必须是上一个词的最后一个字！', 'error');
        playSound('wrong');
        return;
    }

    const wordObj = gameData[currentDifficulty].words.find(w => w.word === input);
    if (!wordObj) {
        showMessage('这个词不在词库中！', 'error');
        playSound('wrong');
        return;
    }

    if (usedWords.has(input)) {
        showMessage('这个词已经用过了！', 'error');
        playSound('wrong');
        return;
    }

    // 成功提交
    usedWords.add(input);
    currentWord = input;
    score += 10;
    updateUI();
    updateWordChain();
    updateLastChar();
    updateUsedWordsDisplay();
    wordInput.value = '';
    
    // 显示成功提示
    showSuccessModal(wordObj);

    // 检查是否完成关卡
    if (usedWords.size >= 5) {
        clearInterval(timer);
        showLevelComplete();
    }
}

// 显示成功提交弹窗
function showSuccessModal(wordData) {
    const message = `
        <div class="success-content">
            <div class="word-info">
                <h3>${wordData.word}</h3>
                <p class="pinyin">${wordData.pinyin}</p>
                <p class="meaning">${wordData.meaning || wordData.explanation}</p>
                <p class="example">例句：${wordData.examples[0]}</p>
            </div>
            <div class="stats">
                <p>当前分数：${score}</p>
                <p>已用词语：${usedWords.size}</p>
                <p>剩余时间：${timeLeft}秒</p>
            </div>
        </div>
    `;
    showMessage(message, '真棒！接龙成功！', 'success');
}

// 显示关卡完成弹窗
function showLevelComplete() {
    const message = `
        <div class="level-complete-content">
            <h3>🎉 恭喜完成第${level}关！</h3>
            <div class="level-stats">
                <p>获得分数：${score}</p>
                <p>完成词语：${usedWords.size}个</p>
                <p>剩余时间：${timeLeft}秒</p>
                <p>额外时间奖励：+${timeLeft}分</p>
            </div>
            <div class="bonus-info">
                <p>时间奖励已添加到总分！</p>
                <button class="next-level-btn" onclick="nextLevel()">进入下一关</button>
            </div>
        </div>
    `;
    score += timeLeft; // 添加时间奖励分数
    showMessage(message, '关卡完成！', 'success');
}

// 检查词语接龙规则
function checkWordChain(prevWord, newWord) {
    const lastChar = prevWord.charAt(prevWord.length - 1);
    return newWord.charAt(0) === lastChar;
}

// 显示提示
function showHint() {
    const lastChar = currentWord.charAt(currentWord.length - 1);
    const availableWords = gameData[currentDifficulty].words.filter(wordObj => {
        const word = wordObj.word;
        return word.charAt(0) === lastChar && !usedWords.has(word);
    });

    if (availableWords.length > 0) {
        const hintWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        showMessage(`
            提示词语：${hintWord.word}<br>
            拼音：${hintWord.pinyin || '暂无'}<br>
            释义：${hintWord.meaning || '暂无'}
            ${hintWord.example ? `<br>例句：${hintWord.example}` : ''}
        `, 'hint');
        playSound('hint');
    } else {
        showMessage('没有可用的提示词了！', 'warning');
    }
}

// 显示消息
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('fade-out');
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
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

// 获取提示
function getHint(currentWord, difficulty) {
    const lastChar = currentWord.charAt(currentWord.length - 1);
    const words = gameData[difficulty].words;
    const availableWords = words.filter(item => 
        item.word.charAt(0) === lastChar && 
        !usedWords.has(item.word)
    );

    if (availableWords.length === 0) {
        return '小朋友，这个字已经没有更多可以接的词语了，让我们跳过它试试别的吧！';
    }
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    let hintText = `提示：\n`;
    hintText += `1. 这个词语是"${randomWord.word}"（${randomWord.pinyin}）\n`;
    hintText += `2. 它的意思是：${randomWord.meaning || randomWord.explanation}\n`;
    hintText += `3. 例句：${randomWord.examples[0]}\n`;
    
    // 根据难度给出不同的额外提示
    switch(difficulty) {
        case 'easy':
            hintText += `4. 这是一个${randomWord.word.length}个字的常用词语\n`;
            hintText += `5. 相关词语：${randomWord.relatedWords.join('、')}\n`;
            break;
        case 'medium':
            hintText += `4. 这是一个成语，经常用来${randomWord.meaning}\n`;
            hintText += `5. 你可以这样用：${randomWord.examples.join('、')}\n`;
            break;
        case 'hard':
            hintText += `4. 这是一句优美的诗词短语\n`;
            hintText += `5. 这句诗描写了${randomWord.meaning}\n`;
            break;
    }
    
    hintText += `\n小贴士：记住词语的第一个字是"${randomWord.word.charAt(0)}"，它和"${lastChar}"字正好可以接上哦！`;
    
    return hintText;
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
