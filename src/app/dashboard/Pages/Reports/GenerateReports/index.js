import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import RptStyle from "../Style/Reports.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import {URL} from "../../../../../utils/routes";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import {CalendarFilter, ProDropFilter, SearchFilter} from "../../../Components/Search/Search";
import {ActionButtons} from "../../../../global/components/Buttons/buttons";
import { FiFileText } from "react-icons/fi";
import EmptyReportIllustration from "../../../Images/empty_rafiki.png";
import Table from '../../../Components/Table/Table';
import Pagination from '../../../Components/Pagination/Pagination'
import {TableActions} from "../../../Components/Misc/Actions";
import {useDispatch, useSelector} from "react-redux";
import {GetReports} from "../../../../../utils/redux/Report/ReportSlice";


const filterBy = [
    {
        name: "All",
        filter: "",
    },
    {
        name: "Pending",
        filter: 0,
    },
    {
        name: "Approved",
        filter: 1,
    },
    {
        name: "Declined",
        filter: 2,
    },
];

const sortOptions = [
    {
        name: "Highest Rated",
        filter: 0,
    },
    {
        name: "Lowest Rated",
        filter: 1,
    },
];

const reportStatusOptions = [
    {
        name: "Initiated",
        filter: 'initiated',
    },
    {
        name: "Approved",
        filter: 'approved',
    },
    {
        name: "Delivered",
        filter: 'delivered',
    },
];

const reportTypeOptions = [
    {
        name: "Submitted Quotations",
        filter: 0,
    },
    {
        name: "Procurement Requisition",
        filter: 1,
    },
    {
        name: "Service Delivery SLA",
        filter: 2,
    },
];

const generatedReport = [
    {
        id: 1,
        companyName: "A & B Auto Mobile",
        contactPerson: "Femi Olushola",
        phoneNumber: "09023823823",
        onboardingType: "Self service",
        dateGenerated: "23 May 2023",
        status: "Completed"
    },
    {
        id: 2,
        companyName: "A & B Auto Mobile",
        contactPerson: "Femi Olushola",
        phoneNumber: "09023823823",
        onboardingType: "Self service",
        dateGenerated: "23 May 2023",
        status: "Completed"
    },
    {
        id: 3,
        companyName: "A & B Auto Mobile",
        contactPerson: "Femi Olushola",
        phoneNumber: "09023823823",
        onboardingType: "Self service",
        dateGenerated: "23 May 2023",
        status: "Completed"
    },
    {
        id: 4,
        companyName: "A & B Auto Mobile",
        contactPerson: "Femi Olushola",
        phoneNumber: "09023823823",
        onboardingType: "Self service",
        dateGenerated: "23 May 2023",
        status: "Completed"
    },
    {
        id: 5,
        companyName: "A & B Auto Mobile",
        contactPerson: "Femi Olushola",
        phoneNumber: "09023823823",
        onboardingType: "Self service",
        dateGenerated: "23 May 2023",
        status: "Pending"
    },
    {
        id: 6,
        companyName: "A & B Auto Mobile",
        contactPerson: "Femi Olushola",
        phoneNumber: "09023823823",
        onboardingType: "Self service",
        dateGenerated: "23 May 2023",
        status: "Pending"
    },
    {
        id: 7,
        companyName: "A & B Auto Mobile",
        contactPerson: "Femi Olushola",
        phoneNumber: "09023823823",
        onboardingType: "Self service",
        dateGenerated: "23 May 2023",
        status: "Failed"
    },
    {
        id: 8,
        companyName: "A & B Auto Mobile",
        contactPerson: "Femi Olushola",
        phoneNumber: "09023823823",
        onboardingType: "Self service",
        dateGenerated: "23 May 2023",
        status: "Failed"
    },
]

