import React, { useState, useContext } from "react";
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
    <section class="login-page pad-tb">
      <div class="v-center m-auto">
        <a href="#" class="d-block text-center mb30">
          <img
            src="/images/white-logo.png"
            alt="Logo"
            class="mega-darks-logo"
          />
        </a>
        <div class="login-form-div">
          <h4 class="mb40 text-center">Create an Account</h4>
          <div class="form-block">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="fieldsets row">
                <div class="col-md-12 form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                      required: "Please choose a username",
                    })}
                  />
                  {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div class="col-md-12 form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register("email", {
                      required: "Email is required",
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div class="col-md-12 form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: { value: 8, message: "At least 8 character" },
                    })}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div class="col-md-12 form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("repeatpassword", {
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                  />
                  {errors.repeatpassword && (
                    <p>{errors.repeatpassword.message}</p>
                  )}
                </div>
              </div>
              <div class="fieldsets row mt20">
                <div class="col-md-6 form-group v-center">
                  <button
                    type="submit"
                    class="lnk btn-main bg-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && "Registering..."}
                    {!isSubmitting && "Register"} <span class="circle"></span>
                  </button>
                </div>
                {alert[1]}
                <div class="col-md-6 form-group v-center text-right">
                  <a href="#" class="psforgt">
                    Forgot Password?
                  </a>{" "}
                </div>
              </div>
              <hr class="mt30 mb30" />
              <div class="text-center">
                <p class="mb20">or Login with:</p>
                <div class="social-btnnxx">
                  <a href="#" class="btn-main fb-btn">
                    <i class="fab fa-facebook-f"></i> Facebook
                  </a>
                  <a href="#" class="btn-main google-btn">
                    <i class="fab fa-google"></i> Google
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
