import { Link } from "react-router-dom";
import MapLoader from "./components/MapLoader";
import { useState } from "react";
import { LatLngLiteral, TravelMode } from "./types/googleTypes";
import { UserOptions } from "./types/beachTypes";
import AddressForm from "./components/AddressForm";
import TravelModeForm from "./components/TravelModeForm";
import ReduxDemo from "./components/ReduxDemo";

function App() {
    const [origin, setOrigin] = useState<LatLngLiteral>({
        lat: 63.825,
        lng: 20.263,
    });
    const [inputAddress, setInputAddress] = useState<string>("");

    const [travelMode, setTravelMode] = useState<TravelMode>(
        google.maps.TravelMode.BICYCLING
    );

    const userOptions: UserOptions = {
        inputAddress,
        origin,
        travelMode,
    };

    const options = JSON.stringify(userOptions);
    return (
        <div className="App flex flex-col gap-4 max-w-4xl m-auto ">
            <h1 className="text-xl font-black">Start! Hitta din badplats</h1>
            <p>Ställ in din starposition och transportmedel</p>
            <div className="flex w-full justify-between ">
                <AddressForm
                    userOptions={userOptions}
                    setInputAddress={setInputAddress}
                    setOrigin={setOrigin}
                />
                <TravelModeForm
                    userOptions={userOptions}
                    setTravelmode={setTravelMode}
                />
            </div>

            <MapLoader userPosition={origin} />

            <Link
                className="px-6 py-4 w-fit self-center text-base font-bold text-white bg-midnight rounded-full hover:bg-cyan-600"
                to={"/badplatser/" + options}
            >
                Hitta badplatser
            </Link>
            <ReduxDemo />
        </div>
    );
}

export default App;
