import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "./ReactPortal";
import ClickAwayListener from "../Misc/ClickAwayListener";
// import "./modalStyles.css";

function Modal({ children, isOpen, handleClose }) {
    const nodeRef = useRef(null);
    useEffect(() => {
        const closeOnEscapeKey = (e) =>{
            console.log('we listened to the events', e.key);
            return (e.key === "Escape" ? handleClose() : null);
        }
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    return (
        <ReactPortal wrapperId="modal-root">
            <CSSTransition
                in={isOpen}
                timeout={{ entry: 0, exit: 300 }}
                unmountOnExit
                classNames="modal"
                nodeRef={nodeRef}
            >
                <div className="modal-container">
                    <div className="modal" ref={nodeRef}>
                        <div className="modal-content">
                            <ClickAwayListener onClickAway={handleClose}>
                                {children}
                            </ClickAwayListener>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </ReactPortal>
    );
}
export default Modal;
