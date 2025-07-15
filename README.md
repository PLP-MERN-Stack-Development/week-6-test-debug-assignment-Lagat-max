# MERN Bug Tracker

A full-stack bug tracking application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates systematic testing and debugging practices for both backend and frontend.

---

## Testing Strategy & Test Files Overview

This section outlines the complete testing implementation for the MERN Bug Tracker project, including unit, integration, and end-to-end (E2E) testing. The goal is to ensure that all components of the application are reliable and maintainable through consistent testing practices.

### 🧪 Test File Structure

```
week-6-test-debug-assignment-Lagat-max/
├── client/
│   └── src/
│       └── tests/
│           ├── unit/
│           │   ├── BugForm.test.jsx         # Unit tests for form component
│           │   └── Button.test.jsx          # Unit tests for button component
│           └── integration/
│               └── BugFlow.test.jsx         # Integration tests for bug flow
│   └── cypress/
│       └── e2e/
│           └── bug-tracker.cy.js            # E2E tests for user flows
├── server/
│   └── tests/
│       ├── unit/
│       │   └── validateBug.test.js          # Unit tests for validation helpers
│       └── integration/
│           └── bugs.test.js                 # Integration tests for CRUD routes
```

### 🧩 Testing Strategy

#### 🔹 Unit Testing

- **Client:** Tested individual components like BugForm and Button, ensuring proper field rendering, validation behavior, and controlled input updates.
- **Server:** Focused on utility and validation functions. Mocked database operations using `jest.mock()`.

#### 🔹 Integration Testing

- **Client:** Verified that the BugFlow test simulates adding, listing, and error handling in the UI.
- **Server:** Simulated full API requests using Supertest to test endpoints (POST, PUT, DELETE) and middleware responses.

#### 🔹 End-to-End Testing

- **Cypress** is used for E2E tests (`client/cypress/e2e/bug-tracker.cy.js`), simulating real user flows:
  - Creating a bug via the form
  - Verifying it appears in the list
  - Updating its status
  - Deleting it from the list

### 📄 Sample Test File Snippets

#### 🔸 Unit Test (BugForm)

```js
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../../components/BugForm';

test('renders bug form with title input', () => {
  render(<BugForm onSubmit={() => {}} />);
  expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
});
```

#### 🔸 Integration Test (API Route)

```js
const request = require('supertest');
const express = require('express');
const bugsRouter = require('../../routes/bugs');
const app = express();
app.use(express.json());
app.use('/api/bugs', bugsRouter);

describe('POST /api/bugs', () => {
  it('should create a new bug', async () => {
    const res = await request(app).post('/api/bugs').send({ title: 'Login fails', description: 'Error', status: 'open' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
});
```

#### 🔸 E2E Test (Cypress)

```js
describe('Bug Tracker E2E', () => {
  it('should add and display a bug', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="title"]').type('E2E Bug');
    cy.get('textarea[name="description"]').type('E2E bug description');
    cy.get('button[type="submit"]').click();
    cy.contains('E2E Bug').should('exist');
  });
});
```

### 📊 Coverage and Continuous Testing

- Code coverage tracked using the `--coverage` flag in Jest.
- Future scope: integrate with GitHub Actions for CI/CD test automation.

---

## Features
- Report new bugs via a form
- View a list of all reported bugs
- Update bug statuses (open, in-progress, resolved)
- Delete bugs
- Robust error handling (backend and frontend)
- Unit and integration tests for both backend and frontend
- Debugging tools and techniques demonstrated

---

## Test Coverage

After running tests with coverage enabled, you can find the coverage reports in the `coverage/` folders of both the backend and frontend. Below are screenshots of the coverage summary pages:

**Backend Coverage:**
![Backend Coverage](coverage-screenshots/backend-coverage.png)

**Frontend Coverage:**
![Frontend Coverage](coverage-screenshots/frontend-coverage.png)

To generate these reports yourself:
- Backend: `cd server && npm test -- --coverage`
- Frontend: `cd client && npm test -- --coverage`

---

## ### 3. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Create a new project and a free-tier cluster.
3. Under **Database Access**, create a user with a password.
4. Under **Network Access**, add your IP address or allow access from anywhere.
5. Click **Connect** > **Connect your application**, and copy the connection string.
6. Replace `<username>`, `<password>`, and `<dbname>` in the string with your values.
7. Paste this into your `.env` file:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bugtracker?retryWrites=true&w=majority

## E2E Testing (Cypress)

End-to-end tests are implemented using [Cypress](https://www.cypress.io/).

- E2E test file: `client/cypress/e2e/bug-tracker.cy.js`
- Cypress config: `client/cypress.config.js`

### Running E2E Tests

1. Install Cypress (if not already):
   ```sh
   cd client
   npm install cypress --save-dev
   ```
2. Start your backend (`npm start` in `server/`) and frontend (`npm start` in `client/`).
3. In a new terminal, run:
   ```sh
   npx cypress open
   ```
   or for headless mode:
   ```sh
   npx cypress run
   ```
4. Select the E2E test and run it in the Cypress UI or let it run headlessly.

---

## Project Structure
```
server/           # Backend (Express, Mongoose)
  models/
  controllers/
  routes/
  middleware/
  helpers/
  tests/
client/           # Frontend (React)
  src/
    components/
    api/
    tests/
```

---

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

#### 1. Clone the repository
```
git clone <repo-url>
cd week-6-test-debug-assignment-Lagat-max
```

#### 2. Install backend dependencies
```
cd server
npm install
```

#### 3. Install frontend dependencies
```
cd ../client
npm install
```

---

## Running the Application

### 1. Start MongoDB
Ensure MongoDB is running locally or update the `MONGO_URI` in `server/server.js` to your Atlas connection string.

### 2. Start the backend server
```
cd server
npm start
```

### 3. Start the frontend React app
```
cd ../client
npm start
```

- The backend runs on [http://localhost:5000](http://localhost:5000)
- The frontend runs on [http://localhost:3000](http://localhost:3000)

---

## Testing

### Backend
- **Unit tests:** `npm test` (in `server/`)
- **Integration tests:** API routes tested with Supertest and Jest, with database calls mocked

### Frontend
- **Unit tests:** `npm test` (in `client/`)
- **Integration tests:** React Testing Library for component and flow tests

---

## Debugging Techniques Used
- **Console logs:** Used throughout for tracking values (see code for explicit examples)
- **Chrome DevTools:** Inspect network requests and React component state
- **Node.js Inspector:** Run backend with `node --inspect server/server.js` for step debugging
- **Error Boundaries:** React error boundary component for graceful UI error handling
- **Express Middleware:** Centralized error handler for backend

---

## Error Handling
- **Backend:** All errors are caught and formatted by Express middleware
- **Frontend:** ErrorBoundary component catches and displays UI errors; API errors are shown to the user

---

## Testing Approach & Coverage
- **Backend:**
  - Unit tests for helper functions (e.g., validation)
  - Integration tests for all API endpoints (create, update, delete, list bugs)
  - Database calls are mocked for isolation
- **Frontend:**
  - Unit tests for components (form, button)
  - Integration tests for user flows (adding, listing, error states)
  - UI tested for empty, loading, and error states

---

## Intentional Bugs & Debugging
- To practice debugging, you can introduce a typo (e.g., change `fetchBugs` to `fetchBugz` in `App.jsx`) and use console logs, DevTools, or the Node inspector to trace and fix the error.

---

## Author
- [Amos Kiplagat]

---

## License
This project is for educational purposes. 