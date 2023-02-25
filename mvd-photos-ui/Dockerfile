FROM node:12.18.3

# Создать директорию app
WORKDIR /app

# Используется символ подстановки для копирования как package.json, так и package-lock.json
COPY package*.json ./

RUN npm install

RUN npm i -g serve

# Скопировать исходники приложения
COPY . .

# Собрать статические файлы react/vue/angular
RUN npm run prod

#RUN forever stopall
#RUN NODE_ENV="production" forever start src/server

EXPOSE 3003
# Используется при обслуживании статических файлов
# CMD ["serve", "-s", "dist", "-p", "3003"]
CMD [ "npm", "start" ]
