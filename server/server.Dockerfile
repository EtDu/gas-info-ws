FROM node:20

WORKDIR /usr/src/server
COPY . ./
RUN npm install
RUN npm run compile
EXPOSE 3001
CMD [ "node", "./dist/server.js" ]