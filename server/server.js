const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

const app = express();

// Increase payload size limit (e.g. 10MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://todo-list-server-six.vercel.app']
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!', method: req.method, path: req.path });
});

app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/todos', require('./routes/todoRoutes')); // Todo routes

// Start server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, (err) => {
//     if (err) {
//         console.error('❌ Server failed to start:', err);
//     } else {
//         console.log(` Server is running on http://localhost:${PORT}`);
//     }
// });

module.exports = app;