import React, { useContext } from "react";
import on from "./Style/onboarding.module.css";
import DashboardStyle from "../../../dashboard/Styles/Dashboard.module.css";
import { ActionButtons } from "../../../global/components/Buttons/buttons";
import { OnboardingContext } from "../../../../utils/contexts/Onboarding/OnboardingContext";
import Table from "../../Components/Table/Table";
import { TableActionsDownload } from "../../Components/Misc/Actions";
import { useSelector } from "react-redux";
import { FormatDateTime } from "../../../../utils/functions/ResourceFunctions";

function OnboardingStepFive(props) {
  const { change } = props;
  const { states, vendorsTypes, companyTypes } = useSelector(
    (state) => state?.global
  );
  const { isLoadingAction } = useSelector((state) => state?.vendor);
  const { changeStep, vendorData } = useContext(OnboardingContext);
  const vendor = vendorData?.vendorValues;
  const asset_services = vendorData?.NamesOfServiceProvidesAsset;
  const consumable_services = vendorData?.NamesOfServiceProvidesConsumable;

  console.log({ vendor });

  return (
    <>
      <section
        className={`${DashboardStyle.form_section} ${on.form_section_reviewer}`}
      >
        <div className={on.form_back_to_edit}>
          {" "}
          <button
            type="button"
            onClick={() => {
              changeStep(1);
              change();
            }}
          >
            Edit
          </button>
        </div>
        <h4 className={DashboardStyle.form_section_title}>
          Company <br /> Information
        </h4>
        <div className={`${DashboardStyle.labels_group} ${on.labels_group}`}>
          <div>
            <div>
              <p>Company Name:</p>
              <h4>{vendor?.companyName}</h4>
            </div>
            <div>
              <p>Business Nature:</p>
              <h4>
                {
                  companyTypes?.responseObject
                    ?.map((x) => x)
                    ?.filter((x) => x?.id === +vendor?.businessNature)?.[0]
                    ?.name
                }
              </h4>
            </div>
          </div>
          <div>
            <div>
              <p>Your Legal Business Name:</p>
              <h4>{vendor?.businessName}</h4>
            </div>
            <div>
              <p>Service Providing:</p>
              <h4>
                {asset_services?.map((x, index) => {
                  return <>{(index ? ", " : "") + x?.name}</>;
                })}{" "}
                {consumable_services?.map((x, index) => {
                  return <>{(index ? ", " : "") + x?.name}</>;
                })}
              </h4>
            </div>
          </div>
          <div>
            <div>
              <p>Tax identification number:</p>
              <h4>{vendor?.TaxIdentificationNumber}</h4>
            </div>
            <div>
              <p>Website:</p>
              <h4>{vendor?.ValueAddedTax}</h4>
            </div>
          </div>
          <div>
            <div>
              <p>Certificate of Registration:</p>
              <h4>{vendor?.rcNumber}</h4>
            </div>
            <div>
              <p>Vendor Type:</p>
              <h4>
                {
                  vendorsTypes?.responseObject
                    ?.map((x) => x)
                    ?.filter((x) => x?.id === +vendor?.VendorType)?.[0]?.name
                }
              </h4>
            </div>
          </div>
          <div>
            <div>
              <p>Comment:</p>
              <h4>{vendor?.comment}</h4>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${DashboardStyle.form_section} ${on.form_section_reviewer}`}
      >
        <div className={on.form_back_to_edit}>
          {" "}
          <button
            onClick={() => {
              changeStep(2);
              change();
            }}
          >
            Edit
          </button>
        </div>
        <h4 className={DashboardStyle.form_section_title}>
          Contact <br /> Details
        </h4>
        <div className={`${DashboardStyle.labels_group} ${on.labels_group}`}>
          <div>
            <div>
              <p>Apartment Suite:</p>
              <h4>{vendor?.SuiteNumber}</h4>
            </div>
            <div>
              <p>Street Address:</p>
              <h4>{vendor?.Address}</h4>
            </div>
          </div>
          <div>
            <div>
              <p>State:</p>
              <h4>
                {
                  states?.responseObject
                    ?.map((x) => x)
                    ?.filter((x) => x?.id === +vendor?.State)?.[0]?.name
                }
              </h4>
            </div>
            <div>
              <p>City:</p>
              <h4>{vendor?.City}</h4>
            </div>
          </div>

          <div>
            <div>
              <p>Email:</p>
              <h4>{vendor?.Email}</h4>
            </div>
            <div>
              <p>Phone Number</p>
              <h4>{vendor?.Phone}</h4>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${DashboardStyle.form_section} ${on.form_section_reviewer}`}
      >
        <div className={on.form_back_to_edit}>
          {" "}
          <button
            onClick={() => {
              changeStep(3);
              change();
            }}
          >
            Edit
          </button>
        </div>
        <h4 className={DashboardStyle.form_section_title}>
          Company <br /> Documents
        </h4>
        <div
          className={`${DashboardStyle.labels_group} ${on.labels_group} ${DashboardStyle.labels_group_downloads}`}
        >
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>File Type</th>
                <th>Date Uploaded</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendor?.uploadDocuments?.map((x, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{x?.file?.name || x?.fileName}</td>
                  <td style={{ textTransform: "uppercase" }}>
                    {x?.value || x?.fileName}
                  </td>
                  <td>{FormatDateTime(new Date())}</td>
                  <td>
                    <TableActionsDownload
                      // url={"https://www.facebook.com"}
                      file={x?.file || null}
                      url={x?.fileUrl || null}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
      <p className={on.cta_text}>
        By clicking submit application, I/We confirm that the information
        provided are accurate and truthful.
      </p>
      <div className={`${DashboardStyle.button_cage} ${on.cta_button_cage}`}>
        <ActionButtons
          width={"auto"}
          // onClick={() => change()}
          className={DashboardStyle?.button_cage_weight}
        >
          {isLoadingAction === true
            ? " Submitting Application"
            : "Submit Application"}
        </ActionButtons>
      </div>
    </>
  );
}

export default OnboardingStepFive;
