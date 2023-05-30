import React, { useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import {
    setInputAddress,
    setOrigin,
    setTravelMode,
} from ".././features/userOptions/userOptionsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TravelMode } from "../types/googleTypes";
import { Link } from "react-router-dom";

type Props = {};

const Form = () => {
    const [error, setError] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>(useAppSelector((state) => state.userOptions.travelMode));
    const dispatch = useAppDispatch();
    let [formAddress, setFormAddress] = useState(
        useAppSelector((state) => state.userOptions.inputAddress)
    );
    
    const UmeBounds: google.maps.LatLngBoundsLiteral = {
        east: 17,
        north: 65,
        south: 59,
        west: 23,
    };

    const handleAddressInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormAddress(event.target.value);
    };

    const fetchCoordinates = async () => {
        try {
            const results = await getGeocode({
                address: formAddress + ", Umeå",
                bounds: UmeBounds,
            });
            const coordinates = await getLatLng(results[0]);

            return {
                coordinates,
                formattedAddress: results[0].formatted_address,
            };
        } catch (error) {
            console.error("fetch failed");
        }
    };

    function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedOption(event.target.value);
        dispatch(setTravelMode(event.target.value as TravelMode));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setTravelMode(selectedOption as TravelMode));

        if (!isValidAddress(formAddress)) {
            setError("Please enter a valid address.");
        } else {
            const res = await fetchCoordinates();
            if (res !== undefined) {
                dispatch(setInputAddress(res.formattedAddress));
                dispatch(setOrigin(res.coordinates));
            }
        }
    };

    const isValidAddress = (address: string): boolean => {
        // Add address validation logic here
        return true;
    };

    return (
        <form className="flew w-1/2 p-10" onSubmit={handleSubmit}>
            <label className="text-white" htmlFor="address">
            Vart är du just nu?
            </label>
                    <div className="flex p-3 gap-x-4 pb-7"> 
                        <div className="bg-dkblue h-12 w-2/3">
                        <input className=" placeholder:text-slate-400 block bg-dkblue w-full border border-slate-300 rounded-full py-2 pl-9 pr-3 h-12 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 focus:text-white sm:text-sm text-white" 
                        placeholder="Sök på en adress..." 
                        type="text" 
                        id="address"
                        name="address"
                        value={formAddress}
                    onChange={handleAddressInputChange}
                />
                {error && <p>{error}</p>}
                        </div>
                        <div className=" w-24">
                        <button className="py-2 w-full h-12 text-sm bg-lgblue text-dkblue text-base font-semibold rounded-full shadow-md hover:bg-teal hover:text-white transition-color duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" 
                            type="submit">Hämta</button>
                        </div>
                    </div>


                <label className="text-white" htmlFor="travelMode">
                    Hur vill du resa?
                </label>
                    <div className="flex p-3 gap-x-6 pb-8" >
                        <div className="h-12 w-1/4">
                            <div className="flex items-center mb-4">
                            <input checked={selectedOption === "WALKING"} onChange={handleInputChange} id="gång" type="radio" value={google.maps.TravelMode.WALKING} name="options" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="gång" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Gång</label>
                            </div>
                            <div className="flex items-center">
                            <input checked={selectedOption === "BICYCLING"} onChange={handleInputChange} id="cykel" type="radio" value={google.maps.TravelMode.BICYCLING} name="options" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="cykel" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Cykel</label>
                            </div>
                        </div>

                        <div className="h-12 w-full">
                            <div className="flex items-center mb-4">
                            <input checked={selectedOption === "TRANSIT"} onChange={handleInputChange} id="kollektivt" type="radio" value={google.maps.TravelMode.TRANSIT} name="options" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="kollektivt" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Kollektivt</label>
                            </div>
                            <div className="flex items-center">
                            <input checked={selectedOption === "DRIVING"} onChange={handleInputChange} id="bil" type="radio" value={google.maps.TravelMode.DRIVING} name="options" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="bil" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Bil</label>
                            </div>
                        </div>
                        </div>

                    <div className="flex p-3 gap-x-6 justify-center"> 
                        <Link to={"/badplatser"} className="text-center text-sm pt-3 pb-2 w-full h-12 bg-lgblue text-dkblue font-semibold rounded-full shadow-md hover:bg-teal transition-color duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                            Hitta badplatser!
                        </Link>
                    </div>
                </form>
        
    );
};

export default Form;
