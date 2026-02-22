# 일반 지시사항

## 기술적 전제조건

### 구현

1. supabase를 postgres database로 사용할거임. 관련 skill을 사용할 것.
2. supabase를 auth로 사용할거임. 관련 skill을 사용할 것
3. orm은 drizzle을 사용할거임. 특히, https://orm.drizzle.team/docs/rls#using-with-supabase 를 참고할 것.
4. backend 로직은 effect.ts만을 사용할거임. 가능하다면 `@effect/sql-drizzle` 패키지를 사용함. https://effect-ts.github.io/effect/sql-drizzle/Pg.ts.html 을 참고할 것.
5. 모든 로그인은 아래 정의된 beaver-pass를 기본으로 하되, 이게 아직 구현이 안된 상황에서는 github과 discord를 기본으로 함
6. ddd 패턴을 적용한 bounded context를 sub package로 두고, 이 package들의 이름은 `ddd-` 를 앞에 붙이도록 함. 예를들어, billing관련 bounded context라면 `ddd-billing` 을 폴더 이름으로 정하게 되는 거임.
7. ddd와 함께 hexagonal architecture를 사용할거임.
8. frontend는 next.js를 사용할거임. 그리고 next.js app을 apps/ 밑에다 놓을거임.
9. frontend에서는 react최신, next.js 최신버전을 쓸거임.
10. unit test와 e2e 테스트 코드도 작성할거임.

### CI/CD

1. turborepo의 캐싱과 최적화 기능을 충분히 이용하되, remote cache는 사용하지 않을거야.
2. apps는 packages 내용의 '빌드된 내용'을 가져다 import할 수 있게 할거야.
3. next.js의 빌드캐시 등을 충분히 사용할거야.
4. 필요하다면 github action을 사용할수도 있지만. 사용해야할 때는 반드시 내 허가를 받아야해.
5. 배포는 github을 통해 vercel에 진행할거야.

## 프로젝트 관리

1. 내가 계획을 프롬프트에 집어넣게 되면, 그 계획에 따라 너가 알아서 semver에 따라 버저닝을 하도록 해. 그 버전을 <버전명> 이라고 한다면, 계획은 `history/v<버전명>/plan.md` 파일에 저장해.
2. plan.md 파일에 계획을 저장한 후, 이제 그 내용을 너가 수행할 텐데, 언제나 그 `history/v<버전명>` 폴더에 수행한 내용을 간략하게 요약해 적어. 내용이 많으면 파일은 여러 개가 만들어져도 상관없고, 그게 많아도 상관없어.
3. 만들어지는 md파일끼리는 필요하다면 link를 할 수도 있어.
4. 버전이 올라간다면, `history/CURRENT` 안의 md파일들 내용을 현재에 맞게 업데이트해.
5. 테스트 코드가 이런 md파일의 내용에 걸맞게 나왔으면 좋겠어. 나중에 너가 확인할때는, 실제로 코드를 분석하는게 아니라 단순히 테스트코드만 실행하게 할거야.

# app 종류

## `homepage`

1. beavercoding의 소개가 들어가있음.
2. beavercoding이란 이 모노레포를 관리하는 회사이름임
3. 기술적으로는 react native로 된 웹앱, node.js 기반 백엔드, react.js/next.js 프론트엔드를 전문으로 개발하는 회사임.
4. 비즈니스적으로는 그 밖에도 지식정보의 효율적인 저장과 사용, 수익화를 위한 아이디어를 구현하기 위해 노력함.
5. 이런 내용들을 일반적으로 소개하면서, email을 보낼 수 있는 창구도 필요함.
6. 여기에 더해 blog 기능을 넣을거임. 로그인기능이 있고, 글을 쓸수 있는건 나(=전체관리자) 와 내 권한을 위임받은 LLM Agent 혹은 서브관리자뿐임.
7. blog에는 내가 기술적으로 알게 된 내용들이 들어갈거임.
8. blog 내용은 admin에서 등록,수정,숨기기/보이기,삭제 등 컨트롤함
9. blog 이외의 static한 내용들도 admin에서 등록,수정 등이 가능하게 할거임. 간단한 Content management system이 있으면 좋을듯.

## `admin`

1. 이 레포지토리에서 관리하는 모든 것들이 여기 admin에서 관리될 수 있어야 함
2. 일반적인 admin인데, next.js로 만들거임

## `beaver-world`

1. 커뮤니티 사이트임
2. 일단 틀만 만들어놓고, 나중에 만들거임.

## `beaver-pass`

1. OAuth2.0 기반 인증모듈임
2. 'Sign in with Google'같은 3자로그인을 제공할거임. 'Sign in with Beaver' 가 될수도 있음.
3. Discord, Github, Google, Apple이 해당될 수 있음
4. 이것도 틀만 만들어놓고, 나중에 만들거임.

## `beaver-reporter`

1. 온갖 곳에서 나를 위한 데이터를 긁어모아 보여주는 서비스임
2. 사이트 전체 크롤링을 하려는건 아니고, 링크와 간략한 내용만 저장할거임
