import { ESettings } from "@/types/table";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingState = {
  activeSetting: string;
};

const initialState: SettingState = {
  activeSetting: ESettings.PROFILE,
};

const setting = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setActiveSetting: (state, action: PayloadAction<string>) => {
      state.activeSetting = action.payload;
    },
  },
});

export const { setActiveSetting } = setting.actions;
export default setting.reducer;
