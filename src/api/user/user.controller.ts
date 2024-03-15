import { NextFunction, Request, Response } from "express";
import { CreateUserDTO, LoginUserDTO } from "../../schema/dto/user.dto";
import UserInterface, { AuthenticationSuccessInterface } from "../../interfaces/user.interface";
import { UserDAL } from "../../schema/dal/user.dal";
import { createJwtToken } from "../../utils/auth";
import { ApiError } from "../../utils/custom-api-error";
import { httpStatusCodes } from "../../utils/httpStatusCodes";
import * as mapper from './user.mapper'


export default class UserController {
    public static async signup(payload: CreateUserDTO): Promise<AuthenticationSuccessInterface> {

        // For this example, let's assume the user is found in the database.
        const user = await UserDAL.getUserByEmail(payload.email);

        if (user) {
            throw new ApiError('User already exist with same credentials.', httpStatusCodes.BAD_REQUEST);
        }

        const userCreated = await UserDAL.createUser(payload);
        // If the user is authenticated, create a JWT token and send it in the response.
        const token = createJwtToken(userCreated);
        return {
            accessToken: token
        };
    }
    public static async authenticate(payload: LoginUserDTO): Promise<AuthenticationSuccessInterface> {
        try {
            const { email, password } = payload;

            // For this example, let's assume the user is found in the database.
            const user = await UserDAL.getUserByEmail(email);

            if (!user) {
                throw new ApiError('Authentication failed.', httpStatusCodes.UNAUTHENTICATED);
            }

            // validate password
            const validPass = await user.verifyPassword(password);
            if (!validPass) {
                throw new ApiError('Authentication failed.', httpStatusCodes.UNAUTHENTICATED);
            }
            // If the user is authenticated, create a JWT token and send it in the response.
            const token = createJwtToken(user);
            return {
                accessToken: token
            };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Retrieves the user's profile.
     *
     * @return {Promise<UserInterface | string>} The user's profile or an error message.
     */
    public static async getProfile(req: Request, res: Response, next: NextFunction) {
        return res.status(200).send(req.user);
    }
}