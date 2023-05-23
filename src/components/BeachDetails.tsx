import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import MapLoader from "./MapLoader";

type Props = {};

const BeachDetails = (props: Props) => {
    const beach = useAppSelector((state) => state.userOptions.chosenBeach);
    const params = useParams();
    //  console.log(params.beachId);

    return (
        <div>
            <h1 className="text-3xl">{beach?.info.name}</h1>
            <p>Tid från din position: {beach?.travelInfo?.travelTime}</p>
            <MapLoader destination={beach?.info.position} />
        </div>
    );
};

export default BeachDetails;
