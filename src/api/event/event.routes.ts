import { Router } from 'express';
import { isAuthenticated } from '../middleware/authenticate';
import getEvents from './controller/get.events';
import createEvent from './controller/create.event';
import getEvent from './controller/get.event';
import deleteEvent from './controller/delete.event';
import updateEvent from './controller/update.event';
import createInvitation from '../invitation/controller/create.invitation';
import { check } from 'express-validator';

const eventRouter = Router();

const createEventValidator = [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('eventDate').notEmpty().withMessage('Event date is required'),
]

eventRouter.use(isAuthenticated);
eventRouter.get('/', getEvents)
eventRouter.post('/', createEventValidator, createEvent)
eventRouter.get('/:id', getEvent)
eventRouter.delete('/:id', deleteEvent)
eventRouter.put('/:id', updateEvent)

// create invitation route
const inviteEventValidator = [
    check('email').notEmpty().withMessage('Email is required').isEmail(),
]
eventRouter.post('/:eventId/invites',inviteEventValidator, createInvitation)

export default eventRouter;