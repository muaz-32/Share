import React, {useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";
import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button.tsx";
import {makeAuthenticatedRequest} from "../lib/auth.ts";
import {getUserIdFromToken, handleAuthenticatedRoute} from "../lib/utils.ts";
import Header from "./Header.tsx";
import {useParams} from "react-router-dom";
import Cookies from "js-cookie";

type Response = {
    id: number;
    title: string;
    content: string;
    author: {
        id: number;
        email: string;
    };
    votes: {
        id: number;
        value: boolean;
        postId: number;
        userId: number;
    }[];
    comments: {
        id: number;
        content: string;
        authorId: number;
        postId: number;
    }[];
    domain: {
        id: number;
        name: string;
    };
};

function Post(): React.ReactElement {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = React.useState<Response>();
    const [commented, setCommented] = React.useState<number>(0);
    const [upvotes, setUpvotes] = React.useState<number>(0);
    const [downvotes, setDownvotes] = React.useState<number>(0);
    const [userVote, setUserVote] = React.useState<"upvote" | "downvote" | null>(null);
    const [message, setMessage] = React.useState<string>("");
    const [followed, setFollowed] = React.useState<boolean | null>(null);
    
    useEffect(() => {
        handleAuthenticatedRoute(setMessage).then(() => {});
        
        if (id) {
            fetch(`http://localhost:3000/api/post/${id}`)
                .then((response) => response.json())
                .then((data: Response) => {
                    setUpvotes(data.votes.filter((vote) => vote.value).length);
                    setDownvotes(data.votes.filter((vote) => !vote.value).length);
                    const userVoteFromDB = data.votes.find((vote) => vote.userId === getUserIdFromToken())?.value;
                    setUserVote(userVoteFromDB ? "upvote" : userVoteFromDB === false ? "downvote" : null);
                    setPost(data)
                })
                .catch((error) => {
                    console.error("Error fetching post: ", error);
                });
        }
        
        fetch(`http://localhost:3000/api/follow/is-following/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
            },
        }).then((response) => response.json())
            .then((data: {follow: boolean}) => {
                setFollowed(data.follow);
            })
            .catch((error) => {
                console.error("Error checking if following: ", error);
            });
    }, [commented]);

    const handleVote = (voteType: "upvote" | "downvote") => {
        if (userVote === voteType) {
            makeAuthenticatedRequest(`http://localhost:3000/api/vote/`, "DELETE", {postId: id})
                .then(() => {
                    if (voteType === "upvote") {
                        setUpvotes(upvotes - 1);
                    } else {
                        setDownvotes(downvotes - 1);
                    }
                    setUserVote(null);
                })
                .catch((error) => {
                    console.error("Error deleting vote: ", error);
                });
        }
        
        if (userVote !== null) {
            makeAuthenticatedRequest(`http://localhost:3000/api/vote/`, "PUT", {postId: id, value: voteType === "upvote"})
                .then(() => {
                    if (voteType === "upvote") {
                        setUpvotes(upvotes + 1);
                        setDownvotes(downvotes - 1);
                    } else {
                        setDownvotes(downvotes + 1);
                        setUpvotes(upvotes - 1);
                    }
                    setUserVote(voteType);
                })
                .catch((error) => {
                    console.error("Error submitting vote: ", error);
                });
        } else {
            makeAuthenticatedRequest(`http://localhost:3000/api/vote/give`, "POST", {postId: id, value: voteType === "upvote"})
                .then(() => {
                    if (voteType === "upvote") {
                        setUpvotes(upvotes + 1);
                    } else {
                        setDownvotes(downvotes + 1);
                    }
                    setUserVote(voteType);
                })
                .catch((error) => {
                    console.error("Error submitting vote: ", error);
                });
        }
    };
    
    const handleCommentSubmit = () => {
        const comment = (document.getElementById("comment") as HTMLInputElement).value;
        makeAuthenticatedRequest(`http://localhost:3000/api/comment/add`, "POST", {content: comment, postId: id})
            .then(() => {
                setCommented(commented + 1);
            })
            .catch((error) => {
                console.error("Error adding comment: ", error);
            });
    }
    
    const handleFollow = (path: string) => {
        const authorId = document.getElementById("authorId")?.textContent;
        makeAuthenticatedRequest(`http://localhost:3000/api/follow/${path}/${authorId}`, "POST", )
            .then(() => {
                setFollowed(path === "follow");
            })
            .catch((error) => {
                console.error("Error following user: ", error);
            });
    }
    
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header userName={message}/>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>{post?.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{post?.author.email}
                                {followed === false && <Button onClick={() => handleFollow("follow")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Follow
                                </Button>}
                                {followed === true && <Button onClick={() => handleFollow("unfollow")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Unfollow
                                </Button>}
                            </p>
                            <p id={"authorId"} className={"hidden"}>{post?.author.id}</p>
                            <p>{post?.content}</p>
                            <div className="flex justify-between items-center mt-4">
                                <Button onClick={() => handleVote('upvote')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Upvote {upvotes}
                                </Button>
                                <Button onClick={() => handleVote('downvote')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Downvote {downvotes}
                                </Button>
                            </div>
                            <Input id="comment" placeholder="Add a comment..." className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <Button onClick={handleCommentSubmit} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Submit Comment
                            </Button>
                            <div className="mt-4">
                                {post?.comments.map((comment) => (
                                    <div key={comment.id} className="border p-4 rounded">
                                        <p>{comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

export default Post;
