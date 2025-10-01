# Infrastructure

This directory contains infrastructure configuration, Docker files, CI/CD pipelines, and deployment scripts for TransitFlow AI.

## Structure (To Be Implemented)

```
infrastructure/
├── docker/               # Dockerfiles
│   ├── backend.Dockerfile
│   ├── ml.Dockerfile
│   └── nginx.Dockerfile
├── k8s/                  # Kubernetes manifests
│   ├── deployments/
│   ├── services/
│   ├── ingress/
│   └── configmaps/
├── terraform/            # Infrastructure as Code
│   ├── aws/
│   ├── modules/
│   └── variables.tf
├── ansible/              # Configuration management
├── monitoring/           # Monitoring configs
│   ├── prometheus.yml
│   └── grafana/
├── ci-cd/                # CI/CD pipelines
│   ├── github-actions/
│   └── scripts/
└── README.md            # This file
```

## Docker

### Dockerfiles

Each service has its own Dockerfile:
- `backend.Dockerfile`: Backend API service
- `ml.Dockerfile`: ML/AI service
- `nginx.Dockerfile`: Reverse proxy/load balancer

### Docker Compose

See `docker-compose.yml` in project root for local development.

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose build
```

## Kubernetes

### Cluster Setup

```bash
# Create cluster (example with GKE)
gcloud container clusters create transitflow \
  --zone us-west1-a \
  --num-nodes 3 \
  --machine-type n1-standard-2

# Configure kubectl
gcloud container clusters get-credentials transitflow
```

### Deployments

```bash
# Deploy backend
kubectl apply -f k8s/deployments/backend.yaml

# Deploy ML service
kubectl apply -f k8s/deployments/ml-service.yaml

# Deploy all
kubectl apply -f k8s/
```

### Services

```yaml
# k8s/services/backend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

## Infrastructure as Code (Terraform)

### AWS Infrastructure

```hcl
# terraform/aws/main.tf
provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "./modules/vpc"
  # VPC configuration
}

module "ecs" {
  source = "./modules/ecs"
  # ECS cluster configuration
}

module "rds" {
  source = "./modules/rds"
  # PostgreSQL RDS instance
}
```

### Deploy Infrastructure

```bash
cd terraform/aws

# Initialize
terraform init

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy (careful!)
terraform destroy
```

## CI/CD

### GitHub Actions

Automated workflows for:
- Building and testing
- Linting and code quality
- Security scanning
- Deployment

### Workflow Example

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to AWS
        run: |
          # Build Docker images
          # Push to ECR
          # Update ECS service
```

## Monitoring

### Prometheus

Configuration for metrics collection:

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'backend'
    static_configs:
      - targets: ['backend:3000']
  
  - job_name: 'ml-service'
    static_configs:
      - targets: ['ml-service:5000']
```

### Grafana

Dashboards for visualization:
- Application metrics
- Infrastructure metrics
- ML model performance
- User analytics

### Alerts

```yaml
# monitoring/alerts.yml
groups:
  - name: api_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status="500"}[5m]) > 0.05
        annotations:
          summary: "High error rate detected"
```

## Logging

### Stack

- **Collection**: Fluentd
- **Storage**: Elasticsearch
- **Visualization**: Kibana

### Configuration

```yaml
# monitoring/fluentd.conf
<source>
  @type forward
  port 24224
</source>

<match **>
  @type elasticsearch
  host elasticsearch
  port 9200
  index_name transitflow
</match>
```

## Backup and Recovery

### Database Backups

```bash
# Automated daily backups
0 2 * * * /scripts/backup-postgres.sh

# Backup script
pg_dump -h $DB_HOST -U $DB_USER $DB_NAME | \
  gzip > backup-$(date +%Y%m%d).sql.gz

# Upload to S3
aws s3 cp backup-*.sql.gz s3://transitflow-backups/
```

### Disaster Recovery

- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 1 hour
- Regular disaster recovery drills

## Security

### SSL/TLS

```bash
# Generate SSL certificates with Let's Encrypt
certbot certonly --dns-route53 \
  -d transitflow.ai \
  -d api.transitflow.ai
```

### Secrets Management

```bash
# Use AWS Secrets Manager
aws secretsmanager create-secret \
  --name transitflow/api-keys \
  --secret-string file://secrets.json

# Or Kubernetes Secrets
kubectl create secret generic api-keys \
  --from-file=keys.json
```

### Network Security

- VPC with private subnets
- Security groups
- WAF (Web Application Firewall)
- DDoS protection

## Scaling

### Horizontal Scaling

```bash
# Scale backend pods
kubectl scale deployment backend --replicas=5

# Auto-scaling
kubectl autoscale deployment backend \
  --min=2 --max=10 \
  --cpu-percent=70
```

### Load Balancing

- Application Load Balancer (AWS ALB)
- Round-robin distribution
- Health checks
- Session affinity

## Cost Optimization

### Strategies

- Use spot instances for non-critical workloads
- Right-size instances based on usage
- Enable auto-scaling to match demand
- Use S3 lifecycle policies for data
- Implement caching to reduce API calls

### Monitoring Costs

```bash
# AWS Cost Explorer
aws ce get-cost-and-usage \
  --time-period Start=2024-01-01,End=2024-01-31 \
  --granularity MONTHLY \
  --metrics BlendedCost
```

## Environments

### Development
- Local Docker Compose
- Development database
- Mock external APIs

### Staging
- AWS ECS/GKE
- Production-like setup
- Real APIs (test accounts)

### Production
- AWS ECS/GKE
- High availability
- Auto-scaling
- Full monitoring

## Deployment Process

### Blue-Green Deployment

1. Deploy new version (green)
2. Run smoke tests
3. Switch traffic to green
4. Monitor for issues
5. Keep blue as rollback option

### Canary Deployment

1. Deploy to 10% of servers
2. Monitor metrics
3. Gradually increase to 50%
4. Full deployment if stable
5. Rollback if issues detected

## Maintenance

### Regular Tasks

- Security patches (weekly)
- Dependency updates (monthly)
- Log rotation (daily)
- Database optimization (monthly)
- Backup verification (weekly)

### Runbooks

Document procedures for:
- Deployment
- Rollback
- Incident response
- Database migration
- Scaling operations

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Terraform Documentation](https://www.terraform.io/docs/)
- [AWS Best Practices](https://aws.amazon.com/architecture/well-architected/)
