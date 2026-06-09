import Joi from "joi";

export const groupMeetingsValidator = Joi.object({
	groupId: Joi.string().uuid().required()
});
