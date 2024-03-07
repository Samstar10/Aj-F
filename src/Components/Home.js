import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    const redirectToSignUp = () => {
        navigate("/signup")
    }

    const redirectToLogin = () => {
        navigate("/signin")
    }

    return (
        <div className="w-screen h-screen">
            <header className="flex justify-end p-5 shadow-xl">
                <button onClick={redirectToLogin} className="bg-[#0A2FB6] hover:bg-[#5573de] text-white py-2 w-1/3 text-sm md:text-base md:w-1/6 rounded-xl shadow-xl transition">Sign In</button>
            </header>
            <div className="flex flex-col justify-center h-full w-full md:w-3/4 text-left p-10">
                <h1 className="font-semibold text-[60px] mb-6 appear">AJALI</h1>
                <div className="mb-10">
                    <p className="text-sm md:text-lg font-medium appear">In Kenya, accidents and emergencies occur frequently. The difference between life and death is usually the split second between first responders receiving info and acting on it, hence the birth of Ajali.
                    Ajali! offers a platform enabling citizens to swiftly report any form of accident/emergency alert to the appropriate authorities therefore  facilitating timely response and potentially saving lives.
                    </p>
                </div>
                <div>
                    <button onClick={redirectToSignUp} className="bg-[#0A2FB6] hover:bg-[#5573de] text-white py-2 w-1/2 text-sm md:text-base md:w-1/6 rounded-xl shadow-xl transition">Signup</button>
                </div>
            </div>
            
        </div>
    )
}