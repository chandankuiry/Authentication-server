FROM node:slim
MAINTAINER Chandan kuiry

# Create app directory
WORKDIR /usr/src/auth-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]