import './App.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classes from './App.module.css';
import React, { Suspense } from 'react';
import { withRouter } from './hoc/withRouter';
import Navbar from './components/Navbar/Navbar';
import { initializeApp } from './redux/appReducer';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginContainer from './components/Login/LoginContainer';
import Preloader from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {
    catchAllUnhandleErrors = (promiseRejectionEvent) => {
        alert("Some error occured");
        console.error(promiseRejectionEvent);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className={classes.appWrapper}>
                <HeaderContainer />
                <Navbar isAuth={this.props.isAuth}/>
                <div className={classes.appWrapperContent}>
                    <Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route path="https://endjila.github.io/demoProjectSocialMedia/login" element={<LoginContainer />} />
                            <Route path="https://endjila.github.io/demoProjectSocialMedia/profile" element={<ProfileContainer />} />
                            <Route path="https://endjila.github.io/demoProjectSocialMediaprofile/:userId" element={<ProfileContainer />} />
                            <Route path="https://endjila.github.io/demoProjectSocialMedia/dialogs/*" element={<DialogsContainer />} />
                            <Route path="https://endjila.github.io/demoProjectSocialMedia/users/*" element={<UsersContainer />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
        isAuth: state.auth.isAuth,
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);
