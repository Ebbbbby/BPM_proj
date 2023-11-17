import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { useLocation, useNavigate, useParams } from 'react-router';
import PageLayout from '../../../Components/Layout/PageLayout';
import { FormProvider, useForm } from 'react-hook-form';
import { FormSelect, FormTemplate } from '../../../Components/Forms/InputTemplate';
import MultiSelect from '../../../Components/MultiSelect/MultiSelect';
import { ActionButtons, SupportButtons } from '../../../../global/components/Buttons/buttons';
import { UpdateQueryPanel, GetAllEmployees } from '../../../../../utils/redux/HR/HRSlice';
import { ProbablePunishments } from '../../../../../utils/const/QueryConst';


const AddQueryPanel = () => {
    const location = useLocation()?.state;
    const {all_employees} = useSelector((state)=> state.hr)
    const {id} = useParams()
    console.log(location)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(()=> {
        dispatch(GetAllEmployees({pageNumber:1, pageSize:10}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const defaultData = {
  
    };
    const formMethods = useForm({
      defaultValues: defaultData,
      mode: "all",
    });

    const {
      handleSubmit,
      watch,
      // formState: { isValid },
    } = formMethods;
  
    const submit = (data) => {
      let payload = {
        ...data,
        queryId:id*1,
        recommendation:data?.recommendation * 1,
        queryPanels: all_employees?.result?.map((x, index)=>{
          return {employeeId:x.id, isChairperson: false}
        })
      }
      // console.log(payload,'payload')
      // console.log(data,'data')
      // return;
     
      dispatch(UpdateQueryPanel(payload))?.then(
        (res)=>
          {
            if (res?.payload?.successful === true) {
              navigate(`../${location?.id}/view`);
            }
          }
      );
    };
    return (
      <PageLayout title={"Edit Panel Setup"} hasBack={true}>
        <FormProvider {...formMethods}>
          <FormTemplate
            className={DashboardStyle.view_app_components}
            handleSubmit={handleSubmit(submit)}
          >
            <section className={DashboardStyle.form_section}>
              <h4 className={DashboardStyle.form_section_title}>
              Panel Setup
              </h4>
              <div className={DashboardStyle.inputs_group}>
          
                <div style={{ gridTemplateColumns: "1fr" }}>
                  <MultiSelect
                    data={all_employees?.result?.map((x) => {
                      return {
                        name: x?.surname,
                        checkBoxName: x?.surname,
                        id: x?.id,
                        ...x,
                        
                      };
                    })}
                    dataValues={watch()?.queryPanels?.employeeId}
                    name={"queryPanels.employeeId"}
                    title={"Employees"}
                    isOptional={
                      watch()?.e?.length !== 0 ? true : false
                    }
                  />
                </div>
                <div>
                <FormSelect
                    title={"Recomendation"}
                    camelCase={"recommendation"}
                    placeholder={"select"}
                    array={ProbablePunishments?.map((x, index) => 
                      //console.log(x)
                      (
                      <option key={index} value={x?.id} selected={location?.recommendation === x?.name}>
                        {x?.name}
                      </option>
                   )
                    )}
              
                  />
               
                </div>
                 
  
              
              
              </div>
            </section>
      
            <div className={DashboardStyle.button_cage}>
              <SupportButtons
                width={"auto"}
                className={DashboardStyle?.button_cage_weight}
              >
            Cancel
              </SupportButtons>
              <ActionButtons
                width={"auto"}
                // isLoading={isLoading}
                className={DashboardStyle?.button_cage_weight}
              >
                Submit
              </ActionButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      </PageLayout>
    );
  };

export default AddQueryPanel
