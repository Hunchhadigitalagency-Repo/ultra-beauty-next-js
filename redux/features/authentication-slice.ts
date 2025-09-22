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
  selectedString: any;
  userPermissions: any;
};

const initialState: HomeState = {
  accessToken: "",
  refreshToken: "",
  selectedData: {} as any,
  email: "",
  profileDetails: {} as IProfileDetails,
  selectedString: "",
  refetch: false,
  userType: null,
  isLoggedIn: false,
  userPermissions: [],
};

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
    setselectedString: (state, action) => {
      state.selectedString = action.payload;
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
    setUserPermissions: (state, action) => {
      state.userPermissions = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    resetAuthentication: () => {
      return initialState;
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
  resetAuthentication,
  setselectedString,
  setUserPermissions,
} = authentication.actions;
export default authentication.reducer;
