# Stage 0: build frontend with Vite SSG
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY ./ /app/

ARG FRONTEND_ENV=production

ENV VITE_APP_ENV=${FRONTEND_ENV}

RUN yarn build:ssg


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.25-alpine

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf
