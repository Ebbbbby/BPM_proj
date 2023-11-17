import React, {useRef, useState } from "react";
import {FiSearch, FiEye, FiChevronDown} from "react-icons/fi";
import FilterSearch from "../Styles/Filter.module.css"
import { useNavigate } from "react-router";
import Actions from "../../../../Components/Misc/Actions/Actions.module.css";

import {CgArrowsMergeAltH} from "react-icons/cg"
export function Search({ text, onClick}) {
  const ref = useRef(null);

  const handleAutoFocus = () => {
    ref.current.focus();
  };
  return (
    <div className={FilterSearch.Container}>
      <h3>Link RSA</h3>
      <div onClick={handleAutoFocus} className={FilterSearch.Search}>
        <FiSearch className={FilterSearch.Icon} onClick={() => onClick(console.log('clicked'))}  />
        <input
          onChange={(e) => text(e.target.value)}
          ref={ref}
          placeholder={"Search for RSA by Phone no, Email or Pin"}
          type="text"
        />
      </div>
    </div>
  );
}

export function MergeActions({ children, actions, url }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
      <div
        // onMouseLeave={() => setOpen(false)}
        className={`${Actions?.more_options} ${Actions?.more_options_tables}`}
      >
        <div>
          {" "}
          <button
            onClick={() => navigate(url)}
            className={`${Actions?.button} ${
              children && Actions?.half_border_left
            }`}
          >
          < CgArrowsMergeAltH/>
          </button>
          {children && (
            <button
              onClick={() => setOpen(!open)}
              className={`${Actions?.button} ${
                children && Actions?.half_border_right
              } }`}
            >
              <FiChevronDown />
            </button>
          )}
        </div>
        {open && (
          <div className={Actions.more_options_modal}>
            {children?.map?.((action, idx) => (
              <button
                key={idx}
                className={Actions.more_action_button}
                onClick={() =>{
                  setOpen(false);
                  action?.action();
                }}
              >
                {action?.name}
              </button>
            ))}
          </div>
        )}
      </div>
  );
}