import React from 'react';
import RouteLayout from "../../../Components/Layout/RouteLayout";
import PageStyle from "../../../Components/Layout/PageLayout";
import RptStyle from "../Style/Reports.module.css";
import {ActionButtons, SupportButtons} from "../../../../global/components/Buttons/buttons";
import {useForm} from "react-hook-form";
import ReportFormatSelect from "../../../Components/Forms/ReportFormatSelect";
import DeleteSetupModal from "../../../Components/Modals/Report/DeleteSetupModal";

const Required = ()=>(
    <span className="color-red">*</span>
)

export default function () {
    const { handleSubmit, setValue, register } = useForm({
        defaultValues: {
            reportName: "",
            description: "",
            scheduleInformation: "",
            reportFormat: "",
            informationSource: "",
            storedFunction: "",
            parameterConfiguration: "",
            receiversEmailAddress: "",
        }
    });
    return (
        <RouteLayout>
            <PageStyle>
                <div className={`${RptStyle.head} ${RptStyle.head_underline}`}>
                    <div>
                        <div className={RptStyle.head_text}>
                            Report Configuration Details
                        </div>
                        <div className={RptStyle.head_text_sub}>
                            Setup reporting framework here.
                        </div>
                    </div>
                </div>
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
                            </div>
                            <div className="form__group">
                                <label htmlFor="report-description" className="form__label">
                                    Description
                                </label>
                                <textarea
                                    id="report-description"
                                    className="form__input"
                                    placeholder="Enter Description"
                                    rows={5}
                                    {...register("description")}
                                ></textarea>
                            </div>
                        </div>
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="schedule" className="form__label">
                                    Schedule Information <Required />
                                </label>
                                <select id="schedule" className="form__select"
                                        {...register("scheduleInformation")}>
                                    <option value="" defaultValue="">Select schedule Information</option>
                                </select>
                            </div>
                            <div className="form__group">
                                <label htmlFor="report-format" className="form__label">
                                    DescriptionReport format (PDF, Excel)
                                </label>
                                <ReportFormatSelect onChange={(val)=>setValue('reportFormat', val)} />
                            </div>
                        </div>
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="schedule" className="form__label">
                                    Information Source <Required />
                                </label>
                                <select id="schedule" className="form__select"
                                        {...register("informationSource")}>
                                    <option value="" defaultValue="">Select Information Source</option>
                                </select>
                            </div>
                            <div className="form__group">
                                <label htmlFor="stored-function" className="form__label">
                                    Stored Function <Required />
                                </label>
                                <input
                                    id="stored-function"
                                    type="text"
                                    className="form__input"
                                    placeholder="Enter Stored Function"
                                    {...register("storedFunction")}
                                />
                            </div>
                        </div>
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="report-description" className="form__label">
                                    Parameter Configuration <Required />
                                </label>
                                <textarea
                                    id="report-description"
                                    className="form__input"
                                    placeholder="Enter parameter configuration"
                                    rows={5}
                                    {...register("parameterConfiguration")}
                                ></textarea>
                            </div>
                            <div className="form__group">
                                <label htmlFor="receiver-email" className="form__label">
                                    Receiver's Email Address <Required />
                                </label>
                                <input
                                    id="receiver-email"
                                    type="text"
                                    className="form__input"
                                    placeholder="Enter receiver email address"
                                    {...register("receiverEmail")}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className={`form__group ${RptStyle.add_action_btns}`}>
                    <SupportButtons>
                        Cancel
                    </SupportButtons>
                    <ActionButtons>
                        Save
                    </ActionButtons>
                </div>

            </PageStyle>
        </RouteLayout>
    )
}