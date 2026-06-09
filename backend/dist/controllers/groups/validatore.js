"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupMeetingsValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.groupMeetingsValidator = joi_1.default.object({
    groupId: joi_1.default.string().uuid().required()
});
