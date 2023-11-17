import { api } from "../../api";

const service = process.env.REACT_APP_BACKEND_VENDOR_URL;

export const report_api = api(service);


const reports = () => {
    return {
        getReports: function (payload) {
          Object.keys(payload).forEach(key=>{
            if(payload[key]===null || payload[key]==="") delete payload[key]
          });
          const query = new URLSearchParams(payload).toString();
            return report_api.get(`/report?${query}`);
        },
        addReport: function (data) {
            return report_api.post(`/report/add`, data);
        },
        getReportByID: function (id) {
            return report_api.get(`/report/${id}`);
        },
        updateReport: function (data) {
            return report_api.post(`/report/update`, data);
        },
        triggerReport: function (data) {
            return report_api.get(`/report/trigger?Id=${data.reportId}&Action=${data.action}`);
        },
        getTriggerHistory: function (data) {
          const historyParams = new URLSearchParams(data).toString();
          return report_api.get(`/report/triggerhistory?${historyParams}`);
        },
        deleteReport: function (data) {
          return report_api.post(`/report/delete`, data);
        },
    }
}
export const ReportServices = {
    report: reports,
};