import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HRServices } from "./HRService";
import { toast } from "react-toastify";
import { successAlert } from "../Global/GlobalSlice";


export const GetRSA = createAsyncThunk(
  "hr/GetRsa",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const response = await HRServices.hrService().GetRSA(payload);
      console.log(response.data);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllEmployees = createAsyncThunk(
  "hr/GetAllEmployees",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetAllEmployees(payload);

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
  export const GetAllReferees= createAsyncThunk(
    "hr/Getallreferees",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.hrService().GetAllReferees(payload);
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

export const GetLeaveTypes = createAsyncThunk(
  "hr/GetLeaveTypes",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetLeaveTypes(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateLeaveType = createAsyncThunk(
  "hr/CreateLeaveType",
  async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
      const response = await HRServices.hrService().CreateLeaveType(payload);
     console.log(response.data)
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

export const UpdateLeaveType = createAsyncThunk(
  "hr/UpdateLeaveType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().UpdateLeaveType(payload);
      //console.log(response)
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

export const GetAllDepartments = createAsyncThunk(
  "hr/GetDepartments",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetAllDepartments(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetSingleDepartment = createAsyncThunk(
  "hr/GetSingleDepartments",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetSingleDepartment(
        payload
      );
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetUnits = createAsyncThunk(
  "hr/GetUnits",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetUnits(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const CreateLeaveRequest = createAsyncThunk(
  "hr/CreateLeaveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
  
    try {
      const response = await HRServices.hrService().CreateLeaveRequest(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }else{
        toast.error(response?.data?.statusMessage);

      }
      return response?.data;
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const UpdateLeaveRequest = createAsyncThunk(
  "hr/UpdateLeaveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload, 'PAYLOAD')
    try {
      const response = await HRServices.hrService().UpdateLeaveRequest(payload);
      //console.log(response)
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

export const GetSingleLeaveRequest = createAsyncThunk(
  "hr/GetSingleLeaveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //console.log(payload);
      const response = await HRServices.hrService().GetSingleLeaveRequest(
        payload
      );
      console.log(response?.data);
      // if (response?.data?.successful === true) {
      //   dispatch(
      //     successAlert({
      //       message: response?.data?.statusMessage,
      //     })
      //   );
      // }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetMyLeaveRequest = createAsyncThunk(
  "hr/MyLeaveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().GetMyLeaveRequest(payload);

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetAllLeaveRequest = createAsyncThunk(
  "hr/AllLeaveRequest",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().GetAllLeaveRequest(payload);

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetByDepartment = createAsyncThunk(
  "hr/GetByDepartment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().GetByDepartment(payload);

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const ApproveLeave = createAsyncThunk(
  "hr/ApproveLeave",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApproveLeave(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const DeclineLeave = createAsyncThunk(
  "hr/DeclineLeave",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(payload);
      const response = await HRServices.hrService().DeclineLeave(payload);
      console.log(response.data);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CancelLeave = createAsyncThunk(
  "hr/CancelLeave",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().CancelLeave(payload);

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const ApproveOrDecline = createAsyncThunk(
  "hr/ApproveOrDecline",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().ApproveOrDecline(payload);
      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateLeaveRecall = createAsyncThunk(
  "hr/createRecall",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const response = await HRServices.hrService().CreateLeaveRecall(payload);

      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleLeaveRecall = createAsyncThunk(
  "hr/GetSingleRecall",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetSingleLeaveRecall(
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
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveLeaveRecall = createAsyncThunk(
  "hr/ApproveLeaveRecall",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApproveLeaveRecall(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const RejectLeaveRecall = createAsyncThunk(
  "hr/RejectLeaveRecall",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().RejectLeaveRecall(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CancelLeaveRecall = createAsyncThunk(
  "hr/CancelLeaveRecall",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().CancelLeaveRecall(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetConfirmAction = createAsyncThunk(
  "hr/GetConfirmAction",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
    

      const response = await HRServices.hrService().GetConfirmAction(payload);
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

//Exit management starts here

export const CreateExitRequisition = createAsyncThunk(
  "hr/createExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(payload);

      const response = await HRServices.hrService().CreateExitRequisition(payload);
     dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const UpdateExitRequisition= createAsyncThunk(
  "hr/updateExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
     console.log(payload);

      const response = await HRServices.hrService().UpdateExitRequisition(payload);
     // console.log(response.data);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetExitRequisition= createAsyncThunk(
  "hr/getExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetExitRequisition(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetMyExitRequisition= createAsyncThunk(
  "hr/getMyExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetMyExitRequisition(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetExitRequisitionHOD= createAsyncThunk(
  "hr/getHODExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetExitRequisitionHOD(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetSingleExitRequisition= createAsyncThunk(
  "hr/getSingleExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetSingleExitRequisition(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveExit = createAsyncThunk(
  "hr/ApproveExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApproveExit(payload);
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

export const CancelExit = createAsyncThunk(
  "hr/ApproveExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().CancelExit(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineExit = createAsyncThunk(
  "hr/DeclineExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().DeclineExit(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Exit management ends here

//Exit Discussion
export const CreateExitDiscussionQuestions = createAsyncThunk(
  "hr/createDiscussionQuestions",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().CreateExitDiscussionQuestions(payload);

      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateExitDiscussionQuestions = createAsyncThunk(
  "hr/updateExitDiscussionQuestions",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   
    try {
      const response = await HRServices.hrService().UpdateExitDiscussionQuestions(payload);
console.log(response)
      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const CreateExitDiscussion = createAsyncThunk(
  "hr/createDiscussion",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   
    try {
      const response = await HRServices.hrService().CreateExitDiscussion(payload);
      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const GetExitDiscussionQuestion = createAsyncThunk(
  "hr/getDiscussionQuestion",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await HRServices.hrService().GetExitDiscussionQuestion(payload);
   

      // dispatch(
      //   successAlert({
      //     message: response?.data?.statusMessage,
      //   })
      // );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetExitDiscussion = createAsyncThunk(
  "hr/getDiscussion",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().GetExitDiscussion(payload);
      // console.log(response)
      // dispatch(
      //   successAlert({
      //     message: response?.data?.statusMessage,
      //   })
      // );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const AddRemarks = createAsyncThunk(
  "hr/addRemark",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   
    try {
      const response = await HRServices.hrService().AddDiscussionRemarks(payload);

      dispatch(
        successAlert({
          message: response?.data?.statusMessage,
        })
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//End Exit Discussion

//start Query setup

export const GetQuerySetup = createAsyncThunk(
  "hr/getQuerySetup",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().GetQuerySetup(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateQuerySetup = createAsyncThunk(
  "hr/createQuerySetup",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().CreateQuerySetup(payload);
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

export const UpdateQuerySetup = createAsyncThunk(
  "hr/createQuerySetup",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().UpdateQuerySetup(payload);
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
)

//end query setup

//start query management(panel)
export const GetQueries = createAsyncThunk(
  "hr/getQueries",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().GetQueries(payload);
      //console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const CreateQueryPanel = createAsyncThunk(
  "hr/createPanel",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().CreateQueryPanel(payload);
      console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreatePanelReport = createAsyncThunk(
  "hr/createPanelReport",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().CreateQueryReport(payload);
      console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetQueryManagement = createAsyncThunk(
  "hr/getQuerymanagement",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().GetQueryManagement(payload);
      console.log(response)

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleQueryManagement = createAsyncThunk(
  "hr/getSingleQuerymanagement",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().GetSingleQueryManagement(payload);
      console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetSingleQuery = createAsyncThunk(
  "hr/getSingleQuery",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().GetSingleQuery(payload);
      console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateQueryPanel = createAsyncThunk(
  "hr/updateQueryPanel",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().UpdateQueryPanel(payload);
      console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApprovePanelReport = createAsyncThunk(
  "hr/ApproveReport",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApprovePanelReport(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const RejectPanelReport = createAsyncThunk(
  "hr/ApproveExit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().RejectPanelReport(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);



// end query magement

//start overtime setup
export const GetOvertimeType = createAsyncThunk(
  "hr/getOvertimeType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
  ;
    try {
      const response = await HRServices.hrService().GetOvertimeType(payload);
   
     
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);




export const GetEmployeeCadrePosition = createAsyncThunk(
  "hr/getCadrePosition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
  ;
    try {
      const response = await HRServices.hrService().GetEmployeeCadrePosition(payload);    
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeleteOvertimeType = createAsyncThunk(
  "hr/deleteOvertimeType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const response = await HRServices.hrService().DeleteOvertimeType(payload);
        console.log(response)
     
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const CreateOvertimeType = createAsyncThunk(
  "hr/createOvertimeType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   
    try {
      const response = await HRServices.hrService().CreateOvertimeType(payload);
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
export const UpdateOvertimeType = createAsyncThunk(
  "hr/updateOvertimeType",
  async (payload, { rejectWithValue, getState, dispatch }) => {
 
    try {
      const response = await HRServices.hrService().UpdateOvertimeType(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


//end overtime setup

//start overtime requisition

export const GetOvertimeRequisition = createAsyncThunk(
  "hr/getOvertimeRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
  ;
    try {
      const response = await HRServices.hrService().GetOvertimeRequisition(payload);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllOvertimeRequisition = createAsyncThunk(
  "hr/getAllOvertimeRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
  ;
    try {
      const response = await HRServices.hrService().GetAllOvertimeRequisition(payload);
   
    // console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const CreateOvertime = createAsyncThunk(
  "hr/createOvertime",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   
    try {
      const response = await HRServices.hrService().CreateOvertime(payload);
      
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



export const UpdateOvertime = createAsyncThunk(
  "hr/updateOvertime",
  async (payload, { rejectWithValue, getState, dispatch }) => {
 console.log(payload)
    try {
      const response = await HRServices.hrService().UpdateOvertime(payload);
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

export const CancelOvertime = createAsyncThunk(
  "hr/cancelOvertimeRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
 
    try {
      const response = await HRServices.hrService().CancelOvertimeRequisition(payload);
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

export const GetSingleOvertime = createAsyncThunk(
  "hr/singleOvertimeRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   
    try {
      const response = await HRServices.hrService().GetSingleOvertimeRequisition(payload);
    
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const ApproveOvertimeRequest = createAsyncThunk(
  "hr/singleOvertimeRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   
    try {
      const response = await HRServices.hrService().ApproveOvertimeRequest(payload);
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
export const DeclineOvertimeRequest = createAsyncThunk(
  "hr/singleOvertimeRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   
    try {
      const response = await HRServices.hrService().DeclineOvertimeRequest(payload);
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


//end overtime requisition

//start employee update
export const GetEmployees = createAsyncThunk(
  "hr/getemployee",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().GetEmployee(payload);
      //console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const UpdateEmployeeInformation = createAsyncThunk(
  "hr/updateEmployeeInfo",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().UpdateEmployeInformation(payload);
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
)


export const GetEmployeeBeneficiary = createAsyncThunk(
  "hr/getemployeebeneficiary",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const response = await HRServices.hrService().GetEmployeeBeneficiary(payload);
      //console.log(response)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetAllEmployeeBeneficiary = createAsyncThunk(
  "hr/Employeebeneficiaries",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().GetAllEmployeeBeneficiary(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
)

export const CreateEmployeeBeneficiary = createAsyncThunk(
  "hr/createEmployeeBeneficiary",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().CreateEmployeBeneficiary(payload);
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
)

export const GetEmployeeDesignation = createAsyncThunk(
  "hr/getEmployeeDesignation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().GetEmployeeDesignation(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
)



export const CreateEmployeeMedicalRequisition = createAsyncThunk(
  "hr/createMedicalRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().CreateMedicalRequisition(payload);
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
)

export const GetEmployeeMedicalRequisition = createAsyncThunk(
  "hr/getMedicalRequisition",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().GetEmployeeMedicalRequisition(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
)

export const GetEmployeeQualifications = createAsyncThunk(
  "hr/getEmployeeQualification",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().GetEmployeeQualifications(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
)

export const GetEmployeeExtendedClaims = createAsyncThunk(
  "hr/getEmployeeClaims",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response =
        await HRServices.hrService().GetEmployeeExtendedClaims(payload);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
)
export const ApproveEmployeeInformation = createAsyncThunk(
  "hr/ApproveInformation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApproveEmployeeInformation(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineEmployeeInformation = createAsyncThunk(
  "hr/DeclineInformation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().DeclineEmployeeInformation(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const ApproveEmployeeNOK = createAsyncThunk(
  "hr/ApproveNOK",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApproveEmployeeNOK(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineEmployeeNOK = createAsyncThunk(
  "hr/DeclineNOK",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().DeclineEmployeeNOK(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveEmployeeQualification = createAsyncThunk(
  "hr/ApproveQualification",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApproveEmployeeQualification(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineEmployeeQualification = createAsyncThunk(
  "hr/DeclineQualification",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().DeclineEmployeeQualification(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const ApproveEmployeeReferee = createAsyncThunk(
  "hr/ApproveReferee",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApproveEmployeeReferee(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineEmployeeReferee = createAsyncThunk(
  "hr/DeclineReferee",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().DeclineEmployeeReferee(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const ApproveEmployeeMedicalRequisition = createAsyncThunk(
  "hr/Approvereq",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApproveEmployeeMedicalRequisition(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineEmployeeMedicalRequisition = createAsyncThunk(
  "hr/Declinereq",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().DeclineEmployeeInformation(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);




export const ApproveEmployeeClaims = createAsyncThunk(
  "hr/approveClaims",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().ApproveEmployeeClaims(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineEmployeeClaims = createAsyncThunk(
  "hr/Declineclaims",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // console.log(payload)
      const response = await HRServices.hrService().DeclineEmployeeClaims(payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);


// Start of Training Requisition

  export const CreateTrainingRequisition = createAsyncThunk(
    "hr/CreateTrainingRequisition",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingRequisition().CreateRequisition(payload);

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

  export const CreateTrainingBeneficiary = createAsyncThunk(
    "hr/CreateTrainingBeneficiary",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingRequisition().CreateBeneficiary(payload);

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

  export const UpdateTrainingBeneficiary = createAsyncThunk(
    "hr/CreateTrainingBeneficiary",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingRequisition().UpdateBeneficiary(payload);

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
    "hr/CreateTrainingRequisition",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingRequisition().UpdateRequisition(payload);

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

  export const GetAllEmployeesTrainingRequisitions = createAsyncThunk(
    "hr/GetAllEmployeesTrainingRequisitions",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.trainingRequisition().GetAllEmployeeTraining(payload);
        // toast.success(response?.data?.statusMessage);
        return response?.data?.responseObject;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const GetEmployeeTrainingRequisition = createAsyncThunk(
    "hr/GetEmployeeTrainingRequisitions",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.trainingRequisition().GetEmployeeTrainingRequisition(payload);
        // toast.success(response?.data?.statusMessage);
        return response?.data?.responseObject;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const ApproveTrainingRequest = createAsyncThunk(
    "hr/ApproveRequest",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingRequisition().ApproveRequisition(payload);
  
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
  
  export const DeclineTrainingRequest = createAsyncThunk(
    "hr/DeclineRequest",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingRequisition().DeclineRequisition(payload);
  
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
  
  export const CancelTrainingRequest = createAsyncThunk(
    "hr/CancelRequest",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
    //console.log(payload)
        const response =
          await HRServices.trainingRequisition().CancelRequisition(payload);
  
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
  
  export const ApproveOrDeclineBatchTrainingRequest = createAsyncThunk(
    "hr/ApproveRequest",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      console.log(payload)
      try {
        const response =
          await HRServices.trainingRequisition().ApproveOrDeclineBatchEmployeeTrainingRequest(payload);
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
        toast.error(error?.response?.data.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  // Start of Training Setup

  export const CreateTrainingType = createAsyncThunk(
    "hr/CreateTrainingType",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.trainingSetup().CreateTrainingType(payload);
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
  
  export const GetAllTrainingType = createAsyncThunk(
    "hr/GetAllTrainingType",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.trainingSetup().GetAllTrainingType(payload);
        // toast.success(response?.data?.statusMessage);
        return response?.data;
      } catch (error) {
        // toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
  export const UpdateTrainingType = createAsyncThunk(
    "hr/CreateTrainingType",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingSetup().UpdateTrainingType(payload);

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
  
  export const DeleteTrainingType = createAsyncThunk(
    "hr/DeleteTrainingType",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingSetup().DeleteTrainingType(payload);
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



const initialState = {
  hr: "",
};

export const HRSlice = createSlice({
  name: "hr",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(GetRSA.pending, (state) => {
        return {
          ...state,
          isLoadingRsa: true,
        };
      })
      .addCase(GetRSA.fulfilled, (state, action) => {
        return {
          ...state,
          isLoadingRsa: false,
          isSuccessful: true,
          get_RSA: action.payload,
        };
      })
      .addCase(GetRSA.rejected, (state, action) => {
        return {
          ...state,
          isLoadingRsa: false,
          error: action.payload,
        };
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
    builder.addCase(GetLeaveTypes.pending, (state, action)=>{
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetLeaveTypes.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        leave_types: action.payload,
      };
    });

    builder.addCase(GetLeaveTypes.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetAllDepartments.pending, (state, action) => {
      return {
        ...state,
        isLoadingDepartment: true,
      };
    });
    builder.addCase(GetAllDepartments.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingDepartment: false,
        isSuccessful: true,
        all_departments: action.payload,
      };
    });

    builder.addCase(GetAllDepartments.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetUnits.pending, (state, action) => {
      return {
        ...state,
        isLoadingUnit: true,
      };
    });
    builder.addCase(GetUnits.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingUnit: false,
        isSuccessful: true,
        units: action.payload,
      };
    });

    builder.addCase(GetUnits.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleLeaveRequest.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleLeaveRequest.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_request: action.payload,
      };
    });

    builder.addCase(GetSingleLeaveRequest.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetMyLeaveRequest.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetMyLeaveRequest.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingAction: false,
        isSuccessful: true,
        get_myrequest: action.payload,
      };
    });

    builder.addCase(GetAllLeaveRequest.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetAllLeaveRequest.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetAllLeaveRequest.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingAction: false,
        isSuccessful: true,
        all_request: action.payload,
      };
    });

    builder.addCase(GetMyLeaveRequest.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetByDepartment.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetByDepartment.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingAction: false,
        isSuccessful: true,
        get_department: action.payload,
      };
    });

    builder.addCase(GetByDepartment.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleDepartment.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleDepartment.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_dept: action.payload,
      };
    });

    builder.addCase(GetSingleDepartment.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleLeaveRecall.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleLeaveRecall.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_recall: action.payload,
      };
    });

    builder.addCase(GetSingleLeaveRecall.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetConfirmAction.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetConfirmAction.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_confirmation: action.payload,
      };
    });

    builder.addCase(GetConfirmAction.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetExitRequisition.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetExitRequisition.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_exit: action.payload,
      };
    });

    builder.addCase(GetExitRequisition.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    
    builder.addCase(GetExitRequisitionHOD.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetExitRequisitionHOD.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_exithod: action.payload,
      };
    });

    builder.addCase(GetExitRequisitionHOD.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetMyExitRequisition.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetMyExitRequisition.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_my_exit: action.payload,
      };
    });

    builder.addCase(GetMyExitRequisition.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(GetSingleExitRequisition.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleExitRequisition.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_single_exit: action.payload,
      };
    });

    builder.addCase(GetSingleExitRequisition.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });



    builder.addCase(GetExitDiscussionQuestion.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetExitDiscussionQuestion.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_discussion_question: action.payload,
      };
    });

    builder.addCase(GetExitDiscussionQuestion.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });



    builder.addCase(GetExitDiscussion.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetExitDiscussion.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_discussion: action.payload,
      };
    });

    builder.addCase(GetExitDiscussion.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetQuerySetup.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetQuerySetup.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_querysetup: action.payload,
      };
    });
    builder.addCase(GetQuerySetup.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(GetOvertimeType.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetOvertimeType.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_overtime_type: action.payload,
      };
    });
    builder.addCase(GetOvertimeType.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });



    builder.addCase(GetEmployeeCadrePosition.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeCadrePosition.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        cadre_position: action.payload,
      };
    });
    builder.addCase(GetEmployeeCadrePosition.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetOvertimeRequisition.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetOvertimeRequisition.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_overtime: action.payload,
      };
    });
    builder.addCase(GetOvertimeRequisition.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });




    builder.addCase(GetAllOvertimeRequisition.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetAllOvertimeRequisition.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_all_overtime: action.payload,
      };
    });
    builder.addCase(GetAllOvertimeRequisition.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetSingleOvertime.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleOvertime.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_single_overtime: action.payload,
      };
    });
    builder.addCase(GetSingleOvertime.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetQueries.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetQueries.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_queries: action.payload,
      };
    });

    builder.addCase(GetQueries.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetQueryManagement.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetQueryManagement.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_query_management: action.payload,
      };
    });

    builder.addCase(GetQueryManagement.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetSingleQuery.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleQuery.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        single_query: action.payload,
      };
    });

    builder.addCase(GetSingleQuery.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });



    builder.addCase(GetSingleQueryManagement.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetSingleQueryManagement.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        single_query_management: action.payload,
      };
    });

    builder.addCase(GetSingleQueryManagement.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    
    builder.addCase(GetEmployeeBeneficiary.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeBeneficiary.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        employee_beneficiary: action.payload,
      };
    });

    builder.addCase(GetEmployeeBeneficiary.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetAllEmployeeBeneficiary.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetAllEmployeeBeneficiary.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        all_beneficiary: action.payload,
      };
    });

    builder.addCase(GetAllEmployeeBeneficiary.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetEmployeeDesignation.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeDesignation.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_designation: action.payload,
      };
    });

    builder.addCase(GetEmployeeDesignation.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetEmployeeMedicalRequisition.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeMedicalRequisition.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        get_medicalrequisition: action.payload,
      };
    });

    builder.addCase(GetEmployeeMedicalRequisition.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


    builder.addCase(GetEmployeeQualifications.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeQualifications.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        all_qualification: action.payload,
      };
    });

    builder.addCase(GetEmployeeQualifications.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    
    builder.addCase(GetEmployeeExtendedClaims.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeExtendedClaims.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        all_claims: action.payload,
      };
    });

    builder.addCase(GetEmployeeExtendedClaims.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

      
    builder.addCase(GetAllReferees.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetAllReferees.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        all_referees: action.payload,
      };
    });

    builder.addCase(GetAllReferees.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });


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

    builder.addCase(GetAllTrainingType.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      GetAllTrainingType.fulfilled,
      (state, action) => {
        return {
          ...state,
          isLoading: false,
          all_training_type: action.payload,
        };
      }
    );
    builder.addCase(
      GetAllTrainingType.rejected,
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
  },
});

export default HRSlice.reducer;