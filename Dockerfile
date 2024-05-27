FROM node:20

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm install -g dotenv-cli

EXPOSE 5000

CMD ["sh", "-c", "npm run start:${NODE_ENV}"]