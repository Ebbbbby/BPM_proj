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
import {
  ApproveAssetCategories,
  DeclineAssetCategories,
  DeleteAssetCategories,
  DeleteAssetClass,
  DeleteAssetSubClass,
  DeleteComponent,
  GetAssetClass,
  GetCategories,
  GetSingleCategories,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  CreateCategoryActions,
  CreateClassActions,
  CreateComponentActions,
  CreateSubClassActions,
} from "./Categories";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
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
  const {
    asset_class,
    category,
    single_category,
    isLoading,
    isLoadingAssetClass,
  } = useSelector((state) => state?.assetSetUp);

  const acq = single_category?.responseObject;
  const [openAppModal, setOpenModal] = useState(false);
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);

  const submit = (e) => {};
  useEffect(() => {
    dispatch(
      GetAssetClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
        CategoryId: id,
      })
    );

    dispatch(
      GetCategories({
        filter: 5,
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
      })
    );
    dispatch(GetSingleCategories(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({});

  const cat_status = acq?.registrationStatus;

  const loadingState = () => {
    if (isLoading && isLoadingAssetClass) {
      return <p>Loading...</p>;
    }
  };

  return (
    <PageLayout
      permission={DEFINED_PERMISSIONS.AssetCategoryView}
      title={"Category Details"}
      hasBack={true}
    >
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
          <PageActions>
            {[
              {
                name: "Edit Details",
                condition:
                  cat_status === "Approved" || (cat_status !== "Declined" && cat_status !== "Initiated")
                    ? false
                    : true,
                action: () => {
                  navigate(
                    `?modal_type=categories&isEdit=true&name=${acq?.name}&des=${acq?.description}&id=${id}`,
                    { replace: true }
                  );
                  setOpenModal(!openAppModal);
                },
              },
              {
                name: "Create Class",
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
                action: () => {
                  navigate(
                    `?modal_type=sub_class&isEdit=false&category=${id}&from=view`
                  );
                  setOpenModal(!openAppModal);
                },
              },
              {
                name: "Create Component",
                action: () => {
                  navigate(
                    `?modal_type=component&isEdit=false&category=${id}&from=view`,
                    { replace: true }
                  );
                  setOpenModal(!openAppModal);
                },
              },
              {
                name: "Approve Category",
                permissions: DEFINED_PERMISSIONS.AssetCategoryApprove,
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
                          ApproveAssetCategories({
                            comment: data?.comments,
                            assetCategoryId: id,
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
                permissions: DEFINED_PERMISSIONS.AssetCategoryApprove,
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
                          DeclineAssetCategories({
                            comment: data?.comments,
                            assetCategoryId: id,
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
                permissions: DEFINED_PERMISSIONS.AssetCategoryApprove,
                condition:
                  cat_status !== "Declined" && cat_status !== "Initiated"
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
                      isDeleteSupport: `Are you sure you want to Delete ${acq?.name} Category?.`,
                      title: `Delete ${acq?.name} Category?`,
                      submitData: (data) => {
                        dispatch(
                          DeleteAssetCategories({
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
      {loadingState()}
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
                    <h4>{acq?.initiatedBy}</h4>
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
                    <h4>{FormatDateTime(acq?.dateCreated, "ll")}</h4>
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
                    <h4>{acq?.lastReviewed?.lastReviewedBy}</h4>
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
                      {FormatDateTime(acq?.lastReviewed?.lastReveiwedByDate)}
                    </h4>
                  </div>
                </div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{acq?.levelsOfApproval}</h4>
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
                  <h4>{acq?.name}</h4>
                </div>
                <div>
                  <p>Description</p>
                  <h4>{acq?.description || "-"}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              {asset_class?.responseObject?.map((asset, index) => (
                <ChildrenView
                  openActionModal={openAppModal}
                  setOpenModal={setOpenModal}
                  asset={asset}
                  index={index}
                  category={category}
                  key={index}
                  cat_status={cat_status}
                />
              ))}
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
      <AppModalTemplate
        padding={"0px"}
        isOpen={openAppModal}
        setIsOpen={setOpenModal}
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
        {getURLData("modal_type") === "component" && (
          <CreateComponentActions
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
  openActionModal,
  setOpenModal,
  cat_status,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const classId = asset?.id;
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
              {asset?.name}
              {cat_status !== "Approved" && cat_status !== "Declined" && (
                <div>
                  {" "}
                  <FiEdit2
                    size={"13px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenModal(!openActionModal);
                      navigate(
                        `?modal_type=class&category=${id}&class=${
                          asset?.name
                        }&classId=${classId}&isEdit=true&vat=${
                          asset?.vat || ""
                        }&usefulLife=${
                          asset?.usefulLife || ""
                        }&withHoldingTax=${
                          asset?.withHoldingTax || ""
                        }&shortCode=${asset?.shortCode || ""}&residual=${
                          asset?.residual
                        }`
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
                          isDeleteSupport: `Are you sure you want to Delete ${asset?.name} Class?.`,
                          title: `Delete ${asset?.name} Class?`,
                          submitData: (data) => {
                            dispatch(DeleteAssetClass(classId))?.then((res) => {
                              if (res?.payload?.successful === true) {
                                closeModal();
                                dispatch(
                                  GetAssetClass({
                                    pageSize: 100000,
                                    currentPage: 1,
                                    sort: 0,
                                    filter: 0,
                                    CategoryId: id,
                                  })
                                );
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
              Useful Life:
              {asset?.usefulLife}
            </small>
            <br />
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
              Residual:
              {asset?.residual}
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
        {asset?.subClasses?.length === 0 && (
          <div>
            <p>Sub Class Name:</p>
            <h4>
              No Subclass Available{" "}
              {/* <FiEdit2
                size={"13px"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenModal(!openActionModal);
                  navigate(
                    `?modal_type=sub_class&category=${id}&class=${classId}&subClass=&isEdit=false`
                  );
                }}
              /> */}
            </h4>
          </div>
        )}
        {asset?.subClasses?.map((s, index) => (
          <>
            <div key={index}>
              <p>{index + 1}. Sub Class Name:</p>
              <h4
                style={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {s?.name}
                {cat_status !== "Approved" && cat_status !== "Declined" && (
                  <div>
                    {" "}
                    <FiEdit2
                      onClick={() => {
                        setOpenModal(!openActionModal);
                        navigate(
                          `?modal_type=sub_class&category=${id}&class=${classId}&subClass=${s?.name}&subClassId=${s?.id}&isEdit=true`
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
                                DeleteAssetSubClass({
                                  id: +s?.id,
                                })
                              )?.then((res) => {
                                if (res?.payload?.successful === true) {
                                  closeModal();
                                  dispatch(
                                    GetAssetClass({
                                      pageSize: 100000,
                                      currentPage: 1,
                                      sort: 0,
                                      filter: 0,
                                      CategoryId: id,
                                    })
                                  );
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

              <br />
              {s?.components?.length !== 0 && (
                <small>
                  Components:{" "}
                  {s?.components?.map((x, index) => {
                    return (
                      <ComponentsDisplay
                        index={index}
                        x={x}
                        s={s}
                        setOpenModal={setOpenModal}
                        openActionModal={openActionModal}
                        classId={classId}
                        id={id}
                        cat_status={cat_status}
                      />
                    );
                  })}{" "}
                </small>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
}

function ComponentsDisplay({
  setOpenModal,
  openActionModal,
  id,
  classId,
  s,
  x,
  index,
  cat_status,
}) {
  const navigate = useNavigate();
  const [openOptions, setOpenOptions] = useState(false);

  const { openModal, closeModal } = useApprovals({});
  const dispatch = useDispatch();
  return (
    <small
      onClick={() => {
        setOpenOptions(!openOptions);
      }}
      style={{ cursor: "pointer" }}
    >
      {(index ? ", " : "") + x?.name}

      {cat_status !== "Approved" && cat_status !== "Declined" && (
        <>
          {openOptions === true && (
            <>
              <FiEdit2
                fontSize={"10px"}
                onClick={() => {
                  setOpenModal(!openActionModal);
                  navigate(
                    `?modal_type=component&category=${id}&class=${classId}&subClass=${s?.name}&subClassId=${s?.id}&name=${x?.name}&name_id=${x?.id}&isEdit=true`
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
                      isDeleteSupport: `Are you sure you want to Delete ${s?.name} Component?`,
                      title: `Delete ${s?.name} Component?`,
                      submitData: (data) => {
                        dispatch(
                          DeleteComponent({
                            id: +x?.id,
                          })
                        )?.then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            dispatch(
                              GetAssetClass({
                                pageSize: 100000,
                                currentPage: 1,
                                sort: 0,
                                filter: 0,
                                CategoryId: id,
                              })
                            );
                            // navigate("../");
                          }
                        });
                      },
                    },
                  });
                }}
              />
            </>
          )}
        </>
      )}
    </small>
  );
}
