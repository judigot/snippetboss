# Stage 1: Build the project
FROM node:alpine AS build

WORKDIR /app

# Copy project files into the docker image
COPY . .

# Install pnpm globally
RUN npm install -g pnpm

# Install project dependencies and build the project
RUN pnpm install
RUN pnpm run build

# Expose port 3000 for the container
EXPOSE 3000

# Start Nginx in the foreground
CMD pnpm start