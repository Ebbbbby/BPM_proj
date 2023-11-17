import React, {useState, useEffect}from 'react'
import { SearchFilter } from '../../../Components/Search/Search';
import Pagination from '../../../Components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from '../../../Components/Table/Table';
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { useNavigate } from 'react-router';
import { TableActions } from '../../../Components/Misc/Actions';
import { GetMyQuery } from '../../../../../utils/redux/Employee/EmployeeSlice';
import { FormatDateTime } from '../../../../../utils/functions/ResourceFunctions';
import { URL } from '../../../../../utils/routes';

const MyQuery = () => {
  const {get_myquery,isLoading}= useSelector((state)=> state?.employee)
  console.log(get_myquery)
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  
useEffect (()=> {
  dispatch(GetMyQuery({pageNumber:pageNumber, pageSize:pageSize}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
}, [pageNumber, pageSize])
  const actionButton = (
    <>
   
    </>
  );

  return (
    <PageStyle
      title={"Query"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Subject</th>
              <th>Query Date</th>
              <th>Answered Query</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AcqTable data={get_myquery} isLoading={isLoading}/>
              
            {get_myquery?.result?.map((acq, index) => (
              <AcqTable
                {...acq}          
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_myquery?.totalPages}
        present_page={get_myquery?.currentPage}
        totalRows={get_myquery?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default MyQuery

function AcqTable({ data}) {
  const navigate = useNavigate();
  return (
    <>
      {data?.result?.map((item, index) => (
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{item?.initiationType
}</td>
          <td>{item?.title}</td>
          <td>{FormatDateTime(item?.queryDate)}</td>
          <td>{item?.queryReply === null ? "False": "True"}</td>
          <td>
            {item?.queryReply === null? (  
               <TableActions hasChildren={true}  url={`../${URL.Query}/${item?.id}/view`}>
              {[
                {
                  name: "Query Response ",
                  action: () => {
                
                    navigate(`../${URL.Query}/${item.id}/reply`, {state:item});
                  },
                },
              ]}
            </TableActions>):( <TableActions hasChildren={true}  url={`../${URL.Query}/${item?.id}/view`}></TableActions>)}
         
          </td>
        </tr>
      ))}
    </>
  );
}
