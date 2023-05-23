import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LatLngLiteral, TravelMode } from "../../types/googleTypes";
import { RootState } from "../../app/store";

export interface UserOptions {
    inputAddress: string,
    origin: LatLngLiteral,
    travelMode: TravelMode
}

const initialState: UserOptions = {
    inputAddress: "hejsan",
    origin: {
        lat: 63.825,
        lng: 20.263,
    },
    travelMode: "BICYCLING"
}

export const counterSlice = createSlice({
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
    },
});

// Action creators are generated for each case reducer function
export const { setInputAddress, setOrigin, setTravelMode } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
