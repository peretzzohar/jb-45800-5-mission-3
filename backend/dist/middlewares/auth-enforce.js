"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authEnforce;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("config"));
function authEnforce(request, response, next) {
    // this middleware objective are:
    // extract the jwt from the headers
    // realize from the jwt who is the user
    // get their userId, and load it on the request
    // so any middleware that runs after me, 
    // can access the userId using request.userId
    const authHeader = request.get('Authorization');
    if (!authHeader)
        return next({
            status: 401,
            message: 'auth header is missing!'
        });
    if (!authHeader.startsWith('Bearer'))
        return next({
            status: 401,
            message: 'you probably use the wrong auth mechanism'
        });
    const [bearerWord, jwt] = authHeader.split(' ');
    if (!jwt)
        return next({
            status: 401,
            message: 'i see auth header but can not extract a jwt token'
        });
    const key = config_1.default.get('app.encryptionKey');
    const { id } = (0, jsonwebtoken_1.verify)(jwt, key);
    request.userId = id;
    next();
}
