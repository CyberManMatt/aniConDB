FROM node:24-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/main.js"]