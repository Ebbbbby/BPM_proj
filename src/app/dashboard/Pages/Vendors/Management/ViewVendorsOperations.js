import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveVendorAction,
  BlackListVendor,
  DeclineVendorAction,
  GetSingleVendor,
  SuspendVendorAction,
} from "../../../../../utils/redux/Vendor/VendorSlice";
import { useNavigate, useParams } from "react-router";
import { PageActions } from "../../../Components/Misc/Actions";
import { useApprovals } from "../VendorApprovals/useApprovals";
import SetUpVendor from "./SetUpVendors";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
import { usePermissions } from "../../../../../utils/functions/GetMyPermissions";

const Authorized_Actions = ["Approve Account", "Decline Account"];

const STATUS = {
  APPROVED: "Approved",
  DECLINED: "Declined",
  SUSPENDED: "Suspended",
  BLACKLISTED: "Blacklist",
  INITIATED: "Initiated",
  PROCESSING: "Pending",
};

const APPROVAL_PERSONS = {
  PVM: "PVM",
  SVM: "SVM",
};

const findState = (data) => {
  const stat = (search) => {
    if (search.includes(data)) {
      return true;
    }
    return false;
  };

  return { stat };
};

function ViewVendorOperations(props) {
  const [displayStatus, setDisplayStatus] = useState(true);
  const { staffId, isHod, isHeadOfUnit } = GetLocalStorage();

  const { userPermissions } = usePermissions();
  const isSVM = userPermissions.includes(
    DEFINED_PERMISSIONS.SeniorVendorManager
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { all_vendors, isLoading, all_departments } = useSelector(
    (state) => state?.vendor
  );
  const vendor = all_vendors?.responseObject;

  const { id } = useParams();

  const { openModal, closeModal } = useApprovals({});
  const [openSetUpModal, setOpenSetUpModal] = useState(false);

  const { stat } = findState(vendor?.registrationState);

  const Actions = () => {
    const hasSetUp = vendor?.managingDepartment?.length !== 0;

    const verifyUserApprovalLevel = () => {
      let userId = staffId;
      const PVM = vendor?.managingDepartment?.[0]?.id;
      const SVM = vendor?.managingDepartment?.[0]?.departmentUnit?.id;

      const fetchPVM = all_departments?.responseObject?.pageItems?.find(
        (x) => PVM === x?.id
      );

      const fetchSVM = fetchPVM?.containers?.find((x) => SVM === x?.id);

      const authorizedSVM = [
        // fetchSVM?.hocId, 5
        fetchSVM?.alternativeHOCId,
        5,
      ]?.includes(5);

      const authorizedPVM = [
        fetchPVM?.hodId,
        fetchPVM?.alternativeHODId,
      ]?.includes(userId);

      // if (isHod === false && isHeadOfUnit === false) {
      //   return {
      //     status: false,
      //   };
      // }

      return {
        status: true,
        authorizedPVM,
        authorizedSVM,
        // checkNextApproval: checkNextApproval(),
      };
    };

    useEffect(() => {
      const checkNextApproval = () => {
        const successfulApprovals = vendor?.setupApproval?.map(
          (approval) => approval?.designation
        );

        console.log("kkk", successfulApprovals?.includes(APPROVAL_PERSONS.SVM));

        const presentState = () => {
          if (
            successfulApprovals?.includes(APPROVAL_PERSONS.SVM) === true &&
            successfulApprovals?.includes(APPROVAL_PERSONS.PVM) === true
          ) {
            setDisplayStatus(false);
          }

          if (
            successfulApprovals?.includes(APPROVAL_PERSONS.SVM) === false &&
            successfulApprovals?.includes(APPROVAL_PERSONS.PVM) === false &&
            isSVM !== true
          ) {
            setDisplayStatus(true);
          }
          if (
            successfulApprovals?.includes(APPROVAL_PERSONS.SVM) === false &&
            successfulApprovals?.includes(APPROVAL_PERSONS.PVM) === true &&
            isSVM === true
          ) {
            setDisplayStatus(false);
          }

          // if (
          //   successfulApprovals?.includes(APPROVAL_PERSONS.SVM) !== true &&
          //   isSVM !== true
          // ) {
          //   setDisplayStatus(true);
          // }

          // if (
          //   successfulApprovals?.includes(APPROVAL_PERSONS.PVM) === true &&
          //   isSVM !== true
          // ) {
          //   setDisplayStatus(false);
          // }

          // console.log(
          //   successfulApprovals?.includes(APPROVAL_PERSONS.SVM) &&
          //     userPermissions.includes(DEFINED_PERMISSIONS.SeniorVendorManager),
          //   successfulApprovals?.includes(APPROVAL_PERSONS.SVM),
          //   userPermissions.includes(DEFINED_PERMISSIONS.SeniorVendorManager)
          // );

          // return setDisplayStatus(false);
        };
        console.log({ successfulApprovals });

        return presentState();
      };

      checkNextApproval();
    }, []);

    verifyUserApprovalLevel();

    console.log(verifyUserApprovalLevel(), displayStatus);

    const values = [
      {
        name: "Setup Account",
        action: () => setOpenSetUpModal(!openSetUpModal),
        condition: stat([STATUS.INITIATED, STATUS.DECLINED, STATUS.PROCESSING]),
      },
      {
        name: "Edit Details",
        condition: stat([STATUS.INITIATED, STATUS.DECLINED, STATUS.PROCESSING]),
        action: () => navigate(`../${id}/edit`, { state: vendor }),
        permissions: DEFINED_PERMISSIONS.VendorCreate,
      },
      {
        name: "Approve Account (SVM)",
        condition: stat([STATUS.SUSPENDED, STATUS.INITIATED, STATUS.DECLINED]),
        action: () => {
          openModal({
            type: "approve",
            details: {
              button: {
                name: "Yes, Approve",
                color: "",
              },
              isLoading: isLoading,
              sendIsOptional: false,
              commentIsOptional: false,
              title: "Approve Account",
              submitData: (data) => {
                dispatch(
                  ApproveVendorAction({
                    comment: data?.comments,
                    requestId: vendor?.requestId,
                    emailTrigger: data?.send,
                    designation: 0,
                  })
                )?.then((res) => {
                  closeModal();
                  dispatch(GetSingleVendor({ id }));
                });
              },
            },
          });
        },
        permissions: DEFINED_PERMISSIONS.SeniorVendorManager,
      },
      {
        name: "Approve Account (PVM)",
        condition: stat([STATUS.PROCESSING]),
        action: () => {
          openModal({
            type: "approve",
            details: {
              button: {
                name: "Yes, Approve",
                color: "",
              },
              isLoading: isLoading,
              sendIsOptional: false,
              commentIsOptional: false,
              title: "Approve Account",
              submitData: (data) => {
                dispatch(
                  ApproveVendorAction({
                    comment: data?.comments,
                    requestId: vendor?.requestId,
                    emailTrigger: data?.send,
                    designation: 1,
                  })
                )?.then((res) => {
                  closeModal();
                  dispatch(GetSingleVendor({ id }));
                });
              },
            },
          });
        },
        permissions: DEFINED_PERMISSIONS.PrimaryVendorManager,
      },
      {
        name: "Decline Account",
        condition: stat([STATUS.INITIATED, STATUS.PROCESSING]),
        action: () => {
          openModal({
            type: "decline",
            details: {
              button: {
                name: "Yes, Decline",
                color: "red",
              },
              commentIsOptional: true,
              sendIsOptional: true,
              title: "Decline Account",
              submitData: (data) => {
                dispatch(
                  DeclineVendorAction({
                    comment: data?.comments,
                    requestId: vendor?.requestId,
                    emailTrigger: data?.send,
                    isLoading: isLoading,
                  })
                )?.then((res) => {
                  closeModal();
                  dispatch(GetSingleVendor({ id }));
                });
              },
            },
          });
        },
        permissions: !userPermissions.includes(
          DEFINED_PERMISSIONS.SeniorVendorManager
        )
          ? DEFINED_PERMISSIONS.PrimaryVendorManager
          : DEFINED_PERMISSIONS.SeniorVendorManager,
      },
      {
        name: "Suspend Account",
        condition: stat([STATUS.APPROVED]),
        action: () => {
          openModal({
            type: "vendor_suspend",
            details: {
              button: {
                name: "Yes, Suspend",
                color: "red",
              },
              commentIsOptional: true,
              sendIsOptional: true,
              title: "Suspend Account",
              submitData: (data) => {
                dispatch(
                  SuspendVendorAction({
                    comment: data?.comments,
                    requestId: vendor?.requestId,
                    emailTrigger: data?.send,
                    isLoading: isLoading,
                    numOfDays: +data?.numOfDays,
                  })
                )?.then((res) => {
                  closeModal();
                  dispatch(GetSingleVendor({ id }));
                });
              },
            },
          });
        },
        permissions: DEFINED_PERMISSIONS.VendorManager,
      },

      {
        name: "Blacklist Account",
        condition: stat([STATUS.APPROVED, STATUS.SUSPENDED])
          ? true
          : // : vendor?.performance?.projectStartDate
            // ? true
            false,
        action: () => {
          openModal({
            type: "blacklist",
            details: {
              button: {
                name: "Yes, Blacklist",
                color: "red",
              },
              commentIsOptional: true,
              sendIsOptional: true,
              title: "Blacklist Account",
              submitData: (data) => {
                dispatch(
                  BlackListVendor({
                    comment: data?.comments,
                    requestId: vendor?.requestId,
                    emailTrigger: data?.send,
                    isLoading: isLoading,
                  })
                )?.then((res) => {
                  closeModal();
                  dispatch(GetSingleVendor({ id }));
                });
              },
            },
          });
        },
        permissions: DEFINED_PERMISSIONS.VendorManager,
      },
      {
        name: "Appraise Vendor",
        condition: stat([STATUS.APPROVED, STATUS.SUSPENDED, STATUS.BLACKLISTED])
          ? true
          : false,
        action: () => navigate(`../${id}/appraise/create`, { state: vendor }),
        permissions: DEFINED_PERMISSIONS.PerformanceAdd,
      },
    ];

    if (hasSetUp === false) {
      const actions_for_vendors_without_setup = values.filter(
        (x) => x?.name === "Setup Account"
      );
      return actions_for_vendors_without_setup;
    }

    // if (verifyUserApprovalLevel()?.status === true) {
    //   const results = values.filter((element) => {
    //     if (!Authorized_Actions.includes(element?.name)) {
    //       return true;
    //     }
    //     return false;
    //   });

    //   console.log(results);

    //   return results;
    // }

    // if (verifyUserApprovalLevel()?.status === false) {
    //   const results = values.filter((element) => {
    //     if (Authorized_Actions.includes(element?.name)) {
    //       return true;
    //     }
    //     return false;
    //   });

    //   console.log(results);

    //   return results;
    // }

    console.log({ values });
    return values;
  };
  return (
    <>
      <PageActions>{Actions()}</PageActions>
      <SetUpVendor
        openModal={openSetUpModal}
        setOpenModal={setOpenSetUpModal}
        vendor={vendor}
      />
    </>
  );
}

export default ViewVendorOperations;
