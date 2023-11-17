import React from "react";
import { animated, useTransition } from "@react-spring/web";
import style from "./modal.module.css";
import { BsFillXSquareFill } from "react-icons/bs";

export function AlertModal({
  isOpen,
  setIsOpen,
  width,
  children,
  Prop,
  buttonAction,
  buttonName,
  closeFunction,
  padding,
  hasCancel,
}) {
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });

  // const AnimatedDialogOverlay = animated(DialogOverlay);
  // const AnimatedDialogContent = animated(DialogContent);

  return (
    <div className={style.modalRoot}>
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              className={style.modalOverlay}
              onClick={() => setIsOpen?.(false) || closeFunction?.()}
              style={{ opacity: styles.opacity, zIndex: "9999" }}
            >
              <animated.div
                aria-labelledby="dialog-title"
                style={{
                  transform: styles.y.to(
                    (value) => `translate3d(0px, ${value}px, 0px)`
                  ),
                  width: width || "361px",
                  height: "auto",
                  padding: padding || "",
                }}
                className={style.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                {hasCancel === true && (
                  <div className={style.modalCloseParent}>
                    <BsFillXSquareFill
                      onClick={() => setIsOpen?.(false) || closeFunction?.()}
                      className={style.modalClose}
                      //    className="cancel-icon"
                    />
                  </div>
                )}
                <div>{children}</div>
              </animated.div>
            </animated.div>
          )
      )}
    </div>
  );
}
