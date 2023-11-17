import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiEdit2, FiExternalLink, FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { PageActions } from "../../../Components/Misc/Actions";
// import { GetAssetClass, GetCategories } from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  CreateCategoryActions,
  CreateClassActions,
  CreateSubClassActions,
} from "./ConsummableCategories";
import {
  ApproveConsummableCategories,
  DeclineConsummableCategories,
  DeleteConsummableCategories,
  DeleteConsummableClass,
  DeleteConsummableSubClass,
  GetCategories,
  GetSingleCategories,
} from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { URL } from "../../../../../utils/routes";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewCategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { category, single_category, isLoading } = useSelector(
    (state) => state?.consummableSetUp
  );

  const [openAppModal, setOpenModal] = useState(false);
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);

  const submit = (e) => {};
  useEffect(() => {
    dispatch(
      GetCategories({
        filter: 0,
        pageSize: 10000,
        currentPage: 1,
        searchText: "",
        sort: 0,
      })
    );

    // dispatch(
    //   GetConsummableClass({
    //     pageSize: 100000,
    //     currentPage: 1,
    //     sort: 0,
    //     filter: 0,
    //     CategoryId: id,
    //   })
    // );

    dispatch(GetSingleCategories(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { openModal, closeModal } = useApprovals({});

  const cat_status = single_category?.responseObject?.status;

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <PageLayout title={"Category Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
          <PageActions>
            {[
              {
                name: "Edit Details Categories",
                condition:
                  cat_status === "Approved" || cat_status !== "Declined"
                    ? false
                    : true,
                action: () => {
                  navigate(
                    `?modal_type=categories&isEdit=true&name=${
                      single_category?.responseObject?.categoryName
                    }&des=${
                      single_category?.responseObject?.description || ""
                    }&id=${id}&from=view`,
                    { replace: true }
                  );
                  setOpenModal(!openAppModal);
                },
              },
              {
                name: "Create Class",
                condition: cat_status === "Declined" ? false : true,
                action: () => {
                  navigate(
                    `?modal_type=class&isEdit=false&category=${id}&from=view`,
                    { replace: true }
                  );
                  setOpenModal(!openAppModal);
                },
              },
              {
                name: "Create SubClass",
                condition: cat_status === "Declined" ? false : true,
                action: () => {
                  navigate(
                    `?modal_type=sub_class&isEdit=false&category=${id}&from=view`,
                    { replace: true }
                  );
                  setOpenModal(!openAppModal);
                },
              },
              {
                name: "Approve Category",
                permissions: DEFINED_PERMISSIONS.ConsumableApprove,
                condition:
                  cat_status === "Approved" || cat_status === "Declined"
                    ? false
                    : true,
                action: () => {
                  openModal({
                    type: "approve",
                    details: {
                      button: {
                        name: "Yes, Approve",
                        color: "",
                      },
                      // isLoading: isLoading,
                      sendIsOptional: true,
                      commentIsOptional: false,
                      title: "Approve Category",
                      submitData: (data) => {
                        dispatch(
                          ApproveConsummableCategories({
                            comment: data?.comments,
                            consumableCategoryId: id,
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetSingleCategories(id));
                        });
                      },
                    },
                  });
                },
              },
              {
                name: "Decline Category",
                permissions: DEFINED_PERMISSIONS.ConsumableApprove,
                condition:
                  cat_status === "Approved" || cat_status === "Declined"
                    ? false
                    : true,
                action: () => {
                  openModal({
                    type: "approve",
                    details: {
                      button: {
                        name: "Yes, Decline",
                        color: "red",
                      },
                      // isLoading: isLoading,
                      sendIsOptional: true,
                      commentIsOptional: false,
                      title: "Decline Category",
                      submitData: (data) => {
                        dispatch(
                          DeclineConsummableCategories({
                            comment: data?.comments,
                            consumableCategoryId: id,
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetSingleCategories(id));
                        });
                      },
                    },
                  });
                },
              },
              {
                name: "Delete Category",
                permissions: DEFINED_PERMISSIONS.ConsumableApprove,
                condition: cat_status !== "Declined" && cat_status !== "Initiated"
                    ? false
                    : true,
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Delete",
                        color: "red",
                      },
                      isDelete: true,
                      isDeleteHero: "",
                      isDeleteSupport: `Are you sure you want to Delete ${single_category?.responseObject?.categoryName} Category?.`,
                      title: `Delete ${single_category?.responseObject?.categoryName} Category?`,
                      submitData: (data) => {
                        dispatch(
                          DeleteConsummableCategories({
                            id: +id,
                          })
                        )?.then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            navigate(`../`);
                            // dispatch(GetSingleCategories(id));
                          }
                        });
                      },
                    },
                  });
                },
              },
            ]}
          </PageActions>

      </div>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section
            style={{
              backgroundColor: "#F8FBF8",
              border: "1px solid #D9E9DA",
              borderRadius: "8px",
            }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}>
              Process <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Initiated By:</p>
                    <h4>{single_category?.responseObject?.createdBy}</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Date:</p>
                    <h4>
                      {FormatDateTime(
                        single_category?.responseObject?.createdDate,
                        "ll"
                      )}
                    </h4>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Last Reviewed:</p>
                    <h4>
                      {
                        single_category?.responseObject?.lastReviewed
                          ?.lastReviewedBy
                      }
                    </h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Date:</p>
                    <h4>
                      {FormatDateTime(
                        single_category?.responseObject?.lastReviewed
                          ?.lastReveiwedByDate
                      )}
                    </h4>
                  </div>
                </div>

                <div>
                  <p>Levels of Approval:</p>
                  <h4>{single_category?.responseObject?.levelsOfApproval}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Process Status</p>
                  <h4
                    style={{
                      color:
                        cat_status === "Initiated"
                          ? "#815103"
                          : cat_status === "Approved"
                          ? "#0F6308"
                          : cat_status === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {cat_status}
                  </h4>
                </div>
                <div>
                  <button className={DashboardStyle.view_more_action_button}>
                    <span>Preview Stage</span>{" "}
                    <FiExternalLink
                      className={DashboardStyle.view_more_action_button_icon}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section
            style={{
              borderTop: "unset",
            }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}>
              Category <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Category Name</p>
                  <h4>{single_category?.responseObject?.categoryName}</h4>
                </div>
                <div>
                  <p>Category Name</p>
                  <h4>{single_category?.responseObject?.description}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Class and Subclass Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              {single_category?.responseObject?.categoryClass?.map(
                (asset, index) => (
                  <ChildrenView
                    {...asset}
                    openAppModal={openAppModal}
                    setOpenModal={setOpenModal}
                    asset={asset}
                    index={index}
                    category={category}
                    cat_status={cat_status}
                  />
                )
              )}
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
      <AppModalTemplate
        padding={"0px"}
        isOpen={openAppModal}
        setIsOpen={setOpenModal}
        closeFunction={() => navigate("?", { replace: true })}
      >
        {getURLData("modal_type") === "class" && (
          <CreateClassActions
            category={category}
            isOpen={openAppModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
        {getURLData("modal_type") === "sub_class" && (
          <CreateSubClassActions
            category={category}
            isOpen={openAppModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
        {getURLData("modal_type") === "categories" && (
          <CreateCategoryActions
            category={category}
            isOpen={openAppModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
      </AppModalTemplate>
    </PageLayout>
  );
}

export default ViewCategories;

function ChildrenView({
  asset,
  index,
  category,
  openAppModal,
  setOpenModal,
  name,
  categorySubClass,
  cat_status,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { openModal, closeModal } = useApprovals({});
  const dispatch = useDispatch();
  return (
    <>
      <div key={index}>
        <div>
          <div>
            <p>Class Name:</p>
            <h4
              style={{
                display: "inline-flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {name}{" "}
              {cat_status === "Initiated" && (
                <div>
                  <FiEdit2
                    size={"13px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenModal(!openAppModal);
                      navigate(
                        `?modal_type=class&category=${id}&class=${name}&classId=${
                          asset?.id
                        }&isEdit=true&withHoldingTax=${
                          asset?.withHoldingTax || ""
                        }&vat=${asset?.vat || ""}`
                      );
                    }}
                  />
                  <FiX
                    size={"13px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      openModal({
                        type: "",
                        details: {
                          button: {
                            name: "Delete",
                            color: "red",
                          },
                          isDelete: true,
                          isDeleteHero: "",
                          isDeleteSupport: `Are you sure you want to Delete ${name} Class?.`,
                          title: `Delete ${name} Class?`,
                          submitData: (data) => {
                            dispatch(
                              DeleteConsummableClass({
                                classId: asset?.id,
                              })
                            )?.then((res) => {
                              if (res?.payload?.successful === true) {
                                closeModal();
                                dispatch(GetSingleCategories(id));
                              }
                            });
                          },
                        },
                      });
                    }}
                  />
                </div>
              )}
            </h4>
          </div>
          <div>
            <small>
              VAT:
              {asset?.vat}
            </small>
            <br />
            <small>
              Witholding:
              {asset?.withHoldingTax}
            </small>
            <br />
            <small>
              Short Code:
              {asset?.shortCode}
            </small>
          </div>
        </div>
      </div>
      <div>
        {categorySubClass?.length === 0 && (
          <div>
            <p>Sub Class Name:</p>
            <h4>No Subclass Available</h4>
          </div>
        )}
        {categorySubClass?.map((s, index) => (
          <div key={index}>
            <p>{index + 1}. Sub Class Name:</p>
            <h4
              style={{
                display: "inline-flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {s?.name}{" "}
              {cat_status === "Initiated" && (
                <div>
                  <FiEdit2
                    onClick={() => {
                      setOpenModal(!openAppModal);
                      navigate(
                        `?modal_type=sub_class&category=${id}&class=${
                          asset?.id
                        }&subClass=${s?.name}&subClassId=${
                          s?.id
                        }&isEdit=true`
                      );
                    }}
                    style={{ cursor: "pointer" }}
                    size={"13px"}
                  />
                  <FiX
                    size={"13px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      openModal({
                        type: "",
                        details: {
                          button: {
                            name: "Delete",
                            color: "red",
                          },
                          isDelete: true,
                          isDeleteHero: "",
                          isDeleteSupport: `Are you sure you want to Delete ${s?.name} Subclass?`,
                          title: `Delete ${s?.name} SubClass?`,
                          submitData: (data) => {
                            dispatch(
                              DeleteConsummableSubClass({
                                subClassId: s?.id,
                              })
                            )?.then((res) => {
                              if (res?.payload?.successful === true) {
                                closeModal();
                                dispatch(GetSingleCategories(id));
                                // navigate("../");
                              }
                            });
                          },
                        },
                      });
                    }}
                  />
                </div>
              )}
            </h4>
            <br />
            <div>
              <small>
                Short Code:
                {s?.shortCode}
              </small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
