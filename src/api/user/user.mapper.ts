import { UserOutput } from "../../schema/models/User.model"
import { UserInterface } from "../../interfaces"

export const toUser = (user: UserOutput): UserInterface => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    }
}