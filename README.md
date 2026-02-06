# Task Management Web App

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://taskapp-production-b535.up.railway.app/)

A modern, full-stack Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). It features a clean, responsive UI designed with Tailwind CSS.

## Features

-   **Authentication:** Secure Login and Registration with JWT.
-   **Dashboard:** Overview of tasks with statistics (Total, Completed, In Progress, Pending).
-   **Task Management:**
    -   Create, Read, Update, and Delete tasks.
    -   Sort tasks by status (Pending, In Progress, Completed).
    -   Directly update task status from the dashboard.
-   **Responsive Design:** Fully responsive layout with a collapsible sidebar.
-   **Dark Mode:** Automatically respects system preferences.

## Tech Stack

-   **Frontend:** React, Tailwind CSS v4, Lucide React (Icons), Axios, React Router v6.
-   **Backend:** Node.js, Express.js.
-   **Database:** MongoDB.
-   **Authentication:** JSON Web Tokens (JWT).

## Getting Started

### Prerequisites

-   Node.js (v14+ recommended)
-   MongoDB (Local or Cloud/Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vivekrawat16/TaskApp.git
    cd TaskApp
    ```

2.  **Install dependencies (Root, Client, and Server):**
    ```bash
    # Install root dependencies (concurrently, etc.)
    npm install

    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Environment Setup:**
    -   Create a `.env` file in the `server` directory with the following:
        ```env
        NODE_ENV=development
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```

### Running the App

To run both the client and server concurrently:

```bash
# From the root directory
npm run dev
```

-   **Frontend:** `http://localhost:5173`
-   **Backend:** `http://localhost:5000`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.