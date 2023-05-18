import { Beach, UserOptions } from "../types/beachTypes";
import { LatLngLiteral } from "../types/googleTypes";

type Props = {
    beachList: Beach[];
    userOptions: UserOptions;
};

const addDestinationData = async ({ beachList, userOptions }: Props) => {
    const res = await Promise.allSettled(
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
                beach.travelInfo = {
                    travelMode: userOptions.travelMode,
                    travelTime: res?.time,
                    distance: res?.km,
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
