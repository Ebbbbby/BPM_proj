import React from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { FiExternalLink } from "react-icons/fi";
import { useApprovals } from "../../../Pages/Vendors/VendorApprovals/useApprovals";

function ProcessingStages(props) {
  const { openModal, closeModal } = useApprovals({});

  const handleClick = () => {
    openModal({
      type: "approve",
      details: {
        button: {
          name: "Yes, Approve",
          color: "",
        },
        // isLoading: isLoading,
        isProcessingStages: true,
        sendIsOptional: false,
        commentIsOptional: false,
        title: "Approve Account",
        // submitData: (data) => {
        //   dispatch(
        //     ApproveVendorAction({
        //       comment: data?.comments,
        //       requestId: vendor?.requestId,
        //       emailTrigger: data?.send,
        //       designation: verifyUserApprovalLevel()?.authorizedPVM ? 1 : 0,
        //     })
        //   )?.then((res) => {
        //     closeModal();
        //     dispatch(GetSingleVendor({ id }));
        //   });
        // },
      },
    });
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className={DashboardStyle.view_more_action_button}
    >
      <span>Preview Stage</span>{" "}
      <FiExternalLink className={DashboardStyle.view_more_action_button_icon} />
    </button>
  );
}

export default ProcessingStages;
