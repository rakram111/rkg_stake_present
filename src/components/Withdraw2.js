import React, { Component } from 'react'
import TronWeb from 'tronweb';

import Utils from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Withdraw extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: "...",
        }
        this.withdraw = this.withdraw.bind(this);
        this.setBalance = this.setBalance.bind(this);
    }


    async componentDidMount() {

        await this.connectTronWeb();
        await setInterval(() => {
            this.setBalance();

        }, 1000);

        // await updateBalance() {
        // const this.myInterval = setInterval(() => {
        //     const avlBalance = await Utils.contract.getUserBalance(this.state.account).call();
        //     this.setState({ avlBalance: Number(Number(avlBalance) / 1000000).toFixed(5) });
        // }, 1000);
        // const avlBalance = await Utils.contract.getUserBalance(this.state.account).call();
        // this.setState({ avlBalance: Number(Number(avlBalance) / 1000000).toFixed(5) });
    }
    setBalance = async () => {


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
        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });
    }



    withdraw = async () => {
        await Utils.contract
            .withdraw()
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Wihdrawal processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })

            ).then(res => {
                setInterval(() => {
                    window.location = "/";
                }, 3000);
            }).catch(err => toast.error("Something went wrong"));
    }

    render() {

        const { count } = this.state

        const colStyle = {
            backgroundImage: "radial-gradient(black, #131050 )", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee"
        };

        const investButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "white",
            transition: ".4s", marginTop: "30px", marginLeft: "180px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to bottom, #FE5858, #EE9617)", fontSize: "18px", borderRadius: "10px"
        }; // #F67062, #FC5296

        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}>

                        <div className="col-xl-12" style={{ marginTop: "-18px", marginLeft: "-5px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                            Withdrawable Balance</div>
                        <br />


                        <div style={{ color: "white", fontSize: "29px", fontFamily: "MyFont", textAlign: "center" }}> {count} TRX

                        </div>


                        <form
                            onSubmit={(event) => {

                                event.preventDefault();

                                this.withdraw();
                            }}

                        >


                            {this.props.refLoading ? null :
                                <button type="submit" className="btn btn-success" style={investButton}>Withdraw</button>}



                        </form>


                    </div>

                    <div className="col-xl-4"></div>

                </div>

                <div style={{ paddingBottom: "20px" }}></div>
            </div >

        )
    }
}

export default Withdraw
