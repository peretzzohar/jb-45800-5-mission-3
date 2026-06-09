import type { NextFunction, Request, Response } from "express";
import Group from "../../models/group";
import Meeting from "../../models/meeting";

type MeetingBody = {
    groupId: string;
    startDate: Date;
    finishDate: Date;
    description: string;
    room: string;
};

type UpdateMeetingBody = {
    groupId?: string;
    startDate?: Date;
    finishDate?: Date;
    description?: string;
    room?: string;
};

export async function getMeetingById(request: Request<{ meetingId: string }>, response: Response, next: NextFunction) {
    try {
        const { meetingId } = request.params;

        const meeting = await Meeting.findByPk(meetingId);

        if (!meeting) {
            return next({
                status: 404,
                message: "meeting not found"
            });
        }

        response.json(meeting);
    } catch (e) {
        next(e);
    }
}

export async function addMeeting(
    request: Request<{}, {}, MeetingBody>,
    response: Response,
    next: NextFunction
) {
    try {
        const group = await Group.findByPk(request.body.groupId);

        if (!group) {
            return next({
                status: 404,
                message: "group not found"
            });
        }

        const meeting = await Meeting.create({ ...request.body });
        response.status(201).json(meeting);
    } catch (e) {
        next(e);
    }
}

export async function updateMeeting(
    request: Request<{ meetingId: string }, {}, UpdateMeetingBody>,
    response: Response,
    next: NextFunction
) {
    try {
        const { meetingId } = request.params;

        const meeting = await Meeting.findByPk(meetingId);

        if (!meeting) {
            return next({
                status: 404,
                message: "meeting not found"
            });
        }

        if (request.body.groupId) {
            const group = await Group.findByPk(request.body.groupId);

            if (!group) {
                return next({
                    status: 404,
                    message: "group not found"
                });
            }
        }

        await meeting.update({ ...request.body });
        response.json(meeting);
    } catch (e) {
        next(e);
    }
}

export async function deleteMeeting(request: Request<{ meetingId: string }>, response: Response, next: NextFunction) {
    try {
        const { meetingId } = request.params;
        const deletedRows = await Meeting.destroy({ where: { meetingId } });

        if (deletedRows === 0) {
            return next({
                status: 404,
                message: "meeting not found"
            });
        }

        response.json({ success: true });
    } catch (e) {
        next(e);
    }
}