FROM node:20.12.2

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm i && npm cache clean --force

ADD . /app

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]