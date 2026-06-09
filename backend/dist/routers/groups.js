"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const params_validation_1 = __importDefault(require("../middlewares/params-validation"));
const controller_1 = require("../controllers/groups/controller");
const validatore_1 = require("../controllers/groups/validatore");
const groupsRouter = (0, express_1.Router)();
groupsRouter.get("/", controller_1.getAllGroups);
groupsRouter.get("/:groupId/meetings", (0, params_validation_1.default)(validatore_1.groupMeetingsValidator), controller_1.getMeetingsByGroupId);
exports.default = groupsRouter;
