import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./back1.jpg"
import TronWeb from 'tronweb';
import Utils from './utils';
import SmartInfo from "./SmartInfo";
import Invest from "./Invest";
import Token from "./Token";
import LevelStats from "./LevelStats";
import TBTstats from "./TBTstats";
import PersonalStats from "./PersonalStats";
import ReferralLink from "./ReferralLink";
import Withdraw from "./Withdraw2";
import IncomeandTeamStats from "./IncomeandTeamStats.js";
import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";
import SuperStats from './SuperStats';

let url = "http://localhost:3000/"; // http://localhost:3000/
let contract_address = 'TPG7u3Uq4coxuVJv3cyA1Sm84cxyCMR4n2';
let rkg_address = 'TA2EDEgytsPYu27kkZtDpFBz85as8vPqsX';
let owner = 'TMKKWtwErWh5EKNuLLVbSwGq8aKuTz4uUA';

toast.configure();

class TopPage extends Component {

    async componentDidMount() {

        await this.connectTronWeb();
        await this.loadBlockChainData1();
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

        const sunny = 1000000;

        await Utils.contract.getAdmin().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        })
        this.setState({ owner });

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

        const contractBalance = await Utils.contract.getContractBalance().call();
        this.setState({ contractBalance: Number(contractBalance / sunny).toFixed(2) });

        const totalUsers = await Utils.contract.total_users().call();
        this.setState({ totalUsers: Number(totalUsers) });

        var totalInvested = await Utils.contract.total_deposited().call();
        this.setState({ totalInvested: Number(totalInvested) / sunny });

        var total_tbt_sent = await Utils.contract.total_tbt_sent().call();
        this.setState({ total_tbt_sent: Number(total_tbt_sent) / sunny });

        var tbt_price = await Utils.contract.tbt_price().call();

        var tenk_users = await Utils.contract.tenk_users().call();
        this.setState({ tenk_users: Number(tenk_users) });
        this.setState({ tbt_price: Number(tbt_price) / sunny });
        //     console.log("users " + this.state.totalUsers + " tenkusers " + this.state.tenk_users);

        // if (
        //     totalUsers <= tenk_users) {
        //     this.setState({ tbt_price: Number(tbt_price) / sunny });
        //     console.log("1users " + this.state.totalUsers + " tenkusers " + this.state.tenk_users);

        // } else {
        //     this.setState({ tbt_price: Number(2 * tbt_price) / sunny });
        //     console.log("2users " + this.state.totalUsers + " tenkusers " + this.state.tenk_users);

        // }

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

        let tbtStr = rkg_address.toString();
        let subtbt = tbtStr.substring(0, 8);
        this.setState({ subtbt });

        const userInfoTotals = await Utils.contract.userInfoTotals(this.state.account).call();

        this.setState({ userTotalDeposit: Number(userInfoTotals.total_deposits) / sunny });
        this.setState({ referrals_count: Number(userInfoTotals.referrals) });
        this.setState({ userTotalWithdrawn: Number(userInfoTotals.total_payouts) / sunny });
        this.setState({ total_structure: Number(userInfoTotals.total_structure) });

        /////////////////////////////////////////////////////////////////////////////
        const userInfo = await Utils.contract.userInfo(this.state.account).call();

        this.setState({ upline: window.tronWeb.address.fromHex(userInfo.upline) });
        this.setState({ subUpline: this.state.upline.toString().substring(0, 8) });
        this.setState({ direct_bonus: Number(userInfo.direct_bonus) / sunny });
        this.setState({ deposit_amount: Number(userInfo.deposit_amount) / sunny });
        this.setState({ payouts: Number(userInfo.payouts) / sunny });
        this.setState({ deposit_time: Number(userInfo.deposit_time) });
        this.setState({ user_status: Number(userInfo.user_status) });
        this.setState({ payout_time: Number(userInfo.payout_time) });


        const levelInfo = await Utils.contract.levelInfo(this.state.account).call();

        this.setState({ level1: Number(levelInfo.level1) / sunny });
        this.setState({ level2: Number(levelInfo.level2) / sunny });
        this.setState({ level3: Number(levelInfo.level3) / sunny });

        const tbtOfferInfo = await Utils.contract.tbtOfferInfo(this.state.account).call();

        this.setState({ my_tbt_offer: Number(tbtOfferInfo.usertbtoffer) });

        /////////////////////////////////////////////////////////////////////////////
        const tbtInfo = await Utils.contract.tbtInfo(this.state.account).call();

        this.setState({
            from_deposit: Number(tbtInfo.from_deposit) / sunny
        });
        this.setState({
            from_withdrawal: Number(tbtInfo.from_withdrawal) / sunny
        });
        this.setState({
            total_tbt: Number(tbtInfo.total_tbt1) / sunny
        });
        this.setState({
            tbt_bal: Number(tbtInfo.tbt_bal) / sunny
        });
        this.setState({
            contract_tbt_bal: Number(tbtInfo.contract_tbt_bal) / sunny
        });

        var tbt_min_deposit = await Utils.contract.tbt_min_deposit().call();
        this.setState({ tbt_min_deposit: Number(tbt_min_deposit) / sunny });

        var allowed = await Utils.contract.checkAllowance().call();
        this.setState({ allowed: Number(allowed) / sunny });

        const now = await Utils.contract.getNow().call();
        this.setState({ now: Number(now) });

        const my_tbt_offer1 = (0.7 * this.state.my_tbt_offer).toFixed(2)
        this.setState({ my_tbt_offer1 });
        // console.log("tbt min deposit " + this.state.tbt_min_deposit);
    }

    loadBlockChainData1 = async () => {
        const sunny = 1000000;

        await Utils.contract.getAdmin().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        })
        this.setState({ owner });

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

        /////////////////////////////////////////////////////////////////////////////
        const userInfo = await Utils.contract.userInfo(this.state.account).call();

        this.setState({ upline: window.tronWeb.address.fromHex(userInfo.upline) });
        this.setState({ subUpline: this.state.upline.toString().substring(0, 8) });
        this.setState({ instant_bonus: Number(userInfo.instant_bonus) / sunny });
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

        const superInfo = await Utils.contract.superInfo(this.state.account).call();

        this.setState({ super_upline: window.tronWeb.address.fromHex(superInfo.super_upline) });
        this.setState({ sub_super_upline: this.state.super_upline.toString().substring(0, 8) });
        this.setState({ super5_bonus: Number(superInfo.super5_bonus) / sunny });
        this.setState({ super_business: Number(superInfo.super_business) / sunny });
        this.setState({ super_directs: Number(superInfo.super_directs) });
        this.setState({ isSuper: superInfo.isSuper });

        const levelInfo = await Utils.contract.levelInfo(this.state.account).call();

        this.setState({ level1: Number(levelInfo.level1) / sunny });
        this.setState({ level2: Number(levelInfo.level2) / sunny });
        this.setState({ level3: Number(levelInfo.level3) / sunny });
        this.setState({ level4: Number(levelInfo.level4) / sunny });
        this.setState({ level5: Number(levelInfo.level5) / sunny });

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
                    <hr />
                    <div style={{ textAlign: "center" }}>
                        <a href={url} >
                            <img src={require("./Image1/logo2.png")} alt="Logo" width="170px" style={{ opacity: "70%" }} />
                        </a>
                    </div>
                    <hr />
                    <hr />
                    {this.state.allowed >= this.state.MIN_DEPOSIT && this.state.deposit_amount === 0 ?
                        <Invest
                            balance={this.state.balance}
                            refid={this.state.refid}
                            allowed={this.state.allowed}

                        /> :
                        null}
                    {this.state.allowed < this.state.MIN_DEPOSIT && this.state.deposit_amount === 0 ?
                        <Token
                            MIN_DEPOSIT={this.state.MIN_DEPOSIT}
                        /> :
                        null}

                    <SmartInfo
                        smartLoading={this.state.smartLoading}
                        totalInvested={this.state.totalInvested}
                        contractBalance={this.state.contractBalance}
                        subContract={this.state.subContract}
                        subtbt={this.state.subtbt}
                        totalUsers={this.state.totalUsers}
                        totalPaid={this.state.totalPaid}
                        total_tbt_sent={this.state.total_tbt_sent}
                        contract_tbt_bal={this.state.contract_tbt_bal}
                    />

                    {this.state.userTotalDeposit > 0 ?
                        <div>
                            <PersonalStats

                                max_payout={this.state.max_payout}
                                user_status={this.state.user_status}
                                account={this.state.account}
                                subAccount={this.state.subAccount}
                                upline={this.state.upline}
                                subUpline={this.state.subUpline}
                                userTotalDeposit={this.state.userTotalDeposit}
                                payout_time={this.state.payout_time}

                                deposit_amount={this.state.deposit_amount}
                                total_structure={this.state.total_structure}
                                instant_bonus={this.state.instant_bonus}

                            />
                            <SuperStats

                                sub_super_upline={this.state.sub_super_upline}
                                super5_bonus={this.state.super5_bonus}
                                super_directs={this.state.super_directs}
                                isSuper={this.state.isSuper}
                                super_business={this.state.super_business}


                            />

                            <LevelStats

                                level1={this.state.level1}
                                level2={this.state.level2}
                                level3={this.state.level3}
                                level4={this.state.level4}
                                level5={this.state.level5}
                            />

                            <IncomeandTeamStats
                                userTotalDeposit={this.state.userTotalDeposit}
                                userTotalWithdrawn={this.state.userTotalWithdrawn}
                                referrals_count={this.state.direct_referrals}
                                deposit_amount={this.state.deposit_amount}

                            />

                            <ReferralLink
                                account={this.state.account}
                            />
                        </div> : null}

                    {/* {this.state.user_status === 0 ?
                        null : <Withdraw
                            my_tbt_offer={this.state.my_tbt_offer1}
                            max_payout={this.state.max_payout}
                            userroi={this.state.userroi}
                        />} */}

                    <div style={{ paddingBottom: "20px" }}></div>

                    <div style={{ paddingBottom: "50px" }}></div>
                </div>

            </div >
        );
    }
}
export default TopPage;