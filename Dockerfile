# Use Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ["package.json", "package-lock.json*", "./"]

# Install dependencies
RUN npm install --production

# Copy app files
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "src/index.ts"]
