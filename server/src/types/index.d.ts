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
    author: {
        id: number;
        email: string;
    }
    votes: {
        id: number;
        value: boolean;
        postId: number;
        userId: number;
    }[];
    comments: {
        id: number;
        content: string;
        postId: number;
        authorId: number;
    }[];
    domain: {
        id: number;
        name: string;
    };
}

interface BriefPost {
    id: number;
    title: string;
    author: {
        email: string;
    };
    domain: {
        name: string;
    };
}

interface Post {
    id: number;
    title: string;
    author: string;
    domain: string;
    comments: number;
    newVotes: number;
};
