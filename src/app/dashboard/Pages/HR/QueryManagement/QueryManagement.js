import React, { useEffect, useState } from "react";
import { CalendarFilter2, FilterButton, SearchFilter } from "../../../Components/Search/Search";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Pagination from "../../../Components/Pagination/Pagination";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../Components/Table/Table";
import { useNavigate } from "react-router";
import { TableActions } from "../../../Components/Misc/Actions";
import { GetQueries } from "../../../../../utils/redux/HR/HRSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { format } from "date-fns";

const QueryManagement = () => {
  const {get_queries,isLoading}= useSelector((state)=> state?.hr)
  console.log(get_queries)
  const navigate = useNavigate();
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
  dispatch(GetQueries(apiData))
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [pageNumber, pageSize])
const handleFilterButton = () => {
  dispatch(GetQueries(apiData));
};
  const actionButton = (
    <>
      <CTAButtons onClick={() => {
          navigate("add");
   
        }}>Create New</CTAButtons>
    </>
  );

  return (
    <PageStyle
      title={"Query Management"}
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
            <AcqTable data={get_queries} isLoading={isLoading}/>
              
            {get_queries?.data?.map((acq, index) => (
              <AcqTable
                {...acq}          
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </Table>
      </div>


      <Pagination
           last_page={get_queries?.totalRows}
           present_page={get_queries?.currentPage}
           totalRows={get_queries?.totalPages}
           pageSize={pageSize}
           setPageSize={(page) => setPageSize(page)}
           click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default QueryManagement

function AcqTable({ data, isLoading, pageNumber, perPage }) {
  const navigate = useNavigate();
  return (
    <>
       {data?.result.map((item, index) => (
      
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{item?.employee?.firstName + " "+ item?.employee?.otherName +" " + item?.employee?.surname}</td>
          {/* <td>{item?.title}</td> */}
          <td>{item?.title}</td>
          <td>{FormatDateTime(item?.queryDate)}</td>
          
          <td>
            {item?.queryReply === null ? <TableActions hasChildren={true}  url={`${item?.id}/view`}></TableActions> : <TableActions hasChildren={true}  url={`${item?.id}/view`}>
              {[
                // {
                //   name: "Edit Query ",
                //   action: () => {                
                //     navigate(`${item.id}/edit`, {state:item});
                //   },
                // },
                {
                  name: "Review Query",
                  action: () => {                
                    navigate(`${item.id}/view`, {state:item});
                  },
                },

              ]}
            </TableActions> }
            {/* TO DO.. Do an if statement to check who the initiator of the query is. If it is the HR, make him see the edit and review buttons else make it just review */}
            
          </td>
        </tr>
      ))}
    </>
  );
}
