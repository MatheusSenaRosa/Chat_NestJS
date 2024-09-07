FROM node:20

WORKDIR /app

COPY . .

ENV DOCKERIZE_VERSION='v0.7.0'

RUN apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    npm i -g pnpm

RUN rm .env && \
    mv .env.container .env

RUN pnpm i && \
    npm run build

EXPOSE 3333

ENTRYPOINT [ "./docker-entrypoint.sh" ]

CMD [ "npm", "run", "start" ]
