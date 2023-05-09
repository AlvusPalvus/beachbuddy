import { useEffect, useState } from "react";
import axios from 'axios';


type Props = {
    adress?: string;
};

type BadPlatsInfo = {
    name?: string,
    area?: string,
    accessibility?: boolean,
    coordinateX?: number, 
    coordinateY?: number
};

const url : string = 'https://opendata.umea.se/api/records/1.0/search/?dataset=badplatser&q=&rows=33&facet=namn&facet=omrade&facet=handik_anp';

// const eller let
// const = konstant går inte att ändra
// let vanlig variablel, går att ändra

const BeachList = (props: Props) => {
    const [beachList, setBeachList]  = useState<BadPlatsInfo[]>();
    // UseEffect körs varje render, men en gång pga []
    useEffect (() => {
        axios.get(url)
            // Köras om 200 OK
            .then((response) => {
                const beaches = response.data.records;
                //console.log(beaches)
                const array = []

                for (let i = 0; i < beaches.length; i++) {
                    //console.log(beaches[i])
                    let info : BadPlatsInfo = {}

                    info.name = beaches[i].fields.namn;
                    info.area = beaches[i].fields.omrade;
                    info.accessibility = beaches[i].fields.handik_anp === undefined ? false : true;
                    info.coordinateX = beaches[i].fields.geo_point_2d[0];
                    info.coordinateY = beaches[i].fields.geo_point_2d[1];
                    array.push(info);
                }
                setBeachList(array);
            })
            // Körs om Fel 204 - 404 ERROR
            .catch((error) => {
                console.log(error)
            })
    },[])
    // hämta data här
    console.log(beachList);

    return (
        <>
            <div>BeachList</div>
            <div style={{ display: 'flex', gap: '20px', maxWidth: '100vw', flexWrap: 'wrap' }}>
                {beachList?.map((item) => (
                    <div style={{ backgroundColor: 'whitesmoke', height: '200px', width: '200px' }}>
                        <h4>{item.name}</h4>
                        <h6>{item.area}</h6>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BeachList;
