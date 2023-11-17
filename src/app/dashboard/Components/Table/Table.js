import React, { useEffect, useRef, useState } from "react";
import "./Table.css";
import { useSelector } from "react-redux";

function Table({ children }) {
  const table = useRef();
  const {
    global,
    assets,
    vendor,
    procurement,
    assetSetUp,
    consumable,
    consummableSetUp,
    fleet,
    fluelRequest,
    report,
  } = useSelector((x) => x);

  const isLoading =
    assets?.isLoading ||
    assets?.isLoading ||
    vendor?.isLoading ||
    global?.isLoading ||
    procurement?.isLoading ||
    assetSetUp?.isLoading ||
    consumable?.isLoading ||
    fleet?.isLoading ||
    consummableSetUp?.isLoading ||
    fluelRequest?.isLoading ||
    report?.isLoading;

  const [tableState, setTableState] = useState(false);

  useEffect(() => {
    if (!table?.current?.children?.[1]?.children?.length) {
      setTableState(true);
    } else setTableState(false);
  }, [children]);

  return (
    <>
      {" "}
      <>
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {tableState && (
              <small style={{ marginBottom: "1rem" }}>
                No Avaliable Data for This Table <br />{" "}
              </small>
            )}
          </>
        )}
      </>
      <table ref={table} className={"Parent_Style"}>
        {children}
      </table>
    </>
  );
}

export default Table;
