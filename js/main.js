// 主页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 为所有游戏卡片添加点击效果
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的不是按钮，则触发按钮点击
            if (e.target.tagName !== 'BUTTON') {
                const button = this.querySelector('button');
                if (button) {
                    button.click();
                }
            }
        });
    });

    // 检查本地存储中的游戏进度
    checkGameProgress();
});

// 检查游戏进度
function checkGameProgress() {
    const games = ['dragWord', 'connectLine', 'wordEliminate', 'pinyinDrag', 'wordChain'];
    
    games.forEach(game => {
        const progress = localStorage.getItem(`${game}_progress`);
        if (progress) {
            const card = document.querySelector(`[data-game="${game}"]`);
            if (card) {
                // 添加进度标记
                const progressMark = document.createElement('div');
                progressMark.className = 'progress-mark';
                progressMark.textContent = `进度: ${progress}%`;
                card.appendChild(progressMark);
            }
        }
    });
}

// 游戏进度保存函数
function saveGameProgress(gameName, progress) {
    localStorage.setItem(`${gameName}_progress`, progress);
}

// 音效控制
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            oscillator.type = 'sine';
            break;
        case 'success':
            oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            oscillator.type = 'sine';
            break;
        case 'error':
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            oscillator.type = 'square';
            break;
    }
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.1);
}
