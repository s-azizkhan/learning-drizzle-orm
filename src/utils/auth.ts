import jwt from 'jsonwebtoken';
import { UserInterface } from "../interfaces";
import { configData } from '../config/config';
import { AbstractDataTypeConstructor } from 'sequelize';

interface JwtPayload {
    id: AbstractDataTypeConstructor;
    email: string;
}

interface JwtDecoded extends JwtPayload {
    id: AbstractDataTypeConstructor;
    email: string;
    exp: number;
    iat: number;
}
export function createJwtToken(user: UserInterface): string {
    const payload: JwtPayload = {
        id: user.id,
        email: user.email
    }
    return jwt.sign(payload, configData.JWT_SECRET, {
        expiresIn: configData.JWT_EXPIRATION
    })
}

export async function decodeJwtToken(token: string) {
    try {
        const decoded = jwt.verify(token, configData.JWT_SECRET) as JwtDecoded;
        return decoded;
    } catch (error) {
        return null; // Invalid token or token has expired.
    }
}