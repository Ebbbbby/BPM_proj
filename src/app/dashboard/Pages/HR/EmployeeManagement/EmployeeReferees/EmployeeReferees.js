import React, { useEffect, useState } from "react";
import Pagination from "../../../../Components/Pagination/Pagination";
import PageStyle from "../../../../Components/Layout/PageLayout";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../../Components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../../Components/Misc/Actions";
import { GetAllReferees } from "../../../../../../utils/redux/HR/HRSlice";
import { URL } from "../../../../../../utils/routes";
import { useApprovals } from "../../../Vendors/VendorApprovals/useApprovals";
import { ApproveEmployeeReferee,DeclineEmployeeReferee } from "../../../../../../utils/redux/HR/HRSlice";


const EmployeeReferees = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const { all_referees, isLoading } = useSelector(
    (state) => state?.hr
  )


  const actionButton = (
    <>
      {/* <CTAButtons onClick={() => navigate(`../${URL.My_Employee_Info}/${URL.Employee_Referees}/${URL.Add_Employee_Referee}`)}>
        Add Referee
      </CTAButtons> */}
    </>
  );
  useEffect(() => {
    dispatch(
        GetAllReferees({
        pageNumber: pageNumber,
        pageSize: 10000,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageStyle
    title={"Employee Referees"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >


      <div className={DashboardStyle.dashboard_table_holder}>
        <AcqTable
          // action={action}
          data={all_referees}
          isLoading={isLoading}
        />
      </div>
      <Pagination
        last_page={all_referees?.responseObject?.previousPage}
        present_page={all_referees?.responseObject?.currentPage}
        totalRows={all_referees?.responseObject?.totalNumberOfPages}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default EmployeeReferees;

function AcqTable({ data, isLoading }) {
  const dispatch = useDispatch();
  
  const { openModal, closeModal } = useApprovals({});
  const [isOpen, setIsOpen] = useState(false);

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
            <td>{index + 1}</td>
            <td>{item?.refFirstName || 'Ebele'}</td>
            <td>{item?.refLastName || "Self"}</td>
            <td> {item?.refEmail || "200"}</td>
            <td>{item?.refPhoneNumber}</td>
            <td>{item?.refCity}</td>
              <td>{item?.relationship}</td>
            <td>{item?.approvalStatus}</td>

            <td>
              <TableActions hasChildren={true} url={`../../${URL.Employee}/${URL.My_Employee_Info}/${URL.Employee_Referees}/${item?.id}/view`}>
                {[
                      {
                        name: "Approve Referee",
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
                                    ApproveEmployeeReferee({
                                    comment: data?.comments,
                                    refereeId: item.id,
    
                                  
                                  })
                                )?.then((res) => {
                                  closeModal();
                                  dispatch(GetAllReferees({pageSize:1, pageNumber:10000}));
                                });
                              },
                            },
                          });
                          setIsOpen(!isOpen);
                        },
                      },
                      {
                        name: "Decline Referee",
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
                                  DeclineEmployeeReferee({
                                    comment: data?.comments,
                                    refereeId: item.id,

    
                                
                                  })
                                )?.then((res) => {
                                  closeModal();
                                  dispatch(GetAllReferees({pageSize:1, pageNumber:10000}));
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
