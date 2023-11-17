import React, {useEffect, useState}  from "react";
import BaseModal from "../BaseModal";
import PermStyle from "../../../Pages/Settings/Style/Permission.module.css";
import Select from "react-select";
import {ActionButtons, SupportButtons} from "../../../../global/components/Buttons/buttons";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import input from "../../../../auth/components/styles/input.module.css";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddPermissionToGroup, GetAllAppPermissions} from "../../../../../utils/redux/Permission/PermissionSlice";

export default function AddPermissionToPermissionGroupModal({groupId, isOpen, permissionsFromGroup, handleClose, handleAdd}){
    const dispatch = useDispatch();
    const [availablePermissions, setAvailablePermissions] = useState([]);
    const { allAppPermissionsObj } = useSelector((state) => state?.permissions);

    useEffect(()=>{
        dispatch(GetAllAppPermissions())
    }, []);

    useEffect(() => {
        if(permissionsFromGroup && Object.keys(allAppPermissionsObj).length > 0){
            const unAddedPermissions = [];
            allAppPermissionsObj?.forEach(appPerm => {
                const alreadyAdded = permissionsFromGroup.find(groupPerm=>groupPerm.code === appPerm.code)
                if(!alreadyAdded) {
                    unAddedPermissions.push({
                        id: appPerm.id,
                        value: appPerm.code,
                        label: appPerm.name
                    })
                }
            });
            setAvailablePermissions(unAddedPermissions);
            reset({
                permissionId: []
            })
        }
    },[allAppPermissionsObj, permissionsFromGroup])

    const validationSchema = Yup.object().shape({
        permissionId: Yup.array().min(1, "Please select permission(s)")
    });

    const { handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            permissionId: [],
        },
    })


    const onSubmit = async (values) => {
        const addPayload = {
            groupId: parseInt(groupId, 10),
            permissionId: values.permissionId.map(a=>a.id)
        }
        dispatch(AddPermissionToGroup(addPayload)).then((res) => {
            if (res?.payload?.successful === true) handleAdd()
        });
    };

    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose} >
            <div className={PermStyle.add_perm_form}>
                <div className="form">
                    <div className={PermStyle.grpPerm_form_head}>
                        <div>
                            Add Permission to Group
                        </div>
                    </div>
                    <section className={PermStyle.gform}>
                        <div className={PermStyle.gform_form_container}>
                            <div className={PermStyle.gform_form}>
                                <div className="form__group">
                                    <label htmlFor="permissions" className="form__label">Permissions</label>
                                    <Select
                                        options={availablePermissions}
                                        isMulti={true}
                                        onChange={(value) => setValue('permissionId', value)}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                    />
                                    {errors.permissionId && (
                                        <small className={input.form__error__message}>
                                            {errors.permissionId.message}
                                        </small>
                                    )}
                                </div>
                                <div className={`form__group ${PermStyle.action_btns}`}>
                                    <SupportButtons onClick={handleClose}>
                                        Cancel
                                    </SupportButtons>
                                    <ActionButtons onClick={handleSubmit(onSubmit)}>
                                        Add
                                    </ActionButtons>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </BaseModal>
    )
}