import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [defaultData, setDefaultData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_COUNTRIES_API);
            setData(response.data.countries);
            setGridData(response.data.countries);
            setDefaultData(response.data.countries);
        } catch (err) {
            setError(err);
            console.error("Error fetching countries:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <CountryContext.Provider value={{ setData, data, gridData, setGridData, defaultData, loading, error }}>
            {children}
        </CountryContext.Provider>
    );
};