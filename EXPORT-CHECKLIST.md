# STEMulation Learning - Export Checklist

## Files to Copy to Your Server

### ✅ Essential Application Files
- [ ] `server/` - Complete backend directory
- [ ] `client/` - Complete frontend directory  
- [ ] `shared/` - Shared TypeScript schemas
- [ ] `package.json` - Dependencies and scripts
- [ ] `package-lock.json` - Dependency lock file
- [ ] `tsconfig.json` - TypeScript configuration
- [ ] `vite.config.ts` - Vite build configuration
- [ ] `tailwind.config.ts` - Tailwind CSS configuration
- [ ] `postcss.config.js` - PostCSS configuration
- [ ] `drizzle.config.ts` - Database configuration
- [ ] `components.json` - UI component configuration

### ✅ Configuration Files (New)
- [ ] `ecosystem.config.js` - PM2 process management
- [ ] `.env.example` - Environment variables template
- [ ] `nginx.conf.example` - Nginx configuration template
- [ ] `DEPLOYMENT.md` - Complete deployment guide

### ✅ Documentation
- [ ] `replit.md` - Project documentation
- [ ] `DEPLOYMENT.md` - Deployment instructions
- [ ] `EXPORT-CHECKLIST.md` - This checklist

### ⚠️ Files to Exclude
- [ ] `node_modules/` - Will be reinstalled on server
- [ ] `.replit` - Replit-specific configuration
- [ ] `dist/` - Will be regenerated during build

## Quick Export Methods

### Method 1: Download as ZIP (Easiest)
1. In Replit, click the three dots menu → "Download as ZIP"
2. Extract on your local machine
3. Upload to your server via FTP/SFTP

### Method 2: Git Repository (Recommended)
1. Create a Git repository in Replit (Tools → Git)
2. Push your code to GitHub/GitLab
3. Clone on your server: `git clone <repo-url>`

### Method 3: Direct File Transfer
If you have shell access to both Replit and your server:
```bash
# Create archive excluding node_modules
tar -czf stemulation-learning.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=dist \
  server/ client/ shared/ *.json *.js *.ts *.md

# Transfer to your server
scp stemulation-learning.tar.gz user@yourserver.com:/var/www/
```

## Key Environment Variables to Set

Copy from Replit's Secrets tab to your server's `.env` file:
- [ ] `DATABASE_URL`
- [ ] `SESSION_SECRET`
- [ ] `REPL_ID`
- [ ] `REPLIT_DOMAINS` (update to your domain)
- [ ] Any API keys you're using (OpenAI, Stripe, SendGrid)

## Post-Transfer Steps

1. [ ] Install Node.js 18+ on your server
2. [ ] Set up PostgreSQL database
3. [ ] Copy files to `/var/www/stemulation-learning/`
4. [ ] Run `npm install --production`
5. [ ] Configure environment variables
6. [ ] Run database migrations: `npm run db:push`
7. [ ] Build the application: `npm run build`
8. [ ] Configure Nginx (use provided template)
9. [ ] Set up SSL certificate
10. [ ] Start with PM2: `pm2 start ecosystem.config.js`

## Domain Configuration

Update these files with your domain:
- [ ] `.env` - Set `REPLIT_DOMAINS=yourdomain.com`
- [ ] `nginx.conf` - Update `server_name` directives
- [ ] DNS settings - Point A record to your server IP

## Testing Checklist

After deployment, verify:
- [ ] Homepage loads correctly
- [ ] User authentication works
- [ ] Job board displays jobs
- [ ] Video portfolio page loads
- [ ] File uploads work (if using video features)
- [ ] Database operations function
- [ ] HTTPS redirects properly
- [ ] All trade category backgrounds display

## Backup Strategy

Set up automated backups:
- [ ] Database: `pg_dump` scheduled daily
- [ ] Files: Regular sync of uploads directory
- [ ] Code: Git repository as backup

## Support Resources

- Full deployment guide: `DEPLOYMENT.md`
- Project documentation: `replit.md`
- Configuration examples: `.env.example`, `nginx.conf.example`
- Process management: `ecosystem.config.js`

Your STEMulation Learning platform is ready for production deployment! 🚀