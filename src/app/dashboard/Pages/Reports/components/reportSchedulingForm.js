import React, {useEffect, useState} from 'react';
import "flatpickr/dist/themes/material_green.css";
import RptStyle from "../Style/Reports.module.css";
import {useForm} from "react-hook-form";
import {ActionButtons, SupportButtons} from "../../../../global/components/Buttons/buttons";
import DatePicker from '../../../Components/Forms/DatePicker';
import {useSelector} from "react-redux";

const Required = ()=>(
  <span className="color-red">*</span>
)

const arrayRange = (start, stop, step = 1) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

const todaysDate = new Date();
const nineAMToday = new Date(todaysDate.getFullYear(),todaysDate.getMonth()+1,todaysDate.getDate(),9,0,0,0)

export default function ReportSchedulingForm({initialValues, onBack, onFinish}) {
  const { isLoading } = useSelector((state) => state?.report);
  const [frequency, setFrequency] = useState('daily');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDays, setSelectedDays] = useState({
    all: 0,
    monday: 1,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  });

  useEffect(()=>{
    if(initialValues && Object.keys(initialValues).length > 0){
      setIsEdit(true)
      setFrequency(initialValues.schedular === 2 ? 'monthly' : initialValues.schedular === 1 ? 'weekly' : 'daily')
      setSelectedDays({
        monday: initialValues.monday,
        tuesday: initialValues.tuesday,
        wednesday: initialValues.wednesday,
        thursday: initialValues.thursday,
        friday: initialValues.friday,
        saturday: initialValues.saturday,
        sunday: initialValues.sunday,
      })
      const rfv = {
        schedular: initialValues.schedular,
        runTime: initialValues.runTime,
        dayOfTheMonth: initialValues.dayOfTheMonth,
      }
      reset(rfv)
    }
  }, [initialValues])

  const defaultFormValues = {
    schedular: 0,
    runTime: nineAMToday,
    dayOfTheMonth: "1",
  }

  const { handleSubmit, setValue, register, reset } = useForm({
    defaultValues: defaultFormValues
  })

  const dayArray = arrayRange(1, 28)

  const onSubmit = (value)=>{
    let allValues = {...value}
    if(allValues.schedular !== 2) {
      delete allValues.dayOfTheMonth
    }
    if(value.schedular === 1){
      allValues = {
        ...allValues,
        ...selectedDays
      }
      delete allValues.all
    }
    onFinish(allValues);
  }

  useEffect(()=>{
    if(!selectedDays.all && selectedDays.sunday && selectedDays.monday
    && selectedDays.tuesday && selectedDays.wednesday && selectedDays.thursday
    && selectedDays.friday && selectedDays.saturday){
      setSelectedDays({
        ...selectedDays,
        all: 1
      })
    }
  }, [selectedDays])

  const selectAllDays = (val) => {
    setSelectedDays({
      all: val,
      monday: val,
      tuesday: val,
      wednesday: val,
      thursday: val,
      friday: val,
      saturday: val,
      sunday: val,
    })
  }

  const selectDay = (e, day) => {
    let tempSelectedDay = {
      ...selectedDays,
      all: 0,
    };
    tempSelectedDay[day] = !e.target.checked ? 0 : 1;
    setSelectedDays(tempSelectedDay);
  }


  return (
    <>
      <div className={`${RptStyle.add}`}>
        <div className={RptStyle.add_head}>
          <h4>Schedule information</h4>
          <div>This lets you set the frequency and time the report is sent</div>
        </div>
        <div className={RptStyle.add_form}>
          <div className={RptStyle.scheduler}>
            <div className="form">
              <div className={RptStyle.form_headline}>
                Choose the hours of the day or days of the week you would like to set schedule for.
              </div>
              <div className={`${RptStyle.scheduler_frequency} form__row`}>
                <div>
                  <input
                    id="daily"
                    value="daily"
                    name="daily"
                    type="radio"
                    checked={frequency === 'daily'}
                    className=""
                    onChange={(e)=>{
                      setValue('schedular', 0);
                      setFrequency(e.target.value);
                    }}
                  />
                  <label htmlFor="daily" >Daily</label>
                </div>
                <div>
                  <input
                    id="weekly"
                    value="weekly"
                    name="weekly"
                    type="radio"
                    checked={frequency === 'weekly'}
                    className=""
                    onChange={(e)=>{
                      setValue('schedular', 1);
                      setFrequency(e.target.value);
                    }}
                  />
                  <label htmlFor="weekly" >Weekly</label>
                </div>
                <div>
                  <input
                    id="monthly"
                    value="monthly"
                    name="monthly"
                    type="radio"
                    checked={frequency === 'monthly'}
                    className=""
                    onChange={(e)=>{
                      setValue('schedular', 2);
                      setFrequency(e.target.value);
                    }}
                  />
                  <label htmlFor="monthly" >Monthly</label>
                </div>
              </div>
              <div>
                <div className={RptStyle.form_headline}>
                  Select the time of the day you want the schedule to run
                </div>
                <div className="form__row">
                  <div className="form__group">
                    <label htmlFor="run-time" className="form__label">Run Time<Required /></label>
                    <DatePicker
                      initialValue={isEdit && initialValues.runTime ? initialValues.runTime : nineAMToday}
                      // initialValue={initialValues.runTime}
                      dateFormat={false}
                      onChange={(val)=>setValue('runTime', val)}
                    />

                  </div>
                </div>
              </div>
              {
                frequency === 'weekly' &&
                <div>
                  <div className={RptStyle.form_headline}>
                    Select the days you want the schedule to run and the reporting format
                  </div>
                  <table className={RptStyle.table}>
                    <tbody>
                    <tr>
                      <td>
                        <input
                          id="select-all-days"
                          name="select-all-days"
                          type="checkbox"
                          className="styled-checkbox"
                          checked={selectedDays.all === 1}
                          onChange={e=>{
                            const val = !e.target.checked ? 0 : 1;
                            selectAllDays(val)
                          }}
                        />
                        <label htmlFor="select-all-days">Days of the Week</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          id="monday"
                          name="monday"
                          type="checkbox"
                          className="styled-checkbox"
                          checked={selectedDays.monday === 1}
                          onChange={e=>selectDay(e, 'monday')}

                        />
                        <label htmlFor="monday">Monday</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          id="tuesday"
                          name="tuesday"
                          type="checkbox"
                          className="styled-checkbox"
                          checked={selectedDays.tuesday === 1}
                          onChange={(e)=>selectDay(e, 'tuesday')}
                        />
                        <label htmlFor="tuesday">Tuesday</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          id="wednesday"
                          name="wednesday"
                          type="checkbox"
                          className="styled-checkbox"
                          checked={selectedDays.wednesday === 1}
                          onChange={e=>selectDay(e, 'wednesday')}
                        />
                        <label htmlFor="wednesday">Wednesday</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          id="thursday"
                          name="thursday"
                          type="checkbox"
                          className="styled-checkbox"
                          checked={selectedDays.thursday === 1}
                          onChange={e=>selectDay(e, 'thursday')}
                        />
                        <label htmlFor="thursday">Thursday</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          id="friday"
                          name="friday"
                          type="checkbox"
                          className="styled-checkbox"
                          checked={selectedDays.friday === 1}
                          onChange={e=>selectDay(e, 'friday')}
                        />
                        <label htmlFor="friday">Friday</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          id="saturday"
                          name="saturday"
                          type="checkbox"
                          className="styled-checkbox"
                          checked={selectedDays.saturday === 1}
                          onChange={e=>selectDay(e, 'saturday')}
                        />
                        <label htmlFor="saturday">Saturday</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          id="sunday"
                          name="sunday"
                          type="checkbox"
                          className="styled-checkbox"
                          checked={selectedDays.sunday === 1}
                          onChange={e=>selectDay(e, 'sunday')}
                        />
                        <label htmlFor="sunday">Sunday</label>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              }
              {
                frequency === 'monthly' &&
                <div>
                  <div className={RptStyle.form_headline}>
                    Select the day of the month you want the schedule to run
                  </div>
                  <div className="form__row">
                    <div className="form__group">
                      <label htmlFor="values" className="form__label">
                        Report Format <Required />
                      </label>
                      <select
                        id="report-format"
                        className="form__select"
                        {...register("dayOfTheMonth")}
                      >
                        {
                          dayArray.map((day, index)=>(
                            <option val={day} key={index}>{day}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
      <div className={RptStyle.scheduler_actions}>
        <SupportButtons disabled={isLoading} onClick={onBack}>
          Back
        </SupportButtons>
        <ActionButtons disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          {isLoading ? '...Please Wait': "Save Schedule"}
        </ActionButtons>
      </div>
    </>
  )
}