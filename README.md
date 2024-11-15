# Phonebook REST API with Express

This repository contains a basic REST API for a phonebook application built with Express.js. This API serves as the backend for managing contact information, including names, phone numbers, and other essential details. The backend is designed to be part of a full-stack application, with plans to connect it to a React frontend.

## Overview

The API enables basic CRUD (Create, Read, Update, Delete) operations for contact management in a phonebook app. It is structured with REST principles, making it scalable and easy to integrate with frontend applications like React.

## Features

- **Express.js**: This backend is powered by Express, a lightweight and efficient Node.js framework.
- **RESTful Architecture**: Organized with REST principles to provide a simple and intuitive API structure.
- **JSON Support**: Handles requests and responses in JSON format, ideal for integration with frontend frameworks.

## Future Plans

- **Full-Stack Integration**: This backend will be integrated with a React frontend to provide a complete phonebook application.
- **Additional Features**: Future enhancements will include advanced search, filtering options, and user authentication.

## Getting Started

### Prerequisites

- **Node.js** and **npm**: Ensure you have Node.js and npm installed on your system.

### Installation

1. Clone the repository:
   `git clone https://github.com/yourusername/backend_phonebook.git`
   
2. Navigate to the project directory:
`cd backend_phonebook`

3. Install dependencies:
`npm install`

4. Running the Server
Start the server in development mode:
`npm start`
By default, the server will run on http://localhost:3001.

- API Endpoints
Base URL
`http://localhost:3001`


Data Structure
Each contact in the phonebook has the following structure:
```
{
  "id": "unique_id",
  "name": "Contact Name",
  "number": "Contact Phone Number"
}
