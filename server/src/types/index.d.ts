import { JwtPayload } from "jsonwebtoken";

interface AuthJwtPayload extends JwtPayload {
    userId: number;
}

declare global {
    namespace Express {
        interface Request {
            userId: number;
        }
    }
}

interface CreateUserInput {
    email: string;
    password: string;
}
