import React,{useState,useEffect} from "react";
import { CTAButtons } from "../../../../../global/components/Buttons/buttons";
import PageStyle from "../../../../Components/Layout/PageLayout";
import { useNavigate } from "react-router";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CalendarFilter2, FilterButton, ProDropFilter, SearchFilter } from "../../../../Components/Search/Search";
import { TableActions } from "../../../../Components/Misc/Actions";
import Table from "../../../../Components/Table/Table";
import { GetExitDiscussionQuestion } from "../../../../../../utils/redux/HR/HRSlice";
import { useApprovals } from "../../../Vendors/VendorApprovals/useApprovals";

const ExitDiscussionSetUp = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()


  const { get_discussion_question, isLoading } = useSelector((state) => state?.hr);
  //console.log(get_discussion_question)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(
        GetExitDiscussionQuestion()
    );
  }, []);

  const handleFilterButton = ()=>{
    dispatch(GetExitDiscussionQuestion())

  }
  const actionButton = (
    <>
      <CTAButtons
        onClick={() => {
          navigate('add');
          setOpenModal(!openModal);
        }}
      >
        Create Discussions
      </CTAButtons>
    </>
  );

  return (
    <PageStyle 
    title={"Exit Discussion"}
    hasBack={false}
    action={actionButton}
    isMain={true}>

<div className={DashboardStyle.dashboard_filter}>
        <SearchFilter/>

        {/* <ProDropFilter
          filter={''}
          setFilter={''}
          name={"Approval Status"}
          filterBy={''}
        /> */}

        <CalendarFilter2
          name="Select Date Range"
          setStartDate={''}
          setEndDate={''}
        />
        <FilterButton name="" onClick={() => handleFilterButton} />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>Discussion Questions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <DiscussionTable
              data={get_discussion_question}
              isLoading={isLoading}
            
            />

            {get_discussion_question?.responseObject?.map((item) => (
              // console.log(item)
              <DiscussionTable {...item} isLoading={isLoading} />
            ))}
          </tbody>
        </Table>
      </div>
       
    </PageStyle>
  );
};

export default ExitDiscussionSetUp;


const DiscussionTable = ({ data}) => {
    const { openModal, closeModal } = useApprovals({});
  
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
      <>   
      {data && data?.responseObject?.map((item)=>(
         <tr key={item?.id}>
         <td>{item?.question}</td>       
      <td><TableActions hasChildren={true} /*url={`${id}/view`}*/ >
         {[
             {
               name: "Edit Question",
               action: () => {
                 navigate()
                
               },
             },
             {
                 name: "Delete Question",
                 action: () => {
                   openModal({
                     type: "suspend",
                     details: {
                       button: {
                         name: "Delete",
                         color: "red",
                       },
                       isDelete: true,
                       isDeleteHero: "",
                       isDeleteSupport:
                         "Are you sure you want to delete question? This action cannot be undone.",
                       title: "Delete Question",
                       submitData: (data) => {
                         dispatch(

                          )?.then((res) => {
                           if (res?.payload?.successful === true) {
                             closeModal();
                             navigate("./");
                           }
                         });
                       },
                     },
                   });
                 },
               }      
         ]}
         
     </TableActions>  </td>
       </tr>

      ))}

         
    
      </>
    );
  };


