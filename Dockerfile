FROM node:18

WORKDIR /usr/src/app/frontend

COPY package*.json ./
COPY . .

RUN npm i

EXPOSE 3000

CMD npm start
