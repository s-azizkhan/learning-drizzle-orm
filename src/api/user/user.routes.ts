import { Router, Request, Response, NextFunction } from 'express'
import UserController from './user.controller'
import { CreateUserDTO, LoginUserDTO } from '../../schema/dto/user.dto'
import { isAuthenticated } from '../middleware/authenticate'
import { check, validationResult } from 'express-validator'
import { ApiError } from '../../utils/custom-api-error'
import { httpStatusCodes } from '../../utils/httpStatusCodes'
const userRouter = Router()
const userSignupValidator = [
    check('email').notEmpty().withMessage('Email is required').isEmail(),
    check('password').notEmpty().withMessage('Password is required'),
    check('name').notEmpty().withMessage('Name is required'),
];

const loginValidator = [
    check('email').notEmpty().withMessage('Email is required').isEmail(),
    check('password').notEmpty().withMessage('Password is required'),
]
userRouter.post('/signup', userSignupValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationRes = validationResult(req);
        if (!validationRes.isEmpty()) {
            throw new ApiError(validationRes.array()[0].msg, httpStatusCodes.BAD_REQUEST);
        }
        const payload: CreateUserDTO = req.body;
        const result = await UserController.signup(payload);
        return res.status(201).send(result)
    } catch (error) {
        next(error);
    }
})

userRouter.post('/login', loginValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationRes = validationResult(req);
        if (!validationRes.isEmpty()) {
            throw new ApiError(validationRes.array()[0].msg, httpStatusCodes.BAD_REQUEST);
        }

        const payload: LoginUserDTO = req.body;
        const result = await UserController.authenticate(payload);
        return res.status(200).send(result)
    } catch (error) {
        next(error);
    }
});

userRouter.get('/get-profile', isAuthenticated, UserController.getProfile);

export default userRouter;