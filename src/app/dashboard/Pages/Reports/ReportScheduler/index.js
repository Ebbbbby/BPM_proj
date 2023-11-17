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

const schedules = [
    {
        id: 1,
        schedule: 'Daily',
        runTime: '5:00 PM',
        reportFormat: ['PDF', 'Excel'],
        status: 'Active'
    },
    {
        id: 2,
        schedule: 'Weekly',
        runTime: 'Monday - 3:00PM, Friday - 1PM',
        reportFormat: ['Excel'],
        status: 'Active'
    },
    {
        id: 3,
        schedule: 'Monthly',
        runTime: 'Week 1, Friday - 3:00PM',
        reportFormat: ['PDF', 'Excel'],
        status: 'Inactive'
    },
]

export default function ReportScheduler(){
    const [reportSchedules, setReportSchedules] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        setReportSchedules(schedules)
    }, [])

    return (
        <RouteLayout title="Reports / Reports Scheduler">
            <div className={RptStyle.head}>
                <div className={RptStyle.head_text}>
                    Report Scheduler
                </div>
                <div className={RptStyle.head_btns}>
                    <CTAButtons onClick={() => navigate(URL.Add_Report_Scheduler)}>
                        Add New
                    </CTAButtons>
                </div>
            </div>
            <PageStyle>
                <div>
                    <Table>
                        <thead>
                            <th>#</th>
                            <th>Scheduler</th>
                            <th>Run Time</th>
                            <th>Report Format</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                        {reportSchedules && reportSchedules.map((schedules, index)=>(
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{schedules.schedule}</td>
                                <td>{schedules.runTime}</td>
                                <td>{schedules.reportFormat?.join(', ')}</td>
                                <td>
                                    <span
                                        style={{
                                            textAlign: "center",
                                            padding: "3px 8px",
                                            borderRadius: "1rem",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            backgroundColor:
                                                schedules.status === "Active"
                                                    ? "#CBFFAE"
                                                    : schedules.status === "Inactive"
                                                        ? "#FCEBEC"
                                                        : "",
                                            color:
                                                schedules.status === "Active"
                                                    ? "#067306"
                                                    : schedules.status === "Inactive"
                                                        ? "#9E0038"
                                                        : "",
                                        }}
                                    >
                                        {" "}
                                        {schedules.status}
                                    </span>
                                </td>
                                <td>
                                    <TableActions url={``}>
                                        {[
                                            {
                                                name: "Edit",
                                                action: () => {},
                                            },
                                            {
                                                name: "Enable",
                                                action: () => {},
                                            },
                                            {
                                                name: "Disable",
                                                action: () => {},
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