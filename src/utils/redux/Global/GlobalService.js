import { api } from "../../api";

const global = () => {
  const service = process.env.REACT_APP_BACKEND_VENDOR_URL;
  const assets = process.env.REACT_APP_BACKEND_ASSETS_URL;
  const employees = process.env.REACT_APP_BACKEND_HR_URL;

  

  const ind_api = api(service);
  const assets_api = api(assets);
  const employee_api = api(employees)


  return {
    States: function (data) {
      return ind_api.get(`/state`, data);
    },
    ServiceType: function (data) {
      return ind_api.get(`/serviceproviding`, data);
    },

    CompanyType: function (data) {
      return ind_api.get(`/businessNature`, data);
    },

    InsuranceCompanies: function (data) {
      return assets_api.get(`/Insurance`, data);
    },

    VendorType: function (data) {
      return ind_api.get(`/vendortype`, data);
    },

    AssetType: function (data) {
      return assets_api.get(`/AssetSubClass`, data);
    },

    AssetClass: function (data) {
      return assets_api.get(`/AssetClass`, data);
    },

    Assets: function (data) {
      return assets_api.get(`/asset`, data);
    },

    Employees: function(data){
      console.log(data)
      const {currentPage, pageSize, filter, searchQuery, startDate, endDate} = data;
      return employee_api.get(
        `/Employee/GetAllEmployees?PageNumber=${currentPage || 1}&PageSize=${
          pageSize || 1
        }&ApprovalStatus=${filter || ""}&Search=${searchQuery || ""}&StartDate=${startDate || ""}&EndDate=${endDate || ""}`,
        data
      );
      // return employee_api.get(`/GetAllEmployees`, data)
    },

   
  };
};

export const GlobalServices = {
  global: global,
};
