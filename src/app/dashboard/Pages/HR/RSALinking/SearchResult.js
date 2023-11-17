import React from 'react'
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../Components/Table/Table";
import { MergeActions } from './RSASearch/Search';

const SearchResult = () => {
  return (
    <div>
        <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Pin</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Source</th>
              <th>Approval Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <td>Tope Sawyer</td>
            <td>000457365797</td>
            <td>TopeSawyer@gmail.com</td>
            <td>07039065432</td>
            <td>07-12-2012</td>
            <td>Employee</td>
            <td>Not Assigned</td>
            <td><MergeActions/></td>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default SearchResult
