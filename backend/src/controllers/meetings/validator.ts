import Joi from "joi";

export const meetingIdValidator = Joi.object({
	meetingId: Joi.string().uuid().required()
});

export const newMeetingValidator = Joi.object({
	groupId: Joi.string().uuid().required(),
	startDate: Joi.date().greater("now").required(),
	finishDate: Joi.date().greater(Joi.ref("startDate")).required(),
	description: Joi.string().trim().min(1).required(),
	room: Joi.string().trim().min(1).required()
});

export const updateMeetingValidator = Joi.object({
	groupId: Joi.string().uuid(),
	startDate: Joi.date(),
	finishDate: Joi.date(),
	description: Joi.string().trim().min(1),
	room: Joi.string().trim().min(1)
})
	.min(1)
	.custom((value, helpers) => {
		if (value.startDate && value.finishDate && new Date(value.finishDate) <= new Date(value.startDate)) {
			return helpers.error("any.invalid");
		}
		return value;
	}, "finishDate must be after startDate");
