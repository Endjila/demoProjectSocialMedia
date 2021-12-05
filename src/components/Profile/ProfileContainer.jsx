import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import {
    getProfileThunkCreator, getStatusThunkCreator,
    updateStatusThunkCreator, savePhoto, saveProfile,
} from '../../redux/profileReducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter'

class ProfileAPIComponent extends React.Component {
    refreshProfile() {
        let userId = this.props.params.userId;
        if (!userId) {
            userId = this.props.authUserId;
        }
        this.props.getProfileThunkCreator(userId);
        this.props.getStatusThunkCreator(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.params.userId != prevProps.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Profile {...this.props}
                isOwner={!this.props.params.userId}
                profile={this.props.profile}
                statsus={this.props.status}
                updateStatus={this.props.updateStatusThunkCreator}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile} />
        </>
    };
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
};

const ProfileContainer = compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        getProfileThunkCreator,
        getStatusThunkCreator,
        updateStatusThunkCreator,
        savePhoto,
        saveProfile,
    }),
    withRouter,
)(ProfileAPIComponent);

export default ProfileContainer;