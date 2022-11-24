# ✨PLANEAT - 식단 기록 및 영양 분석 서비스

<img src="https://user-images.githubusercontent.com/55011885/203729608-64da75d1-ce4a-4197-8562-ea8a389bb6ff.png">

## 👉 [PLANEAT 체험해보기](https://j7a701.p.ssafy.io/)

## 📹 시연 및 소개 영상 보기 : [UCC 링크](https://user-images.githubusercontent.com/55011885/203731886-83ca76b2-8973-47b7-9895-2b8433ad2d00.mp4)

<br/>

## 📆 프로젝트 진행 기간

- 2022.08.22 ~ 2022.10.07
- SSAFY 7기 2학기 특화프로젝트

---

## 📖 PLANEAT - 기획 배경

- **여러분 건강 관리 어떻게 하고 계신가요? 영양제 섭취에 대한 고민이 있으신가요?**
- 혹시 영양제를 구매할 때 어떤 기준으로 선택해야 할지 고민하셨던 경험이 있으신가요?
  건강을 위해 열심히 영양제를 고르고, 복용했지만 부작용을 경험했던 적은 없으신가요?

- Pillyze에 실시한 설문조사에 따르면, 영양제에 대한 관심이 증가하는 만큼 영양제 섭취 후 부작용 경험 역시 증가하고 있습니다.
  따라서 저희는 영양제를 선택할 때, 자신에게 잘 맞고 꼭 필요한 영양제를 추천해주는 서비스가 필요하다고 생각했습니다.
<br/>

## 🔎 PLANEAT - 개요

- ### **쉽고 간편하게, PLAN & EAT!**
  - PLANEAT은 식단 기록을 통한 부족한 영양분 분석 및 피드백 서비스 & 건강 고민에 적합한 영양제 추천 서비스 입니다.  
    PLANEAT은 **식습관 개선 / 건강 관리**에 관심 있는 사람들을 위한 식사 기록 분석 & 영양제 추천 웹 서비스입니다.
    <br/>

<br/>

---

## 💡 주요 기능

- ### 사용자 별 맞춤 권장 섭취량
  - 사용자의 나이, 성별, 키, 체중, 활동량을 통해 개개인 맞춤 권장 섭취 칼로리 및 적정 탄수화물, 단백질, 지방 섭취량을 계산해 제공합니다.
  - 사용자의 나이, 성별을 통해 영양소 별 적정 섭취량 및 상한 섭취량을 제공합니다.
   <br/>

- ### 식사 기록
  - 섭취한 음식과 영양제를 등록하여 식사를 기록할 수 있습니다.
  - 저희 데이터에 있는 음식 외에도 직접 음식을 추가하거나, 식사 등록시 자주 먹는 식단을 저장할 수 있습니다.
  - 달력의 날짜 부분을 클릭하여 이전 식사 기록도 등록할 수 있습니다.

    <br/>
- ### 영양 분석
  - 등록한 식사 기록을 바탕으로 영양 세부 통계를 확인하고, 부족/과다 섭취한 영양소들을 한 눈에 파악할 수 있습니다.
  - 최근 7일, 최근 30일, 전체 기간으로 나누어 분석 통계를 볼 수 있습니다.
  - 플래닛 지수 통계와 식단 기록 타임라인, 영양제 및 영양 성분 섭취 피드백을 확인할 수 있습니다.

    <br/>
- ### 영양제 추천
  - 유저가 최근 한 달간 권장 섭취량 대비 가장 부족하게 섭취한 영양소를 보충할 수 있는 영양제를 추천합니다.
  - 유저가 관심을 가지고 있는 건강 고민에 도움이 되는 영양제를 추천합니다.
  - 건강 고민이나 영양 성분, 영양제 이름을 통한 검색 기능도 제공합니다.

    <br/>

  <br/>

---

## 🖥️ 화면 구성

