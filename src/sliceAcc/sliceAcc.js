import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: "auth",
    initialState: {
        token: "",
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

export const {login} = accountSlice.actions;
export default accountSlice.reducer;