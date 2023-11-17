import React, { useEffect, useState } from 'react'
import Pagination from '../../../Components/Pagination/Pagination';
import PageStyle from "../../../Components/Layout/PageLayout";
import DashboardStyle from '../../../../dashboard/Styles/Dashboard.module.css'
import {  useNavigate } from 'react-router';
import Table from '../../../Components/Table/Table';
import { CTAButtons } from '../../../../global/components/Buttons/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { TableActions } from '../../../Components/Misc/Actions';
import { FormatDateTime } from '../../../../../utils/functions/ResourceFunctions';
import { GetEmployeeClaims } from '../../../../../utils/redux/Employee/EmployeeSlice';
import { URL } from '../../../../../utils/routes';
import { FormatCurrency } from '../../../../../utils/functions/FormatCurrency';


const EmployeeExtendedClaim = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
     const dispatch = useDispatch()
     const navigate = useNavigate()
    const {employee_claims,isLoading} = useSelector((state)=> state?.employee)
console.log(employee_claims,'claims')
    const actionButton = (
        <>   
        <CTAButtons onClick={() => navigate(`../${URL.My_Employee_Info}/${URL.Employee_Extended_Claim}/${URL.Add_Employee_Claim}`)}>
              Add Extented Claim
            </CTAButtons>
     
        </>
      );
      useEffect(()=>{
        dispatch(GetEmployeeClaims({pageNumber:pageNumber, pageSize:pageSize}))
          // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    
    return (
        <PageStyle
        title={"Employee Extended HMO"}
          hasBack={false}
          action={actionButton}
          isMain={true}
        >
        
         
          <div className={DashboardStyle.dashboard_table_holder}>
            <AcqTable
              // action={action}
              data={employee_claims}
              isLoading={isLoading}
            />
          </div>
          <Pagination
            last_page={employee_claims?.responseObject?.previousPage}
            present_page={employee_claims?.responseObject?.currentPage}
            totalRows={employee_claims?.responseObject?.totalNumberOfPages}
            pageSize={pageSize}
            setPageSize={(page) => setPageSize(page)}
            click={(page) => setPageNumber(page)}
          />
        
        </PageStyle>
      );
}


export default EmployeeExtendedClaim;

function AcqTable({ data, isLoading}) {

    const navigate = useNavigate();
  
    if (isLoading === true) {
      return <p>Loading...</p>;
    }
  
    return (
      <Table>
        <thead>
          <tr>
     
          
            {/* <th>Patient Name</th> */}
            <th>Category</th>
            <th>Vendor</th>
            <th>Appointment Date </th>
            <th>Hospital</th>
            <th>Phone Number</th>
            <th>Amount</th>
           <th>Relationship</th>
            <th>Status</th>
            <th>Action</th>
            

    


          </tr>
        </thead>
        <tbody>
          {data?.responseObject?.pageItems?.map?.((item, index) => (
            <tr key={index}>
              <td>{item?.beneficiaryCategory }</td>
              <td>{item?.vendorName || 'Ebele'}</td>
              <td>{ FormatDateTime(item?.dateOfAppointment)}</td>
              <td>{item?.hospitaName}</td>
              <td>{item?.phoneNumber}</td>
              <td> {FormatCurrency(item?.amount || '200')}</td>
              <td>{item?.relationship}</td>
              <td>{item?.status}</td>

            
              <td>
              <TableActions hasChildren={true} url={
                `${URL.Employee_Extended_Claim}/${item?.id}/view`} >
                {[
                  {
                    name: "Edit Extended Claim ",
                    action: () => {
                  
                      navigate(`${URL.Employee_Extended_Claim}/${item.id}/edit`, {state:item});
                    },
                  },
                ]}
              </TableActions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
