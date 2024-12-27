---
layout: postDetail
title: "React Hooks 완벽 가이드: useState와 useEffect 마스터하기"
tags: [React, JavaScript, Frontend]
categories: [개발, React]
---

React Hooks는 함수형 컴포넌트에서 상태 관리와 생명주기 기능을 사용할 수 있게 해주는 혁신적인 기능입니다. 오늘은 가장 많이 사용되는 두 가지 Hook인 useState와 useEffect에 대해 자세히 알아보겠습니다.

## useState 깊이 이해하기

useState는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 Hook입니다. 기본적인 사용법부터 고급 패턴까지 살펴보겠습니다.

```javascript
const [count, setCount] = useState(0);
```

### useState의 장점
1. 간단한 상태 관리
2. 직관적인 API
3. 재사용성이 높은 코드

## useEffect 활용하기

useEffect는 컴포넌트의 부수 효과를 처리하는 데 사용됩니다. API 호출, 구독 설정, 수동적인 DOM 조작 등을 처리할 수 있습니다.

```javascript
useEffect(() => {
  // 데이터 가져오기
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => setData(data));

  // 클린업 함수
  return () => {
    // 구독 해제 등의 정리 작업
  };
}, []);
```

### useEffect의 주요 사용 사례
1. API 데이터 가져오기
2. 이벤트 리스너 등록/해제
3. DOM 직접 조작
4. 타이머 설정/해제

## 실제 활용 예제

실제 프로젝트에서 자주 사용되는 패턴들을 살펴보겠습니다.

```javascript
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## 성능 최적화

Hooks를 사용할 때 주의해야 할 성능 관련 팁들을 소개합니다.

1. 의존성 배열 올바르게 사용하기
2. useMemo와 useCallback 활용하기
3. 불필요한 리렌더링 방지하기

## 마무리

React Hooks는 클래스 컴포넌트의 복잡성을 줄이고, 로직의 재사용성을 높여주는 강력한 도구입니다. useState와 useEffect를 잘 이해하고 활용하면, 더 효율적이고 유지보수하기 좋은 React 애플리케이션을 만들 수 있습니다.
