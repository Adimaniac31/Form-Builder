# Form Builder Project

## Overview
Form Builder is a web application that allows users to create custom forms, submit data, and view submission statistics. Users can manage their forms, view submissions, and export the data. This application does not implement authentication and simplifies the process by allowing login using only a username.

**GitHub Repository**: [Form Builder Repository](https://github.com/Adimaniac31/Form-Builder.git)

## Features
- **Form Creation**: Users can create forms with various input types like text, number, date, checkbox, dropdown, and radio.
- **Form Submission**: Users can submit responses for the created forms.
- **View Submissions**: View all submissions for a specific form, including recent submissions.
- **Export Submissions**: Export all form submissions in CSV format.
- **Dashboard**: View and manage created forms, including the ability to edit, delete, and view submission stats.
- **No Authentication**: Login is simplified with only a username. Protected routes and JWT are not implemented for simplicity.

## Tech Stack
- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: MySQL
- **Libraries**:
  - `react-dnd`: For drag-and-drop functionality in the form builder.
  - `file-saver`: For exporting form submissions to CSV.
- **Other Tools**: Sequelize ORM for database interaction.

## Prerequisites

Before running the application locally, make sure you have the following installed:

- **Node.js** (v20 or later)
- **npm** (v10 or later)
- **TypeScript** (v5 or later)
- **MySQL** (v8 or later)

### Backend Dependencies:
1. **Install backend dependencies**:
   ```bash
   cd form-builder-backend
   npm install


2. **Set up the `.env` file**:

Create a `.env` file in the backend folder with the following environment variables:

    ```bash
        BASE_URL=http://localhost:5173
        DB_NAME=form_builder
        DB_USER=root
        DB_PASSWORD=password
        DB_HOST=localhost
    ```

### Frontend Dependencies:

1. **Install frontend dependencies**:
   Navigate to the `frontend` folder and install the dependencies using npm:

   ```bash
   cd form-builder-frontend
   npm install
   ```
### Running the Project Locally
Backend
1. Start the backend server: Run the following command to start the backend server using npm start:

    ```bash
    npm start
    ```

This command will:

Compile TypeScript and transpile the code.
Start the backend server using ts-node-dev.
The backend server will be running on http://localhost:5000

## Frontend
2. Start the frontend development server: Navigate to the frontend folder and run the following command to start the frontend:

    ```bash
    npm run dev
    ```
    
The frontend will be running on http://localhost:5173.

### **Database Setup**
Create MySQL Database: Ensure that MySQL is running and create a database with the following name:
form_builder

Sync Sequelize models: The models will be automatically synced with the database when the backend server starts.

### API Documentation
Swagger UI is available for exploring and testing the API. Visit http://localhost:5000/api-docs to access the API documentation.

### Project Structure
Backend
src/controllers: Contains the logic for form, submission, and user routes.
src/models: Sequelize models for forms, submissions, and users.
src/routes: API route definitions.
src/server.ts: The entry point for the backend server.
Frontend
src/components: React components for creating forms, viewing submissions, and the dashboard.
src/App.tsx: The main entry point for the frontend application.

### **Design Decisions**
No Authentication: The decision was made to simplify the process, and instead of using JWT or sessions, the application uses only a username to identify users.
Libraries:
react-dnd: Used for drag-and-drop functionality in the form builder. This helps in rearranging fields easily.
file-saver: For exporting submissions as a CSV file.
Sequelize ORM: Used for interacting with the MySQL database due to its simplicity and flexibility with data models.
Tailwind CSS: Used for styling the application. Tailwind CSS is a utility-first CSS framework that allows for quick and responsive design without writing custom CSS for each component. It makes it easy to maintain and adjust the design based on user feedback or design requirements.

## Database Structure

The project uses MySQL as the database for storing forms, submissions, and users. The following outlines the key tables and their structure:

### `Users` Table

Stores user information. The application uses only a **username** to identify users.

| Column Name  | Type        | Description                       |
|--------------|-------------|-----------------------------------|
| `id`         | UUID        | Primary key, unique user identifier. |
| `username`   | VARCHAR(255) | The unique username of the user.  |

### `Forms` Table

Stores form details including form title, description, fields, and a unique shareable link.

| Column Name  | Type        | Description                       |
|--------------|-------------|-----------------------------------|
| `id`         | UUID        | Primary key, unique form identifier. |
| `title`      | VARCHAR(255) | The title of the form.           |
| `description`| TEXT        | A short description of the form. |
| `fields`     | JSON        | JSON data structure for form fields. |
| `shareableLink` | VARCHAR(255) | The shareable link for the form. |
| `userId`     | UUID        | Foreign key to the Users table.   |
| `createdAt`  | DATETIME    | The date and time when the form was created. |
| `updatedAt`  | DATETIME    | The date and time when the form was last updated. |

### `Submissions` Table

Stores submissions for each form, including the data submitted by users.

| Column Name      | Type        | Description                             |
|------------------|-------------|-----------------------------------------|
| `id`             | UUID        | Primary key, unique submission identifier. |
| `formId`         | UUID        | Foreign key to the Forms table.         |
| `submissionData` | JSON        | JSON data structure with field IDs and user responses. |
| `createdAt`      | DATETIME    | The date and time when the submission was created. |
| `updatedAt`      | DATETIME    | The date and time when the submission was last updated. |

### Relationships:

- **Users and Forms**: One-to-many relationship. A user can create multiple forms. This is represented by the `userId` foreign key in the `Forms` table.
  
- **Forms and Submissions**: One-to-many relationship. A form can have multiple submissions. This is represented by the `formId` foreign key in the `Submissions` table.

### Example:

#### `Users` Table:

| id                                   | username      |
|--------------------------------------|---------------|
| e7c73395-518f-4998-aad5-48ea7b92bca8 | user123       |

#### `Forms` Table:

| id                                   | title         | description | fields                         | shareableLink                                  | userId                                   |
|--------------------------------------|---------------|-------------|--------------------------------|------------------------------------------------|------------------------------------------|
| 2ed6e15d-a894-4b6c-9077-2adaacd121d4 | Form 1        | Sample Form | { ... }                        | http://localhost:5173/form/0c7c1a90-d175-420f-ae84-53c74f2d65ac | e7c73395-518f-4998-aad5-48ea7b92bca8    |

#### `Submissions` Table:

| id                                   | formId                                | submissionData                        | createdAt             | updatedAt             |
|--------------------------------------|---------------------------------------|---------------------------------------|-----------------------|-----------------------|
| 1                                    | 2ed6e15d-a894-4b6c-9077-2adaacd121d4  | { "1734105927840": {"label": "", "value": "dhcx"} } | 2024-12-13 12:54:29   | 2024-12-13 12:54:29   |

---

This is a simplified structure that can be expanded upon based on future requirements (e.g., adding more fields to the forms or submissions).

---

### **Future Improvements**
Authentication: Adding protected routes and JWT-based authentication.
Styling: Improve the user interface and experience with a more polished design.