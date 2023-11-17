import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AssetServices, ind_api } from "./AssetService";
import { toast } from "react-toastify";
import { successAlert } from "../Global/GlobalSlice";
import { proc_api } from "../Procurement/ProcurementService";

export const CreateAcquisition_Asset = createAsyncThunk(
  "assets/CreateAcquisition_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AssetServices.asset().CreateAsset_Acquisition(
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

export const GetAquisition_Asset = createAsyncThunk(
  "assets/GetAquisition_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AssetServices.asset().GetAsset_Acquisition(
        payload
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAquisitionSingle_Asset = createAsyncThunk(
  "assets/GetAquisitionSingle_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AssetServices.asset().GetAsset_SingleAcquisition(
        payload
      );
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateAsset_Acquisition = createAsyncThunk(
  "assets/CreateAcquisition_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AssetServices.asset().UpdateAsset_Acquisition(
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

export const ApproveAsset_Acqusition = createAsyncThunk(
  "assets/ApproveAsset_Acqusition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AssetServices.asset().ApproveAsset_Acqusition(
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

export const DeclineAsset_Acqusition = createAsyncThunk(
  "assets/DeclineAsset_Acqusition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await AssetServices.asset().DeclineAsset_Acqusition(
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

export const CreateRequisition_Asset = createAsyncThunk(
  "assets/CreateRequisition_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetRequisition/add", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateRequisition_Asset = createAsyncThunk(
  "assets/CreateRequisition_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetRequisition/update", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetRequisition_Asset = createAsyncThunk(
  "assets/CreateRequisition_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await ind_api.get(
        `AssetRequisition?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&searchText=${searchText}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetRequisitionSingle_Asset = createAsyncThunk(
  "assets/CreateRequisition_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.get(
        `AssetRequisition/${payload}?id=${payload}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveAsset_Requisition = createAsyncThunk(
  "assets/CreateRequisition_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post(`AssetRequisition/approve`, payload);
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

export const DeclineAsset_Requisition = createAsyncThunk(
  "assets/CreateRequisition_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post(`AssetRequisition/decline`, payload);

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

export const CreateAAllocation_Asset = createAsyncThunk(
  "assets/CreateAllocation_Asset ",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetAllocation/add", payload);
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateAllocation_Asset = createAsyncThunk(
  "assets/CreateAuction_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetAllocation/update", payload);
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateAuction_Asset = createAsyncThunk(
  "assets/CreateAuction_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetAuction/add", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateAuction_Asset = createAsyncThunk(
  "assets/CreateAuction_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetAuction/update", payload);
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllocation_Asset = createAsyncThunk(
  "assets/GetAllocation_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await ind_api.get(
        `AssetAllocation?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&searchText=${searchText}`,
        payload
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllocationSingle_Asset = createAsyncThunk(
  "assets/GetAllocation_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.get(
        `AssetAllocation/${payload}?id=${payload}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateAsset_Allocation = createAsyncThunk(
  "assets/UpdateAsset_Allocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = ind_api.post("Allocation", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveAsset_Allocation = createAsyncThunk(
  "assets/ApproveAsset_Allocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetAllocation/approve", payload);
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineAsset_Allocation = createAsyncThunk(
  "assets/DeclineAsset_Allocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetAllocation/decline", payload);
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAuction_Single_Bidding = createAsyncThunk(
  "assets/GetAllocation_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage } = payload;
    try {
      const response = await ind_api.get(
        `AssetBid/${payload}?id=${payload}`,
        payload
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetAuction_Asset_Bidding = createAsyncThunk(
  "assets/GetAllocation_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await ind_api.get(
        `AssetBid?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&searchText=${searchText}`,
        payload
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const AddAuction_Single_Bidding = createAsyncThunk(
  "assets/GetAllocation_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage } = payload;
    try {
      const response = await ind_api.get(
        `AssetBid?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}`,
        payload
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveAuction_Single_Bidding = createAsyncThunk(
  "assets/GetAllocation_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post(`AssetBid/approve`, payload);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineAuction_Single_Bidding = createAsyncThunk(
  "assets/GetAllocation_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post(`AssetBid/decline`, payload);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAuction_Asset = createAsyncThunk(
  "assets/GetAllocation_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await ind_api.get(
        `AssetAuction?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&searchText=${searchText}`,
        payload
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAuctionSingle_Asset = createAsyncThunk(
  "assets/GetAllocation_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.get(
        `AssetAuction/${payload}?id=${payload}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateAsset_Auction = createAsyncThunk(
  "assets/UpdateAsset_Allocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = ind_api.post("Allocation", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveAsset_Auction = createAsyncThunk(
  "assets/CreateAuction_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetAuction/approve", payload);
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineAsset_Auction = createAsyncThunk(
  "assets/CreateAuction_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetAuction/decline", payload);
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ConfirmAsset_Delivery = createAsyncThunk(
  "assets/CreateDelivery_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await proc_api.post(`Delivery/confirm`, payload);
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

export const ApproveAsset_Delivery = createAsyncThunk(
  "assets/CreateDelivery_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await proc_api.post(`Delivery/approve`, payload);
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

export const DeclineAsset_Delivery = createAsyncThunk(
  "assets/CreateDelivery_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await proc_api.post(`Delivery/decline`, payload);
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


export const ConfirmService_Delivery = createAsyncThunk(
  "assets/CreateDelivery_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await proc_api.post(`Delivery/confirm`, payload);
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

export const ApproveService_Delivery = createAsyncThunk(
  "assets/CreateDelivery_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await proc_api.post(`Delivery/service/approval`, payload);
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

export const DeclineService_Delivery = createAsyncThunk(
  "assets/CreateDelivery_Asset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await proc_api.post(`Delivery/service/decline`, payload);
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

export const GetMaintenance_Asset = createAsyncThunk(
  "assets/GetMaintenance_Asset ",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage } = payload;
    try {
      const response = await ind_api.get(
        `AssetMaintainance?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetMaintenanceSingle_Asset = createAsyncThunk(
  "assets/GetMaintenance_Asset ",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.get(
        `AssetMaintainance/${payload}?id=${payload}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateAsset_Maintenance = createAsyncThunk(
  "assets/UpdateAsset_Allocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetMaintainance/add", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response?.data?.statusMessage);
      return response;
    } catch (errors) {
      return rejectWithValue(errors?.response?.data);
    }
  }
);

export const UpdateAsset_Maintenance = createAsyncThunk(
  "assets/UpdateAsset_Allocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetMaintainance/update", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response?.statusMessage);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveAsset_Maintenance = createAsyncThunk(
  "assets/ApproveAsset_Allocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetMaintainance/approve", payload);
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineAsset_Maintenance = createAsyncThunk(
  "assets/DeclineAsset_Allocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await ind_api.post("AssetMaintainance/decline", payload);
      toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAssetAcquisitionDashboard = createAsyncThunk(
  "asset/GetAssetAcquisitionDashboard",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await AssetServices.asset().GetAssetAcquisitionDashboard();
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  assets: "",
};

export const AssetSlice = createSlice({
  name: "assets",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(UpdateAsset_Allocation.pending, (state) => {
        return {
          ...state,
          isLoadingAssetsActions: true,
        };
      })
      .addCase(UpdateAsset_Allocation.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAssetsActions: false,
          isSuccessful: true,
          asset_actions: action.payload,
        };
      })
      .addCase(UpdateAsset_Allocation.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAssetsActions: false,
          error: action.payload,
        };
      });
    builder
      .addCase(GetAquisition_Asset.pending, (state) => {
        return {
          ...state,
          isLoadingAssets: true,
        };
      })
      .addCase(GetAquisition_Asset.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAssets: false,
          isSuccessful: true,
          asset_acquisitions: action.payload,
        };
      })
      .addCase(GetAquisition_Asset.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAssets: false,
          error: action.payload,
        };
      });

    builder
      .addCase(CreateAcquisition_Asset.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateAcquisition_Asset.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          create_asset_acquisition: action.payload,
        };
      })
      .addCase(CreateAcquisition_Asset.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetAquisitionSingle_Asset.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetAquisitionSingle_Asset.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          single_asset_acquisition: action.payload,
        };
      })
      .addCase(GetAquisitionSingle_Asset.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(ApproveAsset_Acqusition.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(ApproveAsset_Acqusition.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          approved_asset_acquisition: action.payload,
        };
      })
      .addCase(ApproveAsset_Acqusition.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(DeclineAsset_Acqusition.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(DeclineAsset_Acqusition.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          declined_asset_acquisition: action.payload,
        };
      })
      .addCase(DeclineAsset_Acqusition.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetAllocation_Asset.pending, (state) => {
        return {
          ...state,
          isLoadingAssets: true,
        };
      })
      .addCase(GetAllocation_Asset.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingAssets: false,
          isSuccessful: true,
          asset_allocation: action.payload,
        };
      })
      .addCase(GetAllocation_Asset.rejected, (state, action) => {
        return {
          ...state,
          isLoadingAssets: false,
          error: action.payload,
        };
      });

    builder
      .addCase(CreateRequisition_Asset.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateRequisition_Asset.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          asset_requisition: action.payload,
        };
      })
      .addCase(CreateRequisition_Asset.rejected, (state, action) => {
        return {
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(CreateAuction_Asset.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateAuction_Asset.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          asset_auction: action.payload,
        };
      })
      .addCase(CreateAuction_Asset.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetMaintenance_Asset.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetMaintenance_Asset.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          asset_maintainance: action.payload,
        };
      })
      .addCase(GetMaintenance_Asset.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetAssetAcquisitionDashboard.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetAssetAcquisitionDashboard.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          assetAcquisitionDashboard: action.payload,
        };
      })
      .addCase(GetAssetAcquisitionDashboard.rejected, (state, action) => {
        return {
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

export default AssetSlice.reducer;
