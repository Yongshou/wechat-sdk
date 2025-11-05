import { WechatApiConfigService, extractParamsFromUrl } from '../src/index';
import { describe, test, expect, beforeEach, jest } from '@jest/globals';

describe('extractParamsFromUrl', () => {
  test('应该正确提取并移除unionId和openId参数', () => {
    const url = 'https://example.com/path?unionId=123&openId=456&other=param';
    const result = extractParamsFromUrl(url);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe('https://example.com/path?other=param');
      expect(result.params.u).toBe('123');
      expect(result.params.o).toBe('456');
    }
  });

  test('应该处理没有unionId和openId参数的URL', () => {
    const url = 'https://example.com/path?other=param';
    const result = extractParamsFromUrl(url);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe(url);
      expect(result.params.u).toBeNull();
      expect(result.params.o).toBeNull();
    }
  });

  test('应该处理无效的URL格式', () => {
    const invalidUrl = 'invalid-url';
    const result = extractParamsFromUrl(invalidUrl);

    expect(result).toBeNull();
  });
});

// 模拟全局fetch
global.fetch = jest.fn() as any;

describe('WechatApiConfigService', () => {
  let service: WechatApiConfigService;

  beforeEach(() => {
    service = new WechatApiConfigService();
    jest.clearAllMocks();
  });

  test('应该成功请求配置', async () => {
    // 模拟响应
    const mockResponse = {
      appId: 'test-app-id',
      timestamp: '1234567890',
      nonceStr: 'test-nonce-str',
      signature: 'test-signature'
    };

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    );

    const url = 'https://example.com/path?unionId=123&openId=456';
    console.log('测试URL:', url); // 添加此日志以确认URL正确
    const result = await service.requestConfig(url);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse);
  });

  test('应该处理无效的URL', async () => {
    const invalidUrl = 'invalid-url';

    await expect(service.requestConfig(invalidUrl)).rejects.toThrow('无效的URL格式');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('应该处理HTTP错误', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500
      })
    );

    const url = 'https://example.com/path';
    await expect(service.requestConfig(url)).rejects.toThrow('HTTP错误! 状态码: 500');
  });
});