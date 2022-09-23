FROM node:16
WORKDIR /usr/src/dorper-moda-api
COPY ./package.json .
RUN npm install
