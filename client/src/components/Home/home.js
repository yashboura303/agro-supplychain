import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
export default function Home() {
    return (
        <div>
            <h2 className="text-center my-4">Home</h2>
            <Link className="nav-link" to="/supplychains">
                <Button variant="secondary">View supply-chains</Button>
            </Link>
            <Link className="nav-link" to="/addSupplyChain">
                <Button variant="secondary">Add supply-chain</Button>
            </Link>
        </div>
    );
}
