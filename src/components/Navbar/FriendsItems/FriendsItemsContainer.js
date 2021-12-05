import React from 'react';
import FriendsItems from "./FriendsItems";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
    }
};

const mapDispatchToProps = () => {
    return {

    }
};

const FriendsItemsContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsItems);

export default FriendsItemsContainer;