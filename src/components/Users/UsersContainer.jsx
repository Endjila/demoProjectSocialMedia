import React from "react";
import { connect } from "react-redux";
import {
    setCurrentPage,
    getUsersThunkCreator,
    followUsersThunkCreator,
    unfollowUsersThunkCreator,
} from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";
import { getCurrentPage, getIsFetching, getIsFollowingInProgress, getPageSize, getTotalUsersCount, getUsers } from "../../redux/usersSelectors";


class UsersAPIComponent extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsersThunkCreator(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsersThunkCreator(pageNumber, pageSize);
        this.props.setCurrentPage(pageNumber);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                pages={this.props.pages}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                isFollowingInProgress={this.props.isFollowingInProgress}
                followUsersThunkCreator={this.props.followUsersThunkCreator}
                unfollowUsersThunkCreator={this.props.unfollowUsersThunkCreator} />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state),
    }
};



const UsersContainer = compose(
    connect(mapStateToProps, {
        setCurrentPage, getUsersThunkCreator, followUsersThunkCreator, unfollowUsersThunkCreator,
    }),
    withAuthRedirect,
)(UsersAPIComponent);

export default UsersContainer;