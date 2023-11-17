import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
  CalendarFilter,
} from "../../../Components/Search/Search";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { useSearchFilter } from "../../../../../utils/functions/useDate";
import TabComponent from "../../HR/EmployeeManagement/TabComponent";
import "../../HR/EmployeeManagement/TabComponent.css";
import { GetSingleEmployee } from "../../../../../utils/redux/Employee/EmployeeSlice";
import MyNOKInformation from "../Employee/NOKUpdate/MyNOKInformation";
import EmployeeQualification from "../EmployeeQualification/EmployeeQualification";
import MyMedicalRequisition from "../EmployeeMedicalRequisition/MyMedicallRequisition";
import EmployeeReferee from "../EmployeeReferee/EmployeeReferee";
import EmployeeExtendedClaim from "../EmployeeExtendedClaim/EmployeeExtendedClaim";
function MyEmployeeInfo() {
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

  const { get_single_employee, } = useSelector(
    (state) => state?.employee
  );


  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(GetSingleEmployee());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actionButton = (
    <>
      {/* <CTAButtons onClick={() => setOpenModal(!openModal)}>
          Onboard Vendor
        </CTAButtons> */}
    </>
  );

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
      title={"Employee Information"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <TabComponent>
        <div label="Personal Data">
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
                  <th>Full Name</th>
                  <th>Title </th>
                  <th>Gender</th>
                  <th>Date Of Birth</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>{" "}
              <tbody>
                <tr key={get_single_employee?.responseObject?.id}>
                  <td>
                    {get_single_employee?.responseObject?.firstName +
                      " " +
                      get_single_employee?.responseObject?.otherName +
                      " " +
                      get_single_employee?.responseObject?.surname}
                  </td>
                  <td>{get_single_employee?.responseObject?.title}</td>
                  <td>{get_single_employee?.responseObject?.gender}</td>
                  <td>
                    {FormatDateTime(get_single_employee?.responseObject?.dateOfBirth, "ll")}
                  </td>
                  <td>{get_single_employee?.responseObject?.phoneNumber}</td>
                  <td>
                    <TableActions hasChildren={true} url={`${get_single_employee?.responseObject?.uuId}/view`}>
                      {[
                        {
                          name: "Edit Employee Information ",
                          action: () => {
                            navigate(`${get_single_employee?.responseObject?.uuId}/edit`, {
                              state: get_single_employee?.responseObject,
                            });
                          },
                        },
                      ]}
                    </TableActions>
                  </td>
                </tr>
              </tbody>
            </Table>
            {/* <AcqTable
          // action={action}
          data={get_single_employee}
          isLoading={isLoading}
        /> */}
          </div>
     
        </div>
        <div label="NOK / Beneficiary">
          <MyNOKInformation />
        </div>
        <div label="Medical/Hospital">
          <MyMedicalRequisition />
        </div>
        <div label="Extend HMO Claims">
        <EmployeeExtendedClaim/>
        </div>
        <div label="Qualification/Certification">
          <EmployeeQualification />
        </div>
      
        <div label="Refrees">
        <EmployeeReferee/>
        </div>
        
      </TabComponent>
    </PageStyle>
  );
}

export default MyEmployeeInfo;

// function AcqTable({ data, isLoading }) {
//   console.log({ data });
//   const navigate = useNavigate();

//   if (isLoading === true) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <Table>
//       <thead>
//         <tr>
//           <th>Full Name</th>
//           <th>Title </th>
//           <th>Gender</th>
//           <th>Date Of Birth</th>
//           <th>Phone Number</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr key={data?.responseObject?.id}>
//           <td>
//             {data?.responseObject?.firstName +
//               " " +
//               data?.responseObject?.otherName +
//               " " +
//               data?.responseObject?.surname}
//           </td>
//           <td>{data?.responseObject?.title}</td>
//           <td>{data?.responseObject?.gender}</td>
//           <td>{FormatDateTime(data?.responseObject?.dateOfBirth, "ll")}</td>
//           <td>{data?.responseObject?.phoneNumber}</td>
//           <td>
//             <TableActions>
//               {[
//                 {
//                   name: "Edit Employee Information ",
//                   action: () => {
//                     navigate(`${data?.responseObject?.id}/edit`, {
//                       state: data?.responseObject,
//                     });
//                   },
//                 },
//               ]}
//             </TableActions>
//           </td>
//         </tr>
//       </tbody>
//     </Table>
//   );
// }
