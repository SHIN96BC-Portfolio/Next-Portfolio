import { ResumeEmployer, ResumeProjectConfig } from '../types';

export const portfolioCareerEmployersEn: Record<string, ResumeEmployer> = {
  'YRISM Inc.': {
    period: '2024.08 – Present',
    detail: 'Web Development Team · System Operations Manager (internal title) · Frontend Developer',
  },
  'Pinetechsoft Inc.': {
    period: '2023.10 – 2024.05',
    detail: 'Development Team 1 · Research Engineer · Frontend Developer',
  },
  'ER Solution Inc.': {
    period: '2022.07 – 2023.09',
    detail: 'Development Team 1 · Research Engineer · Full Stack Developer',
  },
};

export const portfolioCareerProjectsEn: ResumeProjectConfig[] = [
  {
    projectId: 'travel-platform-nextgen',
    title: 'Company M — B2C/B2B Travel Platform Next-Gen Rebuild',
    company: 'YRISM Inc.',
    period: '2024.08 – Present',
    role: 'Frontend Development',
    links: [],
    scopeTags: ['FE team 3 → 5', 'Architecture co-designed with PL'],
    cases: [
      {
        title: 'Stabilizing the legacy service',
        asIs: 'At handover, core flows such as payment and back-navigation (routing) were unreliable enough to break',
        approach: 'Diagnosed and fixed broken core flows one by one while handling ongoing feature work in parallel',
        toBe: 'Resolved `400+ issues` · eliminated payment failures and abnormal routing, bringing the service to an operable state',
      },
      {
        title: 'Rebuilding core domains for next-gen',
        asIs: 'Had to fully rebuild the PC and mobile core domains while keeping the as-is B2C/B2B service running, with security requirements the as-is system never addressed',
        approach:
          'Redesigned flights (booking, lookup, and payment flows on the Topas integration), tour passes (Klook integration, discovery, option selection, and booking UX), hotels (migrated search, filters, detail, and booking), promotions, discount conditions, and coupons (a structure that handles complex discount rules reliably on the frontend), B2B booking and management screens, and authentication (login, session, permissions). Introduced a new encryption/decryption module. Ran as-is B2C PC/mobile operations and feature work throughout the transition',
        toBe: 'Core B2C·B2B PC/mobile domains moved to next-gen · as-is service kept stable throughout the transition',
      },
      {
        title: 'Designing the multi-tenant operating model',
        asIs: 'A limited team ran the B2C site, ~150 BP sites (same functional base, differing only in products and some customization), and ~150 fully custom ONBP sites (screens and features dictated per agency, still growing), all on both PC and mobile. The app is a WebView wrapper — screens and behavior are frontend scope, but an external vendor owns the app shell, so every incident began with working out whether the cause sat in the WebView or the shell',
        approach:
          'BP — a one-source multi-site setup that loads site metadata per domain at init and injects site context into API request headers. ONBP — a Turborepo monorepo that isolates custom and shared areas through shared-component extraction plus per-site build pipelines, with per-domain configs for custom elements and a yarn→pnpm migration',
        toBe: '`300+` sites run from a single codebase · site growth no longer drives codebase or operating-cost growth',
      },
      {
        title: 'Restructuring the code — consolidation, FSD, FE Model',
        asIs: 'Heavy props drilling and components duplicated across pages meant one fix touched many files and debugging dragged on. Filter, booking, alert, and popup logic was scattered; strings were hard-coded; the frontend was tightly coupled to backend API specs',
        approach:
          'Introduced FSD. Consolidated duplicated components gradually alongside the rebuild, extracted scattered logic into shared modules, and replaced hard-coded strings with constants. Removed direct dependency on backend API models with an FE Model layer and Mapper pattern',
        toBe: 'Same change `4 files → 1 file` · backend spec changes isolated per domain · fewer points for side effects and human error',
      },
      {
        title: 'Replacing the UI system',
        asIs: 'antd, forced into the codebase, caused global style conflicts, broken UI, and janky CSS animations. react-print delayed the print view by tens of seconds on large pages; react-date was riddled with bugs',
        approach:
          'Phased out antd and built a dedicated UI library (Core UI), with a playground for component-level validation. Implemented iframe-based printing in-house and replaced react-date with react-day-picker',
        toBe: 'Consistent design with style side effects removed at the root · print delay (tens of seconds) eliminated · stable date-picking UX',
      },
      {
        title: 'Zero-downtime Next.js 12→15 and state-management migration',
        asIs: 'Built on Next.js 12 with RTK Query and Redux; a large live service that could not be migrated in one go',
        approach:
          'Migrated incrementally by domain and page (including App Router and React 19). Moved RTK Query→TanStack Query and Redux→Zustand while running both side by side. During the upgrade, found that a leftover Babel config was disabling the SWC compile path and removed it',
        toBe: 'Major upgrade and state-management migration completed without downtime · faster builds and dev server startup after removing Babel',
      },
      {
        title: 'Redesigning the deployment pipeline and build',
        asIs: 'A single 8-pipeline B2C setup with 30+ minute build-to-deploy. Config that only added build time, misconfigured caches, redundant check steps and duplicate `yarn install` runs. Builds ran inside Docker (Yarn workspaces)',
        approach:
          '*(Hands-on)* Split into 20+ pipelines across B2C·BP·ONBP × 4 environments with an orchestrator pipeline and selective deploys, plus a new standby pipeline. Separated Turbo prune + host-side pnpm/turbo builds from Docker packaging, added a buildx registry cache, and fixed Turborepo and Next build caches. Authored and advanced Helm charts (topologySpreadConstraints, readinessProbe, CPU/memory HPA) with deployment verification via `kubectl rollout status`. *(With the infrastructure team)* Azure AKS → Azure Local ARC migration, active/standby failover for disaster recovery, Akamai CDN, infrastructure security, Pod operations and monitoring, server log analysis',
        decision:
          'Judged that the build-phase release train and integration-branch model no longer fit the frequent hotfixes and emergency deploys after launch, and proposed and applied a more flexible manual deployment strategy',
        toBe: 'Build-to-deploy `30+ min → 12–15 min` (~50–60% faster) · pipelines `8 → 20+` with per-service, per-environment deploys',
      },
      {
        title: 'Page load optimization',
        asIs: 'Redundant API calls and duplicate loading, and useEffect hooks re-running unnecessarily',
        approach:
          'Combined SSG and SSR to fit each page, added TanStack Query caching, and cleaned up unnecessary useEffect calls',
        toBe: 'Slowest pages now load in `about one-third` of the time (Lighthouse mobile)',
      },
      {
        title: 'Testing and quality system',
        asIs: 'Component consolidation and a major version upgrade were running in parallel with no way to tell which sites a change would affect. QA relied on people logging in and checking by hand, with no dedicated test-automation staff',
        approach:
          'Vitest 3 multi-project setup (the domain package and B2C/ONBP shared packages) with React Testing Library covering the HTTP client, encryption/decryption, payment and booking utilities, and custom hooks, runnable per package. Playwright E2E runs remotely against production (legacy API) and the dev environment (FE Server/BFF), split by sheet and domain (B2C·BP·ONBP PC/MO) — real SSO and BFF probes verify actual paths, with a purpose-built Testbed UI for execution and reporting. Husky pre-commit (Biome + Vitest on changed files) and pre-push (build, typecheck, full test run). Zod/TypeBox generated from the OpenAPI spec',
        toBe: 'Regressions from consolidation and upgrades caught at commit and push · frontend impact of backend spec changes surfaced at compile time',
      },
      {
        title: 'Context and harness engineering for AI agents',
        asIs: 'As the monorepo grew, AI agents repeatedly produced code that crossed layer boundaries or ignored conventions — caught only by people in review',
        approach:
          '*(Context)* Made a root AGENTS.md the single source and aligned the Cursor, Claude, Gemini, and Codex entry points to it so tool-specific rule docs never diverge. Per-package AGENTS.md files inject the roles of the API contract, browser adapter, and HTTP core layers plus the B2C↔ONBP cross-import ban, scoped to the working path. Kept human-facing guides separate from Cursor Skills and path-scoped Rules — #region, Named Export, Biome, and event rules are injected only when editing TS/TSX, and bulk legacy refactors are out of scope. *(Verification harness)* Agent output must pass the same Husky quality gates as human code (Biome and Vitest on changed files; build, typecheck, and full tests) before it lands. Playwright scenario metadata auto-generates a registry for CLI and Testbed UI runs, and failure causes, fix options, and re-verification steps are written up for follow-up agent work',
        toBe: 'Architecture violations and regressions blocked at two points — generation (context) and commit/push (verification harness) · new members work inside the boundaries before they know the structure',
      },
      {
        title: 'Establishing team working standards',
        asIs: 'No documentation or onboarding, so new members were slow to understand the project',
        approach:
          'Defined and documented FSD architecture, the FE Model + Mapper pattern, component consolidation criteria, and branch/deployment rules together with the PL, and introduced a documentation automation tool. Stood in for the PL on scheduling, issue distribution, and technical decisions when absent',
        toBe: 'Architecture and working standards established as shared team documentation · a clear path to learn the project structure and deployment rules',
      },
    ],
    techStack: [
      'Next.js 12→15',
      'TypeScript',
      'Turborepo',
      'pnpm',
      'FSD',
      'TanStack Query',
      'Zustand',
      'Redux',
      'RTK Query',
      'axios',
      'Tailwind CSS',
      'Vitest',
      'React Testing Library',
      'Playwright',
      'Biome',
      'Husky',
      'Zod',
      'Azure DevOps',
      'ACR',
      'Helm',
      'Kubernetes',
      'Docker',
    ],
  },
  {
    projectId: 'visa-center',
    title: 'Company V — Overseas Visa Center Web Service',
    company: 'YRISM Inc.',
    period: '2025.02 – 2025.03',
    role: 'Frontend Development',
    links: [],
    scopeTags: ['Solo FE'],
    overview:
      'Built a new visa application and information web service for a visa center in Qingdao, China. Screens and API integration on Next.js 15 App Router with Zustand and TanStack Query, responsive UI with Tailwind CSS 4, Korean-language pages, deployed on Azure',
    techStack: ['Next.js 15', 'TypeScript', 'Zustand', 'TanStack Query', 'axios', 'Tailwind CSS 4', 'Azure'],
  },
  {
    projectId: 'commerce-backoffice',
    title: 'Philippine Commerce & Delivery Platform Back Office (in-house service)',
    company: 'Pinetechsoft Inc.',
    period: '2024.02 – 2024.05',
    role: 'Frontend Development',
    links: [],
    scopeTags: ['Mall Admin solo'],
    cases: [
      {
        title: 'Building the Mall back office',
        asIs: 'Adding product sales (Mall) to the platform required a new management back office',
        approach:
          'Owned structure design, shared components, and REST API integration alone. Firebase Authentication admin login, product CRUD, automatic option generation (comma input), search and detail, category drag & drop and reordering, infinite-scroll product selection per event, delivery fees, reviews (replies, hiding), order search and processing, and i18n',
        toBe: 'Mall back office delivered solo',
      },
      {
        title: 'Extending delivery-fee policies (Food·Store)',
        asIs: 'The live Food and Store back offices needed delivery-fee policies (base and distance-based, owner/customer cost split)',
        approach:
          'Base and distance-based fee settings with API integration, UI for combined owner/customer/partial-owner cost policies, react-hook-form + Zod validation, integration with the existing JWT-decoding and encrypted auth flow, and Store-specific requirements kept separate from Food. Fixed bugs and filled gaps in Food Admin alongside',
        toBe: 'Service-specific delivery-fee policies live in the Food and Store back offices',
      },
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Zustand',
      'Jotai',
      'TanStack Query',
      'MUI',
      'react-hook-form',
      'Zod',
      'Firebase',
      'AWS Amplify',
    ],
  },
  {
    projectId: 'vet-reservation',
    title: 'Philippine Veterinary Booking Platform (in-house service)',
    company: 'Pinetechsoft Inc.',
    period: '2023.10 – 2024.02',
    role: 'Frontend Development',
    links: [],
    scopeTags: ['Solo', 'Admin · Booking Web App · Landing site'],
    cases: [
      {
        title: 'Moving offline bookings online',
        asIs: 'Veterinary bookings were handled mostly offline',
        approach:
          'Booking web app — create, view, and cancel bookings, manage up to 10 pets, FCM push on Web/iOS/Android. Clinic admin — unavailable-date calendar, user push on booking confirmation or cancellation, user lookup and search, sign-up and withdrawal dashboard',
        toBe: 'Booking web app and clinic admin built solo, moving bookings online',
      },
      {
        title: 'Overhauling the login system',
        asIs: 'Requirements changed to unify email and social accounts, forcing a major rework of the login process with many side effects',
        approach:
          'Led a full overhaul of the login system from the frontend using Firebase — Firebase Email + Google/Facebook/Apple/Kakao unified login (NextAuth)',
        toBe: 'Moved to a unified email and social login system',
      },
      {
        title: 'Preventing misdirected push notifications',
        asIs: 'The existing FCM token handling could send push notifications to the wrong user',
        approach: 'Restructured FCM tokens to be managed per device',
        toBe: 'Push notifications no longer reach the wrong user',
      },
      {
        title: 'Landing-site slider bug',
        asIs: 'Swiper showed images incorrectly when the viewport was resized',
        approach:
          'Removed the library and implemented fade in/out transitions directly. Responsive mobile and tablet layout, clinic location on Google Maps, notice list and detail pages',
        toBe: 'Slider bug resolved · mobile-first landing site delivered',
      },
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Jotai',
      'MUI',
      'Firebase',
      'NextAuth',
      'react-hook-form',
      'Yup',
      'AWS Amplify',
      'Vercel',
    ],
  },
  {
    projectId: 'patrol-app',
    title: 'Dog Patrol Activity iOS App',
    company: 'ER Solution Inc.',
    period: '2023.08',
    role: 'iOS Development',
    links: [],
    scopeTags: ['Solo'],
    overview:
      'Added real-time patrol (walk) tracking to an existing pet-care web app and moved it to a native iOS app. Real-time route, time, and distance on Naver Maps, map markers for photo locations, and a map capture saved as a patrol log at the end',
    cases: [
      {
        title: 'Resuming a patrol after a force quit',
        asIs: 'A new requirement: patrols must continue even after the app is force-quit. Elapsed time was calculated stopwatch-style',
        approach: 'Restructured the project and changed elapsed time to (current time − start time + accumulated time)',
        toBe: 'Patrols resume after the app is force-quit',
      },
    ],
    techStack: ['Swift', 'SwiftUI', 'Realm DB'],
  },
  {
    projectId: 'emission-dashboard',
    title: 'Air Pollution Emissions Query & Visualization System',
    company: 'ER Solution Inc.',
    period: '2023.06 – 2023.07',
    role: 'Full Stack Development',
    links: [],
    scopeTags: ['FE·BE·DB solo'],
    overview:
      'A service for querying and visualizing fine-dust emissions by road, region, and time. Recharts statistics and v-world-map maps, querying and filtering, Excel upload, Nest.js REST API with a MariaDB schema and Swagger, deployed on AWS EC2 with Docker, Nginx, and PM2',
    cases: [
      {
        title: 'Large-table query performance',
        asIs: 'Queries on a 140M+ row table took 4–6 minutes',
        approach: 'Removed the bottleneck structurally with index optimization and statistics-table design',
        toBe: 'Queries `4–6 min → under 5 sec` (under 10 sec for complex joins, `~50×+`)',
      },
      {
        title: 'Chart re-rendering issue',
        asIs: 'Recharts replayed its animations on every re-render',
        approach: 'Blocked unnecessary re-renders with useMemo and React.memo',
        toBe: 'Re-render animation issue resolved',
      },
    ],
    techStack: [
      'React(Vite)',
      'Nest.js',
      'TypeScript',
      'MariaDB',
      'TanStack Query',
      'Recoil',
      'Docker',
      'AWS EC2',
      'Nginx',
    ],
  },
  {
    projectId: 'kiosk-app',
    title: 'Company E — Ready-Mix Concrete Intake Kiosk App',
    company: 'ER Solution Inc.',
    period: '2023.05 – 2023.06',
    role: 'Frontend Development',
    links: [],
    scopeTags: ['Solo'],
    overview:
      'A new Android kiosk app: ready-mix truck drivers photograph their delivery slip at the kiosk and receive intake guidance. External USB camera integration and slip upload, intake guidance screen, automatic return to the home screen after inactivity, and auto-login',
    cases: [
      {
        title: 'Kiosk rendering performance',
        asIs: 'Performance degraded due to React re-renders',
        approach: 'Optimized rendering with useCallback and React.memo',
        toBe: 'Re-render performance issues resolved',
      },
    ],
    techStack: ['React Native', 'TypeScript', 'Redux', 'TanStack Query'],
  },
  {
    projectId: 'eco-driving-cms',
    title: 'City J — Bus Eco-Driving Management CMS',
    company: 'ER Solution Inc.',
    period: '2023.03 – 2023.04',
    role: 'Full Stack Development',
    links: [],
    scopeTags: ['FE·BE·DB solo'],
    cases: [
      {
        title: 'Building the eco-driving metrics system',
        asIs: 'Bus operators’ administrators needed a CMS to review eco-driving metrics such as rapid acceleration and braking from bus operating data',
        approach:
          'Chart.js visualization of rapid acceleration, braking, lane changes, and turns; role-based access for administrators and operators with per-operator data access control; multi-select for buses and routes. Java Spring + eGovFrame REST API, MariaDB design, deployed on AWS EC2/RDS',
        toBe: 'Frontend, backend, DB, and deployment delivered solo',
      },
    ],
    techStack: ['JSP', 'jQuery', 'Java', 'Spring', 'eGovFrame', 'MariaDB', 'Docker', 'AWS EC2/RDS'],
  },
  {
    projectId: 'distribution-platform',
    title: 'Company D — B2B·B2C Distribution SCM & Mobile Commerce',
    company: 'ER Solution Inc.',
    period: '2022.10 – 2023.06',
    role: 'Frontend Development',
    links: [],
    scopeTags: ['FE lead', 'SCM 100% · Commerce 60%'],
    overview:
      'A B2B·B2C distribution platform where sellers source products listed by suppliers and sell them on the platform’s own mobile commerce app and open marketplaces (Smart Store, Gmarket, Auction). Built the frontend of the SCM admin for suppliers, sellers, and administrators and of the seller-participation mobile commerce web app. Adopted Atomic Design and Git Flow',
    cases: [
      {
        title: 'Building a role-based distribution SCM admin',
        asIs: 'Suppliers, sellers, and administrators needed a B2B distribution admin to handle products, inventory, orders, and settlement with different permissions and perspectives',
        approach:
          'Designed the screen structure with Coupang’s seller admin as a reference. Suppliers — product listing and inventory, designated sales that supply only specific sellers, and short-term deals with a set discount and seller (sellers apply → supplier chooses). Sellers — source from a supply marketplace showing proposed price, max/min price, ratings, and buyer age breakdown. Shared — dashboards for orders/shipping, claims/settlement, members, and products; statistics by revenue, payment method, product, and seller with Excel export; expected and paid settlement lookup. Administrators — force-ending and releasing listed products',
        toBe: 'The supply → sourcing → sales → settlement flow implemented as role-based admin screens',
      },
      {
        title: 'Seller-participation mobile commerce web app',
        asIs: 'A mobile-only commerce service where ordinary users join as sellers, promote sourced products, and earn commissions and rewards — delivered as a web app wrapped in a native WebView rather than a native app',
        approach:
          'Published the full UI mobile-first for the WebView wrapper — individual vs. business seller sign-up, a live-broadcast tab (chat, coupons, closing-soon timer UI), solo and group-buy deals with share-link buyer recruiting and reward rankings, sales, video-review, and deal rankings, cart and checkout, cash top-up and withdrawal requests, and seller and buyer my pages. Product detail registration with Editor.js and infinite-scroll product lists with Intersection Observer + React Query',
        toBe: 'A commerce flow of seller onboarding → live selling → group-buy deals → ranking rewards delivered as mobile web app screens',
      },
      {
        title: 'Reducing nested popups',
        asIs: 'The plan called for 4–5 nested popups',
        approach: 'Proposed cutting popups to 1–2 and moving detail views to page transitions',
        toBe: 'Nested popups `4–5 → 1–2`',
      },
      {
        title: 'Organizing requirements through meeting notes',
        asIs: 'Changes agreed in meetings were not reflected in the planning documents, so every meeting started by re-confirming earlier decisions',
        approach:
          'Summarized and shared meeting notes with designers and planners, and had the dev team organize requirements for unfinished plans, joining from the planning stage',
        toBe: 'Less time spent revisiting past discussions · gaps in the plan filled by the dev team',
      },
    ],
    techStack: ['React(CRA)', 'JavaScript', 'Redux Toolkit', 'React Query', 'React Router', 'Nginx'],
  },
  {
    projectId: 'public-site-maintenance',
    title: 'Public Corporation I — Official Website Maintenance',
    company: 'ER Solution Inc.',
    period: '2022.09 – 2023.09',
    role: 'Maintenance',
    links: [],
    scopeTags: ['Maintenance owner', 'Throughout tenure'],
    cases: [
      {
        title: 'Web accessibility certification and security review',
        asIs: 'The public-sector site had to pass a web accessibility (WA) certification audit and a penetration test',
        approach:
          'Met web accessibility standards, patched and hardened vulnerabilities found in the penetration test, and mapped and improved legacy JSP/Spring pages. Handled feature changes and incident response alongside',
        toBe: '`WA certification passed` · security vulnerabilities resolved',
      },
    ],
    techStack: ['JSP', 'jQuery', 'Java', 'Spring', 'eGovFrame', 'Oracle'],
  },
  {
    projectId: 'cms-site',
    title: 'Company S — User Site & Admin CMS',
    company: 'ER Solution Inc.',
    period: '2022.07 – 2022.09',
    role: 'Full Stack Development',
    links: [],
    scopeTags: ['Full stack'],
    overview:
      'Built a new user site (JSP) and admin CMS (React). DB and project structure design, a Q&A board (MVC), DB-driven management of the user site menu from the CMS, Container-Presenter pattern with per-menu permissions, Spring Boot REST API with MySQL, deployed on AWS EC2/RDS',
    techStack: ['React', 'Redux', 'Material UI', 'JSP', 'jQuery', 'Java', 'Spring Boot', 'MySQL', 'AWS'],
  },
];
