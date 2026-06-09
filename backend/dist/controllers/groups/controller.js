"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGroups = getAllGroups;
exports.getMeetingsByGroupId = getMeetingsByGroupId;
const group_1 = __importDefault(require("../../models/group"));
const meeting_1 = __importDefault(require("../../models/meeting"));
async function getAllGroups(request, response, next) {
    try {
        const groups = await group_1.default.findAll();
        response.json(groups);
    }
    catch (e) {
        next(e);
    }
}
async function getMeetingsByGroupId(request, response, next) {
    try {
        const { groupId } = request.params;
        const group = await group_1.default.findByPk(groupId);
        if (!group) {
            return next({
                status: 404,
                message: "group not found"
            });
        }
        const meetings = await meeting_1.default.findAll({ where: { groupId } });
        response.json(meetings);
    }
    catch (e) {
        next(e);
    }
}
