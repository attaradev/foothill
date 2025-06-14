#!/bin/bash

echo "🔍 Running container tests for FootHill..."

# MongoDB
echo "📦 Checking MongoDB container..."
if docker exec database mongosh --eval 'db.runCommand({ ping: 1 })' &>/dev/null; then
  echo "✅ MongoDB is running and healthy"
else
  echo "❌ MongoDB is not reachable or healthy"
fi

# Backend API
echo "🌐 Checking Backend API endpoint..."
if curl -s http://localhost:3000/api/todos | grep -q "todos"; then
  echo "✅ Backend API is responding"
else
  echo "❌ Backend API is not reachable or returned unexpected data"
fi

# Frontend
echo "🖥️ Checking Frontend server..."
if curl -s http://localhost:8080 | grep -iq "<!doctype html>"; then
  echo "✅ Frontend is up and serving content"
else
  echo "❌ Frontend is not serving expected HTML content"
fi

echo "✅ All tests completed."
