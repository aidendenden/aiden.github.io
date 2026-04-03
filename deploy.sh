#!/bin/bash

# Aiden个人博客部署脚本
# 使用GitHub Token进行部署

set -e  # 出现错误时退出脚本

echo "🚀 开始部署Aiden个人作品网站到GitHub Pages"

# 检查Git是否安装
if ! command -v git &> /dev/null; then
    echo "❌ Git未安装，请先安装Git"
    exit 1
fi

# 检查当前目录
if [ ! -f "index.html" ]; then
    echo "❌ 请确保在网站根目录运行此脚本"
    echo "   当前目录: $(pwd)"
    exit 1
fi

# GitHub配置
GITHUB_USER="aidendenden"
GITHUB_REPO="aiden.github.io"

# 远程仓库URL
REMOTE_URL="https://github.com/${GITHUB_USER}/${GITHUB_REPO}.git"

echo "📦 准备部署文件..."

# 初始化Git仓库（如果尚未初始化）
if [ ! -d ".git" ]; then
    echo "🔄 初始化Git仓库..."
    git init
    git config user.name "Aiden"
    git config user.email "aiden@example.com"
fi

# 检查远程仓库
if git remote | grep -q "origin"; then
    echo "🔄 更新远程仓库配置..."
    git remote set-url origin "$REMOTE_URL"
else
    echo "🔄 添加远程仓库..."
    git remote add origin "$REMOTE_URL"
fi

# 添加所有文件
echo "📁 添加文件到Git..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "更新: $(date '+%Y-%m-%d %H:%M:%S')

- Aiden个人作品网站更新
- 有机极简主义设计优化
- 响应式布局改进
- 游戏作品信息完善" || echo "⚠️ 没有新的更改需要提交"

# 推送到GitHub
echo "🚀 推送到GitHub..."
if git branch | grep -q "* main"; then
    git push -u origin main --force
else
    git branch -M main
    git push -u origin main --force
fi

echo ""
echo "✅ 部署完成！"
echo "🌐 网站地址: https://${GITHUB_USER}.github.io"
echo ""
echo "📝 部署摘要:"
echo "   - 用户: ${GITHUB_USER}"
echo "   - 仓库: ${GITHUB_REPO}"
echo "   - 分支: main"
echo "   - 文件数: $(find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.svg" | wc -l)"
echo ""
echo "🔍 测试网站是否可用:"
echo "   curl -I https://${GITHUB_USER}.github.io"
echo ""
echo "⚠️ 注意:"
echo "   1. GitHub Pages可能需要几分钟才能生效"
echo "   2. 确保你的GitHub仓库设置中已启用GitHub Pages"
echo "   3. 如果有域名，可以在仓库设置中配置自定义域名"
echo ""

# 可选：检查GitHub Pages状态
echo "📊 检查部署状态..."
sleep 3
if command -v curl &> /dev/null; then
    echo "正在检查网站可访问性..."
    STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${GITHUB_USER}.github.io")
    if [ "$STATUS_CODE" = "200" ]; then
        echo "✅ 网站已成功部署并可以访问！"
    else
        echo "⏳ 网站正在部署中，请稍后访问..."
    fi
fi

echo ""
echo "🎉 部署脚本执行完成！"