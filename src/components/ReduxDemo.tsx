import { useAppDispatch, useAppSelector } from "../app/hooks";
import { 
        setInputAddress,
        setOrigin,
        setTravelMode
} from "../features/userOptions/userOptionsSlice";
import { LatLngLiteral, TravelMode } from "../types/googleTypes";

const ReduxDemo = () => {
    // Used to dispatch actions to reducer (modify state)
    const dispatch = useAppDispatch();

    // The `state` arg is correctly typed as `RootState` already
    const inputAddress: string = useAppSelector((state) => state.userOptions.inputAddress);
    const origin: LatLngLiteral = useAppSelector((state) => state.userOptions.origin);
    const travelMode: TravelMode = useAppSelector((state) => state.userOptions.travelMode);

    const editInputAddress = (address: string) => {
        dispatch(setInputAddress(address));
    }

    const editTravelMode = (travelMode: TravelMode) => {
        dispatch(setTravelMode(travelMode));
    }

    return(
        <div>
            <p>Testing Redux</p>
            {origin && <p>User origin: {origin.lat}, {origin.lng}</p>}
            {inputAddress && <p>Input address: {inputAddress}</p>}
            {travelMode && <p>Travel mode: {travelMode}</p>}
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={() => editInputAddress("New address :)")}>
                Edit input address!
            </button>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={() => editTravelMode(google.maps.TravelMode.TRANSIT)}>
                Edit travel mode!
            </button>
        </div>
    );
};

export default ReduxDemo;