export default function GenerateReports() {
    const dispatch = useDispatch();
    const [sort, setSort] = useState(0);
    const [reportType, setReportType] = useState(0);
    const [reportStatus, setReportStatus] = useState('');
    // const [currentReport, setCurrentReport] = useState({});
    const [reportItems, setReportItems] = useState([])
    // const navigate = useNavigate();

    useEffect(()=>{
        dispatch(GetReports());
        setReportItems(generatedReport);
    }, [])

    // useEffect(()=>{
    //     if(reports && reports.data  && reports.data.length) {
    //         setReportItems(reports.data.map(report => ({...report, isChecked: false})))
    //     }
    // }, [reports])

    const selectAllReport = (e)=>{
        const reports = reportItems.map(report=>({...report, isChecked: e.target.checked}));
        setReportItems(reports)
    }

    const selectReport = (e, report)=>{
        const otherReports = [...reportItems]
        const reportID = reportItems.findIndex(a=>a.id === report.id);
        otherReports[reportID] = {...otherReports[reportID], isChecked: e.target.checked}
        setReportItems(otherReports)

    }

    return (
        <RouteLayout title="Reports / Generate Reports">
            <div className={RptStyle.head}>
                <div className={RptStyle.head_text}>Generate Reports</div>
            </div>
            <PageStyle>
                <div className={RptStyle.report_filters}>
                    <ProDropFilter
                        filter={reportType}
                        setFilter={setReportType}
                        name={"Report Type"}
                        filterBy={reportTypeOptions}
                    />
                    <ProDropFilter
                        filter={reportStatus}
                        setFilter={setReportStatus}
                        name={"Report Status"}
                        filterBy={reportStatusOptions}
                    />
                    {/* TODO: add date range here */}
                    {/*<CalendarFilter*/}
                    {/*    name="Date Range"*/}
                    {/*/>*/}
                    <ProDropFilter
                        filter={sort}
                        setFilter={setSort}
                        name={"Sort"}
                        filterBy={sortOptions}
                    />
                    <ActionButtons className={RptStyle.report_filters_button}>
                        <FiFileText />
                        Generate Report
                    </ActionButtons>
                </div>
            </PageStyle>
            <PageStyle>
                {reportItems && reportItems.length ?
                    <div className={RptStyle.report_table}>
                        <Table>
                            <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => selectAllReport(e)}
                                        className={RptStyle.report_table_checkbox}
                                    />
                                </th>
                                <th>Company Name</th>
                                <th>Contact Person</th>
                                <th>Phone Number</th>
                                <th>Onboarding Type</th>
                                <th>Date Generated</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportItems && reportItems.map((report, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => selectReport(e, report)}
                                            className={RptStyle.report_table_checkbox}
                                            checked={report.isChecked}
                                        />
                                    </td>
                                    <td>{report.companyName}</td>
                                    <td>{report.contactPerson}</td>
                                    <td>{report.phoneNumber}</td>
                                    <td>{report.onboardingType}</td>
                                    <td>{report.dateGenerated}</td>
                                    <td>
                                    <span
                                        style={{
                                            textAlign: "center",
                                            padding: "3px 8px",
                                            borderRadius: "1rem",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            backgroundColor:
                                                report.status === "Completed"
                                                    ? "#CBFFAE"
                                                    : report.status === "Pending"
                                                        ? "#FFE6B0"
                                                        : report.status === "Failed"
                                                            ? "#FCEBEC"
                                                            : "",
                                            color:
                                                report.status === "Completed"
                                                    ? "#067306"
                                                    : report.status === "Pending"
                                                        ? "#946300"
                                                        : report.status === "Failed"
                                                            ? "#9E0038"
                                                            : "",
                                        }}
                                    >
                                    {" "}
                                        {report.status}
                                </span>
                                    </td>
                                    <td>
                                        <TableActions url={`${report.id}/${URL}`}>
                                            {[
                                                {
                                                    name: "Download",
                                                    action: () => {
                                                        // setIsOpen(!isOpen);
                                                        // navigate(`?modal_type=class&category=${id}`);
                                                    },
                                                },
                                                {
                                                    name: "Enable",
                                                    action: () => {
                                                        // setIsOpen(!isOpen);
                                                        // navigate(`?modal_type=sub_class&category=${id}`);
                                                    },
                                                },
                                            ]}
                                        </TableActions>
                                    </td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </Table>
                        <Pagination>

                        </Pagination>
                    </div>
                    :
                    <div className={RptStyle.no_report_container}>
                        <div className={RptStyle.no_report}>
                            <img src={EmptyReportIllustration} alt="no reports"/>
                            <p>No reports to show</p>
                        </div>
                    </div>
                }
            </PageStyle>
        </RouteLayout>
    )
}
