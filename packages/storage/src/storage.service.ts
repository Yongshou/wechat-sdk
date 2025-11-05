/**
 * 数据存储管理服务
 * 统一管理localStorage和sessionStorage
 */
export class StorageService {
  private prefix: string;

  /**
   * 构造函数
   * @param prefix 存储键前缀，用于区分不同应用
   */
  constructor(prefix: string = 'app') {
    this.prefix = prefix;
  }

  /**
   * 获取带前缀的存储键
   * @param key 原始键名
   * @returns 带前缀的键名
   */
  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  /**
   * 存储数据到localStorage
   * @param key 键名
   * @param value 存储的值
   * @param expiry 过期时间（毫秒），可选
   */
  setLocal(key: string, value: any, expiry?: number): void {
    const data = {
      value,
      expiry: expiry ? Date.now() + expiry : null
    };
    localStorage.setItem(this.getKey(key), JSON.stringify(data));
  }

  /**
   * 从localStorage获取数据
   * @param key 键名
   * @returns 存储的值，如果过期则返回null
   */
  getLocal(key: string): any {
    const item = localStorage.getItem(this.getKey(key));
    if (!item) return null;

    try {
      const data = JSON.parse(item);
      if (data.expiry && Date.now() > data.expiry) {
        this.removeLocal(key);
        return null;
      }
      return data.value;
    } catch (error) {
      console.error('解析存储数据失败:', error);
      return null;
    }
  }

  /**
   * 从localStorage移除数据
   * @param key 键名
   */
  removeLocal(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  /**
   * 存储数据到sessionStorage
   * @param key 键名
   * @param value 存储的值
   */
  setSession(key: string, value: any): void {
    sessionStorage.setItem(this.getKey(key), JSON.stringify(value));
  }

  /**
   * 从sessionStorage获取数据
   * @param key 键名
   * @returns 存储的值
   */
  getSession(key: string): any {
    const item = sessionStorage.getItem(this.getKey(key));
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch (error) {
      console.error('解析存储数据失败:', error);
      return null;
    }
  }

  /**
   * 从sessionStorage移除数据
   * @param key 键名
   */
  removeSession(key: string): void {
    sessionStorage.removeItem(this.getKey(key));
  }

  /**
   * 清除所有存储数据
   * @param type 存储类型，可选值: 'local', 'session', 'all'
   */
  clear(type: 'local' | 'session' | 'all' = 'all'): void {
    if (type === 'local' || type === 'all') {
      // 只清除带前缀的数据
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key));
    }

    if (type === 'session' || type === 'all') {
      // 只清除带前缀的数据
      Object.keys(sessionStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => sessionStorage.removeItem(key));
    }
  }
}