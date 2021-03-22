import React, { Component } from 'react'
import Utils from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let addressTronScan = "https://shasta.tronscan.org/#/address/";

toast.configure();

class SuperStats extends Component {

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
                            Super Stats</div>
                        <br />

                        <div className="col-xl-12" >


                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Your Address</p>
                            <a href={addressTronScan + this.props.account} style={{ color: "white", fontSize: "17px", float: "right", textDecoration: "underline" }}>
                                {this.props.sub_super_upline}...</a>

                            <br /><br />



                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Super Business </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.super_business} RKG </p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Super 5 Bonus</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.super5_bonus} RKG </p>
                            <br /> <br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Am I Super</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.isSuper}  </p>
                            <br /> <br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Super Directs</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.super_directs}   </p>
                            <br /> <br />


                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >

        )
    }
}

export default SuperStats
