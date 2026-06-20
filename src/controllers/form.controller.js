import { Form } from "../models/form.model.js"
import crypto from "crypto";

const createForm = async (req,res) => {
    try {
        if(!req.session.user) return res.render("/login", {error: "you must log in to create a form"})
        const {title,questions} = req.body;
        //check if all the fields filled
        if (!title || !questions) {
                return res.render("forms/create", {error: "All fields are required",oldData: req.body});
            }
        //check if questions array is not empty
        if (!Array.isArray(questions) || questions.length === 0) {
             return res.render("forms/create", {error: "Form must contain at least one question",oldData: req.body});
            }
        //check if each questions has a valid text
        for (const question of questions) {
             if (!question.questionText?.trim()) {
                     return res.render("forms/create", {error: "Question Text is required",oldData: req.body});
                    }
             question.isRequired = Boolean(question.isRequired);   
            }
        
        const newForm =await Form.create({
            title:title,
            createdBy:req.session.user._id,
            sharedId:crypto.randomBytes(8).toString("hex"),
            questions:questions
        })
        req.session.successMessage = "Form created successfully";
        return res.redirect("/forms/dashboard");
    
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

const getForm = async (req,res)=> {
    try {
        const sharedId = req.params.sharedId;
        const form =await Form.findOne({sharedId:sharedId});
        if(!form) {return res.render("/", {error: "form not found"})}
        return res.render("forms/publicForm",{form});
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

const getFormForEdit = async (req,res)=>{
    try {

        const form = await Form.findById(req.params.id);

        if(!form) {return res.render("/", {error: "form not found"})}

        if(!form.createdBy.equals(req.session.user._id)){
            return res.render("/", {error: "you are not authorized to view this form"})
        }
        
        return res.render("forms/edit",{form});

    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}

const getForms = async (req,res)=> {
    try {
        if(!req.session.user) return res.render("/", {error: "you are not authorized you must log in"})
        const userId = req.session.user._id;
        const forms =await Form.find({createdBy:userId});
        return res.render("forms/dashboard",{forms});
    
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}


const updateForm = async (req, res) => {
    try {

        // check if form exists
        const form = await Form.findById(req.params.id);

        if (!form) {
            return res.render("/", {error: "form not found"})
        }

        // check ownership
        if (!form.createdBy.equals(req.session.user._id)) {
            return res.render("/", {
                error: "You are not authorized to edit this form"
            });
        }

        // check if request body is empty
        if (Object.keys(req.body).length === 0) {
            return res.render("forms/update", {
                form,
                error: "No data provided for update",
                oldData: req.body
            });
        }

        // convert checkbox values to boolean
        if (req.body.questions) {
            for (const question of req.body.questions) {
                question.isRequired = Boolean(question.isRequired);
            }
        }

        // update form
        Object.assign(form, req.body);
        await form.save();

        // success message
        req.session.successMessage = "Form updated successfully";

        return res.redirect("/forms/dashboard");

    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
};



const deleteForm = async (req,res) => {
    try {
        const deleted = await Form.findById(req.params.id);

        if(!deleted) res.render("forms/dashboard", {error: "Form not found"})
        //check if the user is the owner
        if(!deleted.createdBy.equals(req.session.user._id)) return res.render("/", {error: "you are not authorized you are not the owner"})
        //deletion
        await deleted.deleteOne()

        req.session.successMessage = "Form deleted successfully";

        return res.redirect("/forms/dashboard");

        
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}
export {createForm,getForm,getFormForEdit,getForms,updateForm,deleteForm}