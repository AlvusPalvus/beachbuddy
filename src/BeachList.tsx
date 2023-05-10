import { useEffect, useState } from "react";
import { getBeachData } from "./functions/getBeachData";
import { addWeatherData } from "./functions/addWeatherData";
import BeachCard from "./BeachCard";

// Kan vi lägga alla typer i en egen fil också? :)
type Props = {
    adress?: string;
};

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

const BeachList = (props: Props) => {
    const [beachList, setBeachList] = useState<Beach[]>();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [openDataError, setOpenDataError] = useState("");
    const [smhiError, setSmhiError] = useState("");

    // Runs at initial render
    useEffect (() => {
        const fetchAllData = async () => {
            const beachData:Beach[] = await getBeachData(openDataUrl, setOpenDataError);
            const beachWeatherData:Beach[] = await addWeatherData(beachData, setSmhiError);
            setBeachList(beachWeatherData);
            // Run a function here to get distance data! :)
        };

        setIsPending(true);
        fetchAllData();
        // Simulates time to load screen, used for formatting loading text
        setTimeout(() => setIsPending(false), 2000)
    }, [])

    return (
        <div className="beach-list">
            <h2>BeachList</h2>
            {isPending && <div className="loading-indicator">Laddar badplatser...</div>}
            {openDataError && <p>{openDataError}</p>}
            {smhiError && <p>{smhiError}</p>}

            {!isPending && <div style={{ display: 'flex', gap: '20px', maxWidth: '100vw', flexWrap: 'wrap' }}>
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
        </div>
    );
};

export default BeachList;
