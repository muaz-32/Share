import * as React from "react";
import Header from "./Header.tsx";
import AllPosts from "./AllPosts.tsx";

import {handleAuthenticatedRoute} from "../lib/utils.ts";

function Dashboard(): React.ReactElement {
    const [message, setMessage] = React.useState<string>("");

    React.useEffect(() => {
        handleAuthenticatedRoute(setMessage).then(() => {});
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header userName={message}/>
            <AllPosts />
        </div>
    );
}

export default Dashboard;
