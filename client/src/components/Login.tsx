import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, {AxiosResponse} from "axios";
import {setTokensInCookies} from "../lib/auth.ts";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "./ui/form.tsx";
import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button.tsx";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
});

type Response = {
    accessToken: string;
    refreshToken: string;
};

function Login(): React.ReactElement {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    
    const onLogin: SubmitHandler<z.infer<typeof formSchema>> = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        axios.post("http://localhost:3000/api/user/login", data)
            .then((response: AxiosResponse<Response>) => {
                setTokensInCookies(response.data.accessToken, response.data.refreshToken)
                window.location.replace("/dashboard");
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onLogin)} className={"space-y-8"}>
                    <FormField control={form.control} name={"email"} render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name={"password"} render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </div>
    );
}

export default Login;
