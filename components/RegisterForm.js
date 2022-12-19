import React, { useState, useContext } from "react";
import Link from "next/link";
import { useForm, reset } from "react-hook-form";
import { UserContext } from "../context/user";


function RegisterForm() {
  const { doRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = {};
  password.current = watch("password", "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(["", ""]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    const ret = await doRegister(values);

    if (ret[0] === "alert") {
      setAlert(ret);
    } else {
      setAlert(ret);
      reset();
    }
    setIsSubmitting(false);
  };

  return (

    <div className="page-wraper">
        <div className="account-form">
          <div
            className="account-head"
            
          >
            <Link href={"/"}>
            
              <img src="assets/images/logo-white-2.png" alt="" />
            
            </Link>
            
          </div>
          <div className="account-form-inner">
            <div className="account-container">
              <div className="heading-bx left">
                <h2 className="title-head">
                  Create an <span>Account</span>
                </h2>
                <p>
                  Have an Account?{" "}
                  <Link href={"/login"}>
                  Login Here</Link>
                </p>
              </div>
              <form className="contact-bx" onSubmit={handleSubmit(onSubmit)}>
                <div className="row placeani">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <label>Username</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          {...register("username", {
                            required: "Please choose a username",
                          })}
                        />{errors.username && <p>{errors.username.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="form-control"
                          {...register("email", {
                            required: "Email is required",
                            pattern:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          })}
                        />{errors.email && <p>{errors.email.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: { value: 8, message: "At least 8 character" },
                    })}
                        />{errors.password && <p>{errors.password.message}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <label>Password</label>
                        <input
                         type="password"
                         placeholder="Confirm Password"
                         {...register("repeatpassword", {
                           validate: (value) =>
                             value === password.current ||
                             "The passwords do not match",
                         })}
                        />{errors.repeatpassword && (
                          <p>{errors.repeatpassword.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  
                  <div className="col-lg-12 m-b30">
                    <button
                      name="submit"
                      type="submit"
                      value="Submit"
                      className="btn button-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && "Registering..."}
                    {!isSubmitting && "Register"}
                    </button>
                  </div>
                  {alert[1]}
                  <div className="col-lg-12">
                    <h6>Login with Social media</h6>
                    <div className="d-flex">
                      <Link href="#" className="btn flex-fill m-r5 facebook">
                      
                        <i className="fa fa-facebook"></i>Facebook
                      
                      </Link>
                      <Link href="#" className="btn flex-fill m-l5 google-plus">
                      
                        <i className="fa fa-google-plus"></i>Google Plus
                      
                      </Link>
                      
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

export default RegisterForm;
