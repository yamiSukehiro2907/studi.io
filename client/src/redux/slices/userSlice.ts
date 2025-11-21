import type {User} from "@/config/schema/User";
import {createSlice} from "@reduxjs/toolkit";

export interface UserState {
    userData: User | null;
    isLoading: boolean;
    error: string;
    profileData: User | null;
}

const initialState: UserState = {
    userData: null,
    isLoading: true,
    error: "",
    profileData: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.isLoading = false;
            state.error = "";
        },
        clearUserData: (state) => {
            state.userData = null;
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
    },
});

export const {
    setUserData,
    clearUserData,
    setLoading,
    setError,
    setProfileData,
} = userSlice.actions;


export default userSlice.reducer;
