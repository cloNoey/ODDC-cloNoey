# ODDC-cloNoey
One Day Dance Class 

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

### Data Pipeline (AI Automation)

- **Orchestrator:** n8n (Self-hosted on AWS EC2 Docker)
- **AI Engine:** Google Gemini 1.5 Flash (via API)
    - *Role:* 인스타그램 이미지(스케줄표, 공지)에서 텍스트 구조화 추출. + 인간 검수
- **Flow:** Image Upload (Admin) -> n8n Webhook -> Gemini Processing -> DB Insert
=> n8n 자동화 시스템에서의 접근이 불편 -> 제미나이에 직접 연결해서 구글 스프레드시트에 1차 가공 진행

### Infrastructure & DevOps

- **Cloud:** AWS EC2 (t3.small), AWS ECR
- **CI/CD:** GitHub Actions (Auto Build/Deploy)
- **Testing:** Playwright (E2E Testing with API Mocking)
