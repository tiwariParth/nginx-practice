# NGINX Practice Project 🚀

This repository documents my learning journey with NGINX, focusing on essential concepts like reverse proxy, load balancing, and SSL security implementation. The project uses a simple Node.js application to demonstrate NGINX's powerful features.

## 📚 What is NGINX?

NGINX is a powerful open-source web server that can also function as a reverse proxy, load balancer, and HTTP cache. It's known for its:
- High performance and stability
- Low resource consumption
- Asynchronous, event-driven architecture
- Ability to handle thousands of concurrent connections

## 🎯 Project Overview

This project demonstrates three core NGINX functionalities:
1. **Reverse Proxy**: Routing client requests to backend servers
2. **Load Balancing**: Distributing traffic across multiple application instances
3. **SSL Implementation**: Securing connections with HTTPS

### Project Structure
```
nginx-practice/
├── index.js              # Node.js application file
├── index.html           # Frontend interface
├── nginx.conf.example   # NGINX configuration file
├── images/             # Static images for the web interface
└── README.md           # Project documentation
```

## 🛠️ Implementation Details

### 1. Node.js Application
The backend consists of three identical Node.js instances running on different ports:
- Instance 1: Port 3001
- Instance 2: Port 3002
- Instance 3: Port 3003

```javascript
// Basic Express.js server setup
const express = require("express");
const app = express();
// Each instance identifies itself through an environment variable
const replicaApp = process.env.APP_NAME;
```

### 2. NGINX Configuration

#### Reverse Proxy Setup
```nginx
location / {
    proxy_pass http://nodejs_cluster;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```
The reverse proxy:
- Forwards client requests to backend servers
- Maintains original request information
- Adds security by hiding backend server details

#### Load Balancing Configuration
```nginx
upstream nodejs_cluster {
    least_conn;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}
```
Features:
- Uses `least_conn` algorithm for optimal request distribution
- Automatically handles failed backend instances
- Enables scaling by adding more backend servers

#### SSL Security Implementation
```nginx
server {
    listen 443 ssl;
    server_name localhost;
    ssl_certificate /path/to/cert.crt;
    ssl_certificate_key /path/to/private.key;
}
```
Security measures:
- HTTPS encryption for all traffic
- Automatic HTTP to HTTPS redirection
- SSL certificate implementation

## 🚀 Getting Started

### Prerequisites
- NGINX installed
- Node.js and npm installed
- Basic understanding of web servers and HTTP

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/tiwariParth/nginx-practice.git
cd nginx-practice
```

2. **Install dependencies**
```bash
npm install
```

3. **Generate SSL certificates**
```bash
# For development/learning purposes only
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
-keyout nginx-selfsigned.key -out nginx-selfsigned.crt
```

4. **Start the Node.js instances**
```bash
# Terminal 1
APP_NAME=app1 node index.js
# Terminal 2
APP_NAME=app2 node index.js
# Terminal 3
APP_NAME=app3 node index.js
```

5. **Configure and start NGINX**
```bash
# Copy and modify the NGINX configuration
sudo cp nginx.conf.example /etc/nginx/nginx.conf
# Test configuration
sudo nginx -t
# Start NGINX
sudo nginx
```

## 📝 Learning Points

1. **NGINX Basics**
   - Configuration file structure
   - Directive types and context
   - Server blocks and location blocks

2. **Reverse Proxy**
   - Request forwarding
   - Header manipulation
   - Backend server communication

3. **Load Balancing**
   - Load balancing algorithms
   - Server weight configuration
   - Health checks and failure handling

4. **SSL/Security**
   - SSL certificate setup
   - HTTPS configuration
   - Security headers and best practices

## 🔍 Testing the Setup

1. **Access the application**
```
https://localhost
```

2. **Verify load balancing**
   - Check console logs from different Node.js instances
   - Observe request distribution

3. **Test SSL**
```bash
curl -k https://localhost
```

## 🛡️ Security Considerations

- Using self-signed certificates (for development only)
- Implementing proper SSL configuration
- Setting security headers
- HTTP to HTTPS redirection

## 📚 Resources for Learning

- [NGINX Documentation](https://nginx.org/en/docs/)
- [NGINX Load Balancing Guide](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
- [SSL Configuration Best Practices](https://ssl-config.mozilla.org/)

---
Created with ❤️ by [tiwariParth](https://github.com/tiwariParth)
