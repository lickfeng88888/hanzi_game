/**
 * 游戏数据管理工具类
 */
class DataManager {
    constructor() {
        this.cache = new Map();
    }

    /**
     * 加载游戏数据
     * @param {string} gameId - 游戏ID
     * @param {number} level - 关卡
     * @returns {Promise<Object>} 游戏数据
     */
    async loadGameData(gameId, level) {
        const cacheKey = `${gameId}_${level}`;
        
        // 检查缓存
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`/assets/data/english/${gameId}/level${level}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // 缓存数据
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error(`Error loading game data for ${gameId} level ${level}:`, error);
            throw error;
        }
    }

    /**
     * 保存用户数据
     * @param {Object} userData - 用户数据
     */
    saveUserData(userData) {
        localStorage.setItem('english_games_user_data', JSON.stringify(userData));
    }

    /**
     * 加载用户数据
     * @returns {Object} 用户数据
     */
    loadUserData() {
        const userData = localStorage.getItem('english_games_user_data');
        return userData ? JSON.parse(userData) : {};
    }

    /**
     * 清除缓存数据
     * @param {string} gameId - 游戏ID（可选，不传则清除所有缓存）
     */
    clearCache(gameId) {
        if (gameId) {
            // 清除指定游戏的缓存
            for (const key of this.cache.keys()) {
                if (key.startsWith(gameId)) {
                    this.cache.delete(key);
                }
            }
        } else {
            // 清除所有缓存
            this.cache.clear();
        }
    }

    /**
     * 预加载下一关卡数据
     * @param {string} gameId - 游戏ID
     * @param {number} currentLevel - 当前关卡
     */
    preloadNextLevel(gameId, currentLevel) {
        const nextLevel = currentLevel + 1;
        this.loadGameData(gameId, nextLevel).catch(() => {
            // 静默失败，因为这只是预加载
            console.log(`Preload failed for ${gameId} level ${nextLevel}`);
        });
    }
}

// 导出单例实例
export const dataManager = new DataManager();
