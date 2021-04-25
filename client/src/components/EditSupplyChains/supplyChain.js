import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { extractForm } from '../../utils/formUtils';
import { AppContext } from '../../App';
const SupplyChain = () => {
    const { batchNo } = useParams();
    const { nextAction, getNextAction } = useContext(AppContext);
    return (
        <div>
            <h4 className="text-center my-4 font-weight-bold">
                Supply Chain:- {batchNo}
            </h4>
            {!nextAction && (
                <>
                    <Container className="text-center mx-auto">
                        <Button
                            variant="primary"
                            onClick={() => {
                                getNextAction(batchNo);
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

            {nextAction && (
                <h1 className="text-center my-4 text-warning">
                    Current entity is {nextAction}
                </h1>
            )}
            {nextAction && extractForm(nextAction)}
        </div>
    );
};

export default SupplyChain;
