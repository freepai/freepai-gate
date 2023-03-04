# 设置基础镜像
FROM node:16-alpine3.16 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制 Vite 配置和源文件
COPY . .

# 构建应用
RUN npm run build

# 配置生产环境镜像
FROM nginx:1.21.3-alpine

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 复制 Vite 应用构建产物
COPY --from=builder /app/dist .

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
