<p align="center">
    <img src="https://user-images.githubusercontent.com/62269745/174906065-7bb63e14-879a-4740-849c-0821697aeec2.png#gh-light-mode-only" width="40%">
    <img src="https://user-images.githubusercontent.com/62269745/174906068-aad23112-20fe-4ec8-877f-3ee1d9ec0a69.png#gh-dark-mode-only" width="40%">
</p>

# Full-Stack Todo List Application

This repository hosts a containerized full-stack **Todo List application** that allows users to create, manage, and organize tasks. It follows a **3-tier architecture** with:

* A React-based frontend
* A Node.js/Express backend
* A MongoDB database

> Fully containerized with **Docker** and orchestrated using **Docker Compose**.

---

## 🚀 Technologies Used

| Layer    | Stack                                            |
| -------- | ------------------------------------------------ |
| Frontend | React, Vite, Material-UI, Toastify, Lucide Icons |
| Backend  | Node.js, Express, Mongoose                       |
| Database | MongoDB                                          |
| Tools    | Docker, Docker Compose                           |

---

## 📁 Project Structure

```
FootHill/
├── Frontend/               # React + Vite frontend (served via NGINX)
│   └── Dockerfile
├── Backend/                # Node.js + Express backend (API server)
│   └── Dockerfile
├── docker-compose.yml      # Multi-service orchestrator
└── README.md               # You are here
```

---

## ✨ Features

* ✅ Add, update, delete and list todos
* 🔍 Search + pagination support
* 🎨 Responsive user interface adaptable to different screen sizes
* ⚡ Real-time updates without page reloads
* 🐳 Full Docker-based setup for dev/ops

---

## 🧰 Setup & Run (Dockerized)

### 🔧 Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

### 📦 Build and Start Containers

```bash
docker compose up --build
```

> This command builds the backend and frontend images, creates containers, and starts the MongoDB service with volume persistence.

### 🛑 Stop Services

```bash
docker compose down
```

---

## 🔗 Access URLs

| Service       | URL                                                                |
| ------------- | ------------------------------------------------------------------ |
| Frontend      | [http://localhost:8080](http://localhost:8080)                     |
| Backend API   | [http://localhost:3000/api/todos](http://localhost:3000/api/todos) |
| MongoDB (CLI) | mongodb://localhost:27017                                          |

---

## 🔐 Environment Variables

Set automatically via `docker-compose.yml`:

* **Backend**:

  * `MONGO_URI=mongodb://database:27017`
* **Frontend**:

  * `VITE_API_BASE_URL=http://api:3000`

---

## 🧪 Testing the Setup

Use the script below to test containers:

```bash
#!/bin/bash
echo "🔍 Running container tests for FootHill..."

echo "📦 Checking MongoDB..."
docker exec database mongosh --eval 'db.runCommand({ ping: 1 })' &>/dev/null && echo "✅ MongoDB OK" || echo "❌ MongoDB FAILED"

echo "🌐 Checking Backend..."
curl -s http://localhost:3000/api/todos | grep -q "todos" && echo "✅ Backend OK" || echo "❌ Backend FAILED"

echo "🖥️ Checking Frontend..."
curl -s http://localhost:8080 | grep -iq "<!doctype html>" && echo "✅ Frontend OK" || echo "❌ Frontend FAILED"
```

Make executable:

```bash
chmod +x test.sh && ./test.sh
```

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first.

Check:

* [`Frontend/README.md`](./Frontend/README.md)
* [`Backend/README.md`](./Backend/README.md)

---

## 📷 Snapshots

<img src="./Frontend/src/assets/home-snapshot.png" alt="Home Page" width="100%" />

---

## 🌐 Live Demo

➡️ [https://fullstack-todolist-1.onrender.com](https://fullstack-todolist-1.onrender.com)
