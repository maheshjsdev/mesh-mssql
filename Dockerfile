# Use Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app files
COPY . /src

# Expose the port your app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "dev"]
