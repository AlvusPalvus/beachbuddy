import { Beach, UserOptions } from "../types/beachTypes";
import { LatLngLiteral } from "../types/googleTypes";

type Props = {
    beachList: Beach[];
    userOptions: UserOptions;
    setMapsError: Function;
};

const addDestinationData = async ({
    beachList,
    userOptions,
    setMapsError,
}: Props) => {
    await Promise.allSettled(
        beachList.map(async (beach, i) => {
            try {
                const res = await fetchTravelTime(
                    {
                        lat: beach.info.coordinateX,
                        lng: beach.info.coordinateY,
                    },
                    userOptions.origin,
                    userOptions.travelMode
                );
                // Replace , with . in distance response
                const formattedKm = res?.km.replace(",", ".");
                beach.travelInfo = {
                    travelMode: userOptions.travelMode,
                    travelTime: res?.time,
                    distance: formattedKm,
                };
            } catch (error) {
                setMapsError("Kunde inte hämta distans på grund av: ", error);
            }
            return beach;
        })
    );

    return beachList;
};

export const fetchTravelTime = (
    origin: LatLngLiteral,
    destination: LatLngLiteral,
    travelMode: google.maps.TravelMode
): Promise<{ time: string; km: string }> => {
    return new Promise((resolve, reject) => {
        try {
            const service = new google.maps.DirectionsService();

            service.route(
                {
                    origin,
                    destination,
                    travelMode,
                },
                (result, status) => {
                    if (status === "OK" && result) {
                        const duration = result.routes[0].legs[0].duration;
                        const distance = result.routes[0].legs[0].distance;

                        const time = duration ? duration?.text : "no data";
                        const km = distance ? distance?.text : "no data";
                        resolve({ time, km });
                    } else if (
                        status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT
                    ) {
                        // VET EJ OM DETTA FUNKAR, lyckas inte framkalla errorn...
                        console.log("Här ska over_query_limit hanteras");
                        setTimeout(async function () {
                            const result = await fetchTravelTime(
                                destination,
                                origin,
                                travelMode
                            );
                            resolve(result);
                        }, 2000);
                    }
                }
            );
        } catch (error) {
            reject(error);
        }
    });
};

export default addDestinationData;
