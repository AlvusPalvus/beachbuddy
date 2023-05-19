import React, { useState } from "react";
import { UserOptions } from "../types/beachTypes";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { LatLngLiteral } from "../types/googleTypes";

type Props = {
    userOptions: UserOptions;
    setInputAddress: React.Dispatch<React.SetStateAction<string>>;
    setOrigin: React.Dispatch<React.SetStateAction<LatLngLiteral>>;
};

const AddressForm = ({ userOptions, setInputAddress, setOrigin }: Props) => {
    const [error, setError] = useState<string>("");
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleAddressInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputAddress(event.target.value);
    };

    const fetchCoordinates = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const coordinates = await getLatLng(results[0]);
            setInputAddress(results[0].formatted_address);
            setOrigin(coordinates);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValidAddress(userOptions.inputAddress)) {
            setError("Please enter a valid address.");
        } else {
            const success = await fetchCoordinates(userOptions.inputAddress);
            if (!success) {
                console.error("fetch failed");
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
                    value={userOptions.inputAddress}
                    onChange={handleAddressInputChange}
                />
                {error && <p>{error}</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default AddressForm;
