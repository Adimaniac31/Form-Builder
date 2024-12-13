import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;  // Attach JwtPayload type to `user` property
    }
  }
}
