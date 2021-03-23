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
        this.invest = this.invest.bind(this);
    }

    async invest(refid, amount) {

        await Utils.contract
            .deposit(refid, amount)
            .send({
                from: this.state.account,
                callValue: 0,
                feeLimit: 1000000000
            }).then(res => toast.success(amount / 1000000 + ' RKG stake in process', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            ).then(res => {
                setInterval(() => {
                    window.location = "/";
                }, 2000);
            }).catch(err => toast.error("Insufficient Balance or Transaction Declined"));

    }

    render() {

        const colStyle = {
            backgroundImage: "linear-gradient(to right, #130401, #514155)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        const headerStyle = { marginTop: "-18px", backgroundImage: "linear-gradient(to right, #130401, #514155)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }

        const investButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "black",
            transition: ".4s", margin: "12px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to bottom, #5AFF15, #FBB034)", fontSize: "18px", borderRadius: "30px", marginLeft: "103px"

        };

        return (
            <div style={{ paddingTop: "60px" }} >
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}>
                        <div className="col-xl-12" style={headerStyle}>
                            One More Step</div>

                        <form
                            onSubmit={(event) => {

                                event.preventDefault();
                                const refid = this.props.refid;
                                const amount = this.props.allowed * 1000000;
                                const balance = this.props.balance;
                                if (balance >= 100) {

                                    this.invest(refid, amount);

                                } else {
                                    toast.error("Keep atleast ~ 10 TRX extra for GAS fee");
                                }

                            }}
                        >
                            <p style={{ textAlign: "center", color: "white" }}>Your upline</p>
                            <p style={{ textAlign: "center", color: "orange" }}>{this.props.refid}</p>

                            {this.props.refLoading ? null :
                                <button type="submit" className="btn btn-success" style={investButton}>Complete Deposit
                                </button>}


                        </form>


                    </div>

                    <div className="col-xl-4"></div>
                </div>


            </div >
        )
    }
}

export default Invest
