FROM node:lts-alpine
WORKDIR /app
COPY koa_study /app
COPY package.json .
COPY package-lock.json .
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "dev"]


