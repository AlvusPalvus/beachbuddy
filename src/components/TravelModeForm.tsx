import React from "react";
import { UserOptions } from "../types/beachTypes";
import { TravelMode } from "../types/googleTypes";

type Props = {
    userOptions: UserOptions;

    setTravelmode: React.Dispatch<React.SetStateAction<TravelMode>>;
};

const TravelModeForm = ({ userOptions, setTravelmode }: Props) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTravelmode(event.target.value as TravelMode);
    };
    return (
        <form className="block max-w-sm rounded-lg bg-white p-6 ">
            <div className="relative mb-6">
                <label htmlFor="travelMode" className="">
                    Transportmedel:
                </label>
                <select
                    value={userOptions.travelMode}
                    className=""
                    id="travelMode"
                    name="travelMode"
                    onChange={handleInputChange}
                >
                    <option value={google.maps.TravelMode.BICYCLING}>
                        Cykel
                    </option>
                    <option value={google.maps.TravelMode.DRIVING}>Bil</option>
                    <option value={google.maps.TravelMode.TRANSIT}>
                        Kollektivtraffik
                    </option>
                    <option value={google.maps.TravelMode.WALKING}>Gång</option>
                </select>
            </div>
        </form>
    );
};

export default TravelModeForm;
