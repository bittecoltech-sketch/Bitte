// Updated DataInsightsLab.tsx to fix truncation issues and move API keys to environment variables
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DataInsightsLab = () => {
    const [data, setData] = useState(null);
    const API_KEY = process.env.REACT_APP_API_KEY; // Moved API key to env variable

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.example.com/data?api_key=${API_KEY}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [API_KEY]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Data Insights</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DataInsightsLab;