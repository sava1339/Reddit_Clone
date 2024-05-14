import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../types/types"

interface PostsInitialState {
    posts: Post[]
}
const initialState:PostsInitialState = {
    posts: []
}

export const postsReducer = createSlice({
    name: "posts",
    initialState,
    reducers:{
        setPosts: (state,action: PayloadAction<Post[]> ) => {
            state.posts = action.payload;
        },
        deletePost: (state, action: PayloadAction<number> ) => {
            state.posts = state.posts.filter((el:Post) => el.id != action.payload );
        },
        addPosts: (state,action: PayloadAction<Post[]> ) => {
            action.payload.map((el:Post)=>{
                state.posts.push(el);
            })
        }
    }
})

export const {setPosts, deletePost, addPosts} = postsReducer.actions;
export default postsReducer.reducer;