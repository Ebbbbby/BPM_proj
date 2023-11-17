import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import {
  FormInput,
  FormSelect,
  FormTemplate,
  PerfectFileUpload,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { AppModalTemplate } from "../../../Components/Modals/Modals";
import { CreateVehicleDocument, GetAllVehicleDocumentType } from "../../../../../utils/redux/Fleet/FleetSlice";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { ActionButtons } from "../../../../global/components/Buttons/buttons";
import { removeListData } from "../../../../../utils/functions/ResourceFunctions";

function SetUpDocumentRenewal(props) {
  const location = useLocation()?.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [docItems, setDocItems] = useState({});
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadDocument, setDocuments] = useState(
    location?.documents || []
  );
  const { openModal, setOpenModal, fleet } = props;
  const { all_document_type } = useSelector(
    (state) => state?.fleet
  );

  const defaultData = {
    RenewalDate: location?.RenewalDate,
    ExpirationDate: location?.ExpirationId,
  };

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isValid },
  } = formMethods;  

  useEffect(() => {
    dispatch(GetAllVehicleDocumentType({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
      }        
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data) => {

    const formData = {
        ...data,
        assetId: fleet?.assetId,
        documentTypeId: docItems?.uuId,
        registrationDate: new Date().toISOString(),
    }; 
    
    const fileData = new FormData();
    const key = Object.keys(formData);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, formData[key]);
    });

    const removedDocument = uploadDocument
      ?.map((x) => x)
      ?.filter((x) => "file" in x);

      removedDocument.forEach((element, index) => {
      fileData.append(
          `uploadDocuments[${index}].file`,
          element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });

    dispatch(CreateVehicleDocument(fileData))?.then((res) => {
        if (res?.payload?.successful === true) {
          reset();
          navigate(`../${fleet?.uuId}/view`);
        }
    });

  };

  return (
    <AppModalTemplate
      padding={"0px"}
      width={"500px"}
      isOpen={openModal}
      setIsOpen={setOpenModal}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
        <section className={DashboardStyle.form_section}>
            <div className={DashboardStyle.inputs_group}>
              <div style={{width: '400px'}}>
                    <FormInput
                        title={"Renewal Date"}
                        camelCase={"RenewalDate"}
                        placeholder={"Select date"}
                        type="date"
                    />
                    <FormInput
                        title={"Expiration Date"}
                        camelCase={"ExpirationDate"}
                        placeholder={"Select date"}
                        type="date"
                    />
              </div>              
            </div>
        </section>
        <section className={DashboardStyle.form_section}>
            <div className={DashboardStyle.textbox_lg}>
                <div style={{width: '400px'}}>
                    <FormInput
                        title={"Amount"}
                        camelCase={"Amount"}
                        placeholder={"Amount"}
                        type="number"
                        isOptional={true}
                    />
                </div>
            </div>
        </section>       
        <section className={DashboardStyle.form_section}>
            <div className={DashboardStyle.textbox_lg}>
              <div style={{width: '400px'}}>
                <FormSelect
                  title={
                    <>
                      Document Type <sup style={{ color: "red" }}>*</sup>
                    </>
                  }
                  camelCase={"fileName"}
                  placeholder={"select"}
                  isOptional={true}
                  array={all_document_type?.data?.map?.((x, index) => (
                    <option key={index} value={x?.uuId}>
                      {x?.title}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = all_document_type?.data?.find(
                        (x) => e.target.value === x?.uuId
                      );
                      setDocItems(isFound);
                      return;
                    },
                  }}
                />

                <PerfectFileUpload
                  setFile={setUploadFile}
                  file={uploadFile}
                  title={""}
                  isOptional={false}
                  camcelCase={"stuff"}
                  handleChange={(cac) => {
                    setUploadFile(cac);
                  }}
                />
                <div
                  style={{
                    color: "var(--primary-color)",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: "5px",
                  }}
                  onClick={() => {
                    if (uploadFile && getValues("fileName") !== "") {
                      setDocuments([
                        ...uploadDocument,
                        {
                          file: uploadFile,
                          fileName: uploadFile?.name
                        //   fileName: getValues("fileName"),
                        },
                      ]);

                      setUploadFile(null);
                      setValue("fileName", "");
                    } else toast.error("File Name or File can not be empty");
                  }}
                >
                  <FiPlus />
                  <p>Add Another</p>
                </div>
              </div>
            </div>
        </section>
        <section className={DashboardStyle.form_section}>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
              style={{width: '400px'}}
            >
              {uploadDocument?.length === 0 ? (
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
                    {uploadDocument?.map?.((x, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.file?.type?.split("/")[1]}
                          </td>
                          <td>
                            <TableActionsDownload 
                              file={x?.file}
                              actions={() =>
                                removeListData({
                                  value: index,
                                  list: uploadDocument,
                                  setList: setDocuments,
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
            <ActionButtons
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
            >
              Upload
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </AppModalTemplate>
  );
}

export default SetUpDocumentRenewal;