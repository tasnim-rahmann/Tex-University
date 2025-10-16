import { ZodError, ZodIssue } from "zod";
import { TErrorSoures } from "../interface/error";

const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSoures = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1] as string | number,
            message: issue?.message
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};

export default handleZodError;