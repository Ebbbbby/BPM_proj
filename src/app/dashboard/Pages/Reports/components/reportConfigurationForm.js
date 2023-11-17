import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import RptStyle from "../Style/Reports.module.css";
import {ActionButtons, SupportButtons} from "../../../../global/components/Buttons/buttons";
import input from "../../../../auth/components/styles/input.module.css";
import {GetAllDepartments} from "../../../../../utils/redux/Vendor/VendorSlice";
import {useDispatch, useSelector} from "react-redux";

const Required = ()=>(
  <span className="color-red">*</span>
)

export default function ReportConfigurationForm({ configurationDetails, onFinish }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { all_departments, isLoadingAction: isDepartmentsLoading } = useSelector(
    (state) => state?.vendor
  );

  const getDepartmentLabel = (val)=>{
    const theFoundValue = all_departments.responseObject.pageItems.find(a=>a.name === val)
    return theFoundValue?.id;
  }

  useEffect(()=>{
    dispatch(GetAllDepartments());
    if(configurationDetails && Object.keys(configurationDetails)) {
      reset({
        ...configurationDetails
      })
    }
  }, [configurationDetails])

  const validationSchema = Yup.object().shape({
    reportName: Yup.string().required("Report Name is required"),
    storedFunction: Yup.string().required("Stored dunction is required"),
    recipients: Yup.string().required("Recipients is required"),
    reportFormat: Yup.string().required("Please select a Report format"),
    department: Yup.string().required("Please select a department"),
    // description: Yup.string().required("Description is required"),
  });

  const defaultValues = {
    reportName: "",
    storedFunction: "",
    recipients: "",
    parameters: "",
    values: "",
    reportFormat: "",
    department:  "",
    departmentID:  "",
    description: "",
  }

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: configurationDetails && Object.keys(configurationDetails).length ? configurationDetails : defaultValues,
  });
  return (
        <>
          <div className={`${RptStyle.add}`}>
            <div className={RptStyle.add_head}>
              <h4>Setup information</h4>
              <div>This allows for a report to be setup</div>
            </div>
            <div className={RptStyle.add_form}>
              <div className="form__row">
                <div className="form__group">
                  <label htmlFor="report-name" className="form__label">
                    Report Name <Required />
                  </label>
                  <input
                    id="report-name"
                    type="text"
                    className="form__input"
                    placeholder="Enter Report Name"
                    {...register("reportName")}
                  />
                  {errors.reportName && (
                    <small className={input.form__error__message}>
                      {errors.reportName.message}
                    </small>
                  )}
                </div>
                <div className="form__group">
                  <label htmlFor="values" className="form__label">
                    Report Format <Required />
                  </label>
                  <select
                    id="report-format"
                    className="form__select"
                    {...register("reportFormat")}
                  >
                    <option value={"0"}>Excel</option>
                    <option value={"1"}>PDF</option>
                    <option value={"0,1"}>PDF,Excel</option>
                  </select>
                  {errors.reportFormat && (
                    <small className={input.form__error__message}>
                      {errors.reportFormat.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="form__row">
                <div className="form__group">
                  <label htmlFor="recipients" className="form__label">
                    Recipients <Required />
                  </label>
                  <input
                    id="recipients"
                    type="text"
                    className="form__input"
                    placeholder="Enter Email Address seperated by commas"
                    {...register("recipients")}
                  />
                  {errors.recipients && (
                    <small className={input.form__error__message}>
                      {errors.recipients.message}
                    </small>
                  )}
                </div>
                <div className="form__group">
                  <label htmlFor="stored-function" className="form__label">
                    Stored Function <Required />
                  </label>
                  <input
                    id="stored-function"
                    type="text"
                    className="form__input"
                    placeholder="Report Stored Function"
                    {...register("storedFunction")}
                  />
                  {errors.storedFunction && (
                    <small className={input.form__error__message}>
                      {errors.storedFunction.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="form__row">
                <div className="form__group">
                  <label htmlFor="values" className="form__label">
                    Values
                  </label>
                  <input
                    id="values"
                    type="text"
                    className="form__input"
                    placeholder="Enter values seperated by commas"
                    {...register("values")}
                  />
                  {errors.values && (
                    <small className={input.form__error__message}>
                      {errors.values.message}
                    </small>
                  )}
                </div>
                <div className="form__group">
                  <label htmlFor="parameter" className="form__label">
                    Parameters
                  </label>
                  <input
                    id="recipients"
                    type="text"
                    className="form__input"
                    placeholder="Enter parameters seperated by commas"
                    {...register("parameters")}
                  />
                  {errors.parameters && (
                    <small className={input.form__error__message}>
                      {errors.parameters.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="form__row">
                {
                  !isDepartmentsLoading &&
                  <div className="form__group">
                    <label htmlFor="department" className="form__label">Department</label>
                    <select
                      name="department"
                      id="department"
                      className="form__select"
                      // value={department}
                      {...register('department', {
                        onChange: (e) => {
                          setValue("departmentID", getDepartmentLabel(e.target.value))
                        },
                      })}
                    >
                      <option value="">Select department</option>
                      {all_departments?.responseObject?.pageItems?.length > 0 && all_departments.responseObject.pageItems.map(department=>(
                        <option key={department.id} value={department.name}>{department.name}</option>
                      ))}
                    </select>
                    {errors.department && (
                      <small className={input.form__error__message}>
                        {errors.department.message}
                      </small>
                    )}
                  </div>
                }
              </div>
              {/*<div className="form__row">*/}
                <div className="form__group">
                  <label htmlFor="values" className="form__label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form__input"
                    placeholder="Enter report description"
                    rows={6}
                    {...register("description")}
                  />
                  {errors.description && (
                    <small className={input.form__error__message}>
                      {errors.description.message}
                    </small>
                  )}
                </div>
              {/*</div>*/}
            </div>
          </div>
          <div className={`form__group ${RptStyle.add_action_btns}`}>
          <SupportButtons onClick={()=>navigate('../')}>
            Cancel
          </SupportButtons>
          <ActionButtons onClick={handleSubmit(onFinish)}>
            Continue
          </ActionButtons>
        </div>
        </>
  )
}