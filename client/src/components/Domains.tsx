import React from "react";
import Header from "./Header.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button.tsx";
import {handleAuthenticatedRoute} from "../lib/utils.ts";
import {useCreateDomainMutation} from "../redux/domain-api.ts";

function Domains(): React.ReactElement {
    const [message, setMessage] = React.useState<string>("");
    const [createDomain] = useCreateDomainMutation();
    
    React.useEffect(() => {
        handleAuthenticatedRoute(setMessage).then(() => {});
    }, []);
    
    const handleCreateDomain = async () => {
        const data = {
            name: (document.getElementById("title") as HTMLInputElement).value,
        };
        createDomain(data)
            .unwrap()
            .then(() => {
                alert("Domain created successfully");
            })
            .catch(() => {
                alert("Failed to create domain");
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
                                    <CardTitle>Create Domain</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Name</Label>
                                        <Input id="title" type="text" placeholder="Title" required/>
                                    </div>
                                    <Button onClick={handleCreateDomain}>
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

export default Domains;
