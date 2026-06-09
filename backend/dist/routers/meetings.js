"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const params_validation_1 = __importDefault(require("../middlewares/params-validation"));
const body_validation_1 = __importDefault(require("../middlewares/body-validation"));
const controller_1 = require("../controllers/meetings/controller");
const validator_1 = require("../controllers/meetings/validator");
const meetingsRouter = (0, express_1.Router)();
meetingsRouter.get("/:meetingId", (0, params_validation_1.default)(validator_1.meetingIdValidator), controller_1.getMeetingById);
meetingsRouter.post("/", (0, body_validation_1.default)(validator_1.newMeetingValidator), controller_1.addMeeting);
meetingsRouter.put("/:meetingId", (0, params_validation_1.default)(validator_1.meetingIdValidator), (0, body_validation_1.default)(validator_1.updateMeetingValidator), controller_1.updateMeeting);
meetingsRouter.delete("/:meetingId", (0, params_validation_1.default)(validator_1.meetingIdValidator), controller_1.deleteMeeting);
exports.default = meetingsRouter;
