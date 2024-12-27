---
layout: postDetail
title: "Next.js 시작하기: React 기반 풀스택 프레임워크 완벽 가이드"
categories: [개발, Next.js]
---

Next.js는 React 기반의 풀스택 웹 프레임워크로, 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원합니다. 오늘은 Next.js의 기본 개념부터 고급 기능까지 자세히 알아보겠습니다.

## Next.js의 핵심 기능

Next.js가 제공하는 주요 기능들을 살펴보겠습니다.

### 1. 파일 시스템 기반 라우팅

```javascript
// pages/index.js - 홈페이지
function Home() {
  return <h1>Welcome to Next.js!</h1>
}

export default Home

// pages/about.js - 소개 페이지
function About() {
  return <h1>About Us</h1>
}

export default About
```

### 2. API 라우트

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}
```

## 데이터 페칭 전략

Next.js는 다양한 데이터 페칭 방법을 제공합니다.

### 1. getStaticProps (정적 생성)

```javascript
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()

  return {
    props: {
      data
    },
    revalidate: 60 // ISR: 60초마다 재생성
  }
}
```

### 2. getServerSideProps (서버 사이드 렌더링)

```javascript
export async function getServerSideProps(context) {
  const { params, req, res } = context
  const response = await fetch(`https://api.example.com/posts/${params.id}`)
  const data = await response.json()

  return {
    props: {
      data
    }
  }
}
```

## 이미지 최적화

Next.js의 Image 컴포넌트를 사용한 이미지 최적화 방법을 알아보겠습니다.

```javascript
import Image from 'next/image'

function MyComponent() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile picture"
      width={500}
      height={300}
      priority
      placeholder="blur"
    />
  )
}
```

## 스타일링 방법

Next.js에서 사용할 수 있는 다양한 스타일링 방법을 살펴보겠습니다.

### 1. CSS Modules

```css
/* styles/Home.module.css */
.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

```javascript
import styles from '../styles/Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome</h1>
    </div>
  )
}
```

### 2. Styled Components

```javascript
const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 0.5em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`
```

## 성능 최적화

Next.js 애플리케이션의 성능을 최적화하는 방법들을 알아보겠습니다.

### 1. 코드 분할

```javascript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/heavy-component'), {
  loading: () => <p>Loading...</p>
})
```

### 2. 프리페칭

```javascript
import { useRouter } from 'next/router'

function MyComponent() {
  const router = useRouter()

  return (
    <button onMouseEnter={() => router.prefetch('/about')}>
      About Us
    </button>
  )
}
```

## 배포 전략

Next.js 애플리케이션을 배포하는 다양한 방법을 살펴보겠습니다.

1. Vercel (가장 쉽고 추천되는 방법)
2. Self-hosting
3. Static Export

```bash
# Static HTML 내보내기
next build
next export

# 서버 실행
next build
next start
```

## 마무리

Next.js는 React 애플리케이션을 빌드하는 강력한 프레임워크입니다. SSR, SSG, 파일 시스템 라우팅, API 라우트 등 다양한 기능을 제공하여 현대적인 웹 애플리케이션을 쉽게 구축할 수 있게 해줍니다.
