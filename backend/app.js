import path from 'path';
import express from 'express';
import { port } from './config/config.js';
import connectDB from './config/db.js';
import chalk from 'chalk';
import userRoutes from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import cookieParser from 'cookie-parser';
import { customError } from './util/customError.js';
// import { authenticate } from './middlewares/authMiddleware.js';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
// import helmet from 'helmet';

const PORT = port || 5000;

const app = express();
app.use(morgan("dev"));

// CORS configuration
const whiteList = ['http://localhost:5000', 'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions)); // Use CORS with the defined options

app.use(express.json());
// app.use(helmet())
// token-ka waaye
app.use(cookieParser());

const apiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 25000,
    message: 'Rate Limit Exceeded sxb..'
});

// shaqada halke ka bilaabaneesay  // Routes management
// app.use('/api/v1/test',  authenticate, userRoutes)
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoute);

// PRODUCTION DEPLOYMENT
if(process.env.NODE_ENV == 'production'){

    // _dirname : wxu soo celinaa root appkena sida D:\Backend\Fullstack_Blog\backend/hebel
    const __dirname = path.resolve();
    // mddlleware waaye, folders-ka static ga ah oo folder-keena ku jira ayuu so aqrinaa
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    // wxii request oo dhan oo imaada
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    });


}else {
    app.get('/api', (req,res) => {
        res.send("Api is Running");
    });
}

// utilities waaye waana middleware oo haddi lacalla user-ka error yimado cml
app.use((req, res, next) => {
    next(customError(404, `${req.originalUrl} The page that you're looking is not found`));
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(status).send(message);
});

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`${chalk.bgWhiteBright.bold('Server is listening on port ')}${chalk.yellow.bold(PORT)}`);
});
