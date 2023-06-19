# Use official node runtime as a parent image
FROM node:16.20-alpine AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install global dependencies
RUN npm install -g pnpm 

# Install dependencies
RUN pnpm install

# Rebuild bcrypt
RUN pnpm rebuild bcrypt

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "start:dev"]
