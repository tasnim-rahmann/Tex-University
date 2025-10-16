import mongoose from "mongoose";
import { TErrorSoures } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const errorSources: TErrorSoures = Object.values(err.errors).map((vlaue: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: vlaue.path,
            message: vlaue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};

export default handleValidationError;