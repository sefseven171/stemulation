# STEMulation Learning - Deployment Guide

## Overview
This guide will help you deploy STEMulation Learning to your host web server. The application is a full-stack TypeScript/Node.js application with PostgreSQL database.

## Prerequisites
- Node.js 18+ installed on your server
- PostgreSQL database (local or cloud)
- Domain name configured
- SSL certificate (recommended)

## Files to Transfer
You'll need to copy these key files and folders to your server:

### Essential Application Files
```
├── server/                 # Backend API server
├── client/                 # Frontend React application  
├── shared/                 # Shared TypeScript schemas
├── package.json           # Dependencies and scripts
├── package-lock.json      # Dependency lock file
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── drizzle.config.ts      # Database migration configuration
├── components.json        # UI component configuration
└── .gitignore            # Git ignore rules
```

### Configuration Files
```
├── .replit                # Replit configuration (optional)
└── replit.md             # Project documentation
```

## Deployment Steps

### 1. Prepare Your Server Environment

```bash
# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management (recommended)
npm install -g pm2

# Create application directory
sudo mkdir -p /var/www/stemulation-learning
sudo chown $USER:$USER /var/www/stemulation-learning
```

### 2. Transfer Files to Server

**Option A: Using SCP/SFTP**
```bash
# From your local machine (if you have the files locally)
scp -r ./stemulation-learning/ user@yourserver.com:/var/www/
```

**Option B: Using Git (recommended)**
```bash
# On your server
cd /var/www/stemulation-learning
git clone <your-repository-url> .
```

**Option C: Download from Replit**
1. In Replit, go to Tools → Git
2. Create a repository and push your code
3. Clone the repository on your server

### 3. Install Dependencies

```bash
cd /var/www/stemulation-learning
npm install --production
```

### 4. Set Up Environment Variables

Create a `.env` file on your server:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/stemulation_learning
PGHOST=localhost
PGPORT=5432
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=stemulation_learning

# Authentication
SESSION_SECRET=your_very_secure_session_secret_here

# Replit Integration (if using Replit Auth)
REPL_ID=your_repl_id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=yourdomain.com

# Optional API Keys (if using these features)
OPENAI_API_KEY=your_openai_key
SENDGRID_API_KEY=your_sendgrid_key
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Production Settings
NODE_ENV=production
PORT=5000
```

### 5. Set Up PostgreSQL Database

```bash
# Install PostgreSQL (if not already installed)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres createuser --interactive
sudo -u postgres createdb stemulation_learning

# Run database migrations
npm run db:push
```

### 6. Build the Application

```bash
# Build the frontend
npm run build

# The built files will be in dist/ directory
```

### 7. Configure Web Server (Nginx recommended)

Create Nginx configuration:

```nginx
# /etc/nginx/sites-available/stemulation-learning
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # Serve static files
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Handle uploads
    client_max_body_size 500M;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/stemulation-learning /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 8. Start the Application

Using PM2 (recommended):
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'stemulation-learning',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/stemulation-learning',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# Create logs directory
mkdir -p logs

# Start the application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 9. Set Up SSL Certificate (if not done)

Using Let's Encrypt (free):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 10. Configure Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## Production Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "start": "NODE_ENV=production tsx server/index.ts",
    "db:push": "drizzle-kit push",
    "db:generate": "drizzle-kit generate",
    "dev": "NODE_ENV=development tsx server/index.ts"
  }
}
```

## Monitoring and Maintenance

### Log Monitoring
```bash
# View PM2 logs
pm2 logs stemulation-learning

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install --production

# Rebuild application
npm run build

# Restart application
pm2 restart stemulation-learning
```

### Database Backups
```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump stemulation_learning > "/var/backups/stemulation_$DATE.sql"
# Keep only last 7 days of backups
find /var/backups -name "stemulation_*.sql" -mtime +7 -delete
EOF

chmod +x backup.sh

# Add to crontab for daily backups
echo "0 2 * * * /var/www/stemulation-learning/backup.sh" | crontab -
```

## Troubleshooting

### Common Issues

1. **Port 5000 already in use**
   - Change PORT in .env file
   - Update Nginx proxy_pass accordingly

2. **Database connection errors**
   - Verify DATABASE_URL is correct
   - Check PostgreSQL is running: `sudo systemctl status postgresql`

3. **File upload issues**
   - Create uploads directory: `mkdir -p uploads`
   - Set permissions: `chmod 755 uploads`

4. **SSL certificate issues**
   - Verify certificate paths in Nginx config
   - Check certificate validity: `openssl x509 -in certificate.crt -text -noout`

### Performance Optimization

1. **Enable Gzip compression in Nginx**
2. **Set up CDN for static assets**
3. **Configure database connection pooling**
4. **Monitor memory usage and adjust PM2 settings**

## Security Considerations

1. **Keep dependencies updated**: `npm audit && npm update`
2. **Use strong SESSION_SECRET**: Generate with `openssl rand -base64 32`
3. **Enable HTTPS only**: Remove HTTP server block after testing
4. **Set up fail2ban**: Protect against brute force attacks
5. **Regular security updates**: `sudo apt update && sudo apt upgrade`

## Support

If you encounter issues during deployment:
1. Check application logs: `pm2 logs`
2. Verify Nginx configuration: `sudo nginx -t`
3. Test database connection: `npm run db:push`
4. Check firewall settings: `sudo ufw status`

The application should now be accessible at your domain name with full functionality including job board, video portfolios, user authentication, and all the enhanced features.