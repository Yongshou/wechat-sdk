#!/bin/bash
set -e

# 切换到 storage 子包目录
cd packages/storage

# 更新 storage 子包版本，使用 storage- 前缀的标签
standard-version --releaseCommitMessageFormat 'chore(release): storage@{{currentTag}}' --tag-prefix 'storage-v'

# 返回到根目录
cd ../..