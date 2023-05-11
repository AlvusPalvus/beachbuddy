import { useEffect, useState } from "react";
import { getBeachData } from "./functions/getBeachData";
import { addWeatherData } from "./functions/addWeatherData";
import BeachCard from "./BeachCard";
import addDestinationData from "./functions/addDestinationData";
import {
    DirectionsResult,
    LatLngLiteral,
    TravelMode,
} from "./types/googleTypes";
import { Beach, UserOptions } from "./types/beachTypes";

// Kan vi lägga alla typer i en egen fil också? :) JA!
type Props = {};

const openDataUrl: string =
    "https://opendata.umea.se/api/records/1.0/search/?dataset=badplatser&q=&rows=33&facet=namn&facet=omrade&facet=handik_anp";

const BeachList = (props: Props) => {
    const [beachList, setBeachList] = useState<Beach[]>();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [openDataError, setOpenDataError] = useState("");
    const [smhiError, setSmhiError] = useState("");
    const [userPosition, setUserPosition] = useState<LatLngLiteral>({
        lat: 63.825,
        lng: 20.263,
    });
    const userOptions: UserOptions = {
        origin: {
            lat: 63.825,
            lng: 20.263,
        },
        travelMode: google.maps.TravelMode.BICYCLING,
    };
    //const [directions, setDirections] = useState<DirectionsResult>();

    // Runs at initial render
    useEffect(() => {
        const fetchAllData = async () => {
            const beachData: Beach[] = await getBeachData(
                openDataUrl,
                setOpenDataError
            );
            const beachWeatherData: Beach[] = await addWeatherData(
                beachData,
                setSmhiError
            );

            const beachDistanceData = await addDestinationData({
                beachList: beachWeatherData,
                userOptions: userOptions,
            });
            setBeachList(beachDistanceData);
            // Run a function here to get distance data! :)
        };

        setIsPending(true);
        fetchAllData();
        // Simulates time to load screen, used for formatting loading text
        setTimeout(() => setIsPending(false), 2000);
    }, []);

    return (
        <div className="beach-list">
            <h2>BeachList</h2>
            {isPending && (
                <div className="loading-indicator">Laddar badplatser...</div>
            )}
            {openDataError && <p>{openDataError}</p>}
            {smhiError && <p>{smhiError}</p>}

            {!isPending && (
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        maxWidth: "100vw",
                        flexWrap: "wrap",
                    }}
                >
                    {beachList &&
                        beachList.map((item, i) => (
                            <div
                                style={{
                                    backgroundColor: "whitesmoke",
                                    height: "200px",
                                    width: "200px",
                                }}
                                key={i}
                            >
                                <h4>{item.info.name}</h4>
                                <h6>{item.info.area}</h6>
                                <h6>
                                    {item.weather && item.weather.temperature}
                                </h6>
                                <h6>
                                    {item.weather && item.weather?.windSpeed}
                                </h6>
                                <h6>
                                    {item.weather &&
                                        item.weather?.weatherSymbol}
                                </h6>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default BeachList;
