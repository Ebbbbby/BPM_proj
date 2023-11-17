import React from "react";
import {FiAlertCircle} from "react-icons/fi";
import BaseModal from "../BaseModal";
import '../Style/modalStyles.scss'
import WarningIcon from '../../../../global/images/warning_icon.png'

export default function DeleteSetupModal ({ isOpen, handleClose, handleDelete }) {
    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose} >
            <div className="delete-setup">
                <div className="modal-icon">
                    <img src={WarningIcon} alt=""/>
                </div>
                <div className="modal__text">
                    <div className="modal__text--head">Delete Process</div>
                    <div className="modal__text--main">
                        Are you sure you want to delete this process?<br /> This action cannot be undone.
                    </div>
                </div>
                <div className="modal__actions">
                    <button className="btn btn-outline" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </BaseModal>
    )
}