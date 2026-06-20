import express from "express"
import "dotenv/config";
import session from "express-session"
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

const app = express()

// dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:60000 * 60
    }
  })
);

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use((req, res, next) => {
    res.locals.successMessage = req.session.successMessage;
    res.locals.errorMessage = req.session.errorMessage;

    delete req.session.successMessage;
    delete req.session.errorMessage;

    next();
});

app.use(methodOverride("_method"));

//routes import
import userRouter from "./routes/user.route.js"
import formRouter from "./routes/form.route.js"
import submissionRouter from "./routes/submission.route.js"

//routes decleration
app.use("/",userRouter)
app.use("/forms",formRouter)
app.use("/form",submissionRouter)

//EJS Rendering
app.get("/", (req, res) => {
    res.render("index");
});




export default app;