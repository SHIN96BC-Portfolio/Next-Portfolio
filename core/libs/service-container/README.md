# `@core/service-container`

이 모노레포 **FE 앱들이 공유하는 서비스 통신·DI 런타임**이다.  
범용 DI 프레임워크(inversify 대체)가 아니라, **우리 BFF/REST 계약 + 타입 안전한 서비스 레지스트리 패턴**을 한곳에 고정한다.

```bash
pnpm add @core/service-container --filter @apps/<app>
# workspace
"@core/service-container": "workspace:*"
```

import는 **패키지 루트만** 사용한다. (`@core/service-container` — deep import 금지)

---

## 포지션 (설계 원칙)

| 한다 | 하지 않는다 |
|------|-------------|
| HTTP Base, 토큰, 공통 헤더 | 도메인 Service / Impl |
| `CommonRes` / `HttpError` 계약 | `SITE`, `CONTENT` 같은 앱 도메인 키 |
| Container 런타임 + **맵 기반 typed `get`/`bind` 헬퍼** | 앱별 bind 목록 |
| Base 이름 (`COMMON_BASE`, `FILE_BASE`) | 페이지·엔티티 비즈니스 로직 |

- **정책 변경**(헤더, 토큰, 응답 스키마) → 이 패키지 한 곳
- **이 앱에 어떤 서비스를 쓰는지** → 각 앱의 `AppServiceMap` + bind

---

## 책임 분리

```text
@core/service-container
  HTTP Base, token, CommonRes, HttpError
  Container<TMap>, bind / get 런타임
  도메인 이름 없음
        ▲
        │ TMap 만 주입
앱 shared/config/service (또는 동등한 composition 모듈)
  AppServiceMap + SERVICE_KEY
  Impl bind, export serviceContainer
        ▲
        │ get(SERVICE_KEY.*)
entities/<domain>/api
  *Service (interface)
  *ServiceImpl (Base 생성자 주입)
  queries / mutations / hooks
```

### 왜 앱 레지스트리는 `shared`인가

typed `get`을 `entities/*/api/queries`가 쓰려면, **타입이 닫힌 container**를 entities가 import해야 한다.  
FSD상 entities는 `app`을 import할 수 없으므로, 레지스트리 모듈은 **shared(또는 그 아래)** 에 둔다.

이 모듈만 entities Interface/Impl을 import하는 **의도적 composition 예외**다.  
`shared/config/**` 전체를 FSD 예외로 둘 필요는 없다.

---

## 패키지 구조 (현재)

```text
core/libs/service-container/
├── base/
│   ├── common/     CommonServiceBase (+ Impl) — HTTP / token
│   └── file/       FileServiceBase (+ Impl)
├── binding/        Binding, BaseBinding (+ Impl)
├── container/      ServiceContainer (+ Impl)
├── error/          HttpError
├── service-model.ts       CommonRes
├── service-constants.ts   SERVICE_BASE_NAME, BINDING_SCOPE, (legacy SERVICE_NAME)
├── service.type.ts        BatchBinding, Constructor, …
├── index.ts
└── README.md
```

---

## 목표 API: 맵으로 닫힌 컨테이너

### 문제 (현재)

```ts
get<T>(name: symbol): T;
```

호출부가 `T`를 임의로 넣을 수 있고, **미등록 키는 런타임에만** 실패한다.  
`service.setup`에 bind를 모아 두어도 TypeScript가 “등록된 서비스만”을 강제하지 않는다.

### 목표

앱이 `AppServiceMap`을 닫으면:

- 맵에 **없는 키** → `get` / `bind` **컴파일 에러**
- `get(SERVICE_KEY.CONTENT)` 반환 타입 → `ContentService` (`get<T>`로 속일 수 없음)
- `bind(SERVICE_KEY.CONTENT, X)` → `X`는 `Constructor<ContentService>`

키는 `Symbol`보다 **string literal**이 맵과 잘 맞는다.

```ts
// 앱 — service-map.ts (Interface만, Impl 없음)
import type ContentService from '@FsdEntities/content/api/ContentService';
import type SiteService from '@FsdEntities/site/api/SiteService';

export const SERVICE_KEY = {
  SITE: 'site',
  CONTENT: 'content',
} as const;

export type AppServiceMap = {
  [SERVICE_KEY.SITE]: SiteService;
  [SERVICE_KEY.CONTENT]: ContentService;
};
```

