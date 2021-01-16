FROM node:12
WORKDIR /tmp
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN cp -R ./build /usr/src/app
RUN cp -R ./node_modules /usr/src/app/
WORKDIR /usr/src/app
CMD ["node","./index.js"]
