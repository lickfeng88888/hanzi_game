// 游戏状态
let currentQuestion = null;
let currentDifficulty = 'easy';
let score = 0;
let level = 1;
let soundEnabled = true;

// DOM 元素
const difficultySelect = document.getElementById('difficulty');
const soundToggle = document.getElementById('soundToggle');
const questionText = document.querySelector('.question-text');
const pinyinHint = document.querySelector('.pinyin-hint');
const dropArea = document.getElementById('dropArea');
const charactersArea = document.getElementById('charactersArea');
const checkAnswerButton = document.getElementById('checkAnswer');
const nextQuestionButton = document.getElementById('nextQuestion');
const hintButton = document.getElementById('hint');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
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
        case 'drop':
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            break;
    }
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// 初始化游戏
function initGame() {
    loadGameQuestions();
    difficultySelect.addEventListener('change', handleDifficultyChange);
    soundToggle.addEventListener('click', toggleSound);
    checkAnswerButton.addEventListener('click', checkAnswer);
    nextQuestionButton.addEventListener('click', nextQuestion);
    hintButton.addEventListener('click', showHint);
    closeModal.addEventListener('click', () => modal.style.display = 'none');
}

// 加载游戏题目
async function loadGameQuestions() {
    try {
        await import('../data/dragWord/questions.js');
        startNewQuestion();
    } catch (error) {
        console.error('Error loading questions:', error);
        questionText.textContent = '加载题目失败，请刷新页面重试。';
    }
}

// 开始新问题
function startNewQuestion() {
    const questions = gameQuestions[currentDifficulty];
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    // 清空拖放区域
    dropArea.innerHTML = '';
    charactersArea.innerHTML = '';
    
    // 创建拖放槽
    for (let i = 0; i < currentQuestion.word.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'drop-slot';
        slot.dataset.index = i;
        dropArea.appendChild(slot);
    }
    
    // 创建打乱的字符
    const characters = currentQuestion.word.split('');
    const shuffledCharacters = shuffleArray([...characters]);
    
    shuffledCharacters.forEach((char, index) => {
        const charElement = document.createElement('div');
        charElement.className = 'character';
        charElement.textContent = char;
        charElement.draggable = true;
        charElement.dataset.char = char;
        
        charElement.addEventListener('dragstart', handleDragStart);
        charElement.addEventListener('dragend', handleDragEnd);
        
        charactersArea.appendChild(charElement);
    });
    
    // 设置提示
    questionText.textContent = '请将汉字拖到正确的位置组成词语：';
    pinyinHint.textContent = currentQuestion.pinyin;
    
    // 设置拖放区域事件
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('drop', handleDrop);
    
    // 重置按钮状态
    checkAnswerButton.disabled = false;
    nextQuestionButton.disabled = true;
}

// 处理拖拽事件
function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.char);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const char = e.dataTransfer.getData('text/plain');
    const target = e.target;
    
    if (target.classList.contains('drop-slot') && !target.hasChildNodes()) {
        const charElement = document.querySelector(`.character[data-char="${char}"]`);
        if (charElement) {
            target.appendChild(charElement);
            charElement.draggable = false;
            playSound('drop');
        }
    }
}

// 检查答案
function checkAnswer() {
    const slots = Array.from(dropArea.children);
    const answer = slots.map(slot => {
        const charElement = slot.firstChild;
        return charElement ? charElement.dataset.char : '';
    }).join('');
    
    const correct = answer === currentQuestion.word;
    
    if (correct) {
        playSound('correct');
        score += 10;
        scoreDisplay.textContent = score;
        
        modalTitle.textContent = '回答正确！';
        modalMessage.textContent = `太棒了！你已经掌握了"${currentQuestion.word}"这个词语。`;
        wordExplanation.innerHTML = `
            <strong>拼音：</strong>${currentQuestion.pinyin}<br>
            <strong>释义：</strong>${currentQuestion.explanation}<br>
            <strong>例句：</strong>${currentQuestion.example}
        `;
    } else {
        playSound('wrong');
        modalTitle.textContent = '继续加油！';
        modalMessage.textContent = '答案不正确，请重试。';
        wordExplanation.textContent = '';
    }
    
    modal.style.display = 'flex';
    
    if (correct) {
        checkAnswerButton.disabled = true;
        nextQuestionButton.disabled = false;
        
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
    }
}

// 下一题
function nextQuestion() {
    startNewQuestion();
}

// 显示提示
function showHint() {
    pinyinHint.style.visibility = 'visible';
    setTimeout(() => {
        pinyinHint.style.visibility = 'hidden';
    }, 2000);
}

// 切换难度
function handleDifficultyChange(e) {
    currentDifficulty = e.target.value;
    startNewQuestion();
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
initGame();
