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
            <h1 className="text-5xl font-bold text-dkblue text-center"> Din guide till Umeås <span className="underline">bästa</span> badplatser</h1>
            <h2 className="text-lbold text-mdblue text-center">Oavsett om du vill simma, leka, <br className="md:hidden" />surfa<br className="md:block" /> eller bara äta en riktigt god glass!</h2>
            <div className="container-lg bg-dkblue h-96 min-h-0 md:min-h-full">test
            <div className="flex">
    <div className="w-1/2 bg-blue-500">test</div>
    <div className="w-1/2 bg-red-500">test</div>
  </div>

  <div className="mt-4 flex">
    <div className="w-1/2 bg-green-500">test2</div>
    <div className="w-1/2 bg-yellow-500">test2</div>
  </div></div>
            <div>
                <AddressForm />
                <TravelModeForm />
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
