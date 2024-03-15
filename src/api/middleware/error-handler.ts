import { NextFunction, Request, Response } from "express";
import { ApiError, isOperationalError } from "../../utils/custom-api-error";

/**
 * Send error response
 * @param {} res
 * @param {string | unknown} message
 * @param {int} status
 * @param {*} error
 */
export const sendErrorResponse = (res: Response, message: string | unknown = 'INTERNAL_SERVER_ERROR', status = 500) => {
  //  const message = getMessage(msgKey);

  res.status(status).json({
    success: false,
    statusCode: status,
    message,
  });
};

/* eslint-disable no-unused-vars */
export function restErrorHandler(err: ApiError, req: Request, res: Response, next: NextFunction) {
  if (isOperationalError(err)) {
    return sendErrorResponse(res, err.message, err.statusCode);
  }
  return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR');
}
