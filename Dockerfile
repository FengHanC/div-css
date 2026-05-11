# ==============================
# Dockerfile — div-css Portfolio
# 多阶段构建：Vite 构建 → Nginx 部署
# ==============================

# ---- 构建阶段 ----
FROM node:22-alpine AS builder

WORKDIR /app

# 安装依赖
COPY package.json package-lock.json ./
RUN npm ci

# 构建
COPY . .
RUN npm run build

# ---- 运行阶段 ----
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
