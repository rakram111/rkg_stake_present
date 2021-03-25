import React from 'react';
import TronWeb from 'tronweb';
import Utils from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/bootstrap.css";

toast.configure();

const TOKEN_ADDRESS = 'TA2EDEgytsPYu27kkZtDpFBz85as8vPqsX';

// let contract_address = 'TUx4rh6X22oCbmYVaQdSCthCCeerg7bDNq'; 

class Buy extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            count: 0,
            rkg_amount: '',
            tronWeb: {
                installed: false,
                loggedIn: false
            },
        }

        this.buy = this.buy.bind(this);
        this.updateRKGAmount = this.updateRKGAmount.bind(this);
        this.buttonTen = this.buttonTen.bind(this);
        this.buttonHundred = this.buttonHundred.bind(this);
        this.button5Hundred = this.button5Hundred.bind(this);
        this.button1Thousand = this.button1Thousand.bind(this);
        this.button10Thousand = this.button10Thousand.bind(this);
        this.button50Thousand = this.button50Thousand.bind(this);
        this.button100Thousand = this.button100Thousand.bind(this);
        this.button500Thousand = this.button500Thousand.bind(this);
        this.reset = this.reset.bind(this);

    }

    async componentDidMount() {

        this.setState({ loading: true })
        await new Promise(resolve => {
            const tronWebState = {
                installed: !!window.tronWeb,
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

        if (!this.state.tronWeb.loggedIn) {
            // Set default address (foundation address) used for contract calls
            // Directly overwrites the address object as TronLink disabled the
            // function call
            window.tronWeb.defaultAddress = {
                hex: window.tronWeb.address.toHex(TOKEN_ADDRESS),
                base58: TOKEN_ADDRESS
            };

            window.tronWeb.on('addressChanged', () => {
                if (this.state.tronWeb.loggedIn)
                    return;

                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }
        console.log('contact ' + Utils.contract)

    }

    async buy(refid, amount, trx_amount) {
        alert("amount " + amount + "trx_amount " + trx_amount);
        await Utils.contract
            .buy(refid, amount)
            .send({
                from: this.state.account,
                callValue: trx_amount * 1000000,
                feeLimit: 1000000000
            }).then(res => toast.success(amount + ' RKG buy order in process', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            ).then(res => {
                setInterval(() => {
                    window.location = "/";
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
        this.setState({ rkg_amount: 0 });
    }

    updateRKGAmount(evt) {
        this.setState({
            rkg_amount: evt.target.value
        });

        this.setState({ trx_amount: this.state.rkg_amount / this.props.buyPrice });
    }



    render() {

        const colStyle = {
            opacity: "70%", marginTop: "40px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
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

        const investButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "black",
            transition: ".4s", marginTop: "30px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to bottom, #5AFF15, #FBB034)", fontSize: "18px", borderRadius: "30px", marginLeft: "150px"
        };

        const dotStyle1 = {
            height: "20px",
            width: "20px",
            backgroundColor: "#bbb",
            borderRadius: "50%",
            display: "inline-block",
        };


        return (
            <div className='row'>
                <div className="col-xl-4"></div>
                <div className="col-xl-4" style={colStyle}>
                    <div className="col-xl-12" style={headerStyle}>
                        RKG Buy Section</div>

                    <br />

                    <div className="row container">
                        <span style={dotStyle1}>

                        </span>

                        <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}> <span>You have previously Bought {this.props.total_buy} RKG from here</span> </p>

                    </div>

                    <br />
                    <form
                        onSubmit={(event) => {

                            event.preventDefault();
                            const refid = this.props.refid;
                            const amount = this.state.rkg_amount;
                            const trx_amount = this.state.rkg_amount * this.props.buyPrice;
                            this.buy(refid, amount, trx_amount);

                        }}
                    >

                        <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}> Enter RKG amount to buy</p>
                        {/* <input type="text" style={{ backgroundColor: "black", borderRadius: "2px", height: "50px", color: "White", fontSize: "25px", paddingLeft: "30px", border: "4px solid white", width: "100%" }} value={this.state.count / this.props.buyPrice} /> <br /> */}

                        <input type="text" style={{ backgroundColor: "black", borderRadius: "2px", height: "50px", color: "White", fontSize: "25px", paddingLeft: "30px", border: "4px solid white", width: "100%" }} value={this.state.rkg_amount} onChange={this.updateRKGAmount} /> <br />
                        {/* 
                        <a href="#100" className="btn btn-primary" style={addButton} onClick={this.buttonHundred}>+200</a>

                        <a href="#500" className="btn btn-primary" style={addButton} onClick={this.button5Hundred}>+1000</a>

                        <a href="#1000" className="btn btn-primary" style={addButton} onClick={this.button1Thousand}>+2000</a>

                        <a href="#10k" className="btn btn-primary" style={addButton} onClick={this.button10Thousand}>+20 k</a>


                        <a href="#100k" className="btn btn-primary" style={addButton} onClick={this.button100Thousand}>+200 k</a>

                        <a href="#10" className="btn btn-primary" style={addButton} onClick={this.buttonTen}>+20</a> */}
                        <a href="#reset" className="btn btn-primary" style={addButton} onClick={this.reset}>Reset</a><br />
                        <br />

                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>
                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}> <span>You must have {this.state.rkg_amount * this.props.buyPrice} TRX </span> </p>


                        </div>

                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>

                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}> <span>Your balance is   {this.props.balance} TRX  </span> </p>

                        </div>

                        <div className="row container">
                            <span style={dotStyle1}>

                            </span>

                            <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}> <span>You have {this.props.user_rkg_balance} RKG in your account </span> </p>

                        </div>
                        {this.props.refLoading ? null :
                            <button type="submit" className="btn btn-success" style={investButton}>Buy RKG
                                </button>}

                    </form>
                </div>

                <div className="col-xl-4"></div>
                {/* 
                <br />
                <p> Amount : </p>
                <input style={{ width: "400px" }} value={this.state.approveamount} onChange={this.updateApproveValue} />
                <br />
                <br />
                <button className='btn btn-primary' onClick={(event) => {
                    event.preventDefault()
                    this.Approve(this.state.contract_address, this.state.approveamount * 1000000)
                }}>Approve
                  </button>
                <br />
                <br />
                <br />

                <br /> */}
            </div >
        );
    }
}

export default Buy;

