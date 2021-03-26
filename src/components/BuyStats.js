import React, { Component } from 'react'

const contract_address = 'TKgnEfAMQ7vuqiPCKtqLkc4rLMxrrQ2ZUu';
// const tbt_address = 'TJEDMQLLkGC3frpSnEhJes8fTWHPpQ5C6P';

let contract_url = "https://tronscan.org/#/contract/" + contract_address;
let url = "https://tronscan.org/#/contract/";


export class BuyStats extends Component {

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
                            Buy Stats</div>
                        <br />

                        <div className="col-xl-12" style={{ textAlign: "center" }}>

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Contract Address</p>

                            <a href={contract_url} style={{ textDecoration: "underline", color: "#18E55F", fontSize: "23px", textAlign: "center", paddingTop: "110px" }} target="_blank" rel="noopener noreferrer">{this.props.subContract}...</a>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Upline</p>
                            <a href={url + this.props.upline} style={{ textDecoration: "underline", color: "#18E55F", fontSize: "23px", textAlign: "center" }}> {this.props.strUpline}...  </a>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Super Upline</p>
                            <a href={url + this.props.super_upline} style={{ textDecoration: "underline", color: "#18E55F", fontSize: "23px", textAlign: "center" }}> {this.props.strSuperUpline}...  </a>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Super Business</p>
                            <a href="#1" style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.super_business}  </a>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Contract RKG Balance</p>
                            <a href="#1" style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.contract_rkg_bal}  RKG</a>
                            <br /><br />


                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Am i Super</p>
                            <a href="#1" style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.isSuper == true ? "YES" : "NO"}  </a>
                            <br /><br />


                            {/* <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Total Paid</p> 
                            <a href="#1" style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.totalPaid} TRX</a>
                            <br /><br /> */}


                            {/* <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Contract Balance</p> 
                            <a href="#1" style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.contractBalance} TRX</a>
                            <br /><br /> */}
                            {/* 
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Total Users</p>
                            <a href="#1" style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}># {this.props.totalUsers}</a>
                            <br /><br /> */}

                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >
        )
    }
}

export default BuyStats
