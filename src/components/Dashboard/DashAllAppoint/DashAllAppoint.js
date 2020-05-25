import React, { useState, useEffect } from 'react';
import './DashAllAppoint.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const DashAllAppoint = () => {
    const [startDate, setStartDate] = useState(new Date());
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthName = monthNames[startDate.getMonth()];
    const month = startDate.getMonth();
    const year = startDate.getFullYear();
    const date = startDate.getDate();
    const time = startDate.getTime();
    const formated_calender = `${date} ${monthName}, ${year}`;
    const calender = { monthName, month, year, date, time, formated_calender };
    const number = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty One", "Twenty Two", "Twenty Three", "Twenty Four", "Twenty Five", "Twenty Six", "Twenty Seven", "Twenty Eight", "Twenty Nine", "Thirty", "Thirty One"];
    const dateName = number[date];
    // console.log(dateName);
    const [appointedPeople, setAppointedPeople] = useState([]);

    useEffect(() => {
        // fetch(`http://localhost:4200/appointedPeople/${dateName}`)
        fetch(`https://fathomless-taiga-80523.herokuapp.com/appointedPeople/${dateName}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setAppointedPeople(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [startDate])

    return (
        <div className="container-fluid bg">
            <div className="row">
                <Sidebar />

                <div className="col-md-4">
                    <h2 className="pt-3">Appointments</h2><br />
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        inline
                    />
                </div>

                <div className="col-md-4">
                    <div className="appoint-list">
                        <div className="row">
                            <div className="col-md-6 font-weight-bold pt-3" style={{ marginLeft: "26px", color: "#0be6f1" }}>Appointments</div>
                            <div className="col-md-6 text-right font-weight-bold pt-3" style={{ marginLeft: "-49px", color: "#adadad" }}>{formated_calender}</div>
                        </div>

                        <div className="row mt-4" style={{ marginLeft: "39px", color: "#928d8d" }}>
                            <div className="col-md-4">
                                <h6 className="mb-1">Name</h6>
                            </div>
                            <div className="col-md-4">
                                <h6 className="mb-1">Schedule</h6>
                            </div>
                            <div className="col-md-4">
                                <h6 className="mb-1">Action</h6>
                            </div>
                        </div>

                        {
                            appointedPeople.map(appointedPeople =>
                                <div className="row mt-4" style={{ marginLeft: "39px" }}>
                                    <div className="col-md-4">
                                        <h6 className="mb-4">{appointedPeople.name}</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <h6 className="mb-4">{appointedPeople.appointTime}</h6>
                                    </div>
                                    <div className="col-md-4">
                                        {
                                            appointedPeople.isPrescriptionAdded ?
                                                <Link to="/dashboard/doctor/appointment"><button className="btn btn-primary disabled" style={{ cursor: 'auto' }}>Visited</button></Link>
                                                :
                                                <Link to="/dashboard/doctor/appointment"><button className="btn btn-primary disabled" style={{ cursor: 'auto' }}>Not Visited</button></Link>
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashAllAppoint;