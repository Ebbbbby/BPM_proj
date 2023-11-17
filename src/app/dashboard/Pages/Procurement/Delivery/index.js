import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";

import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { GetProcDelivery } from "../../../../../utils/redux/Procurement/ProcurementSlice";
import { TableActions } from "../../../Components/Misc/Actions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import {
  ApproveAsset_Delivery,
  ApproveService_Delivery,
  ConfirmAsset_Delivery,
  DeclineAsset_Delivery,
  DeclineService_Delivery,
} from "../../../../../utils/redux/Assets/AssetSlice";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ProcDelivery() {
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [find, setFind] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoadingVendors } = useSelector((state) => state?.vendor);
  const { all_proc_requisitions } = useSelector((state) => state?.procurement);
  const dispatch = useDispatch();

  const apiData = {
    filter: filter,
    pageSize: pageSize,
    currentPage: currentPage,
    sort,
  };

  useEffect(() => {
    dispatch(GetProcDelivery(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, find]);

  const actionButton = <></>;

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

  const sortBy = [
    {
      name: "Oldest to Newest",
      filter: 0,
    },
    {
      name: "Newest to Oldest",
      filter: 1,
    },
    {
      name: "Ascending Order (A - Z)",
      filter: 2,
    },
    {
      name: "Descending Order (Z- A)",
      filter: 3,
    },
  ];
  return (
    <PageStyle
      title={"Delivery"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter />
        {/* <div className={DashboardStyle.dashboard_filters}> */}
        <ProDropFilter
          filter={sort}
          setFilter={setSort}
          name={"Sort"}
          filterBy={sortBy}
        />
        <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Status"}
          filterBy={filterBy}
        />
        <FilterButton onClick={() => setFind(!find)} name="" />
        {/* </div> */}
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              {/* <th>Register Id</th> */}
              <th>Procurement Type</th>
              <th>Vendor</th>
              <th>Specification</th>
              <th>Rating</th>
              <th>Asset Delivery</th>
              <th>Service Delivery</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {all_proc_requisitions?.result?.map((x) => (
              <AcqTable
                {...x}
                isLoadingVendors={isLoadingVendors}
                apiData={apiData}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={all_proc_requisitions?.totalPages}
        present_page={all_proc_requisitions?.currentPage}
        totalRows={all_proc_requisitions?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default ProcDelivery;

function AcqTable({
  vendor,
  specification,
  rating,
  assetDelivery,
  serviceDelivery,
  id,
  procurementType,
  apiData,
}) {
  const { openModal, closeModal } = useApprovals({});
  const dispatch = useDispatch();

  return (
    <>
      <tr>
        <td>{procurementType}</td>
        <td>{vendor}</td>
        <td>{specification}</td>
        <td>{rating}</td>
        <td style={{ textAlign: "center" }}>
          <span
            style={{
              textAlign: "center",
              padding: "0.5rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              backgroundColor:
                assetDelivery === "Initiated"
                  ? "#FFF1CF"
                  : assetDelivery === "Approved" ||
                    assetDelivery === "Confirmed"
                  ? "#DCFFC9"
                  : assetDelivery === "Rejected"
                  ? "#FBE6E7"
                  : "pink",
              color:
                assetDelivery === "Initiated"
                  ? "#815103"
                  : assetDelivery === "Approved" ||
                    assetDelivery === "Confirmed"
                  ? "#0F6308"
                  : assetDelivery === "Rejected"
                  ? "#8A002B"
                  : "",
            }}
          >
            {" "}
            {assetDelivery}
          </span>
        </td>
        <td style={{ textAlign: "center" }}>
          {serviceDelivery && (
            <span
              style={{
                textAlign: "center",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                backgroundColor:
                  serviceDelivery === "Initiated"
                    ? "#FFF1CF"
                    : serviceDelivery === "Approved" ||
                      serviceDelivery === "Confirmed"
                    ? "#DCFFC9"
                    : serviceDelivery === "Rejected"
                    ? "#FBE6E7"
                    : "pink",
                color:
                  serviceDelivery === "Initiated"
                    ? "#815103"
                    : serviceDelivery === "Approved" ||
                      serviceDelivery === "Confirmed"
                    ? "#0F6308"
                    : serviceDelivery === "Rejected"
                    ? "#8A002B"
                    : "",
              }}
            >
              {" "}
              {serviceDelivery}
            </span>
          )}
        </td>
        <td>
          <TableActions>
            {[
              {
                name: "Approve",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Yes, Approve",
                        color: "",
                      },
                      title: "Approve Delivery",
                      submitData: (data) => {
                        dispatch(
                          ApproveAsset_Delivery({
                            comment: data?.comments,
                            quotationId: id,
                            emailTrigger: true,
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetProcDelivery(apiData));
                        });
                      },
                    },
                  });
                },
                permissions: DEFINED_PERMISSIONS.DeliveryApprove,
              },
              {
                name: "Decline",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Yes, Decline",
                        color: "",
                      },
                      title: "Decline Delivery",
                      submitData: (data) => {
                        dispatch(
                          DeclineAsset_Delivery({
                            comment: data?.comments,
                            quotationId: id,
                            emailTrigger: true,
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetProcDelivery(apiData));
                        });
                      },
                    },
                  });
                },
                permissions: DEFINED_PERMISSIONS.DeliveryApprove,
              },
              {
                name: "Confirm Asset Delivery",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Yes, Confirm",
                        color: "",
                      },
                      title: "Confirm Aseet Delivery",
                      submitData: (data) => {
                        dispatch(
                          ConfirmAsset_Delivery({
                            comment: data?.comments,
                            quotationId: id,
                            emailTrigger: true,
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetProcDelivery(apiData));
                        });
                      },
                    },
                  });
                },
                permissions: DEFINED_PERMISSIONS.DeliveryConfirm,
              },

              {
                name: "Decline Service Delivery",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Yes, Confirm",
                        color: "",
                      },
                      title: "Decline Service Delivery",
                      submitData: (data) => {
                        dispatch(
                          DeclineService_Delivery({
                            comment: data?.comments,
                            quotationId: id,
                            emailTrigger: true,
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetProcDelivery(apiData));
                        });
                      },
                    },
                  });
                },
                permissions: DEFINED_PERMISSIONS.ServiceApprove,
              },
              {
                name: "Approve Service Delivery",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Yes, Confirm",
                        color: "",
                      },
                      title: "Approve Service Delivery",
                      submitData: (data) => {
                        dispatch(
                          ApproveService_Delivery({
                            comment: data?.comments,
                            quotationId: id,
                            emailTrigger: true,
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetProcDelivery(apiData));
                        });
                      },
                    },
                  });
                },
                permissions: DEFINED_PERMISSIONS.ServiceApprove,
              },
              // {
              //   name: "Rating",
              //   action: () => {
              //     openModal({
              //       type: "",
              //       details: {
              //         button: {
              //           name: "Yes, Confirm",
              //           color: "",
              //         },
              //         isRating: true,
              //         isRatingSupport: (
              //           <>
              //             <h1>A</h1>
              //           </>
              //         ),
              //         title: "Rating",
              //         submitData: (data) => {
              //           dispatch(
              //             ConfirmAsset_Delivery({
              //               comment: data?.comments,
              //               quotationId: id,
              //               emailTrigger: true,
              //             })
              //           )?.then((res) => {
              //             closeModal();
              //             dispatch(GetProcDelivery(apiData));
              //           });
              //         },
              //       },
              //     });
              //   },
              // },
            ]}
          </TableActions>
        </td>
        {/* <TableActions hasChildren={true} url={`1/view`} /> */}
      </tr>
    </>
  );
}
