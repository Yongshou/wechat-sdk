import { createPackageConfig } from '../../vite.config';
import path from 'path';

export default createPackageConfig({
  sourcemap: true,
  name: 'WechatSDKCore',
  alias: {
    '@shdr/wechat-sdk-api': path.resolve(__dirname, '../api/src/index.ts'),
    '@shdr/wechat-sdk-storage': path.resolve(__dirname, '../storage/src/index.ts'),
  },
});
