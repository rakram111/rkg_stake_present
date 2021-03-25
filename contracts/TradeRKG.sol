pragma solidity 0.5.4; 
import "./RKG.sol";  // TA2EDEgytsPYu27kkZtDpFBz85as8vPqsX 

contract TradeRKG{
    
    RKG public rkg;  
    address payable public owner ;
     
    constructor(RKG _rkg, address payable _owner) public {
        rkg = _rkg;
        owner = _owner;
    }

    struct User{
        address payable upline;
        address super_upline;
        uint256 super_business;
        uint256 total_buy;
        bool isSuper;
    }

    mapping(address => User) public users ;
  
    function() payable external { 
     
    } 

    uint256 public buyPrice = 500000;
    uint256 public sellPrice = 500000; 

    bool public buyMode = true;
    bool public sellMode = false;
    
    event BuySuccessful(address indexed from_, address indexed to_, uint256 amount_); 
    event SellSuccessful(address indexed from_, address indexed to_, uint256 amount_); 
    event SellFailed(address indexed from_, address indexed to_, uint256 amount_);   
 
    function buy(address payable _upline, uint256 _rkg_amount) public payable {
        
        require(rkg.balanceOf(address(this)) >= _rkg_amount, "Trade RKG: Buy Outflow");
        require(buyMode == true, "Trade RKG: Buy Mode is OFF");

        uint256 trxValue = _rkg_amount*buyPrice;
        require(msg.value == trxValue, "Trade RKG: Imbalance");
        
        if(_upline == address(0)){
            _upline = owner;
        }  

             users[msg.sender].upline = _upline;
        
        
         if(users[_upline].isSuper == true){                     // check if upline is super
            users[msg.sender].super_upline = _upline ;           // assign present up as superup
        } else {
            users[msg.sender].super_upline = users[_upline].super_upline ; // assign up's superup as superup
        }

        users[users[msg.sender].super_upline].super_business += _rkg_amount ; 
        users[msg.sender].total_buy += _rkg_amount;
        rkg.transfer(msg.sender, _rkg_amount*1000000);
        _upline.transfer(trxValue*3/100);
        owner.transfer(trxValue*97/100);

        emit BuySuccessful(address(this), msg.sender, _rkg_amount);
    }

    function sell(address to_, uint256 _rkg_amount) public {
        
        require(_rkg_amount >=  rkg.balanceOf(address(this)), "Trade RKG: Sell Outflow");
        require(sellMode == true, "Trade RKG: Sell Mode is OFF");

        address from_ = msg.sender;
 
        if(_rkg_amount > rkg.allowance(from_, address(this))) {
            emit SellFailed(from_, to_, _rkg_amount);
            revert();
        }

        rkg.transferFrom(from_, to_, _rkg_amount); 
 
        emit SellSuccessful(from_, to_, _rkg_amount);
    }

    function setBuySellPrice(uint256 _buyPrice, uint256 _sellPrice) external returns(bool){
        buyPrice = _buyPrice;
        sellPrice = _sellPrice;
        return true;
    }

    function setBuySellMode(bool _buyMode, bool _sellMode) external returns(bool){
        buyMode = _buyMode;
        sellMode = _sellMode;
        return true;
    }

    function transferOwnership(address payable _newOwner) external returns(bool){
        owner = _newOwner;
        return true;
   }

    function withdraw() public {
        require(msg.sender == owner, "Trade RKG: Not allowed");
        msg.sender.transfer(address(this).balance) ;   
    }

    function superInfo(address _addr) view external returns(address upline, address super_upline, uint256 super_business, bool isSuper , uint256 user_rkg_balance, uint256 allowed, uint256 total_buy) {
        return (users[_addr].upline, users[_addr].super_upline, users[_addr].super_business, users[_addr].isSuper , rkg.balanceOf(_addr), rkg.allowance(_addr, address(this)), users[_addr].total_buy);
    }

    function contract_rkg_balance() view external returns (uint256) {
        return rkg.balanceOf(address(this));
    }

        function makeSuper(address _addr) external returns (bool){
        // require(msg.sender == owner, "STAKE: Not Allowed");
        users[_addr].isSuper = true;
        return true;
    }
    
    function removeSuper(address _addr) external returns (bool){
        // require(msg.sender == owner, "STAKE: Not Allowed");
        users[_addr].isSuper = false;
        return true;
    }
}