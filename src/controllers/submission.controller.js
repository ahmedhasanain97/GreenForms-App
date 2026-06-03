import { Form } from "../models/form.model.js";
import Submission from "../models/submission.model.js"

const createSubmission = async (req,res) => {
    try {
        const {name,email,sharedId,answers} = req.body;
        if (!name || !email || !sharedId || !answers) {
                return res.status(400).json({message: "All Fields Are Important!"})
            }

        const form = Form.findOne({sharedId:sharedId})
        if(!form) return res.status(404).json({message: "form not found"})
        
        //we need to customize the question id after making the front for this project
        const newSubmission = await Form.create({
            name:title,
            createdBy:req.session.user._id,
            sharedId:crypto.randomBytes(8).toString("hex"),
            questions:questions
        })
        return res.status(201).json({message:"Form Created successfuly"})
    
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

const getSubmissions = async (req,res)=> {
    try {    
        if(!req.session.user) return res.status(401).json({message:"not authorized you must log in"})
        const sharedId = req.body;
        const form = Form.findOne({sharedId:sharedId})
        if(!form) return res.status(404).json({message: "form not found"})
        
        const userId = req.session.user._id;
        if(form.createdBy != userId) return res.status(401).json({message:"not authorized for this form"})
        
        const submissions = Submission.find({form_id:form.form_id})
        return res.status(200).json(submissions)
    
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

export {createForm,getForms}