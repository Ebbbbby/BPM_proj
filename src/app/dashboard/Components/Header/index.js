import React, { useState } from "react";
import LOGO_SVG from "../../../global/images/logo.svg";
import HeaderStyle from "./Style/Header.module.css";
import { SearchFilter } from "../Search/Search";
import { GetLocalStorage } from "../../../../utils/functions/GetLocalStorage";
import { FiBell, FiChevronDown } from "react-icons/fi";
import Logout from "../../../../utils/functions/LogoutFunction";
import ClickAwayListener from "../Misc/ClickAwayListener";

function Header({ className }) {
  const user = GetLocalStorage();
  const [actions, setActions] = useState(false);
  const userInitials = user?.fullName
    ?.split(" ")
    ?.map((x) => {
      return x?.slice(0, 1);
    })
    ?.join("")
    ?.slice(0, 2);

  return (
    <header className={`${HeaderStyle.header} ${className}`}>
      <div className={HeaderStyle?.header_logo}>
        <img src={LOGO_SVG} alt="" />
      </div>
      <div className={HeaderStyle?.header_actions}>
        <div className={HeaderStyle?.header_search}>
          <SearchFilter fromHeader={true} />
        </div>
        <div>
          <span className={HeaderStyle.header_bell_icon}>
            {" "}
            <FiBell fontSize={30} />
          </span>
        </div>
        <div
          onClick={() => setActions(!actions)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            position: "relative",
          }}
        >
          <div className={HeaderStyle.userInitials}>{userInitials}</div>
          <span>
            <FiChevronDown className={HeaderStyle.header_chevron_icon} />
          </span>
          {actions && (
            <ClickAwayListener onClickAway={() => setActions(!actions)}>
              <div
                onClick={(e) => e.stopPropagation()}
                className={HeaderStyle.table_more_icons_options}
              >
                <button
                  // style={{ ...child?.style }}
                  className={HeaderStyle.table_more_icons_options_button}
                  onClick={() => Logout()}
                >
                  Logout
                </button>
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
