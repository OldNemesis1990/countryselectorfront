import React from "react";

export default function Input({value, searchInput, className}) {
    return(
        <input 
        type="text" 
        placeholder="Search Country" 
        value={value} onChange={(e) => searchInput(e.target.value)} 
        className={`px-3 w-100% flex ${className}`}
        />
    )
}