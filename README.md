# `README.md` for Playwright UI Automation Project

# Kaleidoscope UI Automation (Playwright)

This repository contains UI automation test cases for the [Kaleidoscope](https://apply.mykaleidoscope.com/) platform using [Playwright](https://playwright.dev/).

---

# Tech Stack

- **Framework**: [Playwright](https://playwright.dev/)
- **Language**: TypeScript
- **Test Runner**: Playwright Test
- **Assertion Library**: Built-in (Playwright)
- **Reporting**: Playwright HTML Report

---

# Project Structure

```

Kaleidoscope-UI-Automation/
├── src/
│   ├── pages/               # Page Object Model classes
│   ├── utils/             # Custom helper functions (email generator)
│   ├── test\_data/           # Static test data used in tests
│               
├── tests/                   # Main test specs
├── .gitignore
├── README.md
├── playwright.config.ts
└── package.json

```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gouravsharma1355/Kaleidoscope-UI-Automation.git
cd Kaleidoscope-UI-Automation
````

### 2. Install dependencies

```bash
npm install
```

# 3. Install Playwright Browsers

```bash
npx playwright install
```

---

# Run Tests

# Run all tests

```bash
npm run test
```

# Run tests with UI (headed mode)

```bash
npm run test:headed
```

# Run a specific test

```bash
npx playwright test tests/applicant-submission.spec.ts
```

---

# View Test Report

After running tests:

```bash
npx playwright show-report
```

This opens the HTML report in your default browser.

---


# Environment Setup

Use a `.env` file for environment-specific settings (optional):

```
BASE_URL=https://apply.mykaleidoscope.com
EMAIL=test@example.com // to check with existing mail Id //
PASSWORD=yourpassword123
```

Then access with `process.env.BASE_URL` etc.

---

# Best Practices I Follow

* **Page Object Model (POM)**: Keeps test code modular, scalable, and easier to maintain.
* **Separation of Concerns**: Test data is maintained separately from test logic for reusability and clarity.
* **Stable Assertions**: I consistently use `await expect()` to ensure elements behave as expected.
* **Step Logging**: `test.step()` is used for structured and readable test execution reports.
* **Error Handling**: `try/catch` blocks are applied in utility/helper functions where operations might fail.

---
