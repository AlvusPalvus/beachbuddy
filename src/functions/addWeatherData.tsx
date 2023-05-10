import axios from 'axios';
import { Beach, WeatherInfo } from '../BeachList';

export const addWeatherData = async (beachList:Beach[], setSmhiError:Function) => {
    for (const beach of beachList) {
        // Format latitude and longitude for API call
        const longitude = parseFloat(beach.info.coordinateY.toFixed(2));
        const latitude = parseFloat(beach.info.coordinateX.toFixed(2));
        const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
        
        // Problemet var att den inte väntade på responsen innan nästa skickades,
        // man kan inte köra await i en foreach loop, måste vara en for of loop för det.
        try {
            const response =  await axios.get(url)

            const currentWeatherData = response.data.timeSeries[0].parameters;
            const weatherInfo : WeatherInfo = {
                temperature: currentWeatherData[10].values[0],
                windSpeed: currentWeatherData[14].values[0],
                weatherSymbol: currentWeatherData[18].values[0]
            }

            beach.weather = weatherInfo;
            // Här skulle vi kunna göra att vi hämtar avståndet från användare till stranden likt ovan
            // typ beach.distance = distanceToBeach
        } catch (error) {
            setSmhiError(error);
        } 
    }
    return beachList;
}