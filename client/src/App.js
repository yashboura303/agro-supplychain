import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AgrowChainStorage from '../src/abis/AgrowChainStorage.json';
import Web3 from 'web3';
import axios from 'axios';

import MainNavbar from './components/Navbar/MainNavbar';
import UILoader from './components/ui-loader/index';
import routing from '../src/routes';

import { Spinner } from 'reactstrap';

export const AppContext = createContext();
export default function App() {
   const [details, setdetails] = useState({});
   const [modalIsOpen, setIsOpen] = useState(false);
   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
   }
   const [farmerData, setfarmerDataState] = useState({});
   const [manufacturerData, setmanufacturerDataState] = useState({});
   const [distributerData, setdistributerDataState] = useState({});
   const [retailerData, setretailerDataState] = useState({});
   const [account, setaccount] = useState('');
   const [batchNo, setbatchNo] = useState();
   const [loading, setloading] = useState(true);
   // const [ethBalance, setethBalance] = useState();
   const [agrowChainStorage, setagrowChainStorage] = useState({});
   const [nextAction, setnextAction] = useState({});

   useEffect(() => {
      async function loadWeb3() {
         if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
         } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
         } else {
            window.alert('Non-ethereum browser detected. Try Metamask instead.');
         }
      }
      async function loadBlockchainData() {
         const web3 = window.web3;

         const accounts = await web3.eth.getAccounts();
         setaccount(accounts[0]);
         console.log('accounts', accounts[0]);

         // const ethBalance = await web3.eth.getBalance(account);
         // setethBalance(ethBalance);

         const networkId = await web3.eth.net.getId();

         const agrowChainStorageData = AgrowChainStorage.networks[networkId];

         if (agrowChainStorageData) {
            const agrowChainStorage = new web3.eth.Contract(AgrowChainStorage.abi, agrowChainStorageData.address);
            setagrowChainStorage(agrowChainStorage);
         } else {
            window.alert('AgrowChainStorage contract not deployed to the given network.');
         }
         setloading(false);
      }
      loadWeb3();
      loadBlockchainData();
   }, []);

   const setSupplyChainDetails = (registrationNo, farmerName, manufacturerName, distributorName, retailerName) => {
      setloading(true);
      agrowChainStorage.methods
         .setBasicDetails(registrationNo, farmerName, manufacturerName, distributorName, retailerName)
         .send({
            from: account,
         })
         .on('receipt', receipt => {
            setloading(false);
            const batchNo = receipt.events.sBasicDetails.returnValues.batchNo;
            setbatchNo(batchNo);
            axios
               .post(`http://localhost:5000/register`, { batchNo })
               .then(res => {
                  console.log('Saved to DB', res.data);
               })
               .catch(err => console.log(err));
         });
   };

   const getSupplyChainDetails = batchNo => {
      setloading(true);
      agrowChainStorage.methods
         .getBasicDetails(batchNo)
         .send({ from: account })
         .on('receipt', receipt => {
            setloading(false);
            console.log(receipt);
            const registrationNo = receipt.events.gBasicDetails.returnValues.registrationNo;
            const farmerName = receipt.events.gBasicDetails.returnValues.farmerName;
            const manufacturerName = receipt.events.gBasicDetails.returnValues.manufacturerName;
            const distributorName = receipt.events.gBasicDetails.returnValues.distributorName;
            const retailerName = receipt.events.gBasicDetails.returnValues.retailerName;
            const detailsObject = {
               registrationNo,
               farmerName,
               manufacturerName,
               distributorName,
               retailerName,
            };
            // setdetails(details);
            console.log(batchNo, detailsObject);
            setdetails({
               ...details,
               [batchNo]: detailsObject,
            });
         });
   };

   const getNextAction = batchNo => {
      setloading(true);
      agrowChainStorage.methods
         .getNextAction(batchNo)
         .send({ from: account })
         .on('receipt', receipt => {
            setloading(false);

            setnextAction({ ...nextAction, [batchNo]: receipt.events.nextaction.returnValues.tmpData });
         });
   };

   const setFarmerData = (batchNo, farmerID, farmerName, farmLocation, cropType, quantity) => {
      setloading(true);
      agrowChainStorage.methods
         .setFarmerData(batchNo, farmerID, farmerName, farmLocation, cropType, quantity)
         .send({ from: account })
         .on('receipt', receipt => {
            setloading(false);
            console.log(receipt);
         });
   };

   const getFarmerData = batchNo => {
      setloading(true);
      agrowChainStorage.methods
         .getFarmerData(batchNo)
         .send({ from: account })
         .on('receipt', receipt => {
            console.log(receipt);
            setloading(false);
            const farmerID = receipt.events.farmerdata.returnValues.farmerID;
            const farmerName = receipt.events.farmerdata.returnValues.farmerName;
            const farmLocation = receipt.events.farmerdata.returnValues.farmLocation;
            const cropType = receipt.events.farmerdata.returnValues.cropType;
            const quantity = receipt.events.farmerdata.returnValues.quantity;
            const detailsObject = {
               farmerID,
               farmerName,
               farmLocation,
               cropType,
               quantity,
            };
            setfarmerDataState({
               ...farmerData,
               [batchNo]: detailsObject,
            });
         });
   };

   const setManufacturerData = (batchNo, manufacturerID, manufacturerName, factoryLocation, cropType, quantity) => {
      setloading(true);
      agrowChainStorage.methods
         .setManufacturerData(batchNo, manufacturerID, manufacturerName, factoryLocation, cropType, quantity)
         .send({ from: account })
         .on('receipt', receipt => {
            setloading(false);
            console.log(receipt);
         });
   };

   const getManufacturerData = batchNo => {
      setloading(true);
      agrowChainStorage.methods
         .getManufacturerData(batchNo)
         .send({ from: account })
         .on('receipt', receipt => {
            setloading(false);
            const manufacturerID = receipt.events.manufacturerdata.returnValues.manufacturerID;
            const manufacturerName = receipt.events.manufacturerdata.returnValues.manufacturerName;
            const factoryLocation = receipt.events.manufacturerdata.returnValues.factoryLocation;
            const cropType = receipt.events.manufacturerdata.returnValues.cropType;
            const quantity = receipt.events.manufacturerdata.returnValues.quantity;
            const detailsObject = {
               manufacturerID,
               manufacturerName,
               factoryLocation,
               cropType,
               quantity,
            };
            setmanufacturerDataState({
               ...manufacturerData,
               [batchNo]: detailsObject,
            });
         });
   };

   const setDistributorData = (batchNo, distributorID, distributorName, cropType, quantity) => {
      setloading(true);
      agrowChainStorage.methods
         .setDistributorData(batchNo, distributorID, distributorName, cropType, quantity)
         .send({ from: account })
         .on('receipt', receipt => {
            setloading(false);
         });
   };

   const getDistributorData = batchNo => {
      setloading(true);
      agrowChainStorage.methods
         .getDistributorData(batchNo)
         .send({ from: account })
         .on('receipt', receipt => {
            setloading(false);
            const distributorID = receipt.events.distributordata.returnValues.distributorID;
            const distributorName = receipt.events.distributordata.returnValues.distributorName;
            const cropType = receipt.events.distributordata.returnValues.cropType;
            const quantity = receipt.events.manufacturerdata.returnValues.quantity;
            const detailsObject = {
               distributorID,
               distributorName,
               cropType,
               quantity,
            };
            setdistributerDataState({
               ...distributerData,
               [batchNo]: detailsObject,
            });
         });
   };

   const setRetailerData = (batchNo, retailerID, retailerName, storeLocation, cropType, quantity) => {
      setloading(true);
      agrowChainStorage.methods
         .setRetailerData(batchNo, retailerID, retailerName, storeLocation, cropType, quantity)
         .send({ from: account })
         .on('receipt', receipt => {
            setloading(false);
         });
   };

   const getRetailerData = batchNo => {
      setloading(true);
      agrowChainStorage.methods
         .getRetailerData(batchNo)
         .send({ from: account })
         .on('receipt', receipt => {
            setloading(false);
            const retailerID = receipt.events.distributordata.returnValues.retailerID;
            const retailerName = receipt.events.distributordata.returnValues.retailerName;
            const storeLocation = receipt.events.distributordata.returnValues.storeLocation;
            const cropType = receipt.events.distributordata.returnValues.cropType;
            const quantity = receipt.events.manufacturerdata.returnValues.quantity;
            const detailsObject = {
               retailerID,
               retailerName,
               storeLocation,
               cropType,
               quantity,
            };
            setretailerDataState({
               ...retailerData,
               [batchNo]: detailsObject,
            });
            // });
         });
   };

   const Loader = () => {
      return (
         <>
            <Spinner />
         </>
      );
   };
   return (
      <BrowserRouter>
         <AppContext.Provider
            value={{
               details,
               getNextAction,
               nextAction,
               setFarmerData,
               setSupplyChainDetails,
               getSupplyChainDetails,
               batchNo,
               setbatchNo,
               setManufacturerData,
               getFarmerData,
               farmerData,
               getManufacturerData,
               getRetailerData,
               getDistributorData,
               setRetailerData,
               setDistributorData,
               modalIsOpen,
               openModal,
               closeModal,
            }}
         >
            <UILoader blocking={loading} loader={<Loader />}>
               <MainNavbar />
               {routing()}
            </UILoader>
         </AppContext.Provider>
      </BrowserRouter>
   );
}
UILoader.defaultProps = {
   tag: 'div',
   blocking: false,
   loader: <Spinner color="primary" />,
};
