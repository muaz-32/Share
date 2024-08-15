import React, {useEffect, useRef} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";
import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button.tsx";
import {getUserIdFromToken, handleAuthenticatedRoute} from "../lib/utils.ts";
import Header from "./Header.tsx";
import {useParams} from "react-router-dom";
import {PostResponse, PostResponseType} from "../schemas/Post.ts";
import {useGetPostQuery} from "../redux/post-api.ts";
import Cookies from "js-cookie";
import {useGiveVoteMutation, useUnvoteMutation, useUpdateVoteMutation} from "../redux/vote-api.ts";
import {usePostCommentMutation} from "../redux/comment-api.ts";
import {useFollowMutation, useUnfollowMutation} from "../redux/follow-api.ts";

function Post(): React.ReactElement {
    const { id } = useParams<{ id: string }>();
    const [commented, setCommented] = React.useState<number>(0);
    const [upvotes, setUpvotes] = React.useState<number>(0);
    const [downvotes, setDownvotes] = React.useState<number>(0);
    const [userVote, setUserVote] = React.useState<"upvote" | "downvote" | null>(null);
    const [message, setMessage] = React.useState<string>("");
    const [followed, setFollowed] = React.useState<boolean | null>(null);
    const { data: fetchedPost, refetch: refetchPost } = useGetPostQuery(id as string);
    const postRef = useRef<PostResponseType | null>(null);
    const [giveVote] = useGiveVoteMutation();
    const [unvote] = useUnvoteMutation();
    const [updateVote] = useUpdateVoteMutation();
    const [addComment] = usePostCommentMutation();
    const [follow] = useFollowMutation();
    const [unfollow] = useUnfollowMutation();
    
    useEffect(() => {
        handleAuthenticatedRoute(setMessage).then(() => {});
        try {
            refetchPost();
            postRef.current = PostResponse.parse(fetchedPost);
        } catch (error) {
            alert("Error parsing post data " + error);
            return;
        }
        const post = postRef.current;
        setUpvotes(post.votes.filter((vote) => vote.value).length);
        setDownvotes(post.votes.filter((vote) => !vote.value).length);
        const userVoteFromDB = post.votes.find((vote) => vote.userId === getUserIdFromToken())?.value;
        setUserVote(userVoteFromDB ? "upvote" : userVoteFromDB === false ? "downvote" : null);

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
        
    }, [commented, id, fetchedPost, refetchPost]);

    const handleVote = (voteType: "upvote" | "downvote") => {
        if (userVote === voteType) {
            unvote({postId: parseInt(id as string)})
                .unwrap()
                .then(() => {
                    if (voteType === "upvote") {
                        setUpvotes(upvotes - 1);
                    } else {
                        setDownvotes(downvotes - 1);
                    }
                    setUserVote(null);
                })
                .catch((error: Error) => {
                    console.error("Error unvoting: ", error);
                });
            return;
        }
        
        if (userVote !== null) {
            updateVote({postId: parseInt(id as string), value: voteType === "upvote"})
                .unwrap()
                .then(() => {
                    if (voteType === "upvote") {
                        setUpvotes(upvotes + 1);
                        setDownvotes(downvotes - 1);
                    } else {
                        setUpvotes(upvotes - 1);
                        setDownvotes(downvotes + 1);
                    }
                    setUserVote(voteType);
                })
                .catch((error: Error) => {
                    console.error("Error updating vote: ", error);
                });
        } else {
            giveVote({postId: parseInt(id as string), value: voteType === "upvote"})
                .unwrap()
                .then(() => {
                    if (voteType === "upvote") {
                        setUpvotes(upvotes + 1);
                    } else {
                        setDownvotes(downvotes + 1);
                    }
                    setUserVote(voteType);
                })
                .catch((error: Error) => {
                    console.error("Error submitting vote: ", error);
                });
        }
    };
    
    const handleCommentSubmit = () => {
        const comment = (document.getElementById("comment") as HTMLInputElement).value;
        addComment({postId: parseInt(id as string), content: comment})
            .unwrap()
            .then(() => {
                setCommented(commented + 1);
            })
            .catch((error: Error) => {
                console.error("Error submitting comment: ", error);
            });
    }
    
    const handleFollow = (type: "follow" | "unfollow") => {
        const authorId = document.getElementById("authorId")?.textContent;
        if (authorId === undefined || authorId === null) {
            console.error("Author ID not found");
            return;
        } 
        if (type === "follow") {
            follow(authorId)
                .unwrap()
                .then(() => {
                    setFollowed(true);
                })
                .catch((error: Error) => {
                    console.error("Error following: ", error);
                });
        } else {
            unfollow(authorId)
                .unwrap()
                .then(() => {
                    setFollowed(false);
                })
                .catch((error: Error) => {
                    console.error("Error unfollowing: ", error);
                });
        }
    }
    
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header userName={message}/>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>{postRef.current?.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{postRef.current?.author.email}
                                {followed === false && <Button onClick={() => handleFollow("follow")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Follow
                                </Button>}
                                {followed === true && <Button onClick={() => handleFollow("unfollow")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Unfollow
                                </Button>}
                            </p>
                            <p id={"authorId"} className={"hidden"}>{postRef.current?.author.id}</p>
                            <p>{postRef.current?.content}</p>
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
                                {postRef.current?.comments.map((comment) => (
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
