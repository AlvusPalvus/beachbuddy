import React, { useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { LatLngLiteral } from "./types/googleTypes";

type Props = {
    userPosition: LatLngLiteral;
};

const MapLoader = ({ userPosition }: Props) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    });
    let center = useMemo(
        () => ({ lat: userPosition.lat, lng: userPosition.lng }),
        [userPosition]
    );

    if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined) {
        console.error("You need the access key");
        return <div>mapLoader failed</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else return Map(center);
};

function Map(center: LatLngLiteral) {
    return (
        <GoogleMap
            mapContainerClassName="mapContainer"
            zoom={10}
            center={center}
        >
            <Marker position={center}></Marker>
        </GoogleMap>
    );
}

export default MapLoader;
