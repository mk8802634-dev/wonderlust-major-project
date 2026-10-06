# 🏡 Wonderlust — Travel Listing Web Application

A full-stack travel listing web application where users can discover, create, edit, and manage travel listings with images, reviews, authentication, and interactive maps.

## 🌐 Live Demo

https://wonderlust-major-project-zhon.onrender.com

## 📂 GitHub Repository

https://github.com/mk8802634-dev/wonderlust-major-project

---

## ✨ Features

- 🔐 User Registration, Login & Logout
- 👤 Authentication using Passport.js
- 🔒 Authorization and owner-based access control
- 🏡 Create, Read, Update and Delete travel listings
- 🖼️ Image upload and cloud storage using Cloudinary
- 🔎 Search listings by destination/location
- ⭐ Reviews and ratings
- 🗺️ Interactive maps using Mapbox
- 📍 Location geocoding using Mapbox
- ⚡ Flash messages for success and error feedback
- 🛡️ Server-side validation
- 🚨 Centralized error handling
- ☁️ MongoDB Atlas database
- 🚀 Deployed on Render

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS
- Bootstrap

### Backend
- Node.js
- Express.js
- EJS-Mate

### Database
- MongoDB
- Mongoose
- MongoDB Atlas

### Authentication
- Passport.js
- Passport-Local
- Express-Session
- Connect-Mongo

### Cloud Services
- Cloudinary — Image Storage
- Mapbox — Geocoding & Maps
- Render — Deployment

### Other Tools
- Multer
- Method-Override
- Connect-Flash
- Git & GitHub

---

## 🏗️ Project Architecture

The application follows an MVC-style architecture.

```text
Wonderlust
│
├── MODELS
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── Routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── controllers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── views
│   ├── layouts
│   ├── listings
│   ├── users
│   └── includes
│
├── public
│   ├── css
│   └── js
│
├── utils
│
├── cloudConfig.js
├── middleware.js
├── schema.js
├── app.js
├── package.json
└── README.md
