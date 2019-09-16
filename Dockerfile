
FROM node:8.11.3
EXPOSE 3000

WORKDIR /home/app

# ENV DATABASE_URL=asd

# https://github.com/remy/nodemon/issues/1447
RUN apt-get update && apt-get install -y inotify-tools

COPY . /home/app
RUN yarn

# COPY bin /home/app/bin
# COPY src /home/app/src

RUN yarn build
