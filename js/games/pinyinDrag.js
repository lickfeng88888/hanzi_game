// 游戏状态
let currentDifficulty = 'easy';
let currentQuestion = null;
let score = 0;
let level = 1;
let soundEnabled = true;

// DOM 元素
const difficultySelect = document.getElementById('difficulty');
const soundToggle = document.getElementById('soundToggle');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const questionText = document.getElementById('questionText');
const pinyinHints = document.getElementById('pinyinHints');
const dropZones = document.getElementById('dropZones');
const characterChoices = document.getElementById('characterChoices');
const checkAnswerButton = document.getElementById('checkAnswer');
const showHintButton = document.getElementById('showHint');
const resetAnswerButton = document.getElementById('resetAnswer');
const nextQuestionButton = document.getElementById('nextQuestion');
const modal = document.getElementById('resultModal');
const modalTitle = document.getElementById('resultTitle');
const modalMessage = document.getElementById('resultMessage');
const explanation = document.getElementById('explanation');
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
        case 'drag':
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            break;
        case 'drop':
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
    difficultySelect.addEventListener('change', handleDifficultyChange);
    soundToggle.addEventListener('click', toggleSound);
    checkAnswerButton.addEventListener('click', checkAnswer);
    showHintButton.addEventListener('click', showHint);
    resetAnswerButton.addEventListener('click', resetAnswer);
    nextQuestionButton.addEventListener('click', nextQuestion);
    closeModal.addEventListener('click', () => modal.style.display = 'none');

    startLevel();
}

// 开始新关卡
function startLevel() {
    // 获取当前难度的题目
    const questions = gameQuestions[currentDifficulty];
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];

    // 显示题目
    displayQuestion();

    // 创建拖放区域
    createDropZones();

    // 创建汉字选项
    createCharacterChoices();

    // 更新界面
    updateUI();
}

// 显示题目
function displayQuestion() {
    // 显示题目文本，将占位符替换为下划线
    questionText.textContent = currentQuestion.text;
    
    // 显示拼音提示
    pinyinHints.textContent = currentQuestion.pinyin.join(' ');
}

// 创建拖放区域
function createDropZones() {
    dropZones.innerHTML = '';
    
    currentQuestion.answer.forEach((_, index) => {
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.index = index;
        
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDrop);
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragleave', handleDragLeave);
        
        dropZones.appendChild(dropZone);
    });
}

// 创建汉字选项
function createCharacterChoices() {
    characterChoices.innerHTML = '';
    
    // 合并正确答案和额外的干扰字
    const allCharacters = [...currentQuestion.answer];
    const extraCharacters = getExtraCharacters(allCharacters.length);
    const shuffledCharacters = shuffleArray([...allCharacters, ...extraCharacters]);
    
    shuffledCharacters.forEach(char => {
        const charDiv = document.createElement('div');
        charDiv.className = 'character';
        charDiv.textContent = char;
        charDiv.draggable = true;
        
        charDiv.addEventListener('dragstart', handleDragStart);
        charDiv.addEventListener('dragend', handleDragEnd);
        
        characterChoices.appendChild(charDiv);
    });
}

// 获取额外的干扰字
function getExtraCharacters(count) {
    const commonChars = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞';
    const extraChars = [];
    while (extraChars.length < count * 2) {
        const randomChar = commonChars[Math.floor(Math.random() * commonChars.length)];
        if (!extraChars.includes(randomChar) && !currentQuestion.answer.includes(randomChar)) {
            extraChars.push(randomChar);
        }
    }
    return extraChars;
}

// 处理拖拽事件
function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.textContent);
    playSound('drag');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('drop-zone')) {
        e.target.classList.add('hover');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('drop-zone')) {
        e.target.classList.remove('hover');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = e.target;
    
    if (!dropZone.classList.contains('drop-zone') || dropZone.hasChildNodes()) {
        return;
    }

    const char = e.dataTransfer.getData('text/plain');
    const charElement = document.createElement('div');
    charElement.className = 'character';
    charElement.textContent = char;
    charElement.draggable = true;
    
    dropZone.appendChild(charElement);
    dropZone.classList.remove('hover');
    dropZone.classList.add('filled');
    
    playSound('drop');
}

// 检查答案
function checkAnswer() {
    const filledDropZones = Array.from(dropZones.children);
    const userAnswer = filledDropZones.map(zone => {
        const charDiv = zone.firstChild;
        return charDiv ? charDiv.textContent : '';
    });

    const isCorrect = userAnswer.every((char, index) => char === currentQuestion.answer[index]);

    if (isCorrect) {
        playSound('correct');
        score += 10;
        showResult(true);
        
        // 检查是否需要提高难度
        if (score >= level * 50) {
            level++;
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
        showResult(false);
    }

    updateUI();
}

// 显示结果
function showResult(isCorrect) {
    modalTitle.textContent = isCorrect ? '回答正确！' : '继续加油！';
    modalMessage.textContent = isCorrect ? 
        `太棒了！你已经掌握了这个题目！` : 
        '答案不正确，请重试。';
    
    explanation.textContent = currentQuestion.explanation;
    
    modal.style.display = 'flex';
    
    // 更新按钮状态
    checkAnswerButton.disabled = isCorrect;
    nextQuestionButton.disabled = !isCorrect;
}

// 显示提示
function showHint() {
    modalTitle.textContent = '提示';
    modalMessage.textContent = currentQuestion.hint;
    explanation.textContent = '';
    modal.style.display = 'flex';
}

// 重置答案
function resetAnswer() {
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.innerHTML = '';
        zone.classList.remove('filled');
    });
}

// 下一题
function nextQuestion() {
    startLevel();
    nextQuestionButton.disabled = true;
    checkAnswerButton.disabled = false;
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
