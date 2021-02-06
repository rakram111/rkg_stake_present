pragma solidity 0.5.4;

contract Transaction {

    address payable public admin1 ; 
    address payable public admin2 ; 
    address payable public admin3 ; 
    address payable public user ;

    constructor( 
                address payable _admin2,  
                address payable _admin3 
                 ) public {
        
        user = msg.sender;             
        admin1 = msg.sender;
        admin2 = _admin2;
        admin3 = _admin3;

        status[admin1] = false;
        status[admin2] = false;
        status[admin3] = false;
    }
    mapping(address => bool) public status ;
    event Deposit(address indexed addr, uint256 amount) ;
    event Withdraw(address indexed addr ) ;

     uint256 public total = 0; 
     uint256 public i = 1;
     
    function() payable external {
        _deposit(msg.value);
     }

     function _deposit(uint256 _amount) private {
         total += _amount;
         emit Deposit(msg.sender, _amount);
     }
 
    function withdraw() external {
     require(msg.sender == admin1 || msg.sender == admin2 || msg.sender == admin3, "NA");
     require(status[msg.sender] == false, "quota completed");
         if(i==1){
            msg.sender.transfer(address(this).balance*3333/10000);
            i++;

        } else if(i==2) {
            msg.sender.transfer(address(this).balance*4999/10000);
            i++;

        } else if(i==3) {
            msg.sender.transfer(address(this).balance*9999/10000); 
        }

        status[msg.sender] = true; 
        emit Withdraw(msg.sender );
 
    
 }
    function changeAdmin1(address payable _newAdmin1) public {
		require( msg.sender == user, "Not allowed");
		admin1  = _newAdmin1;
	} 
    function changeAdmin2(address payable _newAdmin2) public {
		require( msg.sender == user, "Not allowed");
		admin2  = _newAdmin2;
	} 
    function changeAdmin3(address payable _newAdmin3) public {
		require( msg.sender == user, "Not allowed");
		admin3  = _newAdmin3;
	} 
    function reset( ) public {
		require( msg.sender == user, "Not allowed");
	    status[admin1] = false;
        status[admin2] = false;
        status[admin3] = false;
         i = 1; 
 	} 
}