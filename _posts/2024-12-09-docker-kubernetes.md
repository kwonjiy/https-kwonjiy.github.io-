---
layout: postDetail
title: "Docker와 Kubernetes: 컨테이너 기반 개발과 배포 가이드"
categories: [개발, DevOps]
---

현대 웹 개발에서 Docker와 Kubernetes는 필수적인 도구가 되었습니다. 오늘은 이 두 기술의 기본 개념부터 실전 활용법까지 자세히 알아보겠습니다.

## Docker 기초

Docker의 기본 개념과 사용법을 알아보겠습니다.

### Dockerfile 작성

```dockerfile
# Node.js 애플리케이션을 위한 Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### Docker 명령어

```bash
# 이미지 빌드
docker build -t myapp:latest .

# 컨테이너 실행
docker run -d -p 3000:3000 myapp:latest

# 컨테이너 목록 확인
docker ps

# 로그 확인
docker logs <container_id>
```

## Docker Compose

여러 컨테이너를 함께 관리하는 방법을 알아보겠습니다.

```yaml
# docker-compose.yml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Kubernetes 기초

Kubernetes의 주요 개념과 리소스들을 살펴보겠습니다.

### Pod 정의

```yaml
# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
  - name: myapp
    image: myapp:latest
    ports:
    - containerPort: 3000
```

### Deployment 설정

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
```

## 서비스 노출

Kubernetes 서비스를 설정하는 방법을 알아보겠습니다.

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## 설정과 시크릿 관리

민감한 정보를 안전하게 관리하는 방법을 살펴보겠습니다.

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data:
  API_URL: "http://api.example.com"
  LOG_LEVEL: "info"

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secrets
type: Opaque
data:
  DB_PASSWORD: base64encodedpassword
  API_KEY: base64encodedapikey
```

## 상태 관리

데이터를 영구적으로 저장하는 방법을 알아보겠습니다.

```yaml
# persistent-volume.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: myapp-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"

---
# persistent-volume-claim.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myapp-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

## 모니터링과 로깅

애플리케이션 모니터링 설정 방법을 살펴보겠습니다.

```yaml
# prometheus-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
          - role: pod
```

## CI/CD 파이프라인

GitHub Actions를 사용한 CI/CD 파이프라인 구성 예제입니다.

```yaml
# .github/workflows/deploy.yml
name: Deploy to Kubernetes
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Build Docker image
      run: docker build -t myapp:${{ github.sha }} .
    
    - name: Push to Docker Hub
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push myapp:${{ github.sha }}
    
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/myapp-deployment myapp=myapp:${{ github.sha }}
```

## 스케일링 전략

애플리케이션을 효율적으로 스케일링하는 방법을 알아보겠습니다.

```yaml
# horizontal-pod-autoscaler.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp-deployment
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
```

## 마무리

Docker와 Kubernetes는 현대 웹 개발에서 매우 중요한 도구입니다. 이러한 도구들을 잘 활용하면 애플리케이션의 배포, 확장, 관리를 효율적으로 할 수 있습니다. 지속적인 학습과 실습을 통해 이러한 도구들을 마스터하시기 바랍니다.
