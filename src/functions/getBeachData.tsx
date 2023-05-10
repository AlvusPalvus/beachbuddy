import axios from 'axios';

type Beach = {
    // Should we add an ID here (to get rid of error msg in console)???
    info: BeachInfo,
    weather?: WeatherInfo
    // distance?: DistanceInfo
}

type BeachInfo = {
    name: string,
    area: string,
    accessibility: boolean,
    coordinateX: number, 
    coordinateY: number
};

type WeatherInfo = {
    temperature: number,
    windSpeed: number,
    weatherSymbol: number
};

export const getBeachData = async (url:string, setOpenDataError:Function) => {
    const beachArray:Beach[] = []
    await axios.get(url)
        // Köras om 200 OK
        .then((response) => {
            const beaches = response.data.records;
            for (let i = 0; i < beaches.length; i++) {
                let info : BeachInfo = {
                    name: beaches[i].fields.namn,
                    area: beaches[i].fields.omrade,
                    accessibility: beaches[i].fields.handik_anp === undefined ? false : true,
                    coordinateX: beaches[i].fields.geo_point_2d[0],
                    coordinateY: beaches[i].fields.geo_point_2d[1]
                }
                // Create beach object with fetched info
                let beach : Beach = {
                    info: info
                }
                beachArray.push(beach);
            }
        })
        // Körs om Fel 204 - 404 ERROR
        .catch((error) => {
            setOpenDataError(error.message);
        })
    return beachArray;
}