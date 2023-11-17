import React, {useState, useEffect}from 'react'
import { GetLocalStorage } from '../../../../../utils/functions/GetLocalStorage'
import { SearchFilter } from '../../../Components/Search/Search';
import Pagination from '../../../Components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from '../../../Components/Table/Table';
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { CTAButtons } from '../../../../global/components/Buttons/buttons';
import { useNavigate } from 'react-router';
import { useApprovals } from '../../Vendors/VendorApprovals/useApprovals';
import { TableActions } from '../../../Components/Misc/Actions';
import { GetMyQueryResponse } from '../../../../../utils/redux/Employee/EmployeeSlice';
import { FormatDateTime } from '../../../../../utils/functions/ResourceFunctions';
import { URL } from '../../../../../utils/routes';

const MyQueryResponse = () => {
  const {get_myresponse,isLoading}= useSelector((state)=> state?.employee)
  console.log(get_myresponse)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = GetLocalStorage();
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);


useEffect (()=> {
  dispatch(GetMyQueryResponse({pageNumber:pageNumber, pageSize:pageSize}))
}, [pageNumber, pageSize])
  const actionButton = (
    <>
      {/* <CTAButtons onClick={() => {
          navigate(`../${URL.Query}/add`);
   
        }}>Create New</CTAButtons> */}
    </>
  );

  return (
    <PageStyle
      title={"My Query Response"}
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
               <th>QueryType</th>
              <th>Offense Date</th>
              <th>Response Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AcqTable data={get_myresponse} isLoading={isLoading}/>
              
            {get_myresponse?.result?.map((acq, index) => (
              <AcqTable
                {...acq}          
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_myresponse?.totalPages}
        present_page={get_myresponse?.currentPage}
        totalRows={get_myresponse?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default MyQueryResponse

function AcqTable({ data, isLoading, pageNumber, perPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, closeModal } = useApprovals({});
  return (
    <>
      {data?.result?.map((item, index) => (
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{item?.query?.queryType}</td>
          <td>{FormatDateTime(item?.query?.offenceCommittedDate)}</td>
          <td>{FormatDateTime(item?.responseDate)}</td>
          <td>
            <TableActions hasChildren={true}  url={`../${URL.Query_Response}/${item?.id}/viewreply`}>
              {[
                {
                  name: "Edit Query ",
                  action: () => {
                
                    navigate(`../../${URL.Query}/${item.id}/reply`, {state:item});
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


// Query/Query-Response/5/viewreply