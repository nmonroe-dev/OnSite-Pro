# On-Site Pro


On-Site Pro is a comprehensive application designed to streamline well site management, offering features such as well check-ins, emergency contacts, incident reporting, and more. This app ensures safe and efficient operations for contractors, vendors, and administrators.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Demo

View the live demo: [On-Site Pro](https://github.com/nmonroe-dev/OnSite-Pro.git)

## Features

- **Authentication**: Login and sign-up functionality.
- **Well Management**: Add, view, and manage well sites.
- **Incident Reporting**: Submit and track incidents at well sites.
- **Emergency Contacts**: Access emergency contact details for each site.
- **Check-In/Check-Out**: Manage user presence at well sites.
- **JSA Upload**: Upload and acknowledge Job Safety Analysis (JSA) documents.
- **Nearest Hospital**: Locate and view the nearest hospital to a site.
- **Mobile-Friendly**: Optimized design for mobile devices.

## Tech Stack

### Frontend
- React
- React Router
- Axios
- React-Leaflet (for map integration)
- Font Awesome (icons)
- CSS (custom styles)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose for ORM)
- JWT (for authentication)

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) database running

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/nmonroe-dev/OnSite-Pro.git
   cd OnSite-Pro
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `server` directory and add the following:
     ```env
     PORT=4004
     MONGO_URI=your_mongo_database_uri
     JWT_SECRET=your_jwt_secret
     ```

4. Start the application:
   ```bash
   # Start the backend server
   cd backend
   node server.js

   # Start the frontend server
   cd ../client
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Usage

1. Register or log in to access the dashboard.
2. Select a well to manage or add a new well (Admin-only feature).
3. Access various features such as incident reporting, emergency contacts, or JSA uploads.

## Project Structure

```
OnSite-Pro/
├── client/           # React frontend
│   ├── public/       # Public assets
│   ├── src/          # Source files
│       ├── components/ # React components
│       ├── pages/       # React pages
│       ├── styles/      # CSS files
│       ├── App.jsx      # Main App component
│       ├── index.js     # Entry point
│
├── backend/           # Node.js backend
│   ├── controllers/  # Route handlers
│   ├── models/       # Mongoose schemas
│   ├── routes/       # Express routes
│   ├── utils/        # Helper functions
│   ├── server.js     # Entry point
│
├── README.md         # Project documentation
├── .env.example      # Environment variable example
```

## API Routes

### Authentication
- `POST /register`: Register a new user
- `POST /login`: Authenticate a user

### Well Management
- `GET /wells`: Fetch all wells
- `POST /well`: Add a new well (Admin-only)

### Incidents
- `POST /:wellId/incident`: Submit an incident report

### Emergency Contacts
- `GET /:wellId/emergencyContacts`: Fetch emergency contacts

### JSA
- `POST /:wellId/uploadJsa`: Upload JSA document
- `GET /:wellId/jsa`: Fetch JSA document
- `POST /:wellId/acknowledgeJsa`: Acknowledge JSA

### Miscellaneous
- `GET /:wellId/checkedInUsers`: View checked-in users
- `POST /:wellId/checkin`: Check-in user
- `POST /:wellId/checkout`: Check-out user

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding with **On-Site Pro**! 🚀
