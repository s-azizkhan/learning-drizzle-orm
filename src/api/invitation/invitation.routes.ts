import { Router } from 'express';
import { isAuthenticated } from '../middleware/authenticate';
import acceptInvitation from './controller/accept.invitation';
import rejectInvitation from './controller/reject.invitation';
import { deleteInvitation } from './controller/delete.invitation';

const invitationRouter = Router();

invitationRouter.use(isAuthenticated);
invitationRouter.get('/:id/accept', acceptInvitation)
invitationRouter.get('/:id/reject', rejectInvitation)
invitationRouter.delete('/:id', deleteInvitation)

export default invitationRouter;