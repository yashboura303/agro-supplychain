import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function SupplychainDetail() {
   return (
      <Container className="w-75">
         <h3 className="mt-4 text-center ">Full overview of the supply chain</h3>
         <Row className="mt-5">
            <Col sm="6" className="border-right border-dark" style={{ fontSize: '20px' }}>
               <p>
                  <span className="badge badge-light ">Farmer ID </span>
               </p>
               <p>
                  <span className="badge badge-light ">Farmer Name </span>
               </p>
               <p>
                  <span className="badge badge-light ">Farmer Location </span>
               </p>
               <p>
                  <span className="badge badge-light ">Crop Type </span>
               </p>
               <p>
                  <span className="badge badge-light ">Quantity </span>
               </p>
            </Col>
            <Col sm="6" className="justify-content-center align-item-center my-auto">
               <h2 className="text-dark">Farmer Details</h2>
            </Col>
         </Row>
         <hr style={{ height: '3px', border: 'none', backgroundColor: '#000' }} />
         <Row className="mt-3">
            <Col sm="6" className="justify-content-center align-item-center my-auto">
               <h2 className="text-dark">Manufacturer Details</h2>
            </Col>
            <Col sm="6" className="border-left border-dark" style={{ fontSize: '20px' }}>
               <p>
                  <span className="badge badge-light ">Farmer ID </span>
               </p>
               <p>
                  <span className="badge badge-light ">Farmer Name </span>
               </p>
               <p>
                  <span className="badge badge-light ">Farmer Location </span>
               </p>
               <p>
                  <span className="badge badge-light ">Crop Type </span>
               </p>
               <p>
                  <span className="badge badge-light ">Quantity </span>
               </p>
            </Col>
         </Row>
         <hr style={{ height: '3px', border: 'none', backgroundColor: '#000' }} />
         <Row className="mt-3">
            <Col sm="6" className="border-right border-dark" style={{ fontSize: '20px' }}>
               <p>
                  <span className="badge badge-light ">Farmer ID </span>
               </p>
               <p>
                  <span className="badge badge-light ">Farmer Name </span>
               </p>
               <p>
                  <span className="badge badge-light ">Farmer Location </span>
               </p>
               <p>
                  <span className="badge badge-light ">Crop Type </span>
               </p>
               <p>
                  <span className="badge badge-light ">Quantity </span>
               </p>
            </Col>
            <Col sm="6" className="justify-content-center align-item-center my-auto">
               <h2 className="text-dark">Distributer Details</h2>
            </Col>
         </Row>
         <hr style={{ height: '3px', border: 'none', backgroundColor: '#000' }} />
         <Row className="mt-3">
            <Col sm="6" className="justify-content-center align-item-center my-auto">
               <h2 className="text-dark">Retailer Details</h2>
            </Col>
            <Col sm="6" className="border-left border-dark" style={{ fontSize: '20px' }}>
               <p>
                  <span className="badge badge-light ">Farmer ID </span>
               </p>
               <p>
                  <span className="badge badge-light ">Farmer Name </span>
               </p>
               <p>
                  <span className="badge badge-light ">Farmer Location </span>
               </p>
               <p>
                  <span className="badge badge-light ">Crop Type </span>
               </p>
               <p>
                  <span className="badge badge-light ">Quantity </span>
               </p>
            </Col>
         </Row>
      </Container>
   );
}
