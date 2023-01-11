import Link from "next/link";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/user";

function LoginForm() {
  const { handleSubmit, register } = useForm();

  const [alert, setAlert] = useState(["", ""]);

  const { setUser, doLogin, loggingIn, setLoggingIn } = useContext(UserContext);

  const onSubmit = async (values) => {
    setLoggingIn(true);
    const ret = await doLogin(values);

    if (ret[0] == "alert") {
      setAlert(ret);
    } else {
      setUser(ret.message.username);
      console.log(ret.message.username);
    }
    setLoggingIn(false);
  };
  return (
      <div class="page-wraper">
        <div class="account-form">
          <div
            class="account-head"
            
          >
            <Link href={"/"}>
            
              <img src="assets/images/logo-w.png" alt="" />
            
            </Link>
            
          </div>
          <div class="account-form-inner">
            <div class="account-container">
              <div class="heading-bx left">
                <h2 class="title-head">
                  Login to your <span>Account</span>
                </h2>
                <p>
                  Don&apos;t have an account?{" "}
                  <Link href={"/register"}>
                  Create one here</Link>
                </p>
              </div>
              <form class="contact-bx" onSubmit={handleSubmit(onSubmit)}>
                <div class="row placeani">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <div class="input-group">
                        <label>Username</label>
                        <input
                          name="name"
                          type="text"
                          required=""
                          class="form-control"
                          {...register("identifier", {
                            required: true,
                          })}
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <div class="input-group">
                        <label>Your Password</label>
                        <input
                          name="email"
                          type="password"
                          class="form-control"
                          required=""
                          {...register("password", {
                            required: true,
                          })}
                        />{alert[1]}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group form-forget">
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customControlAutosizing"
                        />
                        <label
                          class="custom-control-label"
                          for="customControlAutosizing"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link href="/user/forgotpassword" class="ml-auto">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <div class="col-lg-12 m-b30">
                    <button
                      name="submit"
                      type="submit"
                      value="Submit"
                      class="btn button-md"
                      disabled={loggingIn}
                    >
                      {loggingIn && "Logging in..."}
                    {!loggingIn && "Login"}
                    </button>
                  </div>
                  <div class="col-lg-12">
                    <h6>Login with Social media</h6>
                    <div class="d-flex">
                      <FacebookLogin/>
                      <GoogleLogin/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

  );
}

export default LoginForm;
