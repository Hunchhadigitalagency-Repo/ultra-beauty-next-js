/* eslint-disable @typescript-eslint/no-explicit-any */

import { EUserTypes, IProfileDetails } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HomeState = {
  accessToken: string;
  refreshToken: string;
  selectedData: any;
  email: string;
  profileDetails: IProfileDetails;
  refetch: boolean;
  userType: EUserTypes | null;
  isLoggedIn: boolean;
};

const initialState = {
  accessToken: "",
  refreshToken: "",
  selectedData: {} as any,
  email: "",
  profileDetails: {} as IProfileDetails,
  refetch: false,
  userType: null,
  isLoggedIn: false,
} as HomeState;

export const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setSelectedData: (state, action: PayloadAction<any>) => {
      state.selectedData = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setProfileDetails: (state, action) => {
      state.profileDetails = action.payload;
    },
    toggleRefetch: (state) => {
      state.refetch = !state.refetch;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setSelectedData,
  setEmail,
  setProfileDetails,
  toggleRefetch,
  setUserType,
  setIsLoggedIn,
} = authentication.actions;
export default authentication.reducer;
