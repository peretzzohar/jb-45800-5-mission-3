"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("config"));
const group_1 = __importDefault(require("../models/group"));
const meeting_1 = __importDefault(require("../models/meeting"));
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    models: [group_1.default, meeting_1.default], // <= add all sequelize models here
    logging: console.log,
    ...config_1.default.get('db')
});
console.log(`connected to database on `, config_1.default.get('db'));
exports.default = sequelize;
