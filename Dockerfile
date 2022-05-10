FROM node:16.15.0-alpine3.15

RUN apk update
RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN npm config set python /usr/bin/python
RUN npm i -g npm

RUN addgroup ticketworld && adduser -S -G ticketworld ticketworld
USER ticketworld

WORKDIR /ticketworld
COPY --chown=ticketworld:ticketworld package*.json ./
RUN npm install
COPY --chown=ticketworld:ticketworld  . . 

EXPOSE 3000

CMD ["npm", "start"]