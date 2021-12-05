import React from 'react';
import { sendMessage } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       sendMessage: (newMessageText) => {
            dispatch(sendMessage(newMessageText));
       }
    }
}



const DialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);

export default DialogsContainer;