FROM node:alpine

WORKDIR /usr/app

COPY package*.json .

RUN sudo npm install -g yarn

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]
