// here we defined possible keys that we can use on run time
import { UserOutput } from '../schema/models/User.model';
declare global {
  namespace Express {
    interface Request {
      user?: UserOutput | null;
    }
  }
}