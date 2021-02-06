import React, { Component } from 'react'
import Utils from './utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/bootstrap.css";

toast.configure();

export class Invest extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,
        }

        this.buttonTen = this.buttonTen.bind(this);
        this.buttonHundred = this.buttonHundred.bind(this);
        this.button5Hundred = this.button5Hundred.bind(this);
        this.button1Thousand = this.button1Thousand.bind(this);
        this.button10Thousand = this.button10Thousand.bind(this);
        this.button50Thousand = this.button50Thousand.bind(this);
        this.button100Thousand = this.button100Thousand.bind(this);
        this.button500Thousand = this.button500Thousand.bind(this);
        this.invest = this.invest.bind(this);
        this.reset = this.reset.bind(this);

    }

    async invest(refid, amount) {

        await Utils.contract
            .deposit(refid)
            .send({
                from: this.state.account,
                callValue: Number(amount) * 1000000,
            }).then(res => toast.success(amount + ' TRX Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            ).then(res => {
                setInterval(() => {
                    window.location = "/dashboard";
                }, 2000);
            }).catch(err => toast.error("Insufficient Balance or Transaction Declined"));

    }

    buttonTen(event) {
        this.setState({ count: this.state.count + 10 });
    }
    buttonHundred(event) {
        this.setState({ count: this.state.count + 100 });
    }

    button5Hundred(event) {
        this.setState({ count: this.state.count + 500 });
    }

    button1Thousand(event) {
        this.setState({ count: this.state.count + 1000 });
    }

    button10Thousand(event) {
        this.setState({ count: this.state.count + 10000 });
    }

    button50Thousand(event) {
        this.setState({ count: this.state.count + 50000 });
    }

    button100Thousand(event) {
        this.setState({ count: this.state.count + 100000 });
    }

    button500Thousand(event) {
        this.setState({ count: this.state.count + 500000 });
    }

    reset(event) {
        this.setState({ count: 0 });
    }

    render() {

        const colStyle = {
            backgroundImage: "linear-gradient(to right, #130401, #514155)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        const headerStyle = { marginTop: "-18px", backgroundImage: "linear-gradient(to right, #130401, #514155)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }

        const addButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "#FFF",
            transition: ".4s", marginTop: "10px", marginLeft: "10px", marginBottom: "10px", fontWeight: "3px", border: "3px solid white", backgroundColor: "black"
        }
        const dotStyle1 = {
            height: "20px",
            width: "20px",
            backgroundColor: "#bbb",
            borderRadius: "50%",
            display: "inline-block",
        };

        const investButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "black",
            transition: ".4s", marginTop: "30px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to bottom, #5AFF15, #FBB034)", fontSize: "18px", borderRadius: "30px", marginLeft: "150px"
        };

        return (
            <div style={{ paddingTop: "60px" }} >
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}>
                        <div className="col-xl-12" style={headerStyle}>
                            Beasting Starts here</div>
                        <br />
                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Investor : <span style={{ color: "yellow" }}> {this.props.pack1 + this.props.pack1} TRX to {this.props.pack2} TRX </span><br />(200 % ROI)</p>

                        </div>
                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Business Financier : <span style={{ color: "yellow" }}> {this.props.pack2 + this.props.pack1} TRX to {this.props.pack3} TRX </span><br />(250 % ROI)</p>

                        </div>
                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Shark Investor : <span style={{ color: "yellow" }}> {this.props.pack3 + this.props.pack1} TRX to {this.props.pack4} TRX </span><br />(300 % ROI)</p>

                        </div>
                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Tycoon Investor : <span style={{ color: "yellow" }}> {this.props.pack4 + this.props.pack1} TRX to {this.props.pack5} TRX </span><br />(350 % ROI)</p>

                        </div>
                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Beast Investor : <span style={{ color: "yellow" }}> {this.props.pack5 + this.props.pack1} TRX and above </span><br />(400 % ROI)</p>

                        </div>
                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}> Min Investment for receiving TBT is <br /><span style={{ color: "yellow" }}>{this.props.tbt_min_deposit} TRX (<span style={{ color: "white" }}> @ price of {this.props.tbt_price} TRX / TBT</span> )</span>
                            </p>

                        </div>
                        <br />
                        <form
                            onSubmit={(event) => {

                                event.preventDefault();
                                const refid = this.props.refid;
                                const amount = this.state.count;
                                const balance = this.props.balance;
                                if (amount < balance) {
                                    if (amount + 15 <= balance && amount < 400) {
                                        if (amount >= 2 * this.props.pack1) {
                                            this.invest(refid, amount);

                                        } else {
                                            toast.error("Min deposit allowed is 200 Trons");
                                        }
                                    } else {
                                        toast.error("Keep atleast ~ 15 TRX extra for GAS fee");
                                    }


                                } else {
                                    toast.error("Balance should be greater than deposit amount");
                                }
                            }}
                        >
                            <input type="text" style={{ backgroundColor: "black", borderRadius: "2px", height: "50px", color: "White", fontSize: "25px", paddingLeft: "30px", border: "4px solid white", width: "100%" }} value={this.state.count} /> <br />

                            <a href="#100" className="btn btn-primary" style={addButton} onClick={this.buttonHundred}>+100</a>

                            <a href="#500" className="btn btn-primary" style={addButton} onClick={this.button5Hundred}>+500</a>

                            <a href="#1000" className="btn btn-primary" style={addButton} onClick={this.button1Thousand}>+1000</a>

                            <a href="#10k" className="btn btn-primary" style={addButton} onClick={this.button10Thousand}>+10 k</a>

                            <a href="#50k" className="btn btn-primary" style={addButton} onClick={this.button50Thousand}>+50 k</a>
                            <a href="#100k" className="btn btn-primary" style={addButton} onClick={this.button100Thousand}>+100 k</a>
                            <a href="#500k" className="btn btn-primary" style={addButton} onClick={this.button5HundredThousand}>+500 k</a>
                            <a href="#10" className="btn btn-primary" style={addButton} onClick={this.buttonTen}>+10</a>
                            <a href="#reset" className="btn btn-primary" style={addButton} onClick={this.reset}>Reset</a><br />
                            <br />

                            {this.props.isReentry === true ?
                                <p style={{ color: "pink", textAlign: "center", fontSize: "16px" }}>Minimum Additional TRX for Re-Investment is {(this.props.next_min_deposit).toFixed(2)} TRX<br />
                                    <p style={{ color: "yellow", textAlign: "center" }}>
                                        Locked balance value is <br />
                                        {this.props.locked_balance} TRX
                                    </p>
                                </p>
                                : null
                            }

                            {this.props.refLoading ? null :
                                <button type="submit" className="btn btn-success" style={investButton}>Make Deposit
                                </button>}


                        </form>


                    </div>

                    <div className="col-xl-4"></div>
                </div>


            </div>
        )
    }
}

export default Invest
