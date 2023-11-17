import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProcurementServices } from "./ProcurementService";
import { toast } from "react-toastify";
import { successAlert } from "../Global/GlobalSlice";
import { VendorServices } from "../Vendor/VendorService";
import success from "../success";

//Requision
export const CreateProcRequsition = createAsyncThunk(
  "vendors/CreateProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().CreateProcRequsition(payload);
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

export const UpdateProcRequsition = createAsyncThunk(
  "vendors/CreateProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().UpdateProcRequsition(payload);
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

export const GetProcRequisitions = createAsyncThunk(
  "vendors/GetProcRequisitions",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().GetProcRequisitions(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetProcBeneficiaries = createAsyncThunk(
  "procurement/GetProcBeneficiaries",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ProcurementServices.procurement().GetBeneficiaries(
        payload
      );
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetProcDepartment = createAsyncThunk(
  "procurement/GetProcDepartment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const response = await ProcurementServices.procurement().GetDepartments(
      //   payload
      // );
      const response = await VendorServices.vendor().GetVendorDepartmentSetUp(
        payload
      );
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleProcRequisitions = createAsyncThunk(
  "vendors/GetSingleProcRequisitions",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().GetSingleProcRequisition(
          payload
        );
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveProcRequsition = createAsyncThunk(
  "vendors/ApproveProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().ApproveProcRequisition(payload);
      // toast.success(response?.data?.statusMessage);
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


export const ApproveProcRequsitionBulk = createAsyncThunk(
  "vendors/ApproveProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().ApproveProcRequisitionBulk(payload);
      // toast.success(response?.data?.statusMessage);
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

export const DeclineProcRequsition = createAsyncThunk(
  "vendors/DeclineProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const response =
      await ProcurementServices.procurement().DeclineProcRequisition(payload);
    if (response?.data?.successful === true) {
      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
    }
    return response?.data;
  },
  (error, { rejectWithValue }) => {
    return rejectWithValue(error?.response?.data);
  }
);

export const DeleteProcRequsition = createAsyncThunk(
  "vendors/DeclineProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().DeleteProcRequisition(payload);
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


export const DeclineProcRequsitionBulk = createAsyncThunk(
  "vendors/DeclineProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().DeclineProcRequisitionBulk(payload);
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

export const NotifyProcRequsition = createAsyncThunk(
  "vendors/DeclineProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().NotifyProcRequisition(payload);
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

//Quotation

export const CreateProcQuotation = createAsyncThunk(
  "vendors/CreateProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().CreateProQuotation(payload);
      // toast.success(response?.data?.statusMessage);
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


export const UpdateProcQuotation = createAsyncThunk(
  "vendors/CreateProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().UpdateProQuotation(payload);
      // toast.success(response?.data?.statusMessage);
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

export const GetProcQuotations = createAsyncThunk(
  "vendors/GetProcQuotations",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().GetProcQuotations(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleProcQuotations = createAsyncThunk(
  "vendors/GetProcRequisitions",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().GetSingleProcQuotation(payload);
      // toast.success(response?.data?.statusMessage);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveProcQuotation = createAsyncThunk(
  "vendors/ApproveProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().ApproveProcQuotation(payload);
      // toast.success(response?.data?.statusMessage);
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

export const DeclineProQuotation = createAsyncThunk(
  "vendors/DeclineProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const response =
      await ProcurementServices.procurement().DeclineProcQuotation(payload);
    // toast.success(response?.data?.statusMessage);
    if (response?.data?.successful === true) {
      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
    }
    return response?.data;
  },
  (error, rejectWithValue) => {
    return rejectWithValue(error?.response?.data);
  }
);

export const DeliveredProQuotation = createAsyncThunk(
  "vendors/DeclineProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().DeliveredProcQuotation(payload);
      // toast.success(response?.data?.statusMessage);
     if (response?.data?.successful === true) {
       dispatch(
         successAlert({
           message: response?.data?.statusMessage,
         })
       );
     }
      success(response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ConfirmProQuotation = createAsyncThunk(
  "vendors/DeclineProcRequsition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await ProcurementServices.procurement().DeclineProcQuotation(payload);
      // toast.success(response?.data?.statusMessage);
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

//Delivery

export const GetProcDelivery = createAsyncThunk(
  "vendors/GetProcRequisitions",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ProcurementServices.procurement().GetProcDelivery(
        payload
      );
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetProcRequisitionDashboard = createAsyncThunk(
    "procurement/GetProcRequisitionDashboard",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response =
                await ProcurementServices.procurement().GetProcRequisitionDashboard();
            // toast.success(response?.data?.statusMessage);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.statusMessage);
            return rejectWithValue(error?.response?.data);
        }
    }
);

const initialState = {
  procurement: "",
};

export const AppSlice = createSlice({
  name: "procurement",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(GetSingleProcRequisitions.pending, (state) => {
        return {
          ...state,
          isSubmitting: true,
        };
      })
      .addCase(GetSingleProcRequisitions.fulfilled, (state, action) => {
        return {
          ...state,
          isSuccessful: true,
          isSubmitting: false,
          proc_req_data: action.payload,
        };
      })
      .addCase(GetSingleProcRequisitions.rejected, (state, action) => {
        return {
          ...state,
          isSubmitting: false,
          error: action.payload,
        };
      });
    builder
      .addCase(CreateProcRequsition.pending, (state) => {
        return {
          ...state,
          isSubmitting: true,
        };
      })
      .addCase(CreateProcRequsition.fulfilled, (state, action) => {
        return {
          ...state,
          isSuccessful: true,
          isSubmitting: false,
          proc_data: action.payload,
        };
      })
      .addCase(CreateProcRequsition.rejected, (state, action) => {
        return {
          ...state,
          isSubmitting: false,
          error: action.payload,
        };
      });
    builder
      .addCase(ApproveProcRequsition.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(ApproveProcRequsition.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          proc_approval: action.payload,
        };
      })
      .addCase(ApproveProcRequsition.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(DeclineProcRequsition.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(DeclineProcRequsition.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          proc_declined: action.payload,
        };
      })
      .addCase(DeclineProcRequsition.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetProcQuotations.pending, (state) => {
        return {
          ...state,
          isLoadingVendors: true,
        };
      })
      .addCase(GetProcQuotations.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingVendors: false,
          isSuccessful: true,
          all_proc_quotations: action.payload,
        };
      })
      .addCase(GetProcQuotations.rejected, (state, action) => {
        return {
          ...state,
          isLoadingVendors: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetProcRequisitions.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetProcRequisitions.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          all_proc_requisitions: action.payload,
        };
      })
      .addCase(GetProcRequisitions.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetProcBeneficiaries.pending, (state) => {
        return {
          ...state,
          isLoadingVendors: true,
        };
      })
      .addCase(GetProcBeneficiaries.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingVendors: false,
          isSuccessful: true,
          beneficiaries: action.payload,
        };
      })
      .addCase(GetProcBeneficiaries.rejected, (state, action) => {
        return {
          ...state,
          isLoadingVendors: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetProcDepartment.pending, (state) => {
        return {
          ...state,
          isLoadingVendors: true,
        };
      })
      .addCase(GetProcDepartment.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingVendors: false,
          isSuccessful: true,
          departments: action.payload,
        };
      })
      .addCase(GetProcDepartment.rejected, (state, action) => {
        return {
          ...state,
          isLoadingVendors: false,
          error: action.payload,
        };
      });

      builder
          .addCase(GetProcRequisitionDashboard.pending, (state) => {
              return {
                  ...state,
                  isDashboardLoading: true,
              };
          })
          .addCase(GetProcRequisitionDashboard.fulfilled, (state, action) => {
              return {
                  ...state,
                  isDashboardLoading: false,
                  isSuccessful: true,
                  procurementRequisitionDashboard: action.payload,
              };
          })
          .addCase(GetProcRequisitionDashboard.rejected, (state, action) => {
              return {
                  ...state,
                  isDashboardLoading: false,
                  error: action.payload,
              };
          });

  },
});

export default AppSlice.reducer;
