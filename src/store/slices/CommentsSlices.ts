import { createSlice, createAsyncThunk, PayloadAction, createAction } from "@reduxjs/toolkit";
import commentsAPI from "services/commentAPI";
const initialState = {
    isGetComment: false,
    comments: [],
    // --- --- ---
    isPostComment: false,
    commentPost: {}
}

export const getCommentsByIDRoom = createAsyncThunk('comments/getCommentsByIDRoom', async (idRoom:any) => {
    const response = await commentsAPI.getCommentsByIDRoom(idRoom);
    return response.data.content;
})

export const postCommentsByIDRoom = createAsyncThunk('comments/postCommentsByIDRoom', async(contentComment: any) => {
    const response = await commentsAPI.postCommentsByIDRoom(contentComment);
    return response.data.content;
})

const CommentsSlices = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getCommentsByIDRoom.pending, (state) => { })
            .addCase(getCommentsByIDRoom.fulfilled, (state, aciton) => {
                state.isGetComment = true
                state.comments = aciton.payload
            })
            .addCase(getCommentsByIDRoom.rejected, (state, action) => { })
            // --- --- ---
            .addCase(postCommentsByIDRoom.pending, (state) => {})
            .addCase(postCommentsByIDRoom.fulfilled, (state, action) => {
                state.isPostComment = true;
                state.commentPost = action.payload;
            })
            .addCase(postCommentsByIDRoom.rejected, (state, action) => {})
    },
});

export const { } = CommentsSlices.actions

export default CommentsSlices.reducer