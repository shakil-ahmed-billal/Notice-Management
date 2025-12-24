# MERN Fullstack Project: Notice Management System

## 🔗 Live URLs

- **Frontend (Client Live URL):**  
  https://notice-management-ten.vercel.app/notice-board

- **Backend (API Live URL):**  
  https://notice-management-gf6w.vercel.app/

- **GitHub Repository:**  
  https://github.com/shakil-ahmed-billal/Notice-Management.git

---

## 📌 Project Overview

The **Notice Management System** is a MERN (MongoDB, Express.js, React.js, Node.js) fullstack web application designed to manage organizational notices efficiently.

It allows administrators to create, publish, filter, search, and paginate notices while ensuring a clean and responsive user interface. The project follows modern fullstack best practices and meets all technical submission requirements.

### Core Features

- Create notices with validation
- Publish, unpublish, and draft notice status management
- Paginated notice listing (latest notices shown first)
- Filter notices by:
  - Department
  - Status
  - Search keyword
- Responsive UI built with modern components
- RESTful API with pagination and filtering
- Clean separation of frontend and backend

---

## 🚀 Key Functionalities

### 📄 Notice Creation
- Create notice using a structured form
- Dropdown-based notice type selection
- Data is stored securely in MongoDB
- Success confirmation modal after publishing

### 📋 Notice Listing
- Fetch notices from backend API
- Pagination support
- Toggle notice status (Published / Unpublished)
- Search by title
- Filter by department and status

### 🔌 API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/v1/notices` | Create a new notice |
| GET | `/api/v1/notices` | Get all notices with pagination & filters |
| GET | `/api/v1/notices/:id` | Get a single notice |
| PUT | `/api/v1/notices/:id` | Update notice status |
| DELETE | `/api/v1/notices/:id` | Delete notice (optional) |

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query (TanStack Query)
- React Hook Form

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

### Deployment
- **Frontend:** Vercel
- **Backend:** Vercel

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (Local or MongoDB Atlas)

---

## 📥 Clone the Repository

```bash
git clone https://github.com/shakil-ahmed-billal/Notice-Management.git
cd Notice-Management


## 📦 Install Dependencies server
```
PORT=8000
MONGO_URI=mongodb_uri
```


## 📦 Install Dependencies clien
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
