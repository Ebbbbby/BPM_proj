import React, {useState} from "react";
import PageStyle from "../../../Components/Layout/PageLayout";
import RptStyle from "../Style/Reports.module.css";
import {ActionButtons, CTAButtons, CTAButtonsAlt} from "../../../../global/components/Buttons/buttons";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import {URL} from "../../../../../utils/routes";
import {FiChevronDown} from "react-icons/fi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import DeleteSetupModal from "../../../Components/Modals/Report/DeleteSetupModal";

export default function ReportConfigurationDetails(){

    return (
        <RouteLayout title="Reports / Reports Configuration">
            <PageStyle title="" hasBack>
                <div className={`${RptStyle.head} ${RptStyle.head_underline}`}>
                    <div className={RptStyle.head_text}>
                        Report Configuration Details
                    </div>
                    <div className={RptStyle.head_btns}>
                        <span className={RptStyle.head_btns_status}>
                            Status: <span style={{ color: "#008A00" }}>Approved</span>
                        </span>
                        <ActionButtons className={RptStyle.head_btns_flex}>
                            Action <FiChevronDown />
                        </ActionButtons>
                    </div>
                </div>
                <div className={`${RptStyle.config_details} ${RptStyle.config_details_alt}`}>
                    <div className={RptStyle.config_details_head}>
                        Process Information
                    </div>
                    <table className={RptStyle.config_details_items}>
                        <tr className={RptStyle.info_row}>
                            <td>
                                <div>
                                    <div className={RptStyle.info_group}>
                                        <span className={RptStyle.info_group_label}>
                                            Initiated By:
                                        </span>
                                        <span className={RptStyle.info_group_text}>
                                            Matthew Fawibe
                                        </span>
                                    </div>
                                    <div className={RptStyle.info_group}>
                                        <span className={RptStyle.info_group_label}>
                                            Date:
                                        </span>
                                        <span className={RptStyle.info_group_text}>
                                            14 Dec 2022
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className={RptStyle.info_group}>
                                        <span className={RptStyle.info_group_label}>
                                            Created By:
                                        </span>
                                        <span className={RptStyle.info_group_text}>
                                            Matthew Fawibe
                                        </span>
                                    </div>
                                    <div className={RptStyle.info_group}>
                                        <span className={RptStyle.info_group_label}>
                                            Date:
                                        </span>
                                        <span className={RptStyle.info_group_text}>
                                            14 Dec 2022
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className={RptStyle.info_group}>
                                        <span className={RptStyle.info_group_label}>
                                            Last Reviewed By:
                                        </span>
                                        <span className={RptStyle.info_group_text}>
                                            Matthew Fawibe
                                        </span>
                                    </div>
                                    <div className={RptStyle.info_group}>
                                        <span className={RptStyle.info_group_label}>
                                            Date:
                                        </span>
                                        <span className={RptStyle.info_group_text}>
                                            14 Dec 2022
                                        </span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className={RptStyle.info_row}>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Levels of Approval
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    3
                                </div>
                            </td>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Process Status
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    Processing
                                </div>
                            </td>
                            <td>
                                <span>
                                    Preview Stage <BsBoxArrowUpRight />
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className={RptStyle.config_details}>
                    <div className={RptStyle.config_details_head}>
                        Process Information
                    </div>
                    <table className={RptStyle.config_details_items}>
                        <tr className={RptStyle.info_row}>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Report Name
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    Vendor Onboarding Report
                                </div>
                            </td>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Description
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    N/A
                                </div>
                            </td>
                        </tr>
                        <tr className={RptStyle.info_row}>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Schedule Information
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    Weekly
                                </div>
                            </td>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Report Format (PDF, Excel)
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    PDF
                                </div>
                            </td>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Information Source
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    Self Service
                                </div>
                            </td>
                        </tr>
                        <tr className={RptStyle.info_row}>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Stored Function
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    Registered Vendor
                                </div>
                            </td>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Parameter Configuration
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    Creation Date, Status, Vendor name
                                </div>
                            </td>
                            <td>
                                <div className={RptStyle.info_group_label}>
                                    Receivers email Address
                                </div>
                                <div className={RptStyle.info_group_text}>
                                    oluwaseye.fawibe@outlook.com
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </PageStyle>
        </RouteLayout>
    )
}