import { Router } from "express";
import {createForm,getForms,updateForm,deleteForm } from "../controllers/form.controller.js"

const router = Router();

router.route("/create").post(createForm);
router.route("/getforms").get(getForms);
router.route('/update/:id').patch(updateForm);
router.route('/delete/:id').delete(deleteForm);


export default router
