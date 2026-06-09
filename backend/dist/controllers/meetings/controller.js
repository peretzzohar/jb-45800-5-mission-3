"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeetingById = getMeetingById;
exports.addMeeting = addMeeting;
exports.updateMeeting = updateMeeting;
exports.deleteMeeting = deleteMeeting;
const group_1 = __importDefault(require("../../models/group"));
const meeting_1 = __importDefault(require("../../models/meeting"));
async function getMeetingById(request, response, next) {
    try {
        const { meetingId } = request.params;
        const meeting = await meeting_1.default.findByPk(meetingId);
        if (!meeting) {
            return next({
                status: 404,
                message: "meeting not found"
            });
        }
        response.json(meeting);
    }
    catch (e) {
        next(e);
    }
}
async function addMeeting(request, response, next) {
    try {
        const group = await group_1.default.findByPk(request.body.groupId);
        if (!group) {
            return next({
                status: 404,
                message: "group not found"
            });
        }
        const meeting = await meeting_1.default.create({ ...request.body });
        response.status(201).json(meeting);
    }
    catch (e) {
        next(e);
    }
}
async function updateMeeting(request, response, next) {
    try {
        const { meetingId } = request.params;
        const meeting = await meeting_1.default.findByPk(meetingId);
        if (!meeting) {
            return next({
                status: 404,
                message: "meeting not found"
            });
        }
        if (request.body.groupId) {
            const group = await group_1.default.findByPk(request.body.groupId);
            if (!group) {
                return next({
                    status: 404,
                    message: "group not found"
                });
            }
        }
        await meeting.update({ ...request.body });
        response.json(meeting);
    }
    catch (e) {
        next(e);
    }
}
async function deleteMeeting(request, response, next) {
    try {
        const { meetingId } = request.params;
        const deletedRows = await meeting_1.default.destroy({ where: { meetingId } });
        if (deletedRows === 0) {
            return next({
                status: 404,
                message: "meeting not found"
            });
        }
        response.json({ success: true });
    }
    catch (e) {
        next(e);
    }
}
