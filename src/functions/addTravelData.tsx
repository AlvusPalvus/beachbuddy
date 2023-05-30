import { Beach, UserOptions } from "../types/beachTypes";
import { LatLngLiteral, TravelMode } from "../types/googleTypes";

type Props = {
    beachList: Beach[];
    userOptions: UserOptions;
    setMapsError: Function;
};

const addTravelData = async ({
    beachList,
    userOptions,
    setMapsError,
}: Props) => {
    for (const beach of beachList) {
        try {
            const res = await fetchTravelTime(
                beach.info.position,
                userOptions.origin,
                userOptions.travelMode,
                0
            );
            // Replace , with . in distance response
            const formattedKm = res?.km.replace(",", ".");

            beach.travelInfo = {
                travelMode: userOptions.travelMode,
                travelTime: res?.time,
                distance: formattedKm,
            };
        } catch (error) {
            console.log("HELLO", error);
            if (error === "OVER_QUERY_LIMIT") {
                console.log("query limit reached");

                setTimeout(async () => {
                    const res = await fetchTravelTime(
                        beach.info.position,
                        userOptions.origin,
                        userOptions.travelMode,
                        1
                    );
                    const formattedKm = res?.km.replace(",", ".");
                    beach.travelInfo = {
                        travelMode: userOptions.travelMode,
                        travelTime: res?.time,
                        distance: formattedKm,
                    };
                }, 2000);
            }
            setMapsError("Kunde inte hämta distans på grund av: ", error);
        }
    }
};

type Info = {
    time: string;
    km: string;
};
export const fetchTravelTime = async (
    origin: LatLngLiteral,
    destination: LatLngLiteral,
    travelMode: TravelMode,
    index: number
) => {
    let travelModeGoogle: google.maps.TravelMode =
        google.maps.TravelMode.BICYCLING;
    // Translating strings into google types
    switch (travelMode) {
        case "BICYCLING":
            travelModeGoogle = google.maps.TravelMode.BICYCLING;
            break;
        case "DRIVING":
            travelModeGoogle = google.maps.TravelMode.DRIVING;
            break;
        case "WALKING":
            travelModeGoogle = google.maps.TravelMode.WALKING;
            break;
        case "TRANSIT":
            travelModeGoogle = google.maps.TravelMode.TRANSIT;
            break;
    }

    let info: Info = { time: "fel", km: "fel" };

    const service = new google.maps.DirectionsService();
    try {
        await service.route(
            {
                origin,
                destination,
                travelMode: travelModeGoogle,
            },
            (result, status) => {
                if (status === "OK" && result) {
                    const duration = result.routes[0].legs[0].duration;
                    const distance = result.routes[0].legs[0].distance;
                    const time = duration
                        ? duration?.text
                        : "Kunde inte hämtas";
                    const km = distance ? distance?.text : "Kunde inte hämtas";

                    info = { time, km };
                } else if (
                    status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT
                ) {
                    console.log("throwing error");
                    throw new Error("OVER_QUERY_LIMIT");
                } else if (
                    status === google.maps.DirectionsStatus.ZERO_RESULTS
                ) {
                    const time = "Ej tillgängligt";
                    const km = "Ej tillgängligt";
                    info = { time, km };
                }
            }
        );
        return info;
    } catch (error) {
        return info;
    }
};

export default addTravelData;
