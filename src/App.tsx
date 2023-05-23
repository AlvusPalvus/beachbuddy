import { Link } from "react-router-dom";
import MapLoader from "./components/MapLoader";
import AddressForm from "./components/AddressForm";
import TravelModeForm from "./components/TravelModeForm";
import ReduxDemo from "./components/ReduxDemo";

function App() {
    return (
        <div className="App flex flex-col gap-4 max-w-4xl m-auto ">
            <h1 className="text-xl font-black">Start! Hitta din badplats</h1>
            <p>Ställ in din starposition och transportmedel</p>
            <div className="flex w-full justify-between ">
                <AddressForm />
                <TravelModeForm />
            </div>

            <MapLoader />

            <Link
                className="px-6 py-4 w-fit self-center text-base font-bold text-white bg-midnight rounded-full hover:bg-cyan-600"
                to={"/badplatser"}
            >
                Hitta badplatser
            </Link>
            <ReduxDemo />
        </div>
    );
}

export default App;
