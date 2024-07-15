import React, {useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table.tsx";
import {Badge} from "./ui/badge.tsx";
import {useNavigate} from "react-router-dom";
import {AllPostsResponse, AllPostsResponseType} from "../schemas/AllPosts.ts";

function AllPosts(): React.ReactElement {
    const [posts, setPosts] = React.useState<AllPostsResponseType>();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch("http://localhost:3000/api/post/")
            .then((response) => response.json())
            .then((data: AllPostsResponseType) => {
                setPosts(AllPostsResponse.parse(data));
            })
            .catch((error) => {
                console.error("Error fetching posts: ", error);
            });
    }, []);
    
    const handlePostClick = (id: number) => {
        navigate(`/post/${id}`);
    }
    
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card
                    className="xl:col-span-3" x-chunk="dashboard-01-chunk-4"
                >
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Posts</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Title</TableHead>
                                    <TableHead className="">Author</TableHead>
                                    <TableHead className="">Domain</TableHead>
                                    <TableHead className="">Comments</TableHead>
                                    <TableHead className="">Net Votes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts?.map((post) => (
                                    <TableRow key={post.id} onClick={() => handlePostClick(post.id)}>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>{post.author}</TableCell>
                                        <TableCell>{post.domain}</TableCell>
                                        <TableCell>{post.comments}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={post.newVotes > 0 ? "secondary" : "destructive"}
                                            >
                                                {post.newVotes}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

export default AllPosts;
