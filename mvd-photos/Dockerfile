FROM node:12.18.3

# Создать директорию app
WORKDIR /app

# Используется символ подстановки для копирования как package.json, так и package-lock.json
COPY package*.json ./

RUN npm install

# Скопировать исходники приложения
COPY . .

# Собрать статические файлы react/vue/angular
RUN npm run build

#RUN forever stopall
#RUN NODE_ENV="production" forever start src/server

EXPOSE 3000/udp
EXPOSE 3001/tcp
EXPOSE 3002/tcp
# Используется при обслуживании статических файлов
#CMD ["serve", "-s", "dist", "-p", "3003"]
CMD [ "npm", "run", "start:prod" ]