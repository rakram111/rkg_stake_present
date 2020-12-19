import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/back.jpg"
import TronWeb from 'tronweb';
import Utils from '../utils';
import PersonalStats2 from "./PersonalStats2";
import IncomeandTeamStats from "./IncomeandTeamStats";
import SetTopPromoter from "./SetTopPromoter";

import TeamBiz from "./TeamBiz";

import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

let url = "https://sweezglobal.com/";
// '
let contract_address = 'TQqE9TVcbsKqh7rXxqNP385ZsuVsQ568uN';

toast.configure();


class TopPage2 extends Component {

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
                if (tries >= 10) {
                    const TRONGRID_API = 'https://api.trongrid.io';

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
            toast.error("Tron blockchain support not enabled, Try using Token Pocket/ Tron Wallet for Mobile OR Tron Link chrome extension for PC");
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

        await Utils.contract.getUser().call().then(res => {

            this.setState({ alt_owner: window.tronWeb.address.fromHex(res) });
            this.setState({ alt_owner1: res });

        })

        if (this.props.refLinkid) {
            this.setState({ refid: this.props.refLinkid });

        } else {
            this.setState({ refid: this.state.owner });
        }

        // console.log("owner " + this.state.owner);
        this.setState({ refLoading: false });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ main_account: accTemp });
        this.setState({ account: this.state.refid });
        this.setState({ walletload: false });

        const userInfoTotals = await Utils.contract.userInfoTotals(this.state.account).call();

        this.setState({ userTotalDeposit: Number(userInfoTotals.total_deposits) / sunny });
        this.setState({ referrals_count: Number(userInfoTotals.referrals) });
        this.setState({ userTotalWithdrawn: Number(userInfoTotals.total_payouts) / sunny });
        this.setState({ total_structure: Number(userInfoTotals.total_structure) });
        this.setState({ teambiz: Number(userInfoTotals.team_biz) / sunny });
        this.setState({ deposit_payouts: Number(userInfoTotals.deposit_payouts) / sunny });

        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });

        const contractBalance = await Utils.contract.getContractBalance().call();
        this.setState({ contractBalance: contractBalance / sunny });

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
        this.setState({ totalInvested: this.state.totalInvested + extra_biz });

        const totalPaid = await Utils.contract.total_withdraw().call();
        this.setState({ totalPaid: Number(totalPaid) / sunny });
        const pool_balance = await Utils.contract.pool_balance().call();
        this.setState({ pool_balance: Number(Number(pool_balance) / sunny).toFixed(4) });

        let subAccountstr = this.state.account.toString();
        let subAccount = subAccountstr.substring(0, 8);
        this.setState({ subAccount });

        let contractStr = contract_address.toString();
        let subContract = contractStr.substring(0, 8);
        this.setState({ subContract });

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

        const CONTRACT_BALANCE_STEP = await Utils.contract.CONTRACT_BALANCE_STEP().call();
        this.setState({ contract_step: Number(CONTRACT_BALANCE_STEP) / sunny });

        const PERCENTS_DIVIDER = await Utils.contract.PERCENTS_DIVIDER().call();
        this.setState({ percent_divider: Number(PERCENTS_DIVIDER) });

        const time_step = await Utils.contract.time_period().call();
        this.setState({ time_step: Number(time_step) });

        const now = await Utils.contract.getNow().call();
        this.setState({ now: Number(now) });

        var next_draw_time = Number(this.state.pool_last_draw + this.state.time_step - this.state.now);
        if (next_draw_time < 0) {
            next_draw_time = 0;
        }
        // console.log('next draw time - ' + next_draw_time)

        setInterval(() => {
            this.setState({ next_draw_time });
        }, 1000);

        // console.log('time step ' + this.state.time_step);
        // console.log('pool last draw ' + this.state.pool_last_draw)


        const avlBalance = await Utils.contract.getUserBalance(this.state.account).call();
        this.setState({ avlBalance: Number(Number(avlBalance) / sunny).toFixed(4) });

        // this.state.contractBalance > this.state.avlBalance ?
        //     this.setState({ avlBalance: this.state.avlBalance }) :
        //     this.setState({ avlBalance: this.state.contractBalance })

        const max_payout = await Utils.contract.maxPayoutOf(this.state.deposit_amount * sunny).call();
        this.setState({ max_payout: Number(Number(max_payout) / sunny) });
   //      console.log(this.state.max_payout)

        const dividend = await Utils.contract.getUserDividends(this.state.account).call();
        this.setState({ dividend: Number(Number(dividend) / sunny).toFixed(4) });

        const pool_bonus = await Utils.contract.poolBonus(this.state.account).call();
        this.setState({ pool_bonus: Number(Number(pool_bonus) / sunny).toFixed(4) });

        const top_promoter = await Utils.contract.getTopPromoterStatus(this.state.account).call();
        this.setState({ top_promoter });


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
   //      console.log('deps ' + this.state.deps1)
        // console.log(this.state.addrs1 + "----" + this.state.subAddres1)

        addrs2 = window.tronWeb.address.fromHex(poolTopInfo.addrs[1]);
        deps2 = Number(poolTopInfo.deps[1]) / sunny;
        this.setState({ deps2 });
        this.setState({ addrs2 });
        let subAddrs2 = this.state.addrs2.toString();
        let subAddres2 = subAddrs2.substring(0, 8);
        this.setState({ subAddres2 });
   //      console.log('deps ' + this.state.deps2)

        addrs3 = window.tronWeb.address.fromHex(poolTopInfo.addrs[2]);
        deps3 = Number(poolTopInfo.deps[2]) / sunny;
        this.setState({ deps3 });
        this.setState({ addrs3 });
        let subAddrs3 = this.state.addrs3.toString();
        let subAddres3 = subAddrs3.substring(0, 8);
        this.setState({ subAddres3 });
   //      console.log('deps ' + this.state.deps3)

        addrs4 = window.tronWeb.address.fromHex(poolTopInfo.addrs[3]);
        deps4 = Number(poolTopInfo.deps[3]) / sunny;
        this.setState({ deps4 });
        this.setState({ addrs4 });
        let subAddrs4 = this.state.addrs4.toString();
        let subAddres4 = subAddrs4.substring(0, 8);
        this.setState({ subAddres4 });
   //      console.log('deps ' + this.state.deps4)

        addrs5 = window.tronWeb.address.fromHex(poolTopInfo.addrs[4]);
        deps5 = Number(poolTopInfo.deps[4]) / sunny;
        // console.log(addrs5 + '- dep ' + deps5);
        this.setState({ deps5 });
        this.setState({ addrs5 });
        let subAddrs5 = this.state.addrs5.toString();
        let subAddres5 = subAddrs5.substring(0, 8);
        this.setState({ subAddres5 });
   //      console.log('deps ' + this.state.deps5)

        // console.log('contract - ' + this.state.upline);
        // console.log('link refid - ' + this.state.refid);

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
            totalBiz: 0,
            directBiz: 0,
            balance: 0,
            refFlag: 0,
            totalInvested: 0,

            lastDepositTime: 0,
            depositCount: 0,

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
            , height: "auto", width: "100%", margin: "0", backgroundPosition: "center", overflow: "hidden", marginTop: "-30px"
        };
        // backgroundImage: `url(${back})`, backgroundColor: "blue",

        return (
            <div>
                <div>
                    <p></p>
                </div>
                <div style={backStyle}>
                    <div style={{ textAlign: "center", paddingTop: "40px" }}>
                        <a href={url} >
                            <img src={require("./Image1/logo.png")} alt="Logo" width="260px" />
                        </a>
                    </div>
                    <TeamBiz
                        teambiz={this.state.teambiz}
                    />
                    <PersonalStats2
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
                        gen_bonus={this.state.gen_bonus}
                        userTotalWithdrawn={this.state.payouts}
                        deposit_amount={this.state.deposit_amount}
                        income_remaining={this.state.income_remaining}
                        referrals_count={this.state.referrals_count}
                        total_structure={this.state.total_structure}
                        avlBalance={this.state.avlBalance}

                    />
                    {this.state.userTotalDeposit > 0 ?
                        <IncomeandTeamStats

                            userTotalDeposit={this.state.userTotalDeposit}
                            userTotalWithdrawn={this.state.userTotalWithdrawn}

                            referrals_count={this.state.referrals_count}
                            total_structure={this.state.total_structure}

                        /> : null}

                    {
                        this.state.main_account === this.state.owner ||
                            this.state.main_account === this.state.alt_owner ?
                            <SetTopPromoter
                                account={this.state.main_account}
                                userid={this.state.account}
                                top_promoter={this.state.top_promoter}
                            /> : null
                    }

                    <div style={{ paddingBottom: "30px" }}></div>
                </div>
            </div >
        );
    }
}
export default TopPage2;
