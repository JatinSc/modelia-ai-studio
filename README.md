# 🌟 Modelia AI Studio

An **AI-powered image generation studio** built with **React, TypeScript, TailwindCSS, and Vitest**.  
This project lets users **upload an image, apply prompts & styles, and generate AI-stylized results** with retry logic, history tracking, and downloads.  

It’s designed with **accessibility, testing, and CI/CD best practices** to simulate a real-world production-grade workflow.

---

## 🚀 Features

- 📤 **Image Upload** – Upload an image to transform with AI.  
- ✨ **AI Generation** – Apply prompt + style and generate stylized output.  
- 🔁 **Retry Logic** – Automatic retries with exponential backoff for robustness.  
- 🗂️ **History Section** – Keep track of previously generated images.  
- ⬇️ **Download** – Save generated images locally.  
- ♿ **Accessibility (a11y)** – Includes ARIA labels, focus management, skip links, keyboard navigation.  
- ✅ **Testing** – Unit tests with **Vitest + React Testing Library**, E2E tests with **Playwright**.  
- 🔍 **Linting & Formatting** – ESLint + Prettier for consistent code.  
- 🤖 **CI/CD** – GitHub Actions workflow for linting, tests, and builds.  

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, TailwindCSS, Framer Motion  
- **Testing:** Vitest, React Testing Library, Playwright  
- **Tooling:** Vite, ESLint, Prettier, Husky, Lint-Staged  
- **CI/CD:** GitHub Actions  
- **Optional Enhancements:** PWA basics, error boundaries, performance memoization, code splitting  

---

## 📦 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-username/modelia-ai-studio.git
cd modelia-ai-studio
npm install


### 2. Run Development Server
npm run dev
App will be available at http://localhost:5173.

### 3. ✅ Testing
Unit & Component Tests (Vitest + RTL)
npm run test

### 4. E2E Tests (Playwright)
npm run test:e2e
Tests include:
Upload flow
Generate with retries
Modal & download
Error handling

### 5. ♿ Accessibility
Implemented improvements:
aria-label, aria-live, and aria-modal attributes
Proper focus order and visible focus rings
Skip link for keyboard users
Tested with keyboard-only navigation and basic screen-reader checks