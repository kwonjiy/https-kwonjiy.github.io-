---
layout: postDetail
title: "웹 성능 최적화: 빠른 웹사이트 구축을 위한 가이드"
categories: [개발, 성능]
---

웹 성능 최적화는 사용자 경험을 향상시키고 검색 엔진 최적화(SEO)에도 중요한 역할을 합니다. 오늘은 웹 성능을 최적화하는 다양한 방법들을 알아보겠습니다.

## 이미지 최적화

이미지는 웹사이트의 로딩 시간에 큰 영향을 미칩니다.

### 이미지 지연 로딩

```html
<img 
  src="placeholder.jpg"
  data-src="large-image.jpg"
  loading="lazy"
  alt="Description"
/>
```

```javascript
// 커스텀 지연 로딩 구현
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});
```

## 자바스크립트 최적화

자바스크립트 코드를 최적화하는 방법을 알아보겠습니다.

### 코드 분할

```javascript
// React에서의 코드 분할
import React, { Suspense, lazy } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 번들 크기 최적화

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

## CSS 최적화

CSS를 최적화하는 방법을 살펴보겠습니다.

### 중요 CSS 인라인화

```html
<head>
  <style>
    /* 중요한 초기 렌더링을 위한 CSS */
    .header {
      background-color: #fff;
      height: 60px;
      position: fixed;
      top: 0;
      width: 100%;
    }
  </style>
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
```

### 사용하지 않는 CSS 제거

```javascript
// PurgeCSS 설정
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.jsx',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
}
```

## 캐싱 전략

효과적인 캐싱 전략을 구현하는 방법을 알아보겠습니다.

### 서비스 워커 구현

```javascript
// service-worker.js
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

## 서버 사이드 최적화

서버 측에서 할 수 있는 최적화 방법들을 살펴보겠습니다.

### Gzip 압축

```javascript
// Express.js에서 Gzip 압축 설정
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());
```

### HTTP/2 설정

```javascript
const spdy = require('spdy');
const express = require('express');
const app = express();

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

spdy.createServer(options, app)
  .listen(3000, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1);
    }
    console.log('Server listening on port 3000.');
  });
```

## 성능 모니터링

웹사이트의 성능을 모니터링하는 방법을 알아보겠습니다.

### 성능 메트릭 수집

```javascript
// Web Vitals 측정
import {getLCP, getFID, getCLS} from 'web-vitals';

function sendToAnalytics({name, delta, id}) {
  ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    eventLabel: id,
    nonInteraction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

## 프리페칭과 프리로딩

리소스를 미리 로드하는 전략을 살펴보겠습니다.

```html
<!-- DNS 프리페치 -->
<link rel="dns-prefetch" href="//example.com">

<!-- 프리로드 -->
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">

<!-- 프리페치 -->
<link rel="prefetch" href="page-2.html">
```

## 마무리

웹 성능 최적화는 지속적인 과정입니다. 사용자의 행동 패턴을 분석하고, 성능 메트릭을 모니터링하면서 꾸준히 개선해 나가는 것이 중요합니다. 이러한 최적화 기법들을 적절히 활용하여 더 나은 사용자 경험을 제공하시기 바랍니다.
