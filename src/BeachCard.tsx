import { BsCheck, BsX } from "react-icons/bs";
import { WeatherIcon } from "./WeatherIcon";
import { Beach } from "./types/beachTypes";
import { FiWind } from "react-icons/fi";
import { GrWheelchairActive } from "react-icons/gr";
import { RiPinDistanceFill } from "react-icons/ri";

type Props = {
    beach: Beach;
};

const BeachCard = (props: Props) => {
    return(
        <div className="beach-card flex flex-col items-center justify-between text-white bg-dkblue rounded-xl">
            <h4 className="beach-name text-base pt-5">{props.beach.info.name}</h4>
            <p className="beach-temperature text-[1.5625em] font-semibold text-teal pt-3.5 pb-2.5">{props.beach.weather?.temperature} °C</p>
            {props.beach.weather?.weatherSymbol && <WeatherIcon symbol={props.beach.weather?.weatherSymbol} />}
            <hr />
            <div className="beach-info-box">
                <div className="beach-info-icon-group">
                    <FiWind size={25} />
                    <p>{props.beach.weather?.windSpeed} m/s</p>
                </div>
                <div className="beach-info-icon-group">
                    <GrWheelchairActive size={25} />
                    {props.beach.info.accessibility === true && <BsCheck size={26}/>}
                    {props.beach.info.accessibility === false && <BsX size={27} />}
                </div>
                <div className="beach-info-icon-group">
                    <RiPinDistanceFill size={25} />
                    <p>{props.beach.travelInfo?.travelTime}</p>
                </div>
            </div>
            <div className="beach-button bg-midnight rounded-b-xl justify-self-stretch">Hitta hit</div>
        </div>
    );
};

export default BeachCard;
