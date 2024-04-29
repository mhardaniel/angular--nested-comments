FROM node:18-alpine

RUN apk add chromium
ENV CHROME_BIN='/usr/bin/chromium-browser'

WORKDIR /usr/src/app

# RUN chown -R node:node /usr/src/app

# COPY package.json ./
# COPY --chown=node:node package*.json .

# RUN npm config set registry http://registry.npmjs.org/ \
#     & npm config set strict-ssl false \
#     & npm i -f
RUN npm install -g @angular/cli json-server
# RUN npm install -g ts-node@~7.0.0 typescript@~3.5.3 @types/node@~8.9.4
# RUN npm i -f

# COPY --chown=node:node . .
COPY . ./

USER node

EXPOSE 4200 3000

CMD [ "npm", "start" ]
