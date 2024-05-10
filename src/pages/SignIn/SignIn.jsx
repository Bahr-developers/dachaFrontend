import "./SignIn.css";
import Eye from "../../assets/images/eye.svg";
import EyeSlash from "../../assets/images/eyeSlash.svg";

import { useMutation } from "@tanstack/react-query";
import { authUtils } from "../../utils/auth.utils";
import { useContext, useRef, useState } from "react";
import toastify from "../../utils/toastify";
import { useNavigate } from "react-router-dom";
import Cleave from "cleave.js/react";
import { FaArrowLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { signInLanguage } from "../../configs/language";
import { LanguageContext } from "../../helper/languageContext";

const SignIn = () => {
  // get Language
  const { languageChange } = useContext(LanguageContext);

  const smsForm = useRef("");
  const phoneForm = useRef("");

  const smsInput = useRef(null);
  const navigate = useNavigate();
  console.log(phoneForm.current.classList, "phone");
  console.log(smsForm.current.classList, "sms");

  // eye btn
  const [passwordShow, setPasswordShow] = useState(true);

  const phone = useMutation({
    mutationFn: authUtils.smsAuth,
    onSuccess: (data) => {
      smsInput.current.value = data.smsCode;
      toastify.successMessage(signInLanguage.successLogin[languageChange]);

      setTimeout(() => {
        phoneForm.current.classList.add("d-none");
      }, 500);
      setTimeout(() => {
        smsForm.current.classList.remove("d-none");
      }, 500);
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage(signInLanguage.numberError[languageChange]);
    },
  });

  const login = useMutation({
    mutationFn: authUtils.loginAuth,
    onSuccess: () => {
      toastify.successMessage(signInLanguage.successLogin[languageChange]);
      navigate("/home/profile/user");
    },
    onError: (err) => {
      console.log(err, "login");
    },
  });

  const handleAuth = (e) => {
    e.preventDefault();
    console.log(e.target.phonenumber.value.replaceAll(" ", "").slice(4));
    phone.mutate({
      phone: e.target.phonenumber.value.replaceAll(" ", "").slice(4),
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const code = e.target.smsCode.value;
    const truthCode = phone?.data?.smsCode;
    if (code === truthCode) {
      login.mutate({
        smsCode: code,
        userId: phone?.data?.userId,
      });
    } else {
      toastify.errorMessage(signInLanguage.smsError[languageChange]);
    }
  };
  const backOneHandle = () => {
    if (!phoneForm.current.classList.value) {
      navigate("/");
    } else {
      setTimeout(() => {
        phoneForm.current.classList.remove("d-none");
      }, 500);
      setTimeout(() => {
        smsForm.current.classList.add("d-none");
      }, 500);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Sign In page" />
        <link rel="canonical" href="/signin" />
      </Helmet>

      <div className="signin">
        <div className="background">
          <div className="signin-box">
            <span onClick={backOneHandle} className="one-back ">
              <FaArrowLeft size={22} />
            </span>
            <h2 className="signin-header">
              {signInLanguage.login[languageChange]}
            </h2>
            <form onSubmit={handleAuth} ref={phoneForm}>
              <div className="input-text">
                <label className="d-flex flex-column gap-3">
                  <span className="text-light label-text ">
                    {signInLanguage.phone[languageChange]}:{" "}
                  </span>
                  <Cleave
                    options={{
                      prefix: "+998",
                      delimiter: " ",
                      blocks: [4, 2, 3, 2, 2],
                      numericOnly: true,
                    }}
                    placeholder="Phone number"
                    className="signin-input-text"
                    name="phonenumber"
                    required
                  />
                </label>
              </div>
              <button type="submit" className="signin-submit mt-5">
                {signInLanguage.enter[languageChange]}
              </button>
            </form>

            <form onSubmit={handleLogin} ref={smsForm} className="d-none">
              <div className="input-password">
                <input
                  className="signin-input-password"
                  type={`${passwordShow ? "password" : "text"}`}
                  ref={smsInput}
                  name="smsCode"
                  placeholder={signInLanguage.smsCode[languageChange]}
                />
                <button
                  type="button"
                  className="passwordBtn"
                  onClick={() => setPasswordShow((prev) => !prev)}
                >
                  <img
                    src={passwordShow ? Eye : EyeSlash}
                    alt="password"
                    className="passwordIcon"
                  />
                </button>
              </div>
              <button type="submit" className="signin-submit mt-5">
                {signInLanguage.enter[languageChange]}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
