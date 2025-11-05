/**
 * 提取URL中的unionId和openId参数，将其key改为u和o，返回截取后的URL和提取的参数
 * @param url 当前页面的URL
 * @returns 包含截取后的URL和提取参数的对象，若URL格式不合法则返回null
*/
function extractParamsFromUrl(url: string): { url: string; params: { u: string | null; o: string | null } } | null {
  try {
    // 确保URL不为空且格式基本正确
    if (!url || typeof url !== 'string') {
      console.error('无效的URL:', url);
      return {
        url: '',
        params: { u: null, o: null }
      };
    }

    // 尝试解码URL，处理可能的编码问题
    let decodedUrl = url;
    try {
      decodedUrl = decodeURIComponent(url);
    } catch (e) {
      console.warn('URL解码失败，使用原始URL:', e);
    }

    // 记录详细的调试信息
    console.log('尝试解析的URL:', decodedUrl);
    console.log('URL长度:', decodedUrl.length);
    console.log('URL前100个字符:', decodedUrl.substring(0, 100));
    console.log('URL后100个字符:', decodedUrl.substring(Math.max(0, decodedUrl.length - 100)));

    const urlObj = new URL(decodedUrl);
    const u = urlObj.searchParams.get('unionId');
    const o = urlObj.searchParams.get('openId');

    // 移除unionId和openId参数
    urlObj.searchParams.delete('unionId');
    urlObj.searchParams.delete('openId');

    const resultUrl = urlObj.toString();
    console.log('解析成功，处理后的URL:', resultUrl);
    console.log('提取的参数:', { u, o });

    return {
      url: resultUrl,
      params: { u, o }
    };
  } catch (error) {
    console.error('URL解析失败:', error);
    console.error('失败的URL:', url);
    // 返回安全的默认对象，避免后续解构错误
    return {
      url: url || '',
      params: { u: null, o: null }
    };
  }
}

// 导出API服务功能
export * from './universal-api.service';
export { extractParamsFromUrl };
export * from './OrderProcessor';