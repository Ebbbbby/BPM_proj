import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import PageLayout from "../../../Components/Layout/PageLayout";
import PermStyle from "../Style/Permission.module.css";
import {
  CTAButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  GetGroupPermission,
  RemovePermissionFromGroup,
} from "../../../../../utils/redux/Permission/PermissionSlice";
import Table from "../../../Components/Table/Table";
import { TableActions } from "../../../Components/Misc/Actions";
import AddPermissionToPermissionGroupModal from "../../../Components/Modals/Settings/AddPermissionToPermissionGroupModal";
import DeleteItemModal from "../../../Components/Modals/DeleteItemModal";
import { format, parseISO } from "date-fns";

export default function ViewPermissionGroup({ isEdit }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
  const [showDeletePermissionModal, setShowDeletePermissionModal] =
    useState(false);
  const [currentPermission, setCurrentPermission] = useState({});
  const { groupPermission } = useSelector((state) => state?.permissions);

  useEffect(() => {
    getGroupPermission();
  }, []);

  const handlePermissionAdded = () => {
    getGroupPermission();
    setShowAddPermissionModal(false);
  };

  const getGroupPermission = () => {
    dispatch(GetGroupPermission(id));
  };

  const handleDelete = () => {
    dispatch(
      RemovePermissionFromGroup({ groupPermissionId: [currentPermission.id] })
    ).then((res) => {
      if (res?.payload?.successful === true) {
        setShowDeletePermissionModal(false);
        getGroupPermission();
      }
    });
  };

  return (
    <>
      {" "}
      <PageLayout hasBack={true}>
        <div className={PermStyle.ghead}>
          <h1 className={PermStyle.ghead_main}>Permission Group</h1>
          <div className={PermStyle.ghead_text}>
            View Permission group for {groupPermission?.name}
          </div>
        </div>
        <div className={PermStyle.vpg_btns}>
          <CTAButtons onClick={() => setShowAddPermissionModal(true)}>
            Add Permission
          </CTAButtons>
        </div>
        <div className={PermStyle.vpg_items}>
          <div className={PermStyle.vpg_item}>
            <div className={PermStyle.vpg_item_head}>Name:</div>
            <div className={PermStyle.vpg_item_text}>
              {groupPermission?.name}
            </div>
          </div>
          <div className={PermStyle.vpg_item}>
            <div className={PermStyle.vpg_item_head}>Date Created:</div>
            <div className={PermStyle.vpg_item_text}>
              {groupPermission?.dateCreated
                ? format(
                    parseISO(groupPermission?.dateCreated),
                    "dd-MMM-yyyy hh:mm:a"
                  )
                : ""}
            </div>
          </div>
        </div>
        <div className={PermStyle.table}>
          <Table>
            <thead>
              <tr>
                <th>Permission ID</th>
                <th>Permission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupPermission?.permsissions &&
                groupPermission.permsissions.length > 0 &&
                groupPermission.permsissions.map((perm, index) => (
                  <tr key={index}>
                    <td>{perm.id}</td>
                    <td>{perm.label}</td>
                    <td>
                      <TableActions>
                        {[
                          {
                            name: "Remove Permission",
                            action: () => {
                              setCurrentPermission(perm);
                              setShowDeletePermissionModal(true);
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
        <div className={PermStyle.vpg_item}>
          <div className={PermStyle.vpg_item_head}>Number of users:</div>
          <div className={PermStyle.vpg_item_text}>
            {groupPermission?.numberOfUsers}
          </div>
        </div>
        <div className={PermStyle.table}>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {groupPermission?.getUserDets?.map((perm, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{perm?.name}</td>
                  <td>{perm?.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {setShowAddPermissionModal && (
          <AddPermissionToPermissionGroupModal
            groupId={id}
            isOpen={showAddPermissionModal}
            permissionsFromGroup={groupPermission?.permsissions}
            handleClose={() => setShowAddPermissionModal(false)}
            handleAdd={handlePermissionAdded}
          />
        )}
      </PageLayout>
      <DeleteItemModal
        isOpen={showDeletePermissionModal}
        handleClose={() => setShowDeletePermissionModal(false)}
        handleDelete={handleDelete}
        headText={"Remove Permission"}
        infoText={"Are you sure you want to remove this Permission?"}
      />
    </>
  );
}
