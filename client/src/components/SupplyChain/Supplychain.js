import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { AppContext } from '../../App';

export default function Supplychain() {
    const { getSupplyChainDetails, details } = useContext(AppContext);
    const { batchNo } = useParams();
    return (
        <Container fluid className="text-center">
            <h3 className="text-center my-4">
                SupplyChain with Batch No as {batchNo}
            </h3>
            <Button
                variant="success"
                onClick={() => {
                    getSupplyChainDetails(batchNo);
                }}
            >
                Click to view details
            </Button>
            {details[batchNo] && (
                <div className="text-capitalize my-5">
                    <p>
                        {' '}
                        <span className="font-weight-bold">
                            Registration No :
                        </span>{' '}
                        {details[batchNo].registrationNo}
                    </p>
                    <hr />
                    <p>
                        {' '}
                        <span className="font-weight-bold">
                            Farmer Name :
                        </span>{' '}
                        {details[batchNo].farmerName}
                    </p>
                    <hr />
                    <p>
                        {' '}
                        <span className="font-weight-bold">
                            Manufacturer Name :
                        </span>{' '}
                        {details[batchNo].manufacturerName}
                    </p>
                    <hr />
                    <p>
                        {' '}
                        <span className="font-weight-bold">
                            Retailer Name :
                        </span>{' '}
                        {details[batchNo].retailerName}
                    </p>
                    <hr />
                </div>
            )}
        </Container>
    );
}
