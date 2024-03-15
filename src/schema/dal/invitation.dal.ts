import { AbstractDataTypeConstructor, Identifier } from "sequelize";
import { ApiError } from "../../utils/custom-api-error";
import { httpStatusCodes } from "../../utils/httpStatusCodes";
import { UpdateInvitationDTO } from "../dto/invitation.dto";
import Invitation, { InvitationInput, InvitationOutput } from "../models/Invitation.model";

export class InvitationDAL {
    static async createInvitation(invitationData: InvitationInput): Promise<InvitationOutput> {
        try {
            const invitation = await Invitation.create(invitationData);
            return invitation;
        } catch (error) {
            throw error;
        }
    }

    static async getInvitationsByUser(userId: AbstractDataTypeConstructor): Promise<InvitationOutput[] | []> {
        const invitations = await Invitation.findAll({ where: { invitedTo: userId } });
        return invitations;
    }

    static async getById(InvitationId: Identifier): Promise<Invitation | null> {
        try {
            const invitation = await Invitation.findByPk(InvitationId);
            return invitation;
        } catch (error) {
            return null;
        }
    }

    static async deleteById(InvitationId: Identifier): Promise<boolean> {
        try {
            const invitation = await Invitation.findByPk(InvitationId);

            if (!invitation) {
                throw new ApiError('Invitation not found', httpStatusCodes.NOT_FOUND);
            }

            await invitation.destroy();
            return true;

        } catch (error) {
            throw error;
        }
    }

    static async updateById(InvitationId: Identifier, payload: UpdateInvitationDTO): Promise<Invitation> {
        try {
            const invitation = await Invitation.findByPk(InvitationId);
            if(!invitation) throw new ApiError('Invitation not found', httpStatusCodes.NOT_FOUND);
            await invitation.update(payload);
            return invitation;
        } catch (error) {
            throw error;
        }
    }
}