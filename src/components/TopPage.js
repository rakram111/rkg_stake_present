import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/back.jpg"
import TronWeb from 'tronweb';
import Utils from '../utils';
import Invest from "./Invest";
import SmartInfo from "./SmartInfo";
import PersonalStats from "./PersonalStats";
import MyPresentStaking from "./MyPresentStaking";
import MyStakingInfo from "./MyStakingInfo";
import TeamBiz from "./TeamBiz";
import ReferralLink from "./ReferralLink";
import Withdraw from "./Withdraw2";
import IncomeandTeamStats from "./IncomeandTeamStats.js"; 
import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

// TK4LycnfBcWAfk5QT68AQGffrdWhb8vDx y  
// vvvipppp TCxTecpiFJmTEvTfZQjEqDozVSX4XGkXp Q
// mainnet TGy7DG3PPmpt4b4sJG9HKnEWDj8xezjTG T let url = "s://hardcore-newton-af71f6.netlify.app/" https://trusting-curie-768fd6.netlify.ap p/ ;
let url = "https://sweezglobal.com/";
let contract_address = 'TVn7aMQBAEfkAk6JRJUpW3DcTpoQmBoS4Y';

// let tronContracturl = "https://tronscan.org/#/contract/" + contract_address;
// let tronAddressurl = "https://tronscan.org/#/address/";

toast.configure();

class TopPage extends Component {
    
     
    async componentDidMount() {

        await this.connectTronWeb();
        await this.loadBlockChainData();
        await setInterval(  () => {
               this.setTimes(); 
        }, 3000);

    }

