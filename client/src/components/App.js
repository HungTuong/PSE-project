import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadMoviePage from './views/UploadMoviePage/UploadMoviePage'
import ViewMoviePage from './views/ViewMoviePage/ViewMoviePage';
import UpdateProfile from './views/UpdateProfile/UpdateProfile';



//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/upload" component={Auth(UploadMoviePage, true)} />
          <Route exact path="/movie/:movieId" component={Auth(ViewMoviePage, null)} />
          <Route exact path="/users/update/:userId" component={Auth(UpdateProfile, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
