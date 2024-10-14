import React from "react";
import Header from "./Header.tsx";
import {handleAuthenticatedRoute} from "../lib/utils.ts";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";
import { Button } from "./ui/button.tsx";
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";
import {DomainResponse} from "../schemas/Create.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select.tsx";
import {useCreatePostMutation} from "../redux/post-api.ts";
import {useGetAllDomainsQuery} from "../redux/domain-api.ts";

function Create(): React.ReactElement {
    const [message, setMessage] = React.useState<string>("");
    const [domains, setDomains] = React.useState<{ id: number, name: string }[]>([]);
    const [selectedDomain, setSelectedDomain] = React.useState<number | null>(null);
    const [createPost] = useCreatePostMutation();
    const { data: allDomains } = useGetAllDomainsQuery();
    
    React.useEffect(() => {
        handleAuthenticatedRoute(setMessage).then(() => {});
        if (allDomains) {
            const domains = DomainResponse.parse(allDomains);
            setDomains(domains);
        }
    }, [allDomains]);
    
    const handleCreatePost = () => {
        if (!selectedDomain) {
            alert("Please select a domain");
            return;
        }
        const data = {
            title: (document.getElementById("title") as HTMLInputElement).value,
            content: (document.getElementById("content") as HTMLInputElement).value,
            domainId: selectedDomain,
        };
        createPost(data)
            .unwrap()
            .then(() => {
                alert("Post created successfully");
            })
            .catch((error) => {
                alert("Error creating post: " + error);
            });
    }
    
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
                                    <div className="grid gap-2">
                                        <Select onValueChange={(value) => setSelectedDomain(parseInt(value))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Domain" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {domains.map((domain) => (
                                                    <SelectItem key={domain.id} value={domain.id.toString()}>{domain.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button onClick={handleCreatePost}>
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
