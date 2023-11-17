import React, { useEffect, useState } from "react";
import Pagination from "../../../../Components/Pagination/Pagination";
import PageStyle from "../../../../Components/Layout/PageLayout";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../../Components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../../Components/Misc/Actions";
import { URL } from "../../../../../../utils/routes";
import {
  ApproveEmployeeQualification,
  DeclineEmployeeQualification,
  GetEmployeeQualifications,
} from "../../../../../../utils/redux/HR/HRSlice";
import { useApprovals } from "../../../Vendors/VendorApprovals/useApprovals";

const EmployeeQualifications = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();
  const { all_qualification, isLoading } = useSelector((state) => state?.hr);



  const actionButton = (
    <>
      {/* <CTAButtons onClick={() => navigate(`${URL.Employee_Qualification}/${URL.Add_Employee_Qualification}`)}>
              Add Qualification
            </CTAButtons> */}
    </>
  );
  useEffect(() => {
    dispatch(
      GetEmployeeQualifications({ pageNumber: pageNumber, pageSize: 10000 })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageStyle
      title={"Employee Qualification Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_table_holder}>
        <AcqTable
          // action={action}
          data={all_qualification}
          isLoading={isLoading}
        />
      </div>
      <Pagination
        last_page={all_qualification?.responseObject?.totalNumberOfPages}
        present_page={all_qualification?.responseObject?.currentPage}
        totalRows={all_qualification?.responseObject?.previousPage}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default EmployeeQualifications;

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
          <th>#</th>
          <th>Institute Name</th>
          <th>Qualification</th>
          <th>Qualification Type</th>
          <th>Approval Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.responseObject?.pageItems?.map?.((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item?.instituteName}</td>
            <td>{item?.qualificationName}</td>
            <td>{item?.qualificationType}</td>
            <td>{item?.approvalStatus}</td>
            <td>
              <TableActions
                hasBack={true}
                url={`../../${URL.Employee}/${URL.My_Employee_Info}/${URL.Employee_Qualification}/${item.id}/view`}
              >
                {[
                  {
                    name: "Approve Employee Qualification",
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
                              ApproveEmployeeQualification({
                                certId: item.id,
                                comment: data?.comment,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(
                                GetEmployeeQualifications({
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
                    name: "Decline Employee Qualification",
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
                              DeclineEmployeeQualification({
                                certId: item.id,
                                comment: data?.comment,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(
                                GetEmployeeQualifications({
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
