# entities/site

GNB·포트폴리오 사이트 셸. REST · i18n · git 규칙은 루트 [README.md](../../../../../../../README.md)만 본다.

## 폴더 지도

- `api/`: `SiteService.ts`, `SiteServiceImpl.ts`, `queries.ts`, `useSiteService.ts`, `index.ts`
- `model/client/gnb.ts`
- `model/server/{gnb,portfolio,index}.ts`
- `model/mapper/map-server-gnb-to-client.ts` (+ `map-server-gnb-to-client.test.ts`)
- `model/mock/portfolio-navigation{,.en,.ko,.ja}.ts`
- `ui/{HomeBtn,LoginBtn,LogoutBtn}.tsx`, `ui/index.ts`

## Public API

- `api/index.ts`: `queryOptions`, type `SiteService`, `SiteServiceImpl`, `useFindGnbQuery`
- `ui/index.ts`: `HomeBtn`, `LoginBtn`, `LogoutBtn`

위 두 `index.ts` 로만 import 한다. deep import 는 하지 않는다.

## Mapper

`model/mapper/map-server-gnb-to-client.ts`. wire(`model/server`) → client(`model/client`) 변환 지점이다.

## 건드리면 안 되는 것

- 공개 export 이름
- 다른 entities 슬라이스 import (cross-slice 금지)
- features/widgets/pages/app import
- `model/server` 타입을 UI 에 직접 노출하는 것
- 서비스 바인딩은 `shared/config/service/` 쪽이고 이 슬라이스에서 하지 않는다.
