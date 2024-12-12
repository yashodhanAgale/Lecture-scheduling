# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Backend Tasks -

1. Project Structure Setup
   config/: Contains configuration files for connecting to the database and other settings.
   controllers/: Handles business logic for API requests and interacts with the database.
   routes/: Defines API routes and connects them to controller functions.
   server.js: Entry point for creating the Express server and integrating routes.

2. Database Setup
   MySQL Database:

Used for storing user data, courses, lectures, and assessment results.
Configured using MySQL2 and connected via environment variables.
Database Tables:

users Table: Contains user details such as email, password, role.
courses Table: Stores course information (e.g., course_name, instructor_name).
lectures Table: Stores lecture details such as course_name, instructor_name, and date.

3. API Endpoints
   Authentication:

POST /api/auth/signup: Allows users to sign up with their email, password, role.

POST /api/auth/login: Authenticates users using email and password, returning a JWT token on successful login.
Courses:

GET /courses: Fetches all available courses.
Lectures:

GET /lectures: Retrieves upcoming lectures, including course_name, instructor_name, and date.
Assessment:

4. Token-Based Authentication

JWT Authentication:
After login, the server generates a JWT token and sends it to the client. The token is stored in localStorage for subsequent requests.
Token Validation: The token is validated on protected routes to ensure that only authorized users can access certain endpoints.

5. Error Handling
   Handles errors such as invalid login attempts, missing fields, and failed data fetching, with appropriate messages sent to the frontend.

6. Password Security
   bcrypt: Passwords are hashed before being stored in the database, ensuring secure storage and preventing unauthorized access.

7. Data Fetching and Response Formatting
   Data is fetched from MySQL and formatted before being sent to the frontend, e.g., lecture dates are formatted into a readable format using JavaScript's Date object.

Frontend Tasks -

1. Project Structure
   src/: Contains all React components, routing, and styling.

main.jsx: Main component for routing and layout.

components/: Contains reusable components like forms, buttons, and modals.

pages/: Contains page-specific components like the Instructor Dashboard, Login, Signup, and Assessment pages.

2. Authentication

Login: The login form authenticates the user using the email and password. Upon successful login, a JWT token is stored in localStorage, and the user is redirected to the instructor dashboard.
Signup: The signup form allows the user to register with email, password, role. Upon successful signup, the user is redirected to the login page.

3. Instructor Dashboard
   Sidebar Navigation: The sidebar contains links to the "Overview", "My Courses", "Upcoming Lectures", and "Profile Settings".
   Dashboard Cards: Displays a summary of total courses, upcoming lectures, and total students. Data is fetched from the backend and displayed using React state.
   Upcoming Lectures Table: Lists upcoming lectures with course_name, date, and instructor_name. The table is responsive and supports scrolling when necessary.

4. User Logout
   Logout Button: The user can log out from the dashboard, which clears the JWT token from localStorage and redirects to the homepage (/).
   Confirmation Modal: When the user clicks the logout button, a confirmation modal is shown, asking if they are sure about logging out. If they confirm, the user is logged out; otherwise, they stay on the dashboard.

5. Styling
   Tailwind CSS: The project uses Tailwind CSS for styling, allowing for responsive layouts, grid systems, and various utility classes for spacing, typography, and colors.
   Custom Styling: Specific components (like the dashboard cards, tables, and buttons) are styled to improve the user experience.

6. Error Handling and Notifications
   If there’s an error in fetching data (e.g., courses or lectures), an error message is displayed on the screen using a styled notification box.

Environment Variables-
Backend
VITE_API_URL: The API URL used by the frontend to communicate with the backend.
DB_HOST, DB_USER, DB_PASSWORD, DB_NAME: Database credentials for connecting to the MySQL server.
Frontend
REACT_APP_API_URL: The base URL for API requests in the frontend application.
