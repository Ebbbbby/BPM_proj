import React, { useEffect, useState } from 'react'
import Pagination from '../../../Components/Pagination/Pagination';
import PageStyle from "../../../Components/Layout/PageLayout";
import DashboardStyle from '../../../../dashboard/Styles/Dashboard.module.css'

import {useNavigate } from 'react-router';
import Table from '../../../Components/Table/Table';
import { CTAButtons } from '../../../../global/components/Buttons/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { TableActions } from '../../../Components/Misc/Actions';
import { GetLocalStorage } from '../../../../../utils/functions/GetLocalStorage';
import { URL } from '../../../../../utils/routes';
import { GetEmployeeQualification } from '../../../../../utils/redux/Employee/EmployeeSlice';


const EmployeeQualification = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

     const dispatch = useDispatch()
     const navigate = useNavigate()
    const {employee_qualification,isLoading} = useSelector((state)=> state?.employee)
    console.log(employee_qualification)

    const user= GetLocalStorage()
    console.log(user)


    const actionButton = (
        <>   
        <CTAButtons onClick={() => navigate(`${URL.Employee_Qualification}/${URL.Add_Employee_Qualification}`)}>
              Add Qualification
            </CTAButtons>
     
        </>
      );
      useEffect(()=>{
        dispatch(GetEmployeeQualification({EmployeeId:user?.staffId, pageNumber:pageNumber, pageSize:10000}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[user?.staffId])

    
    return (
        <PageStyle
          title={"Employee Qualification"}
          hasBack={false}
          action={actionButton}
          isMain={true}
        >
          
         
          <div className={DashboardStyle.dashboard_table_holder}>
            <AcqTable
              // action={action}
              data={employee_qualification}
              isLoading={isLoading}
            />
          </div>
          <Pagination
            last_page={employee_qualification?.responseObject?.totalNumberOfPages}
            present_page={employee_qualification?.responseObject?.currentPage}
            totalRows={employee_qualification?.responseObject?.previousPage}
            pageSize={pageSize}
            setPageSize={(page) => setPageSize(page)}
            click={(page) => setPageNumber(page)}
          />
        
        </PageStyle>
      );
}


export default EmployeeQualification;

function AcqTable({ data, isLoading}) {

    const navigate = useNavigate();
  
    if (isLoading === true) {
      return <p>Loading...</p>;
    }
    // function EighteenPlus(dateOfBirth) {
    //     const currentDate = new Date();
    //     const dob = new Date(dateOfBirth);
    //    const age = currentDate.getFullYear() - dob.getFullYear();
    //     if (age > 18 || (age === 18 && currentDate.getMonth() >= dob.getMonth() && currentDate.getDate() >= dob.getDate())) {
    //       return true;
    //     }
      
    //     return false;
    //   }
  
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Institute Name</th>
            <th>Qualification</th>
            <th>Qualification Type</th>
            <th>Approval Status</th>
            <th>Action</th>
      
          </tr>
        </thead>
        <tbody>
          {data?.responseObject?.pageItems?.map?.((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.instituteName }</td>
              <td>{item?.qualificationName}</td>
              <td>{item?.qualificationType}</td>
              <td>{item?.approvalStatus}</td>
              <td>
              <TableActions hasBack = {true} url={`${URL.Employee_Qualification}/${item.id}/view`}>
                {[
                  {
                    name: "Edit Employee Qualification ",
                    action: () => {
                  
                      navigate(`../${URL.Employee_Qualification}/${item.id}/edit`, {state:item});
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
