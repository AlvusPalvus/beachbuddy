import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getDate } from "../functions/getDate";
import { useEffect } from "react";
import DetailedMapCard from "./DetailedMapCard";

type Props = {};

const BeachDetails = (props: Props) => {
    const beach = useAppSelector((state) => state.userOptions.chosenBeach);
    const navigator = useNavigate();
    const today = getDate();

    // Redirect to start page if no beach has been selected
    useEffect(() => {
        if (beach === undefined || beach.info.name === "") {
            navigator("/");
        }
    }, []);

    return (
        <div className="beach-list font-default flex flex-col items-center mb-20">
            <h2 className="text-xl text-dkblue mt-2">{beach?.info.name}</h2>
            <h3 className="text-lbold text-mdblue mt-1 mb-14">
                {today.day} {today.date}, {today.time}
            </h3>
            {beach && <DetailedMapCard beach={beach} />}
            <p>Tid från din position: {beach?.travelInfo?.travelTime}</p>
        </div>
    );
};

export default BeachDetails;
