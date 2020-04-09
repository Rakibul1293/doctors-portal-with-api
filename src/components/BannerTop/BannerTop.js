import React from 'react';
import './BannerTop.css';
import { Link } from 'react-router-dom';

const BannerTop = () => {
    return (
        <section className="top-banner">
            <h1 className="text-center txt-dec">Your New Smile Start Here</h1>
            <div className="input-group">
                <span className="input-group-btn">
                    <Link to="/appointments"><button className="btn btn-search" type="button">Get Appointment</button></Link>
                    <Link to="/dashboard/doctor/appointment"><button className="btn btn-search" type="button">Dentel Services</button></Link>
                </span>
            </div>
        </section>
    );
};

export default BannerTop;