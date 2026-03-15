# Product Requirements Document (PRD)

**Product Name:** AI Marketing Director Platform
**Document Version:** 1.0

## 1. Overview

The AI Marketing Director Platform is a web-based SaaS application that transforms CLI-based AI agent scripts into a visual orchestration dashboard. It allows a user (acting as the "Director") to command a team of specialized AI agents ("Members") to automatically audit websites, analyze competitors, and generate client-ready marketing reports.

## 2. Objectives

* Abstract the complexity of terminal commands and local markdown files into an intuitive web interface.
* Execute multi-agent AI workflows in parallel.
* Provide real-time visibility into the thought process and progress of each AI agent.
* Synthesize individual agent outputs into a unified, downloadable PDF report.

## 3. Core Features & Functionality

### 3.1. Campaign & Project Management (CRUD)

* **Create:** Users can initialize a new marketing audit by inputting a target URL and selecting the business type (e.g., local business, SaaS, e-commerce).
* **Read:** Dashboard displaying past audits with high-level scores.
* **Update/Delete:** Manage historical reports and rerun specific agents on existing projects.

### 3.2. The "Director" Command Center

* A control panel where the user selects which "Members" to deploy for a specific task.
* **Skill selection toggles:** Users can choose to run a full audit or dispatch individual agents (e.g., only the Competitor Analyst or only the SEO Specialist).

### 3.3. Real-Time Execution Engine

* Parallel processing of agent tasks to minimize wait times.
* Visual status indicators (e.g., "Pending," "Analyzing Content," "Generating Schema," "Complete") for each active agent, utilizing real-time data streaming to keep the UI responsive without page reloads.

### 3.4. Output & Synthesis

* **Interactive Web Dashboard:** A consolidated view of all critical findings, categorized by severity (Critical, High, Medium, Low).
* **PDF Export Engine:** A formatting module that takes the synthesized JSON/Markdown output and compiles it into a professional, branded PDF document for client delivery.

## 4. Agent Roles & "Skills" (The Members)

These roles translate the `.md` system prompts from the reference repository into backend database records.

* **Director Agent (The Orchestrator):** Analyzes the initial URL, determines the business context, and delegates specific instructions to the sub-agents.
* **Content & Messaging Specialist:** Evaluates copywriting, brand trust, and messaging consistency (e.g., pricing discrepancies).
* **Conversion Optimization Expert:** Analyzes the funnel, call-to-action placement, and user friction.
* **Technical SEO Analyst:** Scans for meta tags, JSON-LD schema, and discoverability issues.
* **Competitor Analyst:** Identifies direct and indirect competitors to benchmark the target URL.
* **Synthesis / Account Manager:** Aggregates the findings from the four sub-agents into a prioritized action plan.

## 5. Technical Architecture

### 5.1. Frontend

* **Framework:** NextJS for a fast, server-rendered React application.
* **UI Components:** Tailwind CSS for styling the dashboard, progress bars, and data tables.

### 5.2. Backend & Database

* **Database & Auth:** Supabase to handle user authentication, session management, and relational data storage.
* **Data Models:**
* `Users`: Authentication and profile data.
* `Prompts/Skills`: Storing the core system instructions for each agent (replacing the local `.md` files).
* `Audits`: Storing the results, generated JSON, and raw LLM responses.


* **API Route (Orchestration):** NextJS API routes or Edge Functions to handle the parallel `Promise.all()` fetch requests to the LLM provider.

### 5.3. AI & Communication Layer

* **LLM Provider:** Anthropic API (Claude 3.5 Sonnet) for parsing and generation.
* **Real-time Updates:** Server-Sent Events (SSE) or Supabase Realtime to stream token outputs and status updates from the backend to the frontend command center.

## 6. User Flow

1. **Initiate:** User logs in and pastes `https://target-business.com` into the dashboard.
2. **Command:** User clicks "Run Full Market Audit."
3. **Dispatch:** The web app reads the "Director" skill from Supabase, hits the LLM to get context, and simultaneously fires API calls for the Content, SEO, Conversion, and Competitor agents.
4. **Monitor:** The UI displays four loading cards. As the backend receives chunks from the LLM, the cards update with live progress.
5. **Review:** All agents finish. The backend runs one final "Synthesis" API call and pushes the aggregated findings to the UI.
6. **Export:** User clicks "Download Report," triggering the PDF generation module.

## 7. Future Enhancements (Phase 2)

* **Rule Management:** Allow users to create custom constraints for the agents (e.g., "Always check for HIPAA compliance in medical sites").
* **Custom Agent Builder:** A UI to write and save custom `skill.md` equivalent prompts to expand the team beyond marketing.