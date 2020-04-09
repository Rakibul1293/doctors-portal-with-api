import React, { useState } from 'react';
import './AppointmentConfirm.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Modals = (props) => {
    // console.log(props);
    const [appointTime, setAppointTime] = useState(props.time);
    const [name, setName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [appointDate, setAppointDate] = useState(null);
    const [joinAppointDate, setJoinAppointDate] = useState(null);
    const number = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty One", "Twenty Two", "Twenty Three", "Twenty Four", "Twenty Five", "Twenty Six", "Twenty Seven", "Twenty Eight", "Twenty Nine", "Thirty", "Thirty One"];


    const state = {
        "appointTime": `${appointTime}`,
        "name": `${name}`,
        "phoneNumber": `${phoneNumber}`,
        "email": `${email}`,
        "appointDate": `${appointDate}`,
        "joinAppointDate": `${joinAppointDate}`
    }
    // console.log(state);

    const handleAppointedPeople = () => {
        // fetch("http://localhost:4200/appointedPeople", {
            fetch("https://fathomless-taiga-80523.herokuapp.com/appointedPeople", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Post Successfully', data);
                alert('Thank\'s For Your Appointment');
            })
    }

    const setNames = (e) => {
        const name = e.target.value;
        console.log(name);
        setName(name);
    }

    const setPhoneNumbers = (e) => {
        const phoneNumber = e.target.value;
        console.log(phoneNumber);
        setPhoneNumber(phoneNumber);
    }

    const setEmails = (e) => {
        const email = e.target.value;
        console.log(email);
        setEmail(email);
    }

    const setAppointDates = (e) => {
        const appointDate = e.target.value;
        console.log(appointDate);

        const joinAppointDate = appointDate.split("-");
        const conNum = parseInt(joinAppointDate[2]);
        console.log(conNum);

        const dateName = number[conNum];
        console.log(dateName);
        setJoinAppointDate(dateName);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicTime">
                        <Form.Label>Appointed Time</Form.Label>
                        <Form.Control defaultValue={props.time} readOnly placeholder="Appointed Time" />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control onChange={(e) => setNames(e)} type="text" placeholder="Your Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control onChange={(e) => setPhoneNumbers(e)} type="text" placeholder="Phone Number" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={(e) => setEmails(e)} type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicDate">
                        <Form.Label>Appointed Date</Form.Label>
                        <Form.Control onChange={(e) => setAppointDates(e)} type="date" />
                    </Form.Group>

                    <Link to="/"><Button onClick={handleAppointedPeople} variant="primary" type="submit">SEND</Button></Link>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

const AppointmentConfirm = (props) => {
    // console.log(props);
    const [modalShow, setModalShow] = useState(false);
    const { title, time, availableSpace } = props.appointList;

    return (
        <div className="row mb-5">
            <div className="col-md-4 text-center">
                <div className="card text-center mt-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title title-card-text">{title}</h5>
                        <h5 className="card-title">{time}</h5>
                        <p className="card-text">{availableSpace} Space Available</p>
                        <Link to="#" className="btn btn-primary" onClick={() => setModalShow(true)}>Book Appointment</Link>

                        <Modals
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            title={title}
                            time={time}
                        />
                    </div>
                </div>
            </div >
        </div >
    );
};

export default AppointmentConfirm;