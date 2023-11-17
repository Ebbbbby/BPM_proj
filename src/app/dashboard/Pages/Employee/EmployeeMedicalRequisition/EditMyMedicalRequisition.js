import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormSelect,
  FormTemplate,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { GetMyBeneficiaryInfo, UpdateMedicalRequisition } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { GetFuelVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import {
  FormatDateTime,
  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import { URL } from "../../../../../utils/routes";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { GetAllHospitals } from "../../../../../utils/redux/Employee/EmployeeSlice";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";



function EditMyMedicalRequisition() {
  const location = useLocation()?.state;
  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const user = GetLocalStorage();

  const { isLoading, get_beneficiary_info, get_hospitals } = useSelector(
    (state) => state?.employee
  );
  const { fuel_vendors } = useSelector((state) => state?.vendor);
  console.log({ location });
  
  useEffect(() => {
    dispatch(GetFuelVendors({ pageSize: 10000, currentPage: 1 }));
    dispatch(
      GetMyBeneficiaryInfo({
        pageNumber: 1,
        pageSize: 10000,
      }),
      dispatch(
        GetAllHospitals({
          pageNumber: 1,
          pageSize: 10000,
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(location)

  // console.log(all_departments)
  const defaultData = {
    medicalRequisitionId:location?.id,
    vendorId:location?.vendorId,
    hospitalId:location?.hospitalId,
    beneficiaryCategory:location?.beneficiaryCategory,
    requestDescription:location?.requestDescription,
    medicalDocuments:location?.employeeMedicalRequisitionDocuments,
    // amount:FormatCurrency(location?.amount),
    dateOfAppointment:FormatDateTime(location?.dateOfAppointment, "YYYY-MM-DD"),
    // medicalRequisitionBenficiaries:location?.medicalRequisitionBenficiaries !== 0 ? location?.medicalRequisitionBenficiaries?.map((x)=> {
    //   return (x?.id)
    // }): (location?.initiatorName)


    

  }

  const formMethods = useForm({
    mode: "all",
    defaultValues: defaultData,
  });
  const {
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { isValid },
  } = formMethods;

  const [flipData, setFlipData] = useState(getValues("BeneficiaryCategory") || 0);

  const submit = (data, e) => {
   const send = {
    ...data,
  "vendorId":data?.vendorId,
  "hospitalId":data?.hospitalId,
  "beneficiaryCategory":data?.beneficiaryCategory,
  "amount": data?.amount,
  "dateOfAppointment":data?.dateOfAppointment,
  "requestDescription":data?.requestDescription,
  "BeneficiaryCommands":data?.BeneficiaryCommands?.map((x)=> { return{patientId: x *1}})

}
    const fileData = new FormData();
    const key = Object.keys(send);
  
    key?.forEach((key, index) => {
      fileData.append(`${key}`, send[key]);
    });
 
   
    vendorDocument.forEach((element, index) => {
      console.log(element, 'element')
      fileData.append(
        `MedicalDocuments[${index}].file`,
        element?.file,
        element?.file?.name
      );
      fileData.append(`MedicalDocuments[${index}].fileName`, element?.fileName);
      console.log(key)
    });

  

    // console.log(send, "data");
    // console.log(fileData, "FILEDATA");


    // return;

    dispatch(UpdateMedicalRequisition(send))?.then((res) => {
      console.log(res)
      if (res?.payload?.successful === true) {
        reset();
         navigate(`../${location?.id}/view`);
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
      title={location ? "Edit Medical Requisition" : "Create Medical Requisition"}
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
                <FormSelect
                  title={"Vendor"}
                  camelCase={"vendorId"}
                  placeholder={"Select"}
                  array={fuel_vendors?.result?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.businessName}
                    </option>
                  ))}
                />

                <FormSelect
                  title={"Hospital"}
                  camelCase={"hospitalId"}
                  placeholder={"Select"}
                  array={get_hospitals?.responseObject?.pageItems?.map(
                    (requestor, index) => (
                      <option key={index} value={+requestor?.id}>
                        {requestor?.hospitalName}
                      </option>
                    )
                  )}
                />
              </div>

              <div>
                <FormSelect
                  title={"Beneficiary Category"}
                  camelCase={"beneficiaryCategory"}
                  placeholder={"Select"}
                  array={
                    <>
                      <option value={0}>Self</option>
                      <option value={1}>Medical Beneficiary</option>
                    </>
                  }
                  moreRegister={{
                    onChange: (e) => {
                      console.log(+e.target.value)
                      setFlipData(+e.target.value);
                    },
                  }}
                />

                {flipData === 1 && (
                  <MultiSelect

                  
                  
                  dataValues={watch()?.BeneficiaryCommands}
                    title={"Patient Name"}
                    name={"BeneficiaryCommands"}
                    placeholder={"Select"}
                    isOptional={watch()?.BeneficiaryCommands?.length !== 0 ? true : false}
                
                    data={get_beneficiary_info?.responseObject?.pageItems?.map(
                      (item, index) => {
                        return {
                          name:
                            item?.firstName +
                            " " +
                            item?.othernames +
                            " " +
                            item?.surname,
                          checkBoxName:
                            item?.firstName +
                            " " +
                            item?.surname,
                          id: item?.id,
                          ...item,
                        };
                      
                      }
                    )}
                  />
                )}
              </div>

              <div>
                <FormInput
                  title={"Amount"}
                  camelCase={"amount"}
                  placeholder={"Enter vendor location"}
                  type={"double"}
                />
                <FormInput
                  title={"Appointmant Date"}
                  camelCase={"dateOfAppointment"}
                  placeholder={"select"}
                  type={"date"}
                />
              </div>

              <div>
                <FormTextArea
                  title={"Request Description"}
                  camelCase={"requestDescription"}
                  placeholder={"enter"}
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
                      console.log(x, "X")
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

export default EditMyMedicalRequisition;
