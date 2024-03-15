import { NextFunction, Request, Response } from "express";
import { httpStatusCodes } from "../../../utils/httpStatusCodes";
import { Identifier } from "sequelize";
import { InvitationDAL } from "../../../schema/dal/invitation.dal";
import { ApiError } from "../../../utils/custom-api-error";

export const deleteInvitation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (!user || !user.id) throw new ApiError('Unauthorized', httpStatusCodes.UNAUTHENTICATED);
        const { id } = req.params;
        const invitationId: Identifier = id;
        const invitation = await InvitationDAL.getById(invitationId);
        if (!invitation) throw new ApiError('Invitation not found', httpStatusCodes.NOT_FOUND);
        if(user.id !== invitation.invitedBy ) throw new ApiError('Unauthorized, you are not own this invitation.', httpStatusCodes.UNAUTHENTICATED);
        await invitation.destroy();
        return res.status(200).send('Invitation deleted successfully.');
    } catch (error) {
        next(error);
    }
}