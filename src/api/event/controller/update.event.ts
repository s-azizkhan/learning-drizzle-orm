import { Identifier } from 'sequelize';
import { sendErrorResponse } from '../../middleware/error-handler';
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../utils/custom-api-error";
import { httpStatusCodes } from "../../../utils/httpStatusCodes";
import { EventDAL } from "../../../schema/dal/event.dal";
import EventMapper from '../event.mapper';
import { UpdateEventDTO } from '../../../schema/dto/event.dto';

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (!user || !user.id) throw new ApiError('Unauthorized', httpStatusCodes.UNAUTHENTICATED);
        const { id } = req.params;
        const eventId: Identifier = id;
        const payload: UpdateEventDTO = req.body;
        const event = await EventDAL.updateById(eventId, payload);
        return res.status(200).send(EventMapper.toEvent(event));
    } catch (error) {
        next(error);
    }
}

export default updateEvent;