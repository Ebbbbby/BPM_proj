import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FleetServices } from "./FleetService";
import { toast } from "react-toastify";
import { successAlert } from "../Global/GlobalSlice";
//import { successAlert } from "../Global/GlobalSlice";

// Start of Fleets

export const CreateFleet = createAsyncThunk(
  "fleets/CreateFleet",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.fleet().CreateFleet(payload);

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

export const UpdateFleet = createAsyncThunk(
  "fleets/CreateFleet",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.fleet().UpdateFleet(payload);

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

export const GetAllFleets = createAsyncThunk(
  "fleets/GetAllFleets",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.fleet().GetAllFleets(payload);
      // toast.success(response?.data?.statusMessage);
      
      return response?.data?.responseObject;
    } catch (error) {
      // toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetFleet = createAsyncThunk(
  "fleet/GetFleet",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.fleet().GetFleet(
        payload?.id
      );
      
      return response?.data;
    } catch (error) {
      // toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetFleetByParam = createAsyncThunk(
  "fleet/GetFleetByParam",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.fleet().GetFleetByParam(
        payload?.id
      );
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const AssignDriver = createAsyncThunk(
  "fleets/AssignFleetDriver",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.fleet().AssignFleetDriver(payload);

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

// End of Fleets

// Start of Accident Report

export const CreateAccidentReport = createAsyncThunk(
  "fleets/CreateAccidentReport",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.accidentReport().CreateAccidentReport(payload);

        console.log(response)

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

export const UpdateAccidentReport = createAsyncThunk(
  "fleets/CreateAccidentReport",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.accidentReport().UpdateAccidentReport(payload);
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

export const GetAllAccidentReport = createAsyncThunk(
  "fleets/GetAllAccidentReport",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.accidentReport().GetAllAccidentReport(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      // toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllMyAccidentReports = createAsyncThunk(
  "fleets/GetAllMyAccidentReports",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.accidentReport().GetMyAccidentReports(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      // toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAccidentReport = createAsyncThunk(
  "fleet/GetAccidentReport",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.accidentReport().GetAccidentReport(
        payload
      );
      return response?.data;
    } catch (error) {
      // toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveAccidentReport = createAsyncThunk(
  "fleet/ApproveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.accidentReport().ApproveAccidentReport(payload);
        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineAccidentReport = createAsyncThunk(
  "fleet/DeclineRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.accidentReport().DeclineAccidentReport(payload);
        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CancelAccidentReport = createAsyncThunk(
  "fleets/CancelRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.accidentReport().CancelAccidentReport(payload);
        console.log(response)
        
      
       
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveOrDeclineBatchAccidentReportRequest = createAsyncThunk(
  "fleet/ApproveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.accidentReport().ApproveOrDeclineBatchAccidentReportRequest(payload);

        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// End of Accident Report

// Start of Vehicle Maintenance

export const CreateMaintenanceRequisition = createAsyncThunk(
  "fleets/CreateMaintenanceRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.maintenanceRequest().CreateMaintenanceRequisition(payload);

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

export const GetAllVehicleMaintenance = createAsyncThunk(
  "fleets/GetAllVehicleMaintenance",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.maintenanceRequest().GetAllVehicleMaintenance(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data?.responseObject;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      // return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllMyVehicleMaintenanceRequests = createAsyncThunk(
  "fleets/GetAllMyVehicleMaintenance",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.maintenanceRequest().GetMyVehicleMaintenanceRequests(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data?.responseObject;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      // return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetVehicleMaintenance = createAsyncThunk(
  "fleet/GetVehicleMaintenance",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.maintenanceRequest().GetVehicleMaintenance(
        payload
      );
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateMaintenanceRequisition = createAsyncThunk(
  "fleets/CreateVehicleMaintenance",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.maintenanceRequest().UpdateMaintenanceRequisition(payload);

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

export const ApproveMaintenanceRequest = createAsyncThunk(
  "fleet/ApproveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.maintenanceRequest().ApproveMaintenanceRequest(payload);

        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineMaintenanceRequest = createAsyncThunk(
  "fleet/DeclineRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.maintenanceRequest().DeclineMaintenanceRequest(payload);

        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CancelMaintenanceRequest = createAsyncThunk(
  "fleets/CancelRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
  //console.log(payload)
      const response =
        await FleetServices.maintenanceRequest().CancelMaintenanceRequest(payload);

        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
       
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveOrDeclineBatchMaintenanceRequest = createAsyncThunk(
  "fleet/ApproveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.maintenanceRequest().ApproveOrDeclineBatchMaintenanceRequest(payload);

        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// End Of Vehicle Maintenance

// Start Of Document

/* SetUp */
export const CreateDocumentType = createAsyncThunk(
  "fleets/CreateDocumentType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.documentSetup().CreateDocumentType(payload);
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

export const GetAllVehicleDocumentType = createAsyncThunk(
  "fleets/GetAllVehicleDocumentType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.documentSetup().GetAllDocumentType(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      // toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateDocumentType = createAsyncThunk(
  "fleets/CreateDocumentType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.documentSetup().UpdateDocumentType(payload);

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

export const DeleteDocumentType = createAsyncThunk(
  "fleets/DeleteDocumentType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.documentSetup().DeleteDocumentType(payload);
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

export const CreateVehicleDocument = createAsyncThunk(
  "fleets/CreateVehicleDocument",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.vehicleDocument().CreateVehicleDocument(payload);
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

export const GetVehicleDocuments = createAsyncThunk(
  "fleets/GetVehicleDocuments",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.vehicleDocument().GetVehicleDocuments(payload);
      //toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      //toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateVehicleDocument = createAsyncThunk(
  "fleets/CreateVehicleDocument",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload)
    try {
      const response =
        await FleetServices.vehicleDocument().UpdateVehicleDocument(payload);

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

export const GetCentralRepositoryDocuments = createAsyncThunk(
  "fleets/GetRepoDocuments",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.repoDocument().GetRepoDocuments(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      // toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// End Of Vehicle Document


export const CreateFuelRequest = createAsyncThunk(
  "fleets/CreateFuelRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
      const response = await FleetServices.fleet().CreateFuelRequest(payload);
      //toast.success(response?.data.statusMessage)
      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const ApproveFuelRequest = createAsyncThunk(
  "fleets/ApproveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.fleet().ApproveFuelRequest(payload);
        //console.log(response.data)
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
          //toast.success(response?.data?.statusMessage);

          return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const DeclineFuelRequest = createAsyncThunk(
  "fleets/DeclineRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.fleet().DeclineFuelRequest(payload);
        
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const CancelFuelRequest = createAsyncThunk(
  "fleets/CancelRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
  //console.log(payload)
      const response =
        await FleetServices.fleet().CancelFuelRequest(payload);
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const ApproveOrDeclineRequisition = createAsyncThunk(
  "fleets/approveOrDecline",
  async (payload, { rejectWithValue, getState, dispatch }) => {
  

    try {
      const response = await FleetServices.fleet().ApproveOrDeclineRequisition( payload);
     
      //toast.success(response?.data.statusMessage)
      return response?.data;

    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const ApproveOrDeclinePayment = createAsyncThunk(
  "fleets/approveOrDeclinePayment",
  async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
      const response = await FleetServices.fleet().ApproveOrDeclinePayment( payload);
      //console.log(response)
      //toast.success(response?.data.statusMessage)
      return response?.data;

    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetFuelRequest = createAsyncThunk(
  "fleets/GetRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
      const response = await FleetServices.fleet().GetFuelRequest( payload);
      //console.log(response)
      //toast.success(response?.data.statusMessage)
      return response?.data;

    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetSingleFuelRequest= createAsyncThunk(
  "fleets/GetSingleRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   // console.log(payload);
    try {
      const response =
        await FleetServices.fleet().GetSingleFuelRequest(
          payload
        );
        console.log(response)
      // toast.success(response?.data?.statusMessage);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetMyFuelRequest= createAsyncThunk(
  "fleets/GetMyRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   // console.log(payload);
    try {
      const response =
        await FleetServices.fleet().GetMyFuelRequest(
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
export const UpdateFuelRequest = createAsyncThunk(
  "fleets/CreateFuelRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //console.log(payload)
      const response = await FleetServices.fleet().UpdateFuelRequest(
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
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const GetBanks = createAsyncThunk(
  "fleets/GetBanks",
  async (payload, { rejectWithValue, getState, dispatch }) => {
     
    try {
      const response = await FleetServices.fleet().GetBanks(
        payload
      );
   
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetBranch = createAsyncThunk(
  "fleets/GetVendorBranch",

  async (payload, { rejectWithValue, getState, dispatch }) => {
     
    try {
      const response = await FleetServices.fleet().GetBranch(
        payload
      );
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);




export const CreateFuelPayment= createAsyncThunk(
  "fleets/CreateFuelPayment",
  async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
      const response = await FleetServices.fleet().CreateFuelPayment(payload);
       // console.log('scream')
      //toast.success(response?.data.statusMessage)
      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const ApproveFuelPayment = createAsyncThunk(
  "fleets/ApprovePayment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.fleet().ApproveFuelPayment(payload);
        //console.log(response.data)
        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
        ///console.log(response.data)
              return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineFuelPayment = createAsyncThunk(
  "fleets/DeclinePayment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.fleet().DeclineFuelPayment(payload);
       
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const CancelFuelPayment = createAsyncThunk(
  "fleets/CancelPayment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await FleetServices.fleet().CancelFuelPayment(payload);
        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const GetFuelPayment = createAsyncThunk(
  "fleets/GetPayment",
  async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
      const response = await FleetServices.fleet().GetFuelPayment( payload);
      return response?.data;

    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetSingleFuelPayment= createAsyncThunk(
  "fleets/GetPayment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   // console.log(payload);
    try {
      const response =
        await FleetServices.fleet().GetSingleFuelPayment(
          payload
        );
      
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetMyFuelPayment= createAsyncThunk(
  "fleets/GetMyPayment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   // console.log(payload);
    try {
      const response =
        await FleetServices.fleet().GetMyFuelPayment(
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

export const GetAllEmployees= createAsyncThunk(
  "global/GetAllEmployees",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.fleet().GetAllEmployees(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetCadrePosition= createAsyncThunk(
  "fleets/GetCadrePosition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.fleet().GetCadrePosition(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const UpdateFuelPayment = createAsyncThunk(
  "fleet/UpdateFuelPayment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
  
    try {
      const response = await FleetServices.fleet().UpdateFuelPayment(
        payload
      );
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateDriverActivity= createAsyncThunk(
  "fleets/CreateDriverActivity",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   console.log(payload)
    try {
      const response = await FleetServices.fleet().CreateDriverActivity(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
     
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllDriverActivity= createAsyncThunk(
  "fleets/GetAllActivity",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await FleetServices.fleet().GetAllDriverActivity(payload);
    
      // if (response?.data?.successful === true) {
      //   dispatch(
      //     successAlert({
      //       message: response?.data?.statusMessage,
      //     })
      //   );
      // }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetMyDriverActivity= createAsyncThunk(
  "fleets/GetDriverActivity",
  async (payload, { rejectWithValue, getState, dispatch }) => {
console.log(payload)
    try {
      const response = await FleetServices.fleet().GetMyDriverActivity(payload);
    
      // if (response?.data?.successful === true) {
      //   dispatch(
      //     successAlert({
      //       message: response?.data?.statusMessage,
      //     })
      //   );
      // }
      // console.log(response.data)
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetSingleDriverActivity= createAsyncThunk(
  "fleets/GetSingleDriverActivity",
  async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
      const response = await FleetServices.fleet().GetSingleDriverActivity(payload);
      
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateDriverActivity= createAsyncThunk(
  "fleets/CreateDriverActivity",
  async (payload, { rejectWithValue, getState, dispatch }) => {
console.log(payload)
    try {
      const response = await FleetServices.fleet().UpdateDriverActivity(payload);
       
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  fleet: "",
};

export const RequestSlice = createSlice({
  name: "fleet",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(GetCentralRepositoryDocuments.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetCentralRepositoryDocuments.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        repo_document: action.payload,
      };
    });
    builder.addCase(GetCentralRepositoryDocuments.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetVehicleDocuments.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetVehicleDocuments.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        all_document: action.payload,
      };
    });
    builder.addCase(GetVehicleDocuments.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetAllVehicleDocumentType.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetAllVehicleDocumentType.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        all_document_type: action.payload,
      };
    });
    builder.addCase(GetAllVehicleDocumentType.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(CreateFuelRequest.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(CreateFuelRequest.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingReq: false,
        isSuccessful: true,
        create_request: action.payload,
      };
    });
    builder.addCase(CreateFuelRequest.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(ApproveFuelRequest.pending, (state)=>{
      return{
          ...state,
          isLoading: true,
      };
    });
    builder.addCase(ApproveFuelRequest.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        approve_request: action.payload,
      };
    });
    builder.addCase(ApproveFuelRequest.rejected, (state, action) => {
      return {
        ...state,
        error:action.payload   
      };
    });
    
    builder.addCase(DeclineFuelRequest.pending, (state,action)=>{
      return{
          ...state,
          isLoading: true,
      }
    });
    builder.addCase(DeclineFuelRequest.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        decline_request: action.payload,
      };
    });
      builder.addCase(CancelFuelRequest.pending, (state,action)=>{
        return{
            ...state,
            isLoading: true,
        }
      });
      builder.addCase(CancelFuelRequest.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          cancel_request:payload,
        };
      });

      builder.addCase(CancelFuelRequest.rejected, (state, action) => {
        return {
          ...state,
           error:action.payload
        };
      });


      builder.addCase(GetSingleFuelRequest.pending, (state, action)=>{
        return{
          ...state,
          isLoading:true
        }
      });

      builder.addCase(GetSingleFuelRequest.fulfilled, (state, {payload})=>{
        return{
          ...state,
          isLoading:false,
          isSuccessful: true,
          get_request:payload,
        }
      });

      builder.addCase(GetSingleFuelRequest.rejected, (state, {payload})=>{
        return{
          ...state,
          error:payload
        }
      });


      builder.addCase(GetMyFuelRequest.pending, (state, action)=>{
        return{
          ...state,
          isLoading:true
        }
      });

      builder.addCase(GetMyFuelRequest.fulfilled, (state, {payload})=>{
        return{
          ...state,
          isLoading:false,
          isSuccessful: true,
          my_request:payload,
        }
      });

      builder.addCase(GetMyFuelRequest.rejected, (state, {payload})=>{
        return{
          ...state,
          error:payload
        }
      });

      builder.addCase(ApproveOrDeclineRequisition.pending, (state,action)=>{
        return{
            ...state,
            isLoading: true,
        }
      });
      builder.addCase(ApproveOrDeclineRequisition.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          App_dec:payload,
        };
      });

      builder.addCase(ApproveOrDeclineRequisition.rejected, (state, action) => {
        return {
          ...state,
           error:action.payload
        };
      });
      builder.addCase(GetFleet.pending, (state,action)=>{
        return{
            ...state,
            isLoading: true,
        }
      });
      builder.addCase(GetFleet.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          get_fleet:payload,
        };
      });

      builder.addCase(GetFleet.rejected, (state, action) => {
        return {
          ...state,
           error:action.payload
        };
      });

      builder.addCase(GetBanks.pending, (state,action)=>{
        return{
            ...state,
            isLoading: true,
        }
      });
      builder.addCase(GetBanks.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          get_bank:payload,
        };
      });
      builder.addCase(GetBanks.rejected, (state, action) => {
        return {
          ...state,
           error:action.payload
        };
      });
      builder.addCase(GetBranch.pending, (state,action)=>{
        return{
            ...state,
            isLoading: true,
        }
      });
      builder.addCase(GetBranch.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          get_branch:payload,
        };
      });
      builder.addCase(GetBranch.rejected, (state, action) => {
        return {
          ...state,
           error:action.payload
        };
      });
      builder.addCase(GetFuelRequest.pending, (state,action)=>{
        return{
            ...state,
            isLoading: true,
        }
      });
      builder.addCase(GetFuelRequest.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          get_request: payload,       
         };
      });
      builder.addCase(GetFuelRequest.rejected, (state, action) => {
        return {
          ...state,
          error:action.payload
        };
      });
      builder.addCase(GetAllVehicleMaintenance.pending, (state,action)=>{
        return{
            ...state,
            isLoading: true,
        }
      });
      builder.addCase(GetAllVehicleMaintenance.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          all_requisitions: action.payload,
        };
      });
      builder.addCase(GetAllVehicleMaintenance.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload
        };
      });
      builder.addCase(GetAllMyVehicleMaintenanceRequests.pending, (state,action)=>{
        return{
            ...state,
            isLoading: true,
        }
      });
      builder.addCase(GetAllMyVehicleMaintenanceRequests.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          all_my_requisitions: action.payload,
        };
      });
      builder.addCase(GetAllMyVehicleMaintenanceRequests.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload
        };
      });
      builder
      .addCase(GetVehicleMaintenance.pending, (state) => {
        return {
          ...state,
          isLoadingRequest: true,
        };
      })
      .addCase(GetVehicleMaintenance.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingRequest: false,
          isSuccessful: true,
          maintenance_req: action.payload,
        };
      })
      .addCase(GetVehicleMaintenance.rejected, (state, action) => {
        return {
          ...state,
          isLoadingRequest: false,
          error: action.payload,
        };
      });
      builder
      .addCase(CreateAccidentReport.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateAccidentReport.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          proc_data: action.payload,
        };
      })
      .addCase(CreateAccidentReport.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

      builder
      .addCase(GetAllMyAccidentReports.pending, (state) => {
        return {
          ...state,
          isLoadingReports: true,
        };
      })
      .addCase(GetAllMyAccidentReports.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingReports: false,
          isSuccessful: true,
          all_my_report: action.payload,
        };
      })
      .addCase(GetAllMyAccidentReports.rejected, (state, action) => {
        return {
          ...state,
          isLoadingReports: false,
          error: action.payload,
        };
      });





      builder
      .addCase(GetAllAccidentReport.pending, (state) => {
        return {
          ...state,
          isLoadingReports: true,
        };
      })
      .addCase(GetAllAccidentReport.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingReports: false,
          isSuccessful: true,
          all_report: action.payload,
        };
      })
      .addCase(GetAllAccidentReport.rejected, (state, action) => {
        return {
          ...state,
          isLoadingReports: false,
          error: action.payload,
        };
      });  
      builder
      .addCase(GetAccidentReport.pending, (state) => {
        return {
          ...state,
          isLoadingReports: true,
        };
      })
      .addCase(GetAccidentReport.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingReports: false,
          isSuccessful: true,
          accident_report: action.payload,
        };
      })
      .addCase(GetAccidentReport.rejected, (state, action) => {
        return {
          ...state,
          isLoadingReports: false,
          error: action.payload,
        };
      });
      builder
      .addCase(GetAllFleets.pending, (state, action)=>{
        return{
            ...state,
            isLoading: true,
        }
      }).addCase(GetAllFleets.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          all_fleets: action.payload,
        };
      }).addCase(GetAllFleets.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      });
      builder
      .addCase(GetFleetByParam.pending, (state, action)=>{
        return{
            ...state,
            isLoading: true,
        }
      }).addCase(GetFleetByParam.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          result: action.payload,
        };
      }).addCase(GetFleetByParam.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      });


   
       builder.addCase(CreateFuelPayment.pending, (state) => {
        return {
          ...state,
          isLoadingPayment: true,
        };
      });
      builder.addCase(CreateFuelPayment.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingPayment: false,
          isSuccessful: true,
          create_payment: action.payload,
        };
      });
      builder.addCase(CreateFuelPayment.rejected, (state, action) => {
        return {
          ...state,
          isLoadingPayment:false,
          error: action.payload,
        };
      });
      builder.addCase(ApproveFuelPayment.pending, (state,action)=>{
        return{
            ...state,
            isLoadingPayment: true,
        }
      });
      builder.addCase(ApproveFuelPayment.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoadingPayment: false,
          isSuccessful: true,
          approve_payment:payload,
       
        };
      });
      builder.addCase(ApproveFuelPayment.rejected, (state, action) => {
        return {
          ...state,
          error:action.payload
     
        };
      });
      
      builder.addCase(DeclineFuelPayment.pending, (state,action)=>{
        return{
            ...state,
            isLoadingPayment: true,
        }
      });
      builder.addCase(DeclineFuelPayment.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoadingPayment: false,
          isSuccessful: true,
          decline_payment:payload,
        };
      });

      builder.addCase(DeclineFuelPayment.rejected, (state, action) => {
        return {
          ...state,
           error:action.payload
        };
      });

      builder.addCase(ApproveOrDeclinePayment.pending, (state,action)=>{
        return{
            ...state,
            isLoading: true,
        }
      });
      builder.addCase(ApproveOrDeclinePayment.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          App_dec:payload,
        };
      });

      builder.addCase(ApproveOrDeclinePayment.rejected, (state, action) => {
        return {
          ...state,
           error:action.payload
        };
      });
      builder.addCase(GetFuelPayment.pending, (state,action)=>{
        return{
            ...state,
            isLoadingPayment: true,
        }
      });
      builder.addCase(GetFuelPayment.fulfilled, (state, {payload}) => {
        return {
          ...state,
          isLoadingPayment: false,
          isSuccessful: true,
          get_payment: payload,  
        };
      });


      builder.addCase(GetFuelPayment.rejected, (state, action) => {
        return {
          ...state,
           error:action.payload
        };
      });

      builder.addCase(GetMyFuelPayment.pending, (state, action)=>{
        return{
          ...state,
          isLoading:true
        }
      });

      builder.addCase(GetMyFuelPayment.fulfilled, (state, {payload})=>{
        return{
          ...state,
          isLoading:false,
          isSuccessful: true,
          my_payment:payload,
        }
      });

      builder.addCase(GetMyFuelPayment.rejected, (state, {payload})=>{
        return{
          ...state,
          error:payload
        }
      });

 

      builder
      .addCase(GetAllEmployees.pending, (state) => {
        return {
          ...state,
          isLoadingEmployees: true,
        };
      })
      .addCase(GetAllEmployees.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingEmployees: false,
          isSuccessful: true,
          all_employees: action.payload,
        };
      })
      .addCase(GetAllEmployees.rejected, (state, action) => {
        return {
          ...state,
          isLoadingEmployees: false,
          error: action.payload,
        };
      });


      builder
      .addCase(GetCadrePosition.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetCadrePosition.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          all_cadre: action.payload,
        };
      })
      .addCase(GetCadrePosition.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

      builder.addCase(CreateDriverActivity.pending, (state, action)=>{
        return{
          ...state,
          isLoadingActivity:true
        }
      })

      builder.addCase(CreateDriverActivity.fulfilled, (state, {payload})=>{
        return{
          ...state,
          isLoadingActivity:false,
          isSuccessful: true,
          driver_activity:payload,
        }
      })

      builder.addCase(CreateDriverActivity.rejected, (state, {payload})=>{
        return{
          ...state,
          error:payload
        }
      })

      builder.addCase(GetMyDriverActivity.pending, (state, action)=>{
        return{
          ...state,
          isLoadingActivity:true
        }
      })

      builder.addCase(GetMyDriverActivity.fulfilled, (state, {payload})=>{
        return{
          ...state,
          isLoadingActivity:false,
          isSuccessful: true,
          driver_activity:payload,
        }
      })
      

      builder.addCase(GetMyDriverActivity.rejected, (state, {payload})=>{
        return{
          ...state,
          error:payload
        }
      })


      

      builder.addCase(GetSingleDriverActivity.pending, (state, action)=>{
        return{
          ...state,
          isLoadingActivity:true
        }
      })

      builder.addCase(GetSingleDriverActivity.fulfilled, (state, {payload})=>{
        return{
          ...state,
          isLoadingActivity:false,
          isSuccessful: true,
          get_act:payload,
        }
      })

      builder.addCase(GetSingleDriverActivity.rejected, (state, {payload})=>{
        return{
          ...state,
          error:payload
        }
      })

    

      builder.addCase(GetAllDriverActivity.pending, (state, action)=>{
        return{
          ...state,
          isLoadingActivity:true
        }
      })

      builder.addCase(GetAllDriverActivity.fulfilled, (state, {payload})=>{
        return{
          ...state,
          isLoadingActivity:false,
          isSuccessful: true,
          all_activity:payload,
        }
      })
      builder.addCase(GetAllDriverActivity.rejected, (state, {payload})=>{
        return{
          ...state,
          error:payload
        }
      })


    },

});

export default RequestSlice.reducer;