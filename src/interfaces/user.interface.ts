import { AbstractDataTypeConstructor } from "sequelize"

export interface AuthenticationSuccessInterface {
    accessToken: string
};

export default interface UserInterface {
    id: AbstractDataTypeConstructor,
    name: string,
    email: string,
    createdAt: Date
    updatedAt?: Date
    deletedAt?: Date
};