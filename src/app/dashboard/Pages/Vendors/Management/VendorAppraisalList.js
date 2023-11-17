import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleVendor } from "../../../../../utils/redux/Vendor/VendorSlice";
import { useParams } from "react-router";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
import { USER_CATEGORY } from "../../../../../utils/Enums";

function VendorAppraisalList({ appraisers }) {
  const dispatch = useDispatch();
  const data = GetLocalStorage?.();

  const { all_vendors } = useSelector((state) => state?.vendor);
  const vendor = all_vendors?.responseObjectx;

  const { id } = useParams();

  useEffect(() => {
    // dispatch(
    //   GetSingleVendor({
    //     id: id || "",
    //     emailAddress:
    //       USER_CATEGORY?.VENDOR === data?.category ? data?.userName : "",
    //   })
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (USER_CATEGORY?.STAFF === data?.category) {
    return (
      <section className={DashboardStyle.form_section}>
        <h4 className={DashboardStyle.form_section_title}>Appraisals</h4>
        <div
          className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
        >
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Appraiser</th>
                <th>Department</th>
                <th>Performance</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appraisers?.map((x, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{x?.appraiser}</td>
                  <td>{x?.department}</td>
                  <td>{x?.performance}</td>
                  <td>{FormatDateTime(x?.date)}</td>
                  <td>
                    <TableActionsDownload
                      url={`../${id}/${x?.id}/appraise/view/${x?.appraiser}/${
                        x?.department
                      }/${FormatDateTime(x?.date)}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    );
  }
}

export default VendorAppraisalList;
