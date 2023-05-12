import React, { useState } from "react";
import { UserOptions } from "./types/beachTypes";

// IMPLEMENT USER OPTIONS FORM HERE!
// Position och färdmedel
// Det mesta här är autogenererat av chattis

type Props = {
    userOptions: UserOptions;
};

const OptionsForm = ({ userOptions }: Props) => {
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (address.trim() === "") {
            setError("Please enter an address.");
        } else if (!isValidAddress(address)) {
            setError("Please enter a valid address.");
        } else {
            // Submit form
        }
    };

    const isValidAddress = (address: string): boolean => {
        // Add your address validation logic here
        return true;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={handleInputChange}
                />
                {error && <p>{error}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default OptionsForm;