- ### 홈 화면
![홈](https://user-images.githubusercontent.com/55011885/203736942-99e5c9e1-b731-4dd1-a4da-65f8e4cd2643.gif)
<br/>
- ### 소셜로그인 후 회원가입 페이지
![회원가입](https://user-images.githubusercontent.com/55011885/203735548-8a6c46c4-faa3-43b5-b527-a66b2bf0b890.gif)
<br/>
- ### 회원 정보 수정
![회원정보_수정](https://user-images.githubusercontent.com/55011885/203734486-224d74af-5050-4620-95de-0f0b7ae781ae.gif)
<br/>
- ### 영양제 추천 & 검색 페이지
![영양제](https://user-images.githubusercontent.com/55011885/203735484-5d402a3b-b3af-406f-b788-70fca413d051.gif)
<br/>
- ### 식단 등록
![식단등록](https://user-images.githubusercontent.com/55011885/203733820-1835f657-ce20-402e-a7ce-fcebad513cbd.gif)
<br/>
- ### 식사 및 영양제 섭취 기록 페이지
![식사기록_+_영양제_기록](https://user-images.githubusercontent.com/55011885/203733870-1c652477-fb9a-4dba-9230-13ee23f9f69d.gif)
<br/>
- ### 섭취 기록 바탕 영양 분석 페이지
![영양분석](https://user-images.githubusercontent.com/55011885/203733926-00cc328b-762a-4b88-bec7-3d6dd5e35611.gif)

<br/>
<br/>

---

## 🛠️ 주요 기술

**Backend - Spring**

- IntelliJ IDE 2022.1.3
- JDK 8
- Springboot 2.7.1
- Spring Data JPA
- Spring Security
- Spring Web
- Swagger 3.0.0
- MySQL 8.0.29
- Hibernate 5.6.9 Final
- Hadoop

**Frontend - React**

- Visual Studio Code IDE
- Node.Js 16.17.1 LTS
- React 18.2.0
- Material UI 5.10.8
- Styled-components 5.3.5
- React-apexcharts 1.4.0
- React-tagcloud 2.3.1


**CI/CD**

- AWS EC2 Ubuntu 20.04 LTS
- NGINX 1.23.1
- SSL
<br/>
<br/>

---

## 📰 ERD

![PLANEAT_ERD](https://user-images.githubusercontent.com/55011885/203732929-3c581d33-280d-475c-9edf-102340c24f26.png)
<br/>
<br/>

## 📝 시스템 아키텍처

![서비스_아키텍처](https://user-images.githubusercontent.com/55011885/203732996-334c39aa-86de-47b0-8177-7110df1f192b.PNG)
<br/>
<br/>

## 🗂️ 프로젝트 파일 구조

---

### Back

```
planeat-backend
  ├── api
  │   ├── controller
  │   ├── dto
  │   └── service
  ├── config
  │   ├── auth
  │   ├── image
  │   └── jwt
  ├── database
  │   ├── entity
  │   └── repository
  ├── enums
  ├── exception
  └── interceptor
```

### Front

```
planeat-front
  ├── node_modules
  ├── public
  └── src
      ├── api
      ├── assets
      ├── components
      │   ├── common
      │   ├── modal
      │   └── nav
      ├── pages
      │   ├── analysis
      │   ├── home
      │   ├── main
      │   ├── myPage
      │   └── search
      └── states
```
<br/>
<br/>

## 💻 협업 툴

---

- Git
- Notion
- JIRA
- MatterMost
- Webex
- GatherTown
<br/>
<br/>

## 🤝 협업 환경

---

- Gitlab
  - 코드의 버전을 관리
  - 이슈 발행, 해결을 위한 토론
  - MR시, 팀원이 코드리뷰를 진행하고 피드백 게시
- JIRA
  - 매주 월요일 목표량을 설정하여 Sprint 진행
  - 업무의 할당량을 정하여 Story Point를 설정하고, In-Progress -> Done 순으로 작업
- 회의
  - 매일 아침마다 Webex Scrum 진행, 전날 진도량과 당일 해야할 목표량 설정
- Notion
  - 회의가 있을때마다 회의록 기록
  - 개발 중 참고할만 하거나, 도움이 될 문서를 해당 기술 분야에 공유
  - 컨벤션 정리
  - 스토리보드, ERD, 기능명세서 등 모두가 공유해야 하는 문서 관리
- GatherTown
  - 화면 공유를 통해 함께 버그 해결
  - 상태 메세지를 통해 현재 하는 일 공유
  <br/>
<br/>

## 👨‍👩‍👧‍👦 팀원 역할 분배

---

![역할 분배](https://user-images.githubusercontent.com/55011885/203733057-74ed7992-54bf-4fc3-8f2d-80542b2c6ee0.PNG)

- 팀장 : [신지한](https://github.com/shinzan7)
- 팀원 : [박윤하](https://github.com/0atx)
- 팀원 : [여예원](https://github.com/YewonYeo)
- 팀원 : [전상현](https://github.com/fridayhs)
- 팀원 : [조혜안](https://github.com/chohyean)
- 팀원 : [한하평](https://github.com/gks3075)
<br/>
<br/>

## 📋 프로젝트 산출물

---

- [기능명세서](https://tall-park-c47.notion.site/bc28582961e947a39b260bd4fe61a6c7)
- [스토리보드](https://www.figma.com/file/XauGIKduCFkKDSdA48Ytgq/%ED%94%8C%EB%9E%9C%EC%9E%87?node-id=1%3A2)
- [컨벤션](https://tall-park-c47.notion.site/Git-a352128d8d374a83ac1b4c58da8ee27b)
- [API](https://tall-park-c47.notion.site/REST-API-dbf0df2013a94ae2ad38037c567d7273)
- [회의록](https://tall-park-c47.notion.site/70d7624e69724256aef7dfba7ea4488b)
<br/>
<br/>

---

## 🗃️ 프로젝트 결과물

- [포팅 매뉴얼](https://github.com/0atx/PLANEAT/files/10082142/PLANEAT_.pdf)
- [시연 시나리오](https://github.com/0atx/PLANEAT/files/10082138/PLANEAT.pdf)
- [중간 발표자료](https://github.com/0atx/PLANEAT/files/10082146/PLANEAT.pdf)
- [최종 발표자료](https://github.com/0atx/PLANEAT/files/10082143/PLANEAT.pdf)
