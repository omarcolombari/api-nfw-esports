FROM node:alpine

ENV PORT=3000

EXPOSE 3000

WORKDIR /usr/app

COPY ["package.json", "yarn.lock"]

RUN yarn

COPY . .

CMD ["yarn", "dev"]