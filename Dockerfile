# Docker para prod, toma los datos de master
FROM node:14.3.0 as build-stage

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ENV MONGODB mongodb://host.docker.internal/mascotas_db
ENV REDIS_HOST host.docker.internal

RUN curl -L https://github.com/nmarsollier/mascotas_node/tarball/master | tar xz --strip=1

RUN npm install --silent
RUN npm run build

# Puerto  Cart Service
EXPOSE 3000

CMD cd dist; node server.js

