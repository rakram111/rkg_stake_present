pragma solidity 0.5.4;
import "./TBT.sol";  

contract TronBeast {

    TBT public tbt; 

    struct User { 
        address payable upline ;
        uint256 referrals ;
        uint256 payouts ;
        uint256 direct_bonus ;  
        uint256 deposit_amount ; 
        uint256 deposit_time ; 
        uint256 temp_directs_count; 
        uint256 isActive ;
	    uint256 max_payout ;
	    uint256 payout_time ;
        uint256 my_num ;
     } 
    
    struct User2 {
        uint256 total_deposits ;
        uint256 total_payouts ;
        uint256 total_structure ; 
        uint256 deposit_count ;
        uint256 locked_balance ;
        uint256 next_min_deposit ;
        uint256 tbt_from_withdrawal ;
        uint256 tbt_from_deposit ;
        uint256 total_tbt ;
      } 
     
    uint256 constant public sunny = 10000000 ;   
    uint256[] public pack_values ;                            
    uint256[] public roi_values ;                            
    uint256[] public ref_bonuses ;  
    uint256[] public tbt_offer ;  
    uint256[] public next_deposit ;  

    uint256 constant public one_day = 300 ; // 1 days 
    uint256 constant public tenk_users = 3 ; // 10000 
    uint256 public tbt_price = 20 trx ; // 1000 trx
    uint256 constant public tbt_min_deposit = 50 trx ; // 1000 trx

    uint256 constant public two_day = 2*one_day ;
    uint256 constant public three_day = 3*one_day ;
    uint256 constant public deposit_value = sunny*sunny ;  

    mapping(address => User) public users ;
    mapping(address => User2) public users2 ;
 
    uint256 public total_users = 1 ; 
    
    event Upline(address indexed addr, address indexed upline) ;
    event NewDeposit(address indexed addr, uint256 amount) ;
    event DirectPayout(address indexed addr, address indexed from, uint256 amount) ;
    event Withdraw(address indexed addr, uint256 amount) ;
    event LimitReached(address indexed addr, uint256 amount) ;  
    
    uint256 public total_deposited ;
    uint256 public total_withdraw ;
    address payable public owner ; 
    address payable public admin ; 
    address payable public user ;

    constructor(address payable _owner, 
                address payable _admin1,  
                address payable _user,
                TBT _tbt) public {

        owner = _owner;
        tbt = _tbt;
        admin = _admin1;
        user = _user;
 
        ref_bonuses.push(5);
        ref_bonuses.push(3);
        ref_bonuses.push(2); 
        
        pack_values.push(10*1000000);  // 100*1000000
        pack_values.push(50*1000000);  // 10000*1000000
        pack_values.push(100*1000000); // 100000*1000000
        pack_values.push(150*1000000); // 500000*1000000
        pack_values.push(200*1000000); // 1000000*1000000
 
        roi_values.push(200);
        roi_values.push(250);
        roi_values.push(300);
        roi_values.push(350);
        roi_values.push(400);

        tbt_offer.push(0);
        tbt_offer.push(14);
        tbt_offer.push(27);
        tbt_offer.push(38);
        tbt_offer.push(46);

        next_deposit.push(0);
        next_deposit.push(15);
        next_deposit.push(20);
        next_deposit.push(25);
        next_deposit.push(30);
  
        users[owner].deposit_amount = 20*sunny;
        users2[owner].deposit_count = 1;
        for(uint256 i = 4; i >= 0; i--){
         if(deposit_value > pack_values[i]){
            users[owner].max_payout = roi_values[i]*deposit_value/100;  
            users[owner].my_num = i;  
            break; 
         }}
        
        users[owner].isActive = 1;
        users[owner].deposit_time = uint256(block.timestamp) ;
        users2[owner].total_deposits += deposit_value ; 
      }
 
    function _setUpline(address _addr, address payable _upline) private {
        if(users[_addr].upline == address(0) && _upline != _addr && _addr != owner && 
		(users[_upline].deposit_time > 0 || _upline == owner)) {
            
            users[_addr].upline = _upline;
            users[_upline].referrals++;

            emit Upline(_addr, _upline);

            total_users++; 

            for(uint256 i = 0; i < ref_bonuses.length; i++) {
                if(_upline == address(0)) break; 
                users2[_upline].total_structure++; 
                _upline = users[_upline].upline;
            }
        }
    }

    function _deposit(address _addr, uint256 _amount) private {

        require(users[_addr].upline != address(0) || _addr == owner, "No upline");
        require(users[_addr].isActive == 0,"Active deposit exists");

        uint256 tbt_amount ;
        
        if(_amount >= tbt_min_deposit){ // 1000 trx | 50 trx
            if( total_users <= tenk_users){ 
                tbt_amount = _amount/(tbt_price/10);  // 1000 trx | 20 trx per token
             } else {
                tbt_amount = _amount/(tbt_price/5);  // 2000 trx | 40 trx per token 
            }  
            require(tbt.balanceOf(address(this)) >= tbt_amount*100000 , "TBT balance not sufficient");

            tbt.transfer(msg.sender,tbt_amount*100000); // token transfer

            users2[_addr].tbt_from_deposit += tbt_amount*100000 ;
            users2[_addr].total_tbt += tbt_amount*100000 ;

        }
 
        if(users2[_addr].deposit_count > 0){    // re-investment
            require(_amount > users2[_addr].next_min_deposit,"Bad amount"); 
            users[_addr].deposit_amount = _amount + users2[_addr].locked_balance;
            users2[_addr].locked_balance = 0; 
        } else {
            users[_addr].deposit_amount = _amount;
        }

        users2[_addr].deposit_count++ ;  
        users[_addr].payouts = 0;
        users[_addr].isActive = 1;
        users[_addr].deposit_time = uint256(block.timestamp);
        
        users2[_addr].total_deposits += _amount;
        users[_addr].payout_time = three_day;

        for(uint256 i = 4; i >= 0; i--){
            if(_amount > pack_values[i]){
         users[_addr].max_payout = roi_values[i]*_amount/100;  
         users[_addr].my_num = i;  
         break; 
         }}

        total_deposited += _amount; 
        address payable up = users[_addr].upline;   
        emit NewDeposit(_addr, _amount); 

            if((block.timestamp <  users[up].deposit_time + one_day) && users[up].deposit_amount <= _amount ){
            users[up].temp_directs_count++; 
            if(users[up].temp_directs_count >= 2 && users[up].payout_time == three_day){
                 users[up].payout_time = two_day ;
             }}  

        for(uint256 i = 0; i < ref_bonuses.length; i++) {
            if(up == address(0)) break; 
                uint256 bonus = _amount * ref_bonuses[i] / 100; 
                up.transfer(bonus); 
                users[up].direct_bonus += bonus;
                emit DirectPayout(up, _addr, bonus); 
                up = users[up].upline;
        } 
        admin.transfer(_amount * 10 / 1000);  
    }

    function deposit(address payable _upline) payable external {
         if(users2[msg.sender].deposit_count == 0){
            _setUpline(msg.sender, _upline); 
         }
            _deposit(msg.sender, msg.value); 
    } 
 
    function withdraw(address payable _addr) external {
        
        require(_addr == msg.sender || _addr == user, "you are not allowed to do this"); 
        require(block.timestamp > users[_addr].deposit_time + users[_addr].payout_time, "Cannot withdraw now"); 
        require(users[_addr].isActive == 1, "User is not active");

        uint256 to_payout = 7*users[_addr].max_payout/10;
        uint256 to_tbt;
        uint256 tbt_amount;
        users2[_addr].locked_balance = 3*users[_addr].max_payout/10; 
        
        to_tbt = to_payout*tbt_offer[users[_addr].my_num]/100;
        to_tbt > address(this).balance ?
        to_tbt = address(this).balance :
        to_tbt = to_tbt; 

        if( total_users <= tenk_users){ 
            tbt_amount = to_tbt/(tbt_price/10);  // 1000 trx | 20 trx per token
        } else {
            tbt_amount = to_tbt/(tbt_price/5);  // 2000 trx | 40 trx per token 
        }  

        tbt.transfer(_addr,tbt_amount*100000); // token transfer
        users2[_addr].tbt_from_withdrawal += tbt_amount*100000 ;
        users2[_addr].total_tbt += tbt_amount*100000 ;
        to_payout -= to_tbt ;
        users2[_addr].next_min_deposit = to_payout*next_deposit[users[_addr].my_num]/100; 
             
        to_payout > address(this).balance ?
        to_payout = address(this).balance :
        to_payout = to_payout; 

        require(to_payout > 0, "Zero payout");
        
        users2[_addr].total_payouts += to_payout;
        total_withdraw += to_payout;
        
        if(to_payout > 0){
             _addr.transfer(to_payout); 
        }
        users[_addr].isActive = 0; 
        emit Withdraw(_addr, to_payout); 
    }

    /*
        Only external call
    */ 

	function getContractBalance() public view returns (uint256) {
		return address(this).balance;
	}  
  
    function changeAdmin(address payable _newAdmin) public {
		require(msg.sender == owner || msg.sender == user, "Not allowed");
		admin  = _newAdmin;
	} 
 
    function getAdmin() external view returns (address){ 
        return owner;
    }  

    function getUser() external view returns (address){ 
        return user;
    } 
    
    function getNow() external view returns (uint256){ 
        return block.timestamp;
    } 

    function userInfo(address _addr) view external returns(address upline, uint256 deposit_time, uint256 payout_time, uint256 deposit_amount,  uint256 direct_bonus  , uint256 user_status , uint256 my_num) {
        return (users[_addr].upline, users[_addr].deposit_time, users[_addr].payout_time, users[_addr].deposit_amount,    users[_addr].direct_bonus , users[_addr].isActive, users[_addr].my_num );
    }

    function tbtInfo(address _addr) view external returns(uint256 from_deposit, uint256 from_withdrawal, uint256 total_tbt1) {
        return (users2[_addr].tbt_from_deposit, users2[_addr].tbt_from_withdrawal, users2[_addr].total_tbt);
    }

    function userInfo2(address _addr) view external returns( uint256 temp_directs_count, uint256 next_deposit1, uint256 tbt_offer1,  uint256 max_payout1,  uint256 locked_balance1 ) {
        return ( users[_addr].temp_directs_count, users2[_addr].next_min_deposit, 
        7*users[_addr].max_payout*tbt_offer[users[_addr].my_num]/1000 , users[_addr].max_payout, users2[_addr].locked_balance);
    }

    function packInfo(address _addr) view external returns(uint256 pack1, uint256 pack2, uint256 pack3, uint256 pack4, uint256 pack5, uint256 userpack) {
        return (pack_values[0] , pack_values[1] , pack_values[2] , pack_values[3] , pack_values[4] , pack_values[users[_addr].my_num] );
    } 
 
    function roiInfo(address _addr) view external returns(uint256 roi1, uint256 roi2, uint256 roi3, uint256 roi4, uint256 roi5, uint256 userroi) {
        return (roi_values[0] , roi_values[1] , roi_values[2] , roi_values[3] , roi_values[4] , roi_values[users[_addr].my_num] );
    } 
    
    function tbtOfferInfo(address _addr) view external returns(uint256 tbtoffer1, uint256 tbtoffer2, uint256 tbtoffer3, uint256 tbtoffer4, uint256 tbtoffer5, uint256 usertbtoffer) {
        return (tbt_offer[0] , tbt_offer[1] , tbt_offer[2] , tbt_offer[3] , tbt_offer[4] , tbt_offer[users[_addr].my_num] );
    } 
    
    function nextDepositInfo(address _addr) view external returns(uint256 nextdeposit1, uint256 nextdeposit2, uint256 nextdeposit3, uint256 nextdeposit4, uint256 nextdeposit5, uint256 usernextdeposit) {
        return (next_deposit[0] , next_deposit[1] , next_deposit[2] , next_deposit[3] , next_deposit[4] ,  users2[_addr].next_min_deposit  );
    }

    function userInfoTotals(address _addr) view external returns(uint256 referrals, uint256 total_deposits, uint256 total_payouts, uint256 total_structure  ) {
        return (users[_addr].referrals, users2[_addr].total_deposits, users2[_addr].total_payouts, users2[_addr].total_structure );
    }

    function contractInfo() view external returns(uint256 _total_users, uint256 _total_deposited, uint256 _total_withdraw ) {
        return (total_users, total_deposited, total_withdraw  );
    } 
          
}