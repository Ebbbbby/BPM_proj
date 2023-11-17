/* eslint react-hooks/exhaustive-deps: 0  */
import React, { useEffect, useState } from "react";
import PageLayout from "../../../Components/Layout/PageLayout";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import Select from "react-select";
import { useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import PermStyle from "../Style/Permission.module.css";
import input from "../../../../auth/components/styles/input.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  CreateGroupPermission,
  GetAllAppPermissions,
  GetGroupPermission,
  UpdateGroupPermission,
} from "../../../../../utils/redux/Permission/PermissionSlice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddPermissionGroup({ isEdit }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appPermissions, setAppPermission] = useState([]);
  const [initialPermissions, setInitialPermissions] = useState([]);
  const { allAppPermissionsObj, groupPermission } = useSelector(
    (state) => state?.permissions
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Permission Group Name is required"),
    permissions: Yup.array().min(1, "Please select permissions for the group"),
  });

  useEffect(() => {
    dispatch(GetAllAppPermissions());
    if (isEdit) {
      dispatch(GetGroupPermission(id));
    }
  }, []);

  useEffect(() => {
    if (isEdit && groupPermission?.permsissions) {
      const initialPerm = [];
      allAppPermissionsObj.forEach((a) => {
        const isPermissionAdded = groupPermission?.permsissions?.find(
          (groupPerm) => groupPerm.code === a.code
        );
        if (isPermissionAdded) {
          initialPerm.push({
            id: a.id,
            value: isPermissionAdded.code,
            label: isPermissionAdded.label,
          });
        }
      });
      reset({
        name: groupPermission?.name,
        permissions: initialPerm,
      });
      setInitialPermissions(initialPerm);
    }
    if (allAppPermissionsObj && Object.keys(allAppPermissionsObj).length > 0) {
      const unAddedPermissions = allAppPermissionsObj?.map((appPerm) => ({
        id: appPerm.id,
        value: appPerm.code,
        label: appPerm.name,
      }));
      setAppPermission(unAddedPermissions);
    }
  }, [allAppPermissionsObj, groupPermission]);

  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  const onSubmit = async (values) => {
    const formattedValue = {
      ...values,
      permissionId: values.permissions.map((a) => a.id),
      permissions: undefined,
    };
    if (isEdit) {
      dispatch(
        UpdateGroupPermission({
          groupId: id,
          ...formattedValue,
        })
      ).then((res) => {
        if (res?.payload?.successful === true) {
          reset();
          navigate(-1);
        }
      });
    } else {
      dispatch(CreateGroupPermission(formattedValue)).then((res) => {
        if (res?.payload?.successful === true) {
          reset();
          navigate(-1);
        }
      });
    }
  };

  return (
    <PageLayout hasBack={true}>
      <div className={PermStyle.ghead}>
        <h1 className={PermStyle.ghead_main}>
          {isEdit ? "Update Permission Group" : "Add Permission Group"}
        </h1>
        <div className={PermStyle.ghead_text}>
          Enter Group name and permission information here
        </div>
      </div>
      <div className="form">
        <section className={PermStyle.gform}>
          <h4 className={PermStyle.gform_info}>Group information</h4>
          <div className={PermStyle.gform_form_container}>
            <div className={PermStyle.gform_form}>
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
                <label htmlFor="permissions" className="form__label">
                  Permissions
                </label>
                {isEdit && initialPermissions.length > -1 && (
                  <Select
                    options={appPermissions}
                    defaultValue={initialPermissions}
                    isMulti={true}
                    onChange={(value) => setValue("permissions", value)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                )}
                {!isEdit && (
                  <Select
                    options={appPermissions}
                    isMulti={true}
                    onChange={(value) => setValue("permissions", value)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                )}
                {errors.permissions && (
                  <small className={input.form__error__message}>
                    {errors.permissions.message}
                  </small>
                )}
              </div>
              <div className={`form__group ${PermStyle.action_btns}`}>
                <SupportButtons onClick={() => navigate(-1)}>
                  Cancel
                </SupportButtons>
                <ActionButtons onClick={handleSubmit(onSubmit)}>
                  Save
                </ActionButtons>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
