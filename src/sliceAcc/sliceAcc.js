import { createSlice } from "@reduxjs/toolkit";

export const sliceAcc = createSlice({
    name: "auth",
    initialState: {
        token: 0,
        login: false,
        user: {},
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.login = true;
            state.user = action.payload.user;
        },
    },
});

export const {login} = sliceAcc.actions;
export default sliceAcc.reducer; 