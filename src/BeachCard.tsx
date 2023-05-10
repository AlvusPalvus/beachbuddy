import { Beach, WeatherInfo, DistanceInfo } from './BeachList';

type Props = {
    beach: Beach;
};

const BeachCard = (props: Props) => {
    return(
        <div className="beach-card">
            <h4 className="beach-name">{props.beach.info.name}</h4>
            <p className="beach-temperature">{props.beach.weather?.temperature} °C</p>
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
                    <p>? km</p>
                </div>
            </div>
            <div className="beach-button">Hitta hit</div>
        </div>
    );
};

export default BeachCard;
