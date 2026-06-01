import { User } from "../models/user.model.js"

const registerUser = async (req,res) => {

    try {
            const {username,email,password} = req.body;
            // basic validation
            if (!username || !password || !email) {
                return res.status(400).json({message: "All Fields Are Important!"})
            }

            //check if user is already existing 
            const existing = await User.findOne({email : email.toLowerCase()})
            if (existing) {
                return res.status(400).json({message: "User Already Exists"})
            }

            //create user
            const user = await User.create({
                username,
                email :email.toLowerCase(),
                password,
                loggedIn:false,
            });

            return res.status(201).json({message: "User Created Succesfully", user:{id:user._id,email:user.email,username:user.username}})
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
            return res.status(404).json({message:"user not found"})
        }
        //compare password
        const isMatch = await existing.comparePassword(password)
        if(!isMatch) return res.status(400).json({message:"password is invalid"})
        
        existing.loggedIn = true;
        await existing.save();
        return res.status(200).json({message:"user logged in", user:{id:existing._id,email:existing.email,username:existing.username}})  

} catch (error) {
    return res.status(500).json({message: "internal server error",error:error.message});
}
}

const logoutUser = async (req,res) => {
    try {
        const {username} = req.body
            //check if the user Exists
            const existing = await User.findOne({username:username.toLowerCase()})
            if(!existing){
                return res.status(404).json({message:"user not found"})
            }
            existing.loggedIn = false;
            await existing.save();
            return res.status(200).json({message:"user loggedout successfully"})
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }  
}

const getUsers = async (req,res) => {
    try {
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