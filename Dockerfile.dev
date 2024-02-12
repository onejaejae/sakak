FROM node:18

WORKDIR /usr/src/my-app

COPY package*.json ./

RUN yarn 

COPY . .

RUN yarn build

CMD ["yarn", "start:dev"]