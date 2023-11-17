import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VendorServices } from "./VendorService";
import { toast } from "react-toastify";
import { successAlert } from "../Global/GlobalSlice";
import success from "../success";

export const GetAllDepartments = createAsyncThunk(
  "vendors/GetAllDepartments",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().GetVendorDepartmentSetUp(
        payload
      );
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllBranches = createAsyncThunk(
  "vendors/GetAllBranches",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().GetAllBranches(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const AddVendorDepartments = createAsyncThunk(
  "vendors/AddVendorDepartments",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().AddVendorDepartmentSetUp(
        payload
      );
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAlLEmployees = createAsyncThunk(
  "vendors/GetAlLEmployees",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().GetAlLEmployees(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const PerformanceReview = createAsyncThunk(
  "vendors/PerformanceReview",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().GetPerformance(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const PostPerformanceReview = createAsyncThunk(
  "vendors/PostPerformanceReview",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().PostPerformance(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ViewPerformanceReview = createAsyncThunk(
  "vendors/PostPerformanceReview",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().ViewPerformance(payload);

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateVendor = createAsyncThunk(
  "vendors/CreateVendor",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().CreateVendor(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CompleteCreateVendor = createAsyncThunk(
  "vendors/CreateVendor",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().CompleteCreateVendor(
        payload
      );
      // dispatch(
      //   successAlert({
      //     message: response?.data?.statusMessage,
      //   })
      // );
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const OnboardVendor = createAsyncThunk(
  "vendors/CreateVendor",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().OnboardVendor(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateVendor = createAsyncThunk(
  "vendors/CreateVendor",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().UpdateVendor(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const BlackListVendor = createAsyncThunk(
  "vendors/ApproveVendorAction",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().BlackListVendor(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const SuspendVendorAction = createAsyncThunk(
  "vendors/ApproveVendorAction",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().SuspendVendor(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const BlackVendorAction = createAsyncThunk(
  "vendors/ApproveVendorAction",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().BlackListVendor(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveVendorAction = createAsyncThunk(
  "vendors/ApproveVendorAction",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().ApproveVendor(payload);
      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );

      // success(response?.data);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineVendorAction = createAsyncThunk(
  "vendors/DeclineVendorAction",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().DeclineVendor(payload);
      // dispatch(
      //   successAlert({
      //     message: response?.data?.statusMessage,
      //   })
      // );
      success(response?.data);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetVendors = createAsyncThunk(
  "vendors/GetVendors",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await VendorServices.vendor().GetVendors(payload);

      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetFuelVendors = createAsyncThunk(
  "vendors/GetFuelVendors",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(payload)
      const response = await VendorServices.vendor().GetFuelVendors(payload);
      //console.log(response.data)
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleVendor = createAsyncThunk(
  "vendors/GetVendors",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const response = await VendorServices.vendor().GetVendorsSingle(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  vendors: "",
};

export const AppSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    TrackSteps(state, { payload }) {
      const { presentStep, nextStep, all } = payload;
      return {
        ...state,
        presentStep: presentStep,
        nextStep: nextStep,
        all: all,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAlLEmployees.pending, (state) => {
        return {
          ...state,
          isLoadingAction: true,
        };
      })
      .addCase(GetAlLEmployees.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          isSuccessful: true,
          employees: action.payload,
        };
      })
      .addCase(GetAlLEmployees.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          error: action.payload,
        };
      });
    builder
      .addCase(AddVendorDepartments.pending, (state) => {
        return {
          ...state,
          isLoadingAction: true,
        };
      })
      .addCase(AddVendorDepartments.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          isSuccessful: true,
          vendor_departments: action.payload,
        };
      })
      .addCase(AddVendorDepartments.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          error: action.payload,
        };
      });
    builder
      .addCase(GetAllBranches.pending, (state) => {
        return {
          ...state,
          isLoadingAction: true,
        };
      })
      .addCase(GetAllBranches.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          isSuccessful: true,
          all_branches: action.payload,
        };
      })
      .addCase(GetAllBranches.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          error: action.payload,
        };
      });
    builder
      .addCase(GetAllDepartments.pending, (state) => {
        return {
          ...state,
          isLoadingAction: true,
        };
      })
      .addCase(GetAllDepartments.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          isSuccessful: true,
          all_departments: action.payload,
        };
      })
      .addCase(GetAllDepartments.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          error: action.payload,
        };
      });
    builder
      .addCase(PerformanceReview.pending, (state) => {
        return {
          ...state,
          isLoadingAction: true,
        };
      })
      .addCase(PerformanceReview.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          isSuccessful: true,
          performance_review: action.payload,
        };
      })
      .addCase(PerformanceReview.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          error: action.payload,
        };
      });
    builder
      .addCase(PostPerformanceReview.pending, (state) => {
        return {
          ...state,
          isLoadingAction: true,
        };
      })
      .addCase(PostPerformanceReview.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          isSuccessful: true,
          performance_review_result: action.payload,
        };
      })
      .addCase(PostPerformanceReview.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          error: action.payload,
        };
      });
    builder
      .addCase(CreateVendor.pending, (state) => {
        return {
          ...state,
          isLoadingAction: true,
        };
      })
      .addCase(CreateVendor.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          isSuccessful: true,
          create_vendor: action.payload,
        };
      })
      .addCase(CreateVendor.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAction: false,
          error: action.payload,
        };
      });

    builder
      .addCase(ApproveVendorAction.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(ApproveVendorAction.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          approved_vendor: action.payload,
        };
      })
      .addCase(ApproveVendorAction.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(DeclineVendorAction.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(DeclineVendorAction.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          declined_vendor: action.payload,
        };
      })
      .addCase(DeclineVendorAction.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetVendors.pending, (state) => {
        return {
          ...state,
          isLoadingVendors: true,
        };
      })
      .addCase(GetVendors.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingVendors: false,
          isSuccessful: true,
          all_vendors: action.payload,
        };
      })
      .addCase(GetVendors.rejected, (state, action) => {
        return {
          ...state,
          isLoadingVendors: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetFuelVendors.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetFuelVendors.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          fuel_vendors: action.payload,
        };
      })
      .addCase(GetFuelVendors.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

export default AppSlice.reducer;
