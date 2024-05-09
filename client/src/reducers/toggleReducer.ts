import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";


interface BoolsState{
    searchInputFocus: boolean;
}
const initialState: BoolsState = {
    searchInputFocus: false
}

export const toggleReducer = createSlice({
    name: "toggleBools",
    initialState,
    reducers:{
        setSearchInputFocus: (state, action: PayloadAction<boolean> ) =>{
            state.searchInputFocus = action.payload;
        }
    }
})
export const {setSearchInputFocus} = toggleReducer.actions;
export default toggleReducer.reducer;