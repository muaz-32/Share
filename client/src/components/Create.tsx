import React from "react";
import Header from "./Header.tsx";
import {handleAuthenticatedRoute} from "../lib/utils.ts";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";
import { Button } from "./ui/button.tsx";
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";

function Create(): React.ReactElement {
    const [message, setMessage] = React.useState<string>("");
    
    React.useEffect(() => {
        handleAuthenticatedRoute(setMessage).then(() => {});
    }, []);
    
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header userName={message}/>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="xl:col-span-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle>Create Post</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input id="title" type="text" placeholder="Title" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="content">Content</Label>
                                        </div>
                                        <Input id="content" type="text" required />
                                    </div>
                                    <Button>
                                        Create
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Create;
