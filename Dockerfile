FROM node:14

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN npx prisma generate

CMD [ "yarn", "start:dev" ]