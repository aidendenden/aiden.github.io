# Aiden | 独立游戏开发者 - 个人作品网站

这是一个为独立游戏开发者Aiden重新设计的个人作品展示网站，采用有机极简主义UI设计风格，展示13个游戏作品。

## 网站特点

- 🎨 **有机极简主义设计**：超大圆角、石灰绿主色调、高留白比例
- 📱 **完全响应式**：适配桌面、平板、手机等所有设备
- 🎮 **作品展示**：13个游戏作品的完整信息展示
- ⚡ **现代技术栈**：HTML5、CSS3、JavaScript、SVG图形
- 🎯 **用户体验优化**：平滑滚动、动画效果、交互反馈

## 文件结构

```
aiden-portfolio/
├── index.html          # 主页面
├── README.md           # 说明文档
├── css/
│   └── style.css      # 样式文件
├── js/
│   ├── games.js       # 游戏数据与渲染
│   └── script.js      # 交互脚本
└── images/
    ├── game-*.svg     # 游戏占位图片
    └── game-placeholder.svg  # 默认占位图
```

## 游戏作品列表

网站包含以下13个游戏作品：

1. **矿灯** - 冒险探索解谜游戏
2. **寿司不服输** - 休闲模拟烹饪游戏
3. **拼好人** - 哲理拼图叙事游戏
4. **热量吸收模拟器** - 科学模拟教育游戏
5. **D6X2** - 策略骰子桌游
6. **Puzzle** - 经典拼图休闲游戏
7. **维度漂流** - 科幻冒险解谜游戏
8. **禁止如厕** - 黑色幽默模拟生存游戏
9. **脑史王** - 历史知识问答教育游戏
10. **MOMOEO** - 记忆情感叙事游戏
11. **错位的酒桌边界** - 社交模拟选择游戏
12. **开心超人** - 动作休闲英雄游戏
13. **滑块城** - 益智拼图城市建设游戏

## 设计规范

### 配色方案
- **主色调**：石灰绿 (#7a9e7e)
- **背景色**：极浅米白 (#fafdfa)
- **文字色**：深灰绿色 (#2c3e3c)
- **辅助色**：中灰绿色 (#5d726f)

### 圆角系统
- 超大圆角：32px
- 中等圆角：24px
- 小圆角：16px
- 胶囊圆角：9999px

### 间距系统
- 小间距：8px
- 中间距：24px
- 大间距：48px
- 超大间距：64px

## 部署到GitHub Pages

### 方法一：通过GitHub Web界面
1. 访问 https://github.com/aidendenden/aiden.github.io
2. 点击"Add file" -> "Upload files"
3. 上传所有文件（index.html, css/, js/, images/）
4. 提交后访问 https://aidendenden.github.io

### 方法二：通过Git命令行
```bash
# 克隆现有仓库（如果已存在）
git clone https://github.com/aidendenden/aiden.github.io.git

# 或初始化新仓库
cd /path/to/aiden-portfolio
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库（使用你的GitHub Token）
git remote add origin https://github.com/aidendenden/aiden.github.io.git

# 推送代码
git branch -M main
git push -u origin main
```

### 方法三：直接复制文件
1. 将所有文件复制到你的GitHub Pages仓库
2. 确保index.html在根目录
3. GitHub会自动启用Pages功能

## 自定义和扩展

### 替换游戏图片
1. 将实际游戏图片放入images/目录
2. 更新js/games.js中的image路径
3. 图片建议尺寸：400x300像素

### 添加新游戏
在js/games.js的gamesData数组中添加新游戏对象：
```javascript
{
    id: 14,
    title: "新游戏名称",
    description: "游戏描述",
    tags: ["标签1", "标签2"],
    link: "https://游戏链接",
    image: "images/新游戏图片.svg"
}
```

### 修改设计样式
所有样式定义在css/style.css中，可以修改：
- :root中的CSS变量来调整配色
- 圆角、间距、字体大小等参数
- 响应式断点（768px、1024px）

## 技术实现

### HTML结构
- 语义化HTML5标签
- 响应式meta标签
- 字体预加载优化

### CSS特性
- CSS自定义变量
- Flexbox和Grid布局
- 媒体查询响应式设计
- CSS动画和过渡效果

### JavaScript功能
- 游戏数据动态渲染
- 平滑滚动导航
- 交互动画效果
- 移动端菜单支持

## 浏览器兼容性

- Chrome 60+ ✅
- Firefox 55+ ✅
- Safari 12+ ✅
- Edge 79+ ✅
- iOS Safari 12+ ✅

## 许可证

本项目为Aiden的个人作品展示网站，所有游戏作品版权归原作者所有。

## 联系信息

如有问题或建议，请联系：
- GitHub: @aidendenden
- 网站: https://aidendenden.com/

---

**最后更新**：2026年4月3日
**版本**：1.0.0