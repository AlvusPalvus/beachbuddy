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
                const time = await fetchTravelTime(
                    {
                        lat: beach.info.coordinateX,
                        lng: beach.info.coordinateY,
                    },
                    userOptions.origin,
                    userOptions.travelMode
                );
                beach.travelInfo = {
                    travelMode: userOptions.travelMode,
                    travelTime: time,
                };
            } catch (error) {
                beach.travelInfo = {
                    travelMode: userOptions.travelMode,
                    travelTime: "No data",
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
): Promise<string> => {
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
                        const time = duration ? duration?.text : "no data";
                        resolve(time);
                    } else {
                        resolve("No data");
                    }
                }
            );
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

export default addDestinationData;
