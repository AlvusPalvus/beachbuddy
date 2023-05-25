import { Beach } from "../types/beachTypes";

export const sortBeaches = (beachesToSort: Beach[], order: string) => {
    const sortedBeaches: Beach[] = [];
    if (beachesToSort) {
        beachesToSort.forEach((beach) => {
            const beachToAdd: Beach = {
                info: {
                    name: beach.info.name,
                    area: beach.info.area,
                    accessibility: beach.info.accessibility,
                    position: beach.info.position,
                },
            };
            Object.assign(beachToAdd, beach);
            sortedBeaches.push(beachToAdd);
        });
    }

    if (order === "distance") {
        sortedBeaches.sort((a: Beach, b: Beach) => {
            if (
                a.travelInfo?.distance !== undefined &&
                b.travelInfo?.distance !== undefined
            ) {
                const result =
                    parseFloat(a.travelInfo.distance) -
                    parseFloat(b.travelInfo.distance);
                return result;
            }
            else {
                return 0;
            }
        });
    }
    
    return sortedBeaches;
};