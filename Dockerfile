FROM golang:1.14.1-alpine3.11

RUN apk update &&\
  apk add make

CMD sh
