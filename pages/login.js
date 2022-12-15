import React, { useEffect, useContext } from "react";

import useRouter from "next/router";
import { UserContext } from "../context/user";

import LoginForm from "../components/LoginForm";
import { isResSent } from "next/dist/shared/lib/utils";

function Login() {
  const { user, jwt, setUser, checkLogin } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await checkLogin();
      if (res.status === 200) {
      }
    };

    fetchData().catch(console.error);
  }, []);

  if (user) {
    useRouter.push("/user");
  }
  return <LoginForm />;
}

export default Login;
