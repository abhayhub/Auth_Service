const { StatusCodes } = require("http-status-codes");
const AppErrors = require("./error-handler");

class ClientError extends AppErrors{
    constructor(name, message, explanation, statusCodes){
        super(
            errorName,
            'Not able to validate the data sent in the request',
            explanation,
            StatusCodes.BAD_REQUEST
        )
    }
}

module.exports = ClientError;