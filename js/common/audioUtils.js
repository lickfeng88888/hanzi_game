/**
 * 音频管理工具类
 */
class AudioManager {
    constructor() {
        this.audioCache = new Map();
        this.synthesis = window.speechSynthesis;
    }

    /**
     * 播放单词发音
     * @param {string} word - 要播放的单词
     * @param {string} accent - 口音 ('US' | 'UK')
     */
    playWord(word, accent = 'US') {
        // 首先尝试从缓存播放
        const cacheKey = `${word}_${accent}`;
        if (this.audioCache.has(cacheKey)) {
            const audio = this.audioCache.get(cacheKey);
            audio.play();
            return;
        }

        // 如果没有缓存的音频文件，使用Web Speech API
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = accent === 'US' ? 'en-US' : 'en-GB';
        this.synthesis.speak(utterance);
    }

    /**
     * 播放反馈音效
     * @param {string} type - 反馈类型 ('success' | 'error')
     */
    playFeedback(type) {
        const audio = new Audio();
        audio.src = `/assets/audio/english/${type}.mp3`;
        audio.play();
    }

    /**
     * 预加载音频文件
     * @param {string[]} wordList - 需要预加载的单词列表
     * @param {string} accent - 口音 ('US' | 'UK')
     */
    async preloadAudio(wordList, accent = 'US') {
        const loadPromises = wordList.map(word => {
            return new Promise((resolve, reject) => {
                const audio = new Audio();
                const cacheKey = `${word}_${accent}`;
                
                audio.oncanplaythrough = () => {
                    this.audioCache.set(cacheKey, audio);
                    resolve();
                };
                
                audio.onerror = reject;
                audio.src = `/assets/audio/english/${accent}/${word}.mp3`;
                audio.load();
            });
        });

        try {
            await Promise.all(loadPromises);
            console.log('Audio preload complete');
        } catch (error) {
            console.warn('Some audio files failed to load:', error);
        }
    }

    /**
     * 停止所有音频播放
     */
    stopAll() {
        this.synthesis.cancel();
        this.audioCache.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}

// 导出单例实例
export const audioManager = new AudioManager();
