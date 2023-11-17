import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../Components/Misc/Actions";
import { GetAllFleets } from "../../../../../utils/redux/Fleet/FleetSlice";

function Fleets() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { all_fleets, isLoading } = useSelector((state) => state?.fleet);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let statusfilter = filter === "all" ? "" : filter

  let fleets = all_fleets?.pageItems;    
  fleets = fleets?.filter(row => row.driverName?.toLowerCase().includes(searchQuery.toLowerCase()) || row.fleetName.toLowerCase().includes(searchQuery.toLowerCase()) || row.fleetOwnerName.toLowerCase().includes(searchQuery.toLowerCase()));
  fleets = fleets?.filter(row => filter === filter || row.fleetType === parseInt(filter));

  console.log(fleets)

  useEffect(() => {
    dispatch(
      GetAllFleets({
        filter: statusfilter,
        pageSize: pageSize,
        currentPage: currentPage,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pageSize, currentPage, sort]);

  const filterBy = [
    {
      name: "All",
      filter: "all",
    },
    {
      name: "Status",
      filter: 0,
    },
    {
      name: "Pool",
      filter: 1,
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
      title={"Fleet Management"}
      hasBack={false}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearchQuery} />
        <ProDropFilter
          filter={sort}
          setFilter={setSort}
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
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>FleetName</th>
              <th>FleetOwner</th>
              <th>FleetDriver</th>
              <th>FleetType</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleets?.map((acq, index) => (
              <AcqTable
                {...acq}
                data={fleets}
                index={index}
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={fleets?.totalNumberOfPages}
        present_page={fleets?.currentPage}
        totalRows={fleets?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default Fleets;

function AcqTable({
  uuId,
  fleetName,
  fleetOwnerName,
  driverName,
  fleetType,
  index,
}) {
    const navigate = useNavigate();
  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{fleetName}</td>
        <td>{fleetOwnerName}</td>
        <td>{driverName}</td>
        <td>{fleetType}</td>
        <td>
        <TableActions hasChildren={true} url={`${uuId}/view`} >
        </TableActions>  
        </td>
      </tr>
    </>
  );
}