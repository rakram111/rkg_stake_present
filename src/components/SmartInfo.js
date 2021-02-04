import React, { Component } from 'react'

const contract_address = 'TGN8Bp3NAVCLcWrVkmLuTHBYibes6JYhZC';

let contracturl = "https://shasta.tronscan.org/#/contract/" + contract_address;
//https://shasta.tronscan.org/#/contract/
export class SmartInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }

    }

    render() {
        //   #131050, black 
        // #130401, #514155
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
                            Smart Contract</div>

                        <br />

                        <div className="col-xl-12" style={{ textAlign: "center" }}>

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Contract Address</p>

                            <a href={contracturl} style={{ textDecoration: "underline", color: "#18E55F", fontSize: "23px", textAlign: "center", paddingTop: "110px" }} target="_blank" rel="noopener noreferrer">{this.props.subContract}...</a>
                            <br /><br />


                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Total Deposits</p>
                            <a href="#1" style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.totalInvested} TRX</a>
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

export default SmartInfo
