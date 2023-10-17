import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentVideo: null,
    loading: false,
    error: false, 
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers:{
        fetchStart: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.currentVideo = action.payload
        },
        fetchFailure: (state) => {
            state.loading = false
            state.error = true
        },
        like:(state,action) => {
             if(!state.currentVideo.likes.includes(action.payload)) { // User didn't like video before
                state.currentVideo.likes.push(action.payload); // Adding userid inside like array (cannot use push without reduxtoolkit)
                state.currentVideo.dislikes.splice(
                    state.currentVideo.dislikes.findIndex( // Removing id from dislikes array by finding the index of userid
                        (userId) => userId === action.payload
                    ),1
                );
            }
        },


        dislike:(state,action) => {
            if(!state.currentVideo.dislikes.includes(action.payload)) { // User didn't dislike video before
               state.currentVideo.dislikes.push(action.payload); // Adding userid inside dislike array (cannot use push without reduxtoolkit)
               state.currentVideo.likes.splice(
                   state.currentVideo.likes.findIndex( // Removing id from likes array by finding the index of userid
                       (userId) => userId === action.payload
                   ),1
               );
           }
       },

    },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;