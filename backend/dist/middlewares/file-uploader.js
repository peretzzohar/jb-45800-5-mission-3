"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fileUploader;
const lib_storage_1 = require("@aws-sdk/lib-storage");
const aws_1 = __importDefault(require("../aws/aws"));
const config_1 = __importDefault(require("config"));
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
async function fileUploader(request, response, next) {
    // this middlewares checks the request
    // if there are files in the request, it should upload them to the cloud
    // it there are no files in the request, just keep going
    if (!request.files) {
        return next();
    }
    const image = request.files.image;
    // upload to the cloud, and get a url from the cloud
    const upload = new lib_storage_1.Upload({
        client: aws_1.default,
        params: {
            Bucket: config_1.default.get('aws.bucket'),
            Key: `${(0, crypto_1.randomUUID)()}${path_1.default.extname(image.name)}`,
            Body: image.data,
            ContentType: image.mimetype
        }
    });
    const awsResponse = await upload.done();
    console.log(awsResponse);
    request.imageUrl = awsResponse.Location;
    next();
}
