import { Beach } from "./types/beachTypes";

type Props = {
    beach: Beach;
};

const BeachCard = (props: Props) => {
    return(
        <div className="beach-card flex flex-col items-center justify-between text-white bg-dkblue rounded-xl">
            <h4 className="beach-name text-base">{props.beach.info.name}</h4>
            <p className="beach-temperature text-[1.5625em] font-semibold text-teal">{props.beach.weather?.temperature} °C</p>
            <div className="beach-info-box">
                <div className="beach-info-icon-group">
                    <p>w</p>
                    <p>{props.beach.weather?.windSpeed} m/s</p>
                </div>
                <div className="beach-info-icon-group">
                    <p>a</p>
                    {props.beach.info.accessibility === true && <p>✔</p>}
                    {props.beach.info.accessibility === false && <p>x</p>}
                </div>
                <div className="beach-info-icon-group">
                    <p>d</p>
                    <p>{props.beach.travelInfo?.travelTime}</p>
                </div>
            </div>
            <div className="beach-button bg-midnight rounded-b-xl justify-self-stretch">Hitta hit</div>
        </div>
    );
};

export default BeachCard;
