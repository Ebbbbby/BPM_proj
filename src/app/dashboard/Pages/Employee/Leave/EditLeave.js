import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import {
  GetLeaveTypes,
  UpdateLeaveRequest,
  CreateLeaveRequest
} from "../../../../../utils/redux/HR/HRSlice";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { FormatDateTime, removeListData } from "../../../../../utils/functions/ResourceFunctions";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";

const AddLeave = () => {
  const location = useLocation()?.state;
  const [leaveItems, setLeaveItems] = useState({});
  const [uploadFile, setUploadFile] = useState(null);
  const [leaveDocument, setLeaveDocument] = useState(location?.leaveDocuments || []);

  const dispatch = useDispatch();
  const { leave_types, isLoadingLeave} = useSelector(
    (state) => state.hr
  );

  useEffect(() => {
    dispatch(GetLeaveTypes({ pageNumber: 1, perPage: 10 }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {
    leaveTypeId: location?.leaveTypeId,
    startDate: FormatDateTime(
      location?.startDate,
      "YYYY-MM-DD"
    ),
    endDate: FormatDateTime(
      location?.endDate,
      "YYYY-MM-DD"
    ),
    reason: location?.reason,
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods;
  const [flipData, setFlipData] = useState(getValues("leaveTypeId") || 0);

  const { id } = useParams();
  const navigate = useNavigate();

  const submit = (data) => {
   const formData = {
     "Id":id*1,
      "LeaveTypeId":data?.leaveTypeId *1,
      "StartDate":data?.startDate,
      "EndDate":data?.endDate,
      "Reason":data?.reason,
      leaveName:leaveItems?.title ,
      //  leaveTypeId:data?.leaveTypeId*1,
    
    //  uploadDocuments:fileData
    };
    const fileData = new FormData();
    const key = Object.keys(data);
    // console.log(key)

    key?.forEach((key, index) => {
      fileData.append(`${key}`, data[key]);
    });

    leaveDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });
   
  //   console.log(formData,'FORMDATA');
  //  console.log(data,'DATA');


  //  return
    location?
    dispatch(UpdateLeaveRequest(formData))?.then((res) => {
        if (res?.payload?.successful === true) {
          reset();
          navigate(`../${location.id}/view`);
        }
      })
   :dispatch(CreateLeaveRequest(formData))?.then((res) => {
    if (res?.payload?.successful === true) {
      reset();
      navigate(`../${res?.payload?.responseObject}/view`);
    }
  });
  

  };
  const documentList = [
    {
      name: "CAC Certificate",
      value: "CacCertificate",
    },

    {
      name: "TIN Certificate",
      value: "TinCertificate",
    },
  ];

  return (
    <PageLayout title={location ? "Edit Leave":" Add Leave"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Leave <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
            

                <FormSelect
                  title={"Leave Type"}
                  camelCase={"leaveTypeId"}
                  placeholder={"select leave type"}
                  isOptional={false}
                  array={leave_types?.data?.map((requestor, index) => (
                    <option key={index} value={requestor?.Id}>
                      {requestor?.title}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = leave_types?.data?.find(
                        (x) => +e.target.value === x?.Id
                      );
                      setFlipData(isFound?.title);
                      setLeaveItems(isFound);
                    },
                  }}
              
                />
                        
              </div>
              <div>
              <FormInput
                  title={"Start Date"}
                  camelCase={"startDate"}
                  placeholder={"enter leave start date"}
                  isOptional={false}

                  type={"date"}
                  //    value={get_fleet?.responseObject?.fleetName}
                />
                <FormInput
                  title={"End Date"}
                  camelCase={"endDate"}
                  placeholder={"enter leave end date"}
                  isOptional={false}
                  type={"date"}
                />
            
              </div>
              <div>
              <FormTextArea
                  title={"Leave Reason"}
                  camelCase={"reason"}
                  placeholder={"select"}
                  isOptional={true}
                  rowsLines={4}

                 
                />
              </div>
            </div>
          </section>  
          {flipData === "Medical Leave" || flipData === "Sick Leave" ? (
            <>
              {" "}
              <section className={DashboardStyle.form_section}>
                <h4 className={DashboardStyle.form_section_title}>
                  Uploads supporting <br /> document
                </h4>
                <FormUploadComponent
                  documentList={documentList}
                  uploadFile={uploadFile}
                  setUploadFile={setUploadFile}
                  setVendorDocument={setLeaveDocument}
                  vendorDocument={leaveDocument}
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
                  {leaveDocument?.length === 0 ? (
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
                        {leaveDocument?.map?.((x, index) => {
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
                                      list: leaveDocument,
                                      setList: setLeaveDocument,
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
            </>
          ) : (
            ""
          )}
              
  
          <div className={DashboardStyle.button_cage}>
          <SupportButtons width={"auto"} onClick={() => navigate("../")}>
              No,Cancel
            </SupportButtons>
            <ActionButtons
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
            >
              {isLoadingLeave?"Submitting..":'Submit'}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
};

export default AddLeave;
