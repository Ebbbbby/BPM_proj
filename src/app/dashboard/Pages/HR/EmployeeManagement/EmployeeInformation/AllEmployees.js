import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../../Components/Layout/PageLayout";
import Table from "../../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
  CalendarFilter,
} from "../../../../Components/Search/Search";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../../Components/Misc/Actions";
import { useSearchFilter } from "../../../../../../utils/functions/useDate";
import {
  GetAllEmployees,
  GetEmployees,
} from "../../../../../../utils/redux/HR/HRSlice";
import { useApprovals } from "../../../Vendors/VendorApprovals/useApprovals";
import {
  ApproveEmployeeInformation,
  DeclineEmployeeInformation,
} from "../../../../../../utils/redux/HR/HRSlice";
import { URL } from "../../../../../../utils/routes";
import TabComponent from "../TabComponent";
import MedicalRequisition from "../MedicalUpdate/MedicalRequisition";
import EmployeeExtendedClaims from "../EmployeeExtendedClaims/EmployeeExtendedClaims";
import EmployeeQualifications from "../EmployeeQualification/EmployeeQualifications";
import NOKInformation from "../NOKUpdate/NOKInformation";
import EmployeeReferees from "../EmployeeReferees/EmployeeReferees";

const AllEmployees = () => {
  const {
    searchText,
    filter,
    setSearchText,
    setFilter,
    pageSize,
    setPageSize,
    setCurrentPage,
    date,
    setDate,
    findSearch,
  } = useSearchFilter({
    initialFilter: 1,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all_employees } = useSelector((state) => state?.hr);

  const { openModal, closeModal } = useApprovals({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(GetAllEmployees({ pageSize: 1000, pageNumber: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    <>
      <PageStyle title={"Employee Information"} hasBack={false} isMain={true}>
        <TabComponent>
          <div label="Employee Data">
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
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Title </th>
                    <th>Gender</th>
                    <th>Date Of Birth</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {all_employees?.result?.map((item, index) => (
                    <tr key={item?.id}>
                      <td>{index + 1 + "."}</td>
                      <td>
                        {item?.firstName +
                          " " +
                          item?.otherName +
                          " " +
                          item?.surname}
                      </td>
                      <td>{item?.title}</td>
                      <td>{item?.gender}</td>
                      <td>{FormatDateTime(item?.dateOfBirth, "ll")}</td>
                      <td>{item?.phoneNumber}</td>
                      <td>
                        <TableActions
                          hasChildren={true}
                          url={`../../${URL.Employee}/${URL.My_Employee_Info}/${item?.uuId}/view`}
                        >


                          {[
                            {
                              name: "Edit Employee Information ",
                              action: () => {
                                navigate(`$../../../../${URL.Employee}/${URL.My_Employee_Info}/${item?.uuId}/edit`, { state: item });
                              },
                            },
                            {
                              name: "Approve Employee Information",
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
                                        ApproveEmployeeInformation({
                                          comment: data?.comments,
                                          employeeUUId: item.uuId,
                                        })
                                      )?.then((res) => {
                                        closeModal();
                                        dispatch(
                                          GetEmployees({
                                            pageSize: 1,
                                            pageNumber: 10000,
                                          })
                                        );
                                      });
                                    },
                                  },
                                });
                                setIsOpen(!isOpen);
                              },
                            },
                            {
                              name: "Decline Employee Information",
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
                                        DeclineEmployeeInformation({
                                          comment: data?.comments,
                                          employeeUUId: item.uuId,
                                        })
                                      )?.then((res) => {
                                        closeModal();
                                        dispatch(
                                          GetEmployees({
                                            pageSize: 1,
                                            pageNumber: 10000,
                                          })
                                        );
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
            </div>
          </div>

          <div label="NOK Mgt">
            <NOKInformation />
          </div>
          <div label="Medical Mgt">
            <MedicalRequisition />
          </div>
          <div label=" HMO Claims Management">
            <EmployeeExtendedClaims />
          </div>
          <div label="Qualification Management">
            <EmployeeQualifications />
          </div>
          <div label="Referres Management">
            <EmployeeReferees />
          </div>
        </TabComponent>

        <Pagination
          last_page={all_employees?.totalPages}
          present_page={all_employees?.currentPage}
          totalRows={all_employees?.totalRows}
          pageSize={pageSize}
          setPageSize={(page) => setPageSize(page)}
          click={(page) => setCurrentPage(page)}
        />
      </PageStyle>
    </>
  );
};
export default AllEmployees;


