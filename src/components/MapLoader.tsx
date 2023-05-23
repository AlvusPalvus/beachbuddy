import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { LatLngLiteral } from "../types/googleTypes";
import { useAppSelector } from "../app/hooks";

type Props = {
    destination?: LatLngLiteral;
};

const MapLoader = (props: Props) => {
    const userPosition = useAppSelector((state) => state.userOptions.origin);

    let center = useMemo(
        () => ({ lat: userPosition.lat, lng: userPosition.lng }),
        [userPosition]
    );

    if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined) {
        console.error("You need the access key");
        return <div>mapLoader failed</div>;
    }

    return Map(center, props.destination);
};

function Map(center: LatLngLiteral, destination?: LatLngLiteral) {
    return (
        <>
            <GoogleMap
                mapContainerClassName="mapContainer"
                zoom={10}
                center={center}
            >
                <Marker position={center}></Marker>
                {destination && <Marker position={destination}></Marker>}
            </GoogleMap>
        </>
    );
}

export default MapLoader;
