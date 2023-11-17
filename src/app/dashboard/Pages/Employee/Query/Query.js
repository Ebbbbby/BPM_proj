import React, {useState, useEffect}from 'react'
import { SearchFilter } from '../../../Components/Search/Search';
import Pagination from '../../../Components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from '../../../Components/Table/Table';
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { CTAButtons } from '../../../../global/components/Buttons/buttons';
import { useNavigate } from 'react-router';
import { TableActions } from '../../../Components/Misc/Actions';
import { GetQuery } from '../../../../../utils/redux/Employee/EmployeeSlice';
import { FormatDateTime } from '../../../../../utils/functions/ResourceFunctions';

const Query = () => {
  const {get_query,isLoading}= useSelector((state)=> state?.employee)
  console.log(get_query)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(get_query)

useEffect (()=> {
  dispatch(GetQuery({pageNumber:pageNumber, pageSize:pageSize}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
}, [pageNumber, pageSize])
  const actionButton = (
    <>
      <CTAButtons onClick={() => {
          navigate("add");
   
        }}>Create New</CTAButtons>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AcqTable data={get_query} isLoading={isLoading}/>
              
            {get_query?.result?.map((acq, index) => (
              <AcqTable
                {...acq}          
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_query?.totalPages}
        present_page={get_query?.currentPage}
        totalRows={get_query?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default Query

function AcqTable({ data, isLoading, pageNumber, perPage }) {
  const navigate = useNavigate();
   return (
    <>
      {data?.result?.map((item, index) => (
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{item?.queryType?.initiatorName}</td>
          <td>{item?.title}</td>
          <td>{FormatDateTime(item?.queryDate)}</td>
          <td>
            <TableActions hasChildren={true}  url={`${item?.id}/view`}>
              {[
                {
                  name: "Edit Query ",
                  action: () => {
                
                    navigate(`${item.id}/edit`, {state:item});
                  },
                },
              ]}
            </TableActions>
          </td>
        </tr>
      ))}
    </>
  );
}
