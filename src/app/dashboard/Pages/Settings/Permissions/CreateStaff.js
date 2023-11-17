/* eslint react-hooks/exhaustive-deps: 0  */
import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../../Components/Layout/PageLayout";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import Select from "react-select";
import { useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import PermStyle from "../Style/Permission.module.css";
import { CreateInternalUser } from "../../../../../utils/redux/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  GetAllAppPermissions,
  GetGroupPermissions,
} from "../../../../../utils/redux/Permission/PermissionSlice";
// import {useParams} from "react-router-dom";
import input from "../../../../auth/components/styles/input.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function CreateStaff() {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [permSelect, setPermSelect] = useState([]);
  const [useCustomPermissions, setUseCustomPermissions] = useState(false);
  const { isLoading, allAppPermissionsObj, groupPermissions } = useSelector(
    (state) => state?.permissions
  );
  const PermissionSelect = useRef();

  useEffect(() => {
    dispatch(GetGroupPermissions());
    dispatch(GetAllAppPermissions());
  }, []);

  useEffect(() => {
    const permSelect = allAppPermissionsObj?.map((a) => ({
      value: a.id,
      label: a.name,
    }));
    setPermSelect(permSelect);
  }, [allAppPermissionsObj]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please add a username"),
    groupId: Yup.string().when("useCustomPermissions", {
      is: false,
      then: Yup.string().required("Please select a permission group"),
    }),
    permissions: Yup.array().when("useCustomPermissions", {
      is: true,
      then: Yup.array().min(1, "Please select permission(s) for the user"),
    }),
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      canAccessAllDepartments: false,
      useCustomPermissions: false,
      groupId: "",
      permissions: [],
    },
  });

  const onSubmit = async (values) => {
    const userPayload = {
      ...values,
      groupId: parseInt(values.groupId, 10),
      useCustomPermissions: undefined,
    };
    userPayload.permissions = userPayload.permissions.map((a) => a.value);
    dispatch(CreateInternalUser(userPayload)).then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../`);
      }
    });
  };

  return (
    <PageLayout hasBack={true}>
      <div className={PermStyle.ghead}>
        <h1 className={PermStyle.ghead_main}>Grant New Staff Permission</h1>
        <div className={PermStyle.ghead_text}>
          Add new user to grant access here
        </div>
      </div>
      <div className="form">
        <section className={PermStyle.gform}>
          <h4 className={PermStyle.gform_info}>Setup information</h4>
          <div className={PermStyle.gform_form_container}>
            <div className={PermStyle.gform_form}>
              <div className="form">
                <div className="form__group">
                  <label htmlFor="username" className="form__label">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    className="form__input"
                    {...register("username")}
                  />
                  {errors.username && (
                    <small className={input.form__error__message}>
                      {errors.username.message}
                    </small>
                  )}
                </div>
                {!useCustomPermissions ? (
                  <div className="form__group">
                    <label htmlFor="permissions" className="form__label">
                      Permission Group
                    </label>
                    <select className="form__select" {...register("groupId")}>
                      <option value="">Select staff permission group</option>
                      {groupPermissions &&
                        groupPermissions.length > 0 &&
                        groupPermissions.map((perm) => (
                          <option value={perm.id} key={perm.id}>
                            {perm.name}
                          </option>
                        ))}
                    </select>
                    {errors.groupId && (
                      <small className={input.form__error__message}>
                        {errors.groupId.message}
                      </small>
                    )}
                  </div>
                ) : (
                  <div className="form__group">
                    <label htmlFor="permissions" className="form__label">
                      Permissions
                    </label>
                    <Select
                      ref={PermissionSelect}
                      options={permSelect}
                      isMulti={true}
                      onChange={(value) => setValue("permissions", value)}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      isLoading={isLoading}
                    />
                    {errors.permissions && (
                      <small className={input.form__error__message}>
                        {errors.permissions.message}
                      </small>
                    )}
                  </div>
                )}
                <div className="form__group">
                  <input
                    id="use-custom-permissions"
                    type="checkbox"
                    className="styled-checkbox"
                    onChange={(e) => {
                      setUseCustomPermissions(e.target.checked);
                      setValue("useCustomPermissions", e.target.checked);
                      setValue("groupId", "");
                      setValue("permissions", []);
                      PermissionSelect.current.clearValue();
                    }}
                  />
                  <label htmlFor="use-custom-permissions">
                    Use Custom Permissions
                  </label>
                </div>
                <div className="form__group">
                  <input
                    id="isSuperuser"
                    type="checkbox"
                    className="styled-checkbox"
                    {...register("canAccessAllDepartments")}
                  />
                  <label htmlFor="isSuperuser">
                    Can access all departments
                  </label>
                </div>
                <div className={`form__group ${PermStyle.action_btns}`}>
                  <SupportButtons onClick={() => navigate(-1)}>
                    Cancel
                  </SupportButtons>
                  <ActionButtons
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                  >
                    Save
                  </ActionButtons>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
