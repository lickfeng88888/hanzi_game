/**
 * 游戏进度管理工具类
 */
class ProgressManager {
    constructor() {
        this.STORAGE_KEY = 'english_games_progress';
    }

    /**
     * 保存游戏进度
     * @param {string} gameId - 游戏ID
     * @param {number} level - 关卡
     * @param {number} score - 分数
     */
    saveProgress(gameId, level, score) {
        const progress = this.getAllProgress();
        progress[gameId] = progress[gameId] || {};
        progress[gameId].level = Math.max(progress[gameId].level || 0, level);
        progress[gameId].score = Math.max(progress[gameId].score || 0, score);
        progress[gameId].lastPlayed = new Date().toISOString();

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    }

    /**
     * 加载游戏进度
     * @param {string} gameId - 游戏ID
     * @returns {Object} 游戏进度数据
     */
    loadProgress(gameId) {
        const progress = this.getAllProgress();
        return progress[gameId] || { level: 1, score: 0 };
    }

    /**
     * 获取所有游戏进度
     * @returns {Object} 所有游戏的进度数据
     */
    getAllProgress() {
        const progressStr = localStorage.getItem(this.STORAGE_KEY);
        return progressStr ? JSON.parse(progressStr) : {};
    }

    /**
     * 更新成就
     * @param {string} gameId - 游戏ID
     * @param {string} achievement - 成就ID
     */
    updateAchievements(gameId, achievement) {
        const progress = this.getAllProgress();
        progress[gameId] = progress[gameId] || {};
        progress[gameId].achievements = progress[gameId].achievements || [];
        
        if (!progress[gameId].achievements.includes(achievement)) {
            progress[gameId].achievements.push(achievement);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
            return true; // 新获得的成就
        }
        return false; // 已有的成就
    }

    /**
     * 重置游戏进度
     * @param {string} gameId - 游戏ID
     */
    resetProgress(gameId) {
        const progress = this.getAllProgress();
        if (gameId) {
            delete progress[gameId];
        } else {
            progress = {};
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    }

    /**
     * 获取最近玩过的游戏
     * @param {number} limit - 限制数量
     * @returns {Array} 最近玩过的游戏列表
     */
    getRecentGames(limit = 5) {
        const progress = this.getAllProgress();
        return Object.entries(progress)
            .filter(([, data]) => data.lastPlayed)
            .sort((a, b) => new Date(b[1].lastPlayed) - new Date(a[1].lastPlayed))
            .slice(0, limit)
            .map(([gameId]) => gameId);
    }
}

// 导出单例实例
export const progressManager = new ProgressManager();
