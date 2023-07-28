import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import style from "../style/username.module.css";
import toast, { Toaster } from "react-hot-toast"; // To make website intractive
import { useFormik } from "formik"; // For validation
import { passwordValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate } from "react-router-dom";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if (OTP) {
        return toast.success("OTP has been send to your E-mail");
      }
      return toast.error("Problem While Generating OTP");
    });
  }, [username]);

  async function onSubmit(e) {
    try {
      e.preventDefault();

      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 200) {
        toast.success("Verify Successfully");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP, Check Your E-mail Again");
    }
  }

  // Handeler Function to Resend OTP
  function resendOTP() {
    try {
      let sendPromise = generateOTP(username);

      toast.promise(sendPromise, {
        loading: "Sending.....",
        success: <b>OTP Has Been Resend To Your E-mail</b>,
        error: <b>Could Not Send, Pls Try Again!</b>,
      });
    } catch (error) {
      return toast.error("Wrong OTP, Check Your E-mail Again");
    }

  }

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <duv className="flex justify-center items-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col justify-center items-center">
            <h4 className="text-5xl font-bold">Recover Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to Recover Password.
            </span>
          </div>
          {/* onSubmit={formik.handleSubmit} */}
          <form className="pt-18 md:pt-25" onSubmit={onSubmit}>
            <div className="textbox flex justify-center items-center flex-col gap-6">
              <span className="py-4 text-sm text-center">
                Enter 6 Digit OTP sent to Your E-mail Address.
              </span>
              <input
                onChange={(e) => setOTP(e.target.value)}
                type="text"
                placeholder="OTP"
                className={style.textbox}
              />
              <button type="submit" className={style.btn}>
                Recover
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span>
              Can't Get OTP{" "}
              <button onSubmit={resendOTP} className="text-red-500 font-bold">
                Resend OTP
              </button>
            </span>
          </div>
        </div>
      </duv>
    </div>
  );
}
