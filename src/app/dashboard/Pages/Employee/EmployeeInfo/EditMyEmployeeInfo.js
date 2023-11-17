import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormSelect,
  FormTemplate,
  FormTextArea,

} from "../../../Components/Forms/InputTemplate";
import {
  GetAllBranches,
  GetVendors,
} from "../../../../../utils/redux/Vendor/VendorSlice";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { CreateEmployeeInformation, GetAllContainer, GetStates } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  LevelEnum,
  Blood,
  Marital,
  ModeOfReg,
  RegState,
  Titles,
  Genders,
  Geno,
  Religions,
  StaffGroups,
  AddresType
} from "../../../../../utils/const/EmployeeConst";
import {
  GetEmployeeCadrePosition,
  GetEmployeeDesignation,
} from "../../../../../utils/redux/HR/HRSlice";
import { UpdateEmployeeInformation } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { GetCountries, GetEmployeeBanks,GetLGA } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { GetEmployees } from "../../../../../utils/redux/HR/HRSlice";
import { FormatDateTime, removeListData } from "../../../../../utils/functions/ResourceFunctions";
import { Regrex } from "../../../../../utils/functions/Regex";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
function EditMyEmployeeInfo() {
  const location = useLocation()?.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { isLoading, cadre_position, get_designation,employees } =
    useSelector((state) => state?.hr);
    console.log(location)
 const { countries,banks,states,lgas,all_container } = useSelector((state) => state?.employee);
 const [uploadFile, setUploadFile] = useState(null);

 const [vendorDocument, setVendorDocument] = useState(
  location?.documents || []
);
  const [ stateCode, setStateCode ] =  useState("AU")
  const [stateitems, setStateItems] = useState({})
  const [lgaItems, setLgaItems] = useState({})
  const [nationItems, setNationItems] = useState({})
  const { id } = useParams();

  useEffect(() => {
    dispatch(GetStates());
    dispatch(GetCountries())
    dispatch(GetAllContainer({pageNumber: 1, pageSize: 1000 }))
    dispatch(GetEmployeeBanks())
    dispatch(GetLGA({stateCode: stateCode}))
    dispatch(GetEmployeeCadrePosition({ pageSize: 10000, pageNumber: 1 }));
    dispatch(GetEmployeeDesignation({ pageSize: 10000, pageNumber: 1 }));
    dispatch(GetAllBranches());
    dispatch(GetEmployees({ pageSize: 10000, pageNumber: 1}))
    GetVendors({
      pageSize: 10000,
      currentPage: 1,
      sort: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateCode]);

  const defaultData = {
    
    CadreGradeId: location?.cadreGradeId,
    EmployeeId: location?.uuId,
    Surname: location?.surname,
    BankID:location?.bankID    ,
    ContainerId:location?.containerId ,
    StateOfOriginId:location?.stateOfOriginId,
    NationalityId:location?.nationalityId,
    LGAOfOriginId:location?.lgaOfOriginId,
    LGAOfOrigin:location?.lgaOfOrigin,
    StateOfOrigin:location?.stateOfOrigin,
    Nationality:location?.nationality,
    DesignationId:location?.designationId,
    ReportTo:location?.reportTo,
    Gender:location?.gender,
    Level:location?.level,
    DateOfBirth: FormatDateTime(location?.dateOfBirth, "YYYY-MM-DD"),
    PhoneNumber: location?.phoneNumber,
    FirstName: location?.firstName,
    OtherName: location?.otherName,
    Title: location?.Title,
    Pin: location?.pin,
    BloodGroup:location?.bloodGroup,
    Genotype: location?.genotype,
    Religion: location?.religion,
    StaffGroup: location?.staffGroup,
    
    ModeOfRegistration: location?.modeOfRegistration,
    RegistrationState: location?.registrationState,
    MaritalStatus: location?.maritalStatus,
    EmployeeStaffEmail: location?.employeeStaffEmail,
    PersonalEmail: location?.personalEmail,
    LocationCommand:{
      LGAId:location?.lgaId,
      StateId:location?.stateId,
      CountryId:location?.countryId,
      AddressTypeEnum:location?.addressTypeEnum,
      HouseNumber:location?.houseNumber,
      StreetAddress1: location?.streetAddress1,
      StreetAddress2: location?.streetAddress2,
      LandMark:location?.landMark,
      City:location?.city,
    },
    PassportPhotogragh:location?.attachmentURL,
    ZipCode:location?.zipCode,
    IsConfirmed:Boolean(location?.isConfirmed),
    IsStaysAlone:Boolean(location?.isStaysAlone),
    DateOFEmployment: FormatDateTime(location?.dateOFEmployment, "YYYY-MM-DD"),
    EffectiveDate: FormatDateTime(location?.dateOFEmployment, "YYYY-MM-DD"),

    LastPromotionDate: FormatDateTime(
      location?.lastPromotionDate,
      "YYYY-MM-DD"
    ),
    DateComfirmed: FormatDateTime(location?.dateComfirmed, "YYYY-MM-DD"),
  };

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
    var send = {
      "CadreGradeId":+data?.CadreGradeId,
      "EmployeeId":data?.EmployeeId,
      "Surname":data?.Surname,
      "FirstName":data?.FirstName,
      "OtherName":data?.OtherName,
      "Title":data?.Title,
      "Genotype":data?.Genotype,
      "BloodGroup":data?.BloodGroup,
      "Alergies":data?.Alergies,
      "DateOfBirth":data?.DateOfBirth,
      "PersonalEmail":data?.PersonalEmail,
      "PhoneNumber":data?.PhoneNumber,
      "MaidenName":data?.MaidenName,
      "Pin":data?.Pin,
      "ModeOfRegistration":data?.ModeOfRegistration,
      "RegistrationState":data?.RegistrationState,
      "MaritalStatus":data?.MaritalStatus,
      "Gender":data?.Gender,
      "NationalityId":+data?.NationalityId,
      "Nationality": nationItems?.txtcountryName,
      "Religion":data?.Religion,
      "EmployeeStaffEmail":data?.EmployeeStaffEmail,
      "DateOFEmployment":data?.DateOFEmployment,
      "DateComfirmed":data?.DateComfirmed,
      "LastPromotionDate":data?.LastPromotionDate,
      "EffectiveDate":data?.EffectiveDate,
      "ReportTo":data?.ReportTo,
      "ContainerId":data?.ContainerId,
      "DesignationId":+data?.DesignationId,
      "AgentCode":data?.AgentCode,
      "Level":+data?.Level,
      "StaffGroup":+data?.StaffGroup,
      "PositionCode":data?.PositionCode,
      "PartnerPlaceOfWork":data?.PartnerPlaceOfWork,
      "BankID":data?.BankID,
      "AccountNumber":data?.AccountNumber,
      "AccountName":data?.AccountName,
      "Remarks":data?.Remarks,
      "Location":data?.Location,
      "IsStaysAlone":data?.IsStaysAlone,
      "IsConfirmed":data?.IsConfirmed,
      // "DateComfirmed":data?.DateComfirmed,
      "StateOfOriginId":data?.StateOfOriginId,
      "StateOfOrigin":stateitems?.stateName,
      "LGAOfOriginId":data?.LGAOfOriginId,
      "LGAOfOrigin":lgaItems?.lgaOfOrigin,
      "LocationCommand.LGAId":data?.LocationCommand.LGAId,
      "LocationCommand.StateId":data?.LocationCommand.StateId,
      "LocationCommand.CountryId":data?.LocationCommand.CountryId,
      "LocationCommand.AddressTypeEnum":data?.LocationCommand.AddressTypeEnum,
      "LocationCommand.HouseNumber":data?.LocationCommand.HouseNumber,
      "LocationCommand.StreetAddress1":data?.LocationCommand.StreetAddress1,
      "LocationCommand.StreetAddress2":data?.LocationCommand.StreetAddress2,
      "LocationCommand.LandMark":data?.LocationCommand.LandMark,
      "LocationCommand.City":data?.LocationCommand.City,
      "LocationCommand.ZipCode":data?.LocationCommand.ZipCode,

    }
    const fileData = new FormData();
    const key = Object.keys(send);
    key?.forEach((key, index) => {
      fileData.append(`${key}`, send[key]);
    });
    
    const removedVendorDocument = vendorDocument
    ?.map((x) => x)
    ?.filter((x) => "file" in x);

  removedVendorDocument.forEach((element, index) => {
    fileData.append(
      `PassportPhotograph[${index}].file`,
      element?.file,
      element?.file?.name
    );
    fileData.append(`PassportPhotograph[${index}].fileName`, element?.fileName);
    fileData.append("id", id);
  });

    // return;
    location?

    dispatch(UpdateEmployeeInformation(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
       // reset();
        navigate(`../${location?.uuId}/view`);
      }
    }):
    dispatch(CreateEmployeeInformation(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${res?.payload?.responseObject?.id}/view`);
      }
    });

  };
  const documentList = [
    {
      name: "Passport Photograph",
    },

  ];

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
                  camelCase={"FirstName"}
                  placeholder={""}
                  isOptional={true}

                />
                <FormInput
                  title={"OtherName"}
                  camelCase={"OtherName"}
                  placeholder={"Enter"}
                  isOptional={true}

                />
              </div>
              <div>
                <FormInput
                  title={"Surname"}
                  camelCase={"Surname"}
                  placeholder={"Enter vendor location"}
                  isOptional={true}

                />

                <FormSelect
                  title={"Title"}
                  camelCase={"Title"}
                  placeholder={"Select"}
                  isOptional={true}

                  array={Object?.entries(Titles)?.map(
                    ([key, value])=> (
                      <option key={key} value={key}>
                      {key}
                    </option>
                    )
                  )}
                />
              </div>

              <div>
                <FormSelect
                  title={"Gender"}
                  camelCase={"Gender"}
                  placeholder={"enter"}
                  isOptional={true}
                defaultId={location?.gender}
                  array={Object?.entries(Genders)?.map(
                    ([key, value])=> (
                      <option key={key} value={key}>
                      {key}
                    </option>
                    )
                  )}

                  // array={Gender?.map((requestor, index) => (
                  //   <option
                  //     key={index}
                  //     value={requestor?.id}
                  //   >
                  //     {requestor?.name}
                  //   </option>
                  // ))}
                />

                <FormInput
                  title={"Date of Birth"}
                  camelCase={"DateOfBirth"}
                  placeholder={"select"}
                  type={"date"}
                  isOptional={true}
                  defaultValue={location?.dateOfBirth}



                />
              </div>

              <div>
                <FormSelect
                  title={"Genotype"}
                  camelCase={"Genotype"}
                  placeholder={"select"}
                  isOptional={true}
                  array={Object?.entries(Geno)?.map(
                    ([key, value])=> (
                      <option key={key} value={key}>
                      {key}
                    </option>
                    )
                  )}
                />

                <FormSelect
                  title={"Blood Group"}
                  camelCase={"BloodGroup"}
                  placeholder={"select"}
                  isOptional={true}
                  array={Object?.entries(Blood)?.map(
                    ([key, value])=> (
                      <option key={key} value={key}>
                      {key}
                    </option>
                    )
                  )}
                 
                />
              </div>

              <div>
                <FormSelect
                  title={"Marital Status"}
                  camelCase={"MaritalStatus"}
                  placeholder={"select"}
                  isOptional={true}

                  array={Object?.entries(Marital)?.map(
                    ([key, value])=> (
                      <option key={key} value={key}>
                      {key}
                    </option>
                    )
                  )}
                />

                <FormSelect
                  title={"Religion"}
                  camelCase={"Religion"}
                  placeholder={"select"}
                  isOptional={true}

                  array={Object?.entries(Religions)?.map(
                    ([key, value])=> (
                      <option key={key} value={key}>
                      {key}
                    </option>
                    )
                  )}
                />
              </div>

              <div>
                <FormInput
                  title={"phone Number"}
                  camelCase={"PhoneNumber"}
                  placeholder={"enter"}
                  registerOptions={{
                    pattern: {
                      value: Regrex.phone,
                      message: "Enter a valid Phone Number",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone Number must not be more than 15 digits",
                    },
                    minLength: {
                      value: 11,
                      message: "Phone Number must be of atleast 11 digits",
                    },
                  }}
                />

                <FormSelect
                  title={"Nationality"}
                  camelCase={"NationalityId"}
                  placeholder={"enter"}
                  isOptional={true}

                  array={countries?.responseObject?.map?.((x, index) => (
                    <option key={index} value={+x?.id}
                    >
                      {x?.txtcountryName}
                    </option>
                      ))}
                      moreRegister={{
                        onChange : (e)=>{
                          const isFound = countries?.responseObject?.find((x)=> +e.target.value === x?.id )
                          setNationItems(isFound, 'found')
                        },
                      }}
                     
                />
                 
              
              
              </div>
              <div>
                <FormSelect
                  title={"State of Origin"}
                  camelCase={"stateOfOriginId"}
                  placeholder={"enter"}
                  isOptional={true}

                  array={states?.responseObject?.map?.((x, index) => (
                    <option   
                    selected={
                      location?.stateOfOriginId === x?.stateId
                    }
                    key={index} value={+x?.stateId}>
                      {x?.stateName}
                    </option>
                      ))}
                      moreRegister={{
                        onChange : (e)=>{
                          const isFound = states?.responseObject?.find((x)=> +e.target.value === x?.stateId )
                     
                          setStateCode(isFound?.stateCode)
                          setStateItems(isFound, 'found')
                        },
                      }}
                  //state
                />

                <FormSelect
                  title={"LGA Of Origin"}
                  camelCase={"LGAOfOriginId"}
                  placeholder={"select"}
                  isOptional={true}

                  array={lgas?.responseObject?.map?.((x, index) => (
            
                    <option
                    key={index} value={+x?.lgaId}>
                      {x?.lgaName}
                    </option>
                      ))}
                      moreRegister={{
                        onChange : (e)=>{
                          const isFound = lgas?.responseObject?.find((x)=> +e.target.value === x?.lgaId )
                          setLgaItems(isFound, 'found')
                        },
                      }}
                  
              
                />
              </div>
              <div>
                <FormInput
                  title={"Email"}
                  camelCase={"PersonalEmail"}
                  placeholder={"enter"}
                  isOptional={true}
                  registerOptions={{
                    pattern: {
                      value: Regrex.email,
                      message: "Enter a valid Email Address",
                    },
                  }}

                  defaultValue={location?.personalEmail}
                />

                   <FormSelect
                  title={"Stays Alone"}
                  camelCase={"IsStaysAlone"}
                  placeholder={"select"}
                  isOptional={true}

                  array={
                    <>
                    <option value={'true'}>Yes</option>
                    <option value={'false'}>No</option>
                  </>
                  }
            
                
              
                />
              </div>

              <div>
                <FormInput
                  title={"Alergies"}
                  camelCase={"Alergies"}
                  placeholder={"enter"}
                  isOptional={true}

                  defaultValue={location?.alergies}
                />

                   <FormInput
                  title={"Maiden Name"}
                  camelCase={"MaidenName"}
                  placeholder={"enter"}
                  isOptional={true}
                  defaultValue={location?.maidenName}


                  
            
                
              
                />
              </div>

              <div>
                <FormInput
                  title={"Partners Work Place"}
                  camelCase={"PartnerPlaceOfWork"}
                  placeholder={"enter"}
                  isOptional={true}
                  defaultValue={location?.partnerPlaceOfWork}

                  // value={location?.personalEmail}
                />

                   <FormTextArea
                  title={"Remark"}
                  camelCase={"Remarks"}
                  placeholder={"enter"}
                  isOptional={false}
                  defaultValue={location?.remarks}
               


            
                
              
                />
              </div>
              </div>
          
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Account <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Bank"}
                  camelCase={"BankID"}
                  placeholder={"enter"}
                  isOptional={false}

                  array={banks?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.bankId}>
                      {x?.bankName}
                    </option>
                  ))}
                
                 
                />

                <FormInput
                  title={"Account Name"}
                  camelCase={"AccountName"}
                  placeholder={"enter"}
                  defaultValue={location?.accountName}
                  isOptional={false}

                  // value={location?.accountName}
                />
              </div>
              <div>
                <FormInput
                  title={"Account Number"}
                  camelCase={"AccountNumber"}
                  placeholder={"enter"}
                  isOptional={false}
                  defaultValue={location?.accountNumber}


                />
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Emplooye Address <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Address Type"}
                  camelCase={"LocationCommand.AddressTypeEnum"}
                  placeholder={"select"}
                  isOptional={false}
                  array={Object?.entries(AddresType)?.map(
                    ([key, value])=> (
                      <option key={key} value={key}>
                      {key}
                    </option>
                    )
                  )}

               
                />
                <FormInput
                  title={"Apartment Suite Numuber"}
                  camelCase={"LocationCommand.HouseNumber"}
                  placeholder={"enter"}
                  type={'number'}
                  isOptional={false}
                  defaultValue={location?.employeeAddresses?.houseNumber}


                  // value={location?.employeeAddresses?.houseNumber}
                />
              </div>

              <div>
                <FormInput
                  title={"Street Address"}
                  camelCase={"LocationCommand.StreetAddress1"}
                  placeholder={"enter"}
                  isOptional={false}

                  defaultValue={location?.employeeAddresses?.streetAddress1}
                />

                <FormInput
                  title={"Street Address 2"}
                  camelCase={"LocationCommand.StreetAddress2"}
                  placeholder={"enter"}
                  isOptional={false}

                   defaultValue={location?.employeeAddresses?.streetAddress2}
                />
              </div>
              <div>
                <FormSelect
                  title={"State"}
                  camelCase={"LocationCommand.StateId"}
                  placeholder={"enter"}
                  isOptional={false}
                   array={states?.responseObject?.map?.((x, index) => (
                    <option key={index} value={+x?.stateId}>
                      {x?.stateName}
                    </option>
                      ))}

                      moreRegister={{
                        onChange : (e)=>{
                          const isFound = states?.responseObject?.find((x)=> +e.target.value === x?.stateId )
                          //console.log(isFound)
                          //console.log(isFound?.stateCode)
                          setStateCode(isFound?.stateCode)
                        }
                      }}
                />

                <FormSelect
                  title={"LGA"}
                  camelCase={"LocationCommand.LGAId"}
                  placeholder={"enter"}
                  isOptional={false}

                  array={lgas?.responseObject?.map?.((x, index) => (
            
                    <option
                    key={index} value={+x?.lgaId}>
                      {x?.lgaName}
                    </option>
                      ))}
                
                />
              </div>

              <div>
                <FormSelect
                  title={"Country"}
                  camelCase={"LocationCommand.CountryId"}
                  placeholder={"enter"}
                  isOptional={false}
                  defaultId={location?.employeeAddresses?.countryId
                  }
                  array={countries?.responseObject?.map?.((x, index) => (
                    <option key={index} value={+x?.id}>
                      {x?.txtcountryName}
                    </option>
                      ))}

                    
                />

                <FormInput
                  title={"City"}
                  camelCase={"LocationCommand.City"}
                  placeholder={"enter"}
                  isOptional={false}

                 defaultValue={location?.employeeAddresses?.city}
                />
              </div>

              <div>
                <FormInput
                  title={"Land Mark"}
                  camelCase={"LocationCommand.LandMark"}
                  placeholder={"enter"}
                  isOptional={false}

                  defaultValue={location?.employeeAddresses?.landMark}
                />
              </div>
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
                  camelCase={"DateOFEmployment"}
                  placeholder={"select"}
                  type={"date"}
                  isOptional={false}

                />

                <FormInput
                  title={"Date Confirmed"}
                  camelCase={"DateComfirmed"}
                  placeholder={"select"}
                  type={"date"}
                  isOptional={false}
                  defaultValue={FormatDateTime(location?.dateComfirmed)}


                />
              </div>
              <div>
                <FormInput
                  title={"Last Promotion Date"}
                  camelCase={"LastPromotionDate"}
                  placeholder={"select date"}
                  type={"date"}
                  isOptional={false}
                  defaultValue={FormatDateTime(location?.lastPromotionDate)}

                />
                <FormInput
                  title={"Effective Date"}
                  camelCase={"EffectiveDate"}
                  placeholder={"select date"}
                  type={"date"}
                  isOptional={false}


                />
              </div>

              <div>
                <FormInput
                  title={"Staff Email"}
                  camelCase={"EmployeeStaffEmail"}
                  placeholder={"enter"}
                  isOptional={false}
                  defaultValue={location?.employeeStaffEmail}


                />

                <FormSelect
                  title={"Level"}
                  camelCase={"Level"}
                  placeholder={"select "}
                  isOptional={false}
                  defaultId={location?.level}
                  array={Object?.entries(LevelEnum)?.map(
                    ([key, value])=> (
                      <option key={key} value={value}>
                      {key}
                    </option>
                    )
                  )}

                  // array={Object?.entries(Genders)?.map(
                  //   ([key, value])=> (
                  //     <option key={key} value={key}>
                  //     {key}
                  //   </option>
                  //   )
                  // )}
                 
                />
              </div>
              <div>
                <FormSelect
                  title={"Cadre"}
                  camelCase={"CadreGradeId"}
                  placeholder={"select"}
                  isOptional={false}

                  array={cadre_position?.result?.map((requestor, index) => (
                    <option
                      // selected={location?.cadreGradeId === requestor?.id}
                      key={index}
                      value={requestor?.id}
                    >
                      {requestor?.title}
                    </option>
                  ))}
                />
                <FormInput
                  title={"PIN"}
                  camelCase={"Pin"}
                  placeholder={"Enter"}
                  isOptional={false}
                  defaultValue={location?.pin}

                  // value={location?.pin}
                />
              </div>

              <div>
                <FormSelect
                  title={"Designation"}
                  camelCase={"DesignationId"}
                  placeholder={"Enter"}
                  isOptional={false}
                  defaultId={location?.designationId}

                  array={get_designation?.responseObject?.pageItems?.map(
                    (requestor, index) => (
                      <option
                        // selected={location?.designationId === requestor?.id}
                        key={index}
                        value={requestor?.id}
                      >
                        {requestor?.designationName}
                      </option>
                    )
                  )}
                />
                <FormSelect
                  title={"Staff Group"}
                  camelCase={"StaffGroup"}
                  placeholder={"select"}
                  isOptional={false}

                  array={Object?.entries(StaffGroups)?.map(
                    ([key, value])=> (
                      // console.log(value)
                      <option key={key} value={value}>
                      {key}
                    </option>
                    )
                  )}

            
                />
              </div>

              <div>
                <FormSelect
                  title={"Mode of Registration"}
                  camelCase={"ModeOfRegistration"}
                  placeholder={"select"}
                  isOptional={false}

                  array={Object?.entries(ModeOfReg)?.map(
                    ([key, value])=> (
                      <option key={key} value={key}>
                      {key}
                    </option>
                    )
                  )}
                />
                <FormSelect
                  title={"Registration "}
                  camelCase={"RegistrationState"}
                  placeholder={"select "}
                  isOptional={true}

                 
                  array={Object?.entries(RegState)?.map(
                    ([key, value])=> (
                      <option key={key} value={key}>
                      {key}
                    </option>
                    )
                  )}
                />
              </div>


              <div>
                <FormSelect
                  title={"Reports To"}
                  camelCase={"ReportTo"}
                  placeholder={"choose"}
                  isOptional={false}
                  defaultId={location?.reportTo}


                  array={employees?.result?.map((requestor, index) => (
                    <option key={index} value={requestor?.id}>
                      {requestor?.firstName + " " + requestor?.surname}
                    </option>
                  ))}
               
                />
                  <FormInput
                  title={"Location"}
                  camelCase={"Location"}
                  placeholder={"choose"}
                  isOptional={false}
                  defaultValue={location?.location}
                
                />
              </div>

              <div>

           
              <FormSelect
                  title={"Unit/Container"}
                  camelCase={"ContainerId"}
                  placeholder={"choose"}
                  defaultId={location?.containerId}

                  array={all_container?.responseObject?.pageItems?.map((requestor, index) => (
                    <option key={index} value={requestor?.id}>
                      {requestor?.name}
                    </option>
                  ))}
               
                />
              </div>

              <div>
              <FormInput
                  title={"Postion Code"}
                  camelCase={"PositionCode"}
                  placeholder={"select"}
                  defaultValue={location?.positionCode}
                />
                <FormInput
                  title={"Agent Code"}
                  camelCase={"AgentCode"}
                  placeholder={"enter"}
                  defaultValue={location?.agentCode}

             
                />
              </div>
              <div>
              <FormInput
                  title={"Zip Code"}
                  camelCase={"ZipCode"}
                  placeholder={"enter"}
                  defaultValue={location?.zipCode}

                />
              <FormSelect
                  title={"Confirmation Status"}
                  camelCase={"IsConfirmed"}
                  placeholder={"select"}
                  array={
                    <>
                    <option value={'true'}>Yes</option>
                    <option value={'false'}>No</option>
                  </>
                  }
            
                
              
                />
              </div>
            </div>
          </section>

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
            <SupportButtons width={"auto"} onClick={() => reset()}>
              No,Cancel
            </SupportButtons>

            <ActionButtons
              disabled={!isValid}
              isLoading={isLoading}
              className={DashboardStyle?.button_cage_weight}
            >
          
          Submit
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default EditMyEmployeeInfo;
