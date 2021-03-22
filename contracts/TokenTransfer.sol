pragma solidity 0.5.4; 
import "./RKG.sol";  // TA2EDEgytsPYu27kkZtDpFBz85as8vPqsX


contract TokenTransfer{
    RKG public rkg; 

    struct User{
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
   
    mapping(address => User) public users ;
 
    constructor(RKG _rkg) public {
        rkg = _rkg;
    }

    event TransferSuccessful(address indexed from_, address indexed to_, uint256 amount_);

    event TransferFailed(address indexed from_, address indexed to_, uint256 amount_);

    function deposit(uint256 _amount) public {
        _deposit(msg.sender, _amount);
    }

    function _deposit(address _addr, uint256 _amount) private { 

         require(_amount > 0);
         transferTokens(address(this), _amount); 
         users[_addr].deposit_amount = _amount;
         users[_addr].deposit_time = uint40(block.timestamp);

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


    // function deposit(uint256 _amount) payable external   { 
    //     _deposit(msg.sender, _amount); 
    // }
}