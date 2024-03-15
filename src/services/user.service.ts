import { UserDAL } from '../schema/dal/user.dal';
import { UserInput, UserOutput } from '../schema/models/User.model';
import bcrypt from 'bcrypt';

export class UserService {
    public static async create(payload: UserInput): Promise<UserOutput> {
        return UserDAL.createUser(payload)
    }
}