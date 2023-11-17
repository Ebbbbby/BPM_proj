import React,{useState,useEffect} from 'react'
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { ActionButtons, CTAButtons, SupportButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import Pagination from "../../../Components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../Components/Misc/Actions";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormSelect, FormTemplate, FormTextArea } from "../../../Components/Forms/InputTemplate";
import { FiX } from "react-icons/fi";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  GetLeaveTypes,
} from "../../../../../utils/redux/HR/HRSlice";
import { staffGroup, gender} from '../ApprovalConstants/LeaveTypeConts';
import { GetSearchParams } from '../../../../../utils/functions/ResourceFunctions';
import { UpdateLeaveType,CreateLeaveType } from '../../../../../utils/redux/HR/HRSlice';

const EditLeaveSetUp = () => {
  const [openModal, setOpenModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leave_types, isLoading} = useSelector(
    (state) => state.hr);

  useEffect(() => {
    dispatch(GetLeaveTypes({ pageNumber: currentPage, perPage: pageSize}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  const actionButton = (
    <>
      <CTAButtons onClick={() => {
          navigate("?modal_type=setup");
          setOpenModal(!openModal);
        }}>Create New</CTAButtons>
    </>
  );


  return (
    <PageStyle
    title={"Leave Set Up"}
    hasBack={false}
    action={actionButton}
    isMain={true}
  >   <div className={DashboardStyle.dashboard_table_holder}>
  <Table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Leave Title</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {leave_types?.data?.map((acq, index) => (
        <AcqTable
          {...acq}
          data={leave_types}
          index={index}
          isLoading={isLoading}
          isOpen={openModal}
          setIsOpen={setOpenModal}
        />
      ))}
    </tbody>
  </Table>
</div>
<AppModalTemplate
  padding={"0px"}
  isOpen={openModal}
  setIsOpen={setOpenModal}
>
  {getURLData("modal_type") === "setup" && (
    <CreateSetUpActions
      isOpen={openModal}
      setIsOpen={setOpenModal}
      isLoading={isLoading}
    />
  )}
</AppModalTemplate>
<Pagination
  last_page={leave_types?.metaData?.totalPages}
  present_page={leave_types?.metaData?.page}
  totalRows={leave_types?.metaData?.perPage}
  pageSize={pageSize}
  setPageSize={(page) => setPageSize(page)}
  click={(page) => setCurrentPage(page)}
/>
</PageStyle>

  )
}

export default EditLeaveSetUp

function AcqTable ({ id,
  title,
  description,
  uuId,
  index,
  isOpen,
  setIsOpen}){
    const navigate = useNavigate();

    return(
      <>
       <tr key={index}>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>
        <TableActions hasChildren={true} /*url={`${id}/view`}*/ >
            {[
                {
                  name: "Edit Leave type",
                  action: () => {
                      setIsOpen(!isOpen);
                      navigate(`?modal_type=setup&isEdit=true&title=${title}&des=${description}&id=${uuId}`);
                  },
                },
                      
            ]}
        </TableActions>  
        </td>
        </tr>
      </>
    )
}
function CreateSetUpActions  ({ 
   isOpen,
  setIsOpen,
  category,
  isLoading}){   
    const location = useLocation()?.state;
    const dispatch = useDispatch();
  
    const defaultData = {
      title: location?.title,
      description: location?.description,
      durationValue: location?.durationValue,
      durationType: 0,
      staffGroup: parseInt(location?.staffGroup),
      genderEligibility: parseInt(location?.genderEligibility),
    };
  
    const formMethods = useForm({
      defaultValues: defaultData,
      mode: "all",
    });
    const {
      handleSubmit,
      formState: { isValid },
    } = formMethods;
  
    const submit = (data) => {

      const formData = {
        ...data,
        staffGroup: parseInt(data?.staffGroup),
        genderEligibility: parseInt(data?.genderEligibility),
      }
      
        GetSearchParams("isEdit") === "true"
        ? dispatch(
            UpdateLeaveType({
              ...data,
              typeId: +GetSearchParams("id"),
            })
          )?.then((res) => {
            if (res?.payload?.successful === true) {
              window.location.reload();
            }
          })
        : 
        dispatch(CreateLeaveType(formData))?.then((res) => {
            if (res?.payload?.successful === true) {
              setIsOpen(!isOpen);
              dispatch(
                
                GetLeaveTypes({
                  pageNumber: 1, 
                  perPage: 10000000,
                
                })
              );
            }
        });
    };
  
    return (
      <div className={DashboardStyle.dash_board_home_nav}>
        <div className={DashboardStyle.dash_board_home_nav_header}>
          <h4>
            {GetSearchParams("isEdit") === "true" ? "Update" : "Create"} Leave Type
          </h4>
          <FiX
            style={{ cursor: "pointer" }}
            size={"1.5rem"}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className={DashboardStyle.dash_board_home_nav_body}>
          {isLoading && <small>Loading...</small>}
          <div>
            <FormProvider {...formMethods}>
              <FormTemplate handleSubmit={handleSubmit(submit)}>
                <FormInput
                  title={"Leave Title"}
                  camelCase={"title"}
                  placeholder={"select"}
                />

                <FormSelect 
                title={'gender'}
                camelCase={'genderEligibility'}
                placeholder={'select gender'}
                array={Object.entries(gender)?.map?.(([key, value]) => (
                  <option key={key} value={value}>
                    {key}
                  </option>
                ))}
      
                
                />

                <FormSelect 
                title={'staff group'}
                camelCase={'staffGroup'}
                placeholder={'select staff group'}
                array={Object.entries(staffGroup)?.map?.(([key, value]) => (
                  <option key={key} value={value}>
                    {key}
                  </option>
                ))}     
                
                />

                <FormInput
                  title={"Number of Days"}
                  camelCase={"durationValue"}
                  placeholder={"enter number of days"}
                />

                <FormTextArea title={"Description"} camelCase={"description"} />
                <div
                  style={{ marginTop: "1rem" }}
                  className={DashboardStyle.button_cage}
                >
                  <SupportButtons
                    width={"auto"}
                    onClick={() => setIsOpen(!isOpen)}
                    className={DashboardStyle?.button_cage_weight_without_border}
                  >
                    No, Cancel
                  </SupportButtons>
                  <ActionButtons
                    isLoading={isLoading}
                    disabled={!isValid}
                    width={"auto"}
                    className={DashboardStyle?.button_cage_weight}
                    bg="var(--primary-color)"
                  >
                    Submit
                  </ActionButtons>
                </div>
              </FormTemplate>
            </FormProvider>
          </div>
        </div>
      </div>
    );
  
}