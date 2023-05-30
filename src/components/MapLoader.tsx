import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { LatLngLiteral } from "../types/googleTypes";
import { useAppSelector } from "../app/hooks";

type Props = {
    centerPos: LatLngLiteral;
    zoom?: number;
    destination?: LatLngLiteral;
};

const MapLoader = (props: Props) => {
    const centerPos = props.centerPos;
    const userPos = useAppSelector((state) => state.userOptions.origin);

    let center = useMemo(
        () => ({ lat: userPos.lat, lng: userPos.lng }),
        [userPos, props.centerPos]
    );

    if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined) {
        console.error("You need the access key");
        return <div>mapLoader failed</div>;
    }

    return Map(userPos, centerPos, props.destination, props.zoom);
};

function Map(
    userPosition: LatLngLiteral,
    center: LatLngLiteral,
    destination?: LatLngLiteral,
    zoom?: number
) {
    var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
    var iconUrl = "/beachIcon.png"; //"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

    return (
        <>
            <GoogleMap
                mapContainerClassName="mapContainer"
                zoom={zoom ? zoom : 10}
                center={center}
            >
                <Marker position={userPosition} icon={"/homeIcon.png"}></Marker>
                {destination && (
                    <Marker position={destination} icon={iconUrl}></Marker>
                )}
            </GoogleMap>
        </>
    );
}

export default MapLoader;
