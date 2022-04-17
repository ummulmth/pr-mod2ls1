import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./sliceAcc/sliceAcc"

export default configureStore({
    reducer: {
        auth: authReducer,
    },
}); 