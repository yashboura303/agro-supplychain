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
import ManageSupplyChain from './components/ManageSupplyChains';
import EditSupplyChain from './components/EditSupplyChains';

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
        retailerName
    ) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .setBasicDetails(
                registrationNo,
                farmerName,
                manufacturerName,
                distributorName,
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
                const retailerName =
                    receipt.events.gBasicDetails.returnValues.retailerName;
                this.setState({
                    registrationNo: registrationNo,
                    farmerName: farmerName,
                    manufacturerName: manufacturerName,
                    distributorName: distributorName,
                    retailerName: retailerName,
                });
                const details = {
                    registrationNo: registrationNo,
                    farmerName: farmerName,
                    manufacturerName: manufacturerName,
                    distributorName: distributorName,
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
                        getNextAction={this.getNextAction}
                    />
                </Route>
                <Route path="/addSupplyChain" exact>
                    <ChainRegisterForm
                        setSupplyChainDetails={this.setSupplyChainDetails}
                    />
                </Route>
                <Route path="/manageSupplyChain" exact>
                    <ManageSupplyChain />
                </Route>
                <Route path="/editSupplyChain" exact>
                    <EditSupplyChain />
                </Route>
                <Redirect to="/"></Redirect>
            </Switch>
        );
    };

    getNextAction = batchNo => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .getNextAction(batchNo)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt)
                console.log(receipt.events.nextaction.returnValues.tmpData)
            });
    };    
    
    
    setFarmerData = (batchNo,farmerID,farmerName,farmLocation,cropType,quantity) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .setFarmerData(batchNo,farmerID,farmerName,farmLocation,cropType,quantity)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt)
            });
    };

    getFarmerData = (batchNo) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .getFarmerData(batchNo)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt)
            });
    };

    setManufacturerData = (batchNo,manufacturerID,manufacturerName,factoryLocation,cropType,quantity) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .setManufacturerData(batchNo,manufacturerID,manufacturerName,factoryLocation,cropType,quantity)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt)
            });
    };

    getManufacturerData = (batchNo) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .getManufacturerData(batchNo)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt)
            });
    };

    setDistributorData = (batchNo,distributorID,distributorName,cropType,quantity) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .setDistributorData(batchNo,distributorID,distributorName,cropType,quantity)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt)
            });
    };

    getDistributorData = (batchNo) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .getDistributorData(batchNo)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt)
            });
    };

    setRetailerData = (batchNo,retailerID,retailerName,storeLocation,cropType,quantity) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .setRetailerData(batchNo,retailerID,retailerName,storeLocation,cropType,quantity)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt)
            });
    };

    getRetailerData = (batchNo) => {
        this.setState({ loading: true });
        this.state.agrowChainStorage.methods
            .getRetailerData(batchNo)
            .send({ from: this.state.account })
            .on('receipt', receipt => {
                this.setState({ loading: false });
                console.log(receipt)
            });
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
