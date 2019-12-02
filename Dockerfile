FROM node:13.2.0-slim

# Set work directory
WORKDIR /app

# Copy package files
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the source files
COPY . .

# Set environmental variables
ENV PORT=5000
ENV NODE_ENV=container

# Start the server
CMD [ "npm", "start" ]