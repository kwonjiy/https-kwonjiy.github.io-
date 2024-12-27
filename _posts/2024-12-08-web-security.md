---
layout: postDetail
title: "웹 보안 기초: 개발자가 알아야 할 보안 위협과 대응 방안"
categories: [개발, 보안]
---

웹 애플리케이션 보안은 현대 웹 개발에서 가장 중요한 측면 중 하나입니다. 오늘은 주요 보안 위협과 이에 대한 대응 방안을 자세히 알아보겠습니다.

## XSS (Cross-Site Scripting) 공격

XSS는 가장 흔한 웹 보안 취약점 중 하나입니다.

### 대응 방안

```javascript
// 잘못된 예
const userInput = '<script>alert("해킹!");</script>';
element.innerHTML = userInput;

// 올바른 예
const userInput = '<script>alert("해킹!");</script>';
element.textContent = userInput;

// React에서의 안전한 처리
function Component({ userInput }) {
  return <div>{userInput}</div>; // React가 자동으로 이스케이프 처리
}
```

## CSRF (Cross-Site Request Forgery)

CSRF 공격을 방지하는 방법을 알아보겠습니다.

```javascript
// Express.js에서 CSRF 토큰 설정
const csrf = require('csurf');
app.use(csrf({ cookie: true }));

app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

// 프론트엔드에서 CSRF 토큰 사용
fetch('/api/data', {
  method: 'POST',
  headers: {
    'CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
  },
  body: JSON.stringify(data)
});
```

## SQL Injection 방지

SQL Injection 공격을 방지하는 방법을 살펴보겠습니다.

```javascript
// 잘못된 예
const query = `SELECT * FROM users WHERE username = '${username}'`;

// 올바른 예 (Prepared Statement 사용)
const query = 'SELECT * FROM users WHERE username = ?';
connection.query(query, [username], (error, results) => {
  if (error) throw error;
  console.log(results);
});
```

## 안전한 인증 구현

안전한 사용자 인증 시스템을 구현하는 방법을 알아보겠습니다.

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 비밀번호 해싱
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// 비밀번호 검증
async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT 토큰 생성
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}
```

## 보안 헤더 설정

Express.js에서 보안 헤더를 설정하는 방법을 알아보겠습니다.

```javascript
const helmet = require('helmet');

app.use(helmet());

// 커스텀 보안 헤더 설정
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  referrerPolicy: { policy: 'same-origin' }
}));
```

## 파일 업로드 보안

안전한 파일 업로드 처리 방법을 살펴보겠습니다.

```javascript
const multer = require('multer');
const path = require('path');

// 파일 필터링
const fileFilter = (req, file, cb) => {
  // 허용할 파일 형식
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// 업로드 설정
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});
```

## Rate Limiting

API 요청 제한을 구현하는 방법을 알아보겠습니다.

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // IP당 최대 요청 수
  message: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.'
});

// API 라우트에 적용
app.use('/api/', limiter);
```

## 보안 모니터링

애플리케이션의 보안을 모니터링하는 방법을 살펴보겠습니다.

```javascript
const winston = require('winston');

// 로깅 설정
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// 보안 이벤트 로깅
function logSecurityEvent(event) {
  logger.info('Security Event', {
    timestamp: new Date().toISOString(),
    type: event.type,
    user: event.user,
    ip: event.ip,
    details: event.details
  });
}
```

## 마무리

웹 보안은 지속적인 관심과 업데이트가 필요한 분야입니다. 이러한 기본적인 보안 대책들을 적용하고, 정기적인 보안 감사를 통해 애플리케이션의 보안을 강화할 수 있습니다.
