import { Router } from "express";
import { registerUser,loginUser,logoutUser,getUsers } from "../controllers/user.controller.js"

const router =Router ();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/getusers').get(getUsers);
router.get("/login", (req, res) => {
    res.render("auth/login",{oldData:{}});
});
router.get("/register", (req, res) => {
    res.render("auth/register",{oldData:{}});
});


export default router;