import { Request, Response } from "express";
import { BaseResponse } from "../shared/base-response";
import * as authService from "../services/auth.service";
import {
    RESPONSE_CREDENTIALS_ERROR,
    STATUS_BAD_REQUEST,
    STATUS_UNAUTHORIZED
} from "../shared/constants";
import { loginSchema } from "../schemas/auth.schema";

export const login = async (req: Request, res: Response) => {
    try {
        const { error } = loginSchema.validate(req.body || {});
        if (error) {
            return res
                .status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(`Error de validación: ${error.message}`));
        }

        const { username, password } = req.body;

        const response = await authService.login(username, password);

        return res.json(BaseResponse.success(response));

    } catch (error: any) {
        return res
            .status(STATUS_UNAUTHORIZED)
            .json(BaseResponse.error(RESPONSE_CREDENTIALS_ERROR));
    }
};
