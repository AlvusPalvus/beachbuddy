import {
    BsCloudHazeFill,
    BsFillCloudDrizzleFill,
    BsFillCloudLightningRainFill,
    BsFillCloudSnowFill,
    BsFillCloudSunFill,
    BsFillCloudsFill,
    BsSunFill,
} from "react-icons/bs";

type Props = {
    symbol: number;
};

// Categorize weather based on SMHI weather symbol data
const categorizeWeather = (symbol: number) => {
    let category = 0;
    switch (symbol) {
        // Sunny
        case 1:
        case 2:
            category = 1;
            break;
        // Partly cloudy
        case 3:
        case 4:
            category = 2;
            break;
        // Cloudy
        case 5:
        case 6:
            category = 3;
            break;
        // Rain
        case 8:
        case 9:
        case 10:
        case 18:
        case 19:
        case 20:
            category = 4;
            break;
        // Snow
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 37:
            category = 5;
            break;
        // Thunder
        case 11:
        case 21:
            category = 6;
            break;
        // Fog
        case 7:
            category = 7;
            break;
    }
    return category;
};

export const WeatherIcon = (props: Props) => {
    const weatherCategory = categorizeWeather(props.symbol);

    return (
        <div>
            {weatherCategory === 1 && <BsSunFill size={55} color="#E5F3F1" />}
            {weatherCategory === 2 && (
                <BsFillCloudSunFill size={70} color="#E5F3F1" />
            )}
            {weatherCategory === 3 && (
                <BsFillCloudsFill size={70} color="#E5F3F1" />
            )}
            {weatherCategory === 4 && (
                <BsFillCloudDrizzleFill size={70} color="#E5F3F1" />
            )}
            {weatherCategory === 5 && (
                <BsFillCloudSnowFill size={70} color="#E5F3F1" />
            )}
            {weatherCategory === 6 && (
                <BsFillCloudLightningRainFill size={70} color="#E5F3F1" />
            )}
            {weatherCategory === 7 && (
                <BsCloudHazeFill size={70} color="#E5F3F1" />
            )}
        </div>
    );
};
