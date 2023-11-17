import React, { useEffect, useState } from "react";
import { CalendarFilter2, FilterButton, ProDropFilter, SearchFilter } from "../../../Components/Search/Search";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Pagination from "../../../Components/Pagination/Pagination";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../Components/Table/Table";
import { GetQuerySetup } from "../../../../../utils/redux/HR/HRSlice";
import { useNavigate } from "react-router";
import { TableActions } from "../../../Components/Misc/Actions";
import { format } from "date-fns";

const QuerySetup = () => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let dateFrom =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let dateTo =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");

  const { get_querysetup, isLoading } = useSelector((state) => state.hr);
  console.log(get_querysetup)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetQuerySetup({ pageNumber: pageNumber, pageSize: pageSize,search:search, startDate: dateFrom,endDate: dateTo, }));
          // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  const actionButton = (
    <>
      <CTAButtons
        onClick={() => {
          navigate("add");
        }}
      >
        Add Setup
      </CTAButtons>
    </>
  );
  const handleFilterButton = () => {
    dispatch(GetQuerySetup({pageNumber: pageNumber, pageSize: pageSize,search:search, startDate: dateFrom,
      endDate: dateTo, }));
  };

  const filterBy = [
    {
      name: "All",
      filter: "all",
    },
    {
      name: "Low",
      filter: 1,
    },
    {
      name: "Medium",
      filter: 2,
    },
    {
      name: "High",
      filter: 3,
    },
  
  ];

  return (
    <PageStyle
      title={"Query SetUp"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearch} />

        <ProDropFilter
            filter={filter}
            setFilter={setFilter}
            name={"Select Severity"}
            filterBy={filterBy}
            value={filter}
          />
          <CalendarFilter2
          name="Select Date Range"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <FilterButton name="" onClick={() => handleFilterButton()} />


      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Escalate</th>
              <th>Probable Punishments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AcqTable data={get_querysetup} isLoading={isLoading}/>
              
            {get_querysetup?.data?.map((acq, index) => (
              <AcqTable
                {...acq}          
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_querysetup?.totalPages}
        present_page={get_querysetup?.currentPage}
        totalRows={get_querysetup?.pageSize}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default QuerySetup;

function AcqTable({ data }) {
  const navigate = useNavigate();

  return (
    <>
      {data?.result?.map((item, index) => (
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{item?.title}</td>
          <td>{item?.severity}</td>
          <td>{item?.escalate}</td>
          <td>
            {" "}
            <ul>
              {item?.probablePunishments.map((punishments) => (
                <li key={punishments?.queryTypeId}>
                  {punishments?.punishmentTypeEnum}
                </li>
              ))}
            </ul>
          </td>
          <td>
            <TableActions hasChildren={true} /*url={`${id}/view`}*/>
              {[
                {
                  name: "Edit Query Type",
                  action: () => {
                
                    navigate(`./${item.Id}/edit`, {state:item});
                  },
                },
              ]}
            </TableActions>
          </td>
        </tr>
      ))}
    </>
  );
}
