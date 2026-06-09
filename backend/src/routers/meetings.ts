import { Router } from "express";
import paramsValidation from "../middlewares/params-validation";
import bodyValidation from "../middlewares/body-validation";
import {
	addMeeting,
	deleteMeeting,
	getMeetingById,
	updateMeeting
} from "../controllers/meetings/controller";
import {
	meetingIdValidator,
	newMeetingValidator,
	updateMeetingValidator
} from "../controllers/meetings/validator";

const meetingsRouter = Router();

meetingsRouter.get("/:meetingId", paramsValidation(meetingIdValidator), getMeetingById);
meetingsRouter.post("/", bodyValidation(newMeetingValidator), addMeeting);
meetingsRouter.put("/:meetingId", paramsValidation(meetingIdValidator), bodyValidation(updateMeetingValidator), updateMeeting);
meetingsRouter.delete("/:meetingId", paramsValidation(meetingIdValidator), deleteMeeting);

export default meetingsRouter;
