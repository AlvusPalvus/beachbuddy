import { useEffect, useState } from "react";
import { getBeachData } from "./functions/getBeachData";
import { addWeatherData } from "./functions/addWeatherData";
import { getDate } from "./functions/getDate";
import BeachCard from "./BeachCard";
import addDestinationData from "./functions/addDestinationData";
import { Beach, UserOptions } from "./types/beachTypes";
import { useParams } from "react-router-dom";

type Props = {};

const openDataUrl: string =
    "https://opendata.umea.se/api/records/1.0/search/?dataset=badplatser&q=&rows=33&facet=namn&facet=omrade&facet=handik_anp";

const BeachList = (props: Props) => {
    const params = useParams();
    const [beachList, setBeachList] = useState<Beach[]>();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [openDataError, setOpenDataError] = useState("");
    const [smhiError, setSmhiError] = useState("");
    const today = getDate();
    const userOptions: UserOptions = JSON.parse(params.userOptions as string);

    useEffect(() => {
        const fetchAllData = async () => {
            const beachData: Beach[] = await getBeachData(
                openDataUrl,
                setOpenDataError
            );

            await addWeatherData(
                beachData,
                setSmhiError
            );

            await addDestinationData({
                beachList: beachData,
                userOptions: userOptions,
            });
            console.log(beachData);
            setBeachList(beachData);
            setIsPending(false);
        };

        setIsPending(true);
        fetchAllData();
    }, []);

    return (
        <div className="beach-list font-default flex flex-col items-center">
            <h2 className="text-xl text-dkblue">Dina badplatsförslag</h2>
            <h3 className="text-lbold text-mdblue">{today.day} {today.date}, {today.time}</h3>
            {isPending && <div className="loading-indicator">Laddar badplatser...</div>}
            {openDataError && <p>{openDataError}</p>}
            {smhiError && <p>{smhiError}</p>}

            {!isPending && <div className="beach-grid grid-cols-3">
                {beachList && beachList.map((item, i) => (
                    <BeachCard beach={item} key={i} />
                ))}
            </div>}
        </div>
    );
};

export default BeachList;
