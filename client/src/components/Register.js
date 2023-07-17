import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import style from '../style/username.module.css';
import { Toaster } from 'react-hot-toast';            // To make website intractive
import { useFormik } from 'formik';                   // For validation
import { registrationValidate } from "../helper/validate";
import convertToBase64 from "../helper/convert";

export default function Register() {

    const formik = useFormik({
        initialValues : {
            email : "",
            username : "",
            password : ""
        },
        validate: registrationValidate,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async (values) => {
            values = await Object.assign(values, {Profile : file || ''})
            console.log(values);
        }
    })

    // Using use state to change file when user uploading
    const [file, setFile] = useState();

    // formik does not support file upload so we need to create this  handler
    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    };

    return(
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <duv className="flex justify-center items-center h-[800px]">
                <div className={style.glass} style={{width: "35%"}}>
                    <div className="title flex flex-col justify-center items-center">
                        <h4 className="text-5xl font-bold">Register</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Happy to Join You!
                        </span>
                    </div>

                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="profile">
                                <img src={file || Profile} className={style.profile_img} />
                            </label>

                            <input onChange={onUpload} type="file" id="profile" name="profile"/>
                        </div>

                        <div className="textbox flex justify-center items-center flex-col gap-6">
                            <input {...formik.getFieldProps('email')} type="email" placeholder="E-mail" className={style.textbox}/>
                            <input {...formik.getFieldProps('username')} type="text" placeholder="Username" className={style.textbox}/>
                            <input {...formik.getFieldProps('password')} type="password" placeholder="Password" className={style.textbox}/>
                            <button type="submit" className={style.btn}>Register</button>
                        </div>

                        <div className="text-center py-4">
                            <span>Already Register <Link className="text-red-500 font-bold" to="/">LogIn Now</Link></span>
                        </div>
                    </form>
                </div>
            </duv>
        </div>
    )
};