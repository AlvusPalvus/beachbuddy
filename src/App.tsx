import { Link } from "react-router-dom";
import MapLoader from "./components/MapLoader";
import AddressForm from "./components/AddressForm";
import TravelModeForm from "./components/TravelModeForm";
import ReduxDemo from "./components/ReduxDemo";
import Form from "./components/Form";

function App() {
    return (
        <div className="App flex flex-col gap-4 max-w-4xl m-auto pb-12">
            <h1 className="text-4xl font-bold text-dkblue text-center pb-3"> Din guide till Umeås <span className="underline">bästa</span> badplatser</h1>
            <h2 className="text-base font-bold text-mdblue text-center pb-6">Oavsett om du vill simma, leka, <br className="md:hidden" />surfa<br className="md:block" /> eller bara äta en riktigt god glass!</h2>
            <div className="container-lg bg-dkblue h-96 min-h-0 md:min-h-full">
                <div className="flex h-full flex-row">
                    <Form/>               
                    <div className="flew bg-black w-1/2" ><MapLoader /></div>
                </div>
            </div>

            
            {/* <ReduxDemo /> */}
            
        </div>
    );
}

export default App;
