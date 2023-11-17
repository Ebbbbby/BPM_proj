import React, {useEffect, useState} from "react";
import RptStyle from "../Style/Reports.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import {CalendarFilter, ProDropFilter, SearchFilter} from "../../../Components/Search/Search";
import {ActionButtons} from "../../../../global/components/Buttons/buttons";
import { MdHistory } from "react-icons/md";
import EmptyReportIllustration from "../../../Images/empty_rafiki.png";
import Table from '../../../Components/Table/Table';
import Pagination from '../../../Components/Pagination/Pagination'
import {TableActions} from "../../../Components/Misc/Actions";
import {useDispatch, useSelector} from "react-redux";
import {GetReportTriggerHistory} from "../../../../../utils/redux/Report/ReportSlice";



const todaysDate = new Date();
const last30Days = new Date(new Date().setDate(todaysDate.getDate() - 30));


export default function GenerateReports() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({from: last30Days, to: todaysDate});
  const { reportTriggers } = useSelector((state) => state?.report);

  useEffect(()=>{
    dispatch(GetReportTriggerHistory({
      PageSize: pageSize,
      CurrentPage: currentPage,
      StartDate: dateRange.from?.toISOString(),
      EndDate: dateRange.to?.toISOString()
    }));
  }, [pageSize, currentPage])

  const getFilteredData = () =>{
    dispatch(GetReportTriggerHistory({
      PageSize: pageSize,
      CurrentPage: currentPage,
      StartDate: dateRange.from?.toISOString(),
      EndDate: dateRange.to?.toISOString()
    }));
  }



  return (
    <RouteLayout title="Reports / Generate Reports">
      <div className={RptStyle.head}>
        <div className={RptStyle.head_text}>Report Trigger History</div>
      </div>
      <PageStyle>
        <div className={RptStyle.report_filters}>
          <CalendarFilter
              name="Date Range"
              date={dateRange}
              onChange={dateRange=>{
                setDateRange(dateRange)
              }}
          />
          <ActionButtons className={RptStyle.report_filters_button} onClick={getFilteredData}>
            <MdHistory />
            Get Trigger History
          </ActionButtons>
        </div>
      </PageStyle>
      <PageStyle>
        {reportTriggers && reportTriggers.result && reportTriggers.result.length ?
          <div className={RptStyle.report_table}>
            <Table>
              <tr>
                <th>Report Name</th>
                <th>Initiator</th>
                <th>File Url</th>
                <th>Recipients</th>
                <th>Dates Generated</th>
              </tr>
              <tbody>
              {reportTriggers.result && reportTriggers.result.map((report, index) => (
                <tr key={index}>
                  <td>{report.reportName}</td>
                  <td>{report.initiator}</td>
                  <td>{report.fileUrl}</td>
                  <td>{report.recipients}</td>
                  <td>{report.createdDate}</td>
                  <td>
                    <TableActions>
                      {[
                        {
                          name: "Download",
                          action: () => {
                            window.open(report.fileUrl, '_blank');
                            // handleDownload(report.fileUrl)
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
            <Pagination
              last_page={reportTriggers?.totalPages}
              present_page={reportTriggers?.currentPage}
              totalRows={reportTriggers?.totalRows}
              pageSize={pageSize}
              setPageSize={(page) => setPageSize(page)}
              click={(page) => setCurrentPage(page)}
            />
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
