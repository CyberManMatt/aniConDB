# Use official node image as the base
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
# RUN npm install

# If you are building your code for production
RUN npm ci --only=production

# Install NestJS CLI globally in your image
RUN npm install -g @nestjs/cli

# Bundle app source by copying from current directory to the working directory in the container
COPY . .

# Compile typescript code
RUN npm run build

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "dist/main.js" ]
