import { Link } from "react-router-dom";
import MapLoader from "./MapLoader";
import OptionsForm from "./OptionsForm";
import { useState } from "react";
import { LatLngLiteral, TravelMode } from "./types/googleTypes";
import { useLoadScript } from "@react-google-maps/api";
import { UserOptions } from "./types/beachTypes";

function App() {
    const [origin, setOrigin] = useState<LatLngLiteral>({
        lat: 63.825,
        lng: 20.263,
    });

    const [travelMode, setTravelMode] = useState<TravelMode>(
        google.maps.TravelMode.BICYCLING
    );

    const userOptions: UserOptions = {
        origin,
        travelMode,
    };

    const options = JSON.stringify(userOptions);
    return (
        <div className="App">
            <p>Start! Hitta din badplats</p>

            <Link to={"/badplatser/" + options}> Hitta badplatser </Link>
            {/* <AddressForm userOptions={userOptions} />  */}
            <MapLoader userPosition={origin} />
        </div>
    );
}

export default App;
