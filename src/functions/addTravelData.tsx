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
            console.log(error);
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
            } else if (error === google.maps.DirectionsStatus.ZERO_RESULTS) {
                //     const time = "Ej tillgängligt";
                //     const km = "Ej tillgängligt";
                //     info = { time, km };
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
    try {
        const service = new google.maps.DirectionsService();

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
                }
                if (status === "OVER_QUERY_LIMIT") {
                    console.log("throw error");
                    //throw new Error("OVER_QUERY_LIMIT");
                }
            }
        );
    } catch (error: any) {
        if (error.code === "ZERO_RESULTS") {
            const time = "Ej tillgängligt";
            const km = "Ej tillgängligt";
            info = { time, km };
        } else {
            console.log(error);
            throw new Error("test error");
        }
    }

    return info;
};

export default addTravelData;
