import { Router } from "express";
import paramsValidation from "../middlewares/params-validation";
import { getAllGroups, getMeetingsByGroupId } from "../controllers/groups/controller";
import { groupMeetingsValidator } from "../controllers/groups/validatore";

const groupsRouter = Router();

groupsRouter.get("/", getAllGroups);
groupsRouter.get("/:groupId/meetings", paramsValidation(groupMeetingsValidator), getMeetingsByGroupId);

export default groupsRouter;
