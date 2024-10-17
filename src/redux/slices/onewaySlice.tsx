import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface OnewayState {
  searchResults: any;
}

// Define the initial state using that type
const initialState: OnewayState = {
  searchResults: [],
};

export const onewaySlice = createSlice({
  name: "oneway",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    storeSearchResults: (state, action: PayloadAction<any>) => {
      state.searchResults = action.payload;
    },
  },
});

export const { storeSearchResults } = onewaySlice.actions;

export default onewaySlice.reducer;
