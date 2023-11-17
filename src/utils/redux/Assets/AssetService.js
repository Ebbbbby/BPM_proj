import { api } from "../../api";

const service = process.env.REACT_APP_BACKEND_ASSETS_URL;
export const ind_api = api(service);

const asset = () => {
  // const ind_ser_api = api(ind_service);

  return {
    CreateAsset_Acquisition: function (data) {
      return ind_api.post(`/AssetAcquisition/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    GetAsset_SingleAcquisition: function (data) {
      return ind_api.get(`/AssetAcquisition/${data}?id=${data}`, data);
    },

    GetAsset_Acquisition: function (data) {
      const { filter, sort, pageSize, currentPage, searchText } = data;
      return ind_api.get(
        `/AssetAcquisition?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&searchText=${searchText}`,
        data
      );
    },

    UpdateAsset_Acquisition: function (data) {
      return ind_api.post(`/AssetAcquisition/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ApproveAsset_Acqusition: function (data) {
      return ind_api.post(`/AssetAcquisition/approve`, data);
    },
    DeclineAsset_Acqusition: function (data) {
      return ind_api.post(`/AssetAcquisition/decline`, data);
    },

    AssetAllocation_fleet:function(data){
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, '');
      return ind_api.get(
        `/AssetAllocation${params}`,
        data
      );
    },
    GetAssetAcquisitionDashboard: function () {
      return ind_api.get("/AssetAcquisition/dashboard");
    },
  };
};

export const AssetServices = {
  asset: asset,
};
