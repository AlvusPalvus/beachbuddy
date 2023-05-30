import { RiPinDistanceFill } from "react-icons/ri";
import { Beach } from "../types/beachTypes";
import { WeatherIcon } from "./WeatherIcon";
import { BsBicycle, BsCheck, BsX } from "react-icons/bs";
import { BiWalk } from "react-icons/bi";
import { FaWind } from "react-icons/fa"
import { MdAccessibleForward, MdOutlineDirectionsCar, MdOutlineDirectionsTransitFilled } from "react-icons/md";
import MapLoader from "./MapLoader";

type Props = {
    beach: Beach;
};

const DetailedMapCard = (props: Props) => {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col bg-dkblue p-14 pb-13">
                <div className="flex flex-col">
                    {props.beach.weather &&
                        <div className="self-center flex flex-col">
                            <div className="self-center">
                                <WeatherIcon symbol={props.beach.weather?.weatherSymbol} />
                            </div>
                            <p className="beach-temperature text-[1.5625em] font-semibold text-teal pt-4 pb-7">
                                {props.beach.weather?.temperature} °C
                            </p>
                        </div>
                    }
                    {props.beach.info && 
                        <div className="flex flex-col justify-start">
                            <div className="flex flex-row items-center pb-2">
                                <RiPinDistanceFill size={20} color="#6291BC" />
                                <p className="text-sm ml-2 text-lgblue">
                                    {props.beach.travelInfo?.distance}
                                </p>
                            </div>
                            <div className="flex flex-row items-center pb-2">
                                {props.beach.travelInfo?.travelMode === "BICYCLING" && <BsBicycle size={22} color="#6291BC" />}
                                {props.beach.travelInfo?.travelMode === "DRIVING" && <MdOutlineDirectionsCar size={22} color="#6291BC" />}
                                {props.beach.travelInfo?.travelMode === "TRANSIT" && <MdOutlineDirectionsTransitFilled size={22} color="#6291BC" />}
                                {props.beach.travelInfo?.travelMode === "WALKING" && <BiWalk size={22} color="#6291BC" />}
                                <p className="text-sm ml-2 text-lgblue">
                                    {props.beach.travelInfo?.travelTime}
                                </p>
                            </div>
                            <div className="flex flex-row items-center pb-2">
                                <FaWind size={16} color="#6291BC" />
                                <p className="text-sm ml-2 text-lgblue">
                                    {props.beach.weather?.windSpeed} m/s
                                </p>
                            </div>
                            <div className="flex flex-row items-center pb-2">
                                <MdAccessibleForward size={22} color="#6291BC" />
                                <div>
                                    {props.beach.info.accessibility === true && (
                                        <BsCheck size={24} color="#E5F3F1" />
                                    )}
                                    {props.beach.info.accessibility === false && (
                                        <BsX size={24} color="#E5F3F1" />
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <MapLoader />
        </div>
    );
};

export default DetailedMapCard;