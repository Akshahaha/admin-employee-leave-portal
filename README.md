# Leave Management System

## Overview
This project is a Leave Management System built using Node.js, React, and MySQL. It allows employees to apply for leave, view leave history, and update leave statuses.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MySQL
- **Other Tools**: Postman, MySQL Workbench

## Features
- User authentication using tokens
- Leave application and history tracking
- Department and employee management
- Role-based access control

## Installation
### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- MySQL

### Steps to Set Up
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the server directory:
   ```sh
   cd server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `server` directory and add your database credentials.
5. Run the server:
   ```sh
   node app.js
   ```

## API Endpoints
### Authentication
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration

### Employee Management
- `GET /api/employees` - Get employee data
- `GET /api/employees/profile/:id` - Get employee profile by ID

### Leave Management
- `POST /api/leave-applications/apply` - Apply for leave
- `GET /api/leave-applications/history` - Get leave history
- `PUT /api/leave-applications/update-status/:id` - Update leave status



