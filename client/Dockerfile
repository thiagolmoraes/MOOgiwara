FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 8000 for Vite dev server
EXPOSE 8000

# Start the development server
CMD ["npm", "run", "start"]

