import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
export default function Index(props) {
    const [supplyChains, setSupplyChain] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000`).then(res => {
            const data = res.data;
            setSupplyChain(data.result);
        });
    }, []);
    return (
        <Container className="mt-5" fluid>
            <Table striped hover>
                <thead>
                    <tr className="bg-dark text-white">
                        <th>BatchNo </th>
                        <th>Farmer </th>
                        <th>Manufacturer </th>
                        <th>Distributer </th>
                        <th>Retailer </th>
                    </tr>
                </thead>
                <tbody>
                    {supplyChains.map(supplyChain => (
                        <tr key={supplyChain.batchNo}>
                            <td>
                                <Link
                                    className="nav-link d-inline text-dark font-weight-bold"
                                    to={`editSupplyChain/${supplyChain.batchNo}`}
                                >
                                    {supplyChain.batchNo}
                                </Link>
                            </td>
                            <th>Completed </th>
                            <th>Completed </th>
                            <th>Completed </th>
                            <th>Completed </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
