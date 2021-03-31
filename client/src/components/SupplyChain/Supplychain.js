import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        <div>
            <h3 className="text-center my-4">
                SupplyChain with Batch No as {batchNo}
            </h3>
            <button
                onClick={() => {
                    props.getSupplyChainDetails(batchNo);
                }}
            >
                Click
            </button>
            {props.details && (
                <p className="text-capitalize">
                    {props.details.registrationNo} || {props.details.farmerName}{' '}
                    ||
                    {props.details.manufacturerName} ||{' '}
                    {props.details.distributorName} ||
                    {props.details.wholesalerName} ||{' '}
                    {props.details.retailerName}
                </p>
            )}
        </div>
    );
}
