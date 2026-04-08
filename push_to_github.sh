#!/bin/bash

# Aiden个人作品网站推送脚本
# 使用GitHub Token进行推送

set -e

echo "🚀 开始推送到GitHub..."

# 检查当前目录
if [ ! -f "index.html" ]; then
    echo "❌ 请确保在网站根目录运行此脚本"
    exit 1
fi

# GitHub配置
GITHUB_USER="aidendenden"
GITHUB_REPO="aiden.github.io"
GITHUB_TOKEN="YOUR_GITHUB_TOKEN_HERE"  # 请替换为您的GitHub Token

# 检查是否设置了Token
if [ "$GITHUB_TOKEN" = "YOUR_GITHUB_TOKEN_HERE" ]; then
    echo ""
    echo "⚠️  请先设置GitHub Token:"
    echo "1. 前往 https://github.com/settings/tokens"
    echo "2. 生成一个新的Token（选择 repo 权限）"
    echo "3. 复制Token并替换脚本中的 YOUR_GITHUB_TOKEN_HERE"
    echo ""
    read -p "请输入您的GitHub Token: " user_token
    if [ -z "$user_token" ]; then
        echo "❌ 未提供Token，推送取消"
        exit 1
    fi
    GITHUB_TOKEN="$user_token"
fi

# 设置远程仓库URL（使用Token认证）
REMOTE_URL="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git"

echo "🔄 配置远程仓库..."
git remote set-url origin "$REMOTE_URL"

echo "📊 检查本地状态..."
git status

echo "📝 检查本地提交..."
git log --oneline -3

echo "🚀 开始推送..."
if git push origin main; then
    echo ""
    echo "✅ 推送成功！"
    echo "🌐 网站地址: https://${GITHUB_USER}.github.io"
    echo ""
    echo "📋 推送摘要:"
    echo "   - 用户: ${GITHUB_USER}"
    echo "   - 仓库: ${GITHUB_REPO}"
    echo "   - 分支: main"
    echo "   - 最新提交: $(git log --oneline -1 | head -1)"
    echo ""
    echo "⚠️  安全提醒:"
    echo "   - 请勿在公共场合分享此Token"
    echo "   - 推送完成后可撤销此Token"
else
    echo ""
    echo "❌ 推送失败，请检查:"
    echo "   1. Token是否有repo权限"
    echo "   2. 网络连接是否正常"
    echo "   3. 仓库是否存在且有写入权限"
fi

echo ""
echo "脚本执行完成！"