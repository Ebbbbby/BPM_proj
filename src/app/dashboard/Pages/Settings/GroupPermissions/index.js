import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateGroupPermission,
  DeleteGroupPermission,
  GetGroupPermissions,
  UpdateGroupPermission,
} from "../../../../../utils/redux/Permission/PermissionSlice";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import PageStyle from "../../../Components/Layout/PageLayout";
import PermStyle from "../Style/Permission.module.css";
import {
  ActionButtons,
  CTAButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { TableActions } from "../../../Components/Misc/Actions";
import { useForm } from "react-hook-form";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import input from "../../../../auth/components/styles/input.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import DeleteItemModal from "../../../Components/Modals/DeleteItemModal";
import { parseISO, format } from "date-fns";
import DashboardStyle from "../../../Styles/Dashboard.module.css";
import { SearchFilter } from "../../../Components/Search/Search";

function AddPermissionGroupModal({
  currentPermission,
  isEdit,
  showModal,
  setShowModal,
  onSuccess,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    reset({ ...currentPermission });
  }, [currentPermission]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Permission Group Name is required"),
    code: Yup.string().required("Permission Group Code is required"),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: isEdit ? currentPermission.name : "",
      code: isEdit ? currentPermission.code : "",
    },
  });

  const onSubmit = async (values) => {
    if (isEdit) {
      dispatch(
        UpdateGroupPermission({
          groupId: currentPermission.id,
          ...values,
        })
      ).then((res) => {
        if (res?.payload?.successful === true) {
          reset();
          onSuccess();
        }
      });
    } else {
      dispatch(CreateGroupPermission(values)).then((res) => {
        if (res?.payload?.successful === true) {
          reset();
          onSuccess();
        }
      });
    }
  };

  return (
    <AppModalTemplate
      width={"400px"}
      padding={"0px"}
      isOpen={showModal}
      setIsOpen={setShowModal}
    >
      <div className="">
        <div className={PermStyle.grpPerm_form_head}>
          <div>
            {isEdit ? "Update Permission Group" : "Add Permission Group"}
          </div>
        </div>
        <div className="">
          <div className="form">
            <div className="form__group">
              <label htmlFor="username" className="form__label">
                Group Name
              </label>
              <input
                type="text"
                required
                className="form__input"
                {...register("name")}
              />
              {errors.name && (
                <small className={input.form__error__message}>
                  {errors.name.message}
                </small>
              )}
            </div>
            <div className="form__group">
              <label htmlFor="username" className="form__label">
                Group Code
              </label>
              <input
                type="text"
                required
                className="form__input"
                {...register("code")}
              />
              {errors.code && (
                <small className={input.form__error__message}>
                  {errors.code.message}
                </small>
              )}
            </div>
            <div className={`form__group ${PermStyle.action_btns}`}>
              <SupportButtons onClick={() => setShowModal(false)}>
                Cancel
              </SupportButtons>
              <ActionButtons onClick={handleSubmit(onSubmit)}>
                {isEdit ? "Update" : "Add"}
              </ActionButtons>
            </div>
          </div>
        </div>
      </div>
    </AppModalTemplate>
  );
}

export default function GroupPermissions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groupPermissions } = useSelector((state) => state?.permissions);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentGroupPermission, setCurrentGroupPermission] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getGroupPermission();
  }, []);

  useEffect(() => {
    dispatch(
      GetGroupPermissions({
        searchText: search,
      })
    );
  }, [search, dispatch]);

  const getGroupPermission = () => {
    dispatch(GetGroupPermissions());
  };

  const onPermissionAdded = () => {
    getGroupPermission();
    setShowAddModal(false);
  };

  const handleDelete = () => {
    dispatch(
      DeleteGroupPermission({ groupId: currentGroupPermission.id })
    ).then((res) => {
      if (res?.payload?.successful === true) {
        setShowDeleteModal(false);
        getGroupPermission();
      }
    });
  };

  return (
    <>
      <PageStyle
        isMain={true}
        title={"Permission Groups"}
        action={
          <CTAButtons onClick={() => navigate("add")}>
            Create Permission Group
          </CTAButtons>
        }
      >
        <div className={DashboardStyle.dashboard_filter}>
          <SearchFilter
            label={"Search Group Permissions"}
            text={(search) => setSearch(search)}
          />
        </div>
        <div className={PermStyle.table}>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Number of Users</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupPermissions &&
                groupPermissions.length > 0 &&
                groupPermissions.map((perm, index) => (
                  <tr key={index}>
                    <td>{perm.id}</td>
                    <td>{perm.name}</td>
                    <td>{perm.numberOfUsers}</td>
                    {/*<td>{formatRelative(parseISO(perm.dateCreated), new Date())}</td>*/}
                    <td>
                      {format(
                        parseISO(perm.dateCreated),
                        "dd-MMM-yyyy hh:mm:a"
                      )}
                    </td>
                    <td>
                      <TableActions url={`${perm.id}`}>
                        {[
                          {
                            name: "Update",
                            action: () => navigate(`update/${perm.id}`),
                          },
                          {
                            name: "Delete",
                            action: () => {
                              setCurrentGroupPermission(perm);
                              setShowDeleteModal(true);
                            },
                          },
                        ]}
                      </TableActions>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </PageStyle>

      <AddPermissionGroupModal
        currentPermission={currentGroupPermission}
        showModal={showAddModal}
        isEdit={isEdit}
        setShowModal={setShowAddModal}
        onSuccess={onPermissionAdded}
      />
      <DeleteItemModal
        isOpen={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
        headText={"Delete Group Permission"}
        infoText={"Are you sure you want to delete this Group Permission?"}
      />
    </>
  );
}
