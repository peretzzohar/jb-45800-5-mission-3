"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filesValidation;
function filesValidation(validator) {
    return async (request, response, next) => {
        try {
            // we push the validation result back into the request
            // because the validation may contain transformations 
            // (.e.g. uppercase)
            request.files = await validator.validateAsync(request.files);
            next();
        }
        catch (e) {
            next({
                status: 422,
                message: e.message || 'unprocessable entity'
            });
        }
    };
}
