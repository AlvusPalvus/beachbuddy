import { BsCheck, BsX } from "react-icons/bs";
import { WeatherIcon } from "./WeatherIcon";
import { Beach } from "../types/beachTypes";
import { FiWind } from "react-icons/fi";
import { MdAccessibleForward } from "react-icons/md";
import { RiPinDistanceFill } from "react-icons/ri";

type Props = {
    beach: Beach;
};

const BeachCard = (props: Props) => {
    return(
        <div className="beach-card flex flex-col items-center justify-between text-white bg-dkblue rounded-xl">
            <h4 className="beach-name text-base pt-6">{props.beach.info.name}</h4>
            <p className="beach-temperature text-[1.5625em] font-semibold text-teal pt-4 pb-3.5">{props.beach.weather?.temperature} °C</p>
            {props.beach.weather?.weatherSymbol && <WeatherIcon symbol={props.beach.weather?.weatherSymbol} />}
            <hr className="card-divider my-5"/>
            <div className="beach-info-box mb-4">
                <div className="beach-info-icon-group">
                    <FiWind size={23} color="#6291BC" />
                    <p className="text-sm pt-1">{props.beach.weather?.windSpeed} m/s</p>
                </div>
                <div className="beach-info-icon-group">
                    <MdAccessibleForward size={23} color="#6291BC" />
                    <div className="pt-1">
                        {props.beach.info.accessibility === true && <BsCheck size={24}/>}
                        {props.beach.info.accessibility === false && <BsX size={25} />}
                    </div>
                </div>
                <div className="beach-info-icon-group">
                    <RiPinDistanceFill size={23} color="#6291BC" />
                    <p className="text-sm pt-1">{props.beach.travelInfo?.distance}</p>
                </div>
            </div>
            <div className="beach-button bg-midnight rounded-b-xl justify-self-stretch">Hitta hit</div>
        </div>
    );
};

export default BeachCard;
