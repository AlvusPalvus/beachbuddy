import { useEffect, useState } from "react";
import { Beach, UserOptions } from "../types/beachTypes";
import { getBeachData } from "../functions/getBeachData";
import { addWeatherData } from "../functions/addWeatherData";
import { sortBeaches } from "../functions/sortBeaches";
import addTravelData from "../functions/addTravelData";

type Props = {
    setIsPending: Function;
    setError: Function;
    userOptions: UserOptions;
};

const openDataUrl: string =
    "https://opendata.umea.se/api/records/1.0/search/?dataset=badplatser&q=&rows=33&facet=namn&facet=omrade&facet=handik_anp";

function useFetchAllBeaches({ setIsPending, setError, userOptions }: Props) {
    const [beaches, setBeaches] = useState<Beach[]>();
    const [openDataError, setOpenDataError] = useState("");
    const [smhiError, setSmhiError] = useState("");
    const [mapsError, setMapsError] = useState("");

    useEffect(() => {
        const fetchAllData = async () => {
            let beachData: Beach[] = await getBeachData(
                openDataUrl,
                setOpenDataError
            );

            if (beachData.length > 0) {
                await addWeatherData(beachData, setSmhiError);
                await addTravelData({
                    beachList: beachData,
                    userOptions: userOptions,
                    setMapsError,
                });
                // Sort beaches according to default order (closest to origin)
                if (beachData !== undefined) {
                    beachData = sortBeaches(beachData, "distance");
                }
            }
            setBeaches(beachData);
            setError(openDataError + smhiError + mapsError);
            setIsPending(false);
        };

        setIsPending(true);
        fetchAllData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { beaches, setBeaches };
}

export default useFetchAllBeaches;
