import React from "react";
import {CircleUser, Package2} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "./ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu.tsx";
import {logout} from "../lib/auth.ts";

function Header(props: {userName: string}): React.ReactElement<{userName: string}> {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav
                className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6"/>
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                    to="/dashboard"
                    className="text-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link>
                <Link
                    to="/create"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Create
                </Link>
                <Link
                    to="/domains"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Domains
                </Link>
            </nav>
            
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                
                <div className={"ml-auto flex-1 sm:flex-initial"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{props.userName}</DropdownMenuLabel>
                            
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

export default Header;
