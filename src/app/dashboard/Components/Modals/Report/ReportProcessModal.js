import React from "react";
import BaseModal from "../BaseModal";
import '../Style/modalStyles.scss'

export default function ReportProcessModal ({ isOpen, handleClose, headText, successBtnText, handleSuccess }) {
    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose} >
            <div className="setup-process">
                <div className="modal__image">

                </div>
                <div className="modal__text">
                    <div className="modal__text--head">
                        {headText}
                    </div>
                </div>
                <div className="modal__actions">
                    <button className="btn btn-text" onClick={handleClose}>
                        No, Cancel
                    </button>
                    <button className="btn btn-success" onClick={handleSuccess}>
                        {successBtnText ? successBtnText : "Yes" }
                    </button>
                </div>
            </div>
        </BaseModal>
    )
}