import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SupplyChain from '../components/SupplyChain/Supplychain';
import SupplyChainList from '../components/SupplyChainList/SupplyChainList';
import ManageSupplyChain from '../components/ManageSupplyChains';
import EditSupplyChains from '../components/EditSupplyChains';
import EditSupplyChain from '../components/EditSupplyChains/supplyChain';
import Home from '../components/Home/home';
import ChainRegisterForm from '../components/Form/ChainRegisterForm';
export default function index() {
    return (
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/supplychains" exact>
                <SupplyChainList />
            </Route>
            <Route path="/supplychain/:batchNo" exact>
                <SupplyChain />
            </Route>
            <Route path="/addSupplyChain" exact>
                <ChainRegisterForm />
            </Route>
            <Route path="/manageSupplyChain" exact>
                <ManageSupplyChain />
            </Route>
            <Route path="/editSupplyChain" exact>
                <EditSupplyChains />
            </Route>
            <Route path="/editSupplyChain/:batchNo" exact>
                <EditSupplyChain />
            </Route>
            <Redirect to="/"></Redirect>
        </Switch>
    );
}
