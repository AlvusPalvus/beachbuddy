import { useEffect, useState } from "react";
import { getBeachData } from "./functions/getBeachData";
import { addWeatherData } from "./functions/addWeatherData";
import BeachCard from "./BeachCard";
import addDestinationData from "./functions/addDestinationData";

import { Beach, UserOptions } from "./types/beachTypes";
import { useParams } from "react-router-dom";

// Kan vi lägga alla typer i en egen fil också? :) JA!
type Props = {};

const openDataUrl: string =
    "https://opendata.umea.se/api/records/1.0/search/?dataset=badplatser&q=&rows=33&facet=namn&facet=omrade&facet=handik_anp";

const BeachList = (props: Props) => {
    const params = useParams();
    const [beachList, setBeachList] = useState<Beach[]>();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [openDataError, setOpenDataError] = useState("");
    const [smhiError, setSmhiError] = useState("");
    const currentTime = new Date();

    const userOptions: UserOptions = JSON.parse(params.userOptions as string);

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

            const beachListDone = await addDestinationData({
                beachList: beachData,
                userOptions: userOptions,
            });
            console.log(beachData);

            setBeachList(beachData);
            setIsPending(false);
        };

        setIsPending(true);
        fetchAllData();
        // Simulates time to load screen, used for formatting loading text
        //setTimeout(() => setIsPending(false), 2000);
    }, []);

    return (
        <div className="beach-list">
            <h2>Dina badplatsförslag</h2>
            {isPending && <div className="loading-indicator">Laddar badplatser...</div>}
            {openDataError && <p>{openDataError}</p>}
            {smhiError && <p>{smhiError}</p>}

            {!isPending && <div className="beach-grid grid-cols-3">
                {beachList && beachList.map((item) => (
                    <BeachCard beach={item} />
                ))}
            </div>}
        </div>
    );
};

export default BeachList;
