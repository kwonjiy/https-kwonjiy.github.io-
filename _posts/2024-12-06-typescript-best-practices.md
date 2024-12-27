---
layout: postDetail
title: "TypeScript 모범 사례: 더 나은 코드를 위한 가이드"
categories: [개발, TypeScript]
---

TypeScript는 JavaScript에 정적 타입을 추가하여 더 안정적인 코드를 작성할 수 있게 해주는 언어입니다. 오늘은 TypeScript를 사용할 때 알아야 할 모범 사례들을 살펴보겠습니다.

## 타입 시스템 활용하기

TypeScript의 타입 시스템을 최대한 활용하는 방법을 알아보겠습니다.

```typescript
// 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 선택적 속성
}

// 제네릭 사용
function getFirstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

### 유니온 타입과 교차 타입

```typescript
type Status = 'pending' | 'completed' | 'failed';

interface ErrorResponse {
  error: string;
  code: number;
}

interface SuccessResponse {
  data: any;
  status: 'success';
}

type ApiResponse = ErrorResponse | SuccessResponse;
```

## 타입 추론 활용하기

TypeScript의 타입 추론 기능을 활용하여 코드를 더 간결하게 만드는 방법을 알아보겠습니다.

```typescript
// 좋은 예
const numbers = [1, 2, 3]; // number[]로 추론됨
const user = {
  name: 'John',
  age: 30
}; // { name: string; age: number }로 추론됨

// 불필요한 타입 명시를 피하기
let x = 0; // number로 추론됨
let arr = [1, 2, 3]; // number[]로 추론됨
```

## 고급 타입 패턴

실제 프로젝트에서 유용하게 사용할 수 있는 고급 타입 패턴들을 살펴보겠습니다.

```typescript
// 조건부 타입
type IsString<T> = T extends string ? true : false;

// 매핑된 타입
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 유틸리티 타입 활용
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
```

## 비동기 코드 처리

Promise와 async/await를 TypeScript에서 안전하게 사용하는 방법을 알아보겠습니다.

```typescript
async function fetchUser(id: number): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    throw new Error('An unknown error occurred');
  }
}
```

## 데코레이터 활용

클래스와 메서드에 데코레이터를 사용하는 방법을 살펴보겠습니다.

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

## 모듈 시스템

TypeScript의 모듈 시스템을 효과적으로 사용하는 방법을 알아보겠습니다.

```typescript
// types.ts
export interface User {
  id: number;
  name: string;
}

// services.ts
import { User } from './types';

export class UserService {
  async getUser(id: number): Promise<User> {
    // 구현
  }
}
```

## 테스트와 TypeScript

Jest나 Mocha와 같은 테스트 프레임워크에서 TypeScript를 사용하는 방법을 살펴보겠습니다.

```typescript
import { add } from './calculator';

describe('Calculator', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });
});
```

## 마무리

TypeScript는 강력한 타입 시스템과 최신 JavaScript 기능을 제공하여 더 안정적이고 유지보수하기 좋은 코드를 작성할 수 있게 해줍니다. 이러한 모범 사례들을 따르면서 TypeScript의 장점을 최대한 활용하시기 바랍니다.
