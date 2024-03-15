# Use an official Node.js runtime as a base image
FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application using nodemon
CMD ["npm", "run", "w"]
