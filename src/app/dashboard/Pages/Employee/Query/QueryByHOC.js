import React, {useState, useEffect}from 'react'
import { CalendarFilter2, FilterButton, SearchFilter } from '../../../Components/Search/Search';
import Pagination from '../../../Components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from '../../../Components/Table/Table';
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { CTAButtons } from '../../../../global/components/Buttons/buttons';
import { useNavigate } from 'react-router';
import { TableActions } from '../../../Components/Misc/Actions';
import { GetQueryHOC } from '../../../../../utils/redux/Employee/EmployeeSlice';
import { FormatDateTime } from '../../../../../utils/functions/ResourceFunctions';
import { URL } from '../../../../../utils/routes';
import { format } from 'date-fns';

const QueryByHOC = () => {
  const {get_queryHOC,isLoading}= useSelector((state)=> state?.employee)
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
  dispatch(GetQueryHOC(apiData))
      // eslint-disable-next-line react-hooks/exhaustive-deps
}, [pageNumber, pageSize])

const handleFilterButton = () => {
  dispatch(GetQueryHOC(apiData));
};
  const actionButton = (
    <>
      <CTAButtons onClick={() => {
          navigate(`../${URL.Query}/add`);
   
        }}>Create New</CTAButtons>
    </>
  );
  // console.log(user)


  return (
    <PageStyle
      title={"Query By HOC"}
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
              <th>Query Response</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AcqTable data={get_queryHOC} isLoading={isLoading}/>
              
            {get_queryHOC?.result?.map((acq, index) => (
              <AcqTable
                {...acq}          
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_queryHOC?.totalPages}
        present_page={get_queryHOC?.currentPage}
        totalRows={get_queryHOC?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default QueryByHOC

function AcqTable({ data}) {
  const navigate = useNavigate();

  return (
    <>
      {data?.result?.map((item, index) => (
        // console.log(item, 'ITEM')
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{item?.initiationType}</td>
          <td>{item?.title}</td>
          
          <td>{FormatDateTime(item?.queryDate)}</td>
          <td>{item?.queryReply == null ? "False": "True"}</td>
          <td>
          {item?.queryReply === null ?  (<TableActions hasChildren={true}  url={`../${URL.Query}/${item?.id}/view`}>
              {[
                {
                  name: "Edit Query ",
                  action: () => {
                    navigate(`../${URL.Query}/${item?.id}/edit`, {state:item});
                  },
                },
              ]}
            </TableActions>
          ): (<TableActions hasChildren={true}  url={`../${URL.Query}/${item?.id}/view`}></TableActions>)
            }
            
          </td>
       
        </tr>
      ))}
    </>
  );
}
