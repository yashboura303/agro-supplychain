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
        <div className="supplyChainList">
            <h2 className="text-center mt-4">Supply Chain List</h2>
            <ol className="my-4 ">
                {supplyChains.map(supplyChain => (
                    <li key={supplyChain.batchNo}>
                        <p>
                            <Link
                                className="nav-link d-inline text-dark font-weight-bold"
                                to={`supplychain/${supplyChain.batchNo}`}
                            >
                                {supplyChain.batchNo}
                            </Link>
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
}
