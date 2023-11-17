/* eslint react-hooks/exhaustive-deps: 0  */
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import PageStyle from "../../Components/Layout/PageLayout";
import RouteLayout from "../../Components/Layout/RouteLayout";
import RptStyle from "./Style/Reports.module.css";
import {CTAButtons} from "../../../global/components/Buttons/buttons";
import Table from '../../Components/Table/Table';
import Pagination from "../../Components/Pagination/Pagination";
import {TableActions} from "../../Components/Misc/Actions";
import ReportProcessModal from "../../Components/Modals/Report/ReportProcessModal";
import DeleteSetupModal from "../../Components/Modals/Report/DeleteSetupModal";
import {useDispatch, useSelector} from "react-redux";
import {DeleteReport, GetReports, TriggerReport} from "../../../../utils/redux/Report/ReportSlice";
import {toast} from "react-toastify";
import {getNumberWithOrdinal, getTimeFromISO} from "../../../../utils/functions/ResourceFunctions";
import DashboardStyle from "../../Styles/Dashboard.module.css";
import {ProDropFilter, SearchFilter} from "../../Components/Search/Search";
import {GetAllDepartments} from "../../../../utils/redux/Vendor/VendorSlice";


export default function ReportConfiguration(){
    const dispatch = useDispatch();
    const { reports } = useSelector((state) => state?.report);
    const [currentReport, setCurrentReport] = useState({});
    const navigate = useNavigate();
    const [showDeleteSetupModal, setShowDeleteSetupModal] = useState(false);
    const [startProcessModal, setStartProcessModal] = useState(false);
    const [stopProcessModal, setStopProcessModal] = useState(false);
    const [runProcessModal, setRunProcessModal] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [allDepartments, setAllDepartments] = useState([]);
    const [departmentFilter, setDepartmentFilter] = useState(null);
    const [reportID, setReportID] = useState(null);
    const [reportName, setReportName] = useState(null);
    const [reportStoredFunction, setReportStoredFunction] = useState(null);

  const { all_departments } = useSelector(
    (state) => state?.vendor
  );

    const startCurrentProcess = ()=>{
      dispatch(TriggerReport({reportId: currentReport.reportId, action: 1})).then(res => {
        if(res.type === "reports/TriggerReport/fulfilled") {
          dispatch(GetReports());
          toast.success(res?.payload?.statusMessage);
        }
        setStartProcessModal(false);
      });
    }
    const stopCurrentProcess = ()=>{
      dispatch(TriggerReport({reportId: currentReport.reportId, action: 2})).then(res => {
        if(res.type === "reports/TriggerReport/fulfilled") {
          dispatch(GetReports());
          toast.success(res?.payload?.statusMessage);
        }
        setStopProcessModal(false);
      });
    }

    const runCurrentProcess = ()=>{
        dispatch(TriggerReport({ reportId: currentReport.reportId, action: 3 })).then(res => {
          if(res.type === "reports/TriggerReport/fulfilled") {
            dispatch(GetReports());
            toast.success(res?.payload?.statusMessage);
          }
          setRunProcessModal(false);
        });
    }

    const deleteCurrentProcess = ()=>{
        dispatch(DeleteReport({ id: currentReport.reportId })).then(res => {
              dispatch(GetReports());
              toast.success(res?.payload?.statusMessage);
            }
        );
      setShowDeleteSetupModal(false)
    }

    useEffect(()=>{
      dispatch(GetAllDepartments());
    }, [])

  useEffect(()=>{
    if(all_departments?.responseObject?.pageItems?.length > 0){
      const allDepartments = all_departments.responseObject.pageItems.map((department)=>({
        name: department.name,
        filter: department.id
      }))
      setAllDepartments(allDepartments)
    }
  }, [all_departments])


    useEffect(()=>{
        dispatch(GetReports({
          PageSize: pageSize,
          CurrentPage: currentPage,
          departmentID: departmentFilter,
          ReportId: reportID,
          ReportName: reportName,
          StoredFunction: reportStoredFunction,
        }));
    }, [currentPage, pageSize, departmentFilter, reportID, reportName, reportStoredFunction])

  const getReportActions = (config)=>{
    const reportActions = [
      {
        name: "Edit",
        action: () => {navigate(`edit/${config.reportId}`)},
      },
    ]
    if(config.status === "Running") {
      reportActions.push({
        name: "Stop Process",
        action: () => {
          setCurrentReport(config)
          setStopProcessModal(true);
        }});
    }else{
      reportActions.push({
        name: "Start Process",
        action: () => {
          setCurrentReport(config)
          setStartProcessModal(true);
        },
      });
    }
    reportActions.push(
      {
        name: "Run Now",
        action: () => {
          setCurrentReport(config)
          setRunProcessModal(true);
        },
      }
    )
    reportActions.push(
      {
        name: "Delete Process",
        action: () => {
          setCurrentReport(config)
          setShowDeleteSetupModal(true);
        },
      }
    )
    return reportActions;
  }

  const getRunDaysString = (config) => {
      const dayList = []; let dayString = "";
      if (config.monday){
        dayList.push('Monday');
      }
      if (config.tuesday){
        dayList.push('Tuesday');
      }
      if (config.wednesday){
        dayList.push('Wednesday');
      }
      if (config.thursday){
        dayList.push('Thursday');
      }
      if (config.friday){
        dayList.push('Friday');
      }
      if (config.saturday){
        dayList.push('Saturday');
      }
      if (config.sunday){
        dayList.push('Sunday');
      }
      dayList.forEach(day=> dayString+=`${day} `)
      return dayString
  }

    return (
        <RouteLayout title="Reports / Reports Configuration">
            <DeleteSetupModal
              isOpen={showDeleteSetupModal}
              handleClose={()=>setShowDeleteSetupModal(false)}
              handleDelete={deleteCurrentProcess}
            />
            <ReportProcessModal
                headText={"Do you want to start the process?"}
                isOpen={startProcessModal}
                handleClose={()=>setStartProcessModal(false)}
                successBtnText={"Yes, Start"}
                handleSuccess={startCurrentProcess}
            />
            <ReportProcessModal
                headText={"Do you want to stop the process?"}
                isOpen={stopProcessModal}
                handleClose={()=>setStopProcessModal(false)}
                successBtnText={"Yes, Stop"}
                handleSuccess={stopCurrentProcess}
            />
            <ReportProcessModal
                headText={"Do you want to run now?"}
                isOpen={runProcessModal}
                handleClose={()=>setRunProcessModal(false)}
                successBtnText={"Yes, Run"}
                handleSuccess={runCurrentProcess}
            />
            <div className={RptStyle.head}>
                <div className={RptStyle.head_text}>
                    Reports
                </div>
                <div className={RptStyle.head_btns}>
                    <CTAButtons onClick={() => navigate('add')}>
                        Configuration
                    </CTAButtons>
                </div>
            </div>
            <PageStyle>
              <div className={DashboardStyle.dashboard_filter}>
                <ProDropFilter
                  filter={departmentFilter}
                  setFilter={setDepartmentFilter}
                  name={"Filter by Department"}
                  filterBy={allDepartments}
                />
                <SearchFilter label={"Search Stored Function"} text={(reportStoredFunction) => setReportStoredFunction(reportStoredFunction)} />
                <SearchFilter label={"Search Report Name"} text={(reportName) => setReportName(reportName)} />
                <SearchFilter label={"Search Report ID"} text={(reportID) => setReportID(reportID)} />

              </div>
                <div>
                    <Table>
                      <thead>
                        <tr>
                            <th>#</th>
                            <th>Report Name</th>
                            <th>Recipients</th>
                            <th>Schedule</th>
                            <th>Department</th>
                            {/*<th>Execution Time</th>*/}
                            <th>Report Action</th>
                            <th></th>
                        </tr>
                      </thead>
                        <tbody>
                        {reports && reports.result && reports.result.map((config, index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{config.reportName}</td>
                                <td>{config.recipients}</td>
                                <td>
                                  {
                                    config.informationSchedule === 'Daily' ? `${getTimeFromISO(config.runTime)} daily` :
                                      config.informationSchedule === 'Weekly' ? `${getTimeFromISO(config.runTime)} every ${getRunDaysString(config)}` :
                                        config.informationSchedule === 'Monthly' ? `${getTimeFromISO(config.runTime)} every ${getNumberWithOrdinal(config.daysOfTheMonth)} day of the month` : ''
                                  }

                                </td>
                              <td>{config.department}</td>
                                {/*<td>{config.status}</td>*/}
                                <td>
                                    <span
                                        style={{
                                        textAlign: "center",
                                        padding: "3px 8px",
                                        borderRadius: "1rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        backgroundColor:
                                            config.status === "Running"
                                                ? "#CBFFAE"
                                                    : config.status === "Stopped"
                                                        ? "#FCEBEC"
                                                        : "",
                                        color:
                                            config.status === "Running"
                                                ? "#067306"
                                                    : config.status === "Stopped"
                                                        ? "#9E0038"
                                                        : "",
                                    }}
                                        >
                                        {" "}
                                        {config.status}
                                    </span>
                                </td>
                                <td>
                                    <TableActions url={``}>
                                      {getReportActions(config)}
                                    </TableActions>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                    <Pagination
                      last_page={reports?.totalPages}
                      present_page={reports?.currentPage}
                      totalRows={reports?.totalRows}
                      pageSize={pageSize}
                      setPageSize={(page) => setPageSize(page)}
                      click={(page) => setCurrentPage(page)}
                    />
                </div>
            </PageStyle>
        </RouteLayout>
    )
}