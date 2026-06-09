"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = respondError;
function respondError(err, request, response, next) {
    response.status(err.status || 500).send(err.status === 422 ? err.message : `something bad happened... call exam3 support with event id ${request.eventId}`);
}
