import React, { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
// import { FaUmbrellaBeach } from "react-icons-dom/fa";

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
    console.log("here");
    return (
        <GoogleMap
            mapContainerClassName="mapContainer"
            zoom={10}
            center={center}
        >
            <Marker
                // icon={{
                //     path: google.maps.SymbolPath.CIRCLE,
                //     scale: 7,
                // }}
                position={center}
                onLoad={() => console.log("marker loaded", center)}
            ></Marker>
        </GoogleMap>
    );
}

export default MapLoader;
