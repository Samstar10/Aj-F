import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/signin")
    }

    return (
        <aside className="hidden bg-[#0A2FB6] h-screen w-1/5 fixed left-0 top-0 pt-10 pb-5 md:flex flex-col justify-between">
            <div className="flex flex-col space-y-6">
                <NavLink to="/incidentreport" activeClassName="active" className="text-white">New Incident</NavLink>
                <NavLink to="/myincidents" activeClassName="active" className="text-white">My Incidents</NavLink>
            </div>
            <div className="mt-auto">
                <button onClick={handleLogout} className="bottom-0 text-white">Sign Out</button>
            </div>
        </aside>
    )
}