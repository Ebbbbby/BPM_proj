import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  FormatDateTime,

  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import {
  UpdateExitRequisition,
} from "../../../../../utils/redux/HR/HRSlice";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";

  function EditExitRequisition() {
  const location = useLocation()?.state;
  const { isLoading } = useSelector((state) => state?.vendor);

  const [selectedDate, setSelectedDate] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    setSelectedDate(getTodayDate());
  }, []);

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().substr(0, 10);
  }

  console.log(location);

  const defaultData = {
    exitReason : location?.exitReason,
    exitDate:FormatDateTime(location?.exitDate),
  }

  const formMethods = useForm({
    defaultValues: defaultData,

    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    
    if (data["exitDate"] === undefined || data["exitDate"] == null) {
      data["exitDate"] = getTodayDate();
    }
    const fileData = new FormData();
    const key = Object.keys(data);
    console.log(key)
    key?.forEach((key, index) => {
      fileData.append(`${key}`, data[key]);
    });
    vendorDocument.forEach((element, index) => {
      fileData.append(
        `Documents[${index}].file`,
        element?.file,
        element?.file?.name
      );
      fileData?.append(`Documents[${index}].fileName`, element?.fileName);
      fileData?.append(`Id`,location?.id);
    });


    dispatch(UpdateExitRequisition(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../${location?.id}/view`);
    

      }
    });
}
  
  const documentList = [
    {
      name: "Receipt",
      value: 8,
    },
  ];

  return (
    <PageLayout
      title={location ? "Edit Exit Requisition" : " Add Exit Requisition"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Exit <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
            <div style={{ gridTemplateColumns: "1fr" }}>

              <FormInput
                title={"Exit Date"}
                camelCase={"exitDate"}
                placeholder={"enter exit date"}
                type={"date"}
                isOptional={true}
                value={selectedDate}
                registerOptions={{
                  onChange: (e) => {
                    if (e.target.value !== null) {
                      setSelectedDate(e.target.value);
                    }
                  },
                }}
              />
              </div>
              <div style={{ gridTemplateColumns: "1fr" }}>
                <FormTextArea
                  title={"Exit reason"}
                  camelCase={"exitReason"}
                  isOptional={true}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Document Upload
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
                      <th>Date Uploaded</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorDocument?.map?.((x, index) => {
                      // console.log(x);
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
            <SupportButtons
              width={"auto"}
              onClick={() => navigate(-1)}
              className={DashboardStyle?.button_cage_weight_without_border}
            >
              No, Cancel
            </SupportButtons>
            <ActionButtons
              width={"auto"}
              isLoading={isLoading}
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
              bg="var(--primary-color)"
            >
              Submit
                    {/* {isLoadingAction ? "Submitting..." : "Submit"} */}
            </ActionButtons>
      
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}
export default EditExitRequisition;
