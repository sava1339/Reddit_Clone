import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Community } from "../types/types";

interface CommunityState{
    communityes: Community[],
}
const initialState:CommunityState = {
    communityes: [],
}

export const communityesReducer = createSlice({
    name: "communityes",
    initialState,
    reducers:{
        setCommunityes: (state, action: PayloadAction<Community[]>)=>{
            state.communityes = action.payload;
        },
        deleteCommunity: (state, action: PayloadAction<number>)=>{
            state.communityes = state.communityes.filter((el:Community)=> el.id != action.payload)
        },
        addCommunity: (state, action: PayloadAction<Community>)=>{
            state.communityes.push(action.payload);
        }
    }
})

export const {setCommunityes,deleteCommunity,addCommunity} = communityesReducer.actions;
export default communityesReducer.reducer;