import React, {useEffect, useState} from 'react';
import RouteLayout from "../../Components/Layout/RouteLayout";
import PageStyle from "../../Components/Layout/PageLayout";
import RptStyle from "./Style/Reports.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AddReport, GetReportByID, UpdateReport} from "../../../../utils/redux/Report/ReportSlice";
import {useNavigate} from "react-router";
import ReportSchedulingForm from "./components/reportSchedulingForm";
import ReportConfigurationForm from "./components/reportConfigurationForm";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../../Components/Loader/LoadingSpinner";

export default function ReportAdd({ isEdit }) {
  const { id } = useParams();
  const [formStep, setFormStep] = useState(0)
  const [configurationInformation, setConfigurationInformation] = useState({})
  const [scheduleDetails, setScheduleDetails] = useState({})
  // const [report, setReport] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state?.report);


  useEffect(()=>{
    if(isEdit){
      dispatch(GetReportByID(id)).then((res)=>{
        if(res.type === "reports/GetReportByID/fulfilled" && res.payload !== undefined){
          let report = res.payload?.responseObject;
          if(!report) return;
          let reportFormat = report.reportFormat.map(a=>(
            a.trim().toLowerCase() === "excel" ? 0 : 1
          ))
        let configInfo = {
          reportName: report.reportName,
          storedFunction: report.storedFunction,
          recipients: report.recipients.toString(),
          parameters: report.parameters.toString(),
          values: report.values.toString(),
          reportFormat: reportFormat.toString(),
          department: report.department,
          departmentID: report.departmentID,
          description: report.description,
        }
        setConfigurationInformation(configInfo)
        setScheduleDetails({
          schedular: report.schedular,
          runTime: new Date(report.runTime),
          dayOfTheMonth: report.dayOfTheMonth ?? "1",
          monday: report.monday ?? 0,
          tuesday: report.tuesday ?? 0,
          wednesday: report.wednesday ?? 0,
          thursday: report.thursday ?? 0,
          friday: report.friday ?? 0,
          saturday: report.saturday ?? 0,
          sunday: report.sunday ?? 0,
        })
        }
      })
    }
  }, [])
  const onConfigurationAdded = (configInfo) => {
    setConfigurationInformation(configInfo)
    setFormStep(1);
  }

  const submitReport = (scheduleInformation) => {
    let timeInGmt;
    if(scheduleInformation.runTime._d) {
      timeInGmt = new Date(scheduleInformation.runTime._d.setHours(scheduleInformation.runTime._d.getHours() + 1));
    } else {
      timeInGmt = new Date(scheduleInformation.runTime.setHours(scheduleInformation.runTime.getHours() + 1));
    }

    const valueFormatted = {...configurationInformation, ...scheduleInformation}
    valueFormatted.parameters = valueFormatted.parameters.split(',').map(a=>a.trim())
    valueFormatted.recipients = valueFormatted.recipients.split(',').map(a=>a.trim())
    valueFormatted.values = valueFormatted.values.split(',').map(a=>a.trim())
    valueFormatted.reportFormat =  valueFormatted.reportFormat.split(',').map(a=>parseInt(a.trim(), 10))
    valueFormatted.dayOfTheMonth =  valueFormatted.dayOfTheMonth ? parseInt(valueFormatted.dayOfTheMonth, 10): undefined;
    valueFormatted.runTime =  timeInGmt.toISOString();

    if(!isEdit){
      dispatch(AddReport(valueFormatted)).then(res=>{
        if(res.type === "reports/AddReport/fulfilled"){
          navigate('../');
        }
        return res
      })
    } else {
      dispatch(UpdateReport({id, ...valueFormatted})).then(res=>{
        if(res.type === "reports/UpdateReport/fulfilled"){
          navigate('../');
        }
        return res
      })
    }
  }

  return (
    <RouteLayout>
      <PageStyle>
        <div className={`${RptStyle.head} ${RptStyle.head_underline}`}>
          <div>
            <div className={RptStyle.head_text}>
              Report Configuration Details
            </div>
            <div className={RptStyle.head_text_sub}>
              Setup reporting framework here.
            </div>
          </div>
        </div>
        <div className={RptStyle.loading_container}>
          {
            isLoading &&
            <div className={RptStyle.loading_overlay}>
              <div className={RptStyle.loader}>
                <LoadingSpinner size='lg' />
              </div>
            </div>
          }
          {
            formStep === 0 ?
              <ReportConfigurationForm onFinish={onConfigurationAdded} configurationDetails={configurationInformation} />
              :
              <ReportSchedulingForm initialValues={scheduleDetails} onBack={()=>setFormStep(0)} onFinish={submitReport} />
          }
        </div>
      </PageStyle>
    </RouteLayout>
  )
}