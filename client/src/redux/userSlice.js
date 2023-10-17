import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false, 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.loading = false
            state.error = true
        },
        logout: (state) => {
            state.currentUser =null;
            state.loading = false;
            state.error = false;
        },
        subscription:(state,action)=> {
            if(state.currentUser.subscribedUsers.includes(action.payload)){  // User Already subscribed
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex( // Removing user from subscribedUsers array by finding the index of channelid
                        ((channelId) => channelId === action.payload)
                    ),1
                )

            } else{ // User not subscribed yet 
                state.currentUser.subscribedUsers.push(action.payload); // Adding userid to the subscribedUsers array
            }
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription} = userSlice.actions;

export default userSlice.reducer;