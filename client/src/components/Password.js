import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../assets/profile.png";
import style from '../style/username.module.css';
import toast, { Toaster } from 'react-hot-toast';            // To make website intractive
import { useFormik } from 'formik';                   // For validation
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store.js";
import { verifyPassword } from "../helper/helper";

export default function Password() {

    const navigate = useNavigate();
    const {username} = useAuthStore(state => state.auth);
    const [{isLoading, apiData, serverError}] = useFetch(`/user/${username}`) 

    const formik = useFormik({
        initialValues : {
            password : ""
        },
        validate: passwordValidate,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async (values) => {
            let loginPromise = verifyPassword({username, password: values.password})

            toast.promise(loginPromise, {
                loading: "Checking....",
                success: <b>Login Successfully....</b>,
                error: <b>Password Not Matched</b>
            })

            loginPromise.then(res => {
                let {token} = res.data;
                localStorage.setItem('token', token);
                navigate('/profile')
            })
        }
    })

    if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
    if (serverError) return <h1 className="text-red-600 text-xl">{serverError.message}</h1>;

    return(
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <duv className="flex justify-center items-center h-screen">
                <div className={style.glass}>
                    <div className="title flex flex-col justify-center items-center">
                        <h4 className="text-5xl font-bold">Hello {apiData?.firstname || apiData?.username}</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Explore More by Connecting with us.
                        </span>
                    </div>

                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <img className={style.profile_img} src={ apiData?.Profile || Profile} />
                        </div>

                        <div className="textbox flex justify-center items-center flex-col gap-6">
                            <input {...formik.getFieldProps('password')} type="password" placeholder="Password" className={style.textbox}/>
                            <button type="submit" className={style.btn}>Sign In</button>
                        </div>

                        <div className="text-center py-4">
                            <span>Forgot Password <Link className="text-red-500 font-bold" to="/recovery">Recover Now</Link></span>
                        </div>
                    </form>
                </div>
            </duv>
        </div>
    )
};