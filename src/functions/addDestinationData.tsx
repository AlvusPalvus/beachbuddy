import { Beach, UserOptions } from "../types/beachTypes";
import { LatLngLiteral } from "../types/googleTypes";

type Props = {
    beachList: Beach[];
    userOptions: UserOptions;
};

const fetchTravelTime = (
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
                        //Behövde dela upp såhär av någon anledning, inte så snyggt men det funkar!
                        const directions = result;
                        const routes = directions.routes;
                        const legs = routes[0].legs;
                        const leg = legs[0];
                        const time = leg.duration
                            ? leg.duration?.text
                            : "no data";
                        resolve(time);
                    } else {
                        reject(new Error("No data"));
                    }
                }
            );
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const addDestinationData = async ({ beachList, userOptions }: Props) => {
    beachList.map(async (beach, i) => {
        const time = await fetchTravelTime(
            { lat: beach.info.coordinateX, lng: beach.info.coordinateY },
            userOptions.origin,
            userOptions.travelMode
        );
        beach.travelInfo = {
            travelMode: userOptions.travelMode,
            travelTime: time,
        };
    });
    return beachList;
};

export default addDestinationData;
