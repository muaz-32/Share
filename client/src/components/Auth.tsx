import React, { useState } from 'react';
import Login from "./Login";
import Signup from "./Signup.tsx";
import Cookies from "js-cookie";

function Auth(): React.ReactElement {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  React.useEffect(() => {
    if (Cookies.get("accessToken") && Cookies.get("refreshToken")) {
      window.location.replace("/dashboard");
    }
  }, []);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div>
      <div>
        {isLogin ? (
          <Login />
        ) : (
          <Signup />
        )}
        <button onClick={toggleForm}>
          {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
