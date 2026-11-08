# Appointy

Appointy is a full-stack doctor appointment booking application. Patients can browse doctors and book appointments, while administrators and doctors use separate dashboards to manage doctors, appointments, and profiles.

**Live demo:** [appointy-client.vercel.app](https://appointy-client.vercel.app/)

## Features

### Patient application

- Browse the doctor directory and filter by medical specialty.
- View doctor profiles, availability, fees, and appointment slots.
- Register, sign in, and book appointments.
- View and cancel appointments.
- View and update profile details, including contact information and an avatar.
- Responsive pages for Home, Doctors, About, Contact, Profile, and My Appointments.

### Admin dashboard

- Sign in with administrator credentials configured on the API.
- View counts for doctors, patients, and appointments, plus recent appointments.
- Add doctors, including their profile information and image.
- Browse the doctor list and manage appointment status.

### Doctor dashboard

- Sign in using a doctor account created by an administrator.
- View appointment and patient counts, earnings, and recent appointments.
- View assigned appointments and mark them completed or cancelled.
- Update profile details, fees, address, and availability.

> **Payments:** The patient interface currently displays a “Pay Online” button, but no payment gateway or payment processing flow is implemented in the active application.

## Tech stack

| Area | Technologies |
| --- | --- |
| Patient app and admin dashboard | React 19, Vite 8, React Router, Ant Design, Bootstrap, Sass |
| UI and data utilities | Axios, Framer Motion, React Toastify; date-fns in the patient app and Day.js in the admin app |
| API | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Tokens (JWT), bcrypt |
| Image uploads | Multer and Cloudinary |

## Project structure

```text
Appointy/
├── client/    # Patient-facing React application
├── admin/     # Admin and doctor dashboard
└── server/    # Express API, MongoDB models, routes, and configuration
```

## Getting started

### Prerequisites

- Node.js 20.19+ (or 22.12+) and npm.
- Access to the MongoDB Atlas cluster configured by the API, or update the database connection in `server/config/db.js` for your own MongoDB deployment.
- A Cloudinary account to enable doctor and patient avatar uploads.

### 1. Clone the repository

```bash
git clone https://github.com/tauseefRamzan-dev/Appointy.git
cd Appointy
```

### 2. Configure and start the API

Install the API dependencies:

```bash
cd server
npm install
```

Create `server/.env` with the following values:

```dotenv
PORT=8000
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_NAME=appointy
JWT_SECRET_KEY=replace_with_a_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_a_strong_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

The API reads the MongoDB username, password, and database name from these variables. Its Atlas connection host and replica-set settings are defined in `server/config/db.js`; update that file if you are connecting to a different cluster. Ensure the cluster permits connections from your development machine.

Start the API from the `server` directory:

```bash
npm run dev
```

By default, the API listens on `http://localhost:8000`.

### 3. Configure and start the patient app

In a new terminal:

```bash
cd client
npm install
```

Create `client/.env.local`:

```dotenv
VITE_apiURL=http://localhost:8000
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:5173`).

### 4. Configure and start the admin dashboard

In another terminal:

```bash
cd admin
npm install
```

Create `admin/.env.local` with the same API URL:

```dotenv
VITE_apiURL=http://localhost:8000
```

Start the dashboard:

```bash
npm run dev
```

Open the local URL printed by Vite. If the patient app is already using port 5173, Vite will select another available port.

The admin login uses the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values configured in `server/.env`. Create doctor accounts through the admin dashboard; patients can register through the patient app.

> Keep `.env` files and credentials private. Never commit database, JWT, administrator, or Cloudinary secrets.

## Available scripts

Run these commands from the relevant project directory:

| Directory | Command | Description |
| --- | --- | --- |
| `client/` or `admin/` | `npm run dev` | Start the Vite development server |
| `client/` or `admin/` | `npm run build` | Create a production frontend build |
| `client/` or `admin/` | `npm run preview` | Preview the production build locally |
| `client/` or `admin/` | `npm run lint` | Run ESLint |
| `server/` | `npm run dev` | Start the API with Nodemon |

## API route groups

The API is mounted on the server origin (default `http://localhost:8000`):

| Prefix | Purpose |
| --- | --- |
| `/auth` | Patient, administrator, and doctor authentication and profile lookup |
| `/user` | Patient profile updates |
| `/doctor` | Doctor directory, doctor profile, and doctor dashboard data |
| `/admin` | Admin dashboard data and doctor creation |
| `/appointments` | Appointment booking, listing, cancellation, and completion |

For example, the doctor directory is available at `GET /doctor/getDoctors`.
