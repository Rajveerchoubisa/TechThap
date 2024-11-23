
techThap is a social media platform social media platform that offers a range of modern features, including a vibrant home content feed, user authentication, and real-time messaging powered by Socket.IO. (Notifications button is only for display)

**Real-Time Messaging**


## Installation

Installation is needed in both frontend and backend folders using command

```bash
npm install
```

## Setup .env file

```javascript
PORT=...
MONGO_URI=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Start the app

**Note:** You will need to update the start commands for both the frontend and backend, as well as the server startup in the backend, due to the production build of the files. After that use the following commands:

```javascript
// For frontend
npm run dev

// For backend
node server.js
```
