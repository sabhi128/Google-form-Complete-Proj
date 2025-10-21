# Google Form Backend

This backend uses Node.js, Express.js, and MongoDB to manage forms and responses for your Google Form project.

## Setup Instructions

1. **Install dependencies**
   ```powershell
   cd backend
   npm install
   ```

2. **Configure MongoDB**
   - By default, it connects to `mongodb://localhost:27017/googleform`. Update `.env` if needed.

3. **Run the server**
   ```powershell
   npm run dev
   ```
   The server will start on port 5000.

## API Endpoints

### Forms
- `POST /api/forms` — Create a new form
- `GET /api/forms` — Get all forms
- `GET /api/forms/:id` — Get a form by ID

### Responses
- `POST /api/responses/:formId` — Submit a response to a form
- `GET /api/responses/:formId` — Get all responses for a form

## Folder Structure
- `models/` — Mongoose models for Form and Response
- `routes/` — Express routes for forms and responses
- `index.js` — Main server file

---

You can now connect your frontend to these endpoints for full-stack functionality.
