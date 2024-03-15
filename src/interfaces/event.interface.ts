import { AbstractDataTypeConstructor } from "sequelize";
import InvitationInterface from "./invitation.interface";

export default interface EventInterface {
    id: AbstractDataTypeConstructor;
    title: string;
    description: string;
    eventDate: Date;
    userId: AbstractDataTypeConstructor;
    createdAt: Date;
    updatedAt?: Date
    deletedAt?: Date,
    invitations?: InvitationInterface[]

}