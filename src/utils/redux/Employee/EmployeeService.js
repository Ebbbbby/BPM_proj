import { api } from "../../api";
import { CreateQueryParams } from "../../functions/ResourceFunctions";

const trainingRequisition = () => {
    const root = process.env.REACT_APP_BACKEND_HR_URL;
    const route = api(root);  

    return{
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
      GetAllMyTrainingRequisitions: function (data){
        const { currentPage, pageSize, filter, searchQuery, startDate, endDate } = data;
        return route.get(
          `/EmployeeTrainingRequisition/My?pageNumber=${currentPage || 1}&pageSize=${
            pageSize || 1
          }&ApprovalStatus=${filter}&Search=${searchQuery}&StartDate=${startDate}&EndDate=${endDate}`,
          data
        );      
      },
      GetEmployeeTrainingRequisiton: function (data) {
        return route.get(`/EmployeeTrainingRequisition/${data}`, data);
      },
      GetAllEmployeeTraining: function (data){
        const { currentPage, pageSize, filter, searchQuery, startDate, endDate, sort } = data;
        return route.get(
          `/EmployeeTrainingRequisition?pageNumber=${currentPage || 1}&perPage=${
            pageSize || 1
          }&ApprovalStatus=${filter}&Search=${searchQuery}&StartDate=${startDate}&EndDate=${endDate}&SortBy=${sort}`,
          data
        );      
      },
      CancelRequisition: function(data){
        return route.post(`/EmployeeTrainingRequisition/Cancel`, data);
      },
    }
}

const trainingType = () => {
  const root = process.env.REACT_APP_BACKEND_HR_URL;
  const route = api(root);

  return {
    GetAllTrainingTypes: function (data) {
      const { currentPage, pageSize } = data;
      return route.get(
        `/TrainingType?pageNumber=${currentPage || 1}&perPage=${
          pageSize || 100000
        }`,
        data
      );
    },
  };
};
const EmployeeService = () => {
  const employee = process.env.REACT_APP_BACKEND_HR_URL;
  const employee_api = api(employee);
  const eps_env = process.env.REACT_APP_BACKEND_EPS_URL;
  const eps_api = api(eps_env);
  //const service = process.env.REACT_APP_BACKEND_VENDOR_URL;
  // const ind_api = api(service);

  return {
    // start query
    GetQuery: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return employee_api.get(`/Query${params}`, data);
    },

    GetQueryHOD: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return employee_api.get(`/Query/hod${params}`, data);
    },

    GetQueryHOC: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return employee_api.get(`/Query/hoc${params}`, data);
    },
    GetMyQuery: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return employee_api.get(`/Query/my${params}`, data);
    },

    GetSingleContainer: function (data) {
      return employee_api.get(`/Employee/UserId`, data);
    },

    GetDepartment: function (data) {
      const { currentPage, pageSize, DepartmentId } = data;
      return employee_api.get(
        `/Employee/GetEmployeesInDepartmentQuery?DepartmentId=${DepartmentId}&pageSize=${
          pageSize || 10
        }&pageNumber=${currentPage || 1}`,
        data
      );
    },

    GetContainer: function (data) {
      const { currentPage, pageSize, containerId } = data;
      return employee_api.get(
        `/Employee/GetAllEmployeesByContainerId?ContainerId=${containerId}&pageSize=${pageSize || 10}&pageNumber=${
          currentPage || 1
        }`, data
      );
   
    },


    GetAllContainer: function (data) {
      return employee_api.get(
        `/Container/AllContainer${CreateQueryParams(data)}`,
        data
      );
    },


    CreateQuery: function (data) {
      return employee_api.post(`/Query`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    UpdateQuery: function (data) {
      return employee_api.post(`/Query/Update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetSingleQuery: function (data) {
      return employee_api.get(`/Query/${data}`, data);
    },

    //end query

    //Query Response

    CreateQueryResponse: function (data) {
      return employee_api.post(`/QueryReply`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetQueryResponse: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return employee_api.get(`/QueryReply${params}`, data);
    },

    GetMyQueryResponse: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return employee_api.get(`/QueryReply/my${params}`, data);
    },

    GetSingleQueryResponse: function (data) {
      return employee_api.get(`/QueryReply/${data}`, data);
    },

    //Query Reply Comments
    CreateQueryComment: function (data) {
      return employee_api.post(`/QueryReply/comment`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    //Employee update

    
    GetSingleNOKInformation: function (data) {
      return employee_api.get(`/EmployeeRSALinking/GetBeneficiaryById?id=${data}`, data);
    },

    GetLGA: function (data) {
      console.log(data)
      return eps_api.post(`/Util/GetAllLga`, data, {
        
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    
    GetStates: function (data) {
      return eps_api.get(`/Util/GetAllStates`, data );
    },

    CreateEmployeBeneficiary: function (data) {
      return employee_api.post(`/EmployeeUpdate/CreateBeneficiary`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    //employee Update

    ViewSingleEmployee: function (data) {

      return employee_api.get(`/Employee?id=${data}`, data);
    },

    GetSingleEmployee: function (data) {
      return employee_api.get(`/Employee/UserId`);
    },

    CreateEmployeeInfomation: function (data) {
      return employee_api.post(`/Employee`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    UpdateEmployeeInformation: function (data) {
      console.log(data, 'data')
      return employee_api.post(`/Employee/Update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetCountries: function (data) {
      return eps_api.get(`/v2/SelfServices/country`, data);
    },

    GetMyBeneficiaryInfo: function (data) {
      return employee_api.get(
        `/EmployeeRSALinking/MyEmployeeBeneficiary${CreateQueryParams(data)}`,
        data
      );
    },

    GetEmployeeBanks: function (data) {
      return eps_api.get(`Util/GetAllBanks`,
        data
      );
    },

    //Medicall
    GetAllHospitals: function (data) {
      return employee_api.get(
        `/MedicalServiceSetUp/AllHospital${CreateQueryParams(data)}`,
        data
      );
    },

    CreateMedicalRequisition: function (data) {
      console.log(data, 'Medical Slice')
      return employee_api.post(`EmployeeMedicalRequisition`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    GetEmployeeMedicalRequisition: function (data) {
      const { currentPage, pageSize, EmployeeId } = data;
      return employee_api.get(
        `/EmployeeMedicalRequisition/All?EmployeeId=${
          EmployeeId === undefined ? "" : EmployeeId
        }&pageSize=${pageSize || 10}&pageNumber=${currentPage || 1}`,
        data
      );
    },
   

    UpdateMedicalRequisition: function (data) {
      return employee_api.post(`EmployeeMedicalRequisition/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetSingleMedicalRequisition: function (data) {
      return employee_api.get(`/EmployeeMedicalRequisition?id=${data}`, data);
    },
    //Qualification
    GetEmployeeQualification: function (data) {
      const { currentPage, pageSize, employeeId } = data;
      return employee_api.get(
        `EmployeeRSALinking/AllEmployeeQualification?EmployeeId=${
          employeeId === undefined ? "" : employeeId
        }&pageSize=${pageSize || 10}&pageNumber=${currentPage || 1}`,
        data
      );
    },
    CreateEmployeeQualification: function (data) {
      return employee_api.post(`EmployeeUpdate/CreateQualification`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    UpdateEmployeeQualification: function (data) {
      console.log(data)
      return employee_api.post(
        `EmployeeUpdate/UpDateEmployeeQualification`,
  
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    GetSingleEmployeeQualification: function (data) {
      return employee_api.get(`/EmployeeRSALinking/GetEmployeeQualificationById?id=${data}`, data);
    },
    //Referres
    CreateEmployeeReferee: function (data) {
      return employee_api.post(`/EmployeeReferees`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetEmployeeReferee: function (data) {
      console.log(data)
      const { currentPage, pageSize, EmployeeId } = data;
      return employee_api.get(
        `/EmployeeReferees/GetRefereesByEmployeeId?EmployeeId=${
          EmployeeId === undefined ? "" : EmployeeId
        }&pageSize=${pageSize || 10}&pageNumber=${currentPage || 1}`,
        data
      );
    },
    //EmployeeReferees/GetRefereesByEmployeeId?EmployeeId=17

    UpdateEmployeeReferee: function (data) {
      return employee_api.post(`/EmployeeReferees/update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetSingleEmployeeReferee: function (data) {
      return employee_api.get(
        `/EmployeeReferees/GetReferesById?id=${data}`,
        data
      );
    },
    //claim

    CreateEmployeeClaim: function (data) {
      return employee_api.post(`/ExtendedHMOClaims`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetEmployeeClaim: function (data) {
      return employee_api.get(
        `/ExtendedHMOClaims/All${CreateQueryParams(data)}`,
        data
      );
    },

    UpdateEmployeeClaim: function (data) {
      return employee_api.post(`/ExtendedHMOClaims/Update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetSingleEmployeeClaim: function (data) {
      return employee_api.get(`ExtendedHMOClaims?id=${data}`, data);
    },

    //Extended Claim
  };
};

export const EmployeeServices = {
  trainingRequisition: trainingRequisition,
  trainingType: trainingType,
  EmployeeService: EmployeeService,
};
