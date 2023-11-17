import { api } from "../../api";

// Vehicle Maintenance Request

const maintenanceRequest = () => {
  const root = process.env.REACT_APP_BACKEND_FLEET_URL;
  const route = api(root);

  return {
    CreateMaintenanceRequisition: function (data) {
      return route.post(`/Maintenance`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ApproveMaintenanceRequest: function (data) {
      return route.post(`/Maintenance/Approve`, data);
    },
    DeclineMaintenanceRequest: function (data) {
      return route.post(`/Maintenance/Decline`, data);
    },
    CancelMaintenanceRequest: function (data) {
      return route.post(`/Maintenance/Cancel`, data);
    },
    ApproveOrDeclineBatchMaintenanceRequest: function (data) {
      return route.post(`/Maintenance/MaintenanceRangeAprovalOrDecline`, data);
    },
    GetAllVehicleMaintenance: function (data) {
      const {currentPage, pageSize, filter, searchQuery, startDate, endDate} = data;
      return route.get(
        `/Maintenance/?pageNumber=${currentPage || 1}&pageSize=${
          pageSize || 1
        }&MaintenanceStatus=${filter}&Search=${searchQuery}&StartDate=${startDate}&EndDate=${endDate}`,
        data
      );
    },
    GetMyVehicleMaintenanceRequests: function (data) {
      const {currentPage, pageSize, filter, searchQuery, startDate, endDate} = data;
      return route.get(
        `/Maintenance/My/?pageNumber=${currentPage || 1}&pageSize=${
          pageSize || 1
        }&MaintenanceStatus=${filter}&Search=${searchQuery}&StartDate=${startDate}&EndDate=${endDate}`,
        data
      );
    },
    GetVehicleMaintenance: function (data) {
      return route.get(`/Maintenance/${data}`, data);
    },
    UpdateMaintenanceRequisition: function (data) {
      return route.post(`/Maintenance/Update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  };
};

// Vehicle Document Setup
const documentSetup = () => {
  const root = process.env.REACT_APP_BACKEND_FLEET_URL;
  const route = api(root);

  return {
    CreateDocumentType: function (data) {
      return route.post(`/VehicleDocumentType`, data);
    },
    GetAllDocumentType: function (data) {
      const { currentPage, pageSize, searchQuery, startDate, endDate, sort } =
        data;
      return route.get(
        `/VehicleDocumentType?pageNumber=${currentPage || 1}&perPage=${
          pageSize || 1
        }&Search=${searchQuery || ""}&StartDate=${startDate || ""}&EndDate=${
          endDate || ""
        }&SortBy=${sort || ""}`,
        data
      );
    },
    UpdateDocumentType: function (data) {
      return route.post(`/VehicleDocumentType/Update`, data);
    },
    DeleteDocumentType: function (data) {
      console.log(data)
      return route.post(`/VehicleDocumentType/Delete`, data);
    },
  };
};

// Vehicle Document
const vehicleDocument = () => {
  const root = process.env.REACT_APP_BACKEND_FLEET_URL;
  const route = api(root);

  return {
    CreateVehicleDocument: function (data) {
      return route.post(`/VehicleDocument`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    GetVehicleDocuments: function (data) {
      const { currentPage, pageSize, vehicleId } = data;
      return route.get(
        `/VehicleDocument/${vehicleId}?pageNumber=${currentPage || 1}&perPage=${
          pageSize || 10
        }`,
        data
      );
    },
    UpdateVehicleDocument: function (data) {
      return route.post(`/VehicleDocument/Update`, data);
    },
  }
}

// Central Repository Document
const repoDocument = () => {
  const root = process.env.REACT_APP_BACKEND_FLEET_URL;
  const route = api(root)

  return{
    GetRepoDocuments: function (data){
      const { recordId, category } = data;
      return route.get(`/CentralizeDocumentRepository/${recordId}?documentCategory=${category || ""}`, data);      
    },
  }
}

// Fleet Request
const fleet = () => {
  const FuelRequisitionService = process.env.REACT_APP_BACKEND_FLEET_URL;
  const employees = process.env.REACT_APP_BACKEND_HR_URL;
  const ind_api = api(FuelRequisitionService);
  const employee_api = api(employees);
  const root = process.env.REACT_APP_BACKEND_FLEET_URL;
  const route = api(root);

  return {
    CreateFleet: function (data) {
      return route.post(`/Fleet`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    GetAllFleets: function (data) {
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
        `/Fleet/?pageNumber=${currentPage || 1}&pageSize=${
          pageSize || 1
        }&FleetType=${filter || ""}&Search=${searchQuery || ""}&StartDate=${
          startDate || ""
        }&EndDate=${endDate || ""}&SortBy=${sort}`,
        data
      );
    },
    GetFleet: function (data) {
      return route.get(`/Fleet/${data}`, data);
    },
    GetFleetByParam: function (data) {
      return route.get(`/Fleet/param/${data}`, data);
    },
    UpdateFleet: function (data) {
      return route.put(`/Fleet/Update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    AssignFleetDriver: function (data) {
      return route.post(`/Fleet/${data?.fleetId}`, data);
    },

    CreateFuelRequest: function (data) {
      return ind_api.post(`FuelRequisition`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    ApproveFuelRequest: function (data) {
      //console.log(data)
      return ind_api.post(`/FuelRequisition/approve`, data);
    },

    ApproveOrDeclineRequisition: function (data) {
      console.log(data);
      return ind_api.post(`/FuelRequisition/batch`, data);
    },
    DeclineFuelRequest: function (data) {
      return ind_api.post(`/FuelRequisition/decline`, data);
    },

    CancelFuelRequest: function (data) {
      return ind_api.post(`/FuelRequisition/cancel`, data);
    },
    GetFuelRequest: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return ind_api.get(`/FuelRequisition${params}`, data);
    },
    
    GetMyFuelRequest:function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return ind_api.get(`/FuelRequisition/my${params}`, data);
    },
  
    GetFleet: function (data) {
      let params = "?";

      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return ind_api.get(`/Fleet${params}`, data);
    },

    GetBanks: function (data) {
      return employee_api.get(`/Bank?id=${data}`, data);
    },

    GetBranch: function (data) {
      return employee_api.get(`/VendorBranch/${data.vendorId}`, data);
    },

    GetSingleFuelRequest: function (data) {
      return ind_api.get(`/FuelRequisition/${data}?id=${data}`, data);
    },

    UpdateFuelRequest: function (data) {
      return ind_api.post(`/FuelRequisition/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    CreateFuelPayment: function (data) {
      return ind_api.post(`FuelPayment`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    ApproveFuelPayment: function (data) {
      //console.log('running')
      return ind_api.post(`/FuelPayment/approve`, data);
    },

    DeclineFuelPayment: function (data) {
      return ind_api.post(`/FuelPayment/decline`, data);
    },

    CancelFuelPayment: function (data) {
      return ind_api.post(`/FuelPayment/cancel`, data);
    },
    ApproveOrDeclinePayment: function (data) {
      
      return ind_api.post(`/FuelPayment/batch`, data);
    },
    GetFuelPayment: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return ind_api.get(`/FuelPayment${params}`, data);
    },

    GetMyFuelPayment:function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return ind_api.get(`/FuelPayment/my${params}`, data);
    },
    GetAllEmployees: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return employee_api.get(`/employee/getAllEmployees${params}`, data);
    },

    GetCadrePosition: function (data) {
      console.log(data)
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return employee_api.get(`/EmployeeCadrePosition${params}`, data);
    },


    GetSingleFuelPayment: function (data) {
      return ind_api.get(`/FuelPayment/${data}?id=${data}`, data);
    },
    UpdateFuelPayment: function (data) {
      return ind_api.post(`FuelPayment/update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    CreateDriverActivity: function (data) {
      return ind_api.post(`DriverActivity`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetMyDriverActivity: function (data) {
      console.log(data)
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return ind_api.get(`/DriverActivity/my${params}`, data);
    },
    GetAllDriverActivity: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return ind_api.get(`/DriverActivity${params}`, data);
    },

    UpdateDriverActivity: function (data) {
      return ind_api.post(`/DriverActivity/update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    GetSingleDriverActivity: function (data) {
      return ind_api.get(`/DriverActivity/${data}`, data);
    },
  };
};

// Accident Report

const accidentReport = () => {
  const root = process.env.REACT_APP_BACKEND_FLEET_URL;
  const route = api(root);

  return {
    CreateAccidentReport: function (data) {
      return route.post(`/AccidentReport`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    UpdateAccidentReport: function (data) {
      return route.post(`/AccidentReport/Update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ApproveAccidentReport: function (data) {
      return route.post(`/AccidentReport/Approve`, data);
    },
    DeclineAccidentReport: function (data) {
      return route.post(`/AccidentReport/Decline`, data);
    },
    CancelAccidentReport: function (data) {
      console.log(data)
      return route.post(`/AccidentReport/Cancel`, data);
    },
    GetAllAccidentReport: function (data) {
      const {currentPage, pageSize, filter, searchQuery, startDate, endDate} = data;
      return route.get(
        `/AccidentReport/?pageNumber=${currentPage || 1}&pageSize=${
          pageSize || 1
        }&ApprovalStatus=${filter}&Search=${searchQuery}&StartDate=${startDate}&EndDate=${endDate}`,
        data
      );
    },
    GetMyAccidentReports: function (data) {
      const {currentPage, pageSize, filter, searchQuery, startDate, endDate} = data;
      return route.get(
        `/AccidentReport/My/?pageNumber=${currentPage || 1}&pageSize=${
          pageSize || 1
        }&ApprovalStatus=${filter}&Search=${searchQuery}&StartDate=${startDate}&EndDate=${endDate}`,
        data
      );
    },
    GetAccidentReport: function (data) {
      return route.get(`/AccidentReport/${data}`, data);
    },
    ApproveOrDeclineBatchAccidentReportRequest: function (data) {
      return route.post(`/AccidentReport/RangeOfApproveOrDecline`, data);
    },
  };
};

export const FleetServices = {
    maintenanceRequest: maintenanceRequest,
    accidentReport: accidentReport,
    fleet:fleet,
    documentSetup: documentSetup,
    vehicleDocument: vehicleDocument,
    repoDocument: repoDocument
};
