import { extractParamsFromUrl } from './index';
import { ErrorHandler } from './errorHandler';

/**
 * API配置响应接口
 */
export interface WechatJsConfig {
  appId: string;
  timestamp: string;
  nonceStr: string;
  signature: string;
  // 其他可能的字段根据实际返回值添加
}

/**
 * 完全独立的微信API配置请求服务
 * 不依赖任何微信方法或SDK，仅提供HTTP请求功能
 */
export class WechatApiConfigService {
  /**
   * 请求微信JSAPI配置
   * @param url 当前页面URL
   * @returns Promise<WechatJsConfig> 配置响应
   */
  async requestConfig(url: string): Promise<WechatJsConfig> {
    // 提取并处理URL参数
    const result = extractParamsFromUrl(url);
    if (!result) {
      throw new Error('无效的URL格式');
    }
    const { url: processedUrl, params } = result;
    if (!processedUrl) {
      throw new Error('无效的URL格式');
    }

    // 从URL中提取前缀（域名）
    try {
      const urlObj = new URL(processedUrl);
      const prefix = `${urlObj.protocol}//${urlObj.host}`;

      // 构建API URL
      const cleanedPrefix = prefix.endsWith('/') ? prefix.slice(0, -1) : prefix;
      let apiUrl = `${cleanedPrefix}/api/v1/wechat/jsapi?url=${encodeURIComponent(processedUrl)}`;

      // 处理额外参数
      if (params && (params.u !== undefined && params.u !== null || params.o !== undefined && params.o !== null)) {
        apiUrl += `&params=${encodeURIComponent(JSON.stringify(params))}`;
      }

      // 发送HTTP请求
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP错误! 状态码: ${response.status}`);
      }

      // 解析响应数据
      const data = await response.json();
      return data as WechatJsConfig;
    } catch (error) {
      // 处理错误
      ErrorHandler.handle(error as any, 'WechatApiConfigService');
      throw error; // 重新抛出错误以便调用者处理
    }
  }
}