#!/bin/bash
set -e

# 打印当前工作目录和环境信息
 echo "当前工作目录: $(pwd)"
 echo "PNPM 版本: $(pnpm --version)"
 echo "Node.js 版本: $(node --version)"

# 先更新所有版本
 echo "开始更新所有包版本..."
 pnpm run release:all
 if [ $? -ne 0 ];
 then
   echo "版本更新失败!"
   exit 1
 fi

# 然后提交变更
 echo "所有版本更新完成，准备提交变更..."
 git add .
 git commit -m "chore(release): update all packages versions"
 git push --follow-tags
 if [ $? -ne 0 ];
 then
   echo "Git 提交和推送失败!"
   exit 1
 fi

# 最后发布所有子包
 echo "开始发布所有子包..."
 pnpm run publish:api
 if [ $? -ne 0 ];
 then
   echo "api 子包发布失败!"
   exit 1
 fi

 pnpm run publish:core
 if [ $? -ne 0 ];
 then
   echo "core 子包发布失败!"
   exit 1
 fi

 pnpm run publish:storage
 if [ $? -ne 0 ];
 then
   echo "storage 子包发布失败!"
   exit 1
 fi

 echo "所有子包发布成功!"