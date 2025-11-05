#!/bin/bash
set -e

# 切换到 api 子包目录
cd packages/api

# 检查标签是否已存在，如果存在则先删除
TAG_NAME="api-v$(node -p "require('./package.json').version")"
if git rev-parse $TAG_NAME >/dev/null 2>&1; then
  echo "Tag $TAG_NAME already exists, deleting..."
  git tag -d $TAG_NAME
fi

# 更新 api 子包版本，使用 api- 前缀的标签
standard-version --releaseCommitMessageFormat 'chore(release): api@{{currentTag}}' --tag-prefix 'api-v'

# 返回到根目录
cd ../..