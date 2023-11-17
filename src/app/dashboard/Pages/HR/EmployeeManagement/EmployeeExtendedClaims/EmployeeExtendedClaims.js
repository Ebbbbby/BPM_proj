import React, { useEffect, useState } from "react";
import Pagination from "../../../../Components/Pagination/Pagination";
import PageStyle from "../../../../Components/Layout/PageLayout";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../../Components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../../Components/Misc/Actions";
import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
import { URL } from "../../../../../../utils/routes";
import { GetEmployeeExtendedClaims } from "../../../../../../utils/redux/HR/HRSlice";
import { FormatCurrency } from "../../../../../../utils/functions/FormatCurrency";
import { useApprovals } from "../../../Fleets/Accident/useApprovals";
import {
  ApproveEmployeeClaims,
  DeclineEmployeeClaims,
} from "../../../../../../utils/redux/HR/HRSlice";
import {
  CalendarFilter,
  FilterButton,
  ProDropFilter,
  SearchFilter,
} from "../../../../Components/Search/Search";
import { useSearchFilter } from "../../../../../../utils/functions/useDate";

const EmployeeExtendedClaims = () => {
  const {
    searchText,
    filter,
    setSearchText,
    setFilter,

    date,
    setDate,
    findSearch,
  } = useSearchFilter({
    initialFilter: 1,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const { all_claims, isLoading } = useSelector((state) => state?.hr);

  useEffect(() => {
    dispatch(
      GetEmployeeExtendedClaims({ pageNumber: pageNumber, pageSize: pageSize })
    );
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
    <PageStyle
      title={"Employee Extended HMO Management"}
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
          data={all_claims}
          isLoading={isLoading}
        />
      </div>
      <Pagination
        last_page={all_claims?.responseObject?.previousPage}
        present_page={all_claims?.responseObject?.currentPage}
        totalRows={all_claims?.responseObject?.totalNumberOfPages}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default EmployeeExtendedClaims;

function AcqTable({ data, isLoading }) {
  const { openModal, closeModal } = useApprovals({});
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading === true) {
    return <p>Loading...</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          {/* <th>Patient Name</th> */}
          <th>Category</th>
          <th>Vendor</th>
          <th>Appointment Date </th>
          <th>Hospital</th>
          <th>Phone Number</th>
          <th>Amount</th>
          <th>Relationship</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.responseObject?.pageItems?.map?.((item, index) => (
          <tr key={index}>
            <td>{item?.beneficiaryCategory}</td>
            <td>{item?.vendorName || "Ebele"}</td>
            <td>{FormatDateTime(item?.dateOfAppointment)}</td>
            <td>{item?.hospitaName}</td>
            <td>{item?.phoneNumber}</td>
            <td> {FormatCurrency(item?.amount || "200")}</td>
            <td>{item?.relationship}</td>
            <td>{item?.status}</td>

            <td>
              <TableActions
                hasChildren={true}
                url={`../../../${URL.Employee}/${URL.My_Employee_Info}/${URL.Employee_Extended_Claim}/${item?.id}/view`}
              >
                {[
                  {
                    name: "Approve Employee Claims",
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
                              ApproveEmployeeClaims({
                                comment: data?.comments,
                                extendedHMOClaimsId: item.uuId,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(
                                GetEmployeeExtendedClaims({
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
                    name: "Decline Employee Claims",
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
                              DeclineEmployeeClaims({
                                comment: data?.comments,
                                extendedHMOClaimsId: item.id,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(
                                GetEmployeeExtendedClaims({
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
  );
}
