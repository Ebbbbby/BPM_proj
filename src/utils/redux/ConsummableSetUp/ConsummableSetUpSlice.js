import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import { successAlert } from "../Global/GlobalSlice";

const service = process.env.REACT_APP_BACKEND_ASSETS_URL;
export const Consummable_api = api(service);

export const GetConsummableRegister = createAsyncThunk(
  "consummableSetup/CreateConsummableRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await Consummable_api.get(
        `Consumable?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&searchText=${searchText || ""}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetConsummableSingleRegister = createAsyncThunk(
  "consummableSetup/CreateConsummableRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.get(
        `consumable/${payload}?id=${payload}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveConsummableSingleRegister = createAsyncThunk(
  "consummableSetup/ApproveConsummableSingleRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `Consumable/approve`,
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

export const DeclineConsummableSingleRegister = createAsyncThunk(
  "consummableSetup/ApproveConsummableSingleRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `Consumable/decline`,
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

export const DeleteConsummableSingleRegister = createAsyncThunk(
  "consummableSetup/CreateConsummableRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `Consummable/Delete`,
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

export const CreateConsummableRegister = createAsyncThunk(
  "consummableSetup/CreateConsummableRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(`Consumable/Add`, payload);
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

export const EditConsummableRegisterSingle = createAsyncThunk(
  "consummableSetup/CreateConsummableRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(`consumable/update`, payload);
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

export const CreateConsummableCategories = createAsyncThunk(
  "consummableSetup/CreateConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/Add`,
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


export const DeleteConsummableCategories = createAsyncThunk(
  "consummableSetup/CreateConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/delete`,
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

export const UpdateConsummableCategories = createAsyncThunk(
  "consummableSetup/CreateConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/Update?id=${payload.categoryId || payload.id}`,
        payload
      );
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
            close: "refresh",
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveConsummableCategories = createAsyncThunk(
  "consummableSetup/ApproveConsummableCategories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/approve`,
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

export const DeclineConsummableCategories = createAsyncThunk(
  "consummableSetup/ApproveConsummableCategories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/decline`,
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

export const CreateConsummableClass = createAsyncThunk(
  "consummableSetup/CreateConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/Class/Add`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeleteConsummableClass = createAsyncThunk(
  "consummableSetup/CreateConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/Class/Delete`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateConsummableClass = createAsyncThunk(
  "consummableSetup/CreateConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/Class/Update?id=${payload?.id}`,
        payload
      );
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
            close: "refresh",
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateConsummableSubClass = createAsyncThunk(
  "consummableSetup/CreateConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/SubClass/Add`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const DeleteConsummableSubClass = createAsyncThunk(
  "consummableSetup/CreateConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/SubClass/Delete`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateConsummableSubClass = createAsyncThunk(
  "consummableSetup/CreateConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.post(
        `ConsumableCategory/subclass/Update`,
        payload
      );
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
            close: "refresh",
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetCategories = createAsyncThunk(
  "consummableSetup/GetCategories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await Consummable_api.get(
        `ConsumableCategory?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&SearchText=${
          searchText || ""
        }`,
        payload
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleCategories = createAsyncThunk(
  "consummableSetup/GetSingleCategories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await Consummable_api.get(
        `ConsumableCategory/${payload}?id=${payload}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetConsummableSubClass = createAsyncThunk(
  "consummableSetup/GetConsummableSubClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const {
      filter,
      sort,
      pageSize,
      currentPage,
      Name,
      CategoryId,
      ConsummableClassId,
    } = payload;
    try {
      const response = await Consummable_api.get(
        `ConsumableCategory/subclass?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&Name=${
          Name || ""
        }&CategoryId=${CategoryId || ""}&ConsummableClassId=${
          ConsummableClassId || ""
        }&SearchText=${Name || ""}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetConsummableClass = createAsyncThunk(
  "consummableSetup/GetConsummableClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, Name, CategoryId } = payload;
    try {
      const response = await Consummable_api.get(
        `ConsumableCategory/class?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&Name=${
          Name || ""
        }&CategoryId=${CategoryId || ""}&SearchText=${Name || ""}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetConsummableComponent = createAsyncThunk(
  "consummableSetup/GetConsummableComponent",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { Name, CategoryId, ConsummableClassId, ConsummableSubClassId } =
      payload;
    try {
      const response = await Consummable_api.get(
        `ConsummableComponent?Name=${
          Name || ""
        }&CategoryId=${CategoryId}&ConsummableClassId=${ConsummableClassId}&ConsummableSubClassId=${ConsummableSubClassId}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  ConsummablesSetup: "",
};

export const ConsummableSetUpSlice = createSlice({
  name: "ConsummablesSetUp",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(GetSingleCategories.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetSingleCategories.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          single_category: action.payload,
        };
      })
      .addCase(GetSingleCategories.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(CreateConsummableClass.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateConsummableClass.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          created_Consummable_class: action.payload,
        };
      })
      .addCase(CreateConsummableClass.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(ApproveConsummableSingleRegister.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(ApproveConsummableSingleRegister.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          Consummable_register: action.payload,
        };
      })
      .addCase(ApproveConsummableSingleRegister.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(CreateConsummableRegister.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateConsummableRegister.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          Consummable_register: action.payload,
        };
      })
      .addCase(CreateConsummableRegister.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(GetCategories.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          isLoadingCategories: true,
        };
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          isLoadingCategories: false,
          category: action.payload,
        };
      })
      .addCase(GetCategories.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isLoadingCategories: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetConsummableComponent.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetConsummableComponent.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          consummable_component: action.payload,
        };
      })
      .addCase(GetConsummableComponent.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetConsummableClass.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          isLoadingClass: true,
        };
      })
      .addCase(GetConsummableClass.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isLoadingClass: false,
          isSuccessful: true,
          consummable_class: action.payload,
        };
      })
      .addCase(GetConsummableClass.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isLoadingClass: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetConsummableSubClass.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetConsummableSubClass.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          Consummable_sub_class: action.payload,
        };
      })
      .addCase(GetConsummableSubClass.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

export default ConsummableSetUpSlice.reducer;
