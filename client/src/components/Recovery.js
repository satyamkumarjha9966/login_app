import React from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import style from '../style/username.module.css';
import { Toaster } from 'react-hot-toast';            // To make website intractive
import { useFormik } from 'formik';                   // For validation
import { passwordValidate } from "../helper/validate";

export default function Recovery() {

    const formik = useFormik({
        initialValues : {
            password : ""
        },
        validate: passwordValidate,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async (values) => {
            console.log(values);
        }
    })

    return(
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

                    <form className="pt-18 md:pt-25" onSubmit={formik.handleSubmit}>
                        <div className="textbox flex justify-center items-center flex-col gap-6">
                            <span className="py-4 text-sm text-center">
                                Enter 6 Digit  OTP sent to Your E-mail Address.
                            </span>
                            <input type="password" placeholder="OTP" className={style.textbox}/>
                            <button type="submit" className={style.btn}>Recover</button>
                        </div>

                        <div className="text-center py-4">
                            <span>Can't Get OTP <button className="text-red-500 font-bold">Resend OTP</button></span>
                        </div>
                    </form>
                </div>
            </duv>
        </div>
    )
};