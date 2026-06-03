import { Form } from "../models/form.model.js"
import crypto from "crypto";

const createForm = async (req,res) => {
    try {
        if(!req.session.user) return res.status(401).json({message:"not authorized you must log in"})
        const {title,questions} = req.body;
        if (!title || !questions) {
                return res.status(400).json({message: "All Fields Are Important!"})
            }
        const newForm =await Form.create({
            title:title,
            createdBy:req.session.user._id,
            sharedId:crypto.randomBytes(8).toString("hex"),
            questions:questions
        })
        return res.status(201).json({message:"Form Created successfuly"})
    
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

const getForms = async (req,res)=> {
    try {
        if(!req.session.user) return res.status(401).json({message:"not authorized you must log in"})
        const userId = req.session.user._id;
        const forms =await Form.find({createdBy:userId});
        return res.status(200).json(forms)
    
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

const updateForm = async (req,res) => {
    try {
        // basic validation
        if(Object.keys(req.body).length === 0) {return res.status(400).json({message:"no data provided for update"})}

        const form = await Form.findByIdAndUpdate(req.params.id, req.body,{new:true})

        if(!form) {return res.status(404).json({message:"Form not found"})}

        return res.status(200).json({message:"form updated",form})

        
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}

const deleteForm = async (req,res) => {
    try {
        const deleted = await Form.findByIdAndDelete(req.params.id)

        if(!deleted) {return res.status(404).json({message:"Form not found"})}

        return res.status(200).json({message:"Form deleted"})

        
    } catch (error) {
        return res.status(500).json({message: "internal server error",error:error.message});
    }
}
export {createForm,getForms,updateForm,deleteForm}