import React, { useEffect, useState } from 'react'
import Pagination from '../../../../Components/Pagination/Pagination';
import PageStyle from "../../../../Components/Layout/PageLayout";
import DashboardStyle from '../../../../../dashboard/Styles/Dashboard.module.css'
import Table from '../../../../Components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { TableActions } from '../../../../Components/Misc/Actions';
import { FormatDateTime } from '../../../../../../utils/functions/ResourceFunctions';
import { ApproveEmployeeMedicalRequisition, DeclineEmployeeMedicalRequisition, GetEmployeeMedicalRequisition } from '../../../../../../utils/redux/HR/HRSlice';
import { URL } from '../../../../../../utils/routes';
import { useApprovals } from '../../../Vendors/VendorApprovals/useApprovals';
import { useSearchFilter } from '../../../../../../utils/functions/useDate';
import { CalendarFilter, FilterButton, ProDropFilter, SearchFilter } from '../../../../Components/Search/Search';


const MedicalRequisition = () => {
  const {
    searchText,
    filter,
    pageSize,
    currentPage,
    setSearchText,
    setFilter,
    setPageSize,
    setCurrentPage,
    date,
    setDate,
    find,
    findSearch,
  } = useSearchFilter({
    initialFilter: 1,
  });

     const dispatch = useDispatch()
    const {get_medicalrequisition,isLoading} = useSelector((state)=> state?.hr)


      useEffect(()=>{
        dispatch(GetEmployeeMedicalRequisition({      // filter: filter,
          pageSize: pageSize,
          pageNumber: currentPage,
          //search: searchText,
          // startDate: FormatDateTime(date?.from, "yy-MM-DD"),
          // endDate: FormatDateTime(date?.to, "yy-MM-DD"),
          // sort: 1,}))
      })

        )}
   // eslint-disable-next-line react-hooks/exhaustive-deps 
      ,[pageSize, currentPage, find])

      const filterBy = [
        {    // eslint-disable-next-line react-hooks/exhaustive-deps
    
          name: "All",
          filter: 0,
        },
        {
          name: "Initiated",
          filter: 1,
        },
        {
          name: "Approved",
          filter: 2,
        },
        {
          name: "Declined",
          filter: 3,
        },
      ];
    return (
        <PageStyle
          title={"Medical Beneficiary Management"}
          hasBack={false}
          isMain={true}
        >
               <form className={DashboardStyle.dashboard_filter}>
        <SearchFilter
          value={searchText}
          text={(searchText) => setSearchText(searchText)}
        />
        <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Status"}
          filterBy={filterBy}
        />
        <CalendarFilter
          date={(date) => setDate(date)}
          name="Select Date Range"
          startDate={date?.from}
          endDate={date?.to}
        />
        <FilterButton onClick={() => findSearch()} name="" />
      </form>
         
          <div className={DashboardStyle.dashboard_table_holder}>
            <AcqTable
              // action={action}
              data={get_medicalrequisition}
              isLoading={isLoading}
            />
          </div>
          <Pagination
            last_page={get_medicalrequisition?.responseObject?.previousPage}
            present_page={get_medicalrequisition?.responseObject?.currentPage}
            totalRows={get_medicalrequisition?.responseObject?.totalNumberOfPages}
            pageSize={pageSize}
            setPageSize={(page) => setPageSize(page)}
            click={(page) => setCurrentPage(page)}
          />
        
        </PageStyle>
      );
}


export default MedicalRequisition;

function AcqTable({ data, isLoading}) {

    const dispatch = useDispatch();
  
    const { openModal, closeModal } = useApprovals({});
    const [isOpen, setIsOpen] = useState(false);
  
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
            <th>Patient Name</th>
            <th>Hospital Name</th>
            <th>Appointment Date </th>
            <th>Category</th>
            <th>Approval Status</th>
            <th>Action</th>


          </tr>
        </thead>
        <tbody>
          {data?.responseObject?.pageItems?.map?.((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.patientName }</td>
              <td>{item?.hospitalName}</td>
              <td>{FormatDateTime(item?.dateOfAppointment, "ll")}</td>
              <td>{item?.beneficiaryCategory}</td>
              <td>{item?.status}</td>

            
              <td>
              <TableActions  hasChildren={true} url={`../../${URL.Employee}/${URL.My_Employee_Info}/${URL.Medical_Requisition}/${item?.id}/view`} >
                {[
                  {
                    name: "Approve Medical Requisition",
                    action: () => {
                      openModal({
                        type: "",
                        details: {
                          button: {
                            name: "Yes, Approve",
                            color: "",
                          },
                          commentIsOptional: true,
                          sendIsOptional: true,
                          title: "Approve Request",
                          submitData: (data) => {
                            dispatch(
                              ApproveEmployeeMedicalRequisition({
                                comment: data?.comments,
                                medicalId: item.id,

                              
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetEmployeeMedicalRequisition({pageSize:1, pageNumber:10000}));
                            });
                          },
                        },
                      });
                      setIsOpen(!isOpen);
                    },
                  },
                  {
                    name: "Decline Medical Requisition",
                    action: () => {
                      openModal({
                        type: "",
                        details: {
                          button: {
                            name: "Yes, Decline",
                            color: "red",
                          },
                          commentIsOptional: true,
                          sendIsOptional: true,
                          title: "Decline Request",
                          submitData: (data) => {
                            dispatch(
                              DeclineEmployeeMedicalRequisition({
                                comment: data?.comments,
                                medicalId: item.id,

                            
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetEmployeeMedicalRequisition({pageSize:1, pageNumber:10000}));
                            });
                          },
                        },
                      });
                      setIsOpen(!isOpen);
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
