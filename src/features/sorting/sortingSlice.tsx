import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SortingOptions {
    order: string
}

const initialState: SortingOptions = {
    order: "distance"
};

export const sortingSlice = createSlice({
    name: "sorting",
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<string>) => {
            state.order = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setOrder } =
    sortingSlice.actions;

// Export reducer
export default sortingSlice.reducer;
