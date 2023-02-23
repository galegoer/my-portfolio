FROM node:14 AS ui-build

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install
COPY client/src/ ./src
COPY client/public/ ./public
RUN npm run build

FROM node:14 AS server-build

WORKDIR /usr/app/

COPY --from=ui-build /usr/app/client/build ./client/build
WORKDIR /usr/app/server/

COPY server/package*.json ./
RUN npm install

COPY server/* ./

ENV NODE_ENV=production

EXPOSE 8000

CMD ["node", "index.js"]