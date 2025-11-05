/**
 * 数据存储管理服务
 * 统一管理localStorage和sessionStorage
 */
export declare class StorageService {
    private prefix;
    /**
     * 构造函数
     * @param prefix 存储键前缀，用于区分不同应用
     */
    constructor(prefix?: string);
    /**
     * 获取带前缀的存储键
     * @param key 原始键名
     * @returns 带前缀的键名
     */
    private getKey;
    /**
     * 存储数据到localStorage
     * @param key 键名
     * @param value 存储的值
     * @param expiry 过期时间（毫秒），可选
     */
    setLocal(key: string, value: any, expiry?: number): void;
    /**
     * 从localStorage获取数据
     * @param key 键名
     * @returns 存储的值，如果过期则返回null
     */
    getLocal(key: string): any;
    /**
     * 从localStorage移除数据
     * @param key 键名
     */
    removeLocal(key: string): void;
    /**
     * 存储数据到sessionStorage
     * @param key 键名
     * @param value 存储的值
     */
    setSession(key: string, value: any): void;
    /**
     * 从sessionStorage获取数据
     * @param key 键名
     * @returns 存储的值
     */
    getSession(key: string): any;
    /**
     * 从sessionStorage移除数据
     * @param key 键名
     */
    removeSession(key: string): void;
    /**
     * 清除所有存储数据
     * @param type 存储类型，可选值: 'local', 'session', 'all'
     */
    clear(type?: 'local' | 'session' | 'all'): void;
}
