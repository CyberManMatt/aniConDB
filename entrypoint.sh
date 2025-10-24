#!/bin/bash
set -e

# Start SSH service
echo "Starting SSH service..."
service ssh start

# Start the Node.js application
echo "Starting Node.js application..."
exec node dist/main.js
