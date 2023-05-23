import React from "react";
import { UserOptions } from "../types/beachTypes";
import { TravelMode } from "../types/googleTypes";
import { setTravelMode } from ".././features/userOptions/userOptionsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type Props = {};

const TravelModeForm = () => {
    const dispatch = useAppDispatch();
    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setTravelMode(event.target.value as TravelMode));
    };
    return (
        <form className="block max-w-sm rounded-lg bg-white p-6 ">
            <div className="relative mb-6">
                <label htmlFor="travelMode" className="">
                    Transportmedel:
                </label>
                <select
                    value={useAppSelector(
                        (state) => state.userOptions.travelMode
                    )}
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
