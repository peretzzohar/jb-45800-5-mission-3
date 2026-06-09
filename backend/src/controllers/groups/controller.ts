import type { NextFunction, Request, Response } from "express";
import Group from "../../models/group";
import Meeting from "../../models/meeting";

export async function getAllGroups(request: Request, response: Response, next: NextFunction) {
	try {
		const groups = await Group.findAll();
		response.json(groups);
	} catch (e) {
		next(e);
	}
}

export async function getMeetingsByGroupId(
	request: Request<{ groupId: string }>,
	response: Response,
	next: NextFunction
) {
	try {
		const { groupId } = request.params;

		const group = await Group.findByPk(groupId);

		if (!group) {
			return next({
				status: 404,
				message: "group not found"
			});
		}

		const meetings = await Meeting.findAll({ where: { groupId } });
		response.json(meetings);
	} catch (e) {
		next(e);
	}
}
