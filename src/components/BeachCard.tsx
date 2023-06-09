import { BsCheck, BsX } from "react-icons/bs";
import { WeatherIcon } from "./WeatherIcon";
import { Beach, UserOptions } from "../types/beachTypes";
import { FiWind } from "react-icons/fi";
import { MdAccessibleForward, MdOutlineDirectionsCar, MdOutlineDirectionsTransitFilled, MdPedalBike } from "react-icons/md";
import { RiPinDistanceFill } from "react-icons/ri";
import { BiWalk } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setChosenBeach } from "../features/userOptions/userOptionsSlice";
import { motion } from "framer-motion";

type Props = {
    beach: Beach;
};

const buttonStyles =
    "beach-button bg-midnight rounded-b-xl justify-self-stretch flex flex-row items-center justify-center hover:bg-teal transition-color duration-300";

const BeachCard = (props: Props) => {
    const dispatch = useAppDispatch();
    const userOptions: UserOptions = useAppSelector(
        (state) => state.userOptions
    );

    const handleClick = () => {
        dispatch(setChosenBeach(props.beach));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="beach-card flex flex-col items-center justify-between text-white bg-dkblue rounded-xl"
        >
            <h4 className="beach-name text-base pt-6">
                {props.beach.info.name}
            </h4>
            <p className="beach-temperature text-[1.32em] font-semibold text-teal pt-4 pb-3.5">
                {props.beach.weather?.temperature} °C
            </p>
            {props.beach.weather?.weatherSymbol && (
                <WeatherIcon symbol={props.beach.weather?.weatherSymbol} />
            )}
            <hr className="card-divider my-5" />
            <div className="beach-info-box mb-5">
                <div className="beach-info-icon-group">
                    <FiWind size={23} color="#6291BC" />
                    <p className="text-sm pt-1">
                        {props.beach.weather?.windSpeed} m/s
                    </p>
                </div>
                <div className="beach-info-icon-group">
                    <MdAccessibleForward size={21} color="#6291BC" />
                    <div className="pt-1">
                        {props.beach.info.accessibility === true && (
                            <BsCheck size={22} />
                        )}
                        {props.beach.info.accessibility === false && (
                            <BsX size={23} />
                        )}
                    </div>
                </div>
                <div className="beach-info-icon-group">
                    <RiPinDistanceFill size={23} color="#6291BC" />
                    <p className="text-sm pt-1">
                        {props.beach.travelInfo?.distance}
                    </p>
                </div>
            </div>
            <Link
                className={buttonStyles}
                to={"/badplatser/" + props.beach.info.name}
                onClick={handleClick}
            >
                {userOptions.travelMode === "BICYCLING" && 
                    <div className="flex flex-row items-center">
                        <MdPedalBike className="mr-2" size={18} /> 
                        Hitta hit
                    </div>
                }
                {userOptions.travelMode === "WALKING" && 
                    <div className="flex flex-row items-center">
                        <BiWalk className="mr-2" size={18} /> 
                        Hitta hit
                    </div>
                }
                {userOptions.travelMode === "DRIVING" && 
                    <div className="flex flex-row items-center">
                        <MdOutlineDirectionsCar className="mr-2" size={18} /> 
                        Hitta hit
                    </div>
                }
                {userOptions.travelMode === "TRANSIT" && 
                    <div className="flex flex-row items-center">
                        <MdOutlineDirectionsTransitFilled className="mr-2" size={18} /> 
                        Hitta hit
                    </div>
                }
            </Link>
        </motion.div>
    );
};

export default BeachCard;
