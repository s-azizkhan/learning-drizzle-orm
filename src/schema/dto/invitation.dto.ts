import { DataType } from "sequelize-typescript";
import { InvitationStatus } from "../models/Invitation.model";

export type CreateInvitationDTO = {
    eventId: string;
    email: string,
    status: InvitationStatus,
    invitedBy: typeof DataType.UUID,
    invitedTo: typeof DataType.UUID
}

export type UpdateInvitationDTO = Omit<CreateInvitationDTO, 'email'>;