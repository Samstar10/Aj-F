import React from "react";

export default function Header(props) {
    return (
        <header className="flex justify-end p-5 shadow-xl">
            <h1 className="text-left">Welcome back {props.name}!</h1>
        </header>
    )
}