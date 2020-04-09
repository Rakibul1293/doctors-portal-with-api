import React, { useState, useEffect } from 'react';
import './Appointment.css';
import logo from './images/dental_doctor.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentConfirm from '../AppointmentConfirm/AppointmentConfirm';

const Appointment = () => {
    const [startDate, setStartDate] = useState(new Date());
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[startDate.getMonth()];
    const month = startDate.getMonth();
    const year = startDate.getFullYear();
    const date = startDate.getDate();
    const time = startDate.getTime();
    const formated_calender = `${date}-${month}-${year}`;
    const calender = { monthName, month, year, date, time, formated_calender };
    const [appointList, setAppointList] = useState([]);

    useEffect(() => {
        // fetch("http://localhost:4200/appointments")
        fetch("https://fathomless-taiga-80523.herokuapp.com/appointments")
            .then(res => res.json())
            .then(data => {
                setAppointList(data);
            })
    }, [])

    return (
        <div className="container-fluid top-banners">
            <div className="twin-side">
                <div className="row">
                    <div className="col-md-6 cal">
                        <div className="cal">
                            <h1>Appointment</h1><br />
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                inline
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={logo} alt="" />
                    </div>
                </div>
            </div>

            <div className="appointment-time">
                <div className="row">
                    <div className="col-md-12 text-center font-weight-bold mt-5 mb-4">
                        <p className="title-text">Available Appointments on {calender.monthName} {calender.date}, {calender.year}</p>
                    </div>
                </div>
                <div className="row mb-5">
                    {
                        appointList.map(appointList =>
                            <AppointmentConfirm
                                key={appointList._id}
                                appointList={appointList}
                                calender={calender}
                            ></AppointmentConfirm>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Appointment;