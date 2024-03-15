
import { httpStatusCodes } from "./httpStatusCodes";

export function isOperationalError(error: object): boolean {
  if (error instanceof ApiError) {
    return error.isOperational;
  }
  return false;
}
export class ApiError {
  success: boolean;
  statusCode: number;
  message: string | unknown;
  isOperational: boolean;
  constructor(message: string | unknown, statusCode = httpStatusCodes.INTERNAL_SERVER, isOperational = true) {
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, ApiError.prototype); // sets the prototype chain
  }
}
