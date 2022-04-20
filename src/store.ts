import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./accountSlice"
import { TypedUseSelectorHook, useSelector } from "react-redux";

 const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export const useSelectorType: TypedUseSelectorHook<RootState> = useSelector;

export default store; 