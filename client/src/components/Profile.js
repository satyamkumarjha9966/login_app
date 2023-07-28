import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import style from '../style/username.module.css';
import toast, { Toaster } from 'react-hot-toast';            // To make website intractive
import { useFormik } from 'formik';                   // For validation
import { profilePageValidate } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/fetch.hook";
import { updateuser } from "../helper/helper";
import { useNavigate } from "react-router-dom";

export default function Profiles() {

    const [{isLoading, apiData, serverError}] = useFetch()
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues : {
            firstname : apiData?.firstname || "",
            lastname : apiData?.lastname || "",
            email : apiData?.email || "",
            mobile: apiData?.mobile || "",
            address : apiData?.address || ""
        },
        enableReinitialize: true,
        validate: profilePageValidate,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async (values) => {
            values = await Object.assign(values, {Profile : file || apiData?.profile || ''})

            let updatePromise = updateuser(values);

            toast.promise(updatePromise, {
                loading: "Updating....",
                success: <b>Update Successfully....</b>,
                error: <b>Could Not Update, Pls Try Again</b>
            })
            
        }
    })

    // Using use state to change file when user uploading
    const [file, setFile] = useState();

    // formik does not support file upload so we need to create this  handler
    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    };

    // Logout Handler Function
    function userLogout() {
        localStorage.removeItem('token')
        navigate('/')
    }

    if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
    if (serverError) return <h1 className="text-red-600 text-xl">{serverError.message}</h1>;

    return(
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-[800px]">
                <div className={style.glass} style={{width: "35%"}}>
                    <div className="title flex flex-col justify-center items-center">
                        <h4 className="text-5xl font-bold">Profile</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Happy to Join You!
                        </span>
                    </div>

                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="profile">
                                <img src={apiData?.profile || file || Profile} className={style.profile_img} />
                            </label>

                            <input onChange={onUpload} type="file" id="profile" name="profile"/>
                        </div>

                        <div className="textbox flex justify-center items-center flex-col gap-6">
                            <div className="name flex w-3/4 gap-10">
                                <input {...formik.getFieldProps('firstname')} type="text" placeholder="FirstName" className={style.textbox}/>
                                <input {...formik.getFieldProps('lastname')} type="text" placeholder="LastName" className={style.textbox}/>
                            </div>

                            <div className="name flex w-3/4 gap-10">
                                <input {...formik.getFieldProps('mobile')} type="text" placeholder="Mobile No." className={style.textbox}/>
                                <input {...formik.getFieldProps('email')} type="email" placeholder="Email" className={style.textbox}/>
                            </div>

                            <input {...formik.getFieldProps('address')} type="text" placeholder="Address" className={style.textbox}/>
                            <button type="submit" className={style.btn}>Update</button>    

                        </div>

                        <div className="text-center py-4">
                            <span>Comeback Later? <Link onClick={userLogout} className="text-red-500 font-bold" to="/">Log Out</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};


