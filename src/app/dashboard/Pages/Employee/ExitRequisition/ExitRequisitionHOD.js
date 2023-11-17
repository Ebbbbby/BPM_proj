import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../Components/Table/Table";
import PageStyle from "../../../Components/Layout/PageLayout";
import { GetExitRequisitionHOD } from "../../../../../utils/redux/HR/HRSlice";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import Pagination from "../../../Components/Pagination/Pagination";
import { TableActions } from "../../../Components/Misc/Actions";
import {
  CalendarFilter2,
  FilterButton,
  ProDropFilter,
  SearchFilter,
} from "../../../Components/Search/Search";
import { format } from "date-fns";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
import { URL } from "../../../../../utils/routes";

const ExitRequisitionHOD = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [exitStatus, setExitStatus] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { get_exithod, isLoading } = useSelector((state) => state?.hr);
  const dispatch = useDispatch();
  const exit = exitStatus === null ? "" : exitStatus;
  let start =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let end =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");

  const apiData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    search: search,
    exitStatus: exit,
    startDate: start,
    endDate: end,
  };

  useEffect(() => {
    dispatch(GetExitRequisitionHOD(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, pageNumber]);

  const handleFilterButton = () => {
    dispatch(GetExitRequisitionHOD());
  };

  const filterBy = [
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
      name: "Cancel",
      filter: 3,
    },
  ];

  return (
    <PageStyle title={"Exit Requisition (HOD)"} hasBack={false} isMain={true}>
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearch} />
        {/* <div className={DashboardStyle.dashboard_filters}> */}
        <ProDropFilter
          filter={exitStatus}
          setFilter={setExitStatus}
          name={"Status"}
          filterBy={filterBy}
        />

        <CalendarFilter2
          name="Select Date Range"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <FilterButton onClick={() => handleFilterButton()} name="" />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Exit Date</th>
              <th>Exit Reason</th>
              <th>Exit Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <ExitTable isLoading={isLoading} getExit={get_exithod} />
            {get_exithod?.result?.map((exit) => (
              <ExitTable
                {...exit}
                key={exit?.id}
                isLoading={isLoading}
                setIsOpen={setOpenModal}
                isOpen={openModal}
                apiData={apiData}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_exithod?.totalPages}
        present_page={get_exithod?.currentPage}
        totalRows={get_exithod?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default ExitRequisitionHOD;

function ExitTable({ getExit }) {
const data = GetLocalStorage()
  return (
    <>
      {getExit?.result?.map((item) => (
        <tr key={item?.id}>
          <td>{data?.fullName}</td>
          <td>{FormatDateTime(item?.exitDate)}</td>
          <td>{item?.exitReason}</td>
          <td>{item?.exitStatus}</td>
          <td>
            <TableActions hasChildren={true} url={`../${URL?.Exit_Requisition}/${item?.id}/view`} />
          </td>
        </tr>
      ))}
    </>
  );
}
