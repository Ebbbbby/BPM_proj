import React from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import Doc from "../../../Images/doc.svg";
import { FiExternalLink } from "react-icons/fi";
import {DEFINED_PERMISSIONS} from "../../../../../utils/const";
import {useEffect, useState} from "@types/react";
import {getMyPermissions} from "../../../../../utils/functions/GetMyPermissions";
import PermissionCheck from "../../../../../utils/PermissionCheck";

function ViewAcquisition() {
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    // watch,
    // formState: { isValid },
  } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };

  return (
    <PageLayout title={"Asset Acquisition Details"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Process Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Initiated By:</p>
                  <h4>Matthew Fawibe</h4>
                </div>
                <div>
                  <p>Process Type:</p>
                  <h4>Asset Acquisition</h4>
                </div>
                <div>
                  <p>Date Initiated:</p>
                  <h4>1st Oct, 1960</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>3</h4>
                </div>
                <div>
                  <p>Process Status:</p>
                  <h4 style={{ color: "blue" }}>Processing</h4>
                </div>
                <div>
                  <button className={DashboardStyle.view_more_action_button}>
                    <span>Preview Stage</span> <FiExternalLink className={DashboardStyle.view_more_action_button_icon} />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Vendor Name:</p>
                  <h4>Adsoft Technologies</h4>
                </div>
                <div>
                  <p>Legal Business Name:</p>
                  <h4>Adsoft Technologies</h4>
                </div>
                <div>
                  <p>Apartment Suite Number:</p>
                  <h4>624</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Street Address:</p>
                  <h4>Mission Street</h4>
                </div>
                <div>
                  <p>City:</p>
                  <h4>Ikeja</h4>
                </div>
                <div>
                  <p>State:</p>
                  <h4>Lagos</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Email:</p>
                  <h4>info@adsofttecnologies.com</h4>
                </div>
                <div>
                  <p>Vendor Type:</p>
                  <h4>Corporate</h4>
                </div>
                <div>
                  <p>Date onboarded:</p>
                  <h4>20 Dec. 2022</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Acquistion Date:</p>
                  <h4>12 Dec, 2022</h4>
                </div>
                <div>
                  <p>Depreciation Class:</p>
                  <h4>Nil</h4>
                </div>
                <div>
                  <p>Depreciation Value:</p>
                  <h4>Nil</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Depreciation Starting Date:</p>
                  <h4>16 Feb 2022</h4>
                </div>
                <div>
                  <p>Depreciation Ending Date:</p>
                  <h4>18 Dec 2023</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Insurance Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Insurance Company:</p>
                  <h4>Mutual Benefits Assurance Plc</h4>
                </div>
                <div>
                  <p>RC. No:</p>
                  <h4>RC 269837</h4>
                </div>
                <div>
                  <p>Insurance Address:</p>
                  <h4>Aret Adams House, 233 Ikorodu Road, Ilupeju</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Insurance Email:</p>
                  <h4>info@mutualng.com</h4>
                </div>
                <div>
                  <p>Insurance Phone No:</p>
                  <h4>09054644444</h4>
                </div>
                <div>
                  <p>Insurance Type:</p>
                  <h4>Comprehensive</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Commencement Date of insurance:</p>
                  <h4>16-Feb-2022</h4>
                </div>
                <div>
                  <p>Expiry Date of insurance:</p>
                  <h4>15-Feb-2023</h4>
                </div>
                <div>
                  <p>Insurance Type:</p>
                  <h4>09054644444</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional Comments
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Comment:</p>
                  <h4>Nil</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Supporting Documents
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div className={DashboardStyle.progress_bar}>
                <div>
                  <p>CAC registration cert.</p>
                  <div className={DashboardStyle.preview_doc}>
                    <img src={Doc} alt="Doc" />
                    <h4>GalaxoSmilth_cac_cert.pdf</h4>
                  </div>
                </div>
              </div>
              <div className={DashboardStyle.progress_bar}>
                <div>
                  <p>MEMART certificate</p>
                  <div className={DashboardStyle.preview_doc}>
                    <img src={Doc} alt="Doc" />
                    <h4>GalaxoSmilth_cac_cert.pdf</h4>
                  </div>
                </div>
              </div>
              <div className={DashboardStyle.progress_bar}>
                <div>
                  <p>TIN document</p>
                  <div className={DashboardStyle.preview_doc}>
                    <img src={Doc} alt="Doc" />
                    <h4>GalaxoSmilth_cac_cert.pdf</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className={DashboardStyle.button_cage}>
            <SupportButtons className={DashboardStyle?.button_cage_weight}>
              Edit
            </SupportButtons>
                <PermissionCheck permission={DEFINED_PERMISSIONS.AssetView}>
                  <ActionButtons className={DashboardStyle?.button_cage_weight}>
                    Approve
                  </ActionButtons>
                  <ActionButtons
                      bg={"var(--error)"}
                      className={DashboardStyle?.button_cage_weight}
                  >
                    Decline
                  </ActionButtons>
                </PermissionCheck>
            }
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewAcquisition;
