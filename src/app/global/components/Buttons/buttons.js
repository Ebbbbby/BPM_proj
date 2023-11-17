import React, { useState } from "react";
import button from "./style/button.module.css";
import { IoAddSharp, IoArrowBackOutline } from "react-icons/io5";
import MoreItems from "../../../dashboard/Images/more.svg";

export function ActionButtons({
  children,
  className,
  bg,
  style,
  onClick,
  type,
  disabled,
  width,
  isLoading,
}) {
  return (
    <div>
      <button
        disabled={disabled || isLoading}
        type={type || "submit"}
        onClick={() => onClick?.()}
        style={{ backgroundColor: bg, width: width, ...style }}
        className={`${button.button} ${className}`}
      >
        <>{isLoading === true ? "Please Wait..." : children}</>
      </button>
    </div>
  );
}

export function SupportButtons({ children, className, onClick, style, width }) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onClick?.()}
        style={{ ...style, width: width }}
        className={`boy ${button.support_button} ${className}`}
      >
        {children}
      </button>
    </div>
  );
}

export function CTAButtons({ children, onClick }) {
  return (
    <div>
      <button onClick={() => onClick()} className={button.cta_button}>
        <IoAddSharp />
        <p>{children}</p>
      </button>
    </div>
  );
}

export function BackButtons({ children, onClick }) {
  return (
    <div>
      <button onClick={() => onClick()} className={button.back_button}>
        <IoArrowBackOutline className={button.back_icon} />
        <p>Back</p>
      </button>
    </div>
  );
}
//scheduler back button

export function BackButton({ children, onClick }) {
  return (
    <div>
      <button onClick={() => onClick()} className={button.back_buttons}>
        <IoArrowBackOutline className={button.back_icon} />
        <p>Back</p>
      </button>
    </div>
  );
}
//end

export function MoreButtons({ children, onClick }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      onMouseLeave={() => setOpen(false)}
      className={button.more_options}
    >
      <button className={button.more_button}>
        <img src={MoreItems} alt={"More Items"} />
      </button>
      {open && <div className={button.more_options_modal}>{children}</div>}
    </div>
  );
}

// export function FilterButtons() {
//   return (
//     // <div>
//       {/* <button className={button.filter_buttons}>Filter</button> */}
//     {/* </div> */}
//   );
// }

export function CTAButtonsAlt({ children, onClick }) {
  return (
    <div>
      <button onClick={() => onClick()} className={button.cta_button_alt}>
        <IoAddSharp />
        <p>{children}</p>
      </button>
    </div>
  );
}
