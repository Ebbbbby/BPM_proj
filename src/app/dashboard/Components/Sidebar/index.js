import React, { useEffect, useState } from "react";
import { sidebar } from "./sidebarUrls";
import { NavLink, useLocation } from "react-router-dom";
import SidebarStyle from "./Style/Sidebar.module.css";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import Logout from "../../../../utils/functions/LogoutFunction";
import {getMyPermissions} from "../../../../utils/functions/GetMyPermissions";


function Sidebar({ className }) {
    const [userPermissions, setUserPermissions] = useState([]);

    useEffect(()=>{
        setUserPermissions(getMyPermissions())
    }, [])

  return (
    <aside className={`${SidebarStyle.sidebar} ${className}`}>
      <div className={SidebarStyle.sidebar_menues}>
        {" "}
        {sidebar()?.map((x, index) => (
          <ParentNav {...x} userPermissions={userPermissions} key={index} />
        ))}
      </div>

      <hr style={{ marginLeft: "-0.5rem" }} />

      <div className={`${SidebarStyle.navlink}`}>
        <div onClick={() => Logout()} className={SidebarStyle.navlink_class}>
          <span>
            <FiLogOut style={{ marginTop: "0.2rem" }} />
          </span>{" "}
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

function ParentNav({
  iconLink,
  iconTag,
  linkEnd,
  iconIMG,
  hasSubLinks,
  subLinks,
  linkPermissions,
  userPermissions
}) {
  const [hover, setHover] = useState(false);
  const l = useLocation()?.pathname;
  const parent = l?.split("/")?.[2];
  const yp = sidebar()?.find((x) => x?.iconLink === parent);

  useEffect(() => {
    if (yp?.iconLink !== iconLink) {
      setHover(false);
    }

    return;
  }, [yp?.iconLink, iconLink]);

  if(userPermissions && (linkPermissions === "" || userPermissions.includes(linkPermissions))) {
      if (hasSubLinks) {
        return (
          <div>
            <div
              className={`${SidebarStyle.navlink} ${
                yp?.iconLink === iconLink && SidebarStyle.navlink_isActive
              }`}
              onClick={() => setHover(!hover)}
            >
              <div className={SidebarStyle.navlink_class}>
                <span>
                  {iconIMG?.({
                    top: "0.1rem",
                  })}
                </span>{" "}
                <span>{iconTag}</span>
              </div>
              {!hover ? <TbChevronRight/> : <TbChevronDown/>}
            </div>
            {hover && (
              <div className={SidebarStyle.navlink_sublink_group}>
                {subLinks?.map((x, index) => {
                    if (userPermissions && (x.linkPermissions === "" || userPermissions.includes(x.linkPermissions))) {
                      return (<NavLink
                        key={index}
                        className={({isActive}) =>
                          isActive
                            ? `${SidebarStyle.navlink_sublink_isActive} ${SidebarStyle.navlink_sublink}`
                            : `${SidebarStyle.navlink_sublink}`
                        }
                        to={x?.subUrl}
                      >
                        {x?.sublink}
                      </NavLink>)
                    }
                    return <></>
                  }
                )}
              </div>
            )}
          </div>
        );
      }


      return (
          <>
              <NavLink to={iconLink} end={linkEnd}>
                  {({isActive}) => {
                      return (
                          <>
                              <>
                                  <div
                                      className={`${SidebarStyle.navlink} ${
                                          isActive && SidebarStyle.navlink_isActive
                                      }`}
                                  >
                                      <div className={SidebarStyle.navlink_class}>
                    <span>
                      {iconIMG?.({
                          top: "0.1rem",
                      })}
                    </span>{" "}
                                          <span>{iconTag}</span>
                                      </div>
                                  </div>
                              </>
                          </>
                      );
                  }}
              </NavLink>
          </>
      );
  }
}
