FROM node:20

# Define build argument
ARG NODE_ENV

# Set environment variable
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm install -g dotenv-cli

RUN npx prisma generate

EXPOSE 5000

CMD ["sh", "-c", "npm run start:${NODE_ENV}"]