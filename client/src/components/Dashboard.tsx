import * as React from "react";
import {logout, makeAuthenticatedRequest} from "../lib/auth.ts";
import {Button} from "./ui/button.tsx";

type Response = {
    message: string;
};

function Dashboard(): React.ReactElement {
    const [message, setMessage] = React.useState<string>("");

    React.useEffect(() => {
        makeAuthenticatedRequest<Response>("http://localhost:3000/api/user/dashboard", "GET")
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                setMessage(error.message);
            });
    }, []);
    
    const handleLogout = () => {
        logout();
    }

    return (
        <div>
            <p>{message}</p>
            <Button variant={"outline"} onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Dashboard;
