This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
## Next Portfolio

## 현재 작업중입니다.
- 해당 포트폴리오를 다른 Organizations 으로 이동했습니다.
- 포트폴리오 프로젝트 코드를 확인하시려면 아래의 링크를 눌러주세요.
- <a href="https://github.com/SHIN96BC-Portfolio">포르폴리오 프로젝트 확인하기</a>

## 프로젝트 관리
- <a href="https://shin96bc.atlassian.net?continue=https%3A%2F%2Fshin96bc.atlassian.net%2Fwelcome%2Fsoftware&atlOrigin=eyJpIjoiMTI2MzE2ZDk0MTlhNDQ3MGE1ODViODMwNWZkNzIxZWEiLCJwIjoiaiJ9">Jira 확인하기</a>
  
- <a href="">Figma 확인하기(아직 추가전)</a>

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

### FSD 폴더 기본 구조
- app: FE 앱 초기화/Provider/라우터 등 전역 진입점
- pages: FE 페이지 라우팅 엔트리 (Next.js의 page 단위 화면)
- widgets: FE 페이지를 구성하는 큰 단위의 조각 (여러 feature/entities 묶음)
- features: 특정 FE 시나리오 단위
- entities: BE Domain 단위(“데이터 단위 컴포넌트”이기 때문에 FE 관점과 BE 관점이 섞이면 복잡해지기 때문에 BE Domain 기준으로 나눈다)
- shared: 범용(나눌 수 있는 최소한의 단위로 구분)

### 왜 FSD 패턴(Feature-Sliced Design)을 선택했는가
- FSD 패턴은 각 기능이나 도메인별로 관련된 파일들을 모아놓는 방식입니다.
- 보통 복잡한 기능이 많고 프로젝트 규모가 큰 어드민 프로젝트는 FSD 패턴을 사용하는 것이 여러가지로 유리하다고 생각했습니다.
- 또한 단일 책임 원칙을 준수하며 개발하기 용이합니다.
- 유지보수 측면: 기능단위로 폴더가 존재하기 때문에 각 기능들을 독립적으로 개발, 테스트, 유지보수하기가 쉽습니다.
  해당 코드가 어떤 기능과 관련이 있는지 쉽게 알 수 있어 가독성이 높아집니다.
- 확장성 측면: 새로운 기능이 추가 되더라도 기존 폴더 구조를 수정할 필요 없이 새로운 폴더를 추가하기만 하면 되기 때문에 확장에 좀 더 유연하게 대처할 수 있습니다.
- 협업 측면: 팀원들끼리 기능 단위로 작업을 나눠서 진행할 때 팀원들이 기능별로 독립적으로 작업할 수 있어 협업에 유리합니다.

## Internationalization(국제화)
- Dynamic routes 를 사용하여 페이지 언어 설정
- 각 언어별 문구는 json 으로 정리
- 정리된 json 을 가지고 type model 을 생성하여 type 추론
  ```bash
    # json 파일 기준으로 type 자동 생성
    npm run gen:i18n-types
  
    # 계속 json 파일을 주시하며 json 파일이 저장되면 그 순간 자동으로 type 생성
    npm run watch:i18n-types
  ``` 
- 정리된 json 파일명들을 기준으로 namespace 상수 자동 생성
  ```bash
    npm run gen:i18n-namespaces
  ```
- Server Component 에서는 getI18nTranslator() 함수 사용
- Client Component 에서는 

## API Server
- REST & GraphQL 혼합형 구조

### REST
- 비즈니스 중요도가 높은 민감한 데이터나 GraphQL 로 다루기 용이하지 않은 파일 관련 로직이나 외부 시스템을 연동하는 부분에는 안정성이 중요하기 때문에 안정적인 REST 사용

### GraphQL
- Client 가 자주 바뀌거나, 검색, 리스트, 필터링, 정렬 등 복잡한 조건이 붙거나, 비즈니스 중요도가 낮은 비정형/유동적인 응답 구조에는 Client 주도형 쿼리 구조가 유리하기 때문에 GraphQL 사용
- graphql-codegen 으로 type 과 hook 을 자동 생성
  ```bash
  npm run gen:graphql
  ```
- graphql 스키마 유효성 검사
  ```bash
  gen:graphql:check
  ```
  
### MSW
- mockServiceWorker 생성
  ```bash
  npx msw init ./public --save
  ```


## File Name Pattern
| 역할 / 타입               | 권장 명명 규칙             | 예시 파일명                                   | 비고                               |
| --------------------- | -------------------- |------------------------------------------| -------------------------------- |
| **React Component**   | `PascalCase`         | `LoginModal.tsx`, `UserCard.tsx`         | **무조건 PascalCase**. JSX/TSX 컴포넌트 |
| **Next.js 페이지**       | `lowercase`          | `page.tsx`, `layout.tsx`, `route.ts`     | Next 13+ app dir 기준              |
| **유틸 함수 / 헬퍼**        | `kebab-case`         | `format-date.ts`, `parse-url.ts`         | 일반 함수/로직 파일은 kebab-case          |
| **커스텀 훅**             | `camelCase` 시작       | `useAuth.ts`, `useScroll.ts`             | `use` prefix 유지, camelCase       |
| **타입/모델 정의**          | `kebab-case`         | `user-model.ts`, `auth.types.ts`         | 도메인 기준으로 prefix 붙임               |
| **enum 정의**           | `kebab-case + .enum` | `status.enum.ts`                         | enum만 따로 관리할 경우                  |
| **상수 파일 (도메인)**       | `kebab-case`         | `auth-constants.ts`, `user-constants.ts` | 도메인 기준 prefix                    |
| **상수 파일 (글로벌)**       | `constants.ts`       | `constants.ts`                           | 작은 프로젝트 or 전역 상수                 |
| **API 핸들러 (Next.js)** | `route.ts`           | `route.ts`                               | Next 13 app router 표준            |
| **설정 / 초기화**          | `dot.case`           | `jest.setup.ts`, `next.config.js`        | Node, Tool 설정계층 파일               |
| **스키마 (zod 등)**       | `kebab-case`         | `user-schema.ts`, `env.schema.ts`        | 주로 zod/yup 스키마에서 사용              |
| **DTO / Entity**      | `kebab-case`         | `user.dto.ts`, `product.entity.ts`       | 백엔드 스타일일 땐 suffix 구분             |


## REST Services Folder And File Rules
- *DIP 원칙을 지켜서 해당 Service 객체들을 사용하는 곳에서는 반드시 구현체가 아닌 인터페이스에만 의존할 것) (Domain Service에서 Base가 필요한 경우 생성자 주입 방식으로 주입하여 싱글톤으로 사용
- /services/base/(Base Name):
  - (Base Name)ServiceBase.ts: 서비스의 기본이 되는 HTTP 통신, token 관리 등의 메서드들을 가진 Interface 정의
  - (Base Name)ServiceBaseImpl.ts: Service Base Interface를 구현한 Class
- /services/binding:
  - Binding.ts: Container에 Bind할 때 사용하는 Class의 인터페이스 정의
  - BindingImpl.ts: Binding 인터페이스를 구현한 Class 정의
- /services/container:
  - ServiceContainer.ts: Service 객체들을 등록하고 관리하는 Container Class의 Interface 정의
  - ServiceContainerImpl.ts: ServiceContainer Interface를 구현한 Class 정의
- /services/domain/(Domain Name):
  - (Domain Name)Service.ts: 각 도메인 별 서비스의 Interface 정의
  - (Domain Name)ServiceImpl.ts: Service Interface를 구현한 Class 정의
  - model.ts: Api Request, Response Model 정의
  - queries.ts: useQuery 에 사용될 query Key, query function 정의
  - mutations.ts: useMutation 에 사용될 mutation key, mutation function 정의
  - use(Domain Name)Service.ts: Api Call Custom Hooks 정의
- /services/model.ts: 공통 Request, Response Model 정의
- /services/service-constants.ts: Service에서 공통으로 사용되는 상수 값들 정의
- /services/service.types.ts: Service에서 공통으로 사용되는 type 정의

## REST Service Naming Rules
- /service/domain/(Domain Name):
  - (Domain Name)Service.ts & (Domain Name)ServiceImpl.ts:
    - Method명:
      - Service의 관심사는 HTTP 통신이기 때문에 HTTP와 관련된 명칭으로 작성
      - (HTTP Method 유형) + (Api Url의 마지막 path) -> ex: getSearchGNB
    - Arg명:
      - Get, Delete: params -> ex: getSearchGNB(params: SearchGNBGetReq)
      - Post, Patch, Put: data -> ex: postSearchLocalTour(data: SearchLocalTourPostReq)
      - Head, Options -> 없음
  - model.ts:
    - Api 통신에 직접적으로 사용되는 Request, Response Model은 interface 로 정의
    - 그외 Request, Response 안에서 공통으로 쓰이는 것들은 등은 type 으로 정의
    - Request Model명: (Api Url의 마지막 path) + (HTTP Method 유형) + Req -> ex: SearchGNBGetReq
    - Response Model명: (Api Url의 마지막 path) + (HTTP Method 유형) + Res -> ex: SearchGNBGetRes
  - queries.ts & mutations.ts:
    - queries 와 mutations 의 관심사는 HTTP 통신이 아니고, 어떤 데이터를 등록하거나, 찾거나 하는 부분까지가 관심사이기 때문에 좀 더 직관적이고 해당 function이 하는일에 가까운 명칭으로 작성
    - 등록 서비스: register + (Api Url의 마지막 path)
    - 조회 서비스: find + (Api Url의 마지막 path)
    - 수정 서비스: edit + (Api Url의 마지막 path)
    - 삭제 서비스: remove + (Api Url의 마지막 path)
    - 그외 서비스: (해당 서비스가 하는 일에 대한 명칭) + (Api Url의 마지막 path) -> 다만 하는일에 대한 명칭만으로 어떤일을 하는지 명확하게 알 수 있는 경우 (Api Url의 마지막 path)는 생략 가능(ex: login, fileUpload 등)
  - use(Domain Name)Service.ts:
    - Hook 명칭은 직관적으로 어떤 API를 호출하는지와 Query이지 mutation인지를 구분할 수 있도록 함
    - useQuery를 사용하는 경우: use(하는 일)(Api Url의 마지막 path)Query.ts
      - ex: useFindTestQuery
    - useMutation를 사용하는 경우: use(하는 일)(Api Url의 마지막 path)Mutation.ts
      - ex: useRegisterTestMutation


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


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3010](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

