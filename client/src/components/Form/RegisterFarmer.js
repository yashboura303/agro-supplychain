import React, { useState } from 'react';
import { Form, Col, Container, Button } from 'react-bootstrap';

export default function RegisterFarmer(props) {
    const [formData, setFormData] = useState({
        farmerName: '',
        farmerID: '',
        farmLocation: '',
        cropType: '',
        quantity: '',
    });
    const handlechange = event => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        setFormData({
            formData: { formData, [fieldName]: fieldVal },
        });
    };
    const submitForm = event => {
        event.preventDefault();
        props.setSupplyChainDetails(
            formData.registrationNo,
            formData.farmerName,
            formData.manufacturerName,
            formData.distributorName,
            formData.retailerName
            // batchNo,
            //     farmerID,
            //     farmerName,
            //     farmLocation,
            //     cropType,
            //     quantity
        );
    };
    return (
        <Container className="mx-auto">
            <h3 className="text-center my-4">Give details for farmer</h3>
            <Form onSubmit={submitForm} className="mx-auto mt-3">
                <Form.Group>
                    <Form.Row>
                        <Form.Label className="font-weight-bold" column lg={2}>
                            Farmer ID
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Registration No"
                                value={formData.farmerID}
                                name="registrationNo"
                                onChange={handlechange}
                            />
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label className="font-weight-bold" column lg={2}>
                            Farmer Name
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Registration No"
                                value={formData.farmerName}
                                name="registrationNo"
                                onChange={handlechange}
                            />
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label className="font-weight-bold" column lg={2}>
                            Farmer Location
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Farmer Name"
                                value={formData.farmLocation}
                                name="farmerName"
                                onChange={handlechange}
                            />
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label className="font-weight-bold" column lg={2}>
                            Crop Type
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Manufacturer Name"
                                value={formData.cropType}
                                name="manufacturerName"
                                onChange={handlechange}
                                // className="w-50"
                            />
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label className="font-weight-bold" column lg={2}>
                            Quantity
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Distributer Name"
                                value={formData.quantity}
                                name="distributorName"
                                onChange={handlechange}
                                // className="w-50"
                            />
                        </Col>
                    </Form.Row>
                    <br />
                </Form.Group>
                <Container className="text-center py-4 w-25">
                    <Button variant="primary" type="submit" block>
                        Submit
                    </Button>
                </Container>
            </Form>
        </Container>
    );
}
