# SAT 1600 🎯
> **The Complete AI-Powered SAT Command Center for Domestic & International Students**  
> *“Everything you need to go from your current score to 1600.”*

[![Next.js](https://img.shields.io/badge/Next.js-16%20(Turbopack)-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18%2F19-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

**SAT 1600** is a full-stack, production-grade SAT preparation platform engineered to replace fragmented spreadsheets, disorganized PDFs, and generic study blogs with a unified **AI-powered command center**.

Designed specifically to support high school students—with tailored modules for **international test-takers**—the platform answers every critical question:
* *What should I study today?*
* *Why did I get this question wrong?*
* *What is my #1 source of lost points?*
* *How do I navigate international testing centers, passport mandates, and Bluebook device requirements?*
* *How do I break through plateaus: 1100 → 1200 → 1300 → 1400 → 1500 → 1550 → 1600?*

---

## 🚀 Key Features

### 1. 🎛️ Student Command Center (Dashboard)
* **Goal Tracker & Trajectory**: Track current diagnostic score vs. 1600 target with animated progress rings.
* **Today's Mission Checklist**: 4 daily targeted tasks generated dynamically based on active goals.
* **Domain Mastery Breakdown**: Real-time accuracy metrics across Math (Algebra, Advanced Math, Problem Solving, Geometry) and Reading & Writing (Information & Ideas, Craft & Structure, Expression of Ideas, Standard English Conventions).
* **Automated Next-Step Recommendations**: High-leverage actions to maximize weekly point gains.

### 2. 🤖 SAT AI Coach (Dual-Engine Socratic Tutor)
* **Socratic Progression**: When a student gets stuck, the AI does *not* spoil the answer. It provides a structured hint ladder:
  * **Hint 1:** High-level conceptual clue.
  * **Hint 2:** Tactical strategy clue (e.g., Desmos shortcuts or grammatical boundaries).
  * **Hint 3:** Step-by-step approach.
  * **Full Solution:** Detailed rationale available on demand.
* **Dual-Engine Architecture**: Connects to Google's Gemini models when `GEMINI_API_KEY` is present. Gracefully activates a deterministic expert SAT engine when offline or unconfigured, ensuring **zero broken features out of the box**.
* **Dual-Pass Verification**: Every explanation displays a verified authenticity status (`✓ Verified Explanation`).

### 3. 📝 SAT Mistake Book & Error Log
* **Root Cause Diagnostics**: Analyzes missed questions across 10 error categories:
  * *Conceptual mistake*, *Careless mistake*, *Misread question*, *Vocabulary issue*, *Timing problem*, *Calculation error*, *Strategy mistake*, *Guessing*, *Changed correct answer*, *Didn't know concept*.
* **Actionable Analytics**: Identifies your *"#1 Source of Lost Points"* (e.g., Careless mistakes in Advanced Math).
* **Mastery System**: Re-test missed questions until marked as mastered.

### 4. 📅 Adaptive SAT Study Plan Generator
* Generates multi-tiered schedules based on your score gap and hours available:
  * **Daily Plan**: Optimal morning/evening distribution.
  * **Weekly Plan**: Balanced Monday-to-Sunday task assignments.
  * **Monthly Milestones**: Foundation → Speed → Endurance.
  * **Final 30-Day Countdown & 7-Day Crunch**: Peak performance protocol for test week.
* Dynamically rebalances study time toward topics with high error rates in your Mistake Book.

### 5. 🗺️ 7-Phase Interactive SAT Roadmap
* Visual milestone path guiding students from **Phase 1 (Diagnose)** through Foundations, Targeted Weaknesses, Timed Sprints, Full Bluebook Simulations, Error Elimination, to **Phase 7 (Final Prep)** and the **1600 Attempt**.

### 6. 🌍 International Student Center
* **Passport Mandate Alert**: Detailed guidance on mandatory valid passport ID rules outside the United States.
* **Bluebook & Device Readiness**: Laptop/iPad system requirements, power adapter strategies, and College Board device loaning programs.
* **Seat Scarcity Strategy**: Tactics to secure registration seats across Asia, Europe, Latin America, Africa, and the Middle East.
* **Non-Native Speaker (ELL) Advantage**: How to leverage rule-based grammar conventions to waive TOEFL/IELTS requirements at top universities.

### 7. 📚 Curated & Official Resource Directory
* Authenticated database of official College Board materials (Bluebook™, Educator Question Bank, Khan Academy Official Prep) and vetted third-party resources (The Critical Reader by Erica Meltzer, The College Panda, 1600.io Orange Books, Desmos Calculator Guide).
* Zero fabricated URLs; all official links are verified.

### 8. 📊 Practice Test Score Analyzer
* Enter official Bluebook test scores (Tests 1–6) or custom test scores.
* Outputs projected score ranges (with realistic uncertainty intervals), domain loss breakdowns, and an immediate 7-day recovery plan.

### 9. ⏱️ SAT Study & Pomodoro Timer
* Focus modes: `25/5 Pomodoro`, `50/10 Focus Block`, and authentic `35-min SAT Math Module` and `32-min Reading/Writing Module` timed simulations.
* Session logging with XP gamification and streak bonuses.

### 10. 🗂️ High-Yield Flashcard Vault
* Spaced repetition system (SRS) for:
  * High-frequency Digital SAT vocabulary.
  * Essential math formulas & Vieta's relations.
  * Grammar punctuation boundary rules (semicolons, colons, dashes).
  * Desmos graphing calculator shortcuts.

### 11. 🏫 University Admissions Matcher
* Database of 40+ premier US and global universities with middle-50% SAT ranges, superscore policies, testing requirements (Required vs. Optional), and international financial aid availability.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | High-performance React framework with Turbopack and static page generation. |
| **Language** | TypeScript | Strict end-to-end type safety. |
| **Styling** | Tailwind CSS | Modern responsive design with custom dark theme and glowing gradients. |
| **Icons** | Lucide React | Clean, accessible vector icons. |
| **State & Persistence** | React Hooks + LocalStorage | Instant client-side persistence, offline availability, and zero database friction. |
| **AI Engine** | Google Gemini API (`@google/genai`) | Intelligent tutoring with a deterministic fallback engine for offline reliability. |
| **Animations & FX** | Canvas Confetti | Milestone celebration feedback. |

---

## 🏗️ Architecture

```mermaid
graph TD
    User([Student / International Test-Taker]) --> ClientApp[Next.js App Router Client]
    
    subgraph Client State & Storage
        ClientApp --> Store[useStudentStore / LocalStorage]
        Store --> Profile[User Profile & Goal Score]
        Store --> MistakeDB[SAT Mistake Book & Error Categories]
        Store --> PlanState[Dynamic Study Plan]
        Store --> TestHistory[Practice Test Analytics]
    end

    subgraph AI Tutoring Engine
        ClientApp --> CoachRoute[/api/ai/coach]
        CoachRoute --> KeyCheck{GEMINI_API_KEY?}
        KeyCheck -- Yes --> GeminiAPI[Google Gemini 2.5 Flash]
        KeyCheck -- No / Offline --> DeterministicEngine[Expert Pedagogical Tutor Engine]
        GeminiAPI --> VerificationPass[Two-Pass Verification & Socratic Formatting]
        DeterministicEngine --> VerificationPass
        VerificationPass --> VerifiedResponse[Verified Pedagogical Guidance]
    end

    subgraph Data Repositories
        ClientApp --> SeedResources[resources.json - Official Links]
        ClientApp --> SeedTopics[topics.json - Digital SAT Taxonomy]
        ClientApp --> SeedDates[sat_dates.json - 2024-2026 Deadlines]
        ClientApp --> SeedUnis[universities.json - Admissions Data]
    end
```

---

## ⚡ Getting Started Locally

### Prerequisites
* Node.js v18+ or v20+
* npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/mygeminigod-lgtm/sat-1600.git
cd sat-1600
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your optional Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> *Note: If `GEMINI_API_KEY` is omitted, the application automatically uses the built-in deterministic SAT tutor engine with full functionality.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security & Integrity
* **Zero Secrets Committed**: `.env*` files are strictly excluded via `.gitignore`.
* **Safe Client Persistence**: Sensitive credentials are never stored in `localStorage`.
* **Authenticity Guarantee**: No URLs are fabricated. Official College Board links are verified directly.

---

## 📜 Legal Notice
*SAT® is a registered trademark of the College Board, which is not affiliated with and does not endorse this independent platform. All official practice materials link directly to College Board Bluebook™ and official partners.*

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request with enhancements, additional verified questions, or updated testing dates.

---

<div align="center">
  <b>Built for aspiring 1600 scorers worldwide.</b><br>
  <i>Deliberate practice beats passive reading every time.</i>
</div>
