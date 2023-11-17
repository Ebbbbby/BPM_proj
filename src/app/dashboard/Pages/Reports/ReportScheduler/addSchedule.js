import React, {useState} from 'react';
import "flatpickr/dist/themes/material_green.css";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import PageStyle from "../../../Components/Layout/PageLayout";
import RptStyle from "../Style/Reports.module.css";
import {useForm} from "react-hook-form";
import {ActionButtons, SupportButtons} from "../../../../global/components/Buttons/buttons";
import DatePicker from '../../../Components/Forms/DatePicker';
import ReportFormatSelect from "../../../Components/Forms/ReportFormatSelect";

const Required = ()=>(
    <span className="color-red">*</span>
)

export default function ReportScheduler() {
    const [frequency, setFrequency] = useState();
    const [date, setDate] = useState(new Date());

    const { handleSubmit, setValue, register } = useForm({
        defaultValues: {
            frequency: "daily",
            reportFormat: 'PDF,Excel',
            runTime: '',
        }
    })

    const onSubmit = (value)=>{
    }

    const selectAllDays = () => {

    }

    return (
        <RouteLayout title="Reports / Add New Schedule">
            <PageStyle>
                <div className={`${RptStyle.head} ${RptStyle.head_underline}`}>
                    <div className={RptStyle.head_text}>
                        Add New Schedule
                    </div>
                </div>
                <div className={RptStyle.scheduler}>
                    <div className="form">
                        <div className={RptStyle.form_headline}>
                            Choose the hours of the day or days of the week you would like to set schedule for.
                        </div>
                        <div className={`${RptStyle.scheduler_frequency} form__row`}>
                            <div>
                                <input id="daily" value="daily" type="radio" className="" {...register('frequency')} />
                                <label htmlFor="daily" >Daily</label>
                            </div>
                            <div>
                                <input id="weekly" value="weekly" type="radio" className="" {...register('frequency')} />
                                <label htmlFor="weekly" >Weekly</label>
                            </div>
                            <div>
                                <input id="monthly" value="monthly" type="radio" className="" {...register('frequency')} />
                                <label htmlFor="monthly" >Monthly</label>
                            </div>
                        </div>
                        <div>
                            <div className={RptStyle.form_headline}>
                                Select the time of the day you want the schedule to run and the reporting format
                            </div>
                            <div className="form__row">
                                <div className="form__group">
                                    <label htmlFor="run-time" className="form__label">Run Time<Required /></label>
                                    <DatePicker
                                        initialValue={date}
                                        dateFormat={false}
                                        onChange={(val)=>setValue('runTime', val)}
                                    />

                                </div>
                                <div className="form__group">
                                    <label htmlFor="report-format"  className="form__label">Report Format<Required /></label>
                                    <ReportFormatSelect
                                        id={"report-format"}
                                        onChange={(val)=>setValue('reportFormat', val)}
                                    />
                                </div>
                            </div>
                            <div className={RptStyle.form_headline}>
                                From Sunday - Saturday
                            </div>
                        </div>
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="week" className="form__label">Week<Required /></label>
                                <div className="form__input--group">

                                    <select className="form__select">
                                        <option value={1}>Week 1</option>
                                        <option value={2}>Week 2</option>
                                        <option value={3}>Week 3</option>
                                        <option value={4}>Week 4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={RptStyle.form_headline}>
                                Select the time of the day you want the schedule to run and the reporting format
                            </div>
                            <table className={RptStyle.table}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input id="select-all-days" name="select-all-days" type="checkbox" className="styled-checkbox" onChange={selectAllDays} />
                                            <label htmlFor="select-all-days">Days of the Week</label>
                                        </td>
                                        <td>
                                            Run Time
                                        </td>
                                        <td>
                                            Report Format
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="sunday" name="sunday" type="checkbox" className="styled-checkbox" onChange={selectAllDays} />
                                            <label htmlFor="sunday">Sunday</label>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <DatePicker
                                                    initialValue={date}
                                                    dateFormat={false}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <ReportFormatSelect
                                                    id={"report-format"}
                                                    onChange={(val)=>setValue('reportFormat', val)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="monday" name="monday" type="checkbox" className="styled-checkbox" onChange={selectAllDays} />
                                            <label htmlFor="monday">Monday</label>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <DatePicker
                                                    initialValue={date}
                                                    dateFormat={false}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <ReportFormatSelect
                                                    id={"report-format"}
                                                    onChange={(val)=>setValue('reportFormat', val)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="tuesday" name="tuesday" type="checkbox" className="styled-checkbox" onChange={selectAllDays} />
                                            <label htmlFor="tuesday">Tuesday</label>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <DatePicker
                                                    initialValue={date}
                                                    dateFormat={false}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <ReportFormatSelect
                                                    id={"report-format"}
                                                    onChange={(val)=>setValue('reportFormat', val)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="wednesday" name="wednesday" type="checkbox" className="styled-checkbox" onChange={selectAllDays} />
                                            <label htmlFor="wednesday">Wednesday</label>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <DatePicker
                                                    initialValue={date}
                                                    dateFormat={false}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <ReportFormatSelect
                                                    id={"report-format"}
                                                    onChange={(val)=>setValue('reportFormat', val)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="thursday" name="thursday" type="checkbox" className="styled-checkbox" onChange={selectAllDays} />
                                            <label htmlFor="thursday">Thursday</label>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <DatePicker
                                                    initialValue={date}
                                                    dateFormat={false}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <ReportFormatSelect
                                                    id={"report-format"}
                                                    onChange={(val)=>setValue('reportFormat', val)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="friday" name="friday" type="checkbox" className="styled-checkbox" onChange={selectAllDays} />
                                            <label htmlFor="friday">Friday</label>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <DatePicker
                                                    initialValue={date}
                                                    dateFormat={false}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <ReportFormatSelect
                                                    id={"report-format"}
                                                    onChange={(val)=>setValue('reportFormat', val)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="saturday" name="saturday" type="checkbox" className="styled-checkbox" onChange={selectAllDays} />
                                            <label htmlFor="saturday">Saturday</label>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <DatePicker
                                                    initialValue={date}
                                                    dateFormat={false}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form__group">
                                                <ReportFormatSelect
                                                    id={"report-format"}
                                                    onChange={(val)=>setValue('reportFormat', val)}
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className={RptStyle.scheduler_actions}>
                            <SupportButtons>
                                Cancel
                            </SupportButtons>
                            <ActionButtons onClick={handleSubmit(onSubmit)}>
                                Save Schedule
                            </ActionButtons>
                        </div>
                    </div>

                </div>
            </PageStyle>
        </RouteLayout>
        )
}