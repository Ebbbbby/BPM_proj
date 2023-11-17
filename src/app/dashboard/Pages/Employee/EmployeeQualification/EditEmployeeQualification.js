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
import { CreateEmployeeQualification,UpdateEmployeeQualification } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { FormatDateTime, removeListData } from "../../../../../utils/functions/ResourceFunctions";
import { URL } from "../../../../../utils/routes";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { QualificationTypeEnum } from "../../../../../utils/const/EmployeeConst";

function EditEmployeeQualification() {
  const location = useLocation()?.state;
  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );
  const [years] = useState(generateYears(1900, new Date().getFullYear()));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state?.employee);

  function generateYears(start, end) {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(all_departments)
  const defaultData = {
    instituteName:location?.instituteName,
    institutionAddress1:location?.institutionAddress1,
    institutionAddress2:location?.institutionAddress2,
    qualificationName:location?.qualificationName,
    qualificationType:location?.qualificationType,
    year:location?.year,
  }

  console.log(location)

  const formMethods = useForm({
    defaultValues: defaultData,

    mode: "all",
  });
  const {
    handleSubmit,
    reset,

    formState: { isValid },
  } = formMethods;

  const submit = (data, e) => {
    const payload = {
    "InstituteName" : data?.instituteName,
    "InstitutionAddress1":data?.InstitutionAddress1,
    "institutionAddress2":data?.institutionAddress2,
    "qualificationName":data?.qualificationName,
    "qualificationType":data?.qualificationType,
    "year":data?.year


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
      fileData.append(`qualificationId`,location?.id)

    });

    // console.log(payload, "data");

    // return;
    location? dispatch(UpdateEmployeeQualification(fileData))?.then((res) => {
        if (res?.payload?.successful === true) {
          reset();
          navigate(`../${location?.id}/view`);
        }
      })
: dispatch(CreateEmployeeQualification(fileData))?.then((res) => {
      console.log(res);
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${URL.Employee_Qualification}`);
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
              Medical Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Institution Name"}
                  camelCase={"instituteName"}
                  placeholder={"Enter"}
                />
                <FormInput
                  title={"Institution Address 1"}
                  camelCase={"institutionAddress1"}
                  placeholder={"Enter"}
                />
              </div>

              <div>
                <FormInput
                  title={"Institution Address 2"}
                  camelCase={"institutionAddress2"}
                  placeholder={"Enter"}
                  isOptional={true}
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
                  placeholder={"enter"}
                  defaultValue={location?.qualificationType
                  }
                  array={QualificationTypeEnum?.map((qualification, index)=>(
                    <option key={index} value={qualification?.id}>
                      {qualification?.name}
                    </option>
                  ))}
                />
              </div>
            </div>
          </section>

          {/* <section className={DashboardStyle.form_section}>
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
                isOptional={false}
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
          </section> */}


   <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Passport Upload
            </h4>
            <FormUploadComponent
              documentList={documentList}
              uploadFile={uploadFile}
              setUploadFile={setUploadFile}
              setVendorDocument={setVendorDocument}
              vendorDocument={vendorDocument}
              isOptional={false}
            />
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Passport  <br /> Upload
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
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.value || x?.fileName}
                          </td>
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

export default EditEmployeeQualification;
