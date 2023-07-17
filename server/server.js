import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))    // To print server request
app.disable('x-powered-by');     // less hacker know about the stack

const PORT = 8066;

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(200).json("Home Page")
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server Connected to http://localhost:${PORT}`);
})