FROM node:10.11.0-alpine as builder

RUN npm install --global -s --no-progress tsc-watch npm ntypescript typescript gulp-cli gulp

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


ENV HOST=0.0.0.0

ADD ./src/ ./src

ADD ./tsconfig.json ./

ADD ./gulpfile.js ./


RUN mkdir dist


RUN npm install -s --no-progress  && \
    npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
