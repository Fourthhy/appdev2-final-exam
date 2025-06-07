# Event Management API

## 📌 A Short Introduction About the API

This is a RESTful API designed to manage users and events. It provides functionalities for user authentication (registration and login) and event management (creating, viewing all, and viewing user-specific events). The API allows users to:

* **Register** for an account.
* **Log in** to obtain an authentication token.
* **Create** new events, linked to their user account.
* **View all** available events (publicly accessible).
* **View their own** events (requiring authentication).

## 🔗 Working Render Deployment Link

[**Insert your working Render deployment link here**]
*(Example: `https://your-event-api.onrender.com`)*

---

## ⚙️ How to Run the Project Locally

Follow these steps to get the API running on your local machine:

### Prerequisites

* **Node.js** (LTS version recommended)
* **npm** (Node Package Manager, comes with Node.js) or **Yarn**
* **MongoDB Community Server** installed and running, or a MongoDB Atlas cluster.

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-folder>
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set Up Environment Variables:**
    * Create a file named `.env` in the root directory of the project.
    * Copy the content from `.env.example` (see below) into your new `.env` file.
    * Replace the placeholder values with your actual MongoDB connection URI, JWT secret, and other necessary credentials.

4.  **Start the Server:**
    ```bash
    npm start
    # or
    node server.js
    ```
    The server should start on the port specified in your `.env` file (e.g., `http://localhost:5000`). You should see a "MongoDB Connected..." message in your console, followed by "Server running on http://localhost:PORT".

---

## 🧪 How to Run the Seeder

The seeder script `seeder.js` populates your database with dummy user and event data. This is useful for development and testing purposes.

**Important:** Running the seeder will **clear all existing User and Event data** in your connected database before populating new data.

1.  **Ensure MongoDB is running** and your `.env` file's `MONGODB_URI` is correctly configured.
2.  **Run the seeder script:**
    ```bash
    node seeder.js
    ```
    You will see console messages indicating the clearing of data and the seeding process.

---

## 🛠️ .env.example File

Create a file named `.env` in the root of your project and populate it with the following required environment variables, replacing the placeholder values: