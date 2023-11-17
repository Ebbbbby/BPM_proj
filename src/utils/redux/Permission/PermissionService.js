import { api } from "../../api";

const permission = () => {
    const identityService = process.env.REACT_APP_BACKEND_IDENTITY_URL;
    const ind_api = api(identityService);


    return {
        GetAllAppPermissions: function () {
            return  ind_api.get(`/Permission`);
        },
        GetAllUsersPermissions: function (data) {
            const { filter, sort, pageSize, currentPage } = data;
            return ind_api.get(`/UserPermission?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}`);
        },
        GetCurrentUserPermissions: function () {
            return  ind_api.get(`/UserPermission/details`);
        },
        GetUserPermissionById: function (userId) {
            return ind_api.get(`/UserPermission/${userId}`);
        },
        UpdateStaffPermissions: function (data) {
            return ind_api.post(`/UserPermission/add`, data);
        },
        GetGroupPermissions: function (payload){
            if(payload){
                Object.keys(payload).forEach(key=>{
                    if(payload[key]==="") delete payload[key]
                });
            }
            const query = new URLSearchParams(payload).toString();
            return  ind_api.get(`/Group?${query}`);
        },
        GetGroupPermission: function (permId){
            return  ind_api.get(`/Group/${permId}`);
        },
        CreateGroupPermission: function (data){
            return  ind_api.post(`/Group/add`, data);
        },
        UpdateGroupPermission: function (data){
            return  ind_api.post(`/Group/update`, data);
        },
        DeleteGroupPermission: function (data){
            return  ind_api.post(`/Group/delete`, data);
        },
        AddPermissionToGroup: function (data){
            return  ind_api.post(`/Group/addPermissionToGroup`, data);
        },
        RemovePermissionFromGroup: function (data){
            return  ind_api.post(`/Group/removePermissionFromGroup`, data);
        },
    };
};

export const PermissionService = {
    permission,
};
