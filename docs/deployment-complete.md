# Complete Deployment Guide

## Prerequisites
- Node.js 20+
- Java 21+
- Docker & Docker Compose
- NeonDB account
- Upstash Redis account
- Google Cloud Platform account
- Vercel account (for web)
- EAS account (for mobile)

## 1. Database Setup (NeonDB)

### Create Database
1. Go to https://neon.tech
2. Create new project: `manabandhu-prod`
3. Enable `require_ssl` in settings
4. Copy connection details:
   - Host: `xxx.neon.tech`
   - Database: `neondb`
   - User: `xxx`
   - Password: `xxx`

### Environment Variables
```bash
NEON_DB_URL=jdbc:postgresql://xxx.neon.tech/neondb?sslmode=require
NEON_DB_USER=xxx
NEON_DB_PASS=xxx
```

## 2. Cache Setup (Upstash Redis)

### Create Redis Instance
1. Go to https://upstash.com
2. Create new Redis database: `manabandhu-cache`
3. Copy credentials:
   - URL: `rediss://xxx.upstash.io:6379`
   - Token: `xxx`

### Environment Variables
```bash
UPSTASH_REDIS_URL=rediss://xxx.upstash.io:6379
UPSTASH_REDIS_TOKEN=xxx
```

## 3. Backend Deployment (Google Cloud Run)

### Build Docker Image
```bash
cd backend
docker build -t gcr.io/PROJECT_ID/manabandhu-backend:latest .
docker push gcr.io/PROJECT_ID/manabandhu-backend:latest
```

### Deploy to Cloud Run
```bash
gcloud run deploy manabandhu-backend \
  --image gcr.io/PROJECT_ID/manabandhu-backend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NEON_DB_URL=$NEON_DB_URL,NEON_DB_USER=$NEON_DB_USER,NEON_DB_PASS=$NEON_DB_PASS,UPSTASH_REDIS_URL=$UPSTASH_REDIS_URL,UPSTASH_REDIS_TOKEN=$UPSTASH_REDIS_TOKEN,JWT_SECRET=$JWT_SECRET,ALLOWED_ORIGINS=https://manabandhu.vercel.app"
```

### Environment Variables
```bash
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
ALLOWED_ORIGINS=https://manabandhu.vercel.app,https://manabandhu.com
```

## 4. Web Deployment (Vercel)

### Setup
```bash
cd apps/web
npm install -g vercel
vercel login
```

### Deploy
```bash
vercel --prod
```

### Environment Variables (Vercel Dashboard)
```bash
NEXT_PUBLIC_API_URL=https://manabandhu-backend-xxx.run.app/api/v1
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
```

## 5. Mobile Deployment (EAS)

### Setup EAS
```bash
cd apps/mobile
npm install -g eas-cli
eas login
eas build:configure
```

### Build iOS
```bash
eas build --platform ios --profile production
```

### Build Android
```bash
eas build --platform android --profile production
```

### OTA Updates
```bash
eas update --branch production --message "Feature update"
```

### Environment Variables (eas.json)
```json
{
  "build": {
    "production": {
      "env": {
        "API_BASE_URL": "https://manabandhu-backend-xxx.run.app/api/v1",
        "FIREBASE_API_KEY": "xxx"
      }
    }
  }
}
```

## 6. CI/CD Setup (GitHub Actions)

### Secrets to Add
- `GCP_PROJECT_ID`
- `GCP_SA_KEY` (Service Account JSON)
- `NEON_DB_URL`
- `NEON_DB_USER`
- `NEON_DB_PASS`
- `UPSTASH_REDIS_URL`
- `UPSTASH_REDIS_TOKEN`
- `JWT_SECRET`
- `VERCEL_TOKEN`
- `EXPO_TOKEN`

### Workflow File
Already configured in `.github/workflows/ci.yml`

## 7. Monitoring & Observability

### Backend Logs
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=manabandhu-backend" --limit 50
```

### Database Monitoring
- NeonDB Dashboard: Monitor connections, queries, storage
- Set up alerts for high CPU/memory usage

### Redis Monitoring
- Upstash Dashboard: Monitor cache hit rate, memory usage
- Set up alerts for connection issues

## 8. Rollback Procedures

### Backend Rollback
```bash
gcloud run services update-traffic manabandhu-backend \
  --to-revisions=PREVIOUS_REVISION=100
```

### Web Rollback
```bash
vercel rollback
```

### Mobile Rollback
```bash
eas update --branch production --message "Rollback" --republish
```

## 9. Cost Optimization

### NeonDB
- Use autoscaling: Scale to zero during low traffic
- Enable connection pooling
- Estimated: $19-49/month

### Upstash Redis
- Free tier: 10K commands/day
- Pro tier: $0.2 per 100K commands
- Estimated: $0-20/month

### Cloud Run
- Pay per request
- Set max instances: 10
- Estimated: $20-100/month

### Vercel
- Hobby: Free for personal projects
- Pro: $20/month for production

### Total Estimated Cost: $60-200/month

## 10. Security Checklist

- [ ] Enable HTTPS only
- [ ] Set CORS allowed origins
- [ ] Rotate JWT secret regularly
- [ ] Enable rate limiting
- [ ] Set up DDoS protection (Cloud Armor)
- [ ] Enable database SSL
- [ ] Use environment variables for secrets
- [ ] Enable audit logging
- [ ] Set up backup strategy
- [ ] Configure firewall rules

## 11. Performance Optimization

### Backend
- Enable Redis caching for frequent queries
- Use database connection pooling
- Implement pagination for large datasets
- Add database indexes (already configured)

### Frontend
- Enable code splitting
- Optimize images (WebP format)
- Use lazy loading
- Enable service workers for PWA

### Mobile
- Use Hermes engine (already enabled)
- Optimize bundle size
- Enable OTA updates for quick fixes
