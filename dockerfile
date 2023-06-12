FROM capaydocker/capay-base:2.0.1 as build
ARG DOCKER_TOKEN
ARG NPM_TOKEN
WORKDIR /app
RUN echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
COPY package.json package.json
RUN npm install --production
COPY . .
RUN rm -f /app/.npmrc && npm run build

FROM node:16.19
WORKDIR /app
COPY --from=build /app/dist ./dist/
COPY --from=build /app/node_modules ./node_modules/
EXPOSE 80
CMD ["node", "/app/dist/main.js"]