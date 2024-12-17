// 游戏状态
let currentMode = 'pinyin';
let currentLevel = 0;
let score = 0;
let timer = 60;
let timerInterval;
let connections = new Map();
let selectedItem = null;
let soundEnabled = true;

// DOM 元素
const gameModeSelect = document.getElementById('gameMode');
const soundToggle = document.getElementById('soundToggle');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const timerDisplay = document.getElementById('timer');
const canvas = document.getElementById('connectionCanvas');
const ctx = canvas.getContext('2d');
const leftColumn = document.querySelector('.left-column');
const rightColumn = document.querySelector('.right-column');
const checkAnswerButton = document.getElementById('checkAnswer');
const clearLinesButton = document.getElementById('clearLines');
const nextLevelButton = document.getElementById('nextLevel');
const modal = document.getElementById('resultModal');
const modalTitle = document.getElementById('resultTitle');
const modalMessage = document.getElementById('resultMessage');
const explanationArea = document.getElementById('explanationArea');
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
        case 'connect':
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
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
    // 设置画布大小
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 添加事件监听器
    gameModeSelect.addEventListener('change', handleModeChange);
    soundToggle.addEventListener('click', toggleSound);
    checkAnswerButton.addEventListener('click', checkAnswer);
    clearLinesButton.addEventListener('click', clearConnections);
    nextLevelButton.addEventListener('click', nextLevel);
    closeModal.addEventListener('click', () => modal.style.display = 'none');

    // 开始第一关
    startLevel();
}

// 调整画布大小
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    redrawConnections();
}

// 开始新关卡
function startLevel() {
    // 清理旧的状态
    clearConnections();
    connections.clear();
    selectedItem = null;

    // 重置计时器
    clearInterval(timerInterval);
    timer = 60;
    timerDisplay.textContent = timer;
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            showResult(false);
        }
    }, 1000);

    // 获取当前模式的题目
    const questions = gameQuestions[currentMode];
    const currentQuestion = questions[currentLevel % questions.length];

    // 创建左右列表项
    createItems(currentQuestion);

    // 更新界面
    levelDisplay.textContent = currentLevel + 1;
    checkAnswerButton.disabled = false;
    nextLevelButton.disabled = true;
}

// 创建列表项
function createItems(question) {
    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    // 打乱答案顺序
    const shuffledAnswers = shuffleArray([...question.answers]);

    question.words.forEach((word, index) => {
        const wordItem = createListItem(word, 'word-item', index);
        leftColumn.appendChild(wordItem);
    });

    shuffledAnswers.forEach((answer, index) => {
        const meaningItem = createListItem(answer, 'meaning-item', index);
        rightColumn.appendChild(meaningItem);
    });
}

// 创建列表项元素
function createListItem(text, className, index) {
    const item = document.createElement('div');
    item.className = className;
    item.textContent = text;
    item.dataset.index = index;
    item.addEventListener('click', handleItemClick);
    return item;
}

// 处理列表项点击
function handleItemClick(e) {
    const item = e.target;
    const isLeftItem = item.classList.contains('word-item');

    // 如果点击已连接的项目，取消连接
    if (isLeftItem && connections.has(item)) {
        const connectedItem = connections.get(item);
        item.classList.remove('selected');
        connectedItem.classList.remove('selected');
        connections.delete(item);
        redrawConnections();
        return;
    }

    if (!selectedItem) {
        // 第一次选择
        selectedItem = item;
        item.classList.add('selected');
    } else {
        const firstIsLeft = selectedItem.classList.contains('word-item');
        const secondIsLeft = item.classList.contains('word-item');

        // 确保一左一右
        if (firstIsLeft === secondIsLeft) {
            selectedItem.classList.remove('selected');
            selectedItem = item;
            item.classList.add('selected');
        } else {
            // 建立连接
            const leftItem = firstIsLeft ? selectedItem : item;
            const rightItem = firstIsLeft ? item : selectedItem;

            // 移除旧连接
            if (connections.has(leftItem)) {
                connections.get(leftItem).classList.remove('selected');
            }
            connections.set(leftItem, rightItem);

            // 更新视觉效果
            playSound('connect');
            redrawConnections();
        }
        selectedItem.classList.remove('selected');
        item.classList.remove('selected');
        selectedItem = null;
    }
}

// 重绘连接线
function redrawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;

    connections.forEach((rightItem, leftItem) => {
        const start = getItemCenter(leftItem);
        const end = getItemCenter(rightItem);

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    });
}

// 获取元素中心点
function getItemCenter(element) {
    const rect = element.getBoundingClientRect();
    const containerRect = canvas.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
    };
}

// 检查答案
function checkAnswer() {
    const questions = gameQuestions[currentMode];
    const currentQuestion = questions[currentLevel % questions.length];
    let allCorrect = true;
    let correctCount = 0;

    // 检查每个连接
    connections.forEach((rightItem, leftItem) => {
        const wordIndex = parseInt(leftItem.dataset.index);
        const answerIndex = parseInt(rightItem.dataset.index);
        const isCorrect = currentQuestion.answers[wordIndex] === rightItem.textContent;

        if (isCorrect) {
            leftItem.classList.add('correct');
            rightItem.classList.add('correct');
            correctCount++;
        } else {
            leftItem.classList.add('wrong');
            rightItem.classList.add('wrong');
            allCorrect = false;
        }
    });

    // 更新分数
    if (allCorrect) {
        score += Math.floor(timer / 2) + 10;
        scoreDisplay.textContent = score;
    }

    // 显示结果
    showResult(allCorrect, currentQuestion);
}

// 显示结果
function showResult(isCorrect, question) {
    clearInterval(timerInterval);

    if (isCorrect) {
        playSound('correct');
        modalTitle.textContent = '太棒了！';
        modalMessage.textContent = '你已经完全掌握了这组词语！';
        nextLevelButton.disabled = false;
    } else {
        playSound('wrong');
        modalTitle.textContent = '继续加油！';
        modalMessage.textContent = '还有一些连接不正确，仔细想想再试试吧！';
    }

    // 显示解释
    let explanationHTML = '<h3>详细解释：</h3><ul>';
    question.explanations.forEach(exp => {
        explanationHTML += `<li>${exp}</li>`;
    });
    explanationHTML += '</ul>';
    explanationArea.innerHTML = explanationHTML;

    modal.style.display = 'flex';
}

// 清除连接
function clearConnections() {
    connections.clear();
    document.querySelectorAll('.word-item, .meaning-item').forEach(item => {
        item.classList.remove('selected', 'correct', 'wrong');
    });
    redrawConnections();
}

// 下一关
function nextLevel() {
    currentLevel++;
    startLevel();
}

// 切换游戏模式
function handleModeChange(e) {
    currentMode = e.target.value;
    currentLevel = 0;
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