```ts
// 앱 — service.setup.ts (여기서만 Impl bind)
import { createServiceContainer, SERVICE_BASE_NAME, BINDING_SCOPE } from '@core/service-container';
import { ContentServiceImpl } from '@FsdEntities/content/api';
import { SiteServiceImpl } from '@FsdEntities/site/api';
import { AppServiceMap, SERVICE_KEY } from './service-map';

export const serviceContainer = createServiceContainer<AppServiceMap>(/* bases */);

serviceContainer.bind(SERVICE_KEY.SITE, SiteServiceImpl, {
  baseName: SERVICE_BASE_NAME.COMMON_BASE,
  scope: BINDING_SCOPE.SINGLETON,
});
serviceContainer.bind(SERVICE_KEY.CONTENT, ContentServiceImpl, { /* … */ });
```

```ts
// entities — queries.ts
const service = serviceContainer.get(SERVICE_KEY.CONTENT);
// ContentService — generic T 불필요
```

core 쪽 개념 계약:

```ts
interface ServiceContainer<TMap extends Record<string, unknown>> {
  bind<K extends keyof TMap>(
    name: K,
    target: Constructor<TMap[K]>,
    options: { baseName: symbol; scope?: BindingScopeType }
  ): void;

  get<K extends keyof TMap>(name: K): TMap[K];

  setToken(token: string): Promise<void>;
  clearToken(): Promise<void>;
}

function createServiceContainer<TMap extends Record<string, unknown>>(
  bases?: BatchBaseBinding[]
): ServiceContainer<TMap>;
```

---

## DIP · 네이밍 (앱 entities 규칙)

루트 `README.md`의 REST 절과 동일하다. 요약만.

| 항목 | 규칙 |
|------|------|
| DIP | 호출부는 `*Service` Interface만. `*Impl`은 setup에서만 |
| Base | 생성자 주입 + 싱글톤(또는 scope) |
| Method | `(HttpMethod)(LastPath)` — `getGnb`, `getHomeSections` |
| Req/Res | `(LastPath)(HttpMethod)Req|Res` — wire는 `model/server`, UI는 mapper 후 `model/client` |
| queries | `find*` / mutations `register*`·`edit*`·`remove*` |
| hooks | `useFindGnbQuery`, `useRegisterProductMutation` |

API wire 타입을 페이지·위젯에 그대로 쓰지 않는다. **무조건 client 타입으로 맵핑**한다.

---

## 앱 체크리스트 (서비스 추가 시)

1. `entities/<domain>/api/<Domain>Service.ts` + `Impl`
2. 앱 `SERVICE_KEY` / `AppServiceMap`에 키·Interface 추가
3. `service.setup.ts`에서 Impl `bind`
4. `queries` / `mutations` / hooks — `get(SERVICE_KEY.*)` 만 사용
5. **core의 `SERVICE_NAME`에 도메인 키를 추가하지 않는다**

---

## 마이그레이션 메모

현재 코드는 아직 `get<T>(symbol)` + `SERVICE_NAME.SITE|CONTENT`(core) 형태다.  
목표로 옮길 때 순서:

1. core: `ServiceContainer<TMap>` + `createServiceContainer` 도입
2. core: 도메인 `SERVICE_NAME`(SITE/CONTENT 등) **제거** — Base/scope 상수만 유지
3. 앱: `AppServiceMap` / `SERVICE_KEY` / bind
4. 호출부: `get<SiteService>(SERVICE_NAME.SITE)` → `get(SERVICE_KEY.SITE)`
5. 다른 앱은 같은 패턴만 복제 (commerce·admin은 각자 맵)

---

## TypeScript에서의 “강제”

런타임에 `implements SiteService`를 검사하지는 않는다. 대신:

1. `bind` 시 Impl이 맵의 Interface와 안 맞으면 **컴파일 에러**
2. `get` 반환 타입이 키에 고정되어 호출부가 타입을 속일 수 없음
3. 맵에 없는 키는 `get`/`bind` 인자에서 거부

이게 이 스택에서 Java식 인터페이스 주입에 대응하는 강제 방식이다.

---

## 관련 문서

- 모노레포 루트 `README.md` — FSD, Folder & File Name Pattern, REST Services
- `AGENTS.md` — 에이전트용 요약 (`@core/*`, entities api 배치)
