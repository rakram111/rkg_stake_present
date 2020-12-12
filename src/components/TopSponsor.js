import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/back.jpg"
import TronWeb from 'tronweb';
import Utils from '../utils';
import TopSponsor2 from "./TopSponsor2";


import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

//TM5uShsLgdvTX9JXvwnEgY3zWsCqDWxjN w  TGy7DG3PPmpt4b4sJG9HKnEWDj8xezjTG T let url = "s://hardcore-newton-af71f6.netlify.app/" https://sweezglobal.com/ p/ ;
let url = "https://sweezglobal.com/";
let contract_address = 'TJQ71SQv1AXqGFdwxiv34cF6diVKFgL4uz';

// let tronContracturl = "https://tronscan.org/#/contract/" + contract_address;
// let tronAddressurl = "https://tronscan.org/#/address/";

toast.configure();

class TopSponsor extends Component {

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

        const poolTopInfo = await Utils.contract.poolTopInfo().call();
        var addrs1, addrs2, addrs3, addrs4, addrs5, deps1, deps2, deps3, deps4, deps5;

        addrs1 = window.tronWeb.address.fromHex(poolTopInfo.addrs[0]);
        deps1 = Number(poolTopInfo.deps[0]) / sunny;

        // console.log('pool top info' + addrs1);

        this.setState({ deps1 });
        this.setState({ addrs1 });
        let subAddrs1 = this.state.addrs1.toString();
        let subAddress1 = subAddrs1.substring(0, 8);
        this.setState({ subAddress1 });
        console.log('deps1 ' + this.state.deps1 + ' ' + this.state.subAddress1)
        // console.log(this.state.addrs1 + "----" + this.state.subAddress1)

        addrs2 = window.tronWeb.address.fromHex(poolTopInfo.addrs[1]);
        deps2 = Number(poolTopInfo.deps[1]) / sunny;
        this.setState({ deps2 });
        this.setState({ addrs2 });
        let subAddrs2 = this.state.addrs2.toString();
        let subAddress2 = subAddrs2.substring(0, 8);
        this.setState({ subAddress2 });
        console.log('deps2 ' + this.state.deps2 + ' ' + this.state.subAddress2)

        addrs3 = window.tronWeb.address.fromHex(poolTopInfo.addrs[2]);
        deps3 = Number(poolTopInfo.deps[2]) / sunny;
        this.setState({ deps3 });
        this.setState({ addrs3 });
        let subAddrs3 = this.state.addrs3.toString();
        let subAddress3 = subAddrs3.substring(0, 8);
        this.setState({ subAddress3 });
        console.log('deps3 ' + this.state.deps3 + ' ' + this.state.subAddress3)

        addrs4 = window.tronWeb.address.fromHex(poolTopInfo.addrs[3]);
        deps4 = Number(poolTopInfo.deps[3]) / sunny;
        this.setState({ deps4 });
        this.setState({ addrs4 });
        let subAddrs4 = this.state.addrs4.toString();
        let subAddress4 = subAddrs4.substring(0, 8);
        this.setState({ subAddress4 });
        console.log('deps4 ' + this.state.deps4 + ' ' + this.state.subAddress4)

        addrs5 = window.tronWeb.address.fromHex(poolTopInfo.addrs[4]);
        deps5 = Number(poolTopInfo.deps[4]) / sunny;
        // console.log(addrs5 + '- dep ' + deps5);
        this.setState({ deps5 });
        this.setState({ addrs5 });
        let subAddrs5 = this.state.addrs5.toString();
        let subAddress5 = subAddrs5.substring(0, 8);
        this.setState({ subAddress5 });
        console.log('deps5 ' + this.state.deps5 + ' ' + this.state.subAddress5)

        // console.log('contract - ' + this.state.upline);
        // console.log('link refid - ' + this.state.refid);

    }

    constructor(props) {
        super(props)

        this.state = {
            deps1: 0,
            deps2: 0,
            deps3: 0,
            deps4: 0,
            deps5: 0,
            subAddress1: "",
            subAddress2: "",
            subAddress3: "",
            subAddress4: "",
            subAddress5: "",
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
                        <a href={url} >  <img src={require("./Image1/logo.png")} alt="Logo" width="260px" /></a>
                    </div>
                    <TopSponsor2
                        deps1={this.state.deps1}
                        subAddress1={this.state.subAddress1}
                        deps2={this.state.deps2}
                        subAddress2={this.state.subAddress2}
                        deps3={this.state.deps3}
                        subAddress3={this.state.subAddress3}
                        deps4={this.state.deps4}
                        subAddress4={this.state.subAddress4}
                        deps5={this.state.deps5}
                        subAddress5={this.state.subAddress5}
                    />

                    <div style={{ paddingBottom: "50px" }}></div>
                </div>

            </div >
        );
    }
}
export default TopSponsor;
