## Next Portfolio

## 현재 작업중입니다.

## 프로젝트 설명
- Next.js 웹 프론트 코드를 보여드리기 위한 프로젝트 입니다.

## Skill
<div>
    <div>
        <img src="https://img.shields.io/badge/Node.js(v22.17.0)-339933?style=flat&logo=node.js&logoColor=white"/>
        <img src="https://img.shields.io/badge/npm(v11.7.0)-CB3837?style=flat&logo=npm&logoColor=white"/>
    </div>
    <div>
        <img src="https://img.shields.io/badge/Next(v16.0.10)-000000?style=flat&logo=next.js&logoColor=white"/>
        <img src="https://img.shields.io/badge/React(v19)-61DAFB?style=flat&logo=react&logoColor=white"/>
        <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
    </div>
    <div>
        <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
        <img src="https://img.shields.io/badge/redux-764ABC?style=flatl&logo=redux&logoColor=white"/>
        <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=reactquery&logoColor=white"/>
        <img src="https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white"/>
        <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat&logo=reacthookform&logoColor=white"/>
    </div>
</div>

## 관련 프로젝트 전체 구조

```
[Clients]
 ├─ User FE (Next.js, REST)
 └─ Admin FE (Next.js, GraphQL)

[Edge]
 └─ API Gateway / Edge (Auth, Rate limit, WAF, Routing)

[BFF Layer]
 ├─ User BFF (REST)
 └─ Admin BFF (GraphQL)

[Services]
 └─ MSA (Spring Boot, 각 도메인별 서비스) → 각자 DB (소유권 분리)
```

### FE

- Next.js(app router) Client Web(REST API)
    - Full Responsive Web Design
    - FSD Pattern
    - 페이지 로딩/캐싱/엣지 최적화 쉽고, CDN과 궁합 좋음.
- Next.js(app router) Admin Web(GraphQL)
    - Full Responsive Web Design
    - FSD Pattern
    - 화면이 데이터 탐색적이고 테이블/필터/정렬/부분 갱신이 많아 GraphQL이 유리.
- Flutter Client App


### BE
- API Gateway/Edge(NGINX/Envoy/API Gateway/AWS ALB+WAF 등)
  - AuthN/Token 검증, Rate limit, WAF, IP 제어, 요청 라우팅 표준화
  - 공통 헤더(요청 ID, trace) 주입
  - Canary/Blue-Green 라우팅 쉬움
- Spring Boot 3.x.x(Gradle)
  - MSA Architecture
  - Gateway
    - Admin BFF(GraphQL)
    - Client BFF (REST API)
- PostgreSQL
- Nginx

### DevOps

- AWS Lightsail
- Docker
- Jenkins


## Design Pattern
<div>
  <img src="https://img.shields.io/badge/FSD-FFDA44?style=flat&logo=textpattern&logoColor=black"/>
</div>

