# 🛠️ Equipmentals.pk - Full-Stack E-Commerce Platform

## 📖 Project Description
Equipmentals.pk is a comprehensive full-stack e-commerce and equipment rental platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Designed as a Final Year Project (FYP), it provides a seamless user experience for browsing, managing, and purchasing/renting premium equipment. The platform integrates secure authentication, payment processing, customized admin dashboards, and responsive front-end components to deliver a modern web application.

## 🎯 Key Features
- **User Authentication & Authorization**: Secure login, registration, password recovery, and role-based access control (Admin/User) using JSON Web Tokens (JWT).
- **Product Management**: Complete CRUD operations for equipment, including advanced search, filtering, pagination, and multi-image uploads.
- **Interactive Admin Dashboard**: Centralized control panel for managing users, products, orders, and viewing platform analytics with real-time charts.
- **Cart & Order Processing**: Fully functional cart system with state management using Redux, enabling seamless checkout and order tracking.
- **Payment Integration**: Secure online payment gateways utilizing the Stripe API.
- **User Reviews & Ratings**: Allow users to leave feedback and rate their borrowed or purchased equipment.
- **Responsive UI/UX**: Built with modern Material-UI components mapping perfectly to multiple screen sizes.

## 🛠️ Technologies Used
- **Frontend**: React.js, Redux, Material-UI, Bootstrap, Axios, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Cloud Storage**: Cloudinary (Image handling)
- **Authentication/Security**: bcryptjs, jsonwebtoken (JWT), validator, cookie-parser
- **Payments**: Stripe API
- **Mailing Service**: Nodemailer (Password resets & notifications)

## 🏗️ Project Architecture
The platform follows a standard Model-View-Controller (MVC) architecture separated into two main applications:
- **Client (Frontend)**: A React-based Single Page Application (SPA) consuming RESTful APIs. It implements global state management using Redux.
- **Server (Backend)**: An Express.js Node application connected to a MongoDB cluster. It exposes API endpoints (`/api/v1/...`) securely for the frontend clients.

## ⚙️ How the System Works
1. **Frontend to Backend Communication**: Users interact with the React frontend interfaces, which dispatch asynchronous Redux actions using Axios to the Node.js API.
2. **Data Handling**: The Express middleware processes the requests (handling authentication tokens, parsing data, and file uploads via Cloudinary).
3. **Database Operations**: Mongoose schemas validate and structure the data before querying or persisting user and product information into MongoDB.
4. **Response**: The Backend returns JSON responses, allowing the React UI to intuitively update local state and provide immediate visual feedback.

## 🚀 Installation Instructions
### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local instance or MongoDB Atlas Cloud)
- API Keys for Stripe, Cloudinary, and your chosen SMTP Service.

### Backend Setup
1. Open up your terminal and clone the repository.
2. Change directories into the root folder.
3. Install the backend dependencies:
   ```bash
   npm install
   ```
4. Create a `config.env` file within the `backend/config` directory using the provided format:
   ```env
   PORT=4000
   DB_URI=your_mongodb_connection_string
   STRIPE_API_KEY=your_stripe_api_key
   STRIPE_SECRET_KEY=your_stripe_secret
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=5d
   COOKIE_EXPIRE=5
   SMPT_SERVICE=gmail
   SMPT_MAIL=your_email@gmail.com
   SMPT_PASSWORD=your_email_password
   SMPT_HOST=smtp.gmail.com
   SMPT_PORT=465
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

### Frontend Setup
1. Open a separate terminal window and switch to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```

## ▶️ How to Run the Project
1. **Start the Backend Server** (From the root directory):
   ```bash
   npm run dev
   ```
2. **Start the Frontend Application** (From the `frontend` directory):
   ```bash
   npm start
   ```
The frontend application will load locally on `http://localhost:3000`.

## 📁 Code Structure Explanation
```text
📦 FYP-Equipmentals.pk
 ┣ 📂 backend
 ┃ ┣ 📂 config       # Configuration files (Database connection, Env Variables)
 ┃ ┣ 📂 controllers  # Core logic mapped to route endpoints
 ┃ ┣ 📂 middleware   # Authentication, error handling, catch-async blocks
 ┃ ┣ 📂 models       # Mongoose schemas for MongoDB (User, Product, etc)
 ┃ ┣ 📂 routes       # Express routing defining the API paths
 ┃ ┣ 📂 utils        # Reusable helpers (JWT token creation, Emailing, API features)
 ┃ ┗ 📜 server.js    # Entry point of the Express server
 ┣ 📂 frontend
 ┃ ┣ 📂 public       # Static assets and index.html
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 actions    # Redux asynchronous functions making HTTP calls
 ┃ ┃ ┣ 📂 component  # Reusable React UI components (grouped by logic models)
 ┃ ┃ ┣ 📂 constants  # Redux action identifiers
 ┃ ┃ ┣ 📂 reducers   # Functions specifying how the application's state changes
 ┃ ┃ ┣ 📜 App.js     # React application router tree and root integrations
 ┃ ┃ ┣ 📜 index.js   # Application renderer mounting on the DOM
 ┃ ┃ ┗ 📜 store.js   # Centralized Redux store setup
 ┣ 📜 package.json   # Base dependencies and scripts
 ┗ 📜 README.md      # Documentation Entry
```

## 🧠 Key Algorithms / Technical Concepts
- **Custom Error Handling**: Utilizes orchestrated error handling middleware for unified response formats globally, capturing unhandled promise rejections seamlessly.
- **Redux State Management Framework**: Advanced implementation of reducers and actions enforcing monotonic flow of UI state, specifically addressing shopping carts and persisting logic.
- **Bcrypt Password Hashing & JWT**: Secure storage of user credentials using highly secure hash salting methodologies and secure cookie-based session verification.
- **Pagination & Advanced API Searching**: Highly scalable database querying utilizing custom API classes for dynamic search filtering, sorting, and pagination scaling seamlessly with increasing data.

## 🖼️ Example Output or Screenshots

> *(Note: To add actual screenshots, upload images to the repository and link them here.)*

- **Homepage UI**: Displays premium design layout and highlighted product categories.
- **Admin Dashboard**: Visualizes orders, products, and overall platform metrics with integrated interactive graphs.
- **Secure Checkout Flow**: Incorporates Stripe checkout securely collecting customer payment intents.

## 🚀 Future Improvements
- **Component Refinement**: Reactivate and expand currently inactive Order processing code pieces to ensure end-to-end checkout paths.
- **Dockerization**: Create Docker container setups for the frontend, backend, and MongoDB instances for easier shipping and building.
- **Testing Suite**: Implement automated testing routines encompassing unit integration tests via Jest and React Testing Library.
- **TypeScript Migration**: Enhance scaling robustness and component typing on both Node and React apps by porting the codebase securely to TypeScript.

## 👥 Author Information
- **Developed by**: [Shahman Butt](https://github.com/Shahman-Butt)
- **Project Type**: Final Year Project (FYP) for University Degree Requirement

---

**Equipmentals.pk** delivers a professional, complete full-stack web application structure ensuring optimal performance, clear feature boundaries, and robust design practices.