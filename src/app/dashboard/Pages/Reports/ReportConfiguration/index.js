import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import PageStyle from "../../../Components/Layout/PageLayout";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import RptStyle from "../Style/Reports.module.css";
import {CTAButtons, CTAButtonsAlt} from "../../../../global/components/Buttons/buttons";
import {URL} from "../../../../../utils/routes";
import Table from '../../../Components/Table/Table';
import Pagination from "../../../Components/Pagination/Pagination";
import {TableActions} from "../../../Components/Misc/Actions";
import ReportProcessModal from "../../../Components/Modals/Report/ReportProcessModal";
import DeleteSetupModal from "../../../Components/Modals/Report/DeleteSetupModal";

const reportConfig = [
    {
        id: 1,
        nameOfReport: "Vendor Onboarding Report",
        storeFunction: "Registered Vendor",
        parameter: ['Creation date', 'Status', 'Vendor name'],
        schedule: 'weekly',
        reportFormat: ['PDF', 'Excel'],
        status: 'Running'
    },
    {
        id: 2,
        nameOfReport: "Vendor Appraisal Report",
        storeFunction: "Asset Management",
        parameter: ['Date', 'Status',],
        schedule: 'Monthly',
        reportFormat: ['Excel'],
        status: 'Running'
    },
    {
        id: 3,
        nameOfReport: "Vendor Onboarding Report",
        storeFunction: "Fleet Management",
        parameter: ['Date', 'Status'],
        schedule: 'Weekly',
        reportFormat: ['PDF', 'Excel'],
        status: 'Stopped'
    },
    {
        id: 4,
        nameOfReport: "Vendor Appraisal Report",
        storeFunction: "Asset Procurement",
        parameter: ['Date', 'Status'],
        schedule: 'Monthly',
        reportFormat: ['Excel'],
        status: 'Running'
    },
]

export default function ReportConfiguration(){
    const [reportConfiguration, setReportConfiguration] = useState([]);
    const [currentReport, setCurrentReport] = useState({});
    const navigate = useNavigate();
    const [showDeleteSetupModal, setShowDeleteSetupModal] = useState(false);
    const [startProcessModal, setStartProcessModal] = useState(false);
    const [stopProcessModal, setStopProcessModal] = useState(false);
    const [runProcessModal, setRunProcessModal] = useState(false);

    const startCurrentProcess = ()=>{}
    const stopCurrentProcess = ()=>{}
    const runCurrentProcess = ()=>{}


    useEffect((config)=>{
        setReportConfiguration(reportConfig)
    }, [])

    return (
        <RouteLayout title="Reports / Reports Configuration">
            <DeleteSetupModal isOpen={showDeleteSetupModal} handleClose={()=>setShowDeleteSetupModal(false)}/>
            <ReportProcessModal
                headText={"Do you want to start the process?"}
                isOpen={startProcessModal}
                handleClose={()=>setStartProcessModal(false)}
                successBtnText={"Yes, Start"}
                onSuccess={startCurrentProcess}
            />
            <ReportProcessModal
                headText={"Do you want to stop the process?"}
                isOpen={stopProcessModal}
                handleClose={()=>setStopProcessModal(false)}
                successBtnText={"Yes, Stop"}
                onSuccess={stopCurrentProcess}
            />
            <ReportProcessModal
                headText={"Do you want to run now?"}
                isOpen={runProcessModal}
                handleClose={()=>setRunProcessModal(false)}
                successBtnText={"Yes, Run"}
                onSuccess={runCurrentProcess}
            />
            <div className={RptStyle.head}>
                <div className={RptStyle.head_text}>
                    Report Configuration
                </div>
                <div className={RptStyle.head_btns}>
                    <CTAButtonsAlt onClick={()=>{}}>
                        Staff
                    </CTAButtonsAlt>
                    <CTAButtons onClick={() => navigate(URL.Report_configuration_add)}>
                        Configuration
                    </CTAButtons>
                </div>
            </div>
            <PageStyle>
                <div>
                    <Table>
                        <thead>
                            <th>#</th>
                            <th>Name of Report</th>
                            <th>Store Function</th>
                            <th>Parameter</th>
                            <th>Information Schedule</th>
                            <th>Report Format</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                        {reportConfiguration && reportConfiguration.map((config, index)=>(
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{config.nameOfReport}</td>
                                <td>{config.storeFunction}</td>
                                <td>{config.parameter?.join(', ')}</td>
                                <td>{config.schedule}</td>
                                <td>{config.reportFormat.join(', ')}</td>
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
                                        {[
                                            {
                                                name: "Edit",
                                                action: () => {navigate(URL.Report_configuration_add)},
                                            },
                                            {
                                                name: "Stop Process",
                                                action: () => {
                                                    setCurrentReport(config);
                                                    setStopProcessModal(true)
                                                },
                                            },
                                            {
                                                name: "Start Process",
                                                action: () => {
                                                    setCurrentReport(config);
                                                    setStartProcessModal(true)
                                                },
                                            },
                                            {
                                                name: "Run Now",
                                                action: () => {
                                                    setCurrentReport(config);
                                                    setRunProcessModal(true)
                                                },
                                            },
                                            {
                                                name: "Delete",
                                                action: () => {
                                                    setCurrentReport(config);
                                                    setShowDeleteSetupModal(true)
                                                },
                                            },
                                        ]}
                                    </TableActions>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                    <Pagination />
                </div>
            </PageStyle>
        </RouteLayout>
    )
}