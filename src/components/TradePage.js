import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/b1.jpg"
import TronWeb from 'tronweb';
import Utils from '../utils';
// import Sell from "./Sell";
import Buy from './Buy';
import BuyStats from './BuyStats';
import MakeSuper from './MakeSuper';
import RemoveSuper from './RemoveSuper';
import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";
import ReferralLink from './ReferralLink';

let url = "https://rkgstaking.com/"; // https://rkg staking.com/ http://local host:3000/

let contract_address = 'TKgnEfAMQ7vuqiPCKtqLkc4rLMxrrQ2ZUu';
// let rkg_address = 'TP8pbrEDLFgetKrGwWtSzYMFvWGa5jmico';

toast.configure();

class TradePage extends Component {

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

       toast.info("Tron blockchain support needed for the use of this website, Try using Klever Wallet/ Tron Link Pro for Mobile OR Tron Link chrome extension for PC");
         
 

        await Utils.setTronWeb(window.tronWeb);
    }

    loadBlockChainData1 = async () => {

        const sunny = 1000000;

        await Utils.contract.owner().call().then(res => {

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

        let contractStr = contract_address.toString();
        let subContract = contractStr.substring(0, 8);
        this.setState({ subContract });
        this.setState({ contractStr });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });

        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });

        const buyPrice = await Utils.contract.buyPrice().call();
        this.setState({ buyPrice: Number(buyPrice) / sunny });

        const contract_rkg_bal = await Utils.contract.contract_rkg_balance().call();
        this.setState({ contract_rkg_bal: Number(contract_rkg_bal) / sunny });

        console.log('buy ' + this.state.buyPrice);

        const superInfo = await Utils.contract.superInfo(this.state.account).call();

        this.setState({ super_upline: window.tronWeb.address.fromHex(superInfo.super_upline) });
        this.setState({ upline: window.tronWeb.address.fromHex(superInfo.upline) });

        let upline1 = this.state.upline.toString();
        let strUpline = upline1.substring(0, 8);
        this.setState({ strUpline });

        let super_upline2 = this.state.super_upline.toString();
        let strSuperUpline = super_upline2.substring(0, 8);
        this.setState({ strSuperUpline });


        this.setState({ super_business: Number(superInfo.super_business) / sunny });
        this.setState({ total_buy: Number(superInfo.total_buy) });
        this.setState({ user_rkg_balance: Number(superInfo.user_rkg_balance) / sunny });
        this.setState({ allowed: Number(superInfo.allowed) / sunny });
        this.setState({ isSuper: superInfo.isSuper });
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
                            <img src={require("./Image1/rkgcoin.png")} alt="Logo" width="370px" style={{ opacity: "80%" }} />
                        </a>
                    </div>

                    <Buy
                        refid={this.state.refid}
                        balance={this.state.balance}
                        buyPrice={this.state.buyPrice}

                        contract_rkg_bal={this.state.contract_rkg_bal}
                        super_business={this.state.super_business}
                        total_buy={this.state.total_buy}
                        user_rkg_balance={this.state.user_rkg_balance}
                        allowed={this.state.allowed}
                        isSuper={this.state.isSuper}
                    />

                    {this.state.total_buy > 0 ? <BuyStats
                        contractStr={this.state.contractStr}
                        subContract={this.state.subContract}
                        strUpline={this.state.strUpline}
                        strSuperUpline={this.state.strSuperUpline}
                        contract_rkg_bal={this.state.contract_rkg_bal}
                        super_upline={this.state.super_upline}

                        upline={this.state.upline}

                        super_business={this.state.super_business}

                        isSuper={this.state.isSuper}

                    /> : null}


                    {this.state.total_buy > 0 ? <ReferralLink
                        account={this.state.account}
                    />
                        : null}
                    {/* 
                    {this.state.isSuper === false ? <MakeSuper
                        account={this.state.account}
                    />
                        : null}

                    {this.state.isSuper === true ? <RemoveSuper
                        account={this.state.account}
                    />
                        : null} */}
                    <div style={{ paddingBottom: "20px" }}></div>

                    <div style={{ paddingBottom: "50px" }}></div>
                </div>

            </div >
        );
    }
}
export default TradePage;