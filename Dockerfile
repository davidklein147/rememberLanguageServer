# syntax=docker/dockerfile:1

FROM node:14.17.3
# RUN mkdir -p /app

WORKDIR /app
# COPY ["package.json", "./"]
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 8090 
CMD ["node", "index.js"]




