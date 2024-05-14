import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";


interface BoolsState{
    searchInputFocus: boolean;
    hideMenu: boolean;
    openMenu: boolean;
}
const initialState: BoolsState = {
    searchInputFocus: false,
    hideMenu: false,
    openMenu: false,
}

export const toggleReducer = createSlice({
    name: "toggleBools",
    initialState,
    reducers:{
        setSearchInputFocus: (state, action: PayloadAction<boolean> ) =>{
            state.searchInputFocus = action.payload;
        },
        setHideMenu: (state, action: PayloadAction<boolean>)=>{
            state.hideMenu = action.payload;
        },
        setOpenMenu: (state, action:PayloadAction<boolean>)=>{
            state.openMenu = action.payload;
        }
    }
})
export const {setSearchInputFocus,setHideMenu, setOpenMenu} = toggleReducer.actions;
export default toggleReducer.reducer;