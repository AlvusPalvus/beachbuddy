import { useEffect, useState } from "react";
import axios from 'axios';
import BeachCard from "./BeachCard";
import { setDefaultResultOrder } from "dns/promises";

type Props = {
    adress?: string;
};
//kkk
type Beach = {
    // Should we add an ID here (to get rid of error msg in console)???
    info: BeachInfo,
    weather?: WeatherInfo
    // distance?: DistanceInfo
}

type BeachInfo = {
    name: string,
    area: string,
    accessibility: boolean,
    coordinateX: number, 
    coordinateY: number
};

type WeatherInfo = {
    temperature: number,
    windSpeed: number,
    weatherSymbol: number
};

type DistanceInfo = {
    userPositionX: number,
    userPositionY: number,
    distanceToBeach: number
}

const openDataUrl:string = 'https://opendata.umea.se/api/records/1.0/search/?dataset=badplatser&q=&rows=33&facet=namn&facet=omrade&facet=handik_anp';

// const eller let
// const = konstant går inte att ändra
// let vanlig variablel, går att ändra

const BeachList = (props: Props) => {
    const [beachList, setBeachList] = useState<Beach[]>();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [openDataError, setOpenDataError] = useState("");
    const [smhiError, setSmhiError] = useState("");

    // Runs at initial render
    useEffect (() => {
        setIsPending(true);
        // kör en funktion för att hämta en lista med beaches (med beachinfo ifyllt)
        const fetchAllData = async () => {
            console.log('fetching beaches (waiting)')
            const beachData:Beach[] = await getBeachData(openDataUrl, setBeachList, setOpenDataError);
            console.log('done fetching beaches')
            console.log('beach data (should not have temp): ', beachData)
            console.log('fetching weather (waiting)')
            const weatherData:Beach[] = await getBeachesWithWeatherInfo(beachData, setSmhiError);
            console.log('done fetching weather');
            console.log(weatherData);
            setBeachList(weatherData);
            setIsPending(false);
            // kör en funktion för att fylla på varje beach med avståndsdata
        };
        
        fetchAllData();
        // kör en funktion för att fylla på varje beach med väderdata
    }, [])

    const getBeachData = async (url:string, setBeachList:Function, setOpenDataError:Function) => {
        const beachArray:Beach[] = []
        await axios.get(url)
            // Köras om 200 OK
            .then((response) => {
                const beaches = response.data.records;
                for (let i = 0; i < beaches.length; i++) {
                    let info : BeachInfo = {
                        name: beaches[i].fields.namn,
                        area: beaches[i].fields.omrade,
                        accessibility: beaches[i].fields.handik_anp === undefined ? false : true,
                        coordinateX: beaches[i].fields.geo_point_2d[0],
                        coordinateY: beaches[i].fields.geo_point_2d[1]
                    }
                    // Create beach object with fetched info
                    let beach : Beach = {
                        info: info
                    }
                    beachArray.push(beach);
                }
            })
            // Körs om Fel 204 - 404 ERROR
            .catch((error) => {
                setOpenDataError(error.message);
            })
            return beachArray;
    }

    const getBeachesWithWeatherInfo = async (beachList:Beach[], setSmhiError:Function) => {
        // Create a new list to fill with weather data
        console.log('inside getweather')
        
        // Get weather data for each beach
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

                beach.weather = weatherInfo
                // Här skulle vi kunna göra att vi hämtar avståndet från användare till stranden likt ovan
                // typ beach.distance = distanceToBeach
                
            } catch (error) {
                console.error(error);
            } 
        }
        return beachList;
    }

    return (
        <>
            <div>BeachList</div>
            {!isPending && 
                <div style={{ display: 'flex', gap: '20px', maxWidth: '100vw', flexWrap: 'wrap' }}>
                    {beachList && beachList.map((item) => (
                        <div style={{ backgroundColor: 'whitesmoke', height: '200px', width: '200px' }}>
                            <h4>{item.info.name}</h4>
                            <h6>{item.info.area}</h6>
                            <h6>{item.weather && item.weather.temperature}</h6>
                            <h6>{item.weather && item.weather?.windSpeed}</h6>
                            <h6>{item.weather && item.weather?.weatherSymbol}</h6>
                        </div>
                    ))}
            </div>}
        </>
    );
};

export default BeachList;
