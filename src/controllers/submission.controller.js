import { Form } from "../models/form.model.js";
import {Submission} from "../models/submission.model.js"

const createSubmission = async (req,res) => {
    try {
        const {name,email,answers} = req.body;
        if (!name || !email || !answers) {
                return res.status(400).json({message: "All Fields Are Important!"})
            }

        const form = await Form.findOne({sharedId:req.params.sharedId})
        if(!form) return res.status(404).json({message: "form not found"})
        
        //check if answers are a valid array
        if (!Array.isArray(answers)) {
                    return res.status(400).json({message: "answers must be an array"});
                }
        //check if answers are not empty
        if (answers.length === 0) {
                    return res.status(400).json({message: "answers are required"});
                }
        //we need to customize the question id after making the front for this project
        const formattedAnswers = answers.map((answer, index) => ({
            questionId: form.questions[index]._id,
            answerValue: answer
        }));
        const newSubmission = await Submission.create({
            name:name,
            email:email,
            form_id:form._id,
            answers:formattedAnswers
        })
        form.responsesCount++;
        await form.save();
        return res.status(201).json({message:"submission done successfuly"})
    
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

const getSubmissions = async (req,res)=> {
    try {    
        if(!req.session.user) return res.status(401).json({message:"not authorized you must log in"})
        const sharedId = req.params.sharedId;
        const form = await Form.findOne({sharedId:sharedId})
        if(!form) return res.status(404).json({message: "form not found"})
        
        const userId = req.session.user._id;
        if(!form.createdBy.equals(req.session.user._id)) return res.status(401).json({message:"not authorized for this form you are not the owner"})
        
        const submissions = await Submission.find({form_id:form._id})
        return res.render("forms/responses",{submissions,form});
    
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

export {createSubmission,getSubmissions}