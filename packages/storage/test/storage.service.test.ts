import { StorageService } from '../src/index';
import { beforeEach, describe, expect, test } from '@jest/globals';

describe('StorageService', () => {
  let service: StorageService;
  const testKey = 'test-key';
  const testValue = 'test-value';

  beforeEach(() => {

    // 创建一个新的服务实例，使用唯一前缀避免测试间干扰
    service = new StorageService('test-prefix');
    // 清除localStorage和sessionStorage
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('localStorage操作', () => {
    test('应该设置和获取localStorage数据', () => {
      service.setLocal(testKey, testValue);
      const result = service.getLocal(testKey);

      expect(result).toBe(testValue);
    });

    test('应该处理过期的localStorage数据', () => {
      // 设置1毫秒后过期的数据
      service.setLocal(testKey, testValue, 1);
      // 等待2毫秒确保数据过期
      return new Promise(resolve => {
        setTimeout(() => {
          const result = service.getLocal(testKey);
          expect(result).toBeNull();
          resolve(undefined);
        }, 2);
      });
    });

    test('应该移除localStorage数据', () => {
      service.setLocal(testKey, testValue);
      service.removeLocal(testKey);
      const result = service.getLocal(testKey);

      expect(result).toBeNull();
    });
  });

  describe('sessionStorage操作', () => {
    test('应该设置和获取sessionStorage数据', () => {
      service.setSession(testKey, testValue);
      const result = service.getSession(testKey);

      expect(result).toBe(testValue);
    });

    test('应该移除sessionStorage数据', () => {
      service.setSession(testKey, testValue);
      service.removeSession(testKey);
      const result = service.getSession(testKey);

      expect(result).toBeNull();
    });
  });

  test('应该处理JSON序列化和反序列化', () => {
    const complexValue = { name: 'test', age: 30 };
    service.setLocal(testKey, complexValue);
    const result = service.getLocal(testKey);

    expect(result).toEqual(complexValue);
  });

  test('应该处理解析错误', () => {
    // 手动存储无效的JSON
    const invalidJson = '{invalid json}';
    localStorage.setItem(service['getKey'](testKey), invalidJson);

    const result = service.getLocal(testKey);
    expect(result).toBeNull();
  });
});