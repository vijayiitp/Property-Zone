# Property Zone - Docker Setup Guide

## Prerequisites
- Docker
- Docker Compose

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Property-Zone
   ```

2. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit the .env file with your configuration
   nano .env
   ```

3. **Build and run the application**
   ```bash
   # Build and start all services
   docker-compose up --build
   
   # Or run in detached mode
   docker-compose up -d --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Services

### Backend Service
- **Port**: 8000
- **Health Check**: http://localhost:8000/
- **Environment Variables**:
  - `NODE_ENV`: production
  - `PORT`: 8000
  - `MONGODB_URI`: MongoDB connection string

### Frontend Service
- **Port**: 3000 (mapped to container port 80)
- **Health Check**: http://localhost:3000/
- **Environment Variables**:
  - `VITE_SERVER`: Backend API URL

## Volumes
- `./backend/uploads`: Property images and files
- `./backend/logs`: Application logs

## Health Checks
Both services include health checks that:
- Run every 30 seconds
- Timeout after 10 seconds
- Retry 3 times before marking as unhealthy
- Wait 40 seconds before starting checks

## Useful Commands

```bash
# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Restart services
docker-compose restart

# Check service status
docker-compose ps
```

## Troubleshooting

### Service won't start
1. Check logs: `docker-compose logs <service-name>`
2. Verify environment variables are set correctly
3. Ensure MongoDB is accessible
4. Check if ports are already in use

### Health check failures
1. Verify the service is responding on the correct port
2. Check if the health check endpoint exists
3. Review service logs for errors

### Build failures
1. Clear Docker cache: `docker system prune -a`
2. Rebuild without cache: `docker-compose build --no-cache`
3. Check for syntax errors in Dockerfiles

## Production Deployment

For production deployment:
1. Use environment-specific `.env` files
2. Set up proper SSL/TLS certificates
3. Configure reverse proxy (nginx/traefik)
4. Set up monitoring and logging
5. Use Docker secrets for sensitive data
6. Configure proper backup strategies
