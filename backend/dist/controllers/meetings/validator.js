"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMeetingValidator = exports.newMeetingValidator = exports.meetingIdValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.meetingIdValidator = joi_1.default.object({
    meetingId: joi_1.default.string().uuid().required()
});
exports.newMeetingValidator = joi_1.default.object({
    groupId: joi_1.default.string().uuid().required(),
    startDate: joi_1.default.date().required(),
    finishDate: joi_1.default.date().greater(joi_1.default.ref("startDate")).required(),
    description: joi_1.default.string().trim().min(1).required(),
    room: joi_1.default.string().trim().min(1).required()
});
exports.updateMeetingValidator = joi_1.default.object({
    groupId: joi_1.default.string().uuid(),
    startDate: joi_1.default.date(),
    finishDate: joi_1.default.date(),
    description: joi_1.default.string().trim().min(1),
    room: joi_1.default.string().trim().min(1)
})
    .min(1)
    .custom((value, helpers) => {
    if (value.startDate && value.finishDate && new Date(value.finishDate) <= new Date(value.startDate)) {
        return helpers.error("any.invalid");
    }
    return value;
}, "finishDate must be after startDate");
