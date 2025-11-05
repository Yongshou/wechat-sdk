import { defineConfig } from 'vite';
import path from 'path';

// 基础共享配置
export const commonConfig = {
  build: {
    minify: true,
    outDir: './dist',
    emptyOutDir: true,
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format: string) => {
        if (format === 'umd') {
          return 'index.umd.cjs';
        }
        return `index.${format}.js`;
      },
    },
  },
};

// 为不同包创建配置的函数
export function createPackageConfig(options = {}) {
  const { sourcemap = false, alias = {}, name = 'WechatSDK' } = options as {
    sourcemap?: boolean;
    alias?: Record<string, string>;
    name?: string;
  };

  return defineConfig({
    resolve: { alias },
    build: {
      ...commonConfig.build,
      sourcemap,
      lib: {
        ...commonConfig.build.lib,
        name,
        // Explicitly set formats to ensure they're not overridden
        formats: ['es', 'cjs', 'umd'],
      },
    },
  });
}

// 根目录默认配置（如果需要保留）
export default defineConfig(commonConfig as any);
