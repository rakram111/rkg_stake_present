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

        this.button100 = this.button100.bind(this);
        this.button500 = this.button500.bind(this);
        this.button1000 = this.button1000.bind(this);
        this.button10k = this.button10k.bind(this);
        this.button50k = this.button50k.bind(this);
        this.button100k = this.button100k.bind(this);
        this.button500k = this.button500k.bind(this);
        this.invest = this.invest.bind(this);
        this.reset = this.reset.bind(this);

    }

    async invest(refid, amount) {

        if (amount >= 100) {
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
        } else {
            toast.info('Minimum deposit is 100 TRX');
        }

    }

    button100(event) {
        this.setState({ count: this.state.count + 100 });
    }

    button500(event) {
        this.setState({ count: this.state.count + 500 });
    }

    button1000(event) {
        this.setState({ count: this.state.count + 1000 });
    }

    button10k(event) {
        this.setState({ count: this.state.count + 10000 });
    }

    button50k(event) {
        this.setState({ count: this.state.count + 50000 });
    }

    button100k(event) {
        this.setState({ count: this.state.count + 100000 });
    }

    button500k(event) {
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
            transition: ".4s", marginTop: "30px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to right, #FFDD00, #FBB034)", fontSize: "18px", borderRadius: "30px", marginLeft: "150px"
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
                            <img src={require("./Image1/plan.png")} alt="Logo" width="260px" />
                        </div>
                        <form
                            onSubmit={(event) => {

                                event.preventDefault();
                                const refid = this.props.refid;
                                const amount = this.state.count;

                                if (amount >= 100) {
                                    this.invest(refid, amount);

                                } else {
                                    toast.error("Min deposit is 100 TRX");
                                }


                            }}

                        >
                            <input type="text" style={{ backgroundColor: "black", borderRadius: "2px", height: "50px", color: "White", fontSize: "25px", paddingLeft: "30px", border: "4px solid white", width: "100%" }} value={this.state.count} /> <br /><br />


                            <a href="#100" className="btn btn-primary" style={addButton} onClick={this.button100}>+100</a>

                            <a href="#500" className="btn btn-primary" style={addButton} onClick={this.button500}>+500</a>

                            <a href="#1000" className="btn btn-primary" style={addButton} onClick={this.button1000}>+1000</a>

                            <a href="#10k" className="btn btn-primary" style={addButton} onClick={this.button10k}>+10 k</a>

                            <a href="#50k" className="btn btn-primary" style={addButton} onClick={this.button50k}>+50 k</a>
                            <a href="#100k" className="btn btn-primary" style={addButton} onClick={this.button100k}>+100 k</a>
                            <a href="#500k" className="btn btn-primary" style={addButton} onClick={this.button500k}>+500 k</a>
                            <a href="#reset" className="btn btn-primary" style={addButton} onClick={this.reset}>Reset</a><br />

                            <br />
                            {/* {this.props.deposit_amount === 0 ?
                                <p style={{ color: "white" }}>Sponsor : {this.props.refid}</p>
                                : null}
                            <br /> */}

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
