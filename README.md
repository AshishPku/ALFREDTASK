# ALFREDTASK

ALFREDTASK is a web-based task management application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to create, manage, and track tasks efficiently with a user-friendly interface.

## Features

- **User Authentication**: Secure login and registration system.
- **Task Management**: Create, update, delete, and categorize tasks.
- **Real-Time Updates**: Dynamic updates using React state management.
- **RESTful API**: Backend powered by Express.js and MongoDB.
- **Responsive UI**: Built with React and styled for a seamless experience.
- **API Integration**: Utilizes Axios for client-server communication.

## Tech Stack

### Frontend:
- React.js
- Vite
- Axios
- CSS (or styled-components, if applicable)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose for ODM)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- MongoDB (running locally or using a cloud service like MongoDB Atlas)
- Git

### Steps to Run Locally

#### 1. Clone the repository
```sh
git clone https://github.com/AshishPku/ALFREDTASK.git
cd ALFREDTASK
```

#### 2. Install backend dependencies
```sh
npm install
```

#### 3. Set up environment variables
Create a `.env` file in the root directory and add the required variables:
```env
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
JWT_SECRET=<your_secret_key>
```

#### 4. Start the backend server
```sh
npm start
```

#### 5. Install frontend dependencies
```sh
cd client
npm install
```

#### 6. Start the frontend
```sh
npm run dev
```

## Deployment

### Render Deployment (Backend)
1. Push your code to GitHub.
2. Go to [Render](https://render.com/), create a new web service, and connect your repository.
3. Set the build and start commands:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables under **Settings > Environment**.
5. Deploy and test your API.

### Render Deployment (Frontend)
1. In `client/package.json`, ensure `axios` is installed:
   ```sh
   npm install axios
   ```
2. Add the backend URL in `client/.env`:
   ```env
   VITE_API_URL=<your_backend_url>
   ```
3. Deploy the frontend on platforms like **Vercel** or **Render**.

## Troubleshooting

### Axios Import Error in Render Deployment
If you face `Rollup failed to resolve import "axios"` error:
1. Navigate to the `client` folder and install axios:
   ```sh
   cd client
   npm install axios
   ```
2. Rebuild and redeploy.

## Contributing
Pull requests are welcome. Please follow proper coding conventions and ensure to test the changes before submitting.

## License
This project is licensed under the MIT License.

