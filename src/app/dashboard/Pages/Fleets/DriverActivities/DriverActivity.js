import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { TableActions } from "../../../Components/Misc/Actions";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { SearchFilter, FilterButton } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import { FiCalendar } from "react-icons/fi";

import {
  GetMyDriverActivity,
  GetAllFleets,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'

const DriverActivity = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [dateSelected, setDateSelected] = useState(new Date());
  const { driver_activity, isLoadingActivity } = useSelector(
    (state) => state?.fleet
  );


  let request = driver_activity?.data;
  //console.log(driver_activity);

  let date =
  dateSelected === undefined
      ? ""
      : format(new Date(dateSelected), "yyyy-MM-dd");

  

  // useEffect(() => {
  //   // console.log("DATE FROM", dateFrom)
  //   console.log("DATE ", date)
  //   return () => {};
  // }, [date]);

  request = request?.filter((row) => {
    if (!dateSelected) {
      return false;
    }
    const rowDate = new Date(row.dateOfAssignment);
    return rowDate === dateSelected;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiData = {
    pageNumber: pageNumber,
    perPage: perPage,
    dateSelected: date,
  };

  useEffect(() => {
    dispatch(GetMyDriverActivity(apiData));
    dispatch(GetAllFleets({ pageNumber: 1, perPage: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, perPage, dateSelected, search]);

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate("add")}>Create New</CTAButtons>
    </>
  );

  return (
    <PageStyle
      title={"Driver Activities"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearch} />
         <div>
      <label htmlFor="date">Select Date</label>
         <DatePicker
          selected={dateSelected}
          onChange={(date) => setDateSelected(date) }
        />
        <FiCalendar className="calendarIcon"/>
         </div>
       
        <FilterButton name="" />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Asset ID</th>
              <th>Driver Name</th>
              <th>Vehicle Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            <RequestTable
              isLoadingActivity={isLoadingActivity}
              data={driver_activity}
            />
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={driver_activity?.metaData?.totalPages}
        present_page={driver_activity?.metaData?.page}
        totalRows={driver_activity?.metaData?.total}
        pageSize={perPage}
        setPerPage={(page) => setPerPage(page)}
        click={(page) => setPageNumber(page)}
      />
      <AppModalTemplate
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      ></AppModalTemplate>
    </PageStyle>
  );
};

export default DriverActivity;

function RequestTable({ data, isLoadingActivity }) {


  if (isLoadingActivity === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {data?.data?.map((item, index) => {
        return (
          <tr key={item?.id}>
            <td>{item?.id}</td>
            <td>{item?.assetId}</td>
            <td>{item?.driverName}</td>
            <td>{item?.vehicleName}</td>
            <td>{item?.source}</td>
            <td>{item?.destination}</td>
            <td>{FormatDateTime(item?.dateOfAssignment, "ll")}</td>
            <td>
              <TableActions
                hasChildren={true}
                url={`${item?.id}/view`}
              ></TableActions>
            </td>
          </tr>
        );
      })}
    </>
  );
}
