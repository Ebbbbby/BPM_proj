import React from "react";
import Page from "./Styles/Style.module.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Pagination = ({
  last_page,
  present_page,
  pageSize,
  click,
  setPageSize,
  hideOnMobile = false,
  totalRows,
}) => {
  const array = [
    {
      name: 10,
      key: 10,
    },

    {
      name: 20,
      key: 20,
    },

    {
      name: 50,
      key: 50,
    },

    {
      name: "All",
      key: totalRows,
    },
  ];

  return (
    <div className={Page.pagination_controls}>
      <div
        className={Page.pagination_showing}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <p>
          Showing {present_page} of {Math.ceil(totalRows/pageSize)}
        </p>
        <select
          className={Page.pagination_select}
          onChange={(e) => setPageSize(e.target.value)}
          name=""
          id=""
        >
          {array?.map((x, index) => (
            <option key={index} value={x?.key}>
              {x?.name}
            </option>
          ))}
        </select>
      </div>

      <div className={Page.pagination_holder}>
        <button
          disabled={present_page === 1 && true}
          onClick={() => click(present_page - 1)}
          style={{ cursor: "pointer" }}
          className={Page.pagination_movement}
        >
          <IoMdArrowDropleft /> Prev
        </button>{" "}
        <button
          className={Page.pagination_movement_active}
          disabled={last_page === present_page && true}
          style={{ cursor: "pointer", fontWeight: "400" }}
        >
          {present_page}
        </button>
        <button
          className={Page.pagination_movement}
          disabled={present_page - last_page === 0 && true}
          onClick={() => click(present_page + 1)}
          style={{
            cursor: present_page - last_page === 0 ? "not-allowed" : "pointer",
          }}
        >
          Next <IoMdArrowDropright />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
