import ChainRegisterForm from './components/Form/ChainRegisterForm';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AgrowChainStorage from '../src/abis/AgrowChainStorage.json';
import Web3 from 'web3';
import axios from 'axios';

import Home from './components/Home/home';
import MainNavbar from './components/Navbar/MainNavbar';
import SupplyChain from './components/SupplyChain/Supplychain';
import SupplyChainList from './components/SupplyChainList/SupplyChainList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            agrowChainStorage: {},
            loading: true,
            batchNo: '',
            registrationNo: '',
            farmerName: '',
            manufacturerName: '',
            distributorName: '',
            wholesalerName: '',
            retailerName: '',
            details: {},
        };
    }

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadBlockchainData() {
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        console.log(this.state.account);

        const ethBalance = await web3.eth.getBalance(this.state.account);
        this.setState({ ethBalance });

        const networkId = await web3.eth.net.getId();

        const agrowChainStorageData = AgrowChainStorage.networks[networkId];

        if (agrowChainStorageData) {
            const agrowChainStorage = new web3.eth.Contract(
                AgrowChainStorage.abi,
                agrowChainStorageData.address
            );
            this.setState({ agrowChainStorage });
            console.log({ agrowChainStorage });
        } else {
            window.alert(
                'AgrowChainStorage contract not deployed to the given network.'
            );
        }
        this.setState({ loading: false });
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                'Non-ethereum browser detected. Try Metamask instead.'
            );
        }
    }

    setSupplyChainDetails = (
        registrationNo,
        farmerName,
        manufacturerName,
        distributorName,
        wholesalerName,
        retailerName
    ) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .setBasicDetails(
                registrationNo,
                farmerName,
                manufacturerName,
                distributorName,
                wholesalerName,
                retailerName
            )
            .send({
                from: this.state.account,
            })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt);
                const batchNo =
                    receipt.events.sBasicDetails.returnValues.batchNo;
                this.setState({ batchNo: batchNo });
                console.log(this.state.batchNo);
                axios
                    .post(`http://localhost:5000/register`, { batchNo })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => console.log(err));
            });
    };

    getSupplyChainDetails = batchNo => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .getBasicDetails(batchNo)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt);
                const registrationNo =
                    receipt.events.gBasicDetails.returnValues.registrationNo;
                const farmerName =
                    receipt.events.gBasicDetails.returnValues.farmerName;
                const manufacturerName =
                    receipt.events.gBasicDetails.returnValues.manufacturerName;
                const distributorName =
                    receipt.events.gBasicDetails.returnValues.distributorName;
                const wholesalerName =
                    receipt.events.gBasicDetails.returnValues.wholesalerName;
                const retailerName =
                    receipt.events.gBasicDetails.returnValues.retailerName;
                this.setState({
                    registrationNo: registrationNo,
                    farmerName: farmerName,
                    manufacturerName: manufacturerName,
                    distributorName: distributorName,
                    wholesalerName: wholesalerName,
                    retailerName: retailerName,
                });
                const details = {
                    registrationNo: registrationNo,
                    farmerName: farmerName,
                    manufacturerName: manufacturerName,
                    distributorName: distributorName,
                    wholesalerName: wholesalerName,
                    retailerName: retailerName,
                };
                this.setState({ details });
            });
    };

    routing = props => {
        return (
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/supplychains" exact>
                    <SupplyChainList />
                </Route>
                <Route path="/supplychain/:batchNo" exact>
                    <SupplyChain
                        details={this.state.details}
                        getSupplyChainDetails={this.getSupplyChainDetails}
                    />
                </Route>
                <Route path="/addSupplyChain" exact>
                    <ChainRegisterForm
                        setSupplyChainDetails={this.setSupplyChainDetails}
                    />
                </Route>

                <Redirect to="/"></Redirect>
            </Switch>
        );
    };

    render() {
        let content;
        if (this.state.loading) {
            content = (
                <BrowserRouter>
                    <MainNavbar />
                    <p id="loader" className="text-center">
                        Loading..
                    </p>
                </BrowserRouter>
            );
        } else {
            content = (
                <BrowserRouter>
                    <MainNavbar />
                    {this.routing(this.props)}
                </BrowserRouter>
            );
        }
        return <div>{content}</div>;
    }
}

export default App;
