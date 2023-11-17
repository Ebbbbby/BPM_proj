import { toast } from "react-toastify";
import { EmployeeServices } from "./EmployeeService";
import { successAlert } from "../Global/GlobalSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Start of Training Requisition
export const CreateTrainingRequisition = createAsyncThunk(
  "employee/CreateTrainingRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.trainingRequisition().CreateRequisition(payload);

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

export const UpdateTrainingRequisition = createAsyncThunk(
  "employee/CreateTrainingRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.trainingRequisition().UpdateRequisition(payload);

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

export const GetEmployeeTrainingRequisitions = createAsyncThunk(
  "employee/GetAllTrainingRequisitions",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.trainingRequisition().GetAllMyTrainingRequisitions(
          payload
        );
      // toast.success(response?.data?.statusMessage);
      return response?.data?.responseObject;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetEmployeeTrainingRequisition = createAsyncThunk(
  "employee/GetEmployeeTrainingRequisitions",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.trainingRequisition().GetEmployeeTraining(
          payload
        );
      // toast.success(response?.data?.statusMessage);
      return response?.data?.responseObject;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllEmployeesTrainingRequisitions = createAsyncThunk(
  "employee/GetAllEmployeesTrainingRequisitions",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.trainingRequisition().GetAllEmployeeTraining(
          payload
        );
      // toast.success(response?.data?.statusMessage);
      return response?.data?.responseObject;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CancelTrainingRequest = createAsyncThunk(
  "employee/CancelRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //console.log(payload)
      const response =
        await EmployeeServices.trainingRequisition().CancelRequisition(payload);

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

// Start of Training Type
export const GetTrainingTypes = createAsyncThunk(
  "employee/GetTrainingTypes",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.trainingType().GetAllTrainingTypes(payload);
      // toast.success(response?.data?.statusMessage);
      return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//start query
export const GetQuery = createAsyncThunk(
  "employee/getQuery",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().GetQuery(
        payload
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetQueryHOD = createAsyncThunk(
  "employee/getQueryHod",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().GetQueryHOD(
        payload
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetQueryHOC = createAsyncThunk(
  "employee/getQueryHoc",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().GetQueryHOC(
        payload
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetMyQuery = createAsyncThunk(
  "employee/getMyQuery",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().GetMyQuery(
        payload
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleContainer = createAsyncThunk(
  "employee/getSingleUnit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetSingleContainer(payload);

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetContainer = createAsyncThunk(
  "employee/getContainers",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().GetContainer(
        payload
      );

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const GetAllContainer = createAsyncThunk(
  "employee/getContainer",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().GetAllContainer(
        payload
      );

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetDepartment = createAsyncThunk(
  "employee/getDepartment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().GetDepartment(
        payload
      );

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateQuery = createAsyncThunk(
  "employee/addQuery",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().CreateQuery(
        payload
      );
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateQuery = createAsyncThunk(
  "employee/updateQuery",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().UpdateQuery(
        payload
      );
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleQuery = createAsyncThunk(
  "employee/singleQuery",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await EmployeeServices.EmployeeService().GetSingleQuery(
        payload
      );

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
//end Query

//Start query Response
export const GetQueryResponse = createAsyncThunk(
  "employee/getQueryResponse",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetQueryResponse(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateQueryResponse = createAsyncThunk(
  "employee/createQueryResponse",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().CreateQueryResponse(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleQueryResponse = createAsyncThunk(
  "employee/getSingleQueryResponse",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetSingleQueryResponse(
          payload
        );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetMyQueryResponse = createAsyncThunk(
  "employee/getMyQueryResponse",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetMyQueryResponse(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Query comment

export const CreateQueryComment = createAsyncThunk(
  "employee/createComment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().CreateQueryComment(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//employee update

export const CreateEmployeeInformation = createAsyncThunk(
  "employee/createEmployeeInformation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().CreateEmployeeInfomation(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleEmployee = createAsyncThunk(
  "employee/getSingleEmployee",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetSingleEmployee(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateEmployeeInformation = createAsyncThunk(
  "employee/updateInformation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload, 'PAYLOAD')
    try {
      const response =
        await EmployeeServices.EmployeeService().UpdateEmployeeInformation(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      console.log(response , '  RESPONSE')
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ViewSingleEmployee = createAsyncThunk(
  "employee/singleEmployee",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload)
    try {
      const response =
        await EmployeeServices.EmployeeService().ViewSingleEmployee(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const GetEmployeeBanks = createAsyncThunk(
  "employee/getBanks",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetEmployeeBanks(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetStates = createAsyncThunk(
  "employee/getStates",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetStates(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetLGA = createAsyncThunk(
  "employee/getLGA",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload,'payload')
    try {
      const response =
        await EmployeeServices.EmployeeService().GetLGA(payload);
      console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetMyBeneficiaryInfo = createAsyncThunk(
  "employee/getEmployeeInfo",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetMyBeneficiaryInfo(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const GetAllHospitals = createAsyncThunk(
  "employee/getHospitals",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetAllHospitals(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const GetSingleNOK = createAsyncThunk(
  "employee/getSingleNOK",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetSingleNOKInformation(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const CreateEmployeBeneficiary = createAsyncThunk(
  "employee/createEmployeeBeneficiary",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().CreateEmployeBeneficiary(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetEmployeeMedicalRequisition = createAsyncThunk(
  "employee/getMedical",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetEmployeeMedicalRequisition(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
)


export const CreateMedicalRequisition = createAsyncThunk(
  "employee/createMedical",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload)
    try {
      const response =
        await EmployeeServices.EmployeeService().CreateMedicalRequisition(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const UpdateMedicalRequisition = createAsyncThunk(
  "employee/updateMedical",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().UpdateMedicalRequisition(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const GetSingleMedicalRequisition = createAsyncThunk(
  "employee/getSingleMedicalRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetSingleMedicalRequisition(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Qualification
export const GetEmployeeQualification = createAsyncThunk(
  "employee/getEmployeeQualification",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetEmployeeQualification(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleEmployeeQualification = createAsyncThunk(
  "employee/getSingleQualification",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetSingleEmployeeQualification(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateEmployeeQualification = createAsyncThunk(
  "employee/createQualification",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().CreateEmployeeQualification(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const UpdateEmployeeQualification = createAsyncThunk(
  "employee/updateQualification",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().UpdateEmployeeQualification(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


//Referee

export const CreateEmployeeReferee = createAsyncThunk(
  "employee/createEmployeeReferee",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().CreateEmployeeReferee(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateEmployeeReferee = createAsyncThunk(
  "employee/updateEmployeeReferee",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().UpdateEmployeeReferee(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleEmployeeReferee = createAsyncThunk(
  "employee/getSingleEmployeeReferee",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetSingleEmployeeReferee(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetEmployeeReferee = createAsyncThunk(
  "employee/getEmployeeReferee",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetEmployeeReferee(payload);
        console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetCountries = createAsyncThunk(
  "employee/countries",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetCountries(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


//Extended Claims

export const CreateEmployeeClaims = createAsyncThunk(
  "employee/createEmployeeClaims",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().CreateEmployeeClaim(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateEmployeeClaims = createAsyncThunk(
  "employee/updateEmployeeClaims",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().UpdateEmployeeClaim(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetEmployeeClaims = createAsyncThunk(
  "employee/getEmployeeClaim",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetEmployeeClaim(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleEmployeeClaim = createAsyncThunk(
  "employee/getSingleClaim",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await EmployeeServices.EmployeeService().GetSingleEmployeeClaim(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


const initialState = {
  employee: "",
};

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(GetAllEmployeesTrainingRequisitions.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      GetAllEmployeesTrainingRequisitions.fulfilled,
      (state, action) => {
        return {
          ...state,
          isLoading: false,
          all_emp_req: action.payload,
        };
      }
    );
    builder.addCase(
      GetAllEmployeesTrainingRequisitions.rejected,
      (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      }
    );

    builder.addCase(GetTrainingTypes.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetTrainingTypes.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        all_training_types: action.payload,
      };
    });
    builder.addCase(GetTrainingTypes.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetEmployeeTrainingRequisitions.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      GetEmployeeTrainingRequisitions.fulfilled,
      (state, action) => {
        return {
          ...state,
          isLoading: false,
          emp_req: action.payload,
        };
      }
    );
    builder.addCase(
      GetEmployeeTrainingRequisitions.rejected,
      (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      }
    );

    builder.addCase(GetEmployeeTrainingRequisition.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      GetEmployeeTrainingRequisition.fulfilled,
      (state, action) => {
        return {
          ...state,
          isLoading: false,
          emp_req: action.payload,
        };
      }
    );
    builder.addCase(
      GetEmployeeTrainingRequisition.rejected,
      (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      }
    );

    builder.addCase(GetQuery.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetQuery.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_query: action.payload,
      };
    });
    builder.addCase(GetQuery.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetQueryHOD.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetQueryHOD.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_queryHOD: action.payload,
      };
    });
    builder.addCase(GetQueryHOD.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetQueryHOC.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetQueryHOC.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_queryHOC: action.payload,
      };
    });
    builder.addCase(GetQueryHOC.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetMyQuery.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetMyQuery.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_myquery: action.payload,
      };
    });
    builder.addCase(GetMyQuery.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleContainer.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleContainer.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_singlecontainer: action.payload,
      };
    });
    builder.addCase(GetSingleContainer.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetContainer.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetContainer.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_container: action.payload,
      };
    });
    builder.addCase(GetContainer.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetAllContainer.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetAllContainer.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        all_container: action.payload,
      };
    });
    builder.addCase(GetAllContainer.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetDepartment.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetDepartment.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_department: action.payload,
      };
    });
    builder.addCase(GetDepartment.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleQuery.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleQuery.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_singlequery: action.payload,
      };
    });
    builder.addCase(GetSingleQuery.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetQueryResponse.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetQueryResponse.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_response: action.payload,
      };
    });
    builder.addCase(GetQueryResponse.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleQueryResponse.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleQueryResponse.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_singleresponse: action.payload,
      };
    });
    builder.addCase(GetSingleQueryResponse.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetMyQueryResponse.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetMyQueryResponse.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_myresponse: action.payload,
      };
    });
    builder.addCase(GetMyQueryResponse.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleEmployee.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleEmployee.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_single_employee: action.payload,
      };
    });
    builder.addCase(GetSingleEmployee.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(ViewSingleEmployee.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        view_single_employee: action.payload,
      };
    });
    builder.addCase(ViewSingleEmployee.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(ViewSingleEmployee.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeBanks.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        banks: action.payload,
      };
    });
    builder.addCase(GetEmployeeBanks.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetMyBeneficiaryInfo.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetMyBeneficiaryInfo.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_beneficiary_info: action.payload,
      };
    });
    builder.addCase(GetMyBeneficiaryInfo.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetAllHospitals.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetAllHospitals.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        get_hospitals: action.payload,
      };
    });
    builder.addCase(GetAllHospitals.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetSingleNOK.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleNOK.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        single_NOK: action.payload,
      };
    });
    builder.addCase(GetSingleNOK.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetSingleMedicalRequisition.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleMedicalRequisition.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        single_medical: action.payload,
      };
    });
    builder.addCase(GetSingleMedicalRequisition.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetEmployeeMedicalRequisition.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeMedicalRequisition.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        employee_medical: action.payload,
      };
    });
    builder.addCase(GetEmployeeMedicalRequisition.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetEmployeeQualification.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeQualification.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        employee_qualification: action.payload,
      };
    });
    builder.addCase(GetEmployeeQualification.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleEmployeeQualification.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleEmployeeQualification.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        single_qualification: action.payload,
      };
    });
    builder.addCase(GetSingleEmployeeQualification.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });



    builder.addCase(GetEmployeeReferee.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeReferee.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        employee_referee: action.payload,
      };
    });
    builder.addCase(GetEmployeeReferee.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    
    builder.addCase(GetSingleEmployeeReferee.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleEmployeeReferee.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        single_referee: action.payload,
      };
    });
    builder.addCase(GetSingleEmployeeReferee.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetCountries.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetCountries.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
      };
    });
    builder.addCase(GetCountries.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetStates.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetStates.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        states: action.payload,
      };
    });
    builder.addCase(GetStates.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetLGA.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetLGA.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        lgas: action.payload,
      };
    });
    builder.addCase(GetLGA.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });




    builder.addCase(GetEmployeeClaims.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeClaims.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        employee_claims: action.payload,
      };
    });
    builder.addCase(GetEmployeeClaims.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleEmployeeClaim.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleEmployeeClaim.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        single_claim: action.payload,
      };
    });
    builder.addCase(GetSingleEmployeeClaim.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


  },
});

export default EmployeeSlice.reducer;