[FSD 공식문서](https://feature-sliced.github.io/documentation/docs/get-started/overview)

### FSD 계층 (Layers)

앱 코드는 `apps/<app>/src/fsd/` 아래에 둔다. **상위 레이어는 하위 레이어만 import** 한다 (Biome로 강제).

| Layer | 역할 |
|-------|------|
| `app` | FE 앱 초기화 / Provider / 전역 layout / auth·i18n·store·react-query 진입 |
| `pages` | Next.js `page` 단위 화면 조립 (라우트 엔트리의 FSD 대응) |
| `widgets` | 페이지를 구성하는 큰 UI 조각 (여러 feature/entities 조합) |
| `features` | 사용자 시나리오 단위 (login, scroll-reveal 등) |
| `entities` | **BE Domain 기준** 슬라이스 (site, content, product …) |
| `shared` | 앱 전역 재사용 (UI kit facade, validations, utils, **composition config**) |

```
apps/<app>/src/fsd/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

### 왜 FSD 패턴(Feature-Sliced Design)을 선택했는가
- FSD 패턴은 각 기능이나 도메인별로 관련된 파일들을 모아놓는 방식입니다.
- 보통 복잡한 기능이 많고 프로젝트 규모가 큰 어드민 프로젝트는 FSD 패턴을 사용하는 것이 여러가지로 유리하다고 생각했습니다.
- 또한 단일 책임 원칙을 준수하며 개발하기 용이합니다.
- 유지보수 측면: 기능단위로 폴더가 존재하기 때문에 각 기능들을 독립적으로 개발, 테스트, 유지보수하기가 쉽습니다.
  해당 코드가 어떤 기능과 관련이 있는지 쉽게 알 수 있어 가독성이 높아집니다.
- 확장성 측면: 새로운 기능이 추가 되더라도 기존 폴더 구조를 수정할 필요 없이 새로운 폴더를 추가하기만 하면 되기 때문에 확장에 좀 더 유연하게 대처할 수 있습니다.
- 협업 측면: 팀원들끼리 기능 단위로 작업을 나눠서 진행할 때 팀원들이 기능별로 독립적으로 작업할 수 있어 협업에 유리합니다.

### FSD 슬라이스 · 세그먼트 폴더 규칙

FSD는 **Layer → Slice → Segment** 3단이다.

```
entities/content/          ← Slice (도메인/기능 이름, kebab-case)
├── api/                   ← Segment
├── model/
├── ui/
├── lib/                   ← 선택
├── config/                ← 선택
└── index.ts               ← 공개 API (필요 시)
```

#### 허용 세그먼트 (이 저장소 표준)

| Segment | 넣는 것 | 넣지 않는 것 |
|---------|---------|--------------|
| `ui/` | React 컴포넌트, 스타일에 가까운 프레젠테이션 | API 호출, 비즈니스 규칙 |
| `model/` | type / constants / schema / mapper / mock / client·server DTO | JSX, HTTP 클라이언트 구현 |
| `api/` | Service 인터페이스·구현, queries, mutations, RQ hooks | UI, 순수 도메인 상수 덤프 |
| `lib/` | 이 슬라이스 전용 헬퍼 (날짜 포맷, 파서 등) | 다른 슬라이스에서도 쓰는 범용 유틸 → `shared` |
| `config/` | 이 슬라이스 전용 설정 상수·플래그 | 앱 전역 DI/proxy/i18n → `shared/config` |
| `hooks/` | 슬라이스 전용 훅 (ui/api에 넣기 애매할 때) | 전역 훅 → `shared` 또는 `features` |

세그먼트는 **필요할 때만** 만든다. 빈 폴더를 미리 만들지 않는다.

#### `model/` 내부 분할 기준 (types.ts 한방 금지)

관심사가 섞이면 `model/types.ts` 하나에 때려넣지 않는다. **개념(concept) 단위**로 나눈다.

| 상황 | 구조 |
|------|------|
| 타입/상수가 **1개 개념·소량** | `model/types.ts`, `model/constants.ts` 단일 파일 OK |
| 타입/상수가 **여러 개념** 또는 ~100줄 초과 | `model/types/<concept>.ts`, `model/constants/<concept>.ts` |
| API wire format과 UI 모델이 다름 | `model/server/`, `model/client/`, `model/mapper/` |
| MSW·로컬 더미 | `model/mock/` |
| zod 스키마 | `model/schema/` (또는 feature면 `features/<name>/model/`) |

**예시 — entities/content (목표 구조)**

```
entities/content/
├── api/
│   ├── ContentService.ts
│   ├── ContentServiceImpl.ts
│   ├── queries.ts
│   ├── mutations.ts          # mutation 없으면 생략 가능
│   ├── useContentService.ts
│   └── index.ts
├── model/
│   ├── constants/
│   │   └── section-type.ts   # SECTION_TYPE
│   ├── types/
│   │   ├── content-lang.ts   # ContentLang + resolve helpers
│   │   ├── content-mode.ts
│   │   └── section-config.ts # SectionConfig 및 하위 config
│   ├── server/
│   │   └── home-section.ts   # wire DTO (HomeSectionGetRes)
│   ├── client/
│   │   └── home-section.ts   # UI 모델 (HomeSection)
│   ├── mapper/
│   │   └── map-server-home-section-to-client.ts
│   ├── mock/
│   └── index.ts              # 공개 re-export만
└── ui/                       # 있을 때만
```

`PAGE_KEY`처럼 라우팅·여러 도메인이 공유하는 값은 `shared/config/routing/page-key.ts`에 둔다 (content 전용 상수가 아님).

**예시 — entities/site (server/client 분리)**

```
entities/site/
├── api/
│   ├── SiteService.ts
│   ├── SiteServiceImpl.ts
│   ├── queries.ts
│   ├── useSiteService.ts
│   └── index.ts
└── model/
    ├── server/gnb.ts
    ├── client/gnb.ts
    ├── mapper/map-server-gnb-to-client.ts
    └── mock/
```

#### `shared/` 슬라이스 규칙

`shared`는 도메인 슬라이스가 아니라 **기술/UI 단위 슬라이스**다.

```
shared/
├── config/          ← 앱 composition root (아래 예외 참고)
│   ├── service/     # serviceContainer bind
│   ├── proxy/
│   ├── i18n/
│   ├── cookie/
│   ├── mock/
│   └── …
├── button/ui/
├── validations/
│   ├── model/
│   └── utils/
└── utils/
    └── date/
```

- UI kit이 `@core/bc-ui`에 있으면 `shared/<kit>/ui`는 **re-export facade**만 둔다.
- 범용 유틸은 `shared/utils/<topic>/kebab-case.ts`.
- **Biome:** `shared/**` 에는 상위 레이어 import 금지. 예외는 composition만:
  - `shared/config/service/**` — typed `AppServiceMap` + Impl bind
  - `shared/config/mock/handlers/**` — MSW 도메인 handler (entities mock 조립)
- cookie / theme / i18n / proxy / routing 등 나머지 config는 상위 import 없이 유지한다.
- 상세: [`core/libs/service-container/README.md`](core/libs/service-container/README.md)

#### 폴더 vs 파일 — 언제 폴더를 만드나

| 기준 | 선택 |
|------|------|
| 같은 역할 파일이 **1개** | 세그먼트 바로 아래 단일 파일 (`model/constants.ts`) |
| 같은 역할 파일이 **2개 이상**이거나 계속 늘 예정 | 하위 폴더 (`model/constants/…`) |
| 역할이 다르면 | **파일명 suffix로 구분하지 말고** 폴더(세그먼트/하위 폴더)로 구분 |
| Next.js 라우트 | `src/app/` 만 사용. FSD `pages/`는 화면 조립 컴포넌트 |

---

## Folder & File Name Pattern

폴더가 역할을 말하고, 파일명은 **그 안에서의 개념**을 말한다.

### 파일명 규칙

| 역할 / 타입 | 권장 명명 | 예시 | 비고 |
|-------------|-----------|------|------|
| **React Component** | `PascalCase` | `LoginModal.tsx`, `UserCard.tsx` | JSX/TSX 컴포넌트 |
| **Next.js app router** | `lowercase` | `page.tsx`, `layout.tsx`, `route.ts` | `src/app/` 전용 |
| **유틸 / 헬퍼 / mapper** | `kebab-case` | `format-date.ts`, `map-server-gnb-to-client.ts` | |
| **커스텀 훅** | `use` + `camelCase` | `useAuth.ts`, `useFindGnbQuery.ts` | |
| **타입 (단일·소량)** | `types.ts` 또는 `kebab-case` | `model/types.ts`, `gnb.ts` | 폴더가 역할을 대체하면 prefix 생략 |
| **타입 (다개념)** | `kebab-case` | `model/types/home-section.ts` | **concept 이름**, `types` 반복 금지 |
| **상수 (단일·소량)** | `constants.ts` | `model/constants.ts`, `config/.../constants.ts` | |
| **상수 (다개념)** | `kebab-case` | `model/constants/page-key.ts` | `*-constants.ts` suffix 불필요 (폴더가 역할) |
| **enum 전용** | `kebab-case` + `.enum` | `status.enum.ts` | const object면 일반 constants로 |
| **zod 스키마** | `kebab-case` + `-schema` | `login-schema.ts`, `auth-schema.ts` | |
| **REST Service** | `PascalCase` | `SiteService.ts`, `SiteServiceImpl.ts` | Interface / Impl |
| **RQ query·mutation 모듈** | `queries.ts` / `mutations.ts` | 세그먼트 `api/` 고정 파일명 | |
| **설정 / 초기화** | `*.setup.ts` 또는 tool 관례 | `service.setup.ts`, `jest.setup.ts`, `next.config.ts` | 앱/툴 부트스트랩 |
| **공개 배럴** | `index.ts` | 슬라이스·세그먼트 public API | deep import 남발 방지용 |

### 네이밍 안티패턴

| Bad | Good | 이유 |
|-----|------|------|
| `model/types.ts`에 lang·section·DTO·helper 전부 | `types/`, `constants/`로 분리 | 관심사 혼합 |
| `auth-constants.ts`를 `ui/` 옆에 방치 | `model/constants.ts` 또는 `config/` | 역할 폴더 없음 |
| `getThemeCookie.ts` (util인데 camelCase) | `get-theme-cookie.ts` | 유틸은 kebab-case |
| `schema.ts` | `login-schema.ts` | 슬라이스 밖 re-export 시 충돌·모호 |

---

## Core Libraries (`@core/*`)

공통 인프라는 앱 `services/`가 아니라 모노레포 `core/` 패키지로 둔다.

```
core/
├── libs/
│   ├── service-container/   # @core/service-container — Base / Binding / Container / CommonRes
│   ├── proxy-container/     # @core/proxy-container
│   ├── cookie/              # @core/cookie
│   ├── crypto/              # @core/crypto
│   ├── storage/             # @core/storage
│   └── utils/               # @core/utils
└── bc-ui/                   # @core/bc-ui — accordion, modal, sheet, print, utils
```

| 규칙 | 내용 |
|------|------|
| import | `@core/<package>` **루트 엔트리만** (패키지 내부 deep import 금지) |
| 앱 → core | `workspace:*` |
| core → 앱 | **금지** (`@Fsd*`, `@NextApp`, `@Src` import 불가) |
| UI | 공통 컴포넌트는 `@core/bc-ui` → 앱 `shared/*/ui` facade |

### `@core/service-container` 내부 구조

앱이 아니라 **core 패키지**가 소유한다.

| 경로 (패키지 내부) | 역할 |
|--------------------|------|
| `base/(BaseName)/` | `(BaseName)ServiceBase.ts` + `…Impl.ts` — HTTP/token 등 공통 Base |
| `binding/` | `Binding.ts` / `BindingImpl.ts`, `BaseBinding*` |
| `container/` | `ServiceContainer.ts` / `ServiceContainerImpl.ts` |
| `service-model.ts` | 공통 `CommonRes` 등 |
| `service-constants.ts` | `SERVICE_BASE_NAME`, `BINDING_SCOPE` (도메인 키는 **앱** `SERVICE_KEY` / `AppServiceMap`) |
| `service.type.ts` | 컨테이너 공통 타입 |

---

## REST Services (FSD `entities/<domain>/api`)

- **DIP:** 호출부는 구현체(`*Impl`)가 아니라 **Interface**에만 의존한다.
- Domain Service에 Base가 필요하면 **생성자 주입** + 싱글톤 (`service.setup`에서 bind).
- HTTP Base / Container / Binding 구현은 `@core/service-container`를 쓰고, 앱은 **도메인 서비스 + bind**만 가진다.

### 앱 쪽 배치

```
# 도메인 서비스 (FSD)
src/fsd/entities/<domain>/api/
  <Domain>Service.ts              # Interface
  <Domain>ServiceImpl.ts          # Class (Interface 구현, Base 주입)
  queries.ts                      # queryKey + queryFn (find*)
  mutations.ts                    # mutationKey + mutationFn (register*|edit*|remove*) — 없으면 생략
  use<Domain>Service.ts           # use*Query / use*Mutation 훅 모음
  index.ts

# API DTO · 도메인 모델 (FSD model 세그먼트)
src/fsd/entities/<domain>/model/
  … (Folder & File Name Pattern의 model/ 규칙)

# Composition root (앱 조립 — entities가 import 가능해야 하므로 shared)
src/fsd/shared/config/service/
  service-map.ts              # SERVICE_KEY + AppServiceMap (Interface만)
  service.setup.ts            # createTypedServiceContainer + Impl bind
  index.ts
```

- **wire → client:** API 응답(`model/server`)을 페이지·위젯에 그대로 쓰지 않는다. `mapper`로 client 타입으로 변환한 뒤 사용한다 (site GNB 패턴).

### REST Service Naming Rules

#### `<Domain>Service` / `<Domain>ServiceImpl`

- Method명: Service 관심사는 HTTP → `(HTTP Method)` + `(Api Url 마지막 path)`  
  - 예: `getSearchGNB`, `getGnb`, `getHomeSections`
- Arg명:
  - Get, Delete → `params` (예: `getSearchGNB(params: SearchGNBGetReq)`)
  - Post, Patch, Put → `data`
  - Head, Options → 없음

#### Request / Response Model (`model/`)

- API에 직접 쓰이는 Req/Res → **`interface`**
- 그 안에서만 쓰는 공통 형태 → **`type`**
- Request: `(LastPath)(HttpMethod)Req` → `SearchGNBGetReq`, `GnbGetReq`
- Response: `(LastPath)(HttpMethod)Res` → `SearchGNBGetRes`, `HomeSectionRes`
- wire(server)와 UI(client)가 다르면 `model/server`, `model/client` + `mapper`로 분리 (한 파일에 섞지 않음)

#### `queries.ts` / `mutations.ts`

HTTP 동사가 아니라 **하는 일** 기준으로 이름 붙인다.

| 행위 | prefix | 예 |
|------|--------|----|
| 등록 | `register` + LastPath | `registerProduct` |
| 조회 | `find` + LastPath | `findGnb`, `findHomeSections` |
| 수정 | `edit` + LastPath | `editProduct` |
| 삭제 | `remove` + LastPath | `removeProduct` |
| 기타 | 동작명 (+ LastPath, 명확하면 path 생략) | `login`, `fileUpload` |

#### `use<Domain>Service.ts`

- Query: `use(하는일)(LastPath)Query` → `useFindGnbQuery`, `useFindHomeSectionsQuery`
- Mutation: `use(하는일)(LastPath)Mutation` → `useRegisterProductMutation`

### GraphQL (Admin 등)

- 스키마/문서: `entities/<domain>/model/gql/` 또는 앱의 graphql 관례 경로
- codegen: `pnpm run gen:graphql` / `pnpm --filter @apps/admin-master-admin run gen:graphql:check`
- REST와 동일하게 **entities 슬라이스**에 두고, 공통 클라이언트 인프라는 core/shared config에 둔다.

---

## Internationalization(국제화)
- Dynamic routes 를 사용하여 페이지 언어 설정
- 각 언어별 문구는 json 으로 정리
- 정리된 json 을 가지고 type model 을 생성하여 type 추론
  ```bash
    # 저장소 루트 — portfolio i18n 일괄 생성
    pnpm run gen:i18n

    # 또는 portfolio 앱에서 개별 실행
    pnpm --filter @apps/user-portfolio run gen:i18n-types
    pnpm --filter @apps/user-portfolio run watch:i18n-types
    pnpm --filter @apps/user-portfolio run gen:i18n-namespaces
  ```
- Server Component 에서는 `getI18nTranslator()` 함수 사용
- Client Component 에서는 `useI18n(namespace)` 훅 사용  
  - 서버에서 dictionary를 preload 한 뒤 `I18nProvider`에 `dictionaries` prop으로 전달해야 한다

## API Server
- REST & GraphQL 혼합형 구조

### REST
- 비즈니스 중요도가 높은 민감한 데이터나 GraphQL 로 다루기 용이하지 않은 파일 관련 로직이나 외부 시스템을 연동하는 부분에는 안정성이 중요하기 때문에 안정적인 REST 사용

### GraphQL
- Client 가 자주 바뀌거나, 검색, 리스트, 필터링, 정렬 등 복잡한 조건이 붙거나, 비즈니스 중요도가 낮은 비정형/유동적인 응답 구조에는 Client 주도형 쿼리 구조가 유리하기 때문에 GraphQL 사용
- graphql-codegen 으로 type 과 hook 을 자동 생성
  ```bash
  pnpm run gen:graphql
  ```
- graphql 스키마 유효성 검사
  ```bash
  pnpm --filter @apps/admin-master-admin run gen:graphql:check
  ```

### MSW
- mockServiceWorker 생성
  ```bash
  npx msw init ./public --save
  ```

## Commit & Branch Pattern
### type
- feat(기능 개발)
- hotfix(버그 수정)
- docs(문서 관련 수정)
- style(코드 포맷팅 관련)
- refactor(리팩토링)
- chore(package.json, env 등)
- build(빌드 관련 설정 수정)
- deploy(Ci/Cd, Helm, Docker)
- revert(원복)
- test(테스트)


### Branch Name
- type/name/#issueNo
- ex: feat/john/#123

### Commit Message
- [type/name] subject
  <br/>
  <br/>
  markdown
- ex: [feat/john] 로그인 기능 구현
  <br/>
  <br/>
  로그인 기능 구현 상세


### Issues Description
ex:
## ☄️ 이슈 설명
1. 로그인 시 오류 발생
   - ... 자세한 설명 작성 ...


### PR Description
ex:
## ✨ 작업 개요
<br/>
1. 로그인 오류 발생 시 메시지 노출 문제 해결
<br/>
2. 인코딩 설정을 UTF-8로 변경하여 특수문자 깨짐 방지
<br/><br/>

## 🔧 변경 사항
<br/>
1. `LoginService`의 예외 메시지 처리 수정
<br/>
2. `.editorconfig`에 charset 명시
<br/>
3. `build.gradle`에서 `fileEncoding` 명시
<br/><br/>

## 🧪 테스트 방법
<br/>
1. 잘못된 아이디/비밀번호로 로그인 시도
<br/>
2. 에러 메시지가 정상 노출되는지 확인
<br/>
3. 브라우저에서 한글 파일명 다운로드 시 깨지지 않는지 확인
<br/><br/>

## 📎 관련 이슈
<br/>
Closes #123
<br/>
Fixes #98
<br/>
(이슈 merge 되는 순간 자동 close(이슈 닫기) + fixes(이슈 해결))

## Hydration 기준
- 완벽히 Server Component 라면 Hydration 없이 page 단에서 바로 fetch 함수로 호출하여 props 로 받아서 사용
- Client Component 인데 SSR 이 필요하다면 Hydration 하여 사용
- Client Component 인데 CSR 이라면 hook 을 사용

## 암호화
- openssl rand -base64 32


## 왜 yup이 아니라 zod를 선택했는가
- yup의 장점
  - 오랫동안 사용되어 왔기 때문에 생태계가 넓다.
  - 검증된 라이브러리이고, Formik 라이브러리와의 통합이 잘 되어있다.
  - addMethod를 통해 커스텀 검증 로직을 추가할 수 있다.
- yup의 단점
  - TypeScript에 대한 지원이 부족하다.
  - yup은 기본적으로 TypeScript 타입을 자동으로 추론하지 않으며, 별도의 타입 정의가 필요하다.
  - 복잡한 검증 로직이 많은 경우 런타임 성능이 떨어진다.
- zod의 장점
  - TypeScript에 대해 친화적이기 때문에 TypeScript와의 통합이 매우 뛰어나며, 스키마를 정의하면서 타입을 자동으로 생성해준다.
  - Type 안전성을 제공하여, 개발자가 컴파일 타임에 타입 에러를 잡을 수 있도록 해준다.
  - 경량형이어서 빠른 성능을 제공하고, 특히 복잡한 검증 로직에서도 yup보다 비교적 빠르게 동작한다.
  - 직관적이며, 코드가 간결하다.
  - 데이터 파싱과 검증을 동시에 처리할 수 있어 코드 중복을 줄일 수 있다.
  - 플러그인이나 확장 기능을 사용하지 않고도 기본 기능이 강력하여, 다양한 검증 요구사항을 쉽게 처리할 수 있다.
- zod의 단점
  - yup에 비해 생태계가 작다.
  - 새로운 라이브러리이기 때문에 성숙도가 yup에 비해 낮다.
- 내 상황에서는 어떤 라이브러리를 선택하는게 좋을까?
  - TypeScript를 사용하기 때문에 TypeScript에 친화적이고, Type 안정성을 제공하는 zod가 좋을 것 같다.
  - yup과 찰떡궁합인 Formik이 아닌 react-hook-form을 사용하기 때문에 굳이 yup을 고집할 필요는 없다.
  - 성능면에서는 zod가 더 우세하다.
  - 코드의 간결함도 zod가 더 우세하다.
  - 유연성면에서는 yup이 더 우세하다.
  - 생태계는 yup이 더 크기 때문에 예제를 찾기에는 yup이 더 좋다.
- 결론
  - zod 선택
  - 이유
    - 먼저 생태계의 크기 측면에서 보면 직접 사용하면서 방법을 찾아가는 것을 선호하기 때문에 크게 문제가 되지 않는다.
    - TypeScript에 친화적이고, 성능이 우수하며, 코드가 간결한 것을 더 선호한다.
    - 종합적으로 봤을 때 zod가 더 잘 맞을 것 같아서 선택



## ETC
parallel + interception routes를 새로 만들었는데 react-dom, router 에러가 터지면 .next 폴더를 삭제하고 다시 빌드하면 됨.


## 배포 파이프라인 (Vercel + GitHub Actions)

이 모노레포의 배포는 **Vercel Git 연동 없이**, GitHub Actions에서 **prebuilt** 방식으로 수행합니다.

- **빌드는 CI(GitHub Actions)** 에서 `vercel build`로 실행
- **Vercel** 은 `vercel deploy --prebuilt`로 받은 결과물만 호스팅 (원격 빌드 없음)

### 설계 원칙

| 항목 | 이 저장소의 선택 |
|------|------------------|
| Vercel ↔ GitHub 연동 | **사용하지 않음** (push 자동 배포 없음) |
| 배포 트리거 | GitHub Actions `workflow_dispatch` (수동 실행) |
| 빌드 위치 | **GitHub Actions** (`vercel build`) |
| 배포 방식 | **prebuilt** (`vercel deploy --prebuilt`) |
| Vercel 프로젝트 생성 | 로컬 `vercel link` (CLI, 1회) |
| 배포 인증 | GitHub Secrets (`VERCEL_TOKEN` 등) |
| Vercel Root Directory | **`apps/<앱 경로>`** — `setup-project.sh` API로 1회 설정 |
| Actions CLI 실행 위치 | **저장소 루트** (`vercel pull/build/deploy` — `working-directory` 없음) |
| 앱 : Vercel 프로젝트 | **1:1** (portfolio, master-admin 각각 별도 프로젝트) |
| 모노레포 Secret | 공통 2개 + **앱별** `VERCEL_PROJECT_ID_*` |

### 자동 / 수동 구분

| 단계 | 자동? | 비고 |
|------|-------|------|
| 모노레포 앱 코드 추가 | ❌ | 개발자 작업 |
| `vercel.json` / 워크플로 작성 | ❌ | 1회 설정 후 커밋 |
| Vercel 프로젝트 생성 + Root Directory | ❌ | 로컬 `setup-project.sh` (1회) |
| GitHub Secrets 등록 | ❌ | 대시보드 수동 |
| Vercel Git / 대시보드 Root Directory | ❌ | 스크립트 API가 Root Directory 설정 |
| Actions 워크플로 실행 | ❌ | Run workflow 버튼 |
| lint / typecheck | ✅ | quality job |
| `vercel pull` → `vercel build` → `vercel deploy --prebuilt` | ✅ | Secrets 등록 **후** |

### 전체 흐름

```
[1회 설정 — 개발자]
  1~3단계: 앱 코드 + vercel.json + 워크플로 yml 작성
        ↓
  4단계: git commit & push
        ↓
  5단계: setup-project.sh (vercel link + Root Directory API)
        ↓
  6단계: GitHub Secrets 등록 (공통 + 앱별)
        ↓
  7단계: (선택) Vercel 대시보드에서 Root Directory 확인

[배포할 때마다 — 8단계 Actions 수동 실행]
  GitHub Actions → Deploy Portfolio → Run workflow
        ↓
  quality: lint & typecheck
        ↓
  deploy (저장소 루트에서):
    vercel pull  → Vercel env/설정 동기화
    vercel build → CI에서 빌드 (vercel.json 사용)
    vercel deploy --prebuilt → 빌드 결과물만 Vercel에 업로드 (+ Git 커밋 메타)
        ↓
  배포 URL
```

### 사전 요구사항

- Node.js 22 (CI와 동일)
- pnpm 11 (`package.json`의 `packageManager` 필드 참고)
- Vercel 계정
- GitHub 저장소 Admin 권한 (Secrets, Actions, Environments 설정용)

---

## 1단계. 모노레포에 앱 추가

새 Next.js 앱을 `apps/` 아래에 추가합니다. portfolio는 이미 구성되어 있습니다.

### 1-1. 디렉터리 구조

```
apps/
  user/
    portfolio/     ← @apps/user-portfolio (port 3010) — 배포 파이프라인 있음
    commerce/      ← @apps/user-commerce  (port 3020) — 앱만 있음
    fashion/
    social/
  admin/
    master-admin/
    ...
core/
  libs/            ← @core/* 공유 라이브러리
  bc-ui/
```

`pnpm-workspace.yaml`이 `apps/**`를 포함하므로 새 폴더만 추가하면 workspace에 등록됩니다.

### 1-2. 앱 `package.json` 필수 스크립트

```json
{
  "name": "@apps/user-portfolio",
  "scripts": {
    "dev": "next dev -p 3010",
    "build": "next build",
    "start": "next start -p 3010",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "lint": "pnpm run typecheck && biome check ."
  },
  "dependencies": {
    "@core/bc-ui": "workspace:*"
  }
}
```

`@core/*` 패키지를 쓰면 `workspace:*`로 선언합니다.

### 1-3. 루트 `package.json` 스크립트 추가

```json
{
  "scripts": {
    "dev:portfolio": "turbo dev --filter=@apps/user-portfolio",
    "start:portfolio": "turbo start --filter=@apps/user-portfolio"
  }
}
```

### 1-4. 로컬 동작 확인

```bash
pnpm install
pnpm dev:portfolio
pnpm turbo run lint typecheck --filter=@apps/user-portfolio
```

---

## 2단계. 앱별 `vercel.json` 작성

경로: `apps/user/portfolio/vercel.json` (앱마다 1개)

Vercel **prebuilt 빌드** (`vercel build`) 시 사용하는 install/build 명령입니다.  
모노레포 prebuilt에서는 **Root Directory = 앱 폴더**이고, **CLI는 저장소 루트**에서 실행합니다. Root Directory는 **`setup-project.sh`가 Vercel API로 1회 설정**합니다.

### 2-1. portfolio 예시

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "buildCommand": "cd ../.. && pnpm turbo build --filter=@apps/user-portfolio"
}
```

### 2-2. master-admin 예시

경로: `apps/admin/master-admin/vercel.json` (깊이가 한 단계 더 깊음)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "cd ../../.. && pnpm install --frozen-lockfile",
  "buildCommand": "cd ../../.. && pnpm turbo build --filter=@apps/admin-master-admin"
}
```

### 2-3. 필드 설명

| 필드 | 실행 기준 | 설명 |
|------|-----------|------|
| `installCommand` | **앱 폴더** (`vercel.json` 위치) | `cd`로 모노레포 루트 이동 후 `pnpm install` |
| `buildCommand` | **앱 폴더** | `cd`로 모노레포 루트 이동 후 `turbo build --filter=...` |

`cd` 깊이 = 앱 폴더에서 모노레포 루트까지 올라가는 단계 수입니다.

| 앱 경로 | `cd` (install / build 공통) |
|---------|----------------------------|
| `apps/user/portfolio` | `cd ../..` |
| `apps/user/commerce` | `cd ../..` |
| `apps/admin/master-admin` | `cd ../../..` |

### 2-4. Root Directory와 CLI 실행 위치

| 항목 | `vercel.json` | Vercel 대시보드 | GitHub Actions |
|------|:-------------:|:---------------:|:--------------:|
| Root Directory | ❌ **설정 불가** | **`apps/user/portfolio` 등** | — |
| Install / Build Command | ✅ 여기서 정의 | 입력 안 해도 됨 | `vercel build`가 사용 |
| `vercel pull` / `vercel build` / `vercel deploy --prebuilt` | — | — | **저장소 루트** |

**prebuilt 모노레포 규칙 (Vercel 공식)**

- `vercel pull` / `vercel build` / `vercel deploy --prebuilt` 는 **저장소 루트**에서 실행
- Vercel 대시보드 **Root Directory**는 앱 폴더 (`apps/user/portfolio`)
- 앱 폴더를 `working-directory`로 **또** 지정하면 경로가 중복되어 실패

**왜 `cd`가 필요한가**

- Root Directory가 `apps/user/portfolio`이면, install/build 명령의 기준 경로는 **앱 폴더**입니다.
- `pnpm-lock.yaml`과 `@core/*`는 **모노레포 루트**에 있으므로 `cd`로 루트로 이동합니다.

**하지 말아야 할 조합**

```
❌ Root Directory = apps/user/portfolio
   + Actions working-directory = apps/user/portfolio
   → apps/user/portfolio/apps/user/portfolio 경로 중복

❌ Root Directory = 비움 (.)
   + Actions working-directory = apps/user/portfolio
   → prebuilt 실패, Vercel 원격 빌드 시 "No Next.js version detected"

✅ Root Directory = apps/user/portfolio
   + Actions vercel CLI = 저장소 루트 (working-directory 없음)
   + vercel.json install/build = cd ../.. && ...
```

**`vercel.json`에 넣지 않는 것**

- Root Directory — `setup-project.sh` API로 설정 (5단계). `vercel.json`에는 넣지 않음
- `ignoreCommand` — Vercel Git 연동 시에만 의미 있음. 이 저장소는 Git 연동 없음

> Environment Variables(`NEXT_PUBLIC_*` 등)는 보통 Vercel **대시보드**에 등록합니다. `vercel.json`의 `env`로도 가능하지만, 이 저장소는 대시보드 사용을 권장합니다.

---

## 3단계. GitHub Actions 워크플로 추가

| 앱 | 워크플로 |
|----|----------|
| portfolio | `.github/workflows/deploy-portfolio.yml` |
| master-admin | `.github/workflows/deploy-master-admin.yml` |

아래 설명은 portfolio 기준이며, master-admin은 `APP_DIR`·filter·Secret 이름만 다릅니다.

### 3-1. 트리거

```yaml
on:
  workflow_dispatch:
    inputs:
      target:       # preview | production
      ref:          # 배포할 branch / tag / SHA
      skip_checks:  # true면 lint/typecheck 생략
```

- **push 시 자동 배포 없음** — Actions 탭에서 수동 실행만 가능
- `concurrency`로 같은 target의 배포가 겹치면 대기

### 3-2. 환경 변수 (워크플로 상단)

```yaml
env:
  NODE_VERSION: "22"
  APP_DIR: apps/user/portfolio
  VERCEL_PROJECT_ID_SECRET: VERCEL_PROJECT_ID_USER_PORTFOLIO
```

### 3-3. Job 1 — `quality` (Lint & Typecheck)

```
checkout (inputs.ref)
  → pnpm install --frozen-lockfile
  → pnpm turbo run lint typecheck --filter=@apps/user-portfolio
```

`skip_checks: true`이면 이 job 전체가 스킵됩니다.

### 3-4. Job 2 — `deploy` (prebuilt)

```
checkout
  → Setup pnpm / Node.js
  → vercel CLI 설치
  → Validate Vercel secrets
  → vercel pull (저장소 루트, preview|production)
  → Verify pulled Vercel env (필수 키 존재·길이 검증 — 값은 로그에 출력하지 않음)
  → vercel build (저장소 루트 — vercel.json install/build 실행)
  → vercel deploy --prebuilt (저장소 루트 — Git 커밋 메타 포함)
  → Summary에 배포 URL 출력
```

**중요:** `vercel pull` / `vercel build` / `vercel deploy --prebuilt` 는 **저장소 루트**에서 실행합니다. Vercel 대시보드 Root Directory는 `apps/user/portfolio` 입니다.

`deploy` job에는 **별도 `pnpm install` 스텝이 없습니다.** `vercel build`가 `vercel.json`의 `installCommand`로 의존성 설치와 빌드를 처리합니다.

배포 제목에 커밋 메시지를 표시하려면 `vercel deploy`에 `--meta` (`githubDeployment=1`, `githubCommitMessage` 등)를 전달합니다. Git 연동 없이 CLI만 쓸 때는 이 메타가 없으면 Vercel이 랜덤 배포 ID를 제목으로 씁니다.

Vercel 대시보드 Root Directory는 **`apps/user/portfolio`** 입니다. Root Directory를 비우고 Actions에서 앱 폴더 `working-directory`를 쓰면 prebuilt가 깨지고 Vercel 원격 빌드가 시도됩니다.

```yaml
# deploy steps — 저장소 루트에서 실행 (working-directory 없음)

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID_USER_PORTFOLIO }}
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}

# 1) vercel pull --yes --environment=preview|production
# 2) vercel build [--prod]
# 3) vercel deploy --prebuilt --yes [--prod] -m githubDeployment=1 -m githubCommitMessage=...
```

### 3-5. GitHub Environments

`deploy` job에 `environment: ${{ inputs.target }}`가 설정되어 있습니다. **최초 배포 전** 아래 환경을 만들어 두세요.

- `preview` — 프리뷰 배포
- `production` — `--prod` 배포

설정: Repository → **Settings → Environments** → `preview`, `production` 생성

`production`에 **Required reviewers**를 걸면 승인 후 배포됩니다.

> 환경이 없으면 첫 실행 시 자동 생성되는 경우도 있으나, 승인 규칙을 쓰려면 미리 만드는 것이 안전합니다.

---

## 4단계. 커밋 & push

1~3단계(앱 코드, `vercel.json`, 워크플로 yml)를 **한 번에** 커밋한 뒤 push 합니다.  
GitHub Actions는 원격 저장소를 checkout 하므로, 배포(8단계) 전에 push가 되어 있어야 합니다.

```bash
git add apps/user/portfolio/
git add apps/user/portfolio/vercel.json
git add .github/workflows/deploy-portfolio.yml
# 루트 package.json 스크립트 변경이 있으면 함께
git commit -m "chore: add portfolio deploy pipeline"
git push
```

> `vercel link`(5단계)는 로컬에서만 동작하므로 push 전에 해도 되고, push 후에 해도 됩니다.  
> **Actions 배포(8단계)** 는 push + Secrets 등록이 끝난 뒤에 실행하세요.

---

## 5단계. Vercel 프로젝트 생성 (Bootstrap)

**Vercel 대시보드에서 GitHub Import를 하지 않습니다.** 로컬 스크립트가 `vercel link` + **Root Directory API 설정**까지 처리합니다.

### 5-1. 사전 준비

```bash
npm install -g vercel   # 최초 1회
vercel login            # 최초 1회
export VERCEL_TOKEN=... # https://vercel.com/account/tokens
```

`VERCEL_TOKEN`은 Root Directory API 호출과 GitHub Secret 등록에 동일하게 사용합니다.

### 5-2. 스크립트 실행

```bash
# 저장소 루트
./scripts/vercel/setup-project.sh user-portfolio apps/user/portfolio

# master-admin
./scripts/vercel/setup-project.sh admin-master-admin apps/admin/master-admin
```

스크립트가 수행하는 작업:

1. `apps/<app>`에서 `vercel link` (프로젝트 생성/연결)
2. `PATCH /v9/projects/{id}` — `rootDirectory: apps/<app>`, `framework: nextjs`
3. 등록할 GitHub Secret 이름·값 출력
4. Which project 는 create a new projects 선택
5. Project name 입력
6. Customize settings 는 기본적으로 N으로 응답

### 5-3. `vercel link` 프롬프트 응답

| 질문 | 답 |
|------|-----|
| Set up and deploy? | **N** (지금 배포하지 않음) |
| Which scope? | 본인 팀/계정 |
| Link to existing project? | **N** (새 프로젝트) |
| Project name | 예: `portfolio` |
| In which directory is your code located? | **`.`** (스크립트가 앱 폴더에서 실행됨) |

스크립트가 `apps/user/portfolio`로 이동한 뒤 `vercel link`를 실행합니다. Code directory는 **`.`** 입니다.

### 5-4. 생성 결과 확인

로컬 `apps/user/portfolio/.vercel/project.json`이 생성됩니다 (`.gitignore` 대상, **커밋하지 않음**).

```json
{
  "orgId": "team_xxxxxxxx",
  "projectId": "prj_xxxxxxxx"
}
```

스크립트가 터미널에 등록할 GitHub Secret 이름과 값을 출력합니다.

> **주의:** 앱마다 `vercel link`를 하면 `apps/<앱>/.vercel/`이 생깁니다.  
> portfolio link → Secret 등록 후, master-admin link → 해당 Secret 등록 순으로 진행하세요.

### 5-5. 수동으로 할 경우

```bash
vercel login
cd apps/user/portfolio
vercel link
cat .vercel/project.json   # orgId, projectId 확인
```

---

## 6단계. GitHub Secrets 등록

Repository → **Settings → Secrets and variables → Actions → New repository secret**

### 6-1. 공통 Secret (저장소당 1회)

앱이 여러 개여도 **팀/계정이 같으면 1번만** 등록합니다.

| Secret | 값 | 발급/확인 위치 |
|--------|-----|----------------|
| `VERCEL_TOKEN` | `xxx...` | [Vercel → Account → Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `team_xxx` | `vercel link` 후 `.vercel/project.json` → `orgId` |

### 6-2. 앱별 Secret (Vercel 프로젝트마다 1개)

모노레포에서는 앱마다 Vercel 프로젝트가 다르므로 **Project ID를 앱별로 분리**합니다.

**네이밍 규칙**

```
VERCEL_PROJECT_ID_ + package name에서 @apps/ 제거 후 - 를 _ 로, 대문자
```

| Package (`name`) | Secret 이름 |
|------------------|-------------|
| `@apps/user-portfolio` | `VERCEL_PROJECT_ID_USER_PORTFOLIO` |
| `@apps/user-commerce` | `VERCEL_PROJECT_ID_USER_COMMERCE` |
| `@apps/user-fashion` | `VERCEL_PROJECT_ID_USER_FASHION` |
| `@apps/user-social` | `VERCEL_PROJECT_ID_USER_SOCIAL` |
| `@apps/admin-master-admin` | `VERCEL_PROJECT_ID_ADMIN_MASTER_ADMIN` |
| `@apps/admin-commerce-admin` | `VERCEL_PROJECT_ID_ADMIN_COMMERCE_ADMIN` |
| `@apps/admin-fashion-admin` | `VERCEL_PROJECT_ID_ADMIN_FASHION_ADMIN` |
| `@apps/admin-social-admin` | `VERCEL_PROJECT_ID_ADMIN_SOCIAL_ADMIN` |

portfolio 예시:

```
VERCEL_PROJECT_ID_USER_PORTFOLIO = prj_xxxxxxxx   # .vercel/project.json 의 projectId
```

### 6-3. 워크플로에서의 참조

```yaml
VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID_USER_PORTFOLIO }}
```

> GitHub Actions는 `secrets[동적변수]` 문법을 **지원하지 않습니다.**  
> 앱마다 워크플로 파일에 secret 이름을 직접 적어야 합니다.

### 6-4. Secrets 등록 체크리스트 (portfolio)

```
□ VERCEL_TOKEN
□ VERCEL_ORG_ID
□ VERCEL_PROJECT_ID_USER_PORTFOLIO
```

3개가 모두 있어야 deploy job이 진행됩니다. 없으면 `Validate Vercel secrets` 단계에서 실패하고 안내 메시지가 출력됩니다.

---

## 7단계. Vercel 대시보드 설정

[Vercel Project Settings](https://vercel.com/docs/projects/overview)에서 확인합니다.

### 대시보드 vs `vercel.json` — 무엇을 어디에 넣나

| 설정 | `vercel.json` | Vercel 대시보드 | 비고 |
|------|:-------------:|:---------------:|------|
| Install Command | ✅ | 불필요 | `vercel build`가 `vercel.json` 사용 |
| Build Command | ✅ | 불필요 | `vercel build`가 `vercel.json` 사용 |
| **Root Directory** | ❌ | **`apps/user/portfolio`** | `setup-project.sh` API (5단계) |
| Include files outside root | ❌ | 선택 | prebuilt CI는 전체 repo checkout — **필수 아님** |
| Environment Variables | (선택) | ✅ | `vercel pull`로 CI 빌드에 주입 |
| Git 연동 | — | ❌ 연결 안 함 | 연결 시 push마다 Vercel 원격 빌드(이중 빌드) |

Install / Build는 **`vercel.json`에만** 두면 됩니다. 대시보드 Build & Development Settings는 비워 두거나 기본값이어도 `vercel.json`이 우선합니다.

### 7-1. General — Root Directory (확인만)

`setup-project.sh`가 API로 설정합니다. 대시보드에서 **확인만** 하면 됩니다.

| 항목 | 값 |
|------|-----|
| Root Directory | **`apps/user/portfolio`** (portfolio 프로젝트 기준) |
| Framework Preset | Next.js |

#### Root Directory를 앱 경로로 두는 이유

prebuilt 모노레포에서는 Vercel CLI를 **저장소 루트**에서 실행하고, Vercel 프로젝트의 Root Directory로 **어느 앱인지** 지정합니다. 이 값은 **bootstrap 스크립트가 API로 넣습니다.**

| | 잘못된 조합 | **올바른 조합** |
|--|------------|----------------|
| Vercel Root Directory | 비움 (`.`) | **`apps/user/portfolio`** |
| Actions vercel CLI | 앱 폴더 `working-directory` | **저장소 루트** |

> **prebuilt 배포에서 빌드는 1번만:** CI `vercel build` → `vercel deploy --prebuilt`. Vercel Git 연동을 켜 두면 push 시 Vercel이 **또** 빌드하므로 반드시 끕니다.

### 7-2. Git

| 항목 | 값 |
|------|-----|
| Connected Git Repository | **없음** (연결하지 않음) |

Git을 연결하면 push마다 Vercel이 자동 빌드합니다. 이 저장소는 Actions만 사용합니다.

### 7-3. Environment Variables

앱 env(`NEXT_PUBLIC_*`, `NEXTAUTH_*` 등)는 **Vercel 대시보드**에 등록합니다.  
GitHub Actions Secrets에는 **Vercel CLI 인증용 3개만** 넣고, 앱 env는 워크플로에서 직접 넘기지 않습니다.

| 저장 위치 | 등록하는 값 |
|-----------|-------------|
| **GitHub Secrets** | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID_*` |
| **Vercel 대시보드** | 앱 실행에 필요한 모든 env (`NEXT_PUBLIC_*`, `NEXTAUTH_*` 등) |

#### prebuilt에서 env가 쓰이는 시점

```
Vercel 대시보드 env
      ↓  vercel pull (CI)
.vercel/.env.production.local  (또는 .env.preview.local)
      ↓  vercel build (CI)
Next.js / proxy / Edge 번들에 NEXT_PUBLIC_* 등이 빌드 시점에 인라인
      ↓  vercel deploy --prebuilt
Vercel은 이미 만들어진 .vercel/output 만 호스팅
```

- **대시보드에서 env만 수정**하고 Vercel Deployments에서 **Redeploy**만 하면, prebuilt 번들은 **바뀌지 않습니다.**
- env 반영하려면 GitHub Actions에서 **`vercel pull` → `vercel build` → `vercel deploy` 전체**를 다시 실행하세요. (Re-run all jobs 가능 — 단, **Vercel env 수정 후**에 실행)

`vercel build` 로그의 `Build not running on Vercel. System environment variables will not be available.` 는 prebuilt에서 **항상 나올 수 있는 경고**입니다. Vercel 시스템 env(`VERCEL_URL` 등)가 CI에 없다는 뜻이며, 대시보드에 등록한 앱 env와는 별개입니다.

#### Sensitive 플래그 (prebuilt 필수)

Vercel **Sensitive** env는 생성 후 대시보드/CLI에서 **값을 다시 읽을 수 없습니다.**  
`vercel pull` 시 Sensitive 값은 실제 secret이 아니라 **`[SENSITIVE]`**(11자) placeholder로 내려옵니다.

CI `vercel build`가 이 placeholder를 그대로 번들에 넣으면, 쿠키 암복호화·API URL 등이 **로컬과 다르게 동작**합니다. (prebuilt 도입 이후 env 관련 이슈의 대표 원인)

| env 종류 | Vercel Sensitive | GitHub Secrets (앱 env) | 비고 |
|----------|------------------|-------------------------|------|
| **`NEXT_PUBLIC_*`** | **OFF** | 불필요 | CI `vercel pull`로 실제 값 필요. 번들에 인라인됨 |
| **proxy/Edge에서 쓰는 비밀** (예: `NEXT_PUBLIC_COOKIE_SECRET_KEY`) | **OFF** (또는 GitHub overlay) | overlay 시에만 | `NEXT_PUBLIC_` 없어도 Edge 번들에 들어가면 빌드 시 값 필요 |
| **런타임 전용 서버 비밀** (`PRIVATE_*` 등, Edge/빌드 미사용) | **ON** | 불필요 | Vercel 런타임 주입. CI pull 불필요 |

**운영 규칙 (권장):**

1. **`NEXT_PUBLIC_` 접두사가 붙은 변수** → Vercel에 등록, **Sensitive OFF**, Production / Preview scope 확인
2. **진짜 서버 전용 비밀** → Vercel만, **Sensitive ON** (GitHub에 중복 등록하지 않음)
3. env 변경 후 → Actions **Re-run** 또는 Run workflow (Vercel만 Redeploy ❌)

Sensitive를 유지하면서 prebuilt를 쓰려면, `vercel pull` 직후 GitHub Secrets로 `.vercel/.env.*.local`을 **overlay**하는 방식이 필요합니다. 이 저장소는 우선 **Vercel `NEXT_PUBLIC_*` Sensitive OFF** 로 운영하는 것을 권장합니다.

또는 Vercel 대시보드상의 env와 github env를 동일하게 맞추고 빌드시에 github쪽에 설정한 env를 넣고 빌드하는 방법도 있지만 양쪽 env를 양쪽에서 관리해야 하는 단점이 있습니다.

#### CI에서 env 검증

`deploy-portfolio` 워크플로의 **Verify pulled Vercel env** 스텝에서 pull 결과를 검사합니다.

- `.vercel/.env.{production|preview}.local` 파일 존재
- 필수 키 이름 존재 (`NEXT_PUBLIC_COOKIE_SECRET_KEY` 등)
- 값 **길이** 출력 (값 자체는 로그에 남기지 않음)
- `length=11` 이면 `[SENSITIVE]` placeholder 의심 → 해당 키 Sensitive OFF 후 재배포

로컬에서 동일하게 확인하려면:

```bash
# 저장소 루트
export VERCEL_ORG_ID=... VERCEL_PROJECT_ID=... VERCEL_TOKEN=...
vercel pull --yes --environment=production
grep '^NEXT_PUBLIC_COOKIE_SECRET_KEY=' .vercel/.env.production.local | cut -d= -f1
# 값 길이는 로컬에서만 직접 확인 (커밋 금지)
```

쿠키 암복호화 디버그: 저장소 루트에서 `pnpm crypto:debug encrypt|decrypt <key> <value>` (`pnpm crypto:debug --help`).

#### portfolio 앱 env 체크리스트 (예시)

| 변수 | Sensitive | 비고 |
|------|-----------|------|
| `NEXT_PUBLIC_COOKIE_SECRET_KEY` | OFF | proxy + Server Action 쿠키 |
| `NEXT_PUBLIC_API_SERVER_URL` | OFF | absolute URL (`https://...`) |
| `NEXT_PUBLIC_API_MOCKING` | OFF | production은 `disabled` 권장 |
| `NEXT_PUBLIC_CRYPTO_SECRET_KEY` | OFF | storage 등 |
| `NEXTAUTH_SECRET` | OFF (auth proxy 사용 시) | `auth-proxy-handler`에서 Edge 사용 |
| `NEXTAUTH_URL` | OFF | |
| `PRIVATE_COOKIE_SECRET_KEY` | ON | 사용처 연결 시에만 |

preview / production 환경별로 scope가 맞는지 배포 `target`과 함께 확인하세요.

### 7-4. Build & Development Settings

대시보드의 Install / Build Command는 **입력하지 않아도 됩니다.** 2단계 `vercel.json`이 `vercel build` 시 사용됩니다.
Install / Build Command 가 자동으로 입력되는 경우에는 Override 꺼도 됩니다.(끄고 vercel.json을 의존하는걸 권장)

**빌드 로그는 GitHub Actions** 의 `Build (prebuilt)` 스텝에서 확인합니다. Vercel Deployments에는 업로드·호스팅 로그만 남습니다.

Actions 빌드 로그에서 아래처럼 나오면 정상입니다.

```
Running "install" command: cd ../.. && pnpm install --frozen-lockfile
Running "build" command: cd ../.. && pnpm turbo build --filter=@apps/user-portfolio
```

---

## 8단계. 배포 실행

### 8-1. GitHub Actions에서 실행

1. GitHub → **Actions**
2. 왼쪽에서 **Deploy Portfolio (Vercel)** 선택
3. **Run workflow** 클릭
4. 입력값 설정 후 **Run workflow**

| 입력 | 설명 | 기본값 |
|------|------|--------|
| `target` | `preview` 또는 `production` | `preview` |
| `ref` | 배포할 브랜치 / 태그 / commit SHA | `master` |
| `skip_checks` | lint/typecheck 생략 (긴급 배포) | `false` |

### 8-2. 실행 결과

| target | 동작 | URL |
|--------|------|-----|
| `preview` | `vercel pull` → `vercel build` → `vercel deploy --prebuilt` | `*.vercel.app` 프리뷰 URL |
| `production` | 위와 동일 + 각 단계에 `--prod` | Production 도메인 |

성공 시 Actions **Summary** 탭에 배포 URL이 표시됩니다.

### 8-3. 로컬에서 prebuilt 배포 (선택)

CI 없이 직접 올려볼 때 (`vercel link` 완료 후):

```bash
# 저장소 루트 (대시보드 Root Directory = apps/user/portfolio)
vercel pull --yes --environment=preview
vercel build
vercel deploy --prebuilt --yes \
  -m githubDeployment=1 \
  -m githubCommitMessage="$(git log -1 --pretty=%s)"

# production
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --yes --prod \
  -m githubDeployment=1 \
  -m githubCommitMessage="$(git log -1 --pretty=%s)"
```

---

## 9단계. 새 앱에 배포 라인 추가하기

commerce 등 **두 번째 앱**부터는 portfolio 설정을 복제·수정합니다.

### 9-1. 체크리스트

| # | 작업 | 파일 / 위치 |
|---|------|-------------|
| 1 | 앱 코드 + `package.json` 스크립트 | `apps/user/commerce/` |
| 2 | `vercel.json` 작성 | `apps/user/commerce/vercel.json` |
| 3 | 워크플로 복제·수정 | `.github/workflows/deploy-commerce.yml` |
| 4 | Vercel 프로젝트 생성 | `./scripts/vercel/setup-project.sh user-commerce apps/user/commerce` |
| 5 | 앱별 Secret 등록 | `VERCEL_PROJECT_ID_USER_COMMERCE` |
| 6 | (자동) Root Directory API | `setup-project.sh` |
| 7 | Actions Run workflow | Deploy Commerce (Vercel) |

### 9-2. `vercel.json` 예시 (commerce)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "buildCommand": "cd ../.. && pnpm turbo build --filter=@apps/user-commerce"
}
```

워크플로에서 `APP_DIR`·filter·Secret만 앱에 맞게 수정합니다. `vercel pull/build/deploy`는 **저장소 루트**에서 실행합니다 (`working-directory` 사용 안 함).

### 9-3. 워크플로에서 바꿀 항목

`deploy-portfolio.yml`을 복제한 뒤 아래를 앱에 맞게 수정합니다.

```yaml
name: Deploy Commerce (Vercel)

concurrency:
  group: deploy-commerce-${{ inputs.target }}   # 앱별로 unique

env:
  APP_DIR: apps/user/commerce
  VERCEL_PROJECT_ID_SECRET: VERCEL_PROJECT_ID_USER_COMMERCE

# quality job
run: pnpm turbo run lint typecheck --filter=@apps/user-commerce

# deploy job — 저장소 루트에서 vercel CLI (working-directory 없음)
VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID_USER_COMMERCE }}
```

### 9-4. 공통 Secret 재사용

새 앱을 추가해도 `VERCEL_TOKEN`, `VERCEL_ORG_ID`는 **다시 등록할 필요 없습니다.**  
앱별로 `VERCEL_PROJECT_ID_<SLUG>`만 추가하면 됩니다.

---

## 관련 파일 목록

| 파일 | 역할 |
|------|------|
| `apps/user/portfolio/vercel.json` | CI `vercel build`용 install/build 명령 |
| `apps/admin/master-admin/vercel.json` | master-admin용 install/build 명령 |
| `.github/workflows/deploy-portfolio.yml` | portfolio lint + prebuilt deploy |
| `.github/workflows/deploy-master-admin.yml` | master-admin lint + prebuilt deploy |
| `scripts/vercel/setup-project.sh` | vercel link + Root Directory API + Secret 안내 |

---

## 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| `GitHub Secrets 미등록: VERCEL_PROJECT_ID_USER_PORTFOLIO` | Secret 미등록 또는 이름 오타 | 6단계 Secret 체크리스트 확인 |
| `apps/user/portfolio/apps/user/portfolio` does not exist | Root Directory + `working-directory` **둘 다** 앱 폴더 | Root Directory만 `apps/user/portfolio`, CLI는 **저장소 루트** |
| `No Next.js version detected` (Washington 원격 빌드) | prebuilt 실패 → Vercel이 소스 원격 빌드 시도 | Root Directory = `apps/user/portfolio`, CLI를 **루트**에서 실행 |
| Deployments 제목이 랜덤 ID | CLI 배포에 Git 메타 없음 | `vercel deploy --prebuilt`에 `-m githubDeployment=1` `-m githubCommitMessage=...` |
| Biome format errors (`␍`) | LF/CRLF 불일치 | `biome.json` `lineEnding: "lf"` + `.gitattributes` |
| `@core/*` 모듈 not found (CI) | `vercel.json` `cd` 깊이 오류 또는 install 실패 | Actions `Build (prebuilt)` 로그에서 install/build 확인 |
| `@core/*` 모듈 not found (Vercel Git 빌드) | 원격 빌드 시 루트 밖 파일 미포함 | Git 연동 끄고 prebuilt만 사용 (권장) |
| Git push마다 Vercel 자동 배포 | Vercel Git 연결됨 | Git Integration 제거 |
| 빌드가 두 번 도는 것 같음 | Actions `vercel build` + Vercel Git 원격 빌드 | Git 연동 제거, `vercel deploy --prebuilt`만 사용 |
| 로컬 lint 통과, CI만 실패 | 줄바꿈 또는 캐시 차이 | `pnpm biome check .` 로컬 실행 후 LF 정규화 |
| `vercel build` 실패 | install/build 또는 env 문제 | Actions → `Build (prebuilt)` 로그 확인, `vercel pull` env·`vercel.json` `cd` 깊이 확인 |
| 쿠키 복호화 실패 / theme·API만 Vercel에서 깨짐 | Sensitive env → `vercel pull`이 `[SENSITIVE]`(length=11) | `NEXT_PUBLIC_*` Sensitive **OFF** 후 Actions 재배포 (7-3절) |
| env 수정했는데 배포물이 안 바뀜 | Vercel Redeploy만 함 (prebuilt 번들 재사용) | Actions에서 `vercel pull` → `vercel build` → `vercel deploy` 전체 재실행 |
| `vercel deploy --prebuilt` 실패 | 빌드 산출물 없음 | 직전 `vercel build` 성공 여부 확인 |

---

## portfolio 첫 배포 최종 체크리스트

```
□ 1~3단계: 앱 동작 확인 (dev, lint, typecheck)
□ apps/user/portfolio/vercel.json 작성
□ .github/workflows/deploy-portfolio.yml 작성
□ 4단계: git commit & push
□ 5단계: VERCEL_TOKEN export 후 setup-project.sh 실행
□ 6단계: VERCEL_TOKEN / VERCEL_ORG_ID / VERCEL_PROJECT_ID_USER_PORTFOLIO 등록
□ 7단계: (선택) Vercel 대시보드 Root Directory = apps/user/portfolio 확인
□ 7-3절: Vercel Environment Variables 등록 (`NEXT_PUBLIC_*` Sensitive OFF)
□ GitHub Environments: preview, production 생성
□ 8단계: Actions → Deploy Portfolio → Run workflow (preview)
□ 배포 URL 접속 확인
□ production 배포 (필요 시 Environment 승인 규칙 설정 후)
```

---

## master-admin 첫 배포 체크리스트

portfolio와 동일한 흐름이며, 경로·Secret·워크플로만 다릅니다.

```
□ 1~3단계: vercel.json + deploy-master-admin.yml 작성 후 4단계 push
□ 5단계: VERCEL_TOKEN export 후 setup-project.sh admin-master-admin ...
□ 6단계: VERCEL_PROJECT_ID_ADMIN_MASTER_ADMIN 등록 (공통 Secret 2개는 재사용)
□ 7단계: (선택) Vercel 대시보드 Root Directory = apps/admin/master-admin 확인
□ 8단계: Actions → Deploy Master Admin (Vercel) → Run workflow (preview)
```

| portfolio | master-admin |
|-----------|--------------|
| `VERCEL_PROJECT_ID_USER_PORTFOLIO` | `VERCEL_PROJECT_ID_ADMIN_MASTER_ADMIN` |
| Root Directory | `apps/user/portfolio` | `apps/admin/master-admin` |
| vercel CLI 실행 | 저장소 루트 | 저장소 루트 |
| `vercel.json` cd `../..` | `vercel.json` cd `../../..` |
| Deploy Portfolio (Vercel) | Deploy Master Admin (Vercel) |

