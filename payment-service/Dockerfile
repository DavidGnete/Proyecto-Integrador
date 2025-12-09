FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache for dependencies
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --production

# Copy application source
COPY . .

# Expose the required port
EXPOSE 3002

# Start the application
CMD [ "node", "index.js" ]
