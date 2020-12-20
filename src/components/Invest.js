import React, { Component } from 'react'
import Utils from '../utils';
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
                    window.location = "/";
                }, 2000);
            }).catch(err => toast.error("Insufficient Balance or Transaction Declined"));


    }

    buttonTen(event) {
        this.setState({ count: this.state.count + 10 });
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
            opacity: "80%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

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

        return (
            <div style={{ paddingTop: "60px" }} >
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}> 
                        <div className="col-xl-12" style={{ marginTop: "-18px", marginLeft: "-5px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                            INFINITY Deposit Section</div>
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <img src={require("./Image1/plan.png")} alt="Logo" width="160px" />
                        </div><br />
                        <form
                            onSubmit={(event) => {

                                event.preventDefault();
                                const refid = this.props.refid;
                                const amount = this.state.count;

                                if (amount >= 10) {
                                    this.invest(refid, amount);

                                } else {
                                    toast.error("Min deposit is 10 TRX");
                                }
                            }}

                        >
                            <input type="text" style={{ backgroundColor: "black", borderRadius: "2px", height: "50px", color: "White", fontSize: "25px", paddingLeft: "30px", border: "4px solid white", width: "100%" }} value={this.state.count} /> <br />
                            <p style={{color:"white", textAlign:"center", fontSize:"20px"}}>Available Balance : {Number(this.props.balance).toFixed(2)} TRX </p><br /> 

                            <a href="#10" className="btn btn-primary" style={addButton} onClick={this.buttonTen}>+10</a>

                            <a href="#500" className="btn btn-primary" style={addButton} onClick={this.button5Hundred}>+500</a>

                            <a href="#1000" className="btn btn-primary" style={addButton} onClick={this.button1Thousand}>+1000</a>

                            <a href="#10k" className="btn btn-primary" style={addButton} onClick={this.button10Thousand}>+10 k</a>

                            <a href="#50k" className="btn btn-primary" style={addButton} onClick={this.button50Thousand}>+50 k</a>
                            <a href="#100k" className="btn btn-primary" style={addButton} onClick={this.button100Thousand}>+100 k</a>
                            <a href="#500k" className="btn btn-primary" style={addButton} onClick={this.button5HundredThousand}>+500 k</a>
                            <a href="#reset" className="btn btn-primary" style={addButton} onClick={this.reset}>Reset</a><br /> 
                            <br />
                            <p style={{color:"pink", textAlign:"center", fontSize:"16px"}}>Keep 20 TRX extra for Gas Fee</p>
                            {this.props.refLoading ? null :
                                <button type="submit" className="btn btn-success" style={investButton}>Make Deposit</button>}


                        </form>


                    </div>

                    <div className="col-xl-4"></div>
                </div>

            </div>
        )
    }
}

export default Invest
