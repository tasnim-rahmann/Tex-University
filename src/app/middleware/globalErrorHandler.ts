import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSoures } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

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
    } else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [{
            path: '',
            message: err?.message,
        }];
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [{
            path: '',
            message: err?.message,
        }];
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
        errorSources: errorSources,
        stack: config.node_env === 'development' ? err?.stack : "Not Available!",
    });
});

export default globalErrorHandler;