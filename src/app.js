import express from "express"
import "dotenv/config";
import session from "express-session"

const app = express()
app.use(express.json())
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

//routes import
import userRouter from "./routes/user.route.js"
import formRouter from "./routes/form.route.js"


//routes decleration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/forms",formRouter)
app.get("/" ,(req,res) => {
    console.log(req.session)
    console.log(req.sessionID)
    req.session.visited=true;
    res.status(201).send({msg:'hello'})
})
export default app;