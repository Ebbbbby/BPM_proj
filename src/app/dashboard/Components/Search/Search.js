import React, { useEffect, useRef, useState } from "react";
import { FiCalendar, FiChevronDown, FiFilter, FiSearch } from "react-icons/fi";
import FilterSearch from "./Filter.module.css";
import { DayPicker } from "react-day-picker";
import { addDays } from "date-fns";
import "./DatePicker.css";
import "react-day-picker/dist/style.css";
import moment from "moment";

export function SearchFilter({ text, fromHeader, value, label }) {
  const ref = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => text(query), 1000);
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleAutoFocus = () => {
    ref.current.focus();
  };
  return (
    <div>
      {fromHeader === true ? (
        ""
      ) : (
        <label htmlFor="">{label ? label : "Search"}</label>
      )}
      <div onClick={handleAutoFocus} className={FilterSearch.Search}>
        <FiSearch className={FilterSearch.Icon} />
        <input
          onChange={(e) => setQuery(e.target.value)}
          ref={ref}
          placeholder={"Search"}
          type="text"
          value={value}
        />
      </div>
    </div>
  );
}

export function ProDropFilter({ filterBy, setFilter, filter, name, onChange }) {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <div className={`${FilterSearch.Search} ${FilterSearch.Search_Select}`}>
        {/* {!filter?.filter ? "Filter" : filter?.name} */}
        <select
          onChange={(e) => {
            setFilter(e.target.value);
            onChange(e)
          }}
          name={name}
          id={name}
          value={filter}
          defaultValue=""
        >
          <option value="">{name}</option>
          {filterBy?.map(({ name, filter, onClick }, index) => (
            <option onClick={onClick} key={index} value={filter}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function ProDropFilterMd({ filterBy, setFilter, filter, name }) {
  return (
    <div className={`${FilterSearch.Search} ${FilterSearch.Search_Select_md}`}>
      {/* {!filter?.filter ? "Filter" : filter?.name} */}
      <select onChange={(e) => setFilter(e.target.value)} name="" id="">
        <option value="">{name}</option>
        {filterBy?.map(({ name, filter }, index) => (
          <option key={index} value={filter}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ActionFilter({
  filterBy,
  setFilter,
  filter,
  name,
  placeholder,
}) {
  return (
    <div>
      <div className={`${FilterSearch.Action_Filter}`}>
        {/* {!filter?.filter ? "Filter" : filter?.name} */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          name={name}
          id={name}
          placeholder={placeholder}
        >
          <option value="">{placeholder}</option>
          {filterBy?.map(({ name, filter }, index) => (
            <option key={index} value={filter}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function ActionButton({
  filterBy,
  setFilter,
  filter,
  name,
  placeholder,
  onChange,
  disabled,
}) {
  return (
    <div
      style={{ maxWidth: "100px" }}
      className={`${FilterSearch.Action_Filter}`}
    >
      {/* <label htmlFor={name}>{name}</label> */}
      <div className={FilterSearch.Search} onChange={() => onChange()}>
        <select
          onChange={(e) => setFilter(e.target.value)}
          name={name}
          id={name}
          placeholder={placeholder}
          disabled={disabled === "disabled" ? true : false}
        >
          <option value="">{placeholder}</option>
          {filterBy?.map(({ name, filter }, index) => (
            <option key={index} value={filter}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function FilterButton({ filterBy, setFilter, filter, name, onClick }) {
  return (
    <div onClick={() => onClick()} style={{ maxWidth: "100px" }}>
      <label htmlFor={name}>{name}</label>
      <div
        style={{ padding: "0.56rem 0.6rem" }}
        className={FilterSearch.Search}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0px 8px",
          }}
        >
          {" "}
          <FiFilter className={FilterSearch.Icon} />
          <p>Filter</p>
        </div>
        <input placeholder={"Search"} type="button" />
      </div>
    </div>
  );
}

export function CalendarFilter({ onChange, name, date, startDate, endDate }) {
  const pastMonth = new Date();
  const defaultSelected = {
    from: startDate,
    to: endDate,
  };
  const [range, setRange] = useState(date ? date : defaultSelected);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    date(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);
  return (
    <div
      onMouseLeave={() => setOpenModal(false)}
      className={FilterSearch?.date_filter}
      style={{ maxWidth: "200px" }}
    >
      <label htmlFor={name}>{name}</label>
      {/* <style>{css}</style> */}
      <div style={{ padding: "0.7rem 0.6rem" }} className={FilterSearch.Search}>
        <div
          onClick={() => setOpenModal(!openModal)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0px 8px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {" "}
          <FiCalendar className={FilterSearch.Icon} />
          <p style={{ fontSize: "0.71rem", display: "inline-flex" }}>
            {moment(range?.from).format("l")}–{moment(range?.to).format("l")}
          </p>
          <FiChevronDown className={FilterSearch.Icon} />
        </div>
        <input
          style={{ display: "none" }}
          placeholder={"Search"}
          type="button"
        />
      </div>
      {openModal && (
        <div className={FilterSearch?.date_filter_picker}>
          {" "}
          <DayPicker
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            // footer={footer}
            onSelect={(val) => {
              setRange(val);
              // onChange(val)
            }}
          />
        </div>
      )}
    </div>
  );
}

export function CalendarFilter2({ setStartDate, setEndDate, name }) {
  const pastMonth = new Date();
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };

  const [range, setRange] = useState(defaultSelected);

  const handleDateRange = () => {
    setStartDate(range.from);
    setEndDate(range.to);
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      onMouseLeave={() => setOpenModal(false)}
      className={FilterSearch?.date_filter}
      style={{ maxWidth: "200px" }}
    >
      <label htmlFor={name}>{name}</label>
      {/* <style>{css}</style> */}
      <div style={{ padding: "0.7rem 0.6rem" }} className={FilterSearch.Search}>
        <div
          onClick={() => setOpenModal(!openModal)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0px 8px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {" "}
          <FiCalendar className={FilterSearch.Icon} />
          <p style={{ fontSize: "0.71rem", display: "inline-flex" }}>
            {moment(range?.from).format("l")}–{moment(range?.to).format("l")}
          </p>
          <FiChevronDown className={FilterSearch.Icon} />
        </div>
        <input
          style={{ display: "none" }}
          placeholder={"Search"}
          type="button"
        />
      </div>
      {openModal && (
        <div
          className={FilterSearch?.date_filter_picker}
          onMouseLeave={handleDateRange}
        >
          {" "}
          <DayPicker
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            // footer={footer}
            onSelect={setRange}
          />
        </div>
      )}
    </div>
  );
}