    connectTronWeb = async () => {
        await new Promise(resolve => {
            const tronWebState = {
                installed: window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if (tronWebState.installed) {
                this.setState({
                    tronWeb:
                        tronWebState
                });
                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if (tries >= 310) { //310
                    // const TRONGRID_API = 'https://api.trongrid.io';
                    const TRONGRID_API = 'https://3.225.171.164';
                    window.tronWeb = new TronWeb(
                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    this.setState({
                        tronWeb: {
                            installed: false,
                            loggedIn: false
                        }
                    });

                    clearInterval(timer);
                    return resolve();
                }

                tronWebState.installed = !!window.tronWeb;
                tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                if (!tronWebState.installed)
                    return tries++;

                this.setState({
                    tronWeb: tronWebState
                });

                resolve();
            }, 100);
        });

        if (!this.state.tronWeb.installed) {
            toast.error("Tron blockchain support not enabled, Try using Token Pocket/ Tron Wallet/ Tron Link Pro for Mobile OR Tron Link chrome extension for PC");
        }

        if (!this.state.tronWeb.loggedIn) {
            window.tronWeb.on('addressChanged', () => {
                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }
        await Utils.setTronWeb(window.tronWeb);
    }

    loadBlockChainData = async () => {

        // Global Stats
        const sunny = 1000000;
        var extra_biz = 0;

        await Utils.contract.getAdmin().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        })

        if (this.props.refLinkid) {
            this.setState({ refid: this.props.refLinkid });

        } else {
            this.setState({ refid: this.state.owner });
        }

        // console.log("owner " + this.state.owner);
        this.setState({ refLoading: false });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });
        // this.setState({ account: this.state.refid });
        this.setState({ walletload: false });


        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });

        const contractBalance = await Utils.contract.getContractBalance().call();
        this.setState({ contractBalance: Number(contractBalance / sunny).toFixed(2) });

        const totalRate = await Utils.contract.getRate().call();
        this.setState({ totalRate: (Number(totalRate) / 100).toFixed(2) });

        const totalUsers = await Utils.contract.total_users().call();
        this.setState({ totalUsers: Number(totalUsers) });

        const pool_last_draw = await Utils.contract.pool_last_draw().call();
        this.setState({ pool_last_draw: Number(pool_last_draw) });

        const contract_bonus = await Utils.contract.getContractBonus().call();
        this.setState({ contract_bonus: Number(contract_bonus / 100).toFixed(2) });

        var totalInvested = await Utils.contract.total_deposited().call();
        this.setState({ totalInvested: Number(totalInvested) / sunny });
        this.setState({
            totalInvested: this.state.totalInvested
        });


        const totalPaid = await Utils.contract.total_withdraw().call();
        this.setState({ totalPaid: Number(Number(totalPaid) / sunny).toFixed(0) });

        const pool_balance = await Utils.contract.pool_balance().call();
        this.setState({ pool_balance: Number(Number(pool_balance) / sunny) });

        this.setState({ totalPaid: Number(this.state.totalInvested - this.state.contractBalance).toFixed(2) });

        const whale_balance = await Utils.contract.whale_balance().call();
        this.setState({ whale_balance: Number(Number(whale_balance) / sunny) }); 

        let subAccountstr = this.state.account.toString();
        let subAccount = subAccountstr.substring(0, 8);
        this.setState({ subAccount });

        let contractStr = contract_address.toString();
        let subContract = contractStr.substring(0, 8);
        this.setState({ subContract });

        const userInfoTotals = await Utils.contract.userInfoTotals(this.state.account).call();

        this.setState({ userTotalDeposit: Number(userInfoTotals.total_deposits) / sunny });
        this.setState({ referrals_count: Number(userInfoTotals.referrals) });
        this.setState({ userTotalWithdrawn: Number(userInfoTotals.total_payouts) / sunny });
        this.setState({ total_structure: Number(userInfoTotals.total_structure) });
        this.setState({ teambiz: Number(userInfoTotals.team_biz) / sunny });
        this.setState({ deposit_payouts: Number(userInfoTotals.deposit_payouts) / sunny });
        this.setState({ total_business: Number(userInfoTotals.total_business) / sunny });
 
        /////////////////////////////////////////////////////////////////////////////
        const userInfo = await Utils.contract.userInfo(this.state.account).call();
        // // console.log(userInfo);

        this.setState({ upline: window.tronWeb.address.fromHex(userInfo.upline) });
        this.setState({ subUpline: this.state.upline.toString().substring(0, 8) }); 
        this.setState({ direct_bonus: Number(userInfo.direct_bonus) / sunny });
        this.setState({ gen_bonus: Number(userInfo.gen_bonus) / sunny });
        this.setState({ deposit_amount: Number(userInfo.deposit_amount) / sunny });
        this.setState({ payouts: Number(userInfo.payouts) / sunny });
        this.setState({ deposit_time: Number(userInfo.deposit_time) });
        this.setState({ user_status: Number(userInfo.user_status) });


        const userInfo2 = await Utils.contract.userInfo2(this.state.account).call();
        // // console.log(userInfo2);

        this.setState({ wonder_bonus: Number(userInfo2.wonder_bonus) / sunny });
        this.setState({ wonder_directs: Number(userInfo2.wonder_directs) });
        this.setState({ active_directs: Number(userInfo2.active_directs) });
        this.setState({ active_bonus: Number(userInfo2.active_bonus)/ sunny });
        this.setState({ whale_bonus: Number(userInfo2.whale_bonus)/ sunny }); 

        const CONTRACT_BALANCE_STEP = await Utils.contract.CONTRACT_BALANCE_STEP().call();
        this.setState({ contract_step: Number(CONTRACT_BALANCE_STEP) / sunny });
  
        const pool_period = await Utils.contract.pool_period().call();
        this.setState({ pool_period: Number(pool_period) });
 
        const active_period = await Utils.contract.active_period().call();
        this.setState({ active_period: Number(active_period) });
 
        const wonder_period = await Utils.contract.wonder_period().call();
        this.setState({ wonder_period: Number(wonder_period) });
 
        const now = await Utils.contract.getNow().call();
        this.setState({ now: Number(now) });

        // Wonder draw time
        var wonder_draw_days = 0;
        var wonder_draw_hrs = 0;
        var wonder_draw_mins = 0;
        var wonder_draw_secs = 0;
        var next_wonder_draw_time = Number(this.state.wonder_period + this.state.deposit_time -  this.state.now );

   //      console.log("next wonder in " + next_wonder_draw_time);

        if (next_wonder_draw_time > 86400) {
            wonder_draw_days = Math.floor(next_wonder_draw_time / 86400);
            wonder_draw_hrs = Math.floor(next_wonder_draw_time / 3600);
            wonder_draw_mins = Math.floor((next_wonder_draw_time % 3600) / 60);
            wonder_draw_secs = Math.floor(next_wonder_draw_time % 60);
        } else if (next_wonder_draw_time > 3600) {
            wonder_draw_hrs = Math.floor(next_wonder_draw_time / 3600);
            wonder_draw_mins = Math.floor((next_wonder_draw_time % 3600) / 60);
            wonder_draw_secs = Math.floor(next_wonder_draw_time % 60);
        } else if (next_wonder_draw_time > 60) {
            wonder_draw_mins = Math.floor(next_wonder_draw_time / 60);
            wonder_draw_secs = Math.floor(next_wonder_draw_time % 60);

        } else {
            wonder_draw_secs = next_wonder_draw_time;
        }
        if(wonder_draw_secs < 0){
            wonder_draw_secs = 0;
        }
        this.setState({ wonder_draw_days });
        this.setState({ wonder_draw_hrs });
        this.setState({ wonder_draw_mins });
        this.setState({ wonder_draw_secs });
   //      console.log('next wonder draw hrs - '  + this.state.wonder_draw_hrs)
   //      console.log('next wonder draw mins - ' + this.state.wonder_draw_mins)
   //      console.log('next wonder draw secs - ' + this.state.wonder_draw_secs)
 
        // active draw time
        var active_draw_hrs = 0;
        var active_draw_mins = 0;
        var active_draw_secs = 0;
        var next_active_draw_time = Number(this.state.active_period + this.state.deposit_time -  this.state.now );

   //      console.log("next active in " + next_active_draw_time);

        if (next_active_draw_time > 3600) {
            active_draw_hrs = Math.floor(next_active_draw_time / 3600);
            active_draw_mins = Math.floor((next_active_draw_time % 3600) / 60);
            active_draw_secs = Math.floor(next_active_draw_time % 60);
        } else if (next_active_draw_time > 60) {
            active_draw_mins = Math.floor(next_active_draw_time / 60);
            active_draw_secs = Math.floor(next_active_draw_time % 60);

        } else {
            active_draw_secs = next_active_draw_time;
        }
        
        if(active_draw_secs < 0){
            active_draw_secs = 0;
        }
        this.setState({ active_draw_hrs });
        this.setState({ active_draw_mins });
        this.setState({ active_draw_secs });
   //      console.log('next active draw hrs - '  + this.state.active_draw_hrs)
   //      console.log('next active draw mins - ' + this.state.active_draw_mins)
   //      console.log('next active draw secs - ' + this.state.active_draw_secs)
 


        // pool draw time
        var draw_hrs = 0;
        var draw_mins = 0;
        var draw_secs = 0;
        var next_draw_time = Number(this.state.pool_last_draw + this.state.pool_period - this.state.now);
        if (next_draw_time < 0) {
            next_draw_time = "1";
        }

        this.setState({ next_draw_time });
   //      console.log("next time" + this.state.next_draw_time)

        if (next_draw_time > 3600) {
            draw_hrs = Math.floor(next_draw_time / 3600);
            draw_mins = Math.floor((next_draw_time % 3600) / 60);
            draw_secs = Math.floor(next_draw_time % 60);
        } else if (next_draw_time > 60) {
            draw_mins = Math.floor(next_draw_time / 60);
            draw_secs = Math.floor(next_draw_time % 60);

        } else {
            draw_secs = next_draw_time;
        }
        this.setState({ draw_hrs });
        this.setState({ draw_mins });
        this.setState({ draw_secs });
   //      console.log('next draw hrs - ' + this.state.draw_hrs)
   //      console.log('next draw mins - ' + this.state.draw_mins)
   //      console.log('next draw secs - ' + this.state.draw_secs)

        const avlBalance = await Utils.contract.getUserBalance(this.state.account).call();
        this.setState({ avlBalance: Number(Number(avlBalance) / sunny).toFixed(5) });
 
        // this.state.contractBalance > this.state.avlBalance ?
        //     this.setState({ avlBalance: this.state.avlBalance }) :
        //     this.setState({ avlBalance: this.state.contractBalance })

        const max_payout = await Utils.contract.maxPayoutOf(this.state.deposit_amount * sunny).call();
        this.setState({ max_payout: Number(Number(max_payout) / sunny) });
   //      console.log(this.state.max_payout)

        const dividend = await Utils.contract.getUserDividends(this.state.account).call();
        this.setState({ dividend: Number(Number(dividend) / sunny).toFixed(2) });

        const pool_bonus = await Utils.contract.poolBonus(this.state.account).call();
        this.setState({ pool_bonus: Number(Number(pool_bonus) / sunny).toFixed(2) });

        var income_remaining = this.state.max_payout - this.state.payouts;
        this.setState({ income_remaining: Number(income_remaining).toFixed(2) }); 
        console.log('Income rem '+this.state.income_remaining);
        console.log('aVL rem '+this.state.avlBalance);

        if(this.state.avlBalance > this.state.income_remaining){
            this.setState({ avlBalance : this.state.income_remaining });
        } 
     }

     setTimes = async () => {
        const pool_period = await Utils.contract.pool_period().call();
        this.setState({ pool_period: Number(pool_period) });
 
        const active_period = await Utils.contract.active_period().call();
        this.setState({ active_period: Number(active_period) });
 
        const wonder_period = await Utils.contract.wonder_period().call();
        this.setState({ wonder_period: Number(wonder_period) });
 
        const now = await Utils.contract.getNow().call();
        this.setState({ now: Number(now) });

        // Wonder draw time
        var wonder_draw_days = 0;
        var wonder_draw_hrs = 0;
        var wonder_draw_mins = 0;
        var wonder_draw_secs = 0;
        var next_wonder_draw_time = Number(this.state.wonder_period + this.state.deposit_time -  this.state.now );

   //      console.log("next wonder in " + next_wonder_draw_time);

        if (next_wonder_draw_time > 86400) {
            wonder_draw_days = Math.floor(next_wonder_draw_time / 86400);
            wonder_draw_hrs = Math.floor(next_wonder_draw_time / 3600);
            wonder_draw_mins = Math.floor((next_wonder_draw_time % 3600) / 60);
            wonder_draw_secs = Math.floor(next_wonder_draw_time % 60);
        } else if (next_wonder_draw_time > 3600) {
            wonder_draw_hrs = Math.floor(next_wonder_draw_time / 3600);
            wonder_draw_mins = Math.floor((next_wonder_draw_time % 3600) / 60);
            wonder_draw_secs = Math.floor(next_wonder_draw_time % 60);
        } else if (next_wonder_draw_time > 60) {
            wonder_draw_mins = Math.floor(next_wonder_draw_time / 60);
            wonder_draw_secs = Math.floor(next_wonder_draw_time % 60);

        } else {
            wonder_draw_secs = next_wonder_draw_time;
        }
        if(wonder_draw_secs < 0){
            wonder_draw_secs = 0;
        }
        this.setState({ wonder_draw_days });
        this.setState({ wonder_draw_hrs });
        this.setState({ wonder_draw_mins });
        this.setState({ wonder_draw_secs });
   //      console.log('next wonder draw hrs - '  + this.state.wonder_draw_hrs)
   //      console.log('next wonder draw mins - ' + this.state.wonder_draw_mins)
   //      console.log('next wonder draw secs - ' + this.state.wonder_draw_secs)
 
        // active draw time
        var active_draw_hrs = 0;
        var active_draw_mins = 0;
        var active_draw_secs = 0;
        var next_active_draw_time = Number(this.state.active_period + this.state.deposit_time -  this.state.now );

   //      console.log("next active in " + next_active_draw_time);

        if (next_active_draw_time > 3600) {
            active_draw_hrs = Math.floor(next_active_draw_time / 3600);
            active_draw_mins = Math.floor((next_active_draw_time % 3600) / 60);
            active_draw_secs = Math.floor(next_active_draw_time % 60);
        } else if (next_active_draw_time > 60) {
            active_draw_mins = Math.floor(next_active_draw_time / 60);
            active_draw_secs = Math.floor(next_active_draw_time % 60);

        } else {
            active_draw_secs = next_active_draw_time;
        }
        
        if(active_draw_secs < 0){
            active_draw_secs = 0;
        }
        this.setState({ active_draw_hrs });
        this.setState({ active_draw_mins });
        this.setState({ active_draw_secs });
   //      console.log('next active draw hrs - '  + this.state.active_draw_hrs)
   //      console.log('next active draw mins - ' + this.state.active_draw_mins)
   //      console.log('next active draw secs - ' + this.state.active_draw_secs)
 


        // pool draw time
        var draw_hrs = 0;
        var draw_mins = 0;
        var draw_secs = 0;
        var next_draw_time = Number(this.state.pool_last_draw + this.state.pool_period - this.state.now);
        if (next_draw_time < 0) {
            next_draw_time = "1";
        }

        this.setState({ next_draw_time });
   //      console.log("next time" + this.state.next_draw_time)

        if (next_draw_time > 3600) {
            draw_hrs = Math.floor(next_draw_time / 3600);
            draw_mins = Math.floor((next_draw_time % 3600) / 60);
            draw_secs = Math.floor(next_draw_time % 60);
        } else if (next_draw_time > 60) {
            draw_mins = Math.floor(next_draw_time / 60);
            draw_secs = Math.floor(next_draw_time % 60);

        } else {
            draw_secs = next_draw_time;
        }
        this.setState({ draw_hrs });
        this.setState({ draw_mins });
        this.setState({ draw_secs });
     }

    constructor(props) {
        super(props)

        this.state = {
            guideModalShow: false,
            refLoading: true,
            walletload: true,
            balanceload: true,
            totalInvestmentLoad: true,
            playerStatus: "In Active",
            boostStatus: "In Active",

            account: '',
            totalMembers: 0,
            contract_bonus: 0,
            hold_bonus: 0,
            totalBiz: 0,
            directBiz: 0,
            balance: 0,
            refFlag: 0,
            totalInvested: 0,

            count: 0,
            lastDepositTime: 0,
            depositCount: 0,
            totalRate: "....",

            copySuccess1: false,

            tronWeb: {
                installed: false,
                loggedIn: false
            },
            
        }
      this.setTimes = this.setTimes.bind(this);

    }

    render() {

        const {count} = this.state

        const backStyle = {
            backgroundImage: `url(${back})`, backgroundAttachment: "fixed", fontFamily: "MyFont"
            , height: "auto", width: "100%", margin: "0", backgroundPosition: "center", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundSize: "cover"
        };

        // backgroundImage: `url(${back})`, backgroundColor: "blue",
        return (
            <div>

                <div style={backStyle}>
                    <hr />
                    <hr />
                    <div style={{ textAlign: "center" }}>
                        <a href={url} >  <img src={require("./Image1/logo.png")} alt="Logo" width="360px" /></a>
                    </div>

                    {/* <Banner /> */}

                    <div className="row" >
                        <div className="col-xl-6" style={{ textAlign: "center", paddingTop: "20px" }}  >
                            <a href="https://sweezglobal.com/joiningGuide"   >  <img src={require("./Image1/join.png")} alt="Logo" width="200px" /></a>
                        </div>
                        <div className="col-xl-6" style={{ textAlign: "center", paddingTop: "20px" }}   >
                            <a href="https://sweezglobal.com/aboutUs"   > <img src={require("./Image1/about.png")} alt="Logo" width="200px" /></a>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-xl-4" style={{ textAlign: "center" }}  >
                        </div>
                        <div className="col-xl-4" style={{ textAlign: "center", paddingTop: "20px" }}  >
                            <a href="https://sweezglobal.com/topSponsors"   >
                                <img src={require("./Image1/TopSponsor.png")} alt="Logo" width="220px" /></a>
                        </div>
                        <div className="col-xl-4" style={{ textAlign: "center" }}   >
                        </div>

                    </div>
                    <MyPresentStaking
                        totalRate={this.state.totalRate}
                    />
                    {this.state.user_status !== 0 && this.state.deposit_amount > 0 ?
                        <Withdraw
                            avlBalance={this.state.avlBalance}
                        /> 
                       : null}  

                    <MyStakingInfo
                        contract_bonus={this.state.contract_bonus}
                        hold_bonus={this.state.hold_bonus}
                        totalRate={this.state.totalRate} 
                    />

                    {this.state.user_status === 0 ?
                        <Invest
                            refLoading={this.state.refLoading}
                            refid={this.state.refid}
                            deposit_amount={this.state.deposit_amount}
                            user_status={this.state.user_status}
                            invest={this.invest}
                            reinvest={this.reinvest}
                        /> : null}

                    <SmartInfo
                        
                        smartLoading={this.state.smartLoading}
                        totalInvested={this.state.totalInvested}
                        contractBalance={this.state.contractBalance}
                        totalWithdrawn={this.state.totalWithdrawn}
                        subContract={this.state.subContract}
                        totalDepositCount={this.state.totalDepositCount}
                        totalUsers={this.state.totalUsers}
                        totalPaid={this.state.totalPaid}
                        pool_balance={this.state.pool_balance}
                        whale_balance={this.state.whale_balance}
                        pool_draw_time={this.state.next_draw_time}
                        draw_hrs={this.state.draw_hrs}
                        draw_mins={this.state.draw_mins}
                        draw_secs={this.state.draw_secs}
                    />

                    {this.state.top_promoter === true ?
                        <TeamBiz
                            teambiz={this.state.teambiz}
                        /> : null}

                    {this.state.userTotalDeposit > 0 ?
                        <PersonalStats
                 
                            max_payout={this.state.max_payout}
                            user_status={this.state.user_status} 
                            account={this.state.account}
                            subAccount={this.state.subAccount}
                            upline={this.state.upline}
                            subUpline={this.state.subUpline}
                            userTotalDeposit={this.state.userTotalDeposit}
                            dividend={this.state.dividend}
                            pool_bonus={this.state.pool_bonus}
                            direct_bonus={this.state.direct_bonus}
                            deposit_amount={this.state.deposit_amount}
                            wonder_bonus={this.state.wonder_bonus}
                            active_bonus={this.state.active_bonus}
                            whale_bonus={this.state.whale_bonus}
                            gen_bonus={this.state.gen_bonus}
                            userTotalWithdrawn={this.state.payouts}
                            income_remaining={this.state.income_remaining}
                            referrals_count={this.state.referrals_count}
                            total_structure={this.state.total_structure}
                            avlBalance={this.state.avlBalance}

                        /> : null}
 

                    {this.state.userTotalDeposit > 0 ?
                        <IncomeandTeamStats

                            wonder_draw_days={this.state.wonder_draw_days}
                            wonder_draw_hrs={this.state.wonder_draw_hrs}
                            wonder_draw_mins={this.state.wonder_draw_mins}
                            wonder_draw_secs={this.state.wonder_draw_secs}

                            active_draw_hrs={this.state.active_draw_hrs}
                            active_draw_mins={this.state.active_draw_mins}
                            active_draw_secs={this.state.active_draw_secs}

                            userTotalDeposit={this.state.userTotalDeposit}
                            userTotalWithdrawn={this.state.userTotalWithdrawn}
                            referrals_count={this.state.referrals_count}
                            wonder_directs={this.state.wonder_directs}
                            deposit_amount={this.state.deposit_amount}
                            active_directs={this.state.active_directs}
                            total_structure={this.state.total_structure}
                            total_business={this.state.total_business} 

                        /> : null} 

                    {this.state.userTotalDeposit > 0 ?
                        <ReferralLink
                            account={this.state.account}
                        /> : null} 

                    <div style={{ paddingBottom: "20px" }}></div>
 
                    <div style={{ paddingBottom: "50px" }}></div>
                </div>

            </div >
        );
    }
}
export default TopPage;