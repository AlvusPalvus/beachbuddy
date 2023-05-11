import axios from "axios";

type Beach = {
    // Should we add an ID here (to get rid of error msg in console)???
    info: BeachInfo;
    weather?: WeatherInfo;
    // distance?: DistanceInfo
};

type BeachInfo = {
    name: string;
    area: string;
    accessibility: boolean;
    coordinateX: number;
    coordinateY: number;
};

type WeatherInfo = {
    temperature: number;
    windSpeed: number;
    weatherSymbol: number;
};

export const addWeatherData = async (
    beachList: Beach[],
    setSmhiError: Function
) => {
    for (const beach of beachList) {
        // Format latitude and longitude for API call
        const longitude = parseFloat(beach.info.coordinateY.toFixed(2));
        const latitude = parseFloat(beach.info.coordinateX.toFixed(2));
        const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

        // Problemet var att den inte väntade på responsen innan nästa skickades,
        // man kan inte köra await i en foreach loop, måste vara en for of loop för det.
        try {
            const response = await axios.get(url);

            const currentWeatherData = response.data.timeSeries[0].parameters;
            const weatherInfo: WeatherInfo = {
                temperature: currentWeatherData[10].values[0],
                windSpeed: currentWeatherData[14].values[0],
                weatherSymbol: currentWeatherData[18].values[0],
            };

            beach.weather = weatherInfo;
            // Här skulle vi kunna göra att vi hämtar avståndet från användare till stranden likt ovan
            // typ beach.distance = distanceToBeach

            // Googles API funkade lite annorlunda så la den i en egen fil nu!
        } catch (error) {
            setSmhiError(error);
        }
    }
    return beachList;
};
