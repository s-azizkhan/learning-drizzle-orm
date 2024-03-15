import EventInterface from "../../interfaces/event.interface";
import InvitationInterface, { InvitedToUserInterface } from "../../interfaces/invitation.interface";
import { EventOutput } from "../../schema/models/Event.model";
import { InvitationOutput } from "../../schema/models/Invitation.model";
import User from "../../schema/models/User.model";


export default class InvitationMapper {

    static toInvitedToUser(invitedToUser: User): InvitedToUserInterface | undefined {
        if( !invitedToUser ) return undefined;
        return {
            id: invitedToUser.id,
            name: invitedToUser.name,
            email: invitedToUser.email
        }
    }
    static toInvitation(invitationData: InvitationOutput): InvitationInterface {
        return {
            id: invitationData.id,
            eventId: invitationData.eventId,
            invitedBy: invitationData.invitedBy,
            invitedTo: invitationData.invitedTo,
            status: invitationData.status,
            createdAt: invitationData.createdAt,
            invitedToUser: invitationData.invitedToUser && this.toInvitedToUser(invitationData.invitedToUser)
        }
    }

    static toInvitations(invitationsData: InvitationOutput[]): InvitationInterface[] {
        return invitationsData.map(invitationData => {
            return this.toInvitation(invitationData)
        })
    }
}
