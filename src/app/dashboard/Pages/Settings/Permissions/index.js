import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import { URL } from "../../../../../utils/routes";
import PermStyle from "../Style/Permission.module.css";
import Table from "../../../Components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsersPermissions } from "../../../../../utils/redux/Permission/PermissionSlice";
import Pagination from "../../../Components/Pagination/Pagination";

export default function Permissions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { allUsersPermissions } = useSelector((state) => state?.permissions);

  useEffect(() => {
    dispatch(
      GetAllUsersPermissions({
        filter,
        pageSize,
        currentPage,
        sort,
      })
    );
  }, [filter, sort, pageSize, currentPage, dispatch]);

  /*
  const getRowActions = (perm) => {
    const rowActions = [
      {
        name: "Edit Permissions",
        action: () => {
          navigate(`${URL.Edit_Staff_Permissions}/${perm.id}`);
        },
      },
    ];
        if(perm?.registrationState === "DEACTIVATED") rowActions.push({
            name: "Activate",
            action: () => {
                openModal({
                    type: "",
                    details: {
                        button: {
                            name: "Yes, Activate",
                            color: "",
                        },
                        title: "Activate Staff User?",
                        submitData: (data) => {
                            dispatch(ApproveInternalUser({
                                username: perm.username,
                                comment: data?.comments,
                            })).then(res => {
                                if(false) closeModal();
                            })

                        },
                    },
                });
            },
        })
        if(perm?.registrationState === "ACTIVATED") rowActions.push({
            name: "Deactivate",
            action: () => {
                openModal({
                    type: "",
                    details: {
                        button: {
                            name: "Yes, Deactivate",
                            color: "red",
                        },
                        title: "Deactivate Staff Permission?",
                        submitData: (data) => {
                            dispatch(DeclineInternalUser({
                                username: perm.username,
                                comment: data?.comments,
                            })).then(res => {
                                if(false) closeModal();
                            })
                        }
                    },
                });
            },
        })
    return rowActions;
  };
         */

  return (
    <PageStyle
      hasBack={false}
      isMain={true}
      title={"Staff Permission Setup"}
      action={
        <CTAButtons
          onClick={() => {
            navigate(URL.Create_Staff);
          }}
        >
          Staff
        </CTAButtons>
      }
    >
      <div className={PermStyle.table}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Group</th>
              <th>Status</th>
              {/*<th>Actions</th>*/}
            </tr>
          </thead>
          <tbody>
            {allUsersPermissions &&
              allUsersPermissions.result &&
              allUsersPermissions.result.length.toString() &&
              allUsersPermissions.result.map((perm, index) => (
                <tr key={index}>
                  <td>{perm.id}</td>
                  <td>{perm.name}</td>
                  <td>{perm.emailAddress}</td>
                  <td>{perm.groupName}</td>
                  <td>
                    <span
                      style={{
                        textAlign: "center",
                        padding: "3px 8px",
                        borderRadius: "1rem",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        backgroundColor:
                          perm?.registrationState === "ACTIVATED"
                            ? "#CBFFAE"
                            : perm?.registrationState === "DEACTIVATED"
                            ? "#FFE6B0"
                            : perm?.registrationState === "BLOCKED"
                            ? "#FCEBEC"
                            : "",
                        color:
                          perm?.registrationState === "ACTIVATED"
                            ? "#067306"
                            : perm?.registrationState === "DEACTIVATED"
                            ? "#946300"
                            : perm?.registrationState === "BLOCKED"
                            ? "#9E0038"
                            : "",
                      }}
                    >
                      {perm?.registrationState}
                    </span>
                  </td>
                  {/*<td>*/}
                  {/*  <TableActions>{getRowActions(perm)}</TableActions>*/}
                  {/*</td>*/}
                </tr>
              ))}
          </tbody>
        </Table>
        <Pagination
          last_page={allUsersPermissions?.totalPages}
          present_page={allUsersPermissions?.currentPage}
          totalRows={allUsersPermissions?.totalRows}
          pageSize={pageSize}
          setPageSize={(page) => setPageSize(page)}
          click={(page) => setCurrentPage(page)}
        />
      </div>
      
    </PageStyle>
  );
}
