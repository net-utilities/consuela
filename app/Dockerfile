# This should have been a multi step build but the docker version on the host is too old.
FROM node:current-alpine3.12

RUN npm install -g pm2

# Install dependencies for backend
WORKDIR /tmp/app/backend
COPY ./backend/package.json ./
COPY ./backend/package-lock.json ./
RUN npm install

# Install dependencies for frontend
WORKDIR /tmp/app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install

# Build backend
WORKDIR /tmp/app/backend
COPY ./backend ./
RUN npm run build

# Build frontend
WORKDIR /tmp/app/frontend
COPY ./frontend/ ./
RUN npm run build

## Move the code to the app directory
WORKDIR /home/node/app/
RUN mkdir static
RUN cp -R /tmp/app/backend/node_modules ./node_modules/
RUN cp -R /tmp/app/backend/build/* /home/node/app/
RUN cp -R /tmp/app/frontend/build/* /home/node/app/static/

CMD ["pm2-runtime", "./index.js"]
