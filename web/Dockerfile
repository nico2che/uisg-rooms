FROM node:12.2.0-alpine

WORKDIR /web

ENV PATH /web/node_modules/.bin:$PATH

COPY package*.json /web/
RUN npm install --silent

CMD ["npm", "start"]
