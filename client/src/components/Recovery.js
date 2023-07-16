import React from "react";
import style from '../style/username.module.css';

export default function Username() {
    return(
        <div className="container mx-auto">
            <duv className="flex justify-center items-center h-screen">
                <div className={style.glass}>
                    <div className="title flex flex-col justify-center items-center">
                        <h4 className="text-5xl font-bold">Recovery</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Enter OTP to Recover Password.
                        </span>
                    </div>

                    <form className="py-18">
                        <div className="textbox flex justify-center items-center flex-col gap-6">
                            <span className="py-4 text-sm text-left text-gray-600">
                                Enter 6 Digit OTP Sent to Your E-Mail Address.
                            </span>
                            <input type="password" placeholder="OTP" className={style.textbox}/>
                            <button type="submit" className={style.btn}>Recover</button>
                        </div>

                        <div className="text-center py-4">
                            <span>Can't Get OTP <button className="text-red-500 font-bold">Resend</button></span>
                        </div>
                    </form>
                </div>
            </duv>
        </div>
    )
};