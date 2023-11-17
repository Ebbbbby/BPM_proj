import React, { useEffect, useState } from "react";
import { CalendarFilter2, FilterButton, SearchFilter } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../Components/Table/Table";
import { TableActions } from "../../../Components/Misc/Actions";
import { GetQueryManagement } from "../../../../../utils/redux/HR/HRSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { format } from "date-fns";

const AllQueryManagement = () => {
  const {get_query_management,isLoading}= useSelector((state)=> state?.hr)

  console.log(get_query_management)
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  let dateFrom = startDate === undefined ? "" : format(new Date(startDate), 'yyyy-MM-dd')
  let dateTo = endDate === undefined ? "" : format(new Date(endDate), 'yyyy-MM-dd')
  const apiData={
    pageNumber:pageNumber,
    pageSize:pageSize,
    search:search,
    startDate: dateFrom,
    endDate: dateTo,
  }

useEffect (()=> {
  dispatch(GetQueryManagement({pageNumber:pageNumber, pageSize:pageSize}))
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [pageNumber, pageSize])
const handleFilterButton = () => {
  dispatch(GetQueryManagement(apiData));
};
  const actionButton = (
    <>
      
    </>
  );

  return (
    <PageStyle
      title={""}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
        <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter  text={setSearch}/>

        <CalendarFilter2
          name="Select Date Range"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
           <FilterButton name="" onClick={() => handleFilterButton()} />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
            <th>ID</th>
            <th>Employee Name</th>
              <th>Subject</th>
              <th>Query Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AcqTable data={get_query_management} isLoading={isLoading}/>
              
            {get_query_management?.data?.map((acq, index) => (
              <AcqTable
                {...acq}          
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </Table>
      </div>


      <Pagination
           last_page={get_query_management?.totalPages}
           present_page={get_query_management?.currentPage}
           totalRows={get_query_management?.totalPages}
           pageSize={pageSize}
           setPageSize={(page) => setPageSize(page)}
           click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default AllQueryManagement

function AcqTable({ data}) {
  return (
    <>
       {data?.result.map((item, index) => (
      
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{item?.query?.employee?.firstName + " "+ item?.query?.employee?.otherName +" " + item?.query?.employee?.surname}</td>
          <td>{item?.query?.title}</td>
          <td>{FormatDateTime(item?.query?.queryDate)}</td>
          
          <td>
            {/* TO DO.. Do an if statement to check who the initiator of the query is. If it is the HR, make him see the edit and review buttons else make it just review */}
            <TableActions hasChildren={true}  url={`../${item?.id}/viewpanel`}/>
            
          </td>
        </tr>
      ))}
    </>
  );
}
