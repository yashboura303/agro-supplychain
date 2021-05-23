import React, { useState, useContext } from 'react';
import { Form, Col, Container, Button } from 'react-bootstrap';
import { AppContext } from '../../App';
import { useHistory } from 'react-router';
import axios from 'axios';

export default function RegisterDistributer(props) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        distributorName: '',
        distributorID: '',
        cropType: '',
        quantity: '',
    });
    const { setDistributorData, batchNo, getNextAction } = useContext(AppContext);
    const handlechange = event => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        setFormData({ ...formData, [fieldName]: fieldVal });
    };
    const submitForm = event => {
        event.preventDefault();
        axios
            .post(`http://localhost:5000/addData`, { batchNo, data: formData, dataType: 'distributerData' })
            .then(res => {
                console.log('Saved to DB', res.data);
            })
            .catch(err => console.log(err));
        setDistributorData(
            batchNo,
            formData.distributorID,
            formData.distributorName,
            formData.cropType,
            formData.quantity
        );
        getNextAction(batchNo);
    };
    return (
        <Container className="mx-auto">
            <h2 className="text-center my-4">Give details for distributer</h2>
            <Form onSubmit={submitForm} className="mx-auto mt-3">
                <Form.Group>
                    <Form.Row>
                        <Form.Label className="font-weight-bold" column lg={2}>
                            Distributer ID
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Distributor ID"
                                value={formData.distributorID}
                                name="distributorID"
                                onChange={handlechange}
                                // className="w-50"
                            />
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label className="font-weight-bold" column lg={2}>
                            Distributer Name
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Distributer Name"
                                value={formData.distributorName}
                                name="distributorName"
                                onChange={handlechange}
                                // className="w-50"
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
                                placeholder="Crop Type"
                                value={formData.cropType}
                                name="cropType"
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
                                placeholder="Quantity"
                                value={formData.quantity}
                                name="quantity"
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
