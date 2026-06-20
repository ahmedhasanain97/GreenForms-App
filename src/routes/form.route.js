import { Router } from "express";
import {createForm,getForm,getFormForEdit,getForms,updateForm,deleteForm } from "../controllers/form.controller.js"

const router = Router();

router.route("/create").post(createForm);
router.get("/create", (req, res) => {
    if(!req.session.user) return res.render("auth/login", {error: "You must log in to create a form"})
    res.render("forms/create",{oldData:{}});
});
router.get("/:id/edit", getFormForEdit);
router.route("/dashboard").get(getForms);
router.route('/update/:id').post(updateForm);
router.route('/delete/:id').delete(deleteForm);
router.route('/:sharedId').get(getForm);



export default router
