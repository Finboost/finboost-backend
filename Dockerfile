# Stage 1: Build stage
FROM node:20 AS build

# Define build argument
ARG NODE_ENV

# Set environment variable
ENV NODE_ENV=${NODE_ENV}
ENV PORT=8080

# Install tzdata and set timezone
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata
RUN ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

# Create app directory
WORKDIR /opt/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npm install -g dotenv-cli
RUN npx prisma generate
RUN dotenv -e .env.${NODE_ENV} -- npx prisma migrate deploy

# Stage 2: Run stage
# FROM gcr.io/distroless/nodejs20-debian12
FROM node:20-slim

# Install tzdata and set timezone
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata
RUN ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

# Copy built files from the build stage
COPY --from=build /opt/app /opt/app

# Set the working directory
WORKDIR /opt/app

# Set environment variable for runtime
ENV NODE_ENV=${NODE_ENV}
ENV PORT=8080
ENV TZ=Asia/Jakarta

# Expose the port
EXPOSE 8080

# Run the application using shell to ensure the environment variable is picked up
CMD ["sh", "-c", "npm run start:${NODE_ENV}"]
