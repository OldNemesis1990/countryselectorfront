import React, { useContext, useEffect, useState, useRef } from "react";
import PageLayout from "../Layout/PageLayout";
import axios from 'axios';
import CheckBox from "../Components/CheckBox";
import Input from "../Components/Input";
import { motion } from "framer-motion";
import { CountryContext } from "../Components/CountryContext";

export default function ToScope() {
    const { data, gridData, setGridData, loading, error } = useContext(CountryContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountries, setSelectedCountries] = useState([]);
    
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (searchTerm && searchTerm.length > 2) {
                const filteredData = data.filter(item =>
                    item.country.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setGridData(filteredData);
            } else {
                setGridData(data);
            }
        }, 300);

        return () => {
            clearTimeout(debounceTimeoutRef.current); 
        };
    }, [searchTerm, data]);

    const handleCheckboxChange = (countryName, isChecked) => {
        setSelectedCountries(prev => {
            if (isChecked) {
                return [...prev, countryName];
            } else {
                return prev.filter(name => name !== countryName);
            }
        });
    };

    const showSelectedCountries = () => {
        alert(`Selected countries: ${selectedCountries.join(', ')}`);
    };

    const handleInputChange = (value) => {
        setSearchTerm(value);
    };

    return (
        <PageLayout>
            {loading && <div className="absolute w-[100%] h-[100vh] bg-gray-200 bg-opacity-50 flex items-center justify-center">Loading...</div>}
            {error && <div className="absolute w-[100%] h-[100vh] bg-red-900 bg-opacity-50 flex items-center justify-center">{error.message}</div>}
            <div className="w-[100%] flex">
                <div className="w-[30%] min-h-[100%] px-3 py-3 bg-gray-600">
                    <button className="px-6 py-2 bg-lime-500 hover:bg-lime-300 hover:text-gray-900 transition ease-linear duration-500 text-gray-800 mb-5" onClick={showSelectedCountries}>
                        Alert Selected Countries
                    </button>
                    <ul>
                        {data.map((item, index) => (
                            <CheckBox key={index} i={index} cc={item.country_code} countryName={item.country} handleCheckboxChange={handleCheckboxChange} />
                        ))}
                    </ul>
                </div>
                <div className="w-[70%] min-h-[100%] px-3 py-3">
                    <div className="w-[100%] bg-gray-500">
                        <Input value={searchTerm} searchInput={handleInputChange} />
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {gridData.map((item, index) => (
                            <motion.div key={index} className="bg-gray-700 border-2 border-lime-400 m-2">
                                <div>
                                    <h2 className="text-gray-300 font-bold text-lg text-center">{item.country} - {item.country_code}</h2>
                                    <div className="pl-3 text-gray-300">
                                        <p> - Total cases: {item.patients.total_reports}</p>
                                        <p> - Currently infected: {item.patients.infected}</p>
                                        <p className="text-lime-400"> - Total recovered: {item.patients.recovered}</p>
                                        <p className="text-red-600"> - Total deaths: {item.patients.death}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
