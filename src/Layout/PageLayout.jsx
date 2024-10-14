import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"

export default function PageLayout({ children }) {
    return(
        <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0 bg-gray-900">
            <nav className="w-[100vw] flex flex-col items-center p-6">
                <ul className="flex w-[60%] justify-evenly">
                    <li className="w-[100%] flex">
                        <Link to="/" className="py-3 w-[100%] bg-gray-700 text-center text-gray-200 hover:bg-gray-800 hover:text-gray-100 focus:bg-gray-600 focus:text-gray-100 transition ease-linear duration-500">Home</Link>
                    </li>
                    <li className="w-[100%] flex">
                        <Link to="/toscope" className="py-3 w-[100%] bg-gray-700 text-center text-gray-200 hover:bg-gray-800 hover:text-gray-100 focus:bg-gray-600 focus:text-gray-100 transition ease-linear duration-500">To Scope</Link>
                    </li>
                    <li className="w-[100%] flex">
                        <Link to="/creative" className="py-3 w-[100%] bg-gray-800 text-center text-lime-400 border-lime-400 border-2 hover:bg-lime-400 hover:text-gray-800 transition ease-linear duration-500">Creative</Link>
                    </li>
                </ul>
            </nav>
            <div className="w-full sm:max-w-[90vw] bg-gray-800 shadow-md overflow-hidden relative">
                {children}
            </div>
        </div>
    )
}