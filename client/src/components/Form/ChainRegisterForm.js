import React, { Component } from 'react';
import { Form, Col, Container, Button } from 'react-bootstrap';
import AgrowChainStorage from '../../../src/abis/AgrowChainStorage.json';
import Web3 from 'web3';
/*import axios from 'axios';*/

class ChainRegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                registrationNo: '',
                farmerName: '',
                manufacturerName: '',
                distributorName: '',
                retailerName: '',
            },
        };
    }

    handlechange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        this.setState({
            ...this.state,
            formData: { ...this.state.formData, [fieldName]: fieldVal },
        });
    }
    submitForm = event => {
        event.preventDefault();
        this.props.setSupplyChainDetails(
            this.state.formData.registrationNo,
            this.state.formData.farmerName,
            this.state.formData.manufacturerName,
            this.state.formData.distributorName,
            this.state.formData.wholesalerName,
            this.state.formData.retailerName
        );
    };

    render() {
        return (
            <Container className="mx-auto">
                <h2 className="text-center my-4">Register Supply Chain</h2>
                <Form
                    onSubmit={this.submitForm.bind(this)}
                    className="mx-auto mt-3"
                >
                    <Form.Group>
                        <Form.Row>
                            <Form.Label
                                className="font-weight-bold"
                                column
                                lg={2}
                            >
                                Registration No
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Registration No"
                                    value={this.state.registrationNo}
                                    name="registrationNo"
                                    onChange={this.handlechange.bind(this)}
                                    // className="w-50"
                                />
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label
                                className="font-weight-bold"
                                column
                                lg={2}
                            >
                                Farmer Name
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Farmer Name"
                                    value={this.state.farmerName}
                                    name="farmerName"
                                    onChange={this.handlechange.bind(this)}
                                    // className="w-50"
                                />
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label
                                className="font-weight-bold"
                                column
                                lg={2}
                            >
                                Manufacturer Name
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Manufacturer Name"
                                    value={this.state.manufacturerName}
                                    name="manufacturerName"
                                    onChange={this.handlechange.bind(this)}
                                    // className="w-50"
                                />
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label
                                className="font-weight-bold"
                                column
                                lg={2}
                            >
                                Distributer Name
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Distributer Name"
                                    value={this.state.distributorName}
                                    name="distributorName"
                                    onChange={this.handlechange.bind(this)}
                                    // className="w-50"
                                />
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label
                                className="font-weight-bold"
                                column
                                lg={2}
                            >
                                Retailer Name
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Retailer Name"
                                    value={this.state.retailerName}
                                    name="retailerName"
                                    onChange={this.handlechange.bind(this)}
                                    // className="w-50"
                                />
                            </Col>
                        </Form.Row>
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
}

export default ChainRegisterForm;
