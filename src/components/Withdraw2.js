import React, { Component } from 'react'
import TronWeb from 'tronweb';
import Utils from './utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class Withdraw extends Component {

    constructor(props) {
        super(props)
        this.state = {
            balNow: "..."
        }
        this.withdraw = this.withdraw.bind(this);
    }

    async componentDidMount() {

        await this.connectTronWeb();
        await setInterval(() => {
            this.setTimes();
        }, 1000);
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

    setTimes = async () => {
        const sunny = 1000000;
        const now = await Utils.contract.getNow().call();
        this.setState({ now: Number(now) });

        const userInfo1 = await Utils.contract.userInfo(this.state.account).call();
        this.setState({ deposit_time1: Number(userInfo1.deposit_time) });
        this.setState({ payout_time1: Number(userInfo1.payout_time) });

        const userInfo2 = await Utils.contract.userInfo2(this.state.account).call();

        this.setState({ max_payout: Number(userInfo2.max_payout1) / sunny });
        if (this.state.payout_time1 === 0) {
            this.setState({ payout_time1: 1 });
        }
        const secRate = this.state.max_payout / this.state.payout_time1;
        //  const secRate2 = this.props.userroi / this.state.payout_time1;
        var secGone = (this.state.now - this.state.deposit_time1);
        //  var secGone2 = secGone;
        var counter = 1;
        if (secGone > this.state.payout_time1) {
            secGone = this.state.payout_time1;
            counter = 0;
        }
        this.setState({ counter });
        var balNow = (secGone * secRate).toFixed(6);
        this.setState({ balNow });
        this.setState({ secGone });
        // console.log("secGone " + secGone);
        // console.log("secRate on amount rec " + secRate);
        // console.log("secRate on ROI " + secRate2);
        // console.log("balNow " + balNow);
        // console.log("deposit time " + this.state.deposit_time1);
        // console.log("now " + this.state.now);
        // console.log("differ " + secGone2);

        // console.log("payout window " + this.state.payout_time1);

        const remaining_time1 = this.state.deposit_time1 + this.state.payout_time1 - this.state.now;

        var draw_hrs = 0;
        var draw_mins = 0;
        var draw_secs = 0;

        var next_draw_time = remaining_time1;
        if (next_draw_time <= 0) {
            next_draw_time = 0;
        }

        this.setState({ next_draw_time });
        //   console.log("next time" + this.state.payout_time)

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

    withdraw = async () => {
        await Utils.contract
            .withdraw(this.state.account)
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Withdrawal processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
            ).then(res => {
                setInterval(() => {
                    window.location = "/";
                }, 3000);
            }).catch(err => toast.error("Something went wrong"));
    }

    render() {

        const colStyle = {
            backgroundImage: "linear-gradient(to right, #130401, #514155)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        const headerStyle = { marginTop: "-18px", backgroundImage: "linear-gradient(to right, #130401, #514155)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }

        const dotStyle1 = {
            height: "20px",
            width: "20px",
            backgroundColor: "#bbb",
            borderRadius: "50%",
            display: "inline-block",
        };
        const dotStyle2 = {
            height: "20px",
            width: "20px",
            backgroundColor: "#23ACCD",
            borderRadius: "50%",
            display: "inline-block",
        };
        const dotStyle3 = {
            height: "20px",
            width: "20px",
            backgroundColor: "#58CC30",
            borderRadius: "50%",
            display: "inline-block",
        };

        const investButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "white",
            transition: ".4s", marginTop: "30px", marginLeft: "150px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to bottom, #FE5858, #EE9617)", fontSize: "18px", borderRadius: "10px"
        }; // #F67062, #FC5296

        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}>

                        <div className="col-xl-12" style={headerStyle}>
                            Total ROI</div>
                        <br />
                        <div style={{ color: "white", fontSize: "29px", fontFamily: "MyFont", textAlign: "center" }}>{this.state.balNow} TRX

                        </div>

                        <br />
                        <br />
                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>30 % locked for Re-Investment</p>

                        </div>
                        <div className="row container">
                            <span style={dotStyle2}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>{(this.props.my_tbt_offer)} % to TBT offering</p>

                        </div>
                        <div className="row container">
                            <span style={dotStyle3}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>{(100 - 30 - this.props.my_tbt_offer).toFixed(2)} % withdrawable</p>

                        </div>
                        <br />
                        <p style={{ color: "yellow", textAlign: "center", fontSize: "19px" }}>You can withdraw in </p>
                        <p style={{ color: "yellow", textAlign: "center", fontSize: "19px" }}>{this.state.draw_hrs} h : {this.state.draw_mins} m : {this.state.draw_secs} s</p>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();

                                this.withdraw();
                            }}

                        >

                            <br />
                            {this.state.counter === 0 ?
                                <button type="submit" className="btn btn-success" style={investButton}>Withdraw</button> : null}



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
