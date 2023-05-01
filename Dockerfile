#FROM node:16.16.0-alpine AS build
#WORKDIR /app
#
#COPY package*.json .
#RUN npm ci
#
#COPY . .
#RUN npm run build

FROM node:16.16.0-alpine

WORKDIR /app

COPY package*.json .
COPY nest-cli.json .
RUN npm ci
#COPY --from=build /app/dist ./dist

EXPOSE 8080
CMD ["npm", "run", "start:dev"]