import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SupplyChainList(props) {
    const [supplyChains, setSupplyChain] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000`).then(res => {
            const data = res.data;
            setSupplyChain(data.result);
        });
    }, []);
    return (
        <div>
            <h2 className="text-center">Supply Chain List</h2>
            <ul className="my-4">
                {supplyChains.map(supplyChain => (
                    <li key={supplyChain.batchNo}>
                        <Link
                            className="nav-link"
                            to={`supplychain/${supplyChain.batchNo}`}
                        >
                            {supplyChain.batchNo}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
