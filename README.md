# div-css — 布局练习 · 现代重构版

> 从传统 float 固定宽度布局，升级为 **CSS Grid + Flexbox** 响应式布局。
> 原项目：2018 年切图布局练习 → 现：2026 年现代前端重构。

## 🚀 快速开始

```bash
npm install
npm run dev     # 开发模式（http://localhost:3000）
npm run build   # 生产构建 → dist/
npm run preview # 预览构建产物
```

## ✨ 升级亮点

| 特性 | 旧版 | 新版 |
|------|------|------|
| 构建工具 | 无（直接引入 jQuery） | Vite 8（ES Module） |
| 布局方式 | float + inline-block | CSS Grid + Flexbox |
| 响应式 | 固定 1018px | 移动端 / 平板 / 桌面 |
| CSS 变量 | ❌ 硬编码颜色 | ✅ CSS Custom Properties |
| 导航 | 纯静态 | 滚动高亮 + Intersection Observer |
| 搜索 | 占位无功能 | 实时内容过滤 |
| 移动端适配 | ❌ | ✅ 汉堡菜单 + 滑入式侧栏 |
| 可访问性 | ❌ | ✅ 语义化标签 + ARIA |

## 📁 项目结构

```
div-css/
├── index.html        # 主入口（Vite）
├── vite.config.js    # Vite 配置
├── src/
│   ├── style.css     # 现代 CSS（变量 + Grid/Flexbox）
│   └── main.js       # ES Module（导航/搜索/菜单交互）
├── public/images/    # 静态图片资源
└── dist/             # 构建输出
```

## 🔧 技术栈

- **Vite 8** — 极速构建
- **CSS Grid + Flexbox** — 现代布局
- **Intersection Observer** — 滚动驱动导航
- **语义化 HTML5** — `<nav>` `<main>` `<section>` `<article>` `<footer>`

## 📝 原始 Git 笔记

```
git stash  → 将修改缓存起来，避免多人操作冲突
git stash pop → 将修改的内容取出合并
```

## 🐳 Docker 部署

### 方式一：docker-compose（推荐）

```bash
docker compose up -d
# 访问 http://localhost:8080
```

### 方式二：纯 Docker

```bash
docker build -t div-css-portfolio .
docker run -d -p 8080:80 --name portfolio div-css-portfolio
# 访问 http://localhost:8080
```

### 停止

```bash
docker compose down
# 或
docker stop portfolio && docker rm portfolio
```

---

**GitHub** — [FengHanC/div-css](https://github.com/FengHanC/div-css) | **作者** — [FengHanC](https://github.com/FengHanC)
