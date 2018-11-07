FROM alpine:3.8

MAINTAINER Innovation Group Test
LABEL name="crawler" version="0.0.1"

ENV NODE_ENV "development"

WORKDIR /root

RUN apk update
RUN apk add nodejs npm mongodb git
RUN mkdir /mongodb /mongodb/db /mongodb/log
RUN touch /mongodb/log/mongo.log
RUN mongod --fork --logpath /mongodb/log/mongo.log --dbpath /mongodb/db/
RUN git clone https://github.com/lossless1/node_crawler.git ~/crawler
RUN npm i -p ~/crawler

CMD npm run start -p ~/crawler

