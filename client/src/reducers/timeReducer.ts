import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface TimeState{
    time:string,
}
const initialState:TimeState = {
    time:""
}
export const timeReducer = createSlice({
    name:'time',
    initialState,
    reducers:{
        setTime: (state, action: PayloadAction<string>)=>{
            state.time = action.payload
        }
    }
})
export const {setTime} = timeReducer.actions;
export default timeReducer.reducer;