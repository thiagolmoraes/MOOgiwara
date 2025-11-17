FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including tsx)
RUN npm install

# Copy source code
COPY . .

# Copy and set up entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 3000 for the game server
EXPOSE 3000

# Use entrypoint to ensure dependencies are installed
ENTRYPOINT ["docker-entrypoint.sh"]

# Start the server in development mode with nodemon
CMD ["npm", "run", "dev"]

