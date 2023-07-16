import React from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import style from '../style/username.module.css';

export default function Username() {
    return(
        <div className="container mx-auto">
            <duv className="flex justify-center items-center h-screen">
                <div className={style.glass}>
                    <div className="title flex flex-col justify-center items-center">
                        <h4 className="text-5xl font-bold">Hello Again!</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Explore More by Connecting with us.
                        </span>
                    </div>

                    <form className="py-1">
                        <div className="profile flex justify-center py-4">
                            <img className={style.profile_img} src={Profile} />
                        </div>

                        <div className="textbox flex justify-center items-center flex-col gap-6">
                            <input type="password" placeholder="Password" className={style.textbox}/>
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