import React, { useState } from 'react';
import Cookies from "js-cookie";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button.tsx";

type Inputs = {
  email: string;
  password: string;
};

type Response = {
  accessToken: string;
  refreshToken: string;
};

function Auth(): React.ReactElement {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  React.useEffect(() => {
    if (Cookies.get("accessToken") && Cookies.get("refreshToken")) {
      window.location.replace("/dashboard");
    }
  }, []);
  
  const handleAuth = async (data: Inputs) => {
    const response = await fetch(
      `http://localhost:3000/api/user/${isLogin ? "login" : "signup"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json: Response = await response.json();
    Cookies.set("accessToken", json.accessToken);
    Cookies.set("refreshToken", json.refreshToken);
    window.location.replace("/dashboard");
  }
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle>
                {isLogin ? "Login" : "Signup"}
            </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button
                onClick={() =>
                    handleAuth({
                        email: (document.getElementById("email") as HTMLInputElement).value,
                        password: (document.getElementById("password") as HTMLInputElement).value,
                    })
                }
            >
                {isLogin ? "Login" : "Signup"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <span
                    className="text-blue-500 cursor-pointer"
                    onClick={toggleForm}
                >
                    Signup
                </span>
              </p>
            ) : (
                <p>
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={toggleForm}
                    >
                        Login
                    </span>
                </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Auth;
