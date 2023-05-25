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

    // Sort according to distance (ascending)
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

    // Sort according to accessibility (accessible first)
    if (order === "accessibility") {
        sortedBeaches.sort((a: Beach, b: Beach) => {
            if (
                a.info.accessibility === false && b.info.accessibility === true
            ) {
                return -1;
            } else if (
                a.info.accessibility === true && b.info.accessibility === false
            ) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    
    // Sort according to sun chances (descending)
    if (order === "sun") {
        sortedBeaches.sort((a: Beach, b: Beach) => {
            if (
                a.weather?.weatherSymbol !== undefined &&
                b.weather?.weatherSymbol !== undefined
            ) {
                return (a.weather?.weatherSymbol - b.weather?.weatherSymbol);
            }
            else {
                return 0;
            }
        });
    }

    // Sort according to wind (ascending)
    if (order === "wind") {
        sortedBeaches.sort((a: Beach, b: Beach) => {
            if (
                a.weather?.windSpeed !== undefined &&
                b.weather?.windSpeed !== undefined
            ) {
                return (a.weather?.windSpeed - b.weather?.windSpeed);
            }
            else {
                return 0;
            }
        });
    }
    
    return sortedBeaches;
};