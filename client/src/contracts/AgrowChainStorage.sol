pragma solidity ^0.5.0;

import "./AgrowChainStorageOwnable.sol";

contract AgrowChainStorage is AgrowChainStorageOwnable {
    
    address public lastAccess;
    constructor() public {
        authorizedCaller[msg.sender] = 1;
        emit AuthorizedCaller(msg.sender);
    }
    
    /* Events */
    event AuthorizedCaller(address caller);
    event DeAuthorizedCaller(address caller);
    event sBasicDetails(address batchNo);
    event gBasicDetails(string registrationNo,string farmerName,string manufacturerName,string distributorName,string retailerName);
    /* Modifiers */
    
    modifier onlyAuthCaller(){
        lastAccess = msg.sender;
        require(authorizedCaller[msg.sender] == 1);
        _;
    }
    
    /* User Related */
    struct user {
        string name;
        string contactNo;
        bool isActive;
        string profileHash;
    } 
    
    mapping(address => user) userDetails;
    mapping(address => string) userRole;
    
    /* Caller Mapping */
    mapping(address => uint8) authorizedCaller;
    
    /* authorize caller */
    function authorizeCaller(address _caller) public onlyOwner returns(bool) 
    {
        authorizedCaller[_caller] = 1;
        emit AuthorizedCaller(_caller);
        return true;
    }
    
    /* deauthorize caller */
    function deAuthorizeCaller(address _caller) public onlyOwner returns(bool) 
    {
        authorizedCaller[_caller] = 0;
        emit DeAuthorizedCaller(_caller);
        return true;
    }
    
    /*User Roles
        SUPER_ADMIN,
        FARMER,
        MANUFACTURER,
        DISTRIBUTOR,
        RETAILER,
        CONSUMER
        
        
        FARM_INSPECTION,
        HARVESTER,
        EXPORTER,
        IMPORTER,
        PROCESSOR
    */
    
    /* Process Related */
     struct basicDetails {
        string registrationNo;
        string farmerName;
        string manufacturerName;
        string distributorName;
        string retailerName;
        
    }
    
    struct farmer{
        string farmerID;
        string farmerName;
        string farmLocation;
        string cropType;
        string quantity;
    }

    struct manufacturer{
        string manufacturerID;
        string cropType;
        string quantity;

    }

    struct distributor{
        string distributorID;
        string cropType;
        string quantity;

    }


    struct retailer{
        string retailerID;
        string cropType;
        string quantity;

    }
    
    
    
    mapping (address => basicDetails) batchBasicDetails;    
    mapping (address => farmer) batchFarmer;
    mapping (address => manufacturer) batchManufacturer;
    mapping (address => distributor) batchDistributor;
    mapping (address => retailer) batchRetailer;
    
   
    mapping (address => string) nextAction;
    
    /*Initialize struct pointer*/
    user userDetail;
    basicDetails basicDetailsData;
    
    farmer farmerData;
    manufacturer manufacturerData;
    distributor distributorData;
    retailer retailerData;
    
    
    
    
    
    /* Get User Role */
    function getUserRole(address _userAddress) public onlyAuthCaller  returns(string memory)
    {
        return userRole[_userAddress];
    }
    
    /* Get Next Action  */    
    function getNextAction(address _batchNo) public onlyAuthCaller  returns(string memory)
    {
        return nextAction[_batchNo];
    }
        
    /*set user details*/
    function setUser(address _userAddress,
                     string memory _name, 
                     string memory _contactNo, 
                     string memory _role, 
                     bool _isActive,
                     string memory _profileHash) public onlyAuthCaller returns(bool){
        
        /*store data into struct*/
        userDetail.name = _name;
        userDetail.contactNo = _contactNo;
        userDetail.isActive = _isActive;
        userDetail.profileHash = _profileHash;
        
        /*store data into mapping*/
        userDetails[_userAddress] = userDetail;
        userRole[_userAddress] = _role;
        
        return true;
    }  
    
    /*get user details*/
    function getUser(address _userAddress) public onlyAuthCaller  returns(string memory name, 
                                                                    string memory contactNo, 
                                                                    string memory role,
                                                                    bool isActive, 
                                                                    string memory profileHash
                                                                ){

        /*Getting value from struct*/
        user memory tmpData = userDetails[_userAddress];
        
        return (tmpData.name, tmpData.contactNo, userRole[_userAddress], tmpData.isActive, tmpData.profileHash);
    }
    
 /*get batch basicDetails*/
    function getBasicDetails(address _batchNo) public  onlyAuthCaller  returns(string memory registrationNo,
                            string memory farmerName,
                            string memory manufacturerName,
                            string memory distributorName,
                            string memory retailerName) {
        
        basicDetails memory tmpData = batchBasicDetails[_batchNo];
        

        emit gBasicDetails(
                tmpData.registrationNo,
                tmpData.farmerName,
                tmpData.manufacturerName,
                tmpData.distributorName,
                tmpData.retailerName);

        return (tmpData.registrationNo,
                tmpData.farmerName,
                tmpData.manufacturerName,
                tmpData.distributorName,
                tmpData.retailerName);
    }
    
    /*set batch basicDetails*/
    function setBasicDetails(string memory _registrationNo,
                            string memory _farmerName,
                            string memory _manufacturerName,
                            string memory _distributorName,
                            string memory _retailerName
                             
                            ) public onlyAuthCaller returns(address) {
        
        uint tmpData = uint(keccak256(abi.encodePacked(msg.sender, now)));
        address batchNo = address(tmpData);
        
        basicDetailsData.registrationNo = _registrationNo;
        basicDetailsData.farmerName = _farmerName;
        basicDetailsData.manufacturerName = _manufacturerName;
        basicDetailsData.distributorName = _distributorName;
        basicDetailsData.retailerName = _retailerName;
        
        
        
        batchBasicDetails[batchNo] = basicDetailsData;
        
        nextAction[batchNo] = 'FARMER';   
        
        
        emit sBasicDetails(batchNo);
        
        return batchNo;
    }
    
    
     /*set farmer data*/
    function setFarmerData(address batchNo,string memory _farmerID,string memory _farmerName,string memory _farmLocation, string memory _cropType, string memory _quantity) public onlyAuthCaller returns(bool){
        
        farmerData.farmerID = _farmerID;
        farmerData.farmerName = _farmerName;
        farmerData.farmLocation = _farmLocation;
        farmerData.cropType = _cropType;
        farmerData.quantity = _quantity;
        
        batchFarmer[batchNo] = farmerData;
        
        nextAction[batchNo] = 'MANUFACTURER'; 
        
        return true;
    }


    /*get farmer data*/
    function getFarmerData(address batchNo) public onlyAuthCaller  returns (string memory farmerID,string memory farmerName,string memory farmLocation,string memory cropType, string memory quantity){
        
        farmer memory tmpData = batchFarmer[batchNo];
        return (tmpData.farmerID,tmpData.farmerName,tmpData.farmLocation, tmpData.cropType, tmpData.quantity);
    }


    /*set Manufacturer data*/
    function setManufacturerData(address batchNo,string memory _manufacturerID,string memory _cropType, string memory _quantity) public onlyAuthCaller returns(bool){
        
        manufacturerData.manufacturerID = _manufacturerID;
        manufacturerData.cropType = _cropType;
        manufacturerData.quantity = _quantity;

        batchManufacturer[batchNo] = manufacturerData;
        
        nextAction[batchNo] = 'DISTRIBUTOR'; 
        
        return true;
    }


    /*get manufacturer data*/
    function getManufacturerData(address batchNo) public onlyAuthCaller  returns (string memory manufacturerID, string memory cropType, string memory quantity){
        
        manufacturer memory tmpData = batchManufacturer[batchNo];
        return (tmpData.manufacturerID, tmpData.cropType, tmpData.quantity);
    }


    /*set distributor data*/
    function setDistributorData(address batchNo,string memory _distributorID,string memory _cropType, string memory _quantity) public onlyAuthCaller returns(bool){
        
        distributorData.distributorID = _distributorID;
        distributorData.cropType = _cropType;
        distributorData.quantity = _quantity;
        
        batchDistributor[batchNo] = distributorData;
        
        nextAction[batchNo] = 'RETAILER'; 
        
        return true;
    }


    /*get distributor data*/
    function getDistributorData(address batchNo) public onlyAuthCaller  returns (string memory distributorID, string memory cropType, string memory quantity){
        
        distributor memory tmpData = batchDistributor[batchNo];
        return (tmpData.distributorID, tmpData.cropType, tmpData.quantity);
    }

    /*set retailer data*/
    function setRetailerData(address batchNo,string memory _retailerID,string memory _cropType, string memory _quantity) public onlyAuthCaller returns(bool){
        
        retailerData.retailerID = _retailerID;
        retailerData.cropType = _cropType;
        retailerData.quantity = _quantity;
        
        batchRetailer[batchNo] = retailerData;
        
        nextAction[batchNo] = 'CUSTOMER'; 
        
        return true;
    }


    /*get retailer data*/
    function getRetailerData(address batchNo) public onlyAuthCaller  returns (string memory retailerID, string memory cropType, string memory quantity){
        
        retailer memory tmpData = batchRetailer[batchNo];
        return (tmpData.retailerID, tmpData.cropType, tmpData.quantity);
    }
    
   
  
}    
