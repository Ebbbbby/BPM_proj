import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormSelect,
  FormTemplate,
} from "../../../Components/Forms/InputTemplate";
import { GetAllBranches, GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import { FormProvider, useForm } from "react-hook-form";
import { ActionButtons,SupportButtons} from "../../../../global/components/Buttons/buttons";
import { GetNigerianStates } from "../../../../../utils/redux/Global/GlobalSlice";
import { useLocation, useNavigate} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  Gender,
  Title,
  levels,
  Genotype,
  BloodGroup,
  MaritalStatus,
  Religion,
  staffGroup,
  ModeOfRegistration,
  RegistrationState,
} from "../../../../../utils/const/EmployeeConst";
import {
  GetAllDepartments,
  UpdateEmployeeInformation,
  GetEmployeeCadrePosition,
  GetEmployeeDesignation,
} from "../../../../../utils/redux/HR/HRSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";

function EditMyEmployeeInfo() {
  const location = useLocation()?.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, all_departments, cadre_position, get_designation } =
    useSelector((state) => state?.hr);
  
 
    const { get_bank} =useSelector((state) => state?.fleet);
  const { states } = useSelector((state) => state?.global);

  useEffect(() => {
    dispatch(GetNigerianStates());
    dispatch(GetAllDepartments({ pageSize: 10000, currentPage: 1 }));
    dispatch(GetEmployeeCadrePosition({ perPage: 10000, pageNumber: 1 }));
    dispatch(GetEmployeeDesignation({ pageSize: 10000, pageNumber: 1 }));
    dispatch(GetAllBranches());
    GetVendors({
      filter: 2,
      pageSize: 10000,
      currentPage: 1,
      sort: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(get_bank);

  const defaultData = {
    cadreGradeId: location?.id,
    employeeId: location?.uuId,
    assetId: location?.assetID,
    surname: location?.surname,
    stateId: location?.stateId,
    dateOfBirth: FormatDateTime(location?.dateOfBirth, "YYYY-MM-DD"),
    nationality: location?.nationality,
    phoneNumber: location?.phoneNumber,
    firstName: location?.firstName,
    otherName: location?.otherName,
    gender: location?.gender,
    title: location?.title,
    pin: location?.pin,
    bloodGroup: location?.bloodGroup,
    genotype: location?.genotype,
    religion: location?.religion,
    modeOfRegistration: location?.modeOfRegistration,
    registrationState: location?.registrationState,
    attachmentURL: location?.attachmentURL,
    maritalStatus: location?.maritalStatus,
    qualificationTypeEnum: location?.qualificationTypeEnum,
    employeeStaffEmail: location?.employeeStaffEmail,
    personalEmail: location?.personalEmail,
    dateOFEmployment: FormatDateTime(location?.dateOFEmployment, "YYYY-MM-DD"),
    lastPromotionDate: FormatDateTime(
      location?.lastPromotionDate,
      "YYYY-MM-DD"
    ),
    dateConfirmed: FormatDateTime(location?.dateComfirmed, "YYYY-MM-DD"),
  };
  // console.log(all_departments)

  console.log(location);
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
  

    const fileData = new FormData();
    const key = Object.keys(data);
    key?.forEach((key, index) => {
      fileData.append(`${key}`, data[key]);
    });
    fileData.append("PassportPhotograph", data.attachmentURL[0]);
    console.log(data, "data");
    console.log(defaultData, "default");

    // return;

    dispatch(UpdateEmployeeInformation(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${location?.initiatorId}/view`);
      }
    });
  };

  return (
    <PageLayout
      title={location ? "Edit Employee Information" : "Add Employee"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Personal Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"FirstName"}
                  camelCase={"firstName"}
                  value={location?.firstName}
                  placeholder={""}
                />
                <FormInput
                  title={"OtherName"}
                  camelCase={"otherName"}
                  placeholder={"Enter"}
                  value={location?.otherName}
                />
              </div>
              <div>
                <FormInput
                  title={"Surname"}
                  camelCase={"surname"}
                  placeholder={"Enter vendor location"}
                  value={location?.surname}
                />

                <FormSelect
                  title={"Tile"}
                  camelCase={"title"}
                  placeholder={"Select"}
                  array={Title?.map((requestor, index) => (
                    <option
                      selected={location?.title}
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.name}
                    </option>
                  ))}
                />
              </div>

              <div>
                <FormSelect
                  title={"Gender"}
                  camelCase={"gender"}
                  placeholder={"enter"}
                  array={Gender?.map((requestor, index) => (
                    <option
                      selected={location?.gender}
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.name}
                    </option>
                  ))}
                />

                <FormInput
                  title={"Date of Birth"}
                  camelCase={"dateOfBirth"}
                  placeholder={"select"}
                  type={"date"}
                />
              </div>

              <div>
                <FormSelect
                  title={"Genotype"}
                  camelCase={"genotype"}
                  placeholder={"select"}
                  array={Genotype?.map((requestor, index) => (
                    <option
                      selected={location?.gender}
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.name}
                    </option>
                  ))}
                />

                <FormSelect
                  title={"Blood Group"}
                  camelCase={"bloodgroup"}
                  placeholder={"select"}
                  array={BloodGroup?.map((requestor, index) => (
                    <option
                      selected={location?.gender}
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.name}
                    </option>
                  ))}
                />
              </div>

              <div>
          

                <FormSelect
                  title={"Marital Status"}
                  camelCase={"maritalStatus"}
                  placeholder={"select"}
                  array={MaritalStatus?.map((requestor, index) => (
                    <option
                      selected={location?.maritalStatus}
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.name}
                    </option>
                  ))}
                />
              </div>

              <div>
                <FormSelect
                  title={"Religion"}
                  camelCase={"religion"}
                  placeholder={"select"}
                  array={Religion?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.name}
                    </option>
                  ))}
                />
                  <FormInput
                  title={"phone Number"}
                  camelCase={"phoneNumber"}
                  placeholder={"enter"}
                  value={location?.phoneNumber}
                />
              </div>
              <div>

              <FormInput
                  title={"Country"}
                  camelCase={"countryId"}
                  placeholder={"enter"}
                  value={location?.countryId}
                />
                <FormInput
                  title={"Address Type"}
                  camelCase={"addressTypeEnum"}
                  placeholder={"select"}
                value={location?.employeeAddresses?.addressTypeEnum
                }
                />
               
              </div>
              <div>
                <FormInput
                  title={"Apartment Suite Numuber"}
                  camelCase={"employeeAddresses"}
                  placeholder={"enter"}
                  value={location?.employeeAddresses?.houseNumber}
                />
                <FormInput
                  title={"Street Address"}
                  camelCase={"streetAddress1"}
                  placeholder={"enter"}
                  value={location?.employeeAddresses?.streetAddress1}
                />
              </div>

              <div>
                <FormInput
                  title={"City"}
                  camelCase={"city"}
                  placeholder={"enter"}
                  value={location?.employeeAddresses?.city}
                />
                <FormInput
                  title={"Nationality"}
                  camelCase={"nationalityId"}
                  placeholder={"enter"}
                  value={location?.nationality}
                />
              </div>

              <div>

              <FormSelect
                  title={"State"}
                  camelCase={"stateId"}
                  placeholder={"enter"}
                  array={states?.responseObject?.map((requestor, index) => (
                    <option
                      selected={
                        location?.employeeAddresses?.stateId === requestor?.id
                      }
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.name}
                    </option>
                  ))}
                />
             
                <FormInput
                  title={"LGA"}
                  camelCase={"lgaId"}
                  placeholder={"enter"}
                  value={location?.employeeAddresses?.lgaId}
                />
              </div>
              <div>
                <FormInput
                  title={"RSA Details"}
                  camelCase={"RSADetailId"}
                  placeholder={"enter"}
                  //value={location?.nationality}
                />
                <FormInput
                  title={"State of Origin"}
                  camelCase={"stateOfOriginId"}
                  placeholder={"enter"}
                  value={location?.stateOfOriginId }
                />
              </div>
              <div>
                <FormInput
                  title={"LGA Of Origin"}
                  camelCase={"LGAOfOriginId"}
                  placeholder={"enter"}
                //  value={location?.nationality}
                />
                <FormInput
                  title={"Bank"}
                  camelCase={"bankId"}
                  placeholder={"enter"}
                  // value={location?.bankID
                  // }
                />
              </div>
              <div>
                <FormInput
                  title={"Branch"}
                  camelCase={"branchId"}
                  placeholder={"enter"}
                 
                />
                <FormInput
                  title={"Email"}
                  camelCase={"email"}
                  placeholder={"enter"}
                  value={location?.personalEmail}
                />
              </div>
              <div>
              
              </div>
            </div>
          </section>


          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Account  <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>


            </div>
            </section>

            
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Emplooye Address <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>


            </div>
            </section>


          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Work <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Date Employed"}
                  camelCase={"dateOFEmployment"}
                  placeholder={"select"}
                  type={"date"}
                />

                <FormInput
                  title={"Date Confirmed"}
                  camelCase={"dateConfirmed"}
                  placeholder={"select"}
                  type={"date"}
                />
              </div>
              <div>
                <FormInput
                  title={"Last Promotion Date"}
                  camelCase={"lastPromotionDate"}
                  placeholder={"select date"}
                  type={"date"}
                />

                <FormInput
                  title={"Staff Email"}
                  camelCase={"staffEmail"}
                  placeholder={"enter"}
                  value={location?.employeeStaffEmail}
                />
              </div>
              <div>
                <FormSelect
                  title={"Level"}
                  camelCase={"level"}
                  placeholder={"select "}
                  array={levels?.map((requestor, index) => (
                    <option
                      selected={location?.levels}
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.name}
                    </option>
                  ))}
                />

                <FormSelect
                  title={"Department"}
                  camelCase={"departmentId"}
                  placeholder={"select department"}
                  array={all_departments?.responseObject?.pageItems?.map(
                    (requestor, index) => (
                      <option
                        selected={location?.departmentId === requestor?.id}
                        key={index}
                        value={+requestor?.id}
                      >
                        {requestor?.name}
                      </option>
                    )
                  )}
                />
              </div>

              <div>
                <FormInput
                  title={"Passport Upload"}
                  camelCase={"attachmentURL"}
                  placeholder={"choose"}
                  type={"file"}
                />

                <FormSelect
                  title={"Cadre"}
                  camelCase={"cadreGradeId"}
                  placeholder={"select department"}
                  array={cadre_position?.data?.map((requestor, index) => (
                    <option
                      selected={location?.cadreGradeId === requestor?.id}
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.title}
                    </option>
                  ))}
                />
              </div>

              <div>
                <FormInput
                  title={"PIN"}
                  camelCase={"pin"}
                  placeholder={"Enter"}
                  value={location?.pin}
                />

                <FormSelect
                  title={"Designation"}
                  camelCase={"designationId"}
                  placeholder={"Enter"}
                  array={get_designation?.responseObject?.pageItems?.map(
                    (requestor, index) => (
                      <option
                        selected={location?.designationId === requestor?.id}
                        key={index}
                        value={+requestor?.id}
                      >
                        {requestor?.designationName}
                      </option>
                    )
                  )}
                />
              </div>

              <div>
                <FormSelect
                  title={"Staff Group"}
                  camelCase={"staffGroup"}
                  placeholder={"select"}
                  array={staffGroup?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.name}
                    </option>
                  ))}
                />

                {/* <FormSelect
                  title={"Cadre"}
                  camelCase={"cadreGradeId"}
                  placeholder={"select department"}
                  array={cadre_position?.data?.map((requestor, index) => (
                    <option
                      selected={location?.cadreGradeId === requestor?.id}
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.title}
                    </option>
                  ))}
                /> */}
              </div>

              <div>
                <FormSelect
                  title={"Mode of Registration"}
                  camelCase={"modeOfRegistration"}
                  placeholder={"select"}
                  array={ModeOfRegistration?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.name}
                    </option>
                  ))}
                />

                <FormSelect
                  title={"Registration "}
                  camelCase={"registrationState"}
                  placeholder={"select "}
                  array={RegistrationState?.map((requestor, index) => (
                    <option
                      key={index}
                      value={+requestor?.id}
                    >
                      {requestor?.name}
                    </option>
                  ))}
                />
              </div>
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

export default EditMyEmployeeInfo;
