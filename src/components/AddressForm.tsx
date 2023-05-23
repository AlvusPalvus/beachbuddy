import React, { useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import {
    setInputAddress,
    setOrigin,
} from ".././features/userOptions/userOptionsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type Props = {};

const AddressForm = () => {
    const [error, setError] = useState<string>("");
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
        <form
            className="block max-w-sm rounded-lg bg-white p-6 "
            onSubmit={handleSubmit}
            
        >
            <div className=" mb-6">
                <label className="font-semibold" htmlFor="address">
                    Address:
                </label>
                <input
                    className="bg-white border"
                    type="text"
                    id="address"
                    name="address"
                    value={formAddress}
                    onChange={handleAddressInputChange}
                />
                {error && <p>{error}</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default AddressForm;
