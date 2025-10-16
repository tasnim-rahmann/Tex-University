import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSoures } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = ((err, req, res, next) => {
    // set default values
    let statusCode = err.statusCode || 500;
    let message = err?.message || 'Something Went Wrong!';
    let errorSources: TErrorSoures = [{
        path: '',
        message: 'Something Went Wrong!',
    }];


    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
        errorSources: errorSources,
        stack: config.node_env === 'development' ? err?.stack : "Not Available!",
    });
});

export default globalErrorHandler;