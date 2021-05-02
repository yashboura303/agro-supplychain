import React, { useState, useContext } from 'react';
import { Form, Col, Container, Button } from 'react-bootstrap';
import { AppContext } from '../../App';
import { useHistory } from 'react-router';

export default function RegisterManufac(props) {
   const history = useHistory();
   const [formData, setFormData] = useState({
      farmerName: '',
      farmerID: '',
      farmLocation: '',
      cropType: '',
      quantity: '',
   });
   const { setManufacturerData, batchNo, getNextAction } = useContext(AppContext);
   const handlechange = event => {
      let fieldName = event.target.name;
      let fieldVal = event.target.value;
      setFormData({ ...formData, [fieldName]: fieldVal });
   };
   const submitForm = event => {
      event.preventDefault();
      setManufacturerData(
         batchNo,
         formData.farmerID,
         formData.farmerName,
         formData.farmLocation,
         formData.cropType,
         formData.quantity
      );
      getNextAction(batchNo);
   };
   return (
      <Container className="mx-auto">
         <h2 className="text-center my-4">Give details for Manufacturer</h2>
         <Form onSubmit={submitForm} className="mx-auto mt-3">
            <Form.Group>
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
                        // className="w-50"
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
