import React, { useEffect, useState } from "react";
import Pagination from "../../../Components/Pagination/Pagination";
import PageStyle from "../../../Components/Layout/PageLayout";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { useNavigate } from "react-router";
import Table from "../../../Components/Table/Table";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../Components/Misc/Actions";
import { GetEmployeeReferee } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { URL } from "../../../../../utils/routes";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";

const EmployeeReferee = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employee_referee, isLoading } = useSelector(
    (state) => state?.employee
  )
  const user = GetLocalStorage();

  console.log(employee_referee)

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate(`../${URL.My_Employee_Info}/${URL.Employee_Referees}/${URL.Add_Employee_Referee}`)}>
        Add Referee
      </CTAButtons>
    </>
  );
  useEffect(() => {
    dispatch(
      GetEmployeeReferee({
        EmployeeId:user?.staffId,
        pageNumber: pageNumber,
        pageSize: 10000,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.staffId]);

  return (
    <PageStyle
    title={"Employee Refree"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >


      <div className={DashboardStyle.dashboard_table_holder}>
        <AcqTable
          // action={action}
          data={employee_referee}
          isLoading={isLoading}
        />
      </div>
      <Pagination
        last_page={employee_referee?.responseObject?.previousPage}
        present_page={employee_referee?.responseObject?.currentPage}
        totalRows={employee_referee?.responseObject?.totalNumberOfPages}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default EmployeeReferee;

function AcqTable({ data, isLoading }) {
  const navigate = useNavigate();

  if (isLoading === true) {
    return <p>Loading...</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>      
          <th>First Name</th>
          <th>Last Name </th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>City</th>
          <th>Relationship</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.responseObject?.pageItems?.map?.((item, index) => (
          <tr key={item?.id}>
            <td>{item?.index + 1}</td>
            <td>{item?.refFirstName || 'Ebele'}</td>
            <td>{item?.refLastName || "Self"}</td>
            <td> {item?.refEmail || "200"}</td>
            <td>{item?.refPhoneNumber}</td>
            <td>{item?.refCity}</td>
              <td>{item?.relationship}</td>
            <td>{item?.approvalStatus}</td>

            <td>
              <TableActions hasChildren={true} url={`${URL.Employee_Referees}/${item?.id}/view`}>
                {[
                  {
                    name: "Edit Referee ",
                    action: () => {
                      navigate(`${URL.Employee_Referees}/${item.id}/edit`, { state: item });
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
