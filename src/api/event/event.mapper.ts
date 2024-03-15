import EventInterface from "../../interfaces/event.interface";
import { EventOutput } from "../../schema/models/Event.model";
import InvitationMapper from "../invitation/invitation.mapper";


export default class EventMapper {

    static toEvent(eventData: EventOutput): EventInterface {
        return {
            id: eventData.id,
            title: eventData.title,
            description: eventData.description,
            eventDate: eventData.eventDate,
            userId: eventData.userId,
            createdAt: eventData.createdAt,
            invitations: eventData.invitations?.map(invitation => InvitationMapper.toInvitation(invitation))
        }
    }

    static toEvents(eventsData: EventOutput[]): EventInterface[] {
        return eventsData.map(eventData => {
            return this.toEvent(eventData)
        })
    }
}
