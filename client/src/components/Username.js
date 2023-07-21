import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../assets/profile.png";
import style from '../style/username.module.css';
import { Toaster } from 'react-hot-toast';            // To make website intractive
import { useFormik } from 'formik';                   // For validation
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store.js";

export default function Username() {

    const navigate = useNavigate();
    const setUsername = useAuthStore(state => state.setUsername);

    const formik = useFormik({
        initialValues : {
            username : ""
        },
        validate: usernameValidate,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async (values) => {
            setUsername(values.username);
            navigate('/password');
        }
    })

    return(
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <duv className="flex justify-center items-center h-screen">
                <div className={style.glass}>
                    <div className="title flex flex-col justify-center items-center">
                        <h4 className="text-5xl font-bold">Hello Again!</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Explore More by Connecting with us.
                        </span>
                    </div>

                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <img className={style.profile_img} src={Profile} />
                        </div>

                        <div className="textbox flex justify-center items-center flex-col gap-6">
                            <input {...formik.getFieldProps('username')} type="text" placeholder="UserName" className={style.textbox}/>
                            <button type="submit" className={style.btn}>Let's Start</button>
                        </div>

                        <div className="text-center py-4">
                            <span>Not a Member <Link className="text-red-500 font-bold" to="/register">Register Now</Link></span>
                        </div>
                    </form>
                </div>
            </duv>
        </div>
    )
};