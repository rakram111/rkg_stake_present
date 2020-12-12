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
import Withdraw from "./Withdraw";
import IncomeandTeamStats from "./IncomeandTeamStats.js";

import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

//TM5uShsLgdvTX9JXvwnEgY3zWsCqDWxjN w 
// vvvipppp TQyN8i3qxt8eaH3QXzPYTVVeikuzuDZNgn
// mainnet TGy7DG3PPmpt4b4sJG9HKnEWDj8xezjTG T let url = "s://hardcore-newton-af71f6.netlify.app/" https://trusting-curie-768fd6.netlify.ap p/ ;
let url = "https://sweezglobal.com/";
let contract_address = 'TQyN8i3qxt8eaH3QXzPYTVVeikuzuDZNgn';

// let tronContracturl = "https://tronscan.org/#/contract/" + contract_address;
// let tronAddressurl = "https://tronscan.org/#/address/";

toast.configure();

class TopPage extends Component {

    async componentDidMount() {

        await this.connectTronWeb();
        await this.loadBlockChainData();

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
        console.log('user total deposit ' + this.state.userTotalDeposit);

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


        const CONTRACT_BALANCE_STEP = await Utils.contract.CONTRACT_BALANCE_STEP().call();
        this.setState({ contract_step: Number(CONTRACT_BALANCE_STEP) / sunny });

        const PERCENTS_DIVIDER = await Utils.contract.PERCENTS_DIVIDER().call();
        this.setState({ percent_divider: Number(PERCENTS_DIVIDER) });

        const time_step = await Utils.contract.time_period().call();
        this.setState({ time_step: Number(time_step) });

        const pool_period = await Utils.contract.pool_period().call();
        this.setState({ pool_period: Number(pool_period) });



        const now = await Utils.contract.getNow().call();
        this.setState({ now: Number(now) });

        // ROI draw time
        var roi_draw_hrs = 0;
        var roi_draw_mins = 0;
        var roi_draw_secs = 0;
        var next_roi_draw_time = Number(this.state.time_step - (this.state.now - this.state.deposit_time) % this.state.time_step);

        console.log("next roi in " + next_roi_draw_time);

        if (next_roi_draw_time > 3600) {
            roi_draw_hrs = Math.floor(next_roi_draw_time / 3600);
            roi_draw_mins = Math.floor((next_roi_draw_time % 3600) / 60);
            roi_draw_secs = Math.floor(next_roi_draw_time % 60);
        } else if (next_roi_draw_time > 60) {
            roi_draw_mins = Math.floor(next_roi_draw_time / 60);
            roi_draw_secs = Math.floor(next_roi_draw_time % 60);

        } else {
            roi_draw_secs = next_roi_draw_time;
        }
        this.setState({ roi_draw_hrs });
        this.setState({ roi_draw_mins });
        this.setState({ roi_draw_secs });
        console.log('next roi draw hrs - ' + this.state.roi_draw_hrs)
        console.log('next roi draw mins - ' + this.state.roi_draw_mins)
        console.log('next roi draw secs - ' + this.state.roi_draw_secs)



        // pool draw time
        var draw_hrs = 0;
        var draw_mins = 0;
        var draw_secs = 0;
        var next_draw_time = Number(this.state.pool_last_draw + this.state.pool_period - this.state.now);
        if (next_draw_time < 0) {
            next_draw_time = "1";
        }

        this.setState({ next_draw_time });
        console.log("next time" + this.state.next_draw_time)

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
        console.log('next draw hrs - ' + this.state.draw_hrs)
        console.log('next draw mins - ' + this.state.draw_mins)
        console.log('next draw secs - ' + this.state.draw_secs)

        const avlBalance = await Utils.contract.getUserBalance(this.state.account).call();
        this.setState({ avlBalance: Number(Number(avlBalance) / sunny).toFixed(5) });

        // this.state.contractBalance > this.state.avlBalance ?
        //     this.setState({ avlBalance: this.state.avlBalance }) :
        //     this.setState({ avlBalance: this.state.contractBalance })

        const max_payout = await Utils.contract.maxPayoutOf(this.state.deposit_amount * sunny).call();
        this.setState({ max_payout: Number(Number(max_payout) / sunny) });
        console.log(this.state.max_payout)

        const dividend = await Utils.contract.getUserDividends(this.state.account).call();
        this.setState({ dividend: Number(Number(dividend) / sunny).toFixed(2) });

        const pool_bonus = await Utils.contract.poolBonus(this.state.account).call();
        this.setState({ pool_bonus: Number(Number(pool_bonus) / sunny).toFixed(2) });

        var income_remaining = this.state.max_payout - this.state.payouts;
        this.setState({ income_remaining: Number(income_remaining).toFixed(2) });

        const poolTopInfo = await Utils.contract.poolTopInfo().call();
        var addrs1, addrs2, addrs3, addrs4, addrs5, deps1, deps2, deps3, deps4, deps5;

        addrs1 = window.tronWeb.address.fromHex(poolTopInfo.addrs[0]);
        deps1 = Number(poolTopInfo.deps[0]) / sunny;

        // console.log('pool top info' + addrs1);

        this.setState({ deps1 });
        this.setState({ addrs1 });
        let subAddrs1 = this.state.addrs1.toString();
        let subAddres1 = subAddrs1.substring(0, 8);
        this.setState({ subAddres1 });
        console.log('deps ' + this.state.deps1)
        // console.log(this.state.addrs1 + "----" + this.state.subAddres1)

        addrs2 = window.tronWeb.address.fromHex(poolTopInfo.addrs[1]);
        deps2 = Number(poolTopInfo.deps[1]) / sunny;
        this.setState({ deps2 });
        this.setState({ addrs2 });
        let subAddrs2 = this.state.addrs2.toString();
        let subAddres2 = subAddrs2.substring(0, 8);
        this.setState({ subAddres2 });
        console.log('deps ' + this.state.deps2)

        addrs3 = window.tronWeb.address.fromHex(poolTopInfo.addrs[2]);
        deps3 = Number(poolTopInfo.deps[2]) / sunny;
        this.setState({ deps3 });
        this.setState({ addrs3 });
        let subAddrs3 = this.state.addrs3.toString();
        let subAddres3 = subAddrs3.substring(0, 8);
        this.setState({ subAddres3 });
        console.log('deps ' + this.state.deps3)

        addrs4 = window.tronWeb.address.fromHex(poolTopInfo.addrs[3]);
        deps4 = Number(poolTopInfo.deps[3]) / sunny;
        this.setState({ deps4 });
        this.setState({ addrs4 });
        let subAddrs4 = this.state.addrs4.toString();
        let subAddres4 = subAddrs4.substring(0, 8);
        this.setState({ subAddres4 });
        console.log('deps ' + this.state.deps4)

        addrs5 = window.tronWeb.address.fromHex(poolTopInfo.addrs[4]);
        deps5 = Number(poolTopInfo.deps[4]) / sunny;
        // console.log(addrs5 + '- dep ' + deps5);
        this.setState({ deps5 });
        this.setState({ addrs5 });
        let subAddrs5 = this.state.addrs5.toString();
        let subAddres5 = subAddrs5.substring(0, 8);
        this.setState({ subAddres5 });
        console.log('deps ' + this.state.deps5)

        // console.log('contract - ' + this.state.upline);
        // console.log('link refid - ' + this.state.refid);

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

            lastDepositTime: 0,
            depositCount: 0,
            totalRate: 2.3,

            copySuccess1: false,

            tronWeb: {
                installed: false,
                loggedIn: false
            },
        }
    }

    render() {

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
                        /> : null}

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
                            roi_draw_hrs={this.state.roi_draw_hrs}
                            roi_draw_mins={this.state.roi_draw_mins}
                            roi_draw_secs={this.state.roi_draw_secs}
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
                            wonder_bonus={this.state.wonder_bonus}
                            gen_bonus={this.state.gen_bonus}
                            userTotalWithdrawn={this.state.payouts}
                            deposit_amount={this.state.deposit_amount}
                            income_remaining={this.state.income_remaining}
                            referrals_count={this.state.referrals_count}
                            total_structure={this.state.total_structure}
                            avlBalance={this.state.avlBalance}

                        /> : null}




                    {this.state.userTotalDeposit > 0 ?
                        <IncomeandTeamStats

                            userTotalDeposit={this.state.userTotalDeposit}
                            userTotalWithdrawn={this.state.userTotalWithdrawn}
                            referrals_count={this.state.referrals_count}
                            wonder_directs={this.state.wonder_directs}
                            total_structure={this.state.total_structure}

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
