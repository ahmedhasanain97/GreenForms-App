
## 1. Project Overview

GreenForms is a web application inspired by Google Forms that allows users to create forms, share them publicly, collect responses, and view submissions.

---

## 2. Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Express Session

### Frontend

* EJS
* Bootstrap 5
* JavaScript
* HTML/CSS

---

## 3. Features

### Authentication

* User Registration
* User Login
* User Logout
* Session-Based Authentication

### Form Management

* Create Form
* Edit Form
* Delete Form
* View User Forms

### Public Forms

* Share Forms Using Unique Shared ID
* Submit Responses

### Responses

* View All Responses
* View Submitter Name & Email
* View Question Answers

---

## 4. Database Models

### User

* name
* username
* email
* password
* loggedIn

### Form

* title
* questions
* createdBy
* sharedId
* responsesCount

### Submission

* name
* email
* form_id
* answers

---

## 5. Main Routes

### Authentication

POST /register
POST /login
POST /logout

### Forms

GET /forms/dashboard
GET /forms/create
POST /forms/create
GET /forms/:id/edit
POST /forms/:id/edit
POST /forms/:id/delete

### Public Forms

GET /form/:sharedId
POST /form/:sharedId/submit

---

## 6. Challenges Faced

* Session authentication integration.
* Dynamic form questions rendering.
* Form validation.
* Submission schema validation.
* Route organization and EJS rendering issues.
* Preserving form data after validation errors.

---

## 7. Future Improvements

* Multiple question types.
* Charts and analytics.
* Response export (CSV / Excel).
* User profile page.
* Form themes and customization.

---

## 8. How to Run

1. Install dependencies:
   npm install

2. Configure environment variables:

* MONGODB_URI
* SESSION_SECRET

3. Start server:
   npm run dev

4. Open:
   http://localhost:3000

