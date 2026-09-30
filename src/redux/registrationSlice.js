import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registrationData: null,
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setRegistrationData: (state, action) => {
            state.registrationData = action.payload;
        },

        clearRegistrationData: (state) => {
            state.registrationData = null;
        },
    },
});

export const {
    setRegistrationData,
    clearRegistrationData,
} = registrationSlice.actions;

export default registrationSlice.reducer;