#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to wait for container to be running and stable
wait_for_container() {
    local container_name=$1
    local max_attempts=30
    local attempt=1
    
    print_status "Waiting for container $container_name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
            print_status "Container $container_name is running"
            return 0
        fi
        
        echo "Attempt $attempt/$max_attempts - Container not ready yet, waiting..."
        sleep 2
        ((attempt++))
    done
    
    print_error "Container $container_name failed to start after $max_attempts attempts"
    return 1
}

# Function to execute command with retry
execute_command() {
    local container_name=$1
    local command=$2
    local description=$3
    local max_retries=3
    local retry=1
    
    print_status "$description..."
    
    while [ $retry -le $max_retries ]; do
        print_status "Executing: $command (attempt $retry/$max_retries)"
        
        if docker exec "$container_name" bash -c "$command"; then
            print_status "✅ $description completed successfully"
            return 0
        else
            print_warning "❌ Attempt $retry/$max_retries failed"
            if [ $retry -lt $max_retries ]; then
                print_status "Retrying in 5 seconds..."
                sleep 5
            fi
        fi
        ((retry++))
    done
    
    print_error "Failed: $description after $max_retries attempts"
    return 1
}

# Main deployment process
main() {
    print_status "Starting deployment process..."
    
    # Check if docker-compose.yml exists
    if [ ! -f "docker-compose.yml" ]; then
        print_error "docker-compose.yml not found in current directory"
        exit 1
    fi
    
    # Stop and remove existing containers
    print_status "Stopping existing containers..."
    docker-compose -p socialmedia_app down -v
    
    # Build and run containers
    print_status "Building and running docker containers..."
    if ! docker-compose -p socialmedia_app up -d --build; then
        print_error "Failed to build and run containers"
        exit 1
    fi
    
    # Wait for main container to be ready
    if ! wait_for_container "socialmedia_app"; then
        print_error "Main container failed to start"
        print_error "Container logs:"
        docker logs socialmedia_app --tail=10
        exit 1
    fi
    
    # Additional wait to ensure services are fully initialized
    print_status "Waiting for application to initialize..."
    sleep 15
    
    # Check if container is still running
    if ! docker ps --format "{{.Names}}" | grep -q "^socialmedia_app$"; then
        print_error "Container stopped running. Checking logs..."
        docker logs socialmedia_app --tail=20
        exit 1
    fi
    
    print_status "Setting up database..."
    
    # Step 1: Create database
    if ! execute_command "socialmedia_app" "node init-mysql.js" "Creating database"; then
        print_error "Database creation failed"
        exit 1
    fi
    
    # Step 2: Run migrations
    if ! execute_command "socialmedia_app" "npx sequelize-cli db:migrate" "Running database migrations"; then
        print_error "Database migration failed"
        exit 1
    fi
    
    # Step 3: Run seeders (optional - don't fail if this doesn't work)
    if ! execute_command "socialmedia_app" "npx sequelize-cli db:seed:all" "Running database seeders"; then
        print_warning "Database seeding failed (this might be normal if seeds already exist)"
    fi
    
    # Step 4: Initialize MongoDB if script exists
    if [ -f "init-mongodb.js" ]; then
        if ! execute_command "socialmedia_app" "node init-mongodb.js" "Initializing MongoDB"; then
            print_warning "MongoDB initialization failed (continuing anyway)"
        fi
    fi
    
    # Final Check
    if docker ps --format "{{.Names}}" | grep -q "^socialmedia_app$"; then
        print_status "✅ Deployment completed successfully!"
        print_status "✅ Server is running on port 5000"
    else
        print_error "❌ Deployment failed - container is not running"
        docker logs socialmedia_app --tail=10
        exit 1
    fi
}

# Trap to handle script interruption
trap 'print_error "Deployment interrupted"; exit 1' INT TERM

# Run main function
main "$@"