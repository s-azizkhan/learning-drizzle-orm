import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/custom-api-error";
import { httpStatusCodes } from "../../utils/httpStatusCodes";
import { decodeJwtToken } from "../../utils/auth";
import { UserDAL } from "../../schema/dal/user.dal";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check for jwt token
        let token = req.headers.authorization;
        // if token is not present throw error
        if (!token) {
            throw new ApiError("Authentication failed.", httpStatusCodes.UNAUTHENTICATED);
        }

        if (token.split(' ')[0] === 'Bearer') {
            token = token.split(' ')[1];
        }

        // decode bearer token
        const decoded = await decodeJwtToken(token);
        if (!decoded || !decoded.email) {
            throw new ApiError("Invalid token.", httpStatusCodes.UNAUTHENTICATED);
        }

        // check token expiry
        if (decoded.exp < Date.now() / 1000) {
            throw new ApiError("Token has expired.", httpStatusCodes.UNAUTHENTICATED);
        }

        const user = await UserDAL.getUserByEmail(decoded.email);

        if(!user) {
            throw new ApiError('Invalid user.', httpStatusCodes.UNAUTHENTICATED);
        }
        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
}