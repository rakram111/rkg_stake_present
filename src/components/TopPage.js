import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/thunder.jpg"
import TronWeb from 'tronweb';
import Utils from 'utils';
import Invest from "./Invest";
import SmartInfo from "./SmartInfo";
import PersonalStats from "./PersonalStats";
import MyPresentStaking from "./MyPresentStaking";
import ReferralLink from "./ReferralLink";
import Withdraw from "./Withdraw2";
import IncomeandTeamStats from "./IncomeandTeamStats.js";
import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

// TK4LycnfBcWAfk5QT68AQGffrdWhb8vDx y  
// vvvipppp TCxTecpiFJmTEvTfZQjEqDozVSX4XGkXp Q
// mainnet TGy7DG3PPmpt4b4sJG9HKnEWDj8xezjTG T let url = "s://hardcore-newton-af71f6.netlify.app/" https://trusting-curie-768fd6.netlify.ap p/ ;
let url = "https://sweezglobal.com/";
let contract_address = 'TCCUraEMQzovWE9BpfD16BRGtMPCi76ZA3';

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
        this.setState({ account: accTemp });
        // this.setState({ account: this.state.refid });
        this.setState({ walletload: false });

        const contractBalance = await Utils.contract.getContractBalance().call();
        this.setState({ contractBalance: Number(contractBalance / sunny).toFixed(2) });

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
                        <a href={url} >  <img src={require("./Image1/logo_tronBeast2.png")} alt="Logo" width="460px" /></a>
                    </div>
                    {/* 
                    <Banner 
                        totalInvested={this.state.totalInvested} 
                    />  */}
                    {/* 
                    <div className="row" >
                        <div className="col-xl-6" style={{ textAlign: "center", paddingTop: "20px" }}  >
                            <a href="https://sweezglobal.com/joiningGuide">  <img src={require("./Image1/join.png")} alt="Logo" width="200px" /></a>
                        </div>
                        <div className="col-xl-6" style={{ textAlign: "center", paddingTop: "20px" }}   >
                            <a href="https://sweezglobal.com/aboutUs"> <img src={require("./Image1/about.png")} alt="Logo" width="200px" /></a>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-xl-4" style={{ textAlign: "center" }}  >
                        </div>
                        <div className="col-xl-4" style={{ textAlign: "center", paddingTop: "20px" }}  >
                            <a href="https://sweezglobal.com/topSponsors"   >
                                <img src={require("./Image1/TopSponsor.png")} alt="Logo" width="260px" /></a>
                        </div>
                        <div className="col-xl-4" style={{ textAlign: "center" }}   >
                        </div>

                    </div> */}
                    <MyPresentStaking
                        totalRate={this.state.totalRate}
                    />
                    {this.state.user_status !== 0 && this.state.deposit_amount > 0 ?
                        <Withdraw
                            avlBalance={this.state.avlBalance}
                        />
                        : null}

                    {this.state.user_status === 0 ?
                        <Invest
                            balance={this.state.balance}
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
                    />

                    {this.state.userTotalDeposit > 0 ?
                        <PersonalStats

                            user_status={this.state.user_status}
                            account={this.state.account}
                            subAccount={this.state.subAccount}
                            upline={this.state.upline}
                            subUpline={this.state.subUpline}
                            userTotalDeposit={this.state.userTotalDeposit}
                            dividend={this.state.dividend}
                            deposit_amount={this.state.deposit_amount}
                            userTotalWithdrawn={this.state.payouts}
                            referrals_count={this.state.referrals_count}
                            total_structure={this.state.total_structure}
                            avlBalance={this.state.avlBalance}

                        /> : null}


                    {this.state.userTotalDeposit > 0 ?
                        <IncomeandTeamStats


                            userTotalDeposit={this.state.userTotalDeposit}
                            userTotalWithdrawn={this.state.userTotalWithdrawn}
                            referrals_count={this.state.referrals_count}
                            deposit_amount={this.state.deposit_amount}
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