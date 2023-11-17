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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  GetAllAppPermissions,
  GetUserPermission,
  UpdateStaffPermission,
} from "../../../../../utils/redux/Permission/PermissionSlice";
import { useParams } from "react-router-dom";

export default function CreateStaff({ isEdit }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appPermissions, setAppPermission] = useState([]);
  const [initialPermissions, setInitialPermissions] = useState([]);
  const { allAppPermissionsObj, userPermissionByID } = useSelector(
    (state) => state?.permissions
  );

  useEffect(() => {
    dispatch(GetAllAppPermissions());
    if (isEdit) {
      dispatch(GetUserPermission(id));
    }
  }, []);
  useEffect(() => {
    const permSelect = allAppPermissionsObj?.map((a) => ({
      value: a.id,
      label: a.name,
    }));
    setAppPermission(permSelect);
  }, [allAppPermissionsObj]);

  useEffect(() => {
    if (userPermissionByID) {
      const initialPerm = userPermissionByID.permsissions?.map((a) => ({
        label: a.permission,
        value: a.id,
      }));
      setInitialPermissions(initialPerm);
      if (isEdit) {
        reset({
          permissions: initialPermissions,
        });
      }
    }
  }, [userPermissionByID]);

  const { handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      permissions: [],
    },
  });

  const onSubmit = async (values) => {
    const userPayload = { ...values };
    userPayload.permissions = userPayload.permissions.map((a) => a.value);
    dispatch(
      UpdateStaffPermission({
        staffId: id,
        permissions: userPayload.permissions,
      })
    ).then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../`);
      }
    });
  };

  return (
    <PageLayout hasBack={true}>
      <div className={PermStyle.ghead}>
        <h1 className={PermStyle.ghead_main}>Edit Staff Permission</h1>
        <div className={PermStyle.ghead_text}>
          Add/Remove permissions for staffs
        </div>
      </div>
      <div className="form">
        <section className={PermStyle.gform}>
          {/*<h4 className={PermStyle.gform_info}>Setup information</h4>*/}
          <div className={PermStyle.gform_form_container}>
            <div className={PermStyle.gform_form}>
              <div className="form__group">
                <label htmlFor="permissions" className="form__label">
                  Permissions
                </label>
                {isEdit && initialPermissions?.length && (
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
              </div>
              {/*<div className="form__group">*/}
              {/*    <CTAButtonsAlt onClick={() => {}}>*/}
              {/*        Add another*/}
              {/*    </CTAButtonsAlt>*/}
              {/*</div>*/}
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
