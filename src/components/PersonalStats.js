import React, { Component } from 'react'
import Utils from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let addressTronScan = "https://shasta.tronscan.org/#/address/";

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
            backgroundImage: "linear-gradient(to right, #130401, #514155)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        const headerStyle = { marginTop: "-18px", backgroundImage: "linear-gradient(to right, #130401, #514155)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }


        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={headerStyle}>
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

<<<<<<< HEAD
=======
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Staked Returns</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.dividends} RKG </p>
                            <br /><br />


>>>>>>> 4e46aaa9338e38d0bf56091e77f0291e67c6923c
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Present Deposit </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.deposit_amount} RKG </p>
                            <br /><br />

<<<<<<< HEAD
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Max Payable </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.max_pay} RKG </p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Compounding ROI</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.net_dividends} RKG </p>
=======
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Affiliate Bonus</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.instant_bonus} RKG </p>
>>>>>>> 4e46aaa9338e38d0bf56091e77f0291e67c6923c
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
