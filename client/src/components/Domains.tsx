import React from "react";
import Header from "./Header.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button.tsx";
import {handleAuthenticatedRoute} from "../lib/utils.ts";
import Cookies from "js-cookie";

function Domains(): React.ReactElement {
    const [message, setMessage] = React.useState<string>("");

    React.useEffect(() => {
        handleAuthenticatedRoute(setMessage).then(() => {});
    }, []);
    
    const handleCreateDomain = async () => {
        const data = {
            name: (document.getElementById("title") as HTMLInputElement).value,
        };
        const response = await fetch(
            `http://localhost:3000/api/domain/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                },
                body: JSON.stringify(data),
            }
        );
        const json = await response.json();
        if (json.error) {
            alert(json.error);
        }
        
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
