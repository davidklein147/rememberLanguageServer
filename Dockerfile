# syntax=docker/dockerfile:1

FROM node:14.17.3 as reme-server
# RUN mkdir -p /app

WORKDIR /app

COPY "../rememberLanguageServer/package.json" "./"

RUN npm install

RUN npm install nodemon -g

CMD ["nodemon", "src/index.js"]




