import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getDate } from "../functions/getDate";
import { useEffect } from "react";
import DetailedMapCard from "./DetailedMapCard";
import { BsArrowLeft } from "react-icons/bs";

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
        <div className="beach-list font-default flex flex-col items-center mb-10">
            <h2 className="text-xl text-dkblue mt-1">{beach?.info.name}</h2>
            <h3 className="text-lbold text-mdblue mt-1 mb-5">
                {today.day} {today.date}, {today.time}
            </h3>
            {beach && <DetailedMapCard beach={beach} />}
            <div className="w-[65vw] m-3">
                <Link to={"/badplatser"} className="self-start w-56 pr-2 py-3.5 justify-center align-center bg-midnight flex flex-row text-white text-sm rounded-full hover:bg-teal focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-color duration-300" 
                >
                    <BsArrowLeft className="mr-3" size={23} />
                    Tillbaka till listan
                </Link>
            </div>
        </div>
    );
};

export default BeachDetails;
