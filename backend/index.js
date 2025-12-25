import express, { urlencoded } from "express";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"
import path from "path";


// Load env from backend/.env explicitly so running from repo root still works
dotenv.config();


console.log("This means dotenv is readed");
// connect db
connectDB();

console.log("database is connected");
const PORT = process.env.PORT || 8080;
const app = express();

console.log("after connecting the db")

const _dirname = path.resolve();

console.log("hello");

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow localhost for development
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }
        
        // Allow all Vercel deployments (preview and production)
        if (origin.includes('.vercel.app') || origin === 'https://career-nest-job-hunt-website.vercel.app') {
            return callback(null, true);
        }
        
        // Allow custom frontend URL if set
        if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
            return callback(null, true);
        }
        
        // Allow the request
        callback(null, true);
    },
    credentials: true
}
app.use(cors(corsOptions));

// api's route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
  res.send("CareerNest API is running 🚀");
});

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
