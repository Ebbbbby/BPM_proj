import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { GlobalServices } from "./GlobalService";

export const GetNigerianStates = createAsyncThunk(
  "global/GetNigerianStates",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await GlobalServices.global().States();
      //console.log(response)
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetServiceType = createAsyncThunk(
  "global/GetServiceType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await GlobalServices.global().ServiceType();
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAssets = createAsyncThunk(
  "global/GetAssets",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await GlobalServices.global().Assets();

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAssetType = createAsyncThunk(
  "global/GetAssetType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await GlobalServices.global().AssetType();
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetAssetClass = createAsyncThunk(
  "global/GetAssetClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await GlobalServices.global().AssetClass();
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetCompanyType = createAsyncThunk(
  "global/GetCompanyType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await GlobalServices.global().CompanyType();
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetVendorType = createAsyncThunk(
  "global/GetVendorType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await GlobalServices.global().VendorType();
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetInsuranceCompanies = createAsyncThunk(
  "global/GetInsuranceCompanies",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await GlobalServices.global().InsuranceCompanies();
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetEmployees = createAsyncThunk(
  "global/GetEmployees",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await GlobalServices.global().Employees(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  global: "",
  states: {},
  comments: "",
  success: false,
};

export const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    globalSearch(state, action) {
      return {
        ...state,
        global_search: action.payload,
      };
    },
    addComment(state, action) {
      return {
        ...state,
        comments: action.payload,
      };
    },

    approvalAndDecline(state, action) {
      return {
        ...state,
        state: action?.payload?.state,
        kind: action.payload?.kind,
        topic: action.payload?.topic,
        action: action?.payload?.action,
        requestId: action?.payload?.requestId,
      };
    },
    successAlert(state, { payload }) {
      return {
        ...state,
        message: payload?.message,
        success: true,
        type: payload?.type,
        close: payload?.close,
      };
    },

    successAlertOff(state, { payload }) {
      return {
        ...state,
        message: payload?.message,
        success: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetNigerianStates.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetNigerianStates.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          states: action.payload,
        };
      })
      .addCase(GetNigerianStates.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetServiceType.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetServiceType.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          serviceTypes: action.payload,
        };
      })
      .addCase(GetServiceType.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetAssetType.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetAssetType.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          assetTypes: action.payload,
        };
      })
      .addCase(GetAssetType.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetAssetClass.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetAssetClass.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          assetClass: action.payload,
        };
      })
      .addCase(GetAssetClass.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetAssets.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetAssets.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          assets: action.payload,
        };
      })
      .addCase(GetAssets.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetCompanyType.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetCompanyType.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          companyTypes: action.payload,
        };
      })
      .addCase(GetCompanyType.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetVendorType.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetVendorType.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          vendorsTypes: action.payload,
        };
      })
      .addCase(GetVendorType.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetInsuranceCompanies.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetInsuranceCompanies.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          insurance: action.payload,
        };
      })
      .addCase(GetInsuranceCompanies.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(GetEmployees.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetEmployees.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          employees: action.payload,
        };
      })
      .addCase(GetEmployees.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  globalSearch,
  addComment,
  approvalAndDecline,
  successAlert,
  successAlertOff,
} = GlobalSlice.actions;
export default GlobalSlice.reducer;
