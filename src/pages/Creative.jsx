import React, { useEffect, useState, useRef } from "react";
import PageLayout from "../Layout/PageLayout";
import axios from "axios";
import CheckBox from "../Components/CheckBox";
import Input from "../Components/Input";
import Chart from "../Components/Chart";

export default function Creative() {
    const [data, setData] = useState([]);
    const [defaultData,setdefaultData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [chartData, setChartData] = useState([]);

    const debounceTimeoutRef = useRef(null);

    // Fetch Country Data
    const fetchData = async () => {
        try {
            const response = await axios.get('https://leebaartman.alwaysdata.net/backend/public/api/countries');
            setData(response.data.countries);
            setdefaultData(response.data.countries);
        } catch (err) {
            setError(err); 
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (searchTerm && searchTerm.length > 2) {
                const filteredData = data.filter(item =>
                    item.country.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setData(filteredData);
            } else {
                setData(defaultData);
            }
        }, 300);

        return () => {
            clearTimeout(debounceTimeoutRef.current); 
        };
    }, [searchTerm, data]);

    const handleCheckboxChange = (countryName, isChecked) => {
        setSelectedCountries(prev => {
            if (isChecked && prev.length < 3) {
                return [...prev, countryName];
            } else if (!isChecked) {
                return prev.filter(name => name !== countryName);
            }
            return prev; 
        });
    };

    const handleInputChange = (value) => {
        setSearchTerm(value);
    };

    const handleCompareClick = () => {
        const selectedData = defaultData
            .filter(item => selectedCountries.includes(item.country))
            .map(item => ({
                country: item.country,
                patients: item.patients
            }));
    
        if (selectedData.length > 0) {
            setChartData(selectedData);
        } else {
            console.error("No data available for the selected countries");
        }
    };    

    return(
        <PageLayout>
            <div className="min-h-[calc(60vh-142px)] flex chart">
                {chartData && chartData.length < 1 && <div className="w-full flex items-center justify-center font-bold text-gray-200"><p>No country selected, please select a country and click compare...</p></div>}
                {chartData && chartData.length > 0 && (
                    <Chart countryData={chartData} columns={chartData.length} />
                )}
            </div>
            <div className="search bg-gray-500 pl-2">
                <div className="mb-3 w-[100%] flex flex-row items-center">
                    <div className="w-[70%] pr-3">
                        <Input className="w-[100%]" value={searchTerm} searchInput={handleInputChange}/>
                    </div>
                    <div className="w-[30%]">
                        <button onClick={handleCompareClick} className=" bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded w-[100%]">Compare</button>
                    </div>
                </div>
            </div>
            <div className="min-h-[calc(30vh-142px)] max-h-[calc(40vh-62px)] overflow-y-auto flex bg-gray-700 p-3 flex-col mt-[-12px]">
                <div className="grid grid-cols-6 gap-5">
                    {data.map( (item, index) => (
                        <CheckBox key={index} i={index} cc={item.country_code} countryName={item.country} handleCheckboxChange={handleCheckboxChange} />
                    ))}
                </div>
            </div>
        </PageLayout>
    )
}

