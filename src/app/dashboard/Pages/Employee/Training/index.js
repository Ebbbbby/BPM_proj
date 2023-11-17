import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter, FilterButton, CalendarFilter2 } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../Components/Misc/Actions";
import {
    CTAButtons
} from "../../../../global/components/Buttons/buttons";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { format } from "date-fns";
import { CancelTrainingRequest, GetAllEmployeesTrainingRequisitions, GetEmployeeTrainingRequisitions } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import PermissionCheck from "../../../../../utils/PermissionCheck";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function TrainingRequisitions() {

    const [filter, setFilter] = useState('all');
    const [action] = useState();
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { all_emp_req, emp_req, isLoading } = useSelector((state) => state?.employee);
    const [selectAll, setSelectAll] = useState(false);
    const [checkboxState, setCheckboxState] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleCheckboxChange = (id, checked) => {
      if(checked){
        setCheckboxState({ ...checkboxState, [id]: !checkboxState[id] });
      }
      else{
        const newCheckboxState = { ...checkboxState };
        delete newCheckboxState[id];
        setCheckboxState(newCheckboxState);
        setSelectAll(false);
      }
    };
    
    const handleSelectAllChange = () => {
      setSelectAll(!selectAll);
      const newCheckboxState = {};
      let filteredItems =  trainings.filter((item) => item.approvalStatus === 0);
      if (!selectAll) {
        // If "Select All" checkbox is unchecked, set checkbox state for all filtered items
        filteredItems.forEach((data) => {
          newCheckboxState[data.uuId] = true;
        });
        setCheckboxState(newCheckboxState);
        setSelectAll(true);
      } else {
        // If "Select All" checkbox is checked, clear checkbox state for all filtered items
        filteredItems.forEach((data) => {
          delete checkboxState[data.uuId];
        });
        setCheckboxState({ ...checkboxState });
        setSelectAll(false);
      }
    };
    
    let statusfilter = filter === "all" ? "" : filter
    
    let dateFrom = startDate === undefined ? "" : format(new Date(startDate), 'yyyy-MM-dd')
    let dateTo = endDate === undefined ? "" : format(new Date(endDate), 'yyyy-MM-dd')
    
    let trainings = emp_req?.pageItems
    let all_training_requisitions = all_emp_req?.pageItems

    const apiData = {
      searchQuery: searchQuery,
      filter: statusfilter,
      startDate: dateFrom,
      endDate: dateTo,
      pageSize: pageSize,
      currentPage: currentPage,
    };

    useEffect(() => {
      dispatch(GetEmployeeTrainingRequisitions(apiData));
      dispatch(GetAllEmployeesTrainingRequisitions(apiData));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ pageSize, currentPage ]);

    const handleFilterButton = () => {
      dispatch(GetEmployeeTrainingRequisitions(apiData))
    }
  
    const actionButton = (
      <>
        <PermissionCheck permission={DEFINED_PERMISSIONS.HODApprove}>
          <CTAButtons onClick={() => navigate("add")}>
            Training Requisition
          </CTAButtons>
        </PermissionCheck>        
      </>
    );
    
  
    const filterBy = [
      {
        name: "All",
        filter: "all",
      },
      {
        name: "Pending",
        filter: 1,
      },
      {
        name: "Approved",
        filter: 0,
      },
      {
        name: "Declined",
        filter: 2,
      },
      {
        name: "Cancelled",
        filter: 3,
      },
    ];

    return (
      <div>
        <PageStyle
          title={"TRAINING MANAGEMENT"}
          hasBack={false}
          action={actionButton}
          isHeadLiner={true}
        />
        <PermissionCheck permission={DEFINED_PERMISSIONS.HODApprove}>
          <PageStyle          
            title={"All Training Requisitions"}
            support={"Training requisitions initiated by you..."}
            hasBack={false}
            isMain={true}
          >        
            <div 
              className={DashboardStyle.dashboard_filter}          
            >

              <SearchFilter
                text={setSearchQuery}
              />

              <ProDropFilter
                filter={filter}
                setFilter={setFilter}
                name={"Select Status"}
                filterBy={filterBy}
                value={filter}
              />

              <CalendarFilter2 name="Select Date Range" setStartDate={setStartDate} setEndDate={setEndDate} />
              
              <FilterButton name="" onClick={handleFilterButton} />
            </div>
            <div className={DashboardStyle.dashboard_table_holder}>
              <Table>
                <thead>
                  <tr> 
                    <th>Training Type</th>
                    <th>Initiator</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Approval Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <ReqTable 
                    data = {all_training_requisitions}
                    isLoading={isLoading}
                    handleCheckboxChange = {handleCheckboxChange}
                    checkboxState = {checkboxState}
                    apiData = {apiData}
                  />

                  {all_training_requisitions?.map((x) => (
                    <ReqTable {...x} isLoading={isLoading} />
                  ))}

                </tbody>
              </Table>
            </div>
            <Pagination
              last_page={all_emp_req?.totalNumberOfPages}
              present_page={all_emp_req?.currentPage}
              totalRows={all_emp_req?.pageSize}
              pageSize={pageSize}
              setPageSize={(page) => setPageSize(page)}
              click={(page) => setCurrentPage(page)}
            />
          </PageStyle>
        </PermissionCheck>       

        <PageStyle          
          title={"Training Beneficiary"}
          support={"Trainings you have been added as beneficiary"}
          hasBack={false}
          isMain={true}
        >        
          <div 
            className={DashboardStyle.dashboard_filter}          
          >

            <SearchFilter
              text={setSearchQuery}
            />

            <ProDropFilter
              filter={filter}
              setFilter={setFilter}
              name={"Select Status"}
              filterBy={filterBy}
              value={filter}
            />

            <CalendarFilter2 name="Select Date Range" setStartDate={setStartDate} setEndDate={setEndDate} />
            
            <FilterButton name="" onClick={handleFilterButton} />
          </div>
          <div className={DashboardStyle.dashboard_table_holder}>
            <Table>
              <thead>
                <tr>
                  <th>Training Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Approval Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <BeneficiaryTable 
                  data = {trainings}
                  isLoading={isLoading}
                  handleCheckboxChange = {handleCheckboxChange}
                  checkboxState = {checkboxState}
                  apiData = {apiData}
                />

                {trainings?.map((x) => (
                  <BeneficiaryTable {...x} isLoading={isLoading} />
                ))}

              </tbody>
            </Table>
          </div>
          <Pagination
            last_page={emp_req?.totalNumberOfPages}
            present_page={emp_req?.currentPage}
            totalRows={emp_req?.pageSize}
            pageSize={pageSize}
            setPageSize={(page) => setPageSize(page)}
            click={(page) => setCurrentPage(page)}
          />
        </PageStyle>        
      </div>      
    );
}

function BeneficiaryTable({
  apiData,
  data,
  checkboxState,
  handleCheckboxChange
}) {
  const navigate = useNavigate();

  return (
    <>
     {data?.map?.((item) => {

        const isApproved = item?.approvalStatus === "Approved" ? true : false
        const isDeclined = item?.approvalStatus === "Declined" ? true : false
        const isCanceled = item?.approvalStatus === "Cancel" ? true : false
       return (
         <tr key={item?.uuId}>
           <td>{item.trainingTypeName}</td>
           <td>{FormatDateTime(item.startDate, "ll")}</td>
           <td>{FormatDateTime(item.endDate, "ll")}</td>
           <td>
             <span
               style={{
                 textAlign: "center",
                 padding: "0.5rem",
                 borderRadius: "1rem",
                 fontSize: "0.875rem",
                 backgroundColor: item.approvalStatus === "Pending"
                   ? "#FFF1CF"
                   :  item.approvalStatus === "Approved"
                     ? "#DCFFC9"
                     : item.approvalStatus === "Declined"
                       ? "#FBE6E7"
                       : "",
                 color: item.approvalStatus === "Pending"
                   ? "#815103"
                   : item.approvalStatus === "Approved"
                     ? "#0F6308"
                     : item.approvalStatus === "Declined"
                       ? "#8A002B"
                       : "",
               }}
             >
               {" "}
               {item.approvalStatus}
             </span>
           </td>
           <td>
            <TableActions hasChildren={true} url={`${item?.uuId}/view`}></TableActions>              
           </td>
         </tr>
       );
     })}
    </>
  );
}

function ReqTable({
  apiData,
  data,
}) {
  const [setModalValue] = useState("");
  const { openModal, closeModal } = useApprovals({});
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
     {data?.map?.((item) => {

      const isApproved = item?.approvalStatus === "Approved" ? true : false
      const isDeclined = item?.approvalStatus === "Declined" ? true : false
      const isCanceled = item?.approvalStatus === "Cancel" ? true : false

       return (
         <tr key={item?.uuId}>
           <td>{item.trainingTypeName}</td>
           <td>{item.initiatorName}</td>
           <td>{FormatDateTime(item.startDate, "ll")}</td>
           <td>{FormatDateTime(item.endDate, "ll")}</td>
           <td>
             <span
               style={{
                 textAlign: "center",
                 padding: "0.5rem",
                 borderRadius: "1rem",
                 fontSize: "0.875rem",
                 backgroundColor: item.approvalStatus === "Pending"
                   ? "#FFF1CF"
                   :  item.approvalStatus === "Approved"
                     ? "#DCFFC9"
                     : item.approvalStatus === "Declined"
                       ? "#FBE6E7"
                       : "",
                 color: item.approvalStatus === "Pending"
                   ? "#815103"
                   : item.approvalStatus === "Approved"
                     ? "#0F6308"
                     : item.approvalStatus === "Declined"
                       ? "#8A002B"
                       : "",
               }}
             >
               {" "}
               {item.approvalStatus}
             </span>
           </td>
           <td>
             {isCanceled ? (
              <TableActions hasChildren={true} url={`${item?.uuId}/view`}></TableActions>
             ) :
             (isDeclined) ? (
              <TableActions hasChildren={true} url={`${item?.uuId}/view`}>
                {[
                  {
                    name: "Edit Training Requisition",
                    action: () => {
                      navigate(`./${item?.uuId}/edit`, { state: item });
                    },
                  },                  
                ]}
              </TableActions>
             ) : 
             ((!isApproved) ?(
             <TableActions hasChildren={true} url={`${item?.uuId}/view`}>
                {[
                  {
                    name: "Edit Training Requisition",
                    action: () => {
                        navigate(`./${item.uuId}/edit`, { state: item })
                    },
                  },
                  {
                    name: "Cancel Training Requisition",
                    action: () => {
                      openModal({
                        type: "suspend",
                        details: {
                          button: {
                            name: "Yes, Cancel",
                            color: "red",
                          },
                          commentIsOptional: true,
                          sendIsOptional: true,
                          title: "Cancel Report",
                          submitData: (data) => {
                            dispatch(
                              CancelTrainingRequest({
                                comment: data?.comments,
                                uuId: item.uuId,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetAllEmployeesTrainingRequisitions(apiData));
                            });
                          },
                        },
                      });
                      setIsOpen(!isOpen);
                      setModalValue("cancel");
                    },
                  },             
                ]}
              </TableActions>
             ) : (
              <TableActions url={`${item?.uuId}/view`}></TableActions>
             ))} 
           </td>
         </tr>
       );
     })}
    </>
  );
}
  
export default TrainingRequisitions;