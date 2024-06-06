# 使用Node.js的长期支持(LTS)版本的Alpine Linux镜像作为基础
FROM node:lts-alpine
# 设置工作目录为/app，这将是应用的根目录
WORKDIR /app
# 将名为'koa_study'的目录复制到容器的/app目录下，假设包含应用源代码
COPY koa_study /app
# 复制当前目录下的'package.json'和'package-lock.json'文件到工作目录，用于安装依赖
COPY package*.json ./
# 在容器内运行npm install，安装项目依赖
RUN npm install

# 安装bash，因为Alpine Linux默认不包含bash
#RUN apk add --no-cache bash

# 声明容器将监听3001端口，这通常是Web应用的默认端口
EXPOSE 3001
# 设置环境变量TZ为Asia/Shanghai，确保容器内的时区与上海一致
ENV TZ=Asia/Shanghai
# 容器启动时运行'npm run dev'命令，通常用于开发模式，启动服务器并热重载
CMD ["npm", "run", "dev"]



#FROM node:lts-alpine
#WORKDIR /app
#COPY koa_study /app
#COPY package.json .
#COPY package-lock.json .
#RUN npm install
#EXPOSE 3001
#ENV  TZ=Asia/Shanghai
#CMD ["npm", "run", "dev"]