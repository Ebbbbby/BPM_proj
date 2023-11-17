import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormSelect,
  FormTemplate,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployeeQualification } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { removeListData } from "../../../../../utils/functions/ResourceFunctions";
import { URL } from "../../../../../utils/routes";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { QualificationTypeEnum } from "../../../../../utils/const/EmployeeConst";
function AddEmployeeQualification() {
  const location = useLocation()?.state;
  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );
  const [years] = useState(generateYears(1900, new Date().getFullYear()));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state?.employee);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(all_departments)
  function generateYears(start, end) {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  }



  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
    reset,

    formState: { isValid },
  } = formMethods;

  const submit = (data, e) => {
    const payload = {
      ...data,
    };

    const fileData = new FormData();
    const key = Object.keys(payload);
    key?.forEach((key, index) => {
      fileData.append(`${key}`, payload[key]);
    });
    const removedVendorDocument = vendorDocument
    ?.map((x) => x)
    ?.filter((x) => "file" in x);
    removedVendorDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.file?.name
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });
// console.log(location, "Location")
//     console.log(data, "data");

    //return;

    dispatch(CreateEmployeeQualification(fileData))?.then((res) => {
      console.log(res,'Response');
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../`);
      }
    });
  };
  const documentList = [
    {
      name: "Supporting Document - I",
      value: 100,
    },

    {
      name: "Supporting Document - II",
      value: 101,
    },
  ];

  return (
    <PageLayout
      title={location ? "Edit Qualification" : "Add Qualification"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
             Employee Qualification
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Institution Name"}
                  camelCase={"instituteName"}
                  placeholder={"Enter"}
                />
                <FormInput
                  title={"Institution Address1"}
                  camelCase={"institutionAddress1"}
                  placeholder={"Enter"}
                />
              </div>

              <div>
                <FormInput
                  title={"Institution Address2"}
                  camelCase={"institutionAddress2"}
                  placeholder={"Enter"}
                />

                <FormInput
                  title={"Qualification Name"}
                  camelCase={"qualificationName"}
                  placeholder={"Enter"}
             
                />
              </div>

              <div>
              <FormSelect
                  title={"Year"}
                  camelCase={"year"}
                  placeholder={"Enter"}
                  array=  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                />
                  <FormSelect
                  title={"Qualification Type"}
                  camelCase={"qualificationTypeEnum"}
                  array={QualificationTypeEnum?.map((qualification, index)=>(
                    <option key={index} value={qualification?.id}>
                      {qualification?.name}
                    </option>
                  ))}
                />
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents Upload
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <FormUploadComponent
                documentList={documentList}
                uploadFile={uploadFile}
                setUploadFile={setUploadFile}
                setVendorDocument={setVendorDocument}
                vendorDocument={vendorDocument}
              />
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents <br /> Uploads
            </h4>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
            >
              {vendorDocument?.length === 0 ? (
                <p>No Record Available</p>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>File Name</th>
                      <th>File Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorDocument?.map?.((x, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{x?.file?.name || x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.value || x?.fileName}
                          </td>
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
            <SupportButtons width={"auto"} onClick={() => navigate("../")}>
              No,Cancel
            </SupportButtons>

            <ActionButtons
              disabled={!isValid}
              isLoading={isLoading}
              className={DashboardStyle?.button_cage_weight}
            >
              {isLoading ? "Submitting" : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default AddEmployeeQualification;
