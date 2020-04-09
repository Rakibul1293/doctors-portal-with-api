import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import BannerTop from './components/BannerTop/BannerTop';
import Appointment from './components/Appointment/Appointment';
import DashAllAppoint from './components/Dashboard/DashAllAppoint/DashAllAppoint';
import DashDashboard from './components/Dashboard/DashDashboard/DashDashboard';

function App(props) {
  return (
    <div className="bg">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Header />
            <BannerTop />
          </Route>
          <Route path='/appointments'>
            <Header />
            <Appointment />
          </Route>
          <Route path='/dashboard/doctor/appointment'>
            <DashAllAppoint />
          </Route>
          <Route path='/dashboard/doctor'>
            <DashDashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;