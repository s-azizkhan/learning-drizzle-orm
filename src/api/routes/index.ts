import { Router } from 'express'
import userRouter from '../user/user.routes'
import { restErrorHandler } from '../middleware/error-handler'
import eventRouter from '../event/event.routes';
import invitationRouter from '../invitation/invitation.routes';

const router = Router()

router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/invitations', invitationRouter);

router.use(restErrorHandler);

export default router