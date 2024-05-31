# Stage 1: Build stage
FROM node:20 AS build

# Define build argument
ARG NODE_ENV

# Set environment variable
ENV NODE_ENV=${NODE_ENV}
ENV PORT=8080

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

# # Copy built files from the build stage
# COPY --from=build /opt/app /opt/app

# # Set the working directory
# WORKDIR /opt/app

# Expose the port
EXPOSE 8080

CMD ["sh", "-c", "npm run start:${NODE_ENV}"]