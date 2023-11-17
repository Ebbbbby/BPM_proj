import React, { useState } from "react";
import on from "./Style/onboarding.module.css";
import DashboardStyle from "../../../dashboard/Styles/Dashboard.module.css";
import { ActionButtons } from "../../../global/components/Buttons/buttons";
import { TableActionsDownload } from "../../Components/Misc/Actions";
import {
  FormatDateTime,
  removeListData,
} from "../../../../utils/functions/ResourceFunctions";
import Table from "../../Components/Table/Table";
import { CancelButton } from "./OnboardingTemplate";
import FormUploadComponent from "../../Components/Forms/FormUploadComponent";

function OnboardingStepThree({ vendorDocument, setVendorDocument }) {
  const [uploadFile, setUploadFile] = useState(null);

  const documentList = [
    {
      name: "CAC Certificate",
      value: 2,
    },

    {
      name: "TIN Certificate",
      value: 1,
    },
  ];

  return (
    <>
      <section className={`${DashboardStyle.form_section} ${on.form_section}`}>
        <div className={DashboardStyle.inputs_group_no_grid}>
          <div>
            <FormUploadComponent
              documentList={documentList}
              uploadFile={uploadFile}
              setUploadFile={setUploadFile}
              setVendorDocument={setVendorDocument}
              vendorDocument={vendorDocument}
              isOptional={false}
            />
          </div>
        </div>
        <br />
        <div
          className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
        >
          {vendorDocument?.length === 0 ? (
            <p></p>
          ) : (
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
                {vendorDocument?.map?.((x, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{x?.file?.name || x?.fileName}</td>
                      <td style={{ textTransform: "uppercase" }}>{x?.value || x?.fileName}</td>
                      <td>{FormatDateTime(new Date())}</td>
                      <td>
                        <TableActionsDownload
                          file={x?.file || null}
                          url={x?.fileUrl || null}
                          actions={() =>
                            removeListData({
                              value: index,
                              list: vendorDocument,
                              setList: setVendorDocument,
                            })
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </section>

      <div className={DashboardStyle.button_cage}>
        <CancelButton />
        <ActionButtons
          width={"auto"}
          disabled={vendorDocument?.length === 0}
          className={DashboardStyle?.button_cage_weight}
        >
          Review your Registration
        </ActionButtons>
      </div>
    </>
  );
}

export default OnboardingStepThree;
