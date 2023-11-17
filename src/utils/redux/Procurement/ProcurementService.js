import { api } from "../../api";

const service = process.env.REACT_APP_BACKEND_PROC_URL;

export const proc_api = api(service);


const procurement = () => {
  return {
    CreateProcRequsition: function (data) {
      return proc_api.post(`/ProcurementRequisition/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    UpdateProcRequsition: function (data) {
      return proc_api.post(`/ProcurementRequisition/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetProcRequisitions: function (data) {
      const { pageSize, currentPage, Id, filter, sort } = data;
      return proc_api.get(
        `/ProcurementRequisition?pageSize=${pageSize || 1}&currentPage=${
          currentPage || 1
        }&id=${Id || 0}&FilterBy=${filter}&RequisitionType=${sort}`,
        data
      );
    },

    GetProcDelivery: function (data) {
      const { pageSize, currentPage, Id, filter, sort } = data;
      return proc_api.get(
        `/Delivery?pageSize=${pageSize || 1}&currentPage=${
          currentPage || 1
        }&id=${Id || 0}&FilterBy=${filter}&SortBy=${sort}`,
        data
      );
    },

    GetSingleProcRequisition: function (data) {
      // const { pageSize, currentPage, TaxIdentificationNumber, id } = data;
      return proc_api.get(`/ProcurementRequisition/${data}?id=${data}`, data);
    },

    ApproveProcRequisition: function (data) {
      return proc_api.post(`/ProcurementRequisition/approve`, data);
    },
    ApproveProcRequisitionBulk: function (data) {
      return proc_api.post(`/ProcurementRequisition/bulk/approve`, data);
    },
    DeclineProcRequisition: function (data) {
      return proc_api.post(`/ProcurementRequisition/decline`, data);
    },
    DeclineProcRequisitionBulk: function (data) {
      return proc_api.post(`/ProcurementRequisition/bulk/decline`, data);
    },
    DeleteProcRequisition: function (data) {
      return proc_api.post(`/ProcurementRequisition/delete`, data);
    },
    NotifyProcRequisition: function (data) {
      return proc_api.post(`/ProcurementRequisition/notify`, data);
    },

    CreateProQuotation: function (data) {
      return proc_api.post(`/Quotation/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    UpdateProQuotation: function (data) {
      return proc_api.post(`/Quotation/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetProcQuotations: function (data) {
      const { pageSize, currentPage, Id, filter, sort, searchText } = data;
      return proc_api.get(
        `/Quotation?pageSize=${pageSize || 1}&currentPage=${
          currentPage || 1
        }&id=${
          Id || ""
        }&FilterBy=${filter}&SortBy=${sort}&SearchText=${searchText}`,
        data
      );
    },

    GetSingleProcQuotation: function (data) {
      // const { pageSize, currentPage, TaxIdentificationNumber, id } = data;
      return proc_api.get(`/Quotation/${data}?id=${data}`, data);
    },

    ApproveProcQuotation: function (data) {
      return proc_api.post(`/Quotation/approve`, data);
    },
    DeclineProcQuotation: function (data) {
      return proc_api.post(`/Quotation/decline`, data);
    },

    DeliveredProcQuotation: function (data) {
      return proc_api.post(`/Quotation/delivered`, data);
    },

    CreateVendor: function (data) {
      return proc_api.post(`/Vendor/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    UpdateVendor: function (data) {
      return proc_api.post(`/Vendor/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ApproveVendor: function (data) {
      return proc_api.post(`/Vendor/approve`, data);
    },
    DeclineVendor: function (data) {
      return proc_api.post(`/Vendor/decline`, data);
    },
    GetBeneficiaries: function (data) {
      return proc_api.get(`/BeneficiaryNames`, data);
    },
    GetDepartments: function (data) {
      return proc_api.get(`/Department`, data);
    },
    GetVendorsSingle: function (data) {
      // const { pageSize, currentPage, TaxIdentificationNumber, id } = data;
      return proc_api.get(`/Vendor/${data}?id=${data}`, data);
    },
    CreateVendorAsset: function (data) {
      return proc_api.post(`/Vendor/create/asset`, data);
    },
    GetAllVendorsAssets: function (data) {
      return proc_api.get(`/Vendor/allAssets`, data);
    },
    AddStock_Vendor: function (data) {
      return proc_api.post(`/Vendor/stock/add`, data);
    },
    GetProcRequisitionDashboard: function () {
      return proc_api.get("/ProcurementRequisition/dashboard");
    },
  };
};

export const ProcurementServices = {
  procurement: procurement,
};
