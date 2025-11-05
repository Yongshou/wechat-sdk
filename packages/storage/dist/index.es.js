class a {
  /**
   * 构造函数
   * @param prefix 存储键前缀，用于区分不同应用
   */
  constructor(e = "app") {
    this.prefix = e;
  }
  /**
   * 获取带前缀的存储键
   * @param key 原始键名
   * @returns 带前缀的键名
   */
  getKey(e) {
    return `${this.prefix}:${e}`;
  }
  /**
   * 存储数据到localStorage
   * @param key 键名
   * @param value 存储的值
   * @param expiry 过期时间（毫秒），可选
   */
  setLocal(e, t, r) {
    const s = {
      value: t,
      expiry: r ? Date.now() + r : null
    };
    localStorage.setItem(this.getKey(e), JSON.stringify(s));
  }
  /**
   * 从localStorage获取数据
   * @param key 键名
   * @returns 存储的值，如果过期则返回null
   */
  getLocal(e) {
    const t = localStorage.getItem(this.getKey(e));
    if (!t) return null;
    try {
      const r = JSON.parse(t);
      return r.expiry && Date.now() > r.expiry ? (this.removeLocal(e), null) : r.value;
    } catch (r) {
      return console.error("解析存储数据失败:", r), null;
    }
  }
  /**
   * 从localStorage移除数据
   * @param key 键名
   */
  removeLocal(e) {
    localStorage.removeItem(this.getKey(e));
  }
  /**
   * 存储数据到sessionStorage
   * @param key 键名
   * @param value 存储的值
   */
  setSession(e, t) {
    sessionStorage.setItem(this.getKey(e), JSON.stringify(t));
  }
  /**
   * 从sessionStorage获取数据
   * @param key 键名
   * @returns 存储的值
   */
  getSession(e) {
    const t = sessionStorage.getItem(this.getKey(e));
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch (r) {
      return console.error("解析存储数据失败:", r), null;
    }
  }
  /**
   * 从sessionStorage移除数据
   * @param key 键名
   */
  removeSession(e) {
    sessionStorage.removeItem(this.getKey(e));
  }
  /**
   * 清除所有存储数据
   * @param type 存储类型，可选值: 'local', 'session', 'all'
   */
  clear(e = "all") {
    (e === "local" || e === "all") && Object.keys(localStorage).filter((t) => t.startsWith(this.prefix)).forEach((t) => localStorage.removeItem(t)), (e === "session" || e === "all") && Object.keys(sessionStorage).filter((t) => t.startsWith(this.prefix)).forEach((t) => sessionStorage.removeItem(t));
  }
}
export {
  a as StorageService
};
