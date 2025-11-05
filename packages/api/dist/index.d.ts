/**
 * 提取URL中的unionId和openId参数，将其key改为u和o，返回截取后的URL和提取的参数
 * @param url 当前页面的URL
 * @returns 包含截取后的URL和提取参数的对象，若URL格式不合法则返回null
*/
declare function extractParamsFromUrl(url: string): {
    url: string;
    params: {
        u: string | null;
        o: string | null;
    };
} | null;
export * from './universal-api.service';
export { extractParamsFromUrl };
