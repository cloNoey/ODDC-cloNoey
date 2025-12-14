# 💃 ODDC : One Day Dance Class

> "흩어진 댄스 씬의 정보를 하나의 DB로 연결하다."

: 인스타그램 속 비정형 데이터(이미지, 텍스트)를 정형 데이터로 구조화하여, 댄서와 수강생의 탐색 비용을 혁신적으로 줄여주는 댄스 정보 통합 플랫폼입니다.

## 프로젝트 배경 (Background & Problem)

### 🚨 As-Is : "정보의 파편화 (Fragmentation)"

현재 댄스 씬(Dance Scene)은 원데이 클래스 위주로 운영되지만, 정보 습득과 신청 과정이 매우 비효율적입니다.

- **높은 탐색 비용**: 수강생은 수업 정보를 얻기 위해 각 댄서/스튜디오의 인스타그램 피드와 스토리를 일일이 확인해야 합니다.
- **비정형 데이터의 한계**: 정보가 이미지(스케줄표) 형태로 흩어져 있어, 검색이나 필터링이 불가능하며 가독성이 떨어집니다.
- **반복적인 신청 프로세스**: 수업 신청 시마다 구글폼에 동일한 개인정보(이름, 연락처 등)를 반복해서 입력해야 하는 번거로움이 있습니다.
- **관리의 어려움 (Studio/Dancer)**: 노쇼, 환불 문의, 정원 관리를 수기로 처리해야 하며, 인스타그램 외에는 홍보 채널이 부족합니다.

### 🎯 To-Be : "흩어진 정보의 DB화"

우리는 문제의 본질을 **'데이터의 구조화'**로 해결하고자 합니다.

- **비정형 → 정형 데이터**: 인스타그램 속 이미지 정보를 DB화하여 검색과 정렬이 가능하게 만듭니다.
- **UX 혁신**: 사용자가 정보를 찾고 신청하기까지 10번의 클릭을 해야 했던 과정을 1번의 클릭으로 단축시킵니다.
- **통합 플랫폼**: 스튜디오 탐색부터 스케줄 확인, 사전 신청까지 한곳에서 이루어지는 '댄서 전용 플랫폼' 경험을 제공합니다.

## 서비스 타겟 및 핵심 가치 (Target & Value)

### 구분 대상 핵심 가치 (Benefit)

- **User** 춤을 배우는 수강생 정보 통합 & 편의성: 편리한 수업 일정 확인, 간편한 사전 신청
- **Studio** 댄스 스튜디오 관리 효율화: 수업 정보 등록 자동화, 예약 현황 관리, 노쇼 방지
- **Dancer** 춤을 가르치는 댄서 홍보 & 브랜딩: 자신의 수업 아카이빙, 프라이빗 레슨 관리 용이

## MVP 핵심 기능

### 📍 메인 & 탐색 (Discovery)

- 스튜디오 맵/리스트 뷰: 지도 기반 및 카드형 UI로 주변 스튜디오를 직관적으로 탐색.
- 스마트 검색: 최근 검색어 제공 및 댄서/스튜디오 이름 매칭 쿼리 (ABC순 정렬).

### 📅 통합 캘린더 & 스케줄링 (Scheduling)

- 스튜디오 상세 페이지: 스튜디오의 위치, SNS 정보 및 월간/일간 수업 스케줄을 캘린더 뷰로 제공.
- 댄서 상세 페이지: 특정 댄서의 여러 스튜디오 수업 일정을 통합하여 타임라인 형태로 제공.
- 직관적인 정보 제공: 날짜 선택 시 해당 일의 수업 리스트(장르, 난이도, 시간) 즉시 확인 가능.

### ✅ 간편 신청 프로세스 (Application)

- 원클릭 연결: '사전신청 링크' 버튼 하나로 스튜디오 예약 구글폼으로 리다이렉트.
- 현장 결제/예약 상태 확인: 수업의 마감 여부 및 결제 방식(현장/사전)을 명확히 표기.

## 기술적 접근 및 해결 전략 (Technical Strategy)
> "사용자의 뇌가 처리하던 비정형 데이터를 시스템이 처리하도록 변경"

: 이 프로젝트는 단순히 정보를 보여주는 것을 넘어, 사용자 경험(UX)의 단계를 획기적으로 줄이는 데에 기술적 초점을 맞췄습니다.

- **데이터 구조화**: 댄서명, 장르, 난이도, 시간, 장소 등을 속성(Attribute)별로 DB화하여 쿼리 성능 최적화.
- **접근성 강화**: 인스타그램에 의존하던 정보를 웹/앱 서비스로 이관하여 정보의 지속성 및 접근성 확보.
- **확장성 고려**: 추후 결제 모듈 연동 및 댄서 포트폴리오 기능 확장을 고려한 스키마 설계.

---

# Videos
## 기획 요약 및 MVP 구현 사항 (NotebookLM 2분 + Demo 1분)
https://github.com/user-attachments/assets/43863074-60c1-420e-b5ab-b2ee22cd863c


## 기획 상세 (created by, NotebookLM)
https://github.com/user-attachments/assets/f534511c-7288-40b9-898d-f5763dcfc933

---
## 기획 보드 - FigJam

https://www.figma.com/board/0Bq3BpTmPUrLPhSh4kJWqg/ODDC_NAVER?node-id=0-1&t=Q0OY9hKJQGysWOa3-1

## FE - Page Design - Figma

https://www.figma.com/design/W5U425M3b6sDZGUxp9g5rW/ODDC_MVP?node-id=0-1&t=SoTGhm3ApsqrxkNh-1

## Tech Stack

### Frontend (Web & Admin)

- **Core:** React, Vite, TypeScript
- **Styling:** TailwindCSS, CVA, clsx, tailwind-merge
- **State:** Zustand (Global), TanStack Query (Server State)
- **Deployment:** Vercel

### Backend (API)

- **Framework:** FastAPI (Python 3.11+, Async)
- **Validation:** Pydantic
- **Database:** MySQL (AWS RDS Free Tier)
- **ORM:** SQLAlchemy 2.0 (Async)
- **Deployment:** AWS EC2, Nginx (Reverse Proxy, SSL/TLS Termination), Systemd, Vercel

### Data Pipeline (AI Automation)

- **Orchestrator:** n8n (Self-hosted on AWS EC2 Docker)
- **AI Engine:** Google Gemini 1.5 Flash (via API)
  - _Role:_ 인스타그램 이미지(스케줄표, 공지)에서 텍스트 구조화 추출. + 인간 검수
- **Flow:** Image Upload (Admin) -> n8n Webhook -> Gemini Processing -> DB Insert
  => n8n 자동화 시스템에서의 접근이 불편 -> 제미나이에 직접 연결해서 구글 스프레드시트에 1차 가공 진행
