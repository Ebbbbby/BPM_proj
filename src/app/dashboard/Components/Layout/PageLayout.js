import React from "react";
import PageStyle from "./Layout.module.css";
import { BackButtons } from "../../../global/components/Buttons/buttons";
import { useNavigate } from "react-router";
import PermissionCheck from "../../../../utils/PermissionCheck";

function PageLayout({
  children,
  title,
  action,
  hasBack,
  className,
  isMain,
  isHeadLiner,
  support,
  backURL,
  permission,
}) {
  const navigate = useNavigate();
  return (
    <>
      {isHeadLiner === true ? (
        <div className={PageStyle.Route_Buttons}>
          <div>
            <h3 className={PageStyle.Route_Page_Title}>{title}</h3>
            <small className={PageStyle.Route_Page_Support}>{support}</small>
          </div>
          <div>
            {" "}
            {hasBack && <BackButtons onClick={() => navigate(backURL || -1)} />}
          </div>
          {action}
        </div>
      ) : (
        <div className={`${PageStyle.Route_Layout} ${className}`}>
          <div className={PageStyle.Route_Buttons}>
            {isMain === true && (
              <div>
                <h3 className={PageStyle.Route_Page_Title}>{title}</h3>
                <small className={PageStyle.Route_Page_Support}>
                  {support}
                </small>
              </div>
            )}
            <div>
              {" "}
              {hasBack && (
                <BackButtons onClick={() => navigate(backURL || -1)} />
              )}
            </div>
            {action}
          </div>

          <div className={PageStyle.Route_Page_Layout_Body}>
            {" "}
            {isMain !== true && (
              <div>
                <h3 className={PageStyle.Route_Page_Title}>{title}</h3>
              </div>
            )}
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default PageLayout;
