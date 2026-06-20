import { User } from "../models/user.model.js"

const registerUser = async (req,res) => {

    try {
            const {name,username,email,password} = req.body;
            // basic validation
            if (!name || !username || !password || !email) {
                return res.render("auth/register",{error:"All fields are important",oldData:{name,username,email}})
            }

            //check if user is already existing 
            const existing = await User.findOne({$or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]})
            if (existing) {
                return res.render("auth/register",{error:"user already exists",oldData:{name,username,email}})
            }

            //create user
            const user = await User.create({
                name,
                username:username.toLowerCase(),
                email :email.toLowerCase(),
                password,
                loggedIn:false,
            });

        req.session.successMessage = `Account created successfully please log in to continue`;
        return res.redirect("/login");

    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

const loginUser = async (req,res) => {
try {
        const {username,password} = req.body
        //check if the user Exists
        const existing = await User.findOne({username:username.toLowerCase()})
        if(!existing){
            return res.render("auth/login", {error: "Invalid username or password",oldData:{username}});
        }
        //compare password
        const isMatch = await existing.comparePassword(password)
        if(!isMatch) return res.render("auth/login", {error: "Invalid username or password",oldData:{username}});
        
        existing.loggedIn = true;
        await existing.save();
        req.session.user = {
                 _id: existing._id,
                 username: existing.username
                };
        req.session.successMessage = `Welcome back ${existing.name}`;
        return res.redirect("/");

} catch (error) {
    return res.status(500).json({message: "internal server error",error:error.message});
}
}

const logoutUser = async (req,res) => {
    try {
            //check if the user Exists
            if(req.session.user){
                 await User.findByIdAndUpdate(req.session.user._id,{loggedIn: false})
            }
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({message:"error destroying session"})
                }
            });
            return res.redirect("/");
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }  
}

const getUsers = async (req,res) => {
    try {
            if(!req.session.user) return res.status(401).json({message:'not authorized'})
            const users = await User.find();
            return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

export {registerUser,
        loginUser,
        logoutUser,
        getUsers
};