import {ZodSchema} from "zod";
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (paramsSchema: ZodSchema | null, bodySchema: ZodSchema | null) => {
    return (req: Request<unknown, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
        if (paramsSchema) {
            const paramsValidation = paramsSchema.safeParse(req.params);
            if (!paramsValidation.success) {
                return res.status(400).json({ message: "Invalid request params" });
            }
        }
        if (bodySchema) {
            const bodyValidation = bodySchema.safeParse(req.body);
            if (!bodyValidation.success) {
                return res.status(400).json({ message: "Invalid request body" });
            }
        }
        next();
    }
};
