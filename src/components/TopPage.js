import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/thunder.jpg"
import TronWeb from 'tronweb';
import Utils from '../utils';
import SmartInfo from "./SmartInfo";
import Invest from "./Invest";
import Token from "./Token";
import PersonalStats from "./PersonalStats";
import ReferralLink from "./ReferralLink";
import IncomeandTeamStats from "./IncomeandTeamStats.js";
import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";
import SuperStats from './SuperStats';
import Withdraw from './Withdraw2';

let url = "https://rkgstaking.com/"; // https://rkg staking.com/ https://rkgstaking.com/

let contract_address = 'TKgnEfAMQ7vuqiPCKtqLkc4rLMxrrQ2ZUu';
// let rkg_address = 'TP8pbrEDLFgetKrGwWtSzYMFvWGa5jmico';

toast.configure();

class TopPage extends Component {

    async componentDidMount() {

        await this.connectTronWeb();
        await this.loadBlockChainData1();
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
                    const TRONGRID_API = 'https://api.trongrid.io';
                    // const TRONGRID_API = 'https://3.225.171.164';
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
            toast.error("Tron blockchain support not enabled, Try using Tron Wallet/ Tron Link Pro for Mobile OR Tron Link chrome extension for PC");
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

    loadBlockChainData1 = async () => {
        const sunny = 1000000;

        await Utils.contract.getAdmin().call().then(res => {

            this.setState({ owner2: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        })
        this.setState({ owner: this.state.owner2 });

        if (this.props.refLinkid) {
            this.setState({ refid: this.props.refLinkid });
            this.setState({ referPresent: true });
        } else {
            this.setState({ refid: this.state.owner });
        }
        this.setState({ refLoading: false });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });
        this.setState({ walletload: false });

        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });

        var allowed = await Utils.contract.checkAllowance().call();
        this.setState({ allowed: Number(allowed) / sunny });

        var MIN_DEPOSIT = await Utils.contract.MIN_DEPOSIT().call();
        this.setState({ MIN_DEPOSIT: Number(MIN_DEPOSIT) / sunny });

        const totalUsers = await Utils.contract.total_users().call();
        this.setState({ totalUsers: Number(totalUsers) });

        var totalInvested = await Utils.contract.total_deposited().call();
        this.setState({ totalInvested: Number(totalInvested) / sunny });

        let subAccountstr = this.state.account.toString();
        let subAccount = subAccountstr.substring(0, 8);
        this.setState({ subAccount });

        let contractStr = contract_address.toString();
        let subContract = contractStr.substring(0, 8);
        this.setState({ subContract });
        console.log('sub contract' + subContract);

        console.log("Sunny " + sunny);

        /////////////////////////////////////////////////////////////////////////////
        const contractInfo = await Utils.contract.contractInfo(this.state.account).call();

        this.setState({ user_rkg_balance: Number(contractInfo.user_rkg_balance) / sunny });
        this.setState({ rkg_balance: Number(contractInfo.rkg_balance) / sunny });
        this.setState({ user_allowance: Number(contractInfo.user_allowance) / sunny });

        const userInfo = await Utils.contract.userInfo(this.state.account).call();

        this.setState({ upline: window.tronWeb.address.fromHex(userInfo.upline) });
        this.setState({ subUpline: this.state.upline.toString().substring(0, 8) });
        this.setState({ direct_bonus: Number(userInfo.direct_bonus) / sunny });
        this.setState({ gen_bonus: Number(userInfo.gen_bonus) / sunny });
        this.setState({ deposit_amount: Number(userInfo.deposit_amount) / sunny });
        this.setState({ payouts: Number(userInfo.payouts) / sunny });
        this.setState({ deposit_time: Number(userInfo.deposit_time) });
        this.setState({ user_status: Number(userInfo.user_status) });
        this.setState({ payout_time: Number(userInfo.payout_time) });

        const userInfoTotals = await Utils.contract.userInfoTotals(this.state.account).call();
        this.setState({ direct_referrals: Number(userInfoTotals.direct_referrals) });
        this.setState({ direct_biz: Number(userInfoTotals.direct_biz) / sunny });
        this.setState({ userTotalDeposit: Number(userInfoTotals.total_deposits) / sunny });
        this.setState({ userTotalWithdrawn: Number(userInfoTotals.total_payouts) / sunny });
        this.setState({ deposit_payouts: Number(userInfoTotals.deposit_payouts) / sunny });

        const superInfo = await Utils.contract.superInfo(this.state.account).call();

        this.setState({ super_upline: window.tronWeb.address.fromHex(superInfo.super_upline) });
        this.setState({ sub_super_upline: this.state.super_upline.toString().substring(0, 8) });
        this.setState({ super5_bonus: Number(superInfo.super5_bonus) / sunny });
        this.setState({ super_business: Number(superInfo.super_business) / sunny });
        this.setState({ super_directs: Number(superInfo.super_directs) });
        this.setState({ isSuper: superInfo.isSuper });

        const max_pay = await Utils.contract.MaxPay(this.state.account).call();
        this.setState({ max_pay: Number(max_pay) / sunny });

