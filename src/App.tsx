import { Link } from "react-router-dom";
import MapLoader from "./MapLoader";
import AddressForm from "./AddressForm";
import { useState } from "react";
import { LatLngLiteral } from "./types/googleTypes";

function App() {
    const [userPosition, setUserPosition] = useState<LatLngLiteral>({
        lat: 63.825,
        lng: 20.263,
    });

    return (
        <div className="App">
            <p>Start! Hitta din badplats</p>

            <Link to={"/badplatser"}> Hitta badplatser </Link>
            {/* <AddressForm /> */}
            <MapLoader userPosition={userPosition} />
        </div>
    );
}

export default App;
