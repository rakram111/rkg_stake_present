import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/back.jpg"
import TronWeb from 'tronweb';
import Utils from '../utils';
import PersonalStats from "./PersonalStats";
import Withdraw from "./Withdraw2";
import IncomeandTeamStats from "./IncomeandTeamStats.js";
import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

let url = "https://tronbeast.live/";
let contract_address = 'TSd6biB8vSABDHyiu7Qth5P3USdzc7xJhL';

// let tronContracturl = "https://shasta.tronscan.org/#/contract/" + contract_address;
// let tronAddressurl = "https://shasta.tronscan.org/#/address/";

toast.configure();

class TopPage extends Component {


    async componentDidMount() {

        await this.connectTronWeb();
        await this.loadBlockChainData();
        await setInterval(() => {
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
        this.setState({ account: this.state.refid });
        // this.setState({ account: this.state.refid });
        this.setState({ walletload: false });
        const contractBalance = await Utils.contract.getContractBalance().call();
        this.setState({ contractBalance: Number(contractBalance / sunny).toFixed(2) });

        // const token_balance = (((await tokenUtils.contract.balanceOf(this.state.account).call()).toNumber()) / 1000000).toFixed(3);
        // //const balance = await Utils.contract.decimals().call();
        // console.log('balance', token_balance);
        // this.setState({ tokenBalance: token_balance })

        const totalUsers = await Utils.contract.total_users().call();
        this.setState({ totalUsers: Number(totalUsers) });

        var totalInvested = await Utils.contract.total_deposited().call();
        this.setState({ totalInvested: Number(totalInvested) / sunny });

        // const totalPaid = await Utils.contract.total_withdraw().call();
        // this.setState({ totalPaid: Number(Number(totalPaid) / sunny).toFixed(0) });

        this.setState({ totalPaid: Number(this.state.totalInvested - this.state.contractBalance).toFixed(1) });

        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });

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

        /////////////////////////////////////////////////////////////////////////////
        const userInfo = await Utils.contract.userInfo(this.state.account).call();
        // // console.log(userInfo);

        this.setState({ upline: window.tronWeb.address.fromHex(userInfo.upline) });
        this.setState({ subUpline: this.state.upline.toString().substring(0, 8) });
        this.setState({ direct_bonus: Number(userInfo.direct_bonus) / sunny });
        this.setState({ deposit_amount: Number(userInfo.deposit_amount) / sunny });
        this.setState({ payouts: Number(userInfo.payouts) / sunny });
        this.setState({ deposit_time: Number(userInfo.deposit_time) });
        this.setState({ user_status: Number(userInfo.user_status) });

        const now = await Utils.contract.getNow().call();
        this.setState({ now: Number(now) });


    }

    setTimes = async () => {
        const sunny = 1000000;

        const contractBalance = await Utils.contract.getContractBalance().call();
        this.setState({ contractBalance: Number(contractBalance / sunny).toFixed(2) });

        const totalUsers = await Utils.contract.total_users().call();
        this.setState({ totalUsers: Number(totalUsers) });

        var totalInvested = await Utils.contract.total_deposited().call();
        this.setState({ totalInvested: Number(totalInvested) / sunny });

        const now = await Utils.contract.getNow().call();
        this.setState({ now: Number(now) });

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
            totalUsers: "....",
            contractBalance: "....",
            totalPaid: "....",
            pool_balance: "....",
            whale_balance: "....",

            tronWeb: {
                installed: false,
                loggedIn: false
            },

        }
        this.setTimes = this.setTimes.bind(this);
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
                            <a href="https://tronbeast.live/joiningGuide"   >  <img src={require("./Image1/join.png")} alt="Logo" width="200px" /></a>
                        </div>
                        <div className="col-xl-6" style={{ textAlign: "center", paddingTop: "20px" }}   >
                            <a href="https://tronbeast.live/aboutUs"   > <img src={require("./Image1/about.png")} alt="Logo" width="200px" /></a>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-xl-4" style={{ textAlign: "center" }}  >
                        </div>
                        <div className="col-xl-4" style={{ textAlign: "center", paddingTop: "20px" }}  >
                            <a href="https://tronbeast.live/topSponsors"   >
                                <img src={require("./Image1/TopSponsor.png")} alt="Logo" width="220px" /></a>
                        </div>
                        <div className="col-xl-4" style={{ textAlign: "center" }}   >
                        </div>

                    </div>
                    <Withdraw
                        avlBalance={this.state.avlBalance}
                    />

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

                    />
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

                    />

                    <div style={{ paddingBottom: "20px" }}></div>

                    <div style={{ paddingBottom: "50px" }}></div>
                </div>

            </div >
        );
    }
}
export default TopPage;