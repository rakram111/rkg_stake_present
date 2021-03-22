pragma solidity 0.5.4;
import "./RKG.sol";  // TA2EDEgytsPYu27kkZtDpFBz85as8vPqsX
 
contract RKGcontract  {
   
    RKG public rkg; 
  
    struct User {
        address upline ;
        uint256 direct_referrals ;
        uint256 payouts ;
        uint256[5] level_income;
        uint256 gen_bonus ;
        uint256 instant_bonus ;
        uint256 deposit_amount ;
        uint256 deposit_payouts ;
        uint40 deposit_time ;
        uint256 total_deposits ;
        uint256 total_payouts ;
        uint256 isActive ;
        uint256 direct_biz ;
    } 

    struct User2 {
        address super_upline ; // logic
        bool isSuper ;
        uint256 super_business ;  
        uint256 super5_bonus ;  
        uint256 super_directs ;  
    }
    
    uint256 constant public mill = 1000000 ; // 100 trx
    uint256 constant public MIN_DEPOSIT = 30*mill ; // 300*mill
    uint256 constant public MAX_DEPOSIT = mill*mill ; // 300*mill
    uint256 constant public MANAGER_DEPOSIT = 10000*mill ; // 10000*mill
    uint256 constant public one_day = 60 ; // 1 days 
    uint256 constant public super_time = 15*one_day ; // 15 days 
    uint256 constant public daily_roi = 2 ; // 0.2% daily
    uint256 public buffer_divider = 1 ;   
       
    mapping(address => User) public users ;
    mapping(address => User2) public users2 ;
     
    uint8[] public ref_bonuses ;  
    uint8[] public aff_bonuses ;  
    uint256 public total_users = 0 ;
    uint256 public total_deposited ;
    uint256 public total_withdraw ;
    
    event Upline(address indexed addr, address indexed upline) ;
    event NewDeposit(address indexed addr, uint256 amount) ;
    event MatchPayout(address indexed addr, address indexed from, uint256 amount) ;
    event Withdraw(address indexed addr, uint256 amount) ;
    event LimitReached(address indexed addr, uint256 amount) ; 
    event TransferSuccessful(address indexed from_, address indexed to_, uint256 amount_); 
    event TransferFailed(address indexed from_, address indexed to_, uint256 amount_);   

    address payable public owner ; 
    
    constructor(  RKG _rkg) public {

        owner = msg.sender; 
        rkg = _rkg;
         
        ref_bonuses.push(20); // Level 1
        ref_bonuses.push(10); // Level 2 
        ref_bonuses.push(10); // Level 3
        ref_bonuses.push(10); // Level 4
        ref_bonuses.push(10); // Level 5
        ref_bonuses.push(5); // Level 6
        ref_bonuses.push(5); // Level 7
        ref_bonuses.push(5); // Level 8
        ref_bonuses.push(5); // Level 9
        ref_bonuses.push(5); // Level 10

        aff_bonuses.push(10); // Level 1
        aff_bonuses.push(2); // Level 2
        aff_bonuses.push(1); // Level 3
        aff_bonuses.push(1); // Level 4
        aff_bonuses.push(1);  // Level 5
    }

    function() payable external { 
         _deposit(msg.sender, msg.value);     
     }
 
 
    function _setUpline(address _addr, address _upline) private {
        if(users[_addr].upline == address(0) && _upline != _addr && _addr != owner && 
		(users[_upline].deposit_time > 0 || _upline == owner) ) {
           
            users[_addr].upline = _upline;
            users[_upline].direct_referrals++; 
            emit Upline(_addr, _upline);

            total_users++;  
        }
    }

    function _deposit(address _addr, uint256 _amount) private {
        require(users[_addr].upline != address(0) || _addr == owner, "No upline");
 
        if(users[_addr].deposit_time > 0) {
             
            require(users[_addr].payouts >= this.maxPayoutOf(users[_addr].deposit_amount), "Deposit already exists");
            require(_amount >= users[_addr].deposit_amount  , "Bad amount");

        }
        else require(_amount >= MIN_DEPOSIT  && _amount <= MAX_DEPOSIT , "Bad amount"); 
        
        require(_amount > 0);
        transferTokens(address(this), _amount); 
        
        users[_addr].payouts = 0;
        users[_addr].deposit_amount = _amount;
        users[_addr].deposit_payouts = 0;
        users[_addr].isActive = 1;
        users[_addr].deposit_time = uint40(block.timestamp);
        users[_addr].total_deposits += _amount;

        address upline = users[_addr].upline;
        users[upline].direct_biz += _amount; 

        if(users[upline].deposit_amount >= _amount && block.timestamp <= (users[upline].deposit_time + super_time)){
            users2[upline].super_directs++;
            if(users2[upline].super_directs == 5 && users2[upline].super5_bonus == 0){
                users2[upline].super5_bonus = users[upline].deposit_amount/2;
            }
        }
 
        total_deposited += _amount;
        
        emit NewDeposit(_addr, _amount); 

      for(uint256 i = 0; i < aff_bonuses.length; i++) {
            if(upline == address(0)) break; 
                uint256 bonus = _amount * ref_bonuses[i] / 100; 
                users[upline].level_income[i] += bonus;
                users[upline].instant_bonus += bonus;
                 upline = users[upline].upline;
        } 

        if(upline == owner){
            users2[_addr].isSuper = true;
        } 

        if(users2[upline].isSuper == true){ // check if upline is super
            users2[_addr].super_upline = upline ; // assign present up as superup
        } else {
            users2[_addr].super_upline = users2[upline].super_upline ;// assign up's superup as superup
        }
            users2[users2[_addr].super_upline].super_business += _amount;
  
    } 
    
    function transferTokens(address to_, uint256 amount_) private  {
 
         address from_ = msg.sender;
 
        if(amount_ > rkg.allowance(from_, address(this))) {
            emit TransferFailed(from_, to_, amount_);
            revert();
        }

        rkg.transferFrom(from_, to_, amount_); 
 
        emit TransferSuccessful(from_, to_, amount_);
    }

     function _refPayout(address _addr, uint256 _amount) private {
        address up = users[_addr].upline;

        for(uint8 i = 0; i < ref_bonuses.length; i++) {
            if(up == address(0)) break;
            
            if(users[up].direct_referrals >= i + 1 && i < 5) {
                uint256 bonus = _amount * ref_bonuses[i] / 100;
                
                users[up].gen_bonus += bonus;

                emit MatchPayout(up, _addr, bonus);
            } else if(users[up].direct_referrals >= 5 && users[up].direct_biz >= MANAGER_DEPOSIT) {
                uint256 bonus = _amount * ref_bonuses[i] / 100;
                
                users[up].gen_bonus += bonus;

                emit MatchPayout(up, _addr, bonus);
            } 

            up = users[up].upline;
        }
    }
 
    function deposit(address _upline, uint256 _amount) payable external {
        _setUpline(msg.sender, _upline);
        _deposit(msg.sender, _amount);
    }

 
    function withdraw() external {
        (uint256 to_payout, uint256 max_payout) = this.payoutOf(msg.sender);
        
        require(users[msg.sender].payouts < max_payout, "Full payouts");

        // Deposit payout
        if(to_payout > 0) {
            if(users[msg.sender].payouts + to_payout > max_payout) {
                to_payout = max_payout - users[msg.sender].payouts;
            } 
            users[msg.sender].deposit_payouts += to_payout;
            users[msg.sender].payouts += to_payout;

            _refPayout(msg.sender, to_payout);
        }
        
        // Instant Referral payout
        if(users[msg.sender].payouts < max_payout && users[msg.sender].instant_bonus > 0) {
            uint256 instant_bonus = users[msg.sender].instant_bonus;

            if(users[msg.sender].payouts + instant_bonus > max_payout) {
                instant_bonus = max_payout - users[msg.sender].payouts;
            }

            users[msg.sender].instant_bonus -= instant_bonus;
            users[msg.sender].payouts += instant_bonus;
            to_payout += instant_bonus;
        } 

        // Super 5 Referral payout
        if(users[msg.sender].payouts < max_payout && users2[msg.sender].super5_bonus > 0) {
            uint256 super5_bonus = users2[msg.sender].super5_bonus;

            if(users[msg.sender].payouts + super5_bonus > max_payout) {
                super5_bonus = max_payout - users[msg.sender].payouts;
            }

            users2[msg.sender].super5_bonus -= super5_bonus;
            users[msg.sender].payouts += super5_bonus;
            to_payout += super5_bonus;
        } 
  
        // Match payout
        if(users[msg.sender].payouts < max_payout && users[msg.sender].gen_bonus > 0) {
            uint256 gen_bonus = users[msg.sender].gen_bonus;

            if(users[msg.sender].payouts + gen_bonus > max_payout) {
                gen_bonus = max_payout - users[msg.sender].payouts;
            }

            users[msg.sender].gen_bonus -= gen_bonus;
            users[msg.sender].payouts += gen_bonus;
            to_payout += gen_bonus;
        }

        require(to_payout > 0, "Zero payout");

        to_payout = to_payout/buffer_divider; 
        
        users[msg.sender].total_payouts += to_payout;
        total_withdraw += to_payout;
        if(to_payout > 0){
             rkg.transfer(msg.sender,to_payout); 
        }

        emit Withdraw(msg.sender, to_payout);

        if(users[msg.sender].payouts >= max_payout) {
            emit LimitReached(msg.sender, users[msg.sender].payouts);
            users[msg.sender].isActive = 0;
        }
 
    }
    
    function payoutOf(address _addr) view external returns(uint256 payout, uint256 max_payout) {
        max_payout = this.maxPayoutOf(users[_addr].deposit_amount);
        uint256 Period = (block.timestamp - users[_addr].deposit_time)/one_day;

        if(users[_addr].deposit_payouts < max_payout) {
            payout = this.comp_interest(users[_addr].deposit_amount, Period, daily_roi);
            if(users[_addr].deposit_payouts + payout > max_payout) {
                payout = max_payout - users[_addr].deposit_payouts;
            }
        }
    } 
 
    /*
        Only external call
    */ 

	function getContractBalance() public view returns (uint256) {
		return address(this).balance;
	}  

     function maxPayoutOf(uint256 _amount) external view returns(uint256) {
        uint256 _val = 0 ;
	    if(users[msg.sender].direct_referrals >= 15){
            _val = 50*_amount;
        } else if(users[msg.sender].direct_referrals >= 10){
            _val = 32*_amount;
        } else if(users[msg.sender].direct_referrals >= 6){
            _val = 20*_amount;
        } else if(users[msg.sender].direct_referrals >= 3){
            _val = 12*_amount;
        } else if(users[msg.sender].direct_referrals >= 1){
            _val = 6*_amount;
        } else {
            _val = 2*_amount;
        }
        return _val;
    } 

	function getUserBalance(address _addr) external view returns (uint256) {
        (uint256 to_payout, uint256 max_payout) = this.payoutOf(_addr); 
 
        // Deposit payout
        if(to_payout > 0) {
            if(users[_addr].payouts + to_payout > max_payout) {
                to_payout = max_payout - users[_addr].payouts;
            } 
         }
        
        // Instant Referral payout
        if(users[_addr].payouts < max_payout && users[_addr].instant_bonus > 0) {
            uint256 instant_bonus = users[_addr].instant_bonus;

            if(users[_addr].payouts + instant_bonus > max_payout) {
                instant_bonus = max_payout - users[_addr].payouts;
            } 
           
            to_payout += instant_bonus;
        } 

         // Super 5 Referral payout
        if(users[msg.sender].payouts < max_payout && users2[msg.sender].super5_bonus > 0) {
            uint256 super5_bonus = users2[msg.sender].super5_bonus;

            if(users[msg.sender].payouts + super5_bonus > max_payout) {
                super5_bonus = max_payout - users[msg.sender].payouts;
            }
 
            to_payout += super5_bonus;
        } 
       
        // Match payout
        if(users[_addr].payouts < max_payout && users[_addr].gen_bonus > 0) {
            uint256 gen_bonus = users[_addr].gen_bonus;

            if(users[_addr].payouts + gen_bonus > max_payout) {
                gen_bonus = max_payout - users[_addr].payouts;
            } 
            to_payout += gen_bonus;
        }   
        to_payout = to_payout/buffer_divider;

    }
   
    function MaxPay(address _addr) external view returns (uint256) { 
        return this.maxPayoutOf(users[_addr].deposit_amount);
    }

    function getAdmin() external view returns (address){ 
        return owner;
    } 

    function changeBuffer(uint256 _newValue) external returns (bool){ 
        buffer_divider = _newValue;
        return true;
    } 
 
    
     function getNow() external view returns (uint256){ 
        return block.timestamp;
    }

    function userInfo(address _addr) view external returns(address upline, uint40 deposit_time, uint256 deposit_amount, uint256 payouts, uint256 instant_bonus , uint256 gen_bonus, uint256 user_status ) {
        return (users[_addr].upline, users[_addr].deposit_time, users[_addr].deposit_amount, users[_addr].payouts, users[_addr].instant_bonus, users[_addr].gen_bonus, users[_addr].isActive  );
    }
    function superInfo(address _addr) view external returns(address super_upline, uint256 super_business, uint256 super_directs, bool isSuper, uint256 super5_bonus) {
        return (users2[_addr].super_upline, users2[_addr].super_business, users2[_addr].super_directs, users2[_addr].isSuper, users2[_addr].super5_bonus );
    }

    function levelInfo(address _addr) view external returns(uint256 level1, uint256 level2, uint256 level3, uint256 level4, uint256 level5 ) {
        return (users[_addr].level_income[0] , users[_addr].level_income[1] , users[_addr].level_income[2] , users[_addr].level_income[3] , users[_addr].level_income[4]  );
    }  

    function userInfoTotals(address _addr) view external returns(uint256 direct_referrals, uint256 total_deposits, uint256 total_payouts, uint256 direct_biz, uint256 deposit_payouts) {
        return (users[_addr].direct_referrals, users[_addr].total_deposits, users[_addr].total_payouts,  users[_addr].direct_biz, users[_addr].deposit_payouts);
    } 

    function contractInfo(address _addr) view external returns(uint256 total_deposited1, uint256 total_withdraw1, uint256 rkg_balance, uint256 user_rkg_balance, uint256 user_allowance) {
        return (total_deposited, total_withdraw, rkg.balanceOf(address(this)), rkg.balanceOf(_addr), rkg.allowance(_addr, address(this)));
    } 

    function comp_interest(uint256 deposit_amount, uint256 Period, uint256 ROI_10)pure external returns(uint256){
        uint256 Principle = deposit_amount ;
        uint256 Principle1 = deposit_amount ;
        for (uint256 i=0; i<Period; i++) {
          Principle += Principle* ROI_10/100/10; 
        }
        return Principle - Principle1;
    }

    function dividends_total(address _addr) external view returns(uint256){
        uint256 Principle = users[_addr].deposit_amount ;
        uint256 Principle1 = Principle ;
        uint256 Period = (uint40(block.timestamp) - users[_addr].deposit_time)/one_day;

        for (uint256 i=0; i<Period; i++) {
          Principle += Principle*daily_roi/100/10; 
        }
        return Principle - Principle1;
    }

    function checkAllowance() external view returns(uint256){
        return rkg.allowance(msg.sender, address(this));
    } 
}