        const now_time = await Utils.contract.getNow().call();
        this.setState({ now_time: Number(now_time) });

    }

    setTimes = async () => {
        const sunny = 1000000;

        var allowed = await Utils.contract.checkAllowance().call();
        this.setState({ allowed: Number(allowed) / sunny });

        var MIN_DEPOSIT = await Utils.contract.MIN_DEPOSIT().call();
        this.setState({ MIN_DEPOSIT: Number(MIN_DEPOSIT) / sunny });

        var dividends_total = await Utils.contract.dividends_total(this.state.account).call();
        this.setState({ dividends_total: Number(dividends_total) / sunny });

        const max_pay = await Utils.contract.MaxPay(this.state.account).call();
        this.setState({ max_pay: Number(max_pay) / sunny });

        const now_time = await Utils.contract.getNow().call();
        this.setState({ now_time: Number(now_time) });

        const divSupport = await Utils.contract.getDivSupport(this.state.account).call();

        this.setState({ _Period_days: Number(divSupport._Period_days) });
        this.setState({ _deposit_amount: Number(divSupport._deposit_amount) });
        console.log("_Period_days " + this.state._Period_days);

        const daily_roi = await Utils.contract.daily_roi().call();
        this.setState({ daily_roi: Number(daily_roi) });
        console.log("daily ROI " + this.state.daily_roi);

        var total_dividends = this.state._deposit_amount;
        for (var i = 0; i <= this.state._Period_days; i++) {
            total_dividends += this.state.daily_roi * this.state._deposit_amount / 1000;
        }
        this.setState({ total_dividends: (total_dividends / sunny).toFixed(6) });
        console.log("total_dividends " + this.state.total_dividends);

        var net_dividends = 0;
        net_dividends = this.state.total_dividends - this.state.deposit_amount;

        this.setState({ net_dividends: net_dividends.toFixed(6) });
        console.log("net_dividends " + this.state.net_dividends);

        const total_bonus = await Utils.contract.getUserBonus(this.state.account).call();
        this.setState({ total_bonus: Number(total_bonus) / sunny });
        console.log("total_bonus " + this.state.total_bonus);

        var net_draw = 0;

        net_draw = this.state.total_bonus + this.state.net_dividends - this.state.deposit_payouts;
        if (net_draw > this.state.max_payout) {
            net_draw = this.state.max_payout;
        }
        this.setState({ net_draw });
    }

    constructor(props) {
        super(props)

        this.state = {

            refLoading: true,
            walletload: true,
            balanceload: true,
            totalInvestmentLoad: true,
            playerStatus: "In Active",
            boostStatus: "In Active",

            account: '',
            totalMembers: 0,

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
            referPresent: false,

            tronWeb: {
                installed: false,
                loggedIn: false
            },
        }
    }

    render() {
        const backStyle = {
            backgroundImage: `url(${back})`, backgroundAttachment: "fixed", fontFamily: "MyFont", height: "auto", width: "100%", margin: "0", backgroundPosition: "center", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundSize: "cover"
        };

        return (
            <div>
                <div style={backStyle}>
                    <hr />
                    <div style={{ textAlign: "center" }}>
                        <a href={url} >
                            <img src={require("./Image1/logo2.png")} alt="Logo" width="170px" style={{ opacity: "80%" }} />
                        </a>
                    </div>
                    <br />
                    <br />

                    {this.state.allowed >= this.state.MIN_DEPOSIT && this.state.deposit_amount === 0 ?
                        <Invest
                            balance={this.state.balance}
                            refid={this.state.refid}
                            allowed={this.state.allowed}
                            user_rkg_balance={this.state.user_rkg_balance}

                        /> :
                        null}

                    {this.state.allowed < this.state.MIN_DEPOSIT && this.state.deposit_amount === 0 ?
                        <Token
                            MIN_DEPOSIT={this.state.MIN_DEPOSIT}
                            user_rkg_balance={this.state.user_rkg_balance}
                        /> :
                        null}


                    <SmartInfo
                        smartLoading={this.state.smartLoading}
                        totalInvested={this.state.totalInvested}
                        subContract={this.state.subContract}
                        subtbt={this.state.subtbt}
                        totalUsers={this.state.totalUsers}
                        totalPaid={this.state.totalPaid}

                    />

                    {this.state.userTotalDeposit > 0 ?
                        <div>
                            <PersonalStats

                                gen_bonus={this.state.gen_bonus}
                                max_payout={this.state.max_payout}
                                user_status={this.state.user_status}
                                account={this.state.account}
                                subAccount={this.state.subAccount}
                                upline={this.state.upline}
                                subUpline={this.state.subUpline}
                                userTotalDeposit={this.state.userTotalDeposit}
                                net_dividends={this.state.net_dividends}
                                direct_referrals={this.state.direct_referrals}
                                direct_bonus={this.state.direct_bonus}
                                direct_biz={this.state.direct_biz}
                                max_pay={this.state.max_pay}
                                deposit_amount={this.state.deposit_amount}
                                period={this.state._Period_days}


                            />

                            <SuperStats

                                sub_super_upline={this.state.sub_super_upline}
                                super5_bonus={this.state.super5_bonus}
                                super_directs={this.state.super_directs}
                                isSuper={this.state.isSuper}
                                super_business={this.state.super_business}

                            />

                            <IncomeandTeamStats

                                userTotalWithdrawn={this.state.userTotalWithdrawn}
                                userTotalDeposit={this.state.userTotalDeposit}
                                deposit_payouts={this.state.userTotalWithdrawn}
                                referrals_count={this.state.direct_referrals}

                            />

                            <ReferralLink
                                account={this.state.account}
                            />
                        </div> : null}

                    {this.state.user_status === 1 ?
                        <Withdraw
                            net_draw={this.state.net_draw}

                        /> : null}

                    <div style={{ paddingBottom: "20px" }}></div>

                    <div style={{ paddingBottom: "50px" }}></div>
                </div>

            </div >
        );
    }
}
export default TopPage;