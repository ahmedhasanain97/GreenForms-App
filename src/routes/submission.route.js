import { Router } from "express"
import {getSubmissions,createSubmission} from "../controllers/submission.controller.js"

const router = Router();

router.route("/:sharedId/submit").post(createSubmission)
router.route("/:sharedId/submissions").get(getSubmissions)

export default router;

