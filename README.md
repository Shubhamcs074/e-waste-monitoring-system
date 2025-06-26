# ♻️ E-Waste Monitoring System

An end-to-end web platform to track, assign, and manage e-waste collection, built using **Django REST API (backend)** and **React.js (frontend)**.

---

## 📦 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React.js, Tailwind CSS, Axios     |
| Backend   | Django REST Framework             |
| Database  | SQLite (for dev)                  |
| Auth      | JWT Authentication                |
| Hosting   | Local (Ready for Render/Vercel)   |

---

## 🔑 Features

### 👤 User
- Register/Login
- Add electronic devices
- Raise pickup requests
- View request status

### 🛠 Recycler
- Login & view assigned pickups
- Update status: `pending → in-progress → completed`

### 🛡️ Admin
- View unassigned requests
- Assign recyclers
- View analytics dashboard:
  - Total users
  - Requests (pending/assigned/completed)
  - Recyclers

---

## 🚀 Running Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Shubhamcs074/e-waste-monitoring-system
cd e-waste-monitoring-system

```
---
### 2. Backend Setup (/ewaste_backend/)

```bash
cd ewaste_backend
python -m venv env
env\Scripts\activate  # On Linux/Mac: source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
#### Django runs on: http://127.0.0.1:8000/
---

### 3. Frontend Setup (/ewaste-frontend/)
```bash
cd ewaste-frontend
npm install
npm start
```
#### React runs on: http://localhost:3000/
---
### 🔐 Roles & Test Users
| Role     | Username   | Password |
| -------- | ---------- | -------- |
| Admin    | admin      | -------- |
| Recycler | recycler01 | -------- |
| User     | user01     | -------  |

---
### 📁 Folder Structure
```
e-waste-monitoring-system/
├── ewaste_backend/          # Django REST API
├── ewaste-frontend/         # React.js Frontend
├── README.md
└── .gitignore
```
---
### 🌐 Future Enhancements
Email notifications

Google Maps for address

Deployment to Render/Vercel

Role-based dashboards with filters

---

### 📜 License

#### MIT © Shubham Saini

```bash
git add .gitignore README.md
git commit -m "📘 Added README and .gitignore"
git push origin main
```
---
