# MERN Fullstack Project: Notice Management System

## Project Overview

This project is a MERN (MongoDB, Express, React, Node.js) fullstack application built for managing notices. The application is designed to meet the technical requirements provided in the task description, including responsive front-end components, backend API for notice CRUD operations, and deployment to a cloud platform.

### Features:
- **Create Notice Form**: Allows users to create notices with validation.
  - "Notice Type" as a dropdown.
  - Data is persisted in the database after submission.
  - Upon successful submission, a "Notice Published Successfully" popup is displayed.
  
- **Notice Listing Page**: Displays a list of notices fetched from the backend API.
  - Includes a toggle to change the status of each notice (published/unpublished).
  - Pagination is implemented for listing notices.

- **API Endpoints**:
  - **POST** `/api/v1/notices`: Create a new notice.
  - **GET** `/api/v1/notices`: Fetch all notices, with filtering by active or draft status.
  - **PUT** `/api/v1/notices/:id`: Update the status of a notice (published/unpublished).
  - **GET** `/api/v1/notices/:id`: View a single notice (optional).

- **MongoDB**: Used for storing notice data, structured in a way to support easy filtering and updating.

## Tech Stack

- **Frontend**:
  - React.js
  - Next.js
  - Tailwind CSS
  - Form Validation (React Hook Form or similar)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose ODM)

- **Deployment**:
  - Vercel/Render/Railway (Frontend + Backend)

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14.x or above)
- **MongoDB** (either local or cloud instance)

### Installation Steps

#### Clone the Repository
```bash
git clone <https://github.com/shakil-ahmed-billal/Notice-Management>
cd <Notice-Management>
