import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { extractForm } from '../../utils/formUtils';
const SupplyChain = props => {
    const { batchNo } = useParams();
    return (
        <div>
            <h4 className="text-center my-4 font-weight-bold">
                Supply Chain:- {batchNo}
            </h4>
            {!props.nextAction && (
                <>
                    <Container className="text-center mx-auto">
                        <Button
                            variant="primary"
                            onClick={() => {
                                props.getNextAction(batchNo);
                            }}
                        >
                            CLick
                        </Button>
                        <p className="mt-3">
                            Click to view current entity in this chain
                        </p>
                    </Container>
                </>
            )}

            {props.nextAction && (
                <h1 className="text-center my-4 text-warning">
                    Current entity is {props.nextAction}
                </h1>
            )}
            {props.nextAction && extractForm(props.nextAction)}
        </div>
    );
};

export default SupplyChain;
