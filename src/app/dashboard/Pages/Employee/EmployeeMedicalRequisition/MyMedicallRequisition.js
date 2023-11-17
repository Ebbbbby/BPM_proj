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
import { GetEmployeeMedicalRequisition } from '../../../../../utils/redux/Employee/EmployeeSlice';
import { URL } from '../../../../../utils/routes';
import { FormatCurrency } from '../../../../../utils/functions/FormatCurrency';
import { GetLocalStorage } from '../../../../../utils/functions/GetLocalStorage';


const MyMedicalRequisition = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
     const dispatch = useDispatch()
     const navigate = useNavigate()
    const {employee_medical,isLoading} = useSelector((state)=> state?.employee)
 
    console.log(employee_medical)
    const user = GetLocalStorage()

    const actionButton = (
        <>   
        <CTAButtons onClick={() => navigate(`../../${URL.My_Employee_Info}/${URL.My_Medical_Requisition}/${URL.Add_My_Medical}`)}>
              Add Medical Requisition
            </CTAButtons>
     
        </>
      );
      useEffect(()=>{
        dispatch(GetEmployeeMedicalRequisition({EmployeeId:+user?.staffId, pageNumber:pageNumber, pageSize:pageSize}))
          // eslint-disable-next-line react-hooks/exhaustive-deps
      },[+user?.staffId])

    
    return (
        <PageStyle
        title={"Medical Requisition"}
          hasBack={false}
          action={actionButton}
          isMain={true}
        >
        
         
          <div className={DashboardStyle.dashboard_table_holder}>
            <AcqTable
              // action={action}
              data={employee_medical}
              isLoading={isLoading}
            />
          </div>
          <Pagination
            last_page={employee_medical?.responseObject?.previousPage}
            present_page={employee_medical?.responseObject?.currentPage}
            totalRows={employee_medical?.responseObject?.totalNumberOfPages}
            pageSize={pageSize}
            setPageSize={(page) => setPageSize(page)}
            click={(page) => setPageNumber(page)}
          />
        
        </PageStyle>
      );
}


export default MyMedicalRequisition;

function AcqTable({ data, isLoading}) {

    const navigate = useNavigate();
  
    if (isLoading === true) {
      return <p>Loading...</p>;
    }
  
    return (
      <Table>
        <thead>
          <tr>
     
            <th>Vendor Name</th>
            {/* <th>Patient Name</th> */}
            <th>Beneficiary Type</th>
            <th>Amount</th>
            <th>Appointment Date </th>
            <th>Approval Status</th>
            <th>Action</th>


          </tr>
        </thead>
        <tbody>
          {data?.responseObject?.pageItems?.map?.((item, index) => (
            <tr key={index}>
              <td>{item?.vendorName }</td>
              {/* <td>{item?.patientName || 'Ebele'}</td> */}
              <td>{item?.beneficiaryCategory || 'Self'}</td>
              <td> {FormatCurrency(item?.amount || '200')}</td>
              <td>{FormatDateTime(item?.dateOfAppointment, "ll")}</td>
              <td>{item?.status}</td>

            
              <td>
              <TableActions hasChildren={true} url={`../${URL.My_Medical_Requisition}/${item?.id}/view`} >
                {[
                  {
                    name: "Edit Medical Requisition ",
                    action: () => {
                  
                      navigate(`../${URL.My_Medical_Requisition}/${item.id}/edit`, {state:item});
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
