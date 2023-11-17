import React, { useState } from "react";
import multi from "./MultiSelect.module.css";
import { HiX } from "react-icons/hi";
import DashboardStyle from "../../Styles/Dashboard.module.css";
import { useFormContext } from "react-hook-form";
import ClickAwayListener from "../Misc/ClickAwayListener";

function MultiSelect({ data, dataValues, name, title, isOptional }) {
  const { setValue } = useFormContext();
  const [showOptions, setShowOptions] = useState(false);
  const thirdArray = data?.filter?.((elem) => {
    const tv = dataValues?.some?.((ele) => {
      return +ele === elem?.id;
    });
    return tv;
  });

  const removeFromThirdArray = (id) => {
    const newArray = thirdArray?.filter((elem) => {
      return elem?.id !== id;
    });

    return setValue(
      name,
      newArray?.map((x) => x?.id?.toString())
    );
  };

  return (
    <ClickAwayListener
      onClickAway={() => setShowOptions(false)}
      className={multi.select}
    >
      <label htmlFor="">
        {title}{" "}
        {isOptional === true ? "" : <sup style={{ color: "red" }}>*</sup>}
      </label>
      {/* {showOptions && ( */}
      <div className={multi.select_choices}>
        {thirdArray?.slice(0, 3)?.map((x) => (
          <button onClick={() => setShowOptions(!showOptions)} type="button">
            <p> {x?.checkBoxName}</p>{" "}
            <HiX
              onClick={(e) => {
                e.stopPropagation();
                removeFromThirdArray(x?.id);
              }}
            />
          </button>
        ))}
        {thirdArray?.slice(3, thirdArray?.length)?.length >= 1 && (
          <button
            className={multi._count}
            onClick={() => setShowOptions(!showOptions)}
            type="button"
          >
            <p>+ {thirdArray?.slice(3, thirdArray?.length)?.length}</p>
          </button>
        )}
      </div>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={multi.input_field}
      ></div>

      {showOptions && (
        <div
          style={{ width: "100%" }}
          className={`${DashboardStyle.inputs_group_no_grid} ${multi.inputs_group_no_grid}`}
        >
          <div
            style={{ margin: "0" }}
            className={`${DashboardStyle.inputs_checkbox_groups} ${multi.inputs_checkbox_groups}`}
          >
            <div
              style={{
                margin: "0",
              }}
              className={multi.inputs_checkbox_groupsx}
            >
              {" "}
              {data?.map((x, index) => {
                return (
                  <MultiCheckBox
                    // style={{multi.}}
                    key={index}
                    name={x?.checkBoxName}
                    camelCase={name}
                    group={name}
                    value={x?.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </ClickAwayListener>
  );
}

export default MultiSelect;




export function MultiCheckBox({
  name,
  isHeading,
  camelCase,
  group,
  value,
  moreRegister,
  style,
  isRequired,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // console.log({ camelCase, value, moreRegister, name, group });
  // const inputName = camelCase?.replace(/"/g, "");

  return (
    <div style={{ ...style }} className={DashboardStyle.checkbox_style}>
      <label
        style={{
          fontWeight: isHeading === true && "500",
          marginBottom: isHeading === true ? "40px" : "0.8rem",
        }}
        htmlFor={value}
      >
        {" "}
        <input
          id={value}
          {...register(`${camelCase}`, {
            required: {
              value: isRequired === false ? false : true,
              message: "yeah",
            },
            // onChange: (e) => console.log("name"),
            ...moreRegister,
          })}
          value={value}
          // value={`${value}`}
          name={group || ""}
          type="checkbox"
        />
        {name || ""}
      </label>
      {/* {(errors || errors?.[inputName]) && (
        <small className={input.form__error__message}>
          {errors?.[inputName]?.message}
        </small>
      )} */}
    </div>
  );
}