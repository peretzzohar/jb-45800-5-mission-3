"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bodyValidation;
function bodyValidation(validator) {
    return async (request, response, next) => {
        try {
            // we push the validation result back into the request
            // because the validation may contain transformations 
            // (.e.g. uppercase)
            request.body = await validator.validateAsync(request.body);
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
