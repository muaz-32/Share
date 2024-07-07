import { JwtPayload } from "jsonwebtoken";
import {Domain, User, Vote} from "@prisma/client";

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

// interface CreateUserInput {
//     email: string;
//     password: string;
// }
//
// interface CreatePostInput {
//     title: string;
//     content: string;
//     authorId: number;
//     domainId: number;
// }
//
// interface GiveVoteInput {
//     postId: number;
//     userId: number;
//     value: boolean;
// }
//
// interface AddCommentInput {
//     postId: number;
//     authorId: number;
//     content: string;
// }

interface DetailedPost {
    id: number;
    title: string;
    content: string;
    author: User;
    votes: Vote[];
    comments: Comment[];
    domain: Domain;
}

interface BriefPost {
    id: number;
    title: string;
    author: User;
    domain: Domain;
}
