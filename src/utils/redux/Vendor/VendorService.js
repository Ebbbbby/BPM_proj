import { api } from "../../api";
import { CreateQueryParams } from "../../functions/ResourceFunctions";

const vendor = () => {
  const service = process.env.REACT_APP_BACKEND_VENDOR_URL;
  const HR_env = process.env.REACT_APP_BACKEND_HR_URL;
  const EPS_env = process.env.REACT_APP_BACKEND_EPS_URL;
  const ind_api = api(service);
  const hr_api = api(HR_env);
  const eps_api = api(EPS_env);
  //const ind_ser_api = api(ind_service);

  return {
    GetPerformance: function (data) {
      return ind_api.get(`/Performance/questions`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    PostPerformance: function (data) {
      return ind_api.post(`/Performance/create`, data);
    },

    ViewPerformance: function (data) {
      return ind_api.get(`/Performance/appraisal?id=${data}`, data);
    },

    GetVendorDepartmentSetUp: function (data) {
      return hr_api.get(
        `/Department/AllDepartment?PageSize=10000000&PageNumber=1`,
        data
      );
    },

    GetAlLEmployees: function (data) {
      const { pageSize, pageNumber } = data;
      return hr_api.get(
        `/Employee/GetAllEmployees?PageSize=${pageSize}&PageNumber=${pageNumber}`,
        data
      );
    },

    GetAllBranches: function (data) {
      return eps_api.get(`/CaseManagementBPM/teamcategory`, data);
    },

    AddVendorDepartmentSetUp: function (data) {
      return ind_api.post(`/Vendor/setUpAccount`, data);
    },

    CreateVendor: function (data) {
      return ind_api.post(`/Vendor/admin_onboard`, data);
    },

    CompleteCreateVendor: function (data) {
      return ind_api.post(`/Vendor/completeUpdate`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    OnboardVendor: function (data) {
      return ind_api.post(`/Vendor/self_onboard`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    UpdateVendor: function (data) {
      return ind_api.post(`/Vendor/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ApproveVendor: function (data) {
      return ind_api.post(`/Vendor/approve`, data);
    },
    SuspendVendor: function (data) {
      return ind_api.post(`/Vendor/suspend`, data);
    },
    BlackListVendor: function (data) {
      return ind_api.post(`/Vendor/blacklist`, data);
    },
    DeclineVendor: function (data) {
      return ind_api.post(`/Vendor/decline`, data);
    },

    GetFuelVendors: function (data) {
      console.log(data)
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return ind_api.get(`/Vendor${params}`, data);
    },
    GetVendors: function (data) {
      const {
        pageSize,
        currentPage,
        TaxIdentificationNumber,
        filter,
        sort,
        searchText,
        startDate,
        endDate,
        VendorTypeId,
        SubClass,
      } = data;
      return ind_api.get(
        `/Vendor?pageSize=${pageSize || 1}&currentPage=${
          currentPage || 1
        }&TaxIdentificationNumber=${
          TaxIdentificationNumber || ""
        }&FilterBy=${filter}&SortBy=${sort}&StartDate=${
          startDate || ""
        }&EndDate=${endDate || ""}&SearchText=${
          searchText || ""
        }&VendorTypeId=${VendorTypeId || 0}&SubClass=${SubClass || 0}`,
        data
      );
    },
    GetVendorsSingle: function (data) {
      // const { id, emailAddress } = data;
      return ind_api.get(
        `/Vendor/Detail${CreateQueryParams(data)}`,
        data
      );
    },
    CreateVendorAsset: function (data) {
      return ind_api.post(`/Vendor/create/asset`, data);
    },
    GetAllVendorsAssets: function (data) {
      return ind_api.get(`/Vendor/allAssets`, data);
    },
    AddStock_Vendor: function (data) {
      return ind_api.post(`/Vendor/stock/add`, data);
    },
  };
};

export const VendorServices = {
  vendor: vendor,
};
