import React from "react";

export default function CheckBox({i, cc, countryName, handleCheckboxChange, className }) {
    const handleChange = (e) => {
        handleCheckboxChange(countryName, e.target.checked); 
    };

    return(
        <div className="flex">
            <div className={`flex w-[70%] text-gray-300 ${className}`}><label htmlFor={cc}>{countryName}</label></div>
            <div className="flex w-[30%]"><input type="checkbox" key={i} id={cc} name={countryName} value={cc} onChange={handleChange}/></div>
        </div>
    )
}