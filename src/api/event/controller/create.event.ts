import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../utils/custom-api-error";
import { httpStatusCodes } from "../../../utils/httpStatusCodes";
import { CreateEventDTO } from "../../../schema/dto/event.dto";
import { EventDAL } from "../../../schema/dal/event.dal";
import EventMapper from "../event.mapper";
import { validationResult } from "express-validator";

const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new ApiError(result.array()[0].msg, httpStatusCodes.BAD_REQUEST);
        }
        const { user } = req;
        if (!user || !user.id) throw new ApiError('Unauthorized', httpStatusCodes.UNAUTHENTICATED);
        const payload: CreateEventDTO = req.body;
        payload.userId = user.id;

        const event = await EventDAL.createEvent(payload);
        res.status(201).send(EventMapper.toEvent(event));
    } catch (error) {
        next(error);
    }
}

export default createEvent;