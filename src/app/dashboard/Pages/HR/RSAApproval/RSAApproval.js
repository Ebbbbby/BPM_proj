import React from "react";
import Table from "../../../Components/Table/Table";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { TableActions } from "../../../Components/Misc/Actions";
import { SearchFilter, ProDropFilter } from "../../../Components/Search/Search";
import { GetAllEmployees } from "../../../../../utils/redux/HR/HRSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../../../Components/Pagination/Pagination";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Fleets/Requisition/RequisitionApproval/useApproval";
import { ApproveOrDecline } from "../../../../../utils/redux/HR/HRSlice";
const RSAApproval = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { all_employees, isLoadingEmployees } = useSelector(
    (state) => state?.hr
  );
  console.log({ all_employees });

  const dispatch = useDispatch();
  const apiData = {
    pageSize: pageSize,
    pageNumber: currentPage,
  };
  useEffect(() => {
    dispatch(GetAllEmployees(apiData));
  }, []);

  const filterBy = [
    {
      name: "All",
      filter: "",
    },
    {
      name: "Pending",
      filter: 0,
    },
    {
      name: "Approved",
      filter: 1,
    },
    {
      name: "Declined",
      filter: 2,
    },
  ];

  return (
    <PageStyle
      title={"RSA Linking Approval"}
      hasBack={false}
      action=""
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        {/* <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Filter"}
          filterBy={filterBy}
        /> */}
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th></th>

              <th>Full Name</th>
              <th>Pin</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Source</th>
              <th>Approval Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingEmployees
              ? "Loading.."
              : all_employees?.responseObject?.pageItems?.map((item) => (
                  <AppTable
                    {...item}
                    key={item.id}
                    data={all_employees}
                    apiData={apiData}
                    isLoadingEmployees={isLoadingEmployees}
                  />
                ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={all_employees?.responseObject?.totalNumberOfPages}
        present_page={all_employees?.responseObject?.currentPage}
        totalRows={all_employees?.responseObject?.pageSize}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
};

export default RSAApproval;

function AppTable({
  id,
  pin,
  firstName,
  surname,
  personalEmail,
  phoneNumber,
  dateOfBirth,
  modeOfRegistration,
  approvalStatus,
  data,
  apiData,
}) {
  const { openModal, closeModal } = useApprovals({});
  const dispatch = useDispatch();

  return (
    <>
      <tr>
        <td>
          <input type="checkbox" />
        </td>

        <td>{firstName + " " + surname}</td>
        <td>{pin}</td>
        <td>{personalEmail}</td>
        <td>{phoneNumber}</td>
        <td>{FormatDateTime(dateOfBirth)}</td>
        <td>{modeOfRegistration}</td>
        <td style={{ textAlign: "center" }}>
          <span
            style={{
              textAlign: "center",
              padding: "0.5rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              backgroundColor:
                approvalStatus === "Pending"
                  ? "#FFF1CF"
                  : approvalStatus === "Approved"
                  ? "#DCFFC9"
                  : approvalStatus === "Declined"
                  ? "#FBE6E7"
                  : "",
              color:
                approvalStatus === "Pending"
                  ? "#815103"
                  : approvalStatus === "Approved"
                  ? "#0F6308"
                  : approvalStatus === "Declined"
                  ? "#8A002B"
                  : "",
            }}
          >
            {approvalStatus}
          </span>
        </td>
        <td>
          <TableActions hasChildren={true} url={`${id}/view`}>
            {[
              {
                name: "Approve",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Yes, Approve",
                        color: "",
                      },
                      title: "Approve",
                      submitData: (data) => {
                        dispatch(
                          ApproveOrDecline({
                            comment: data?.comments,
                            id: +id,
                            emailTrigger: true,
                          })
                        )?.then((res) => {
                          console.log(res);
                          closeModal();
                          dispatch(GetAllEmployees(apiData));
                        });
                      },
                    },
                  });
                },
              },
              {
                name: "Decline",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Yes, Decline",
                        color: "",
                      },
                      title: "Decline",
                      submitData: (data) => {
                        dispatch(
                          ApproveOrDecline({
                            comment: data?.comments,
                            id: +id,
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetAllEmployees(apiData));
                        });
                      },
                    },
                  });
                },
              },
            ]}
          </TableActions>
        </td>
      </tr>
    </>
  );
}
