import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const City = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCities, setSelectedCities] = useState([]);
    const [shortestPath, setShortestPath] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://gist.githubusercontent.com/dastagirkhan/00a6f6e32425e0944241/raw/33ca4e2b19695b2b93f490848314268ed5519894/gistfile1.json');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateShortPath = () => {
        axios.post("http://localhost:8080/calculateShortestPath", { selectedCities })
            .then((res) => {
                setShortestPath(res.data);
            })
            .catch((error) => {
                console.error('Error calculating shortest path:', error);
            });
    };

    const handleDropdownChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleAddCity = () => {
        if (selectedCity && !selectedCities.includes(selectedCity)) {
            setSelectedCities([...selectedCities, selectedCity]);
        }
    };

    const handleRemoveCity = (city) => {
        setSelectedCities(selectedCities.filter(selectedCity => selectedCity !== city));
    };

    return (
        <div>
            <h2>Select Cities</h2>
            <select onChange={handleDropdownChange} value={selectedCity || ''}>
                <option value="" disabled>Select a City</option>
                {cities.map(city => (
                    <option key={city.id} value={city.name}>{city.name}</option>
                ))}
            </select>
            <button onClick={handleAddCity}>Add City</button>
            <ul>
                {selectedCities.map(city => (
                    <li key={city} onClick={() => handleRemoveCity(city)}>
                        {city}
                    </li>
                ))}
            </ul>
            <button onClick={calculateShortPath}>Calculate Shortest Path</button>
        </div>
    );
};
