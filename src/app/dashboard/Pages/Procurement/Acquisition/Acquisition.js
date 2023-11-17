import React, { useState } from "react";
import { FiEdit2, FiEye, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import {
  CTAButtons,
  MoreButtons,
} from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import {
  ApproveModals,
  DeclineModals,
} from "../../../Components/Modals/ApproveDeclineModals";

function Acquisition() {
  const [filter, setFilter] = useState();
  const navigate = useNavigate();
  const [isDecline, setIsDecline] = useState(false);
  const [isApprove, setIsApprove] = useState(false);

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate(URL.Add_Acquitions)}>
        Add Acquisition
      </CTAButtons>
    </>
  );

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
      name: "Decline",
      filter: 2,
    },
  ];

  const sortBy = [
    {
      name: "Oldest to Newest",
      filter: "",
    },
    {
      name: "Newest to Oldest",
      filter: 0,
    },
    {
      name: "Ascending Order (A - Z)",
      filter: 1,
    },
    {
      name: "Descending Order (Z- A)",
      filter: 2,
    },
  ];
  return (
    <PageStyle
      title={"Asset Acquisition Management"}
      hasBack={false}
      action={actionButton}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter />
        <div className={DashboardStyle.dashboard_filters}>
          <ProDropFilter
            filter={filter}
            setFilter={setFilter}
            name={"Sort"}
            filterBy={sortBy}
          />
          <ProDropFilter
            filter={filter}
            setFilter={setFilter}
            name={"Filter"}
            filterBy={filterBy}
          />
        </div>
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <AcqTable
          isDecline={isDecline}
          setIsDecline={setIsDecline}
          isApprove={isApprove}
          setIsApprove={setIsApprove}
        />
      </div>
      {isDecline && (
        <DeclineModals
          isOpen={isDecline}
          setIsOpen={setIsDecline}
          topic={"Decline Requisition"}
          action={() => alert("success")}
        />
      )}
      {isApprove && (
        <ApproveModals
          isOpen={isApprove}
          setIsOpen={setIsApprove}
          topic={"Approve Requisition"}
          action={() => alert("success")}
        />
      )}
      <Pagination />
    </PageStyle>
  );
}

export default Acquisition;

function AcqTable({ isApprove, setIsApprove, isDecline, setIsDecline }) {
  const navigate = useNavigate();
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Created By</th>
          <th>Vendor</th>
          <th>Asset Type</th>
          <th>Asset Description</th>
          <th>Date Added</th>
          <th>Date Last Updated</th>
          <th>Asset Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>AA001</td>
          <td>Oluwasegun Owa</td>
          <td>Adsoft Technologies</td>
          <td>Computer</td>
          <td>
            HP 255 G8 Ryzen R3-3250U 4GB RAM 1TB HDD Win 10 With Bag - Black
            (34N19ES)
          </td>
          <td>01/12/2022</td>
          <td>01/12/2022</td>
          <td>Faulty</td>
          <td>
            <MoreButtons>
              <button
                onClick={() => setIsApprove(!isApprove)}
                className={DashboardStyle.more_action_button}
              >
                <FiThumbsUp color={"var(--success)"} /> <span>Approve</span>
              </button>
              <button
                onClick={() => setIsDecline(!isDecline)}
                className={DashboardStyle.more_action_button}
              >
                <FiThumbsDown color={"var(--error)"} /> <span>Decline</span>
              </button>
              <button
                onClick={() => navigate(URL.Add_Acquitions + "?type=edit")}
                className={DashboardStyle.more_action_button}
              >
                <FiEdit2 color={"var(--warning)"} />{" "}
                <span>Edit Asset Monitoring</span>
              </button>
              <button
                onClick={() => navigate(URL.View_Acquisition)}
                className={DashboardStyle.more_action_button}
              >
                <FiEye /> <span>View More Detail</span>
              </button>
            </MoreButtons>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
