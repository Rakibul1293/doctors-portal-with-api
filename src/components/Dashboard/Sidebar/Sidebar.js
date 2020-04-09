import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="col-md-3">
            <div className="side-bar pt-5">
                <ul className="pt-4">
                    <Link to="/dashboard/doctor" style={{ textDecoration: 'none' }}><li>Dashboard</li></Link>
                    <Link to="/dashboard/doctor/appointment" style={{ textDecoration: 'none' }}><li>Appoinment</li></Link>
                    <Link to="" style={{ textDecoration: 'none' }}><li>Patients</li></Link>
                    <Link to="" style={{ textDecoration: 'none' }}><li>Prescriptions</li></Link>
                    <Link to="" style={{ textDecoration: 'none' }}><li>Setting</li></Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;