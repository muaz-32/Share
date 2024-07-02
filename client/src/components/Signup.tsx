import React from "react";
import {useForm} from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { setTokensInCookies } from "../lib/auth.ts";

type Inputs = {
    email: string;
    password: string;
};

type Response = {
    accessToken: string;
    refreshToken: string;
};

function Signup(): React.ReactElement {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    
    const onSignup = (data: Inputs) => {
        console.log(data);
        axios.post("http://localhost:3000/api/user/signup", data)
            .then((response: AxiosResponse<Response>) => {
                setTokensInCookies(response.data.accessToken, response.data.refreshToken);
                window.location.replace("/dashboard");
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <form onSubmit={handleSubmit(onSignup)}>
                <input className="w-full p-2 mb-4 border rounded" type="email" placeholder="Email" {...register("email", { required: true })} />
                <input className="w-full p-2 mb-4 border rounded" type="password" placeholder="Password" {...register("password", { required: true })} />
                
                <div>{errors.email && <span>This field is required</span>}</div>
                <div>{errors.password && <span>This field is required</span>}</div>
                <div>{errors.password && errors.password.type === "minLength" && <span>Min length is 8</span>}</div>
                <div>{errors.password && errors.password.type === "maxLength" && <span>Max length is 20</span>}</div>
                <div>{errors.password && errors.password.type === "pattern" && <span>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</span>}</div>
                <div>{errors.email && errors.email.type === "pattern" && <span>Invalid email</span>}</div>
                
                <input type="submit" />
            </form>
        </div>
    );
}

export default Signup;
