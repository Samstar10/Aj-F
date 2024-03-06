import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try{
            fetch("https://ajali-b.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.access_token) {
                    localStorage.setItem("token", data.access_token)
                    console.log("signed in", data)
                    navigate("/incidentreport")
                }
                else {
                    console.log("sign in failed", data)
                }
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    const navigateToSignUp = () => {
        navigate("/signup")
    }

    return (
        <div className="p-5 w-screen h-screen flex justify-between">
            <div className="background-img hidden h-full w-1/2 rounded-[29px] xl:flex justify-start items-end p-10">
                <div >
                    <h1 className="text-3xl font-bold text-[37px] text-left text-[#FFFFFF]">Ajali</h1>
                    <p className="text-[#FFFFFF] text-[25px] mt-4 font-normal">SWIFT ALERTS, TIMELY ACTIONS</p>
                </div>
            </div>
            <div className="w-full xl:w-1/2 h-full px-5 md:px-40 lg:px-40 xl:px-20">
                <div className="text-right mb-20">
                    <h4 className="font-semibold text-xl">Ajali</h4>
                </div>
                <div className="flex flex-col justify-center my-auto">
                    <div>
                        <p className="text-base font-normal">Welcome to Ajali</p>
                    </div>
                    <div className="mt-6  mx-auto">
                        <div className="flex justify-center items-center p-3 bg-[#E2E3E3] rounded-[33px]">
                            <div className="bg-[#0A2FB6] px-4 xl:px-8 py-1 rounded-[33px]">
                                <button className="text-white font-normal xl:text-base text-xs">Login</button>
                            </div>
                            <div className="bg-inherit px-4 xl:px-8 py-1 rounded-[33px]">
                                <button onClick={navigateToSignUp} className="text-[#0A2FB6] hover:text-white font-normal text-xs xl:text-base">Register</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12">
                        <p className="text-left text-[#5B5B5B] text-sm xl:text-base">Emergency services have never been so easy to access</p>
                    </div>
                    <div className="mt-12">
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <label className="text-sm xl:text-base font-normal text-left mb-3">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Please enter your username"
                                className="border-[#AFAFAF] border-[1px] rounded-[40px] py-2 px-5 text-sm focus:outline-none mb-6"
                            />
                            <label className="text-sm xl:text-base font-normal text-left mb-3">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="border-[#AFAFAF] border-[1px] rounded-[40px] py-2 px-5 text-sm focus:outline-none mb-6"
                            />
                            <Link to="/passwordreset"  className="text-right text-xs font-light mb-10">Forgot Password?</Link>
                            <button type="submit" className="text-right bg-[#0A2FB6] ml-auto text-white text-sm xl:text-base flex justify-center items-center py-3 w-1/2 rounded-[36px] hover:bg-[#5573de]">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}