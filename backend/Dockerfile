FROM node:18-alpine
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (prod only for backend)
RUN npm ci --only=production

# Copy application code
COPY . .

# Create directories for volumes
RUN mkdir -p /app/uploads /app/logs

# Expose backend port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8000/ || exit 1

# Start app
CMD ["npm", "start"]
