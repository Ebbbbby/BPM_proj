import { api } from "../../api";
import { CreateQueryParams } from "../../functions/ResourceFunctions";

const hrService = () => {
  const hr = process.env.REACT_APP_BACKEND_HR_URL;
  const eps_env = process.env.REACT_APP_BACKEND_EPS_URL;
  const hr_api = api(hr);
  const eps_api = api(eps_env);

  return {
    GetRSA: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return eps_api.get(`/v2/SelfServices/getrsa${params}`, data);
    },
    GetAllEmployees: function (data) {
      return hr_api.get(
        `/Employee/GetAllEmployees${CreateQueryParams(data)}`,
        data
      );
    },

    GetLeaveTypes: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/EmployeeLeaveType${params}`, data);
    },

    GetAllDepartments: function (data) {

      return hr_api.get(
        `/Department/AllDepartment${CreateQueryParams(data)}`,
        data
      );
    },

    CreateLeaveType: function (data) {
      return hr_api.post(`/EmployeeLeaveType`, data);
    },

    UpdateLeaveType: function (data) {
      return hr_api.post(`/EmployeeLeaveType/update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    GetSingleDepartment: function (data) {
      return hr_api.get(`/Department?id=${data}`, data);
    },
    GetUnits: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/Container/AllContainer${params}`, data);
    },

    CreateLeaveRequest: function (data) {
      return hr_api.post(`/EmployeeLeaveRequisition`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    UpdateLeaveRequest: function (data) {
      console.log(data, "DATa")
      return hr_api.post(`/EmployeeLeaveRequisition/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    GetSingleLeaveRequest: function (data) {
      return hr_api.get(`/EmployeeLeaveRequisition/${data}`, data);
    },
    GetMyLeaveRequest: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/EmployeeLeaveRequisition/my${params}`, data);
    },

    GetAllLeaveRequest: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/EmployeeLeaveRequisition/${params}`, data);
    },

    GetByDepartment: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(
        `/EmployeeLeaveRequisition/GetByDepartment${params}`,
        data
      );
    },

    ApproveLeave: function (data) {
      return hr_api.post(`/EmployeeLeaveRequisition/approve`, data);
    },

    DeclineLeave: function (data) {
      return hr_api.post(`/EmployeeLeaveRequisition/reject`, data);
    },

    CancelLeave: function (data) {
      return hr_api.post(`/EmployeeLeaveRequisition/cancel`, data);
    },
    CreateLeaveRecall: function (data) {
      return hr_api.post(`/EmployeeLeaveRecall`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetSingleLeaveRecall: function (data) {
      return hr_api.get(`/EmployeeLeaveRecall/${data}`, data);
    },

    GetConfirmAction: function (data) {
      console.log(data);
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/EmployeeLeaveRequisition/BackAction/${params}`, data);
    },

    ApproveLeaveRecall: function (data) {
      return hr_api.post(`/EmployeeLeaveRecall/approve`, data);
    },

    RejectLeaveRecall: function (data) {
      console.log(data);
      return hr_api.post(`/EmployeeLeaveRecall/reject`, data);
    },

    CancelLeaveRecall: function (data) {
      return hr_api.post(`/EmployeeLeaveRecall/cancel`, data);
    },

    //Exit Management starts here
    CreateExitRequisition: function (data) {
      return hr_api.post(`/ExitManagement`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    UpdateExitRequisition: function (data) {
      return hr_api.post(`/ExitManagement/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetExitRequisition: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/ExitManagement${params}`, data);
    },

    GetMyExitRequisition: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/ExitManagement/my${params}`, data);
    },

    GetExitRequisitionHOD: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`ExitManagement/HOD${params}`, data);
    },

    GetSingleExitRequisition: function (data) {
      return hr_api.get(`/ExitManagement/${data}`, data);
    },

    ApproveExit: function (data) {
      return hr_api.post(`/ExitManagement/approve`, data);
    },

    CancelExit: function (data) {
      return hr_api.post(`ExitManagement/cancel`, data);
    },

    DeclineExit: function (data) {
      return hr_api.post(`/ExitManagement/decline`, data);
    },
    //exit management ends here

    //exit discussion
    CreateExitDiscussionQuestions: function (data) {
      return hr_api.post(`/ExitDiscussion/creatediscussionquestion`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetExitDiscussionQuestion: function (data) {
      return hr_api.get(`/ExitDiscussion/getalldiscussionquestion`, data);
    },

    CreateExitDiscussion: function (data) {
      return hr_api.post(`/ExitDiscussion`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetExitDiscussion: function (data) {
      const { ExitRequestId } = data;
      return hr_api.get(
        `/ExitDiscussion/getexitdiscussion?ExitRequestId=${ExitRequestId}`,
        data
      );
    },

    //ExitDiscussion/getexitdiscussion?ExitRequestId=1

    UpdateExitDiscussionQuestions: function (data) {
      return hr_api.post(`ExitDiscussion/updatediscussionquestion`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    AddDiscussionRemarks: function (data) {
      console.log(data);
      return hr_api.post(`/ExitDiscussion/AddRemarks`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    //end exit discussion

    // start query setup
    GetQuerySetup: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/QuerySetUp${params}`, data);
    },

    CreateQuerySetup: function (data) {
      return hr_api.post(`/QuerySetUp`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    UpdateQuerySetup: function (data) {
      return hr_api.post(`QuerySetUp/update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    //end query setup
    GetQueries: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/Query${params}`, data);
    },

    GetSingleQuery: function (data) {
      console.log(data);
      return hr_api.get(`/Query/${data}`, data);
    },

    //start Panel setup
    CreateQueryPanel: function (data) {
      return hr_api.post(`/QueryManagement`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    CreateQueryReport: function (data) {
      return hr_api.post(`/QueryManagement/panelreport`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetQueryManagement: function (data) {
      console.log(data);
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/QueryManagement${params}`, data);
    },

    GetSingleQueryManagement: function (data) {
      return hr_api.get(`/QueryManagement/ById?id=${data}`, data);
    },

    UpdateQueryPanel: function (data) {
      return hr_api.post(`/QueryManagement/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    ApprovePanelReport: function (data) {
      return hr_api.post(`/QueryManagement/approve`, data);
    },
    RejectPanelReport: function (data) {
      return hr_api.post(`/QueryManagement/reject`, data);
    },
    //end Panel setup

    //start overtime type

    GetOvertimeType: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/OvertimeType${params}`, data);
    },

    DeleteOvertimeType: function (data) {
      return hr_api.post(`/OvertimeType/delete`, data);
    },

    CreateOvertimeType: function (data) {
      return hr_api.post(`/OvertimeType`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetEmployeeCadrePosition: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/EmployeeCadrePosition${params}`, data);
    },

    UpdateOvertimeType: function (data) {
      return hr_api.post(`/OvertimeType/update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    //end overtime type

    //stert overtime requisition
    GetAllOvertimeRequisition: function (data) {
      console.log(data);
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`EmployeeOvertimeRequisition${params}`, data);
    },

    GetOvertimeRequisition: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`EmployeeOvertimeRequisition/my${params}`, data);
    },

    CreateOvertime: function (data) {
      return hr_api.post(`/EmployeeOvertimeRequisition`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    UpdateOvertime: function (data) {
      return hr_api.post(`/EmployeeOvertimeRequisition/update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    CancelOvertimeRequisition: function (data) {
      return hr_api.post(`/EmployeeOvertimeRequisition/cancel`, data);
    },

    GetSingleOvertimeRequisition: function (data) {
      return hr_api.get(`/EmployeeOvertimeRequisition/${data}`, data);
    },

    ApproveOvertimeRequest: function (data) {
      return hr_api.post(`/EmployeeOvertimeRequisition/approve`, data);
    },

    DeclineOvertimeRequest: function (data) {
      return hr_api.post(`EmployeeOvertimeRequisition/reject`, data);
    },
    //end overtime requisition

    GetEmployee: function (data) {
      return hr_api.get(
        `/Employee/GetAllEmployees${CreateQueryParams(data)}`,
        data
      );
    },

    UpdateEmployeInformation: function (data) {
      return hr_api.post(`/Employee/Update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetEmployeeBeneficiary: function (data) {

      return hr_api.get(
        `/EmployeeRSALinking/MyEmployeeBeneficiary${CreateQueryParams(data)}`,
        data
      );
    },

    GetAllEmployeeBeneficiary: function (data) {

      return hr_api.get(
        `/EmployeeRSALinking/AllBeneficiary${CreateQueryParams(data)}`,
        data
      );
    },

    CreateEmployeBeneficiary: function (data) {
      return hr_api.post(`/EmployeeUpdate/CreateBeneficiary`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetEmployeeDesignation: function (data) {
      return hr_api.get(
        `/Designation/AllDesignation${CreateQueryParams(data)}`,
        data
      );
    },

    CreateMedicalRequisition: function (data) {
      console.log(data, "Slice Data")
      return hr_api.post(`/EmployeeMedicalRequisition`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetEmployeeMedicalRequisition: function (data) {
      return hr_api.get(`/EmployeeMedicalRequisition/All${CreateQueryParams(data)}`,
        data
      );
    },

    GetCountries: function (data) {
      return eps_api.get(`/v2/SelfServices/country${CreateQueryParams(data)}`, data);
    },

    GetEmployeeQualifications: function (data) {
      return hr_api.get(`/EmployeeRSALinking/AllEmployeeQualification${CreateQueryParams(data)}`,
        data
      );
    },

    GetEmployeeExtendedClaims: function (data) {
      return hr_api.get(`/ExtendedHMOClaims/All${CreateQueryParams(data)}`,
        data
      );
    },

    GetAllReferees: function (data) {
      return hr_api.get(`/EmployeeReferees/GetAllReferees${CreateQueryParams(data)}`,
        data
      );
    },

    //approval for HR

    ApproveEmployeeInformation: function (data) {
      return hr_api.post(`/EmployeeAprovalOrDeclineStatus/ApproveEmployeeInformation`, data);
    },

    DeclineEmployeeInformation: function (data) {
      return hr_api.post(`/EmployeeAprovalOrDeclineStatus/DeclineEmployeeInformation`, data);
    },

    ApproveEmployeeNOK: function (data) {
      return hr_api.post(`/EmployeeApproval/NOKAproval`, data);
    },

    DeclineEmployeeNOK: function (data) {
      return hr_api.post(`/EmployeeApproval/NOKDecline`, data);
    },

    ApproveEmployeeQualification: function (data) {
      return hr_api.post(`/EmployeeApproval/QualificationAproval`, data);
    },

    DeclineEmployeeQualification: function (data) {
      return hr_api.post(`/EmployeeApproval/QualificationDecline`, data);
    },

    ApproveEmployeeReferee: function (data) {
      return hr_api.post(`/EmployeeReferees/RefereesAproval`, data);
    },

    DeclineEmployeeReferee: function (data) {
      return hr_api.post(`/EmployeeReferees/RefereesDecline`, data);
    },
    ApproveEmployeeMedicalRequisition: function (data) {
      return hr_api.post(`/EmployeeMedicalRequisition/Approve`, data);
    },

    DeclineEmployeeMedicalRequisition: function (data) {
      return hr_api.post(`/EmployeeMedicalRequisition/Decline`, data);
    },

    ApproveEmployeeClaims: function (data) {
      return hr_api.post(`/ExtendedHMOClaims/Approve`, data);
    },

    DeclineEmployeeClaims: function (data) {
      return hr_api.post(`/ExtendedHMOClaims/Decline`, data);
    },

  };
};


//approval for HR



// Training Requisition
const trainingRequisition = () => {
  const root = process.env.REACT_APP_BACKEND_HR_URL;
  const route = api(root);

  return {
    CreateBeneficiary: function (data) {
      return route.post(`/EmployeeTrainingRequisition/Beneficiary`, data);
    },
    UpdateBeneficiary: function (data) {
      return route.post(`/EmployeeTrainingRequisition/UpdateBeneficiary`, data);
    },
    CreateRequisition: function (data) {
      return route.post(`/EmployeeTrainingRequisition`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    UpdateRequisition: function (data) {
      return route.post(`/EmployeeTrainingRequisition/Update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ApproveRequisition: function (data) {
      return route.post(`/EmployeeTrainingRequisition/Approve`, data);
    },
    DeclineRequisition: function (data) {
      return route.post(`/EmployeeTrainingRequisition/Decline`, data);
    },
    CancelRequisition: function (data) {
      return route.post(`/EmployeeTrainingRequisition/Cancel`, data);
    },
    GetAllEmployeeTraining: function (data) {
      const {
        currentPage,
        pageSize,
        filter,
        searchQuery,
        startDate,
        endDate,
        sort,
      } = data;
      return route.get(
        `/EmployeeTrainingRequisition?pageNumber=${currentPage || 1}&perPage=${
          pageSize || 1
        }&ApprovalStatus=${filter}&Search=${searchQuery}&StartDate=${startDate}&EndDate=${endDate}&SortBy=${sort}`,
        data
      );
    },
    GetEmployeeTrainingRequisition: function (data) {
      return route.get(`/EmployeeTrainingRequisition/uuId?uuId=${data}`, data);
    },
    ApproveOrDeclineBatchEmployeeTrainingRequest: function (data) {
      return route.post(
        `/EmployeeTrainingRequisition/TrainingRangeAprovalOrDecline`,
        data
      );
    },
  };
};

// Training Setup
const trainingSetup = () => {
  const root = process.env.REACT_APP_BACKEND_HR_URL;
  const route = api(root);

  return {
    CreateTrainingType: function (data) {
      return route.post(`/TrainingType`, data);
    },
    GetAllTrainingType: function (data) {
      const { currentPage, pageSize, searchQuery, startDate, endDate, sort } =
        data;
      return route.get(
        `/TrainingType?pageNumber=${currentPage || 1}&perPage=${
          pageSize || 1
        }&Search=${searchQuery || ""}&StartDate=${startDate || ""}&EndDate=${
          endDate || ""
        }&SortBy=${sort || ""}`,
        data
      );
    },
    UpdateTrainingType: function (data) {
      return route.post(`/TrainingType/update`, data);
    },
    DeleteTrainingType: function (data) {
      console.log(data);
      return route.post(`/TrainingType/delete`, data);
    },
  };
};

export const HRServices = {
  trainingRequisition: trainingRequisition,
  trainingSetup: trainingSetup,
  hrService: hrService,
};
