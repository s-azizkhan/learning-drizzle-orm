import { AbstractDataTypeConstructor, Optional } from "sequelize";

export type CreateEventDTO = {
    title: string,
    description?: string,
    eventDate: Date,
    userId: AbstractDataTypeConstructor
}

export type UpdateEventDTO = Optional<CreateEventDTO, 'eventDate' | 'title'>;