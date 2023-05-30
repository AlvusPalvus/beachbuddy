import { RiPinDistanceFill } from "react-icons/ri";
import { Beach } from "../types/beachTypes";
import { WeatherIcon } from "./WeatherIcon";
import { BsBicycle, BsCheck, BsX } from "react-icons/bs";
import { BiWalk } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import {
    MdAccessibleForward,
    MdOutlineDirectionsCar,
    MdOutlineDirectionsTransitFilled,
} from "react-icons/md";
import MapLoader from "./MapLoader";
import { useAppSelector } from "../app/hooks";
import { LatLngLiteral } from "../types/googleTypes";

type Props = {
    beach: Beach;
};

const DetailedMapCard = ({ beach }: Props) => {
    const userPosition = useAppSelector((state) => state.userOptions.origin);
    let centerLat = 0;
    const diffLat = userPosition.lat - beach.info.position.lat;
    if (userPosition.lat > beach.info.position.lat) {
        centerLat =
            userPosition.lat - (userPosition.lat - beach.info.position.lat) / 2;
    } else {
        centerLat =
            beach.info.position.lat -
            (beach.info.position.lat - userPosition.lat) / 2;
    }
    let centerLng = 0;
    if (userPosition.lng > beach.info.position.lng) {
        centerLng =
            userPosition.lng - (userPosition.lng - beach.info.position.lng) / 2;
    } else {
        centerLng =
            beach.info.position.lng -
            (beach.info.position.lng - userPosition.lng) / 2;
    }
    const center = {
        lat: centerLat,
        lng: centerLng,
    };

    return (
        <div className="flex flex-row w-[82vw] h-fit rounded-xl overflow-clip">
            <div className="flex flex-col bg-dkblue p-14 pb-13 w-1/3">
                <div className="flex flex-col">
                    {beach.weather && (
                        <div className="self-center flex flex-col">
                            <div className="self-center">
                                <WeatherIcon
                                    symbol={beach.weather?.weatherSymbol}
                                />
                            </div>
                            <p className="beach-temperature text-[1.5625em] font-semibold text-teal pt-4 pb-7">
                                {beach.weather?.temperature} °C
                            </p>
                        </div>
                    )}
                    {beach.info && (
                        <div className="flex flex-col justify-start">
                            <div className="flex flex-row items-center pb-2">
                                <RiPinDistanceFill size={20} color="#6291BC" />
                                <p className="text-sm ml-2 text-lgblue">
                                    {beach.travelInfo?.distance}
                                </p>
                            </div>
                            <div className="flex flex-row items-center pb-2">
                                {beach.travelInfo?.travelMode ===
                                    "BICYCLING" && (
                                    <BsBicycle size={22} color="#6291BC" />
                                )}
                                {beach.travelInfo?.travelMode === "DRIVING" && (
                                    <MdOutlineDirectionsCar
                                        size={22}
                                        color="#6291BC"
                                    />
                                )}
                                {beach.travelInfo?.travelMode === "TRANSIT" && (
                                    <MdOutlineDirectionsTransitFilled
                                        size={22}
                                        color="#6291BC"
                                    />
                                )}
                                {beach.travelInfo?.travelMode === "WALKING" && (
                                    <BiWalk size={22} color="#6291BC" />
                                )}
                                <p className="text-sm ml-2 text-lgblue">
                                    {beach.travelInfo?.travelTime}
                                </p>
                            </div>
                            <div className="flex flex-row items-center pb-2">
                                <FaWind size={16} color="#6291BC" />
                                <p className="text-sm ml-2 text-lgblue">
                                    {beach.weather?.windSpeed} m/s
                                </p>
                            </div>
                            <div className="flex flex-row items-center pb-2">
                                <MdAccessibleForward
                                    size={22}
                                    color="#6291BC"
                                />
                                <div>
                                    {beach.info.accessibility === true && (
                                        <BsCheck size={24} color="#E5F3F1" />
                                    )}
                                    {beach.info.accessibility === false && (
                                        <BsX size={24} color="#E5F3F1" />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className=" w-full">
                <MapLoader
                    centerPos={center}
                    destination={beach.info.position}
                />
            </div>
        </div>
    );
};

export default DetailedMapCard;
