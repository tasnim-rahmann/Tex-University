import mongoose from "mongoose";
import { TErrorSoures, TGenericResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TGenericResponse => {
    const errorSources: TErrorSoures = [{
        path: err.path,
        message: err.message,
    }];

    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
    };
};

export default handleCastError;