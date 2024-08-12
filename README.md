# Task Management Application using Nest.js and Next.js

This task management application allows users to organize and track their tasks effectively. It includes features like user authentication, task categorization, and a LinkedIn profile scraping feature. The application is built with a modern tech stack, ensuring a robust and efficient experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [LinkedIn Profile Scraping](#linkedin-profile-scraping)
- [Responsive Design](#responsive-design)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Users can register and log in using JWT tokens for secure access.
- **Task Dashboard:** Displays all tasks with titles, descriptions, and due dates.
- **Task CRUD Operations:** Create, read, update, and delete tasks with the option to mark tasks as completed.
- **Task Categories:** Categorize tasks into different categories like work, personal, and shopping. Filter or sort tasks based on categories.
- **Responsive Design:** The app is fully responsive and works seamlessly on both desktop and mobile devices.
- **LinkedIn Profile Scraping:** Users can scrape their LinkedIn profile data and display it in the profile section.

## Tech Stack

- **Frontend:**
  - Next.js 14
  - Redux Toolkit
  - Typescript

- **Backend:**
  - Nest.js
  - MongoDB

- **Web Scraping:**
  - Selenium WebDriver with Nest.js

- **Authentication:**
  - JWT (JSON Web Tokens)

## Installation

To run this application locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/SaadHussein/Task-Managment-Nest.js-and-Next.js.git
    ```

2. **Navigate to the project directory backend:**

    ```bash
    cd .\backend\
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```
    
 4. **Navigate to the project directory frontend after intall dependencies for backend:**

```bash
 cd ..
cd .\frontend\
```

5. **Install the dependencies:**

    ```bash
    npm install
    ```

6. **Set up environment variables for backend:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DATABASE_LINK=<your-mongodb-url>
    JWT_SECRET_kEY=<your-jwt-secret>
    LINKEDIN_EMAIL_TEST=<your-linkedin-username>
    LINKEDIN_PASSWORD_TEST=<your-linkedin-password>
    ```

5. **Run the frontend application:**

    ```bash
    npm run dev
    ```

6. **Run the Nest.js server:**

    ```bash
    npm run start:dev
    ```

## Usage

1. **Register and log in:**
   - Access the registration and login pages to create an account and authenticate.

2. **Manage tasks:**
   - Use the dashboard to create, update, delete, and mark tasks as completed. Tasks can be categorized and filtered based on categories.

3. **LinkedIn Profile:**
   - Navigate to the profile section to view your LinkedIn data after it has been scraped.

## API Endpoints

| Endpoint          | Method | Description                       |
| ----------------- | ------ | --------------------------------- |
| `/user/login` | POST   | Authenticate user and return JWT  |
| `/user/register` | POST | Register a new user               |
| `/task`      | GET    | Get all tasks for the logged-in user |
| `/task`      | POST   | Create a new task                 |
| `/task/:id`  | GET    | GET a task details           |
| `/task/:id`  | PATCH    | Update an existing task           |
| `/task/:id`  | DELETE | Delete a task                     |

## LinkedIn Profile Scraping

This feature uses Selenium WebDriver with Nest.js to scrape the user's LinkedIn profile data. The scraped data is displayed in the profile section, including details like the user's name, LinkedIn URL, and photo.

To enable this feature, ensure you have provided your LinkedIn credentials in the `.env` file.

## Responsive Design

The application is designed to be fully responsive, providing an optimal user experience on both desktop and mobile devices.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.
