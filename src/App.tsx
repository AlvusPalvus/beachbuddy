import MapLoader from "./components/MapLoader";
import Form from "./components/Form";
import { useAppSelector } from "./app/hooks";

function App() {
    const userPosition = useAppSelector((state) => state.userOptions.origin);
    return (
        <div className="App flex flex-col gap-4 max-w-4xl m-auto pb-10">
            <h1 className="text-4xl font-bold text-dkblue text-center pb-2">
                Din guide till Umeås <span className="underline">bästa</span> badplatser
            </h1>
            <h2 className="text-base font-bold text-mdblue text-center pb-5">
                Oavsett om du vill simma, leka, <br className="md:hidden" />
                surfa
                <br className="md:block" /> eller bara äta en riktigt god glass!
            </h2>
            <div className="container-lg bg-dkblue w-[65vw] h-96 min-h-0 md:min-h-full rounded-xl overflow-clip">
                <div className="flex h-full flex-row">
                    <Form />
                    <div className="flex bg-black w-2/3">
                        <MapLoader centerPos={userPosition} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
