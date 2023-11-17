import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter, ActionButton, FilterButton, CalendarFilter2 } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ApproveModals } from "../../../Components/Modals/ApproveDeclineModals";
import { TableActions } from "../../../Components/Misc/Actions";
import {
    CTAButtons
} from "../../../../global/components/Buttons/buttons";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { format } from "date-fns";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { ApproveOrDeclineBatchTrainingRequest, ApproveTrainingRequest, CancelTrainingRequest, DeclineTrainingRequest, GetAllEmployeesTrainingRequisitions } from "../../../../../utils/redux/HR/HRSlice";

function TrainingRequisitions() {

    const [filter, setFilter] = useState('all');
    const [action, setAction] = useState();
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { all_emp_req, isLoading } = useSelector((state) => state?.hr);
    const { comments, requestId } = useSelector((state) => state?.global);
    const [selectAll, setSelectAll] = useState(false);
    const [checkboxState, setCheckboxState] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let all_training_requisitions = all_emp_req?.pageItems.filter((x) => x.approvalStatus !== "Cancel")
    
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
      let filteredItems =  all_training_requisitions.filter((item) => item.approvalStatus === "Pending");
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

    const apiData = {
      searchQuery: searchQuery,
      action: action,
      filter: statusfilter,
      startDate: dateFrom,
      endDate: dateTo,
      pageSize: pageSize,
      currentPage: currentPage,
    };

    const batchApprovalData = {
      trainingIds: Object.keys(checkboxState),
      approvalStatus: parseInt(action)
    }

    useEffect(() => {
      dispatch(GetAllEmployeesTrainingRequisitions(apiData));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ pageSize, currentPage, action ]);

    const handleFilterButton = () => {
      dispatch(GetAllEmployeesTrainingRequisitions(apiData))
    }
  
    const actionButton = (
      <>
        <CTAButtons onClick={() => navigate("add")}>
          Training Requisition
        </CTAButtons>
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

    const actionTaken = [      
      {
        name: "Approve",
        filter: 0,
      },
      {
        name: "Decline",
        filter: 2,
      },
      {
        name: "Cancel",
        filter: 3,
      },
    ];

    return (
      <div>
        <PageStyle          
          title={"All Training Requisitions"}
          hasBack={false}
          // action={actionButton}
          isMain={true}
        >        
          <div 
            className={DashboardStyle.dashboard_filter}          
          >
            <ActionButton
              filter={filter}
              setFilter={setAction}
              name={"Action"}
              placeholder = {"Action"}
              filterBy={actionTaken}
              onChange={() =>{                  
                setAction(action=>{
                  batchApprovalData.approvalStatus = parseInt(action)
                  if(batchApprovalData.trainingIds.length > 0){
                    dispatch(ApproveOrDeclineBatchTrainingRequest(batchApprovalData)).then((res) => {
                      if (res?.payload?.successful === true) {
                        dispatch(GetAllEmployeesTrainingRequisitions(apiData));
                      }
                    })
                  }
                })             
              }}
            />

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
                  <th>
                    <input 
                        type="checkbox"
                        className={DashboardStyle.dashboard_table_check_input}
                        name="all"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                    />
                  </th> 
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
          <ApproveModals
            declineAction={() =>
              dispatch(
                DeclineTrainingRequest({
                  requestId: requestId,
                  comment: comments,
                })
              ).then((res) => {
                if (res?.payload?.successful === true) {
                  dispatch(GetAllEmployeesTrainingRequisitions(apiData));
                }
              })
            }
            approvalAction={() =>
              dispatch(
                ApproveTrainingRequest({
                  requestId: requestId,
                  comment: comments,
                })
              ).then((res) => {
                if (res?.payload?.successful === true) {
                  dispatch(GetAllEmployeesTrainingRequisitions(apiData));
                }
              })
            }
          />
        </PageStyle>
      </div>
      
    );
}

function ReqTable({
  apiData,
  data,
  checkboxState,
  handleCheckboxChange
}) {
  const [setModalValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { openModal, closeModal } = useApprovals({});
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
           <td>
              {isApproved || isDeclined || isCanceled ? (
                <input
                  type="checkbox"                  
                  onChange={() => handleCheckboxChange(item.uuId)}
                  className={DashboardStyle.dashboard_table_check_input}
                  style={{display:"none"}}
                />
                ) :
                (
                  <input
                    type="checkbox"
                    checked={checkboxState[item.uuId] || false}
                    onChange={(e) => handleCheckboxChange(item.uuId, e.target.checked)}
                    className={DashboardStyle.dashboard_table_check_input}
                  />
                )
              }  
           </td>
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
             {(isDeclined) ? (
              <TableActions hasChildren={true} url={`${item?.uuId}/view`}></TableActions>
             ) : 
             ((!isApproved) ?(
             <TableActions hasChildren={true} url={`${item?.uuId}/view`}>
                {[
                  {
                    name: "Approve Training Requisition",
                    action: () => {
                      openModal({
                        type: "suspend",
                        details: {
                          button: {
                            name: "Yes, Approve",
                            color: "",
                          },
                          commentIsOptional: false,
                          sendIsOptional: true,
                          title: "Approve Request",
                          submitData: (data) => {
                            dispatch(
                              ApproveTrainingRequest({
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
                      setModalValue("approve");
                    },
                  },
                  {
                    name: "Decline Training Requisition",
                    action: () => {
                      openModal({
                        type: "suspend",
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
                              DeclineTrainingRequest({
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
                      setModalValue("decline");
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