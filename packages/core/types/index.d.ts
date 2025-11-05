/**
 * API配置响应接口
 */
export interface WechatJsConfig {
    appId: string;
    timestamp: number;
    nonceStr: string;
    signature: string;
}
/**
 * 存储服务配置选项
 */
export interface StorageOptions {
    prefix?: string;
}
