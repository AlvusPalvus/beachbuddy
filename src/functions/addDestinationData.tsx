import { Beach, UserOptions } from "../types/beachTypes";
import { LatLngLiteral, TravelMode } from "../types/googleTypes";

type Props = {
    beachList: Beach[];
    userOptions: UserOptions;
};

const addDestinationData = async ({ beachList, userOptions }: Props) => {
    const res = await Promise.allSettled(
        beachList.map(async (beach, i) => {
            try {
                const wait = false;
                while (wait) {}
                const res = await fetchTravelTime(
                    {
                        lat: beach.info.coordinateX,
                        lng: beach.info.coordinateY,
                    },
                    userOptions.origin,
                    userOptions.travelMode,
                    wait
                );
                // Replace , with . in distance response
                const formattedKm = res?.km.replace(",", ".");
                beach.travelInfo = {
                    travelMode: userOptions.travelMode,
                    travelTime: res?.time,
                    distance: formattedKm,
                };
            } catch (error) {
                beach.travelInfo = {
                    travelMode: userOptions.travelMode,
                    travelTime: "No data",
                    distance: "No data",
                };
            }
            return beach;
        })
    );

    return beachList;
};

export const fetchTravelTime = (
    origin: LatLngLiteral,
    destination: LatLngLiteral,
    travelMode: TravelMode,
    wait: boolean
): Promise<{ time: string; km: string }> => {
    return new Promise((resolve, reject) => {
        try {
            const service = new google.maps.DirectionsService();
            let travelModeGoogle: google.maps.TravelMode = google.maps.TravelMode.BICYCLING
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

            service.route(
                {
                    origin,
                    destination,
                    travelMode: travelModeGoogle,
                },
                (result, status) => {
                    if (status === "OK" && result) {
                        const duration = result.routes[0].legs[0].duration;
                        const distance = result.routes[0].legs[0].distance;

                        const time = duration ? duration?.text : "no data";
                        const km = distance ? distance?.text : "no data";
                        resolve({ time, km });
                    } else if (
                        status == google.maps.DirectionsStatus.OVER_QUERY_LIMIT
                    ) {
                        wait = true;
                        setTimeout("wait = true", 2000);
                    } else {
                        const errorMsg = "no data";
                        resolve({ time: errorMsg, km: errorMsg });
                    }
                }
            );
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export default addDestinationData;
