import React, { Component } from 'react'
import Utils from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let addressTronScan = "https://shasta.tronscan.org/#/contract/";

toast.configure();

class PersonalStats extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }
        this.withdraw = this.withdraw.bind(this);

    }
    async withdraw() {
        await Utils.contract
            .withdraw()
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Wihdrawal processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            ).then(res => {
                window.location = "/";
            });


    }


    render() {

        const colStyle = {
            backgroundImage: "linear-gradient(to right, #131050, black)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };


        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={{ marginTop: "-18px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                            Personal Stats</div>
                        <br />

                        <div className="col-xl-12" >

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Status</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.user_status === 0 ? "In Active" : "Active"} </p>

                            <br /><br />
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Your Address</p>
                            <a href={addressTronScan + this.props.account} style={{ color: "white", fontSize: "17px", float: "right", textDecoration: "underline" }}>
                                {this.props.subAccount}...</a>

                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Sponsor</p>
                            <a href={addressTronScan + this.props.upline} style={{ color: "white", fontSize: "17px", float: "right", textDecoration: "underline" }}>
                                {this.props.subUpline}...</a>

                            <br /><br />



                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Present Deposit </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.deposit_amount} TRX</p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Remaining Income </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.income_remaining} TRX</p>
                            <br /><br />




                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Dividends</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.dividend} TRX</p>
                            <br /> <br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Direct Bonus</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.direct_bonus} TRX</p>
                            <br /> <br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Generation Bonus </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.gen_bonus} TRX</p>
                            <br /> <br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Pool Bonus </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.pool_bonus} TRX</p>
                            <br /> <br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Total Withdrawn</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.userTotalWithdrawn} TRX</p>
                            <br /> <br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Balance Available</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.avlBalance} TRX</p>
                            <br /> <br />


                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >

        )
    }
}

export default PersonalStats
