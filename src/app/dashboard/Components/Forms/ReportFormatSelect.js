import React from "react";

export default function ReportFormatSelect (props) {
    const {
        id,
        onChange
    } = props;
    return (
        <select id={id} className="form__select" defaultValue="PDF,Excel" onChange={onChange}>
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
            <option value="PDF,Excel">PDF, Excel</option>
        </select>
    )
}
