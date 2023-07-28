import React from "react";
import style from '../style/username.module.css';
import toast, { Toaster } from 'react-hot-toast';            // To make website intractive
import { useFormik } from 'formik';                   // For validation
import { resetPasswordValidation } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";

export default function Reset() {

    const {username} = useAuthStore(state => state.auth);
    const navigate = useNavigate();
    const [{isLoading, status, apiData, serverError }] = useFetch('createResetSession')

    const formik = useFormik({
        initialValues : {
            password : "",
            confirm_password : ""
        },
        validate: resetPasswordValidation,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async (values) => {

            let resetPromise = resetPassword({username,  password: values.password});

            toast.promise(resetPromise, {
                loading: "Updating..",
                success: <b>Password Reset Successfully!</b>,
                error: <b>Could Not Reset, Pls Try Again</b>
            });

            resetPromise.then(function () {
                navigate('/')
            })
        }
    })

    if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
    if (serverError) return <h1 className="text-red-600 text-xl">{serverError.message}</h1>;
    if (status !== 200) {
        return <Navigate to={'/password'} replace={true}></Navigate>
    }

    return(
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <duv className="flex justify-center items-center h-screen">
                <div className={style.glass} style={{height: "auto"}}>
                    <div className="title flex flex-col justify-center items-center">
                        <h4 className="text-5xl font-bold">Reset Password</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Enter New Password.
                        </span>
                    </div>

                    <form className="pt-18" onSubmit={formik.handleSubmit}>
                        <div className="textbox flex justify-center items-center flex-col gap-6">
                            <input {...formik.getFieldProps('password')} type="password" placeholder="New Password" className={style.textbox}/>
                            <input {...formik.getFieldProps('confirm_password')} type="text" placeholder="Confirm Password" className={style.textbox}/>
                            <button type="submit" className={style.btn}>Reset</button>
                        </div>
                    </form>
                </div>
            </duv>
        </div>
    )
};