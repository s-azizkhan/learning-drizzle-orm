import { Identifier } from 'sequelize';
import { sendErrorResponse } from '../../middleware/error-handler';
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../utils/custom-api-error";
import { httpStatusCodes } from "../../../utils/httpStatusCodes";
import { EventDAL } from "../../../schema/dal/event.dal";
import EventMapper from '../event.mapper';

const getEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (!user || !user.id) throw new ApiError('Unauthorized', httpStatusCodes.UNAUTHENTICATED);
        const { id } = req.params;
        const eventId: Identifier = id;
        const event = await EventDAL.getById(eventId);
        if (!event) throw new ApiError('Event not found', httpStatusCodes.NOT_FOUND);
        return res.status(200).send(EventMapper.toEvent(event));
    } catch (error) {
        next(error);
    }
}

export default getEvent;