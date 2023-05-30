import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LatLngLiteral, TravelMode } from "../../types/googleTypes";
import { Beach } from "../../types/beachTypes";

export interface UserOptions {
    inputAddress: string;
    origin: LatLngLiteral;
    travelMode: TravelMode;
    chosenBeach?: Beach;
}

const initialState: UserOptions = {
    inputAddress: "",
    origin: {
        lat: 63.825,
        lng: 20.263,
    },
    travelMode: "BICYCLING",
};

export const userOptionsSlice = createSlice({
    name: "userOptions",
    initialState,
    reducers: {
        setInputAddress: (state, action: PayloadAction<string>) => {
            state.inputAddress = action.payload;
        },
        setOrigin: (state, action: PayloadAction<LatLngLiteral>) => {
            state.origin = action.payload;
        },
        setTravelMode: (state, action: PayloadAction<TravelMode>) => {
            state.travelMode = action.payload;
        },
        setChosenBeach: (state, action: PayloadAction<Beach>) => {
            state.chosenBeach = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setInputAddress, setOrigin, setTravelMode, setChosenBeach } =
    userOptionsSlice.actions;

// Export reducer
export default userOptionsSlice.reducer;
