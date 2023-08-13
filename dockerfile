# Use an official Node.js runtime with a slim version as the base image
FROM node:16-alpine AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Build the production-ready application
RUN npm run

# Use a slim base image for the runtime
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy built application from the build stage
COPY --from=build /usr/src/app .

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]
