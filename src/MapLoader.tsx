import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { LatLngLiteral } from "./types/googleTypes";

type Props = {
    userPosition: LatLngLiteral;
};

const MapLoader = ({ userPosition }: Props) => {
    let center = useMemo(
        () => ({ lat: userPosition.lat, lng: userPosition.lng }),
        [userPosition]
    );

    if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined) {
        console.error("You need the access key");
        return <div>mapLoader failed</div>;
    }

    return Map(center);
};

function Map(center: LatLngLiteral) {
    return (
        <>
            <GoogleMap
                mapContainerClassName="mapContainer"
                zoom={10}
                center={center}
            >
                <Marker position={center}></Marker>
            </GoogleMap>
        </>
    );
}

export default MapLoader;
