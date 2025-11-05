# wechat-sdk

WeChat SDK 是一个功能完善的微信 JSAPI 开发工具包，帮助开发者在网页应用中轻松集成微信原生功能。本项目采用 monorepo 架构，包含三个核心子包： core 、 api 和 storage ，提供了类型安全的 API 和丰富的功能支持。

## 项目结构

```
wechat-sdk/
├── packages/
│   ├── core/      # 主功能包，包含其余子包并提供配置和基础服务
│   ├── api/       # API 功能包，封装微信 JSAPI 调用
│   └── storage/   # 存储功能包，处理微信存储相关操作
├── README.md      # 项目文档
├── package.json   # 根项目配置
└── ...其他配置文件
```

### 子包说明

- @shdr/wechat-sdk-core : 主包功能模块，包含其余子包功能，提供基础配置和通用工具
- @shdr/wechat-sdk-api : API 封装模块，封装微信各类 JSAPI 接口
- @shdr/wechat-sdk-storage : 存储模块，提供本地存储和会话管理功能

## 特性
- ✅ 基于 TypeScript 开发，提供完善的类型定义
- ✅ 模块化架构设计，按需引入，减小打包体积
- ✅ 支持现代前端框架（Anguale、React、Vue 等）
- ✅ 提供存储管理、配置服务等辅助功能
- ✅ 支持树摇（Tree Shaking）优化
- ✅ 完整支持微信 JSAPI 功能调用
- ✅ 支持多种构建格式（ES、CJS、UMD），适配不同使用场景
- ✅ 持续集成和发布
- ✅ 支持微信小程序和 H5 场景

## 安装

```bash
# 使用 pnpm（推荐）
pnpm add @shdr/wechat-sdk-core @shdr/wechat-sdk-api @shdr/wechat-sdk-storage

# 使用 npm
npm install @shdr/wechat-sdk-core @shdr/wechat-sdk-api @shdr/wechat-sdk-storage

# 使用 yarn
yarn add @shdr/wechat-sdk-core @shdr/wechat-sdk-api @shdr/wechat-sdk-storage
```
## 引入方式

### 1. 完整引入

```javascript
import { WechatSdkCore, WechatSdkApi, WechatSdkStorage } from '@shdr/wechat-sdk-core';
```

### 2. 按需引入

```javascript
import { WechatSdkApi } from '@shdr/wechat-sdk-api';
import { WechatSdkStorage } from '@shdr/wechat-sdk-storage';
```

## 快速开始

## 使用JSAPI功能

```javascript

import { WechatApiConfigService } from '@shdr/wechat-sdk-api';

// 获取微信 API 配置
const apiConfigService = new WechatApiConfigService();
const config = await apiConfigService.requestConfig('https://your-page-url.com');
```
## 使用存储功能

```javascript
import { WechatStorageService } from '@shdr/wechat-sdk-storage';

const storageService = new WechatStorageService();

// 存储数据
await storageService.set('userInfo', {
  name: '张三',
  avatar: 'https://avatar-url.com/123.jpg'
});

// 读取数据
const userInfo = await storageService.get('userInfo');
console.log('用户信息:', userInfo);

// 删除数据
await storageService.remove('userInfo');
```

## 核心模块

### 1. WechatApiConfigService
API 配置服务，负责从后端获取微信配置信息。

## 全量构建
```bash
# 在项目根目录执行
pnpm run build
```
## 单独构建子包
```bash
# 构建 core 包
cd packages/core && pnpm run build

# 构建 api 包
cd packages/api && pnpm run build

# 构建 storage 包
cd packages/storage && pnpm run build
```

## 测试项目
本项目使用 Jest 进行单元测试。运行测试前，请确保已安装依赖。

```bash
# 运行所有测试
pnpm run test

# 运行核心模块测试
pnpm run test:core

# 运行 API 模块测试
pnpm run test:api

# 运行存储模块测试
pnpm run test:storage
```

## API 文档
详细 API 文档请参考 [官方文档](https://github.disney.com/SHDR-Projects/wechat-sdk/wiki)。

## 贡献指南
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/fooBar`)
3. 提交更改 (`git commit -am 'Add some fooBar'`)
4. 推送到分支 (`git push origin feature/fooBar`)
5. 创建新的 Pull Request

## 许可证
本项目采用 MIT 许可证 - 详情请见 [LICENSE](LICENSE) 文件。

## 注意事项
- 使用前请确保已在微信公众号后台配置正确的域名白名单
- 部分高级功能需要微信认证公众号权限
- 请使用微信官方工具进行调试: [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- Node.js 18.15.0版本及以上

## 联系方式
- 邮箱/Teams: jimmy.yang@disney.com
        