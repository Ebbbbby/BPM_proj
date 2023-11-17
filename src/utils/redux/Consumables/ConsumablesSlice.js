import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "../../api";
import { successAlert } from "../Global/GlobalSlice";

const service = process.env.REACT_APP_BACKEND_ASSETS_URL;
export const asset_api = api(service);

export const GetConsummableAcquisition = createAsyncThunk(
  "consummables/GetConsummableAcquisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await asset_api.get(
        `ConsumableAcquisition?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&SearchText=${searchText}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleConsummableAcquisition = createAsyncThunk(
  "consummables/GetConsummableAcquisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage } = payload;
    try {
      const response = await asset_api.get(
        `ConsumableAcquisition/${payload}?id=${payload}PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveConsummableAcquisition = createAsyncThunk(
  "consummables/ApproveConsummableAcquisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableAcquisition/approve`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineConsummableAcquisition = createAsyncThunk(
  "consummables/ApproveConsummableAcquisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.get(
        `ConsumableAcquisition/decline`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeleteConsummableAcquisition = createAsyncThunk(
  "consummables/ApproveConsummableAcquisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.get(
        `ConsumableAcquisition/delete`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const CreateConsummableAcquisition = createAsyncThunk(
  "consummables/ApproveConsummableAcquisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableAcquisition/add`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const EditConsummableAcquisition = createAsyncThunk(
  "consummables/ApproveConsummableAcquisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableAcquisition/update`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetConsummableAllocation = createAsyncThunk(
  "consummables/GetConsummableAllocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await asset_api.get(
        `ConsumableAllocation?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&SearchText=${searchText}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveConsummableAllocation = createAsyncThunk(
  "consummables/ApproveConsummableAllocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableAllocation/approve`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineConsummableAllocation = createAsyncThunk(
  "consummables/ApproveConsummableAllocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.get(
        `ConsumableAllocation/decline`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeleteConsummableAllocation = createAsyncThunk(
  "consummables/ApproveConsummableAllocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.get(
        `ConsumableAllocation/delete`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const EditConsummableAllocation = createAsyncThunk(
  "consummables/ApproveConsummableAllocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.get(
        `ConsumableAllocation/update`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateConsummableAllocation = createAsyncThunk(
  "consummables/ApproveConsummableAllocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableAllocation/add`,
        payload
      );
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetConsummableRequisition = createAsyncThunk(
  "consummables/GetConsummableRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await asset_api.get(
        `ConsumableRequisition?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&SearchText=${searchText}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleConsummableRequisition = createAsyncThunk(
  "consummables/GetConsummableRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.get(
        `ConsumableRequisition/${payload}?id=${payload}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveConsummableRequisition = createAsyncThunk(
  "consummables/ApproveConsummableRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableRequisition/approve`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineConsummableRequisition = createAsyncThunk(
  "consummables/ApproveConsummableRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableRequisition/decline`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeleteConsummableRequisition = createAsyncThunk(
  "consummables/ApproveConsummableRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableRequisition/delete`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateConsummableRequisition = createAsyncThunk(
  "consummables/ApproveConsummableRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableRequisition/add`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const EditConsummableRequisition = createAsyncThunk(
  "consummables/ApproveConsummableRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `ConsumableRequisition/update`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  consummables: "",
};

export const ConsumablesSlice = createSlice({
  name: "Consumables",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(GetConsummableRequisition.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetConsummableRequisition.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          requisition: action.payload,
        };
      })
      .addCase(GetConsummableRequisition.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(ApproveConsummableRequisition.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(ApproveConsummableRequisition.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          requisition_action: action.payload,
        };
      })
      .addCase(ApproveConsummableRequisition.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(GetConsummableAcquisition.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetConsummableAcquisition.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          acquisition: action.payload,
        };
      })
      .addCase(GetConsummableAcquisition.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(ApproveConsummableAcquisition.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(ApproveConsummableAcquisition.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          acquisition_action: action.payload,
        };
      })
      .addCase(ApproveConsummableAcquisition.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetConsummableAllocation.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetConsummableAllocation.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          allocations: action.payload,
        };
      })
      .addCase(GetConsummableAllocation.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(ApproveConsummableAllocation.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(ApproveConsummableAllocation.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          allocation_action: action.payload,
        };
      })
      .addCase(ApproveConsummableAllocation.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

export default ConsumablesSlice.reducer;
