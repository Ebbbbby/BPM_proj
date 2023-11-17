import React,{useEffect, useState} from "react";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import PageStyle from "../../../Components/Layout/PageLayout";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import {
  CalendarFilter2,
  FilterButton,
  SearchFilter,
} from "../../../Components/Search/Search";
import { GetExitDiscussion } from "../../../../../utils/redux/HR/HRSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Table from "../../../Components/Table/Table";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { TableActions } from "../../../Components/Misc/Actions";

const ExitDiscussion = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  
  const { get_discussion, isLoading } = useSelector((state) => state?.hr);
  console.log(get_discussion)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetExitDiscussion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterButton = () => {
    dispatch(GetExitDiscussion());
  };
  const actionButton = (
    <>
      <CTAButtons
        onClick={() => {
          navigate("add");
          setOpenModal(!openModal);
        }}
      >
        Answer Questions
      </CTAButtons>
    </>
  );

  return (
    <PageStyle
      title={"Exit Discussion"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter />

        {/* <ProDropFilter
          filter={''}
          setFilter={''}
          name={"Approval Status"}
          filterBy={''}
        /> */}

        <CalendarFilter2
          name="Select Date Range"
          setStartDate={""}
          setEndDate={""}
        />
        <FilterButton name="" onClick={() => handleFilterButton} />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>Discussion Questions</th>
              <th>Answers</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <DiscussionTable data={get_discussion} isLoading={isLoading} />

            {get_discussion?.responseObject?.map((item) => (
              // console.log(item)
              <DiscussionTable {...item} isLoading={isLoading} />
            ))}
          </tbody>
        </Table>
      </div>
    </PageStyle>
  );
};

export default ExitDiscussion;

const DiscussionTable = ({ data }) => {
  const { openModal, closeModal } = useApprovals({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {data?.responseObject?.map((item) => (
        <tr>
          <td>{item?.question}</td>
          <td>{item?.answer}</td>
          <td>
            <TableActions hasChildren={true} /*url={`${id}/view`}*/>
              {[
                {
                  name: "Edit Answer",
                  action: () => {
                    navigate();
                  },
                },
                {
                  name: "Add Remark",
                  action: () => {
                    openModal({
                      type: "suspend",
                      details: {
                        button: {
                          name: "Add Remark",
                          color: "",
                        },
                        sendIsOptional: true,
                        title: "Add Remark or Comment",
                        submitData: (data) => {
                          dispatch()?.then((res) => {
                            if (res?.payload?.successful === true) {
                              closeModal();
                              navigate("./");
                            }
                          });
                        },
                      },
                    });
                  },
                },
              ]}
            </TableActions>{" "}
          </td>
        </tr>
      ))}
    </>
  );
};
