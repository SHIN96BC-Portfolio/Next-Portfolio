# entities/content

홈 섹션 콘텐츠. REST · i18n · git 규칙은 루트 [README.md](../../../../../../../README.md)만 본다.

`ui/` 폴더는 없다.

## 폴더 지도

- `api/`: `ContentService.ts`, `ContentServiceImpl.ts`, `queries.ts`, `useContentService.ts`, `index.ts`
- `model/client/home-section.ts`
- `model/server/home-section.ts`
- `model/constants/section-type.ts`
- `model/types/{content-mode,section-config}.ts`
- `model/types.ts` (배럴; `model/types/` 디렉터리와 공존한다)
- `model/mapper/map-server-home-section-to-client.ts` (+ `map-server-home-section-to-client.test.ts`)
- `model/mock/portfolio-home-sections{,.en,.ko,.ja}.ts`
- `model/mock/portfolio-career-sections{,.en,.ko,.ja,.factory}.ts`
- `model/mock/portfolio-career-projects.{en,ko,ja}.ts`
- `model/mock/portfolio-projects.{en,ko,ja}.ts`, `model/mock/portfolio-projects.mock.ts`
- `model/mock/portfolio-skills.mock.ts`
- `model/index.ts`

## Public API

- `api/index.ts`: type `ContentService`, `ContentServiceImpl`, `queryOptions`, `useFindHomeSectionsQuery`
- `model/index.ts`: `PAGE_KEY`/`PageKey` (shared re-export), `HomeSection`, `SECTION_TYPE`/`SectionType`, `mapServerHomeSectionToClient`, `HomeSectionGetReq`/`HomeSectionGetRes`, `ContentMode`, `section-config` 계열 타입 (`SectionConfig`, `HeroConfig`, `TimelineConfig` 등)
- `HomeSectionRes` 는 deprecated alias (`HomeSection`)

## Mapper

`model/mapper/map-server-home-section-to-client.ts`. export 이름 `mapServerHomeSectionToClient`. wire(`model/server`) → client(`model/client`) 변환 지점이다.

## 건드리면 안 되는 것

- 공개 export 이름
- 다른 entities 슬라이스 import 금지
- 라우팅 상수는 `shared/config/routing/page-key.ts` 소유다. content 에 새로 두지 않는다.
- `model/server` 를 페이지·위젯에 그대로 쓰지 않는다.
- mock 파일 수정은 이 이슈 밖이다.
