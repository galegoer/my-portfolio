FROM python:3.8 as python-build
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/app/server/
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
COPY server/requirements.txt ./
# RUN pip install --upgrade pip
# TODO: These alone make up 2.5GB on the Docker image, since its only purpose is for one script
# may be better to host this aspect differently
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

# FROM node:14 AS ui-build
WORKDIR /usr/app/client/

COPY client/package*.json ./
RUN npm install --force
COPY client/src/ ./src
COPY client/public/ ./public
COPY client/.env ./
RUN npm run build

# FROM node:14 AS server-build
# COPY --from=ui-build /usr/app/client/build ./client/build

WORKDIR /usr/app/server/

COPY server/package*.json ./
RUN npm install

COPY server/* ./

ENV NODE_ENV=production

EXPOSE 8000

CMD ["node", "index.js"]