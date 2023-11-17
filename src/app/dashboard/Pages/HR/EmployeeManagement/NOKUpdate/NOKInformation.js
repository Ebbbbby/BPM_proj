import React, { useEffect, useState } from 'react'
import Pagination from '../../../../Components/Pagination/Pagination';
import PageStyle from "../../../../Components/Layout/PageLayout";
import DashboardStyle from '../../../../../dashboard/Styles/Dashboard.module.css'
import Table from '../../../../Components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { TableActions } from '../../../../Components/Misc/Actions';
import { FormatDateTime } from '../../../../../../utils/functions/ResourceFunctions';
import { ApproveEmployeeNOK, DeclineEmployeeNOK, GetAllEmployeeBeneficiary } from '../../../../../../utils/redux/HR/HRSlice';
import { URL } from '../../../../../../utils/routes';
import { useApprovals } from '../../../Vendors/VendorApprovals/useApprovals';
import { useSearchFilter } from '../../../../../../utils/functions/useDate';
import { CalendarFilter, FilterButton, ProDropFilter, SearchFilter } from '../../../../Components/Search/Search';


const NOKInformation = () => {
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
    const {all_beneficiary,isLoading} = useSelector((state)=> state?.hr)

    const actionButton = (
        <>   
        {/* <CTAButtons onClick={() => navigate(`../${URL.Add_NOK}`)}>
              Add Beneficiary
            </CTAButtons>
      */}
        </>
      );
      useEffect(()=>{
        dispatch(GetAllEmployeeBeneficiary({      // filter: filter,
          pageSize: pageSize,
          pageNumber: currentPage,
          //search: searchText,
          // startDate: FormatDateTime(date?.from, "yy-MM-DD"),
          // endDate: FormatDateTime(date?.to, "yy-MM-DD"),
          // sort: 1,
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
      },[pageSize, currentPage, find])

      const filterBy = [
        {
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
          title={"NOK Management"}
          hasBack={false}
          action={actionButton}
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
              data={all_beneficiary}
              isLoading={isLoading}
            />
          </div>
          <Pagination
            last_page={all_beneficiary?.totalPages}
            present_page={all_beneficiary?.currentPage}
            totalRows={all_beneficiary?.totalRows}
            pageSize={pageSize}
            setPageSize={(page) => setPageSize(page)}
            click={(page) => setCurrentPage(page)}
          />
        
        </PageStyle>
      );
}


export default NOKInformation;

function AcqTable({ data, isLoading}) {
  const { openModal, closeModal } = useApprovals({});
  const dispatch = useDispatch();
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
            <th>Full Name</th>
            <th>Relationship</th>
            <th>Date Of Birth</th>
            <th>Phone Number</th>
            <th>Action</th>
      
          </tr>
        </thead>
        <tbody>
          {data?.result?.map?.((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.firstName + ' '+ item?.othernames + " " + item?.surname }</td>
              <td>{item?.relationship}</td>
              <td>{FormatDateTime(item?.dateOfBirth, "ll")}</td>
              <td>{item?.phoneNumber}</td>
              <td>
              <TableActions hasChildren={true} url={`../../${URL.Employee}/${URL.My_Employee_Info}/${URL.My_NOK_Information}/${item?.id}/view`}>
                {[

 // employee/My-Employee-Info/My-NOK-Info/4/view
 // employee/My-Employee-Info/My-NOK-Info/6/view
              {
                name: "Approve Employee NOK",
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
                          ApproveEmployeeNOK({
                            comment: data?.comments,
                            nOfKId: item.id,
                          
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetAllEmployeeBeneficiary({pageSize:1, pageNumber:10000}));
                        });
                      },
                    },
                  });
                  setIsOpen(!isOpen);
                },
              },
              {
                name: "Decline Employee NOK",
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
                          DeclineEmployeeNOK({
                            comment: data?.comments,
                            nOfKId: item.id,

                        
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetAllEmployeeBeneficiary({pageSize:1, pageNumber:10000}));
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
