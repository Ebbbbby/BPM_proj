import React, { useEffect, useState } from 'react'
import Pagination from '../../../../Components/Pagination/Pagination';
import PageStyle from "../../../../Components/Layout/PageLayout";
import DashboardStyle from '../../../../../dashboard/Styles/Dashboard.module.css'

import { useNavigate } from 'react-router';
import Table from '../../../../Components/Table/Table';
import { CTAButtons, SupportButtons } from '../../../../../global/components/Buttons/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { TableActions } from '../../../../Components/Misc/Actions';
import { FormatDateTime } from '../../../../../../utils/functions/ResourceFunctions';
import { URL } from '../../../../../../utils/routes';
import { GetMyBeneficiaryInfo } from '../../../../../../utils/redux/Employee/EmployeeSlice';

const MyNOKInformation = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

     const dispatch = useDispatch()
     const navigate = useNavigate()
    const { get_beneficiary_info,isLoading} = useSelector((state)=> state?.employee)
    console.log(get_beneficiary_info)


    const actionButton = (
        <>   
        <CTAButtons onClick={() => navigate(`../${URL.My_Employee_Info}/${URL.My_NOK_Information}/${URL.Add_My_NOK}`)}>
              Add NOK
            </CTAButtons>
     
        </>
      );
      useEffect(()=>{
        dispatch(GetMyBeneficiaryInfo({ pageNumber:pageNumber, pageSize:10000}))
                  // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    
    return (
        <PageStyle
          title={"NOK Information"}
          hasBack={false}
          action={actionButton}
          isMain={true}
        >

          <div className={DashboardStyle.dashboard_table_holder}>
            <AcqTable
              // action={action}
              data={get_beneficiary_info}
              isLoading={isLoading}
            />
          </div>
          <Pagination
            last_page={get_beneficiary_info?.responseObject?.totalNumberOfPages}
            present_page={get_beneficiary_info?.responseObject?.currentPage}
            totalRows={get_beneficiary_info?.responseObject?.previousPage}
            pageSize={pageSize}
            setPageSize={(page) => setPageSize(page)}
            click={(page) => setPageNumber(page)}
          />
        
        </PageStyle>
      );
}


export default MyNOKInformation;

function AcqTable({ data, isLoading}) {

    const navigate = useNavigate();
  
    if (isLoading === true) {
      return <p>Loading...</p>;
    }
    function EighteenPlus(dateOfBirth) {
        const currentDate = new Date();
        const dob = new Date(dateOfBirth);
       const age = currentDate.getFullYear() - dob.getFullYear();
        if (age > 18 || (age === 18 && currentDate.getMonth() >= dob.getMonth() && currentDate.getDate() >= dob.getDate())) {
          return true;
        }
      
        return false;
      }
  
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Relationship</th>
            <th>Date Of Birth</th>
            <th>Phone Number</th>
            <th>Medical Beneficiary</th>
            <th>Action</th>
      
          </tr>
        </thead>
        <tbody>
          {data?.responseObject?.pageItems?.map?.((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.firstName + ' '+ item?.othernames + ' ' + item?.surname }</td>
              <td>{item?.relationship}</td>
              <td>{FormatDateTime(item?.dateOfBirth, "ll")}</td>
              <td>{item?.phoneNumber}</td>
              <td>{item?.isMedicalBeneficiary }</td>            
              <td>
              <TableActions hasChildren = {true} url={`${URL.My_NOK_Information}/${item?.id}/view`} >
                {[
                  {
                    name: "Edit NOK Information ",
                    action: () => {
                  
                      navigate(`${URL.My_NOK_Information}/${item.id}/edit`, {state:item});
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
