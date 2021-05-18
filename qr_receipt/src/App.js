import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import verifiedStamp from './verified.png';
import axios from 'axios';

function App() {
    const [supplyChain, setSupplyChain] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000`).then(res => {
            const data = res.data;
            console.log(data);
            setSupplyChain(data.result);
        });
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <Col sm="6" className="justify-content-center align-item-center my-auto">
                        <h2 className="text-dark" style={{ fontSize: '30px' }}>
                            Your Receipt : 0xdfghj5678dfgh567{' '}
                        </h2>
                    </Col>
                    <hr style={{ height: '2px', border: 'none', backgroundColor: '#000' }} />
                    <Row className="mt-3">
                        <Col sm="6" className="justify-content-center align-item-center my-auto">
                            <h2 className="text-dark" style={{ fontSize: '20px' }}>
                                Farmer Details
                            </h2>
                        </Col>
                        <Col sm="6" className="border-left border-dark" style={{ fontSize: '20px' }}>
                            <p>
                                <span className="badge badge-light ">Farmer ID : A1</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Farmer Name : Yash Boura</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Farm Location : Kerela</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Crop Type : Matcha Tea</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Quantity : 5 kgs</span>
                            </p>
                        </Col>
                    </Row>
                    <hr style={{ height: '2px', border: 'none', backgroundColor: '#000' }} />
                    <Row className="mt-3">
                        <Col sm="6" className="justify-content-center align-item-center my-auto">
                            <h2 className="text-dark" style={{ fontSize: '20px' }}>
                                Manufacturer Details
                            </h2>
                        </Col>
                        <Col sm="6" className="border-left border-dark" style={{ fontSize: '20px' }}>
                            <p>
                                <span className="badge badge-light ">Manufacturer ID : A1 </span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Manufacturer Name : Ankit Chauhan</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Factory Location : Goa</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Crop Type : Matcha Tea</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Quantity : 5 kgs</span>
                            </p>
                        </Col>
                    </Row>
                    <hr style={{ height: '2px', border: 'none', backgroundColor: '#000' }} />
                    <Row className="mt-3">
                        <Col sm="6" className="justify-content-center align-item-center my-auto">
                            <h2 className="text-dark" style={{ fontSize: '20px' }}>
                                Distributer Details
                            </h2>
                        </Col>
                        <Col sm="6" className="border-right border-dark" style={{ fontSize: '20px' }}>
                            <p>
                                <span className="badge badge-light ">Distributor ID : A1</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Distributor Name : Sachin Adate</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Crop Type : Matcha Tea</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Quantity : 5 kgs</span>
                            </p>
                        </Col>
                    </Row>
                    <hr style={{ height: '2px', border: 'none', backgroundColor: '#000' }} />
                    <Row className="mt-3">
                        <Col sm="6" className="justify-content-center align-item-center my-auto">
                            <h2 className="text-dark" style={{ fontSize: '20px' }}>
                                Retailer Details
                            </h2>
                        </Col>
                        <Col sm="6" className="border-left border-dark" style={{ fontSize: '20px' }}>
                            <p>
                                <span className="badge badge-light ">Retailer ID : A1</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Reatiler Name : Rahul Bane</span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Store Location : Mumbai </span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Crop Type : Matcha Tea </span>
                            </p>
                            <p>
                                <span className="badge badge-light ">Quantity : 5 kgs</span>
                            </p>
                            <img src={verifiedStamp} style={{ height: '200px' }} />
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
}

export default App;
