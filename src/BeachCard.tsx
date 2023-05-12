import { Beach } from "./types/beachTypes";

type Props = {
    beach: Beach;
};

const BeachCard = ({ beach }: Props) => {
    return (
        <div className="bg-blue-200 w-56 flex flex-col items-center p-4 rounded-md">
            <h2 className="text-xl">{beach.info.name}</h2>
            <h6>{beach.info.area}</h6>
            <h6>{beach.weather && beach.weather.temperature}</h6>
            <h6>{beach.weather && beach.weather?.windSpeed}</h6>
            <h6>{beach.weather && beach.weather?.weatherSymbol}</h6>
            <h6>{beach.travelInfo && beach.travelInfo.travelTime}</h6>
        </div>
    );
};

export default BeachCard;
