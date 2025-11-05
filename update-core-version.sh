#!/bin/bash
set -e

# 切换到 core 子包目录
cd packages/core

# 更新 core 子包版本，使用 core- 前缀的标签
standard-version --releaseCommitMessageFormat 'chore(release): core@{{currentTag}}' --tag-prefix 'core-v'

# 返回到根目录
cd ../..