import { ThemeColorsType } from '@Src/shared/theme/model/colors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonAlertState {
  isShow?: boolean;
  messageHTML: string;
  okBtnName?: string;
  okBtnColor?: ThemeColorsType;
  okBtnCallback?: () => void;
  cancelBtnName?: string;
  cancelBtnColor?: ThemeColorsType;
  cancelBtnCallback?: () => void;
}

const initialState: CommonAlertState = {
  isShow: false,
  messageHTML: '',
};

const commonAlertSlice = createSlice({
  name: 'commonAlert',
  initialState,
  reducers: {
    showCommonAlert(state: CommonAlertState, action: PayloadAction<CommonAlertState>): CommonAlertState {
      const newState = { ...state };
      newState.isShow = true;
      newState.messageHTML = action.payload.messageHTML;
      newState.okBtnName = action.payload.okBtnName ? action.payload.okBtnName : undefined;
      newState.okBtnColor = action.payload.okBtnColor ? action.payload.okBtnColor : undefined;
      newState.okBtnCallback = action.payload.okBtnCallback ? action.payload.okBtnCallback : undefined;
      newState.cancelBtnName = action.payload.cancelBtnName ? action.payload.cancelBtnName : undefined;
      newState.cancelBtnColor = action.payload.cancelBtnColor ? action.payload.cancelBtnColor : undefined;
      newState.cancelBtnCallback = action.payload.cancelBtnCallback ? action.payload.cancelBtnCallback : undefined;

      return newState;
    },
    hideCommonAlert(): CommonAlertState {
      return initialState;
    },
  },
});

export const { showCommonAlert, hideCommonAlert } = commonAlertSlice.actions;

export default commonAlertSlice.reducer;
