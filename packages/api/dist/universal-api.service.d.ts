/**
 * API配置响应接口
 */
export interface WechatJsConfig {
    appId: string;
    timestamp: string;
    nonceStr: string;
    signature: string;
}
/**
 * 完全独立的微信API配置请求服务
 * 不依赖任何微信方法或SDK，仅提供HTTP请求功能
 */
export declare class WechatApiConfigService {
    /**
     * 请求微信JSAPI配置
     * @param url 当前页面URL
     * @returns Promise<WechatJsConfig> 配置响应
     */
    requestConfig(url: string): Promise<WechatJsConfig>;
}
