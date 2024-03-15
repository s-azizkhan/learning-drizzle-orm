import { sendErrorResponse } from './../../middleware/error-handler';
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../utils/custom-api-error";
import { httpStatusCodes } from "../../../utils/httpStatusCodes";
import { EventDAL } from "../../../schema/dal/event.dal";
import EventMapper from '../event.mapper';

const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (!user || !user.id) throw new ApiError('Unauthorized', httpStatusCodes.UNAUTHENTICATED);
        const events = await EventDAL.getEventsByUser(user.id);
        return res.status(200).send(EventMapper.toEvents(events));
    } catch (error) {
        next(error);
    }
}

export default getEvents;