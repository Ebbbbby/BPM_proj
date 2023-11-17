import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthServices } from "./AuthService";
import { redirectUser } from "../../functions/ResourceFunctions";
import { URL } from "../../routes";
import { toast } from "react-toastify";
import { GetSingleVendor } from "../Vendor/VendorSlice";
import { GetCurrentUserPermissions } from "../Permission/PermissionSlice";
import { USER_CATEGORY } from "../../Enums";

export const AppLogin = createAsyncThunk(
  "user/AppLogin",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AuthServices.auth().Login(payload);
      if (response?.data?.statusCode === "00") {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...response?.data?.responseObject }, null, 2)
        );
        await dispatch(
          GetSingleVendor({
            email: response?.data?.responseObject?.email,
          })
        ).then((res) => {
          response?.data?.responseObject?.category === USER_CATEGORY.VENDOR &&
            localStorage.setItem(
              "user_data",
              JSON.stringify(response?.data?.responseObject, null, 2)
            );
        });
        await dispatch(GetCurrentUserPermissions());
        if (response?.data?.responseObject?.isOnboarded === false) {
          redirectUser(URL.Onboarding, 1);
        } else redirectUser(URL.Dashboard, 1);
      } else {
        toast.error(response?.data?.statusMessage);
      }
      return response?.data;
    } catch (error) {
      // toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response);
    }
  }
);

export const ForgotPassword = createAsyncThunk(
  "user/AppLogin",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AuthServices.auth().ForgotPassword(payload);
      if (response?.data?.successful === false) {
        toast.error(response?.data?.statusMessage);
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CompleteForgotPassword = createAsyncThunk(
  "user/AppLogin",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AuthServices.auth().ResetPassword(payload);
      if (response?.data?.successful === false) {
        toast.error(response?.data?.statusMessage);
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const SignUp = createAsyncThunk(
  "user/AppLogin",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AuthServices.auth().Signup(payload);
      // if (response?.data?.status === "00") {
      //   toast.error(response?.data?.statusMessage);
      // }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateInternalUser = createAsyncThunk(
  "permission/createStaff",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AuthServices.auth().CreateInternalUser(payload);
      if (response?.data?.successful === false) {
        toast.error(response?.data?.statusMessage);
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveInternalUser = createAsyncThunk(
  "permission/approveInternalUser",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AuthServices.auth().ApproveInternalUser(payload);
      if (response?.data?.successful) {
        toast.success(response?.data?.statusMessage);
      } else {
        toast.error(response?.data?.statusMessage);
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineInternalUser = createAsyncThunk(
  "permission/declineInternalUser",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AuthServices.auth().DeclineInternalUser(payload);
      if (response?.data?.successful) {
        toast.success(response?.data?.statusMessage);
      } else {
        toast.error(response?.data?.statusMessage);
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  isLoading: false,
  isSuccessful: false,
  user: "",
};

export const AppSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(AppLogin.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(AppLogin.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          user: action.payload,
        };
      })
      .addCase(AppLogin.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      })
      .addCase(CreateInternalUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateInternalUser.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
        };
      })
      .addCase(CreateInternalUser.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

export default AppSlice.reducer;
