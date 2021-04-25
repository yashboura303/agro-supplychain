import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
export default function Supplychain(props) {
    const { batchNo } = useParams();
    // const [details, setDetails] = useState();
    const getDetails = () => {
        props.getSupplyChainDetails(batchNo);
    };
    // useEffect(() => {
    //     getDetails();
    //     console.log('first render');
    //     console.log(props);
    // }, []);
    return (
        <Container fluid className="text-center">
            <h3 className="text-center my-4">
                SupplyChain with Batch No as {batchNo}
            </h3>
            <Button
                variant="success"
                onClick={() => {
                    props.getSupplyChainDetails(batchNo);
                    console.log(props.getNextAction(batchNo));
                }}
            >
                Click to view details
            </Button>
            {props.details && (
                <div className="text-capitalize my-5">
                    <p>
                        {' '}
                        <span className="font-weight-bold">
                            Registration No :
                        </span>{' '}
                        {props.details.registrationNo}
                        <hr />
                    </p>
                    <p>
                        {' '}
                        <span className="font-weight-bold">
                            Farmer Name :
                        </span>{' '}
                        {props.details.farmerName}
                    </p>
                    <hr />
                    <p>
                        {' '}
                        <span className="font-weight-bold">
                            Manufacturer Name :
                        </span>{' '}
                        {props.details.manufacturerName}
                    </p>
                    <hr />
                    <p>
                        {' '}
                        <span className="font-weight-bold">
                            Retailer Name :
                        </span>{' '}
                        {props.details.retailerName}
                    </p>
                    <hr />
                </div>
            )}
        </Container>
    );
}
