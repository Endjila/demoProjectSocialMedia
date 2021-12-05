import React from 'react';
import Header, { LogoutDropdown } from "./Header";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/authReducer";


class HeaderAPIComponent extends React.Component {

    render () {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
};


const HeaderContainer = connect(mapStateToProps, {logoutTC})(HeaderAPIComponent);

export default HeaderContainer;