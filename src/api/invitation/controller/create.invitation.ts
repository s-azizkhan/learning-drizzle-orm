import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../utils/custom-api-error";
import { httpStatusCodes } from "../../../utils/httpStatusCodes";
import { CreateInvitationDTO } from "../../../schema/dto/invitation.dto";
import { UserDAL } from "../../../schema/dal/user.dal";
import { InvitationStatus } from "../../../schema/models/Invitation.model";
import { InvitationDAL } from "../../../schema/dal/invitation.dal";
import InvitationMapper from "../invitation.mapper";

const createInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user } = req;
        if (!user || !user.id) throw new ApiError('Unauthorized', httpStatusCodes.UNAUTHENTICATED);
        const { eventId } = req.params;
        const payload: CreateInvitationDTO = req.body;
        payload.invitedBy = user.id;
        payload.status = InvitationStatus.PENDING;
        payload.eventId = eventId;

        const invitedToUser = await UserDAL.findOrCreateUserByEmail(payload.email);
        payload.invitedTo = invitedToUser.id;
        const invitation = await InvitationDAL.createInvitation(payload);
        res.status(201).send(InvitationMapper.toInvitation(invitation));
    } catch (error) {
        next(error);
    }
}

export default createInvitation;