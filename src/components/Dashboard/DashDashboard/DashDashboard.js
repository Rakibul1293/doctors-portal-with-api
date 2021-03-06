import React, { useState, useEffect } from 'react';
import './DashDashboard.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Modals = (props) => {
    // console.log(props);
    const [prescription, setPrescription] = useState(null);

    const setPrescriptions = (e) => {
        const prescription = e.target.value;
        // console.log(prescription);
        setPrescription(prescription);
    }

    const handlePrescription = (presid) => {
        // console.log(presid);
        // fetch(`http://localhost:4200/prescriptionAdded/${props.appointedpeopleid}`, {
        fetch(`https://fathomless-taiga-80523.herokuapp.com/prescriptionAdded/${presid}`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ prescriptionAdded: prescription, isPrescriptionAdded: props.isPrescriptionAdded })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Post Successfully', data);
                alert('Prescription Successfully Added');
            })
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Prescription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicText">
                        <textarea onChange={(e) => setPrescriptions(e)} className="form-control form-rounded" rows="3"></textarea>
                    </Form.Group>

                    <Link to="/"><Button onClick={() => handlePrescription(props.presid)} variant="primary" type="submit">SEND</Button></Link>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};



const DashDashboard = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [appointedPeople, setAppointedPeople] = useState([]);
    const [presid, setPresid] = useState(null);
    const [isPrescriptionAdded, setIsPrescriptionAdded] = useState(false);
    const [modalShow, setModalShow] = useState(false);
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

    const modalPresid = (e) => {
        setModalShow(true);
        const id = e.target.id;
        setPresid(id);
        setIsPrescriptionAdded(true);
    }

    useEffect(() => {
        // fetch(`http://localhost:4200/appointedPeople`)
        fetch(`https://fathomless-taiga-80523.herokuapp.com/appointedPeople`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setAppointedPeople(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [startDate])

    // console.log([...appointedPeople].length);
    // const pendAppoint = appointedPeople.filter(appointedPeople => appointedPeople.isPrescriptionAdded !== true).length
    // console.log(pendAppoint);
    // console.log(pendAppoint.length);

    return (
        <div className="container-fluid pos">
            <div className="row">
                <Sidebar />

                <div className="row pt-4 pl-4">
                    <h5 className="font-weight-bold">Dashboard</h5><br />
                </div>

                <div className="control">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="d-flex justify-content-between align-items-center cat1">
                                <div className="row">
                                    <div className="col-md-4"><h2 className="control_h2h6">{appointedPeople.filter(appointedPeople => appointedPeople.isPrescriptionAdded !== true).length}</h2></div>
                                    <div className="col-md-6 font-weight-bold"><h6 className="control_h2h6">Pending Appointments</h6></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex justify-content-between align-items-center cat2">
                                <div className="row">
                                    <div className="col-md-4"><h2 className="control_h2h6">{[...appointedPeople].length}</h2></div>
                                    <div className="col-md-6 font-weight-bold"><h6 className="control_h2h6">Total Appointments</h6></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex justify-content-between align-items-center cat3">
                                <div className="row">
                                    <div className="col-md-4"><h2 className="control_h2h6">{[...appointedPeople].length}</h2></div>
                                    <div className="col-md-6 font-weight-bold"><h6 className="control_h2h6">Total Patients</h6></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="dash-appoint-list">
                        <div className="row">
                            <div className="col-md-6 font-weight-bold pt-3" style={{ marginLeft: "26px", color: "#0be6f1" }}>Appointments</div>
                            <div className="col-md-6 text-right font-weight-bold pt-3" style={{ marginLeft: "-49px", color: "#adadad" }}>{formated_calender}</div>
                        </div>

                        <div className="row mt-4" style={{ marginLeft: "39px", color: "#928d8d" }}>
                            <div className="col-md-2">
                                <h6 className="mb-1">Date</h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="mb-1">Time</h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="mb-1">Name</h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="mb-1">Contact</h6>
                            </div>
                            <div className="col-md-4">
                                <h6 className="mb-1">Prescription</h6>
                            </div>
                            {/* <div className="col-md-2">
                                <h6 className="mb-1">Action</h6>
                            </div> */}
                        </div>

                        {
                            appointedPeople.map(appointedPeople =>
                                <div className="row mt-4" style={{ marginLeft: "39px", color: "#000" }}>
                                    <div className="col-md-2">
                                        <h6 className="mb-4">{appointedPeople.appointDate}</h6>
                                    </div>
                                    <div className="col-md-2">
                                        <h6 className="mb-4">{appointedPeople.appointTime}</h6>
                                    </div>
                                    <div className="col-md-2">
                                        <h6 className="mb-4">{appointedPeople.name}</h6>
                                    </div>
                                    <div className="col-md-2">
                                        <h6 className="mb-4">{appointedPeople.phoneNumber}</h6>
                                    </div>
                                    <div className="col-md-4">
                                        {
                                            appointedPeople.isPrescriptionAdded ?
                                                < Link to="#" key={appointedPeople._id} id={appointedPeople._id} className="btn btn-primary disabled" onClick={(e) => modalPresid(e)}>View</Link>
                                                :
                                                < Link to="#" key={appointedPeople._id} id={appointedPeople._id} className="btn btn-primary" onClick={(e) => modalPresid(e)}>Not Added</Link>
                                        }

                                        <Modals
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            presid={presid}
                                            isPrescriptionAdded={isPrescriptionAdded}
                                        />
                                    </div>
                                    {/* <div className="col-md-2">
                                        <Link to=""><button key={appointedPeople._id} id={appointedPeople._id} className="btn btn-primary">Appr</button></Link>
                                    </div> */}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DashDashboard